import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Button } from '@homeproved/shared/ui';
import {
  FormLabel,
  FormGroup,
  Input,
  Textarea,
  RealizationFormData,
  RealizationFormSchema,
  ErrorMessage,
} from '@homeproved/shared/feature-forms';
import ImageUpload from '../image-upload/ImageUpload';
import {
  RealisationApiFactory,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { useForm } from 'react-hook-form';
import { ActivityPicker, RequestCategoryModal } from '@homeproved/shared/feature-sectors';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from 'react-use-disclosure';

export interface AddRealizationFormProps {
  companyId: number;
  getPath: GetPathFunction;
}

const Form = styled.form`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const Fields = styled.div`
  flex: 0 0 40%;
`;

const Images = styled.div`
  flex: 0 0 45%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  margin: -1rem;
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 5rem auto 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    margin: 2rem 0 0;
  }
`;

export const AddRealizationForm: FC<AddRealizationFormProps> = ({ companyId, getPath }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);

  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { mutation: realizationMutation } = useMutationFetch('realizationsPost', (body) =>
    realizationsApi.apiRealisationPost(body)
  );
  const { register, errors, setValue, handleSubmit, formState } = useForm<RealizationFormData>({
    resolver: zodResolver(RealizationFormSchema),
  });

  const {
    isOpen: isRequestCategoryModalOpen,
    close: onCloseRequestCategoryModal,
    open: onOpenRequestCategoryModal,
  } = useDisclosure(false);

  useEffect(() => {
    register('isSectorSelected');
    register('isCoverPhotoAdded');
  }, [register]);

  useEffect(() => {
    setValue('isSectorSelected', selectedSectors.length > 0, {
      shouldValidate: formState.isSubmitted,
    });
  }, [selectedSectors, setValue, formState.isSubmitted]);

  useEffect(() => {
    setValue('isCoverPhotoAdded', !!coverImage, {
      shouldValidate: formState.isSubmitted,
    });
  }, [coverImage, setValue, formState.isSubmitted]);

  useEffect(() => {
    if (!realizationMutation.isSuccess) return;
    router.push(getPath('/realizations')).then();
  }, [realizationMutation, router, getPath]);

  const handlePost = (realizationData) => {
    realizationMutation.mutate({
      title: realizationData.title,
      subtitle: realizationData.subtitle,
      body: realizationData.description,
      companyId: companyId,
      sectorIds: selectedSectors,
      cover: coverImage,
      images: images,
    });
  };

  const handleCoverUpload = (image, id) => {
    setCoverImage(image);
  };

  const handleImageUpload = (image, id, uniqueKey) => {
    const imageToDelete = images.some((img) => img.uniqueKey === uniqueKey);
    if (imageToDelete) {
      //delete old image
      setImages(images.filter((img) => img.uniqueKey !== uniqueKey));
    }
    //Add new image
    setImages((images) => [...images, { base64: image, uniqueKey }]);
  };

  const handleChange = (sectors) => {
    setSelectedSectors(sectors);
  };

  const deleteCoverImage = (image: string) => {
    setCoverImage('');
  };
  const deleteImage = (image: string, uniqueKey) => {
    setImages(images.filter((img) => img.image !== image && img.uniqueKey !== uniqueKey));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handlePost)}>
        <Fields>
          <FormGroup style={{ marginBottom: '2rem' }}>
            <FormLabel htmlFor="title" required={true}>
              {t('app.pro.pages.realizations.add.title')}
            </FormLabel>
            <Input
              ref={register}
              name="title"
              placeholder={t('app.pro.pages.realizations.add.placeholders.title')}
              style={{ marginBottom: 0 }}
            />
            {errors.title && <ErrorMessage>{t(errors.title.message)}</ErrorMessage>}
          </FormGroup>
          <FormGroup style={{ marginBottom: '2rem' }}>
            <FormLabel htmlFor="subtitle">{t('app.pro.pages.realizations.add.subtitle')}</FormLabel>
            <Input
              ref={register}
              name="subtitle"
              placeholder={t('app.pro.pages.realizations.add.placeholders.subtitle')}
              style={{ marginBottom: 0 }}
            />
            {errors.subtitle && <ErrorMessage>{t(errors.subtitle.message)}</ErrorMessage>}
          </FormGroup>
          <FormGroup style={{ marginBottom: '2rem' }}>
            <FormLabel htmlFor="description" required={true}>
              {t('app.pro.pages.realizations.add.description')}
            </FormLabel>
            <Textarea
              ref={register}
              name="description"
              rowsMin={6}
              rowsMax={12}
              placeholder={t('app.pro.pages.realizations.add.placeholders.description')}
              style={{ marginBottom: 0 }}
            />
            {errors.description && <ErrorMessage>{t(errors.description.message)}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="description" required={true}>
              {t('app.pro.pages.realizations.add.sector')}
            </FormLabel>
            <ActivityPicker
              value={selectedSectors}
              onChange={handleChange}
              direction={'vertical'}
              error={
                errors.isSectorSelected ? (t(errors.isSectorSelected.message) as string) : false
              }
              openRequestCategoryModal={onOpenRequestCategoryModal}
            />
          </FormGroup>
          {!isMobile && (
            <StyledButton arrow="none" type="submit" disabled={realizationMutation.isLoading}>
              {t('app.pro.pages.realizations.add.save')}
            </StyledButton>
          )}
        </Fields>
        <Images>
          {[...Array(10)].map((_, index) =>
            index === 0 ? (
              <ImageUpload
                key={index}
                uniqueKey={`uniqueKey-${index}`}
                cover={true}
                required={true}
                onUpload={handleCoverUpload}
                error={
                  errors.isCoverPhotoAdded ? (t(errors.isCoverPhotoAdded.message) as string) : false
                }
                onDelete={deleteCoverImage}
              />
            ) : (
              <ImageUpload
                key={index}
                onUpload={handleImageUpload}
                onDelete={deleteImage}
                uniqueKey={`uniqueKey-${index}`}
              />
            )
          )}
        </Images>
        {isMobile && (
          <StyledButton
            arrow="none"
            type="submit"
            disabled={realizationMutation.isLoading}
            isLoading={realizationMutation.isLoading}
          >
            {t('app.pro.pages.realizations.add.save')}
          </StyledButton>
        )}
      </Form>
      <RequestCategoryModal
        open={isRequestCategoryModalOpen}
        onClose={onCloseRequestCategoryModal}
      />
    </>
  );
};

export default AddRealizationForm;
