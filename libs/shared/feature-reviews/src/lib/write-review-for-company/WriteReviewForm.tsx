import React, { FC, useEffect, useState } from 'react';
import { Grow, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import {
  ApiReviewImages,
  CompanyData,
  getErrorMessage,
  ReviewsApiFactory,
  useApiFactory,
  useMutationFetch,
  usePersistentData,
} from '@homeproved/shared/data-access';
import { Button, DancingScriptQuote } from '@homeproved/shared/ui';
import { Slider } from './steps/Slider';
import { Description } from './steps/Description';
import { ProCon } from './steps/ProCon';
import { Sectors } from './steps/Sectors';
import { UserDataForm } from './steps/UserDataForm';
import { ButtonWrapper, CompanyLogo, FormFields, TooGoodNotice } from './Atoms';
import { AddCustomProConPointsHandler } from './AddCustomProConPointsHandler';
import { WriteReviewFormData, writeReviewFormSchema } from '@homeproved/shared/feature-forms';
import { Verification } from './steps/Verification';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { ConvertImagesToBase64Handler } from './ConvertImagesToBase64Handler';
import { RequestCategoryModal } from '@homeproved/shared/feature-sectors';
import { useDisclosure } from 'react-use-disclosure';

type WriteReviewFormProps = {
  getComPath: GetPathFunction;
  company: CompanyData;
  onStep: (currentStep: number) => void;
};

export type CustomProConPoint = {
  id: number;
  type: 'pro' | 'con';
  title: string;
  submitted: number;
};

let customProConPointAutoIncrement = 1;

export const WriteReviewForm: FC<WriteReviewFormProps> = ({ getComPath, company, onStep }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const { enqueueSnackbar } = useSnackbar();
  const [score, setScore] = useState(8);
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedPro, setSelectedPro] = useState<number[]>([]);
  const [customPro, setCustomPro] = useState<CustomProConPoint[]>([]);
  const [selectedCon, setSelectedCon] = useState<number[]>([]);
  const [customCon, setCustomCon] = useState<CustomProConPoint[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false);
  const [lastAddedCustom, setLastAddedCustom] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ApiReviewImages[]>([]);
  const [newCustomProConPoints, setNewCustomProConPoints] = useState<number[]>([]);
  const { setSubmittedReview } = usePersistentData();
  const router = useRouter();

  const reviewsApi = useApiFactory(ReviewsApiFactory);
  const { mutation: postReviewMutation } = useMutationFetch('postReview', reviewsApi.apiReviewPost);

  const methods = useForm<WriteReviewFormData>({
    resolver: zodResolver(writeReviewFormSchema),
  });

  const {
    isOpen: isRequestCategoryModalOpen,
    close: onCloseRequestCategoryModal,
    open: onOpenRequestCategoryModal,
  } = useDisclosure(false);

  const policyAccepted = methods.watch('acceptPolicy', false);

  useEffect(() => {
    if (!submitted) return;
    if (
      [...customPro, ...customCon].length > 0 &&
      [...customPro, ...customCon].length !== newCustomProConPoints.length
    )
      return;
    if (
      Object.keys(selectedImages).length > 0 &&
      Object.keys(selectedImages).length !== convertedImages.length
    )
      return;
    if (!postReviewMutation.isIdle) return;
    const data = methods.getValues();

    postReviewMutation.mutate({
      companyId: company.id,
      title: data.title,
      description: data.description,
      rating: score,
      screenName: data.screenName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      pointsProConIds: [...selectedPro, ...selectedCon, ...newCustomProConPoints],
      sectorIds: selectedSectors,
      images: convertedImages,
    });
  }, [newCustomProConPoints, convertedImages, submitted]);

  useEffect(() => {
    if (postReviewMutation.isSuccess) {
      setSubmittedReview(postReviewMutation.data.data);
    }
  }, [postReviewMutation.isSuccess, postReviewMutation.data]);

  useEffect(() => {
    if (postReviewMutation.isError) {
      setSubmitted(false);
      setConvertedImages([]);
      enqueueSnackbar(getErrorMessage(postReviewMutation, t), {
        variant: 'error',
      });
    }
  }, [postReviewMutation.isError, t]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    onStep(currentStep + 1);
  };

  const handleAddCustom = (type: 'pro' | 'con') => {
    const newCustom: CustomProConPoint = {
      id: customProConPointAutoIncrement,
      type,
      title: '',
      submitted: -1,
    };
    setLastAddedCustom(customProConPointAutoIncrement);

    customProConPointAutoIncrement++;

    if (type === 'pro') {
      setCustomPro([...customPro, newCustom]);
    } else {
      setCustomCon([...customCon, newCustom]);
    }
  };

  const handleChangeCustom = (
    original: CustomProConPoint,
    newTitle: string,
    shouldDelete?: boolean
  ) => {
    setLastAddedCustom(undefined);
    const list = original.type === 'pro' ? [...customPro] : [...customCon];
    const originalIndex = list.findIndex((item) => item.id === original.id);

    if (shouldDelete) {
      list.splice(originalIndex, 1);
      const newIdIndex = newCustomProConPoints.findIndex((item) => item === original.submitted);
      if (newIdIndex !== -1) newCustomProConPoints.splice(newIdIndex, 1);
    } else {
      list[originalIndex].title = newTitle;
    }

    if (original.type === 'pro') {
      setCustomPro(list);
    } else {
      setCustomCon(list);
    }
  };

  const handleDeleteCustom = (original: CustomProConPoint) =>
    handleChangeCustom(original, '', true);

  const handleFormSubmit = () => {
    // check wether there is minimum 1 pro-con-point and minimum 1 sector selected
    const proConsValid = [...selectedPro, ...selectedCon, ...customPro, ...customCon].length > 0;
    const sectorsValid = selectedSectors.length > 0;

    if (!proConsValid || !sectorsValid) {
      let message = proConsValid ? '' : t('reviews.write.errors.minProCons');
      message += !proConsValid ? '<br />' : '';
      message += sectorsValid ? '' : t('reviews.write.errors.minSectors');
      enqueueSnackbar(ReactHtmlParser(message), { variant: 'error' });
    } else {
      setSubmitted(true);
    }
  };

  return (
    <>
      {submitted && (
        <>
          {[...customPro, ...customCon].length > 0 && (
            <AddCustomProConPointsHandler
              data={[...customPro, ...customCon]}
              onComplete={(data) => {
                const newIds = [...newCustomProConPoints, ...data];
                setNewCustomProConPoints(newIds);
              }}
            />
          )}
          {Object.keys(selectedImages).length > 0 && (
            <ConvertImagesToBase64Handler images={selectedImages} onComplete={setConvertedImages} />
          )}
        </>
      )}
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <FormProvider {...methods}>
          <FormFields mobile={isMobile}>
            <CompanyLogo mobile={isMobile}>
              <img
                src={
                  company.logo ? company.logo.data.conversions['fit-xs'] : '/logo-default@2x.png'
                }
                alt="logo"
              />
            </CompanyLogo>
            <Slider
              company={company}
              onChange={(value) => {
                setScore(value);
                setShowNextButton(true);
              }}
              readOnly={submitted}
              isMobile={isMobile}
            />
            {currentStep > 1 && (
              <Description readOnly={submitted} onImagesChange={setSelectedImages} />
            )}
            {currentStep > 2 && (
              <>
                <ProCon
                  onProChange={setSelectedPro}
                  onConChange={setSelectedCon}
                  customPro={customPro}
                  customCon={customCon}
                  onAddCustomPro={() => handleAddCustom('pro')}
                  onAddCustomCon={() => handleAddCustom('con')}
                  onChangeCustom={handleChangeCustom}
                  onDeleteCustom={handleDeleteCustom}
                  lastAddedCustom={lastAddedCustom}
                  readOnly={submitted}
                />
                <Sectors
                  company={company}
                  onSectorsChange={setSelectedSectors}
                  readOnly={submitted}
                  openRequestCategoryModal={onOpenRequestCategoryModal}
                />
              </>
            )}
            {currentStep > 3 && (
              <UserDataForm getComPath={getComPath} readOnly={submitted} isMobile={isMobile} />
            )}
          </FormFields>
          <Grow in={score === 10 && currentStep === 1} mountOnEnter unmountOnExit>
            <TooGoodNotice>
              <DancingScriptQuote size={2.4} quote={t('reviews.write.sliderMax')} />
            </TooGoodNotice>
          </Grow>
          {showNextButton && !submitted && (
            <ButtonWrapper>
              {currentStep <= 3 && (
                <Button size="large" onClick={handleNextStep}>
                  {t('reviews.write.nextBtn')}
                </Button>
              )}
              {currentStep === 4 && (
                <Button size="large" type="submit" disabled={!policyAccepted}>
                  {t('reviews.write.verificationBtn')}
                </Button>
              )}
            </ButtonWrapper>
          )}
        </FormProvider>
      </form>
      <RequestCategoryModal
        open={isRequestCategoryModalOpen}
        onClose={onCloseRequestCategoryModal}
      />
      {postReviewMutation.isSuccess && (
        <Verification
          reviewId={postReviewMutation.data.data.id.toString()}
          email={methods.getValues().email}
          onSuccess={() =>
            router.push(getComPath('/write-review/:slug/thanks', { slug: company.slug })).then()
          }
        />
      )}
    </>
  );
};
