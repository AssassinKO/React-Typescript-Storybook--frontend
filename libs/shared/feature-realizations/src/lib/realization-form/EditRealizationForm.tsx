import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Button, Icons, SvgIcon } from '@homeproved/shared/ui';
import { FormLabel, FormGroup, Input, Textarea } from '@homeproved/shared/feature-forms';
import ImageUpload from '../image-upload/ImageUpload';
import {
  MediaApiFactory,
  RealisationApiFactory,
  RealisationData,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { useForm } from 'react-hook-form';
import { ActivityPicker, RequestCategoryModal } from '@homeproved/shared/feature-sectors';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useRouter } from 'next/router';
import { useDisclosure } from 'react-use-disclosure';

export interface EditRealizationFormProps {
  data: RealisationData;
  getProPath: GetPathFunction;
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

const Images = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  flex: 0 0 45%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  margin: ${({ isMobile }) => (isMobile ? '0 auto' : '-1rem')};
  max-width: 50rem;
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 5rem auto 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    margin: 2rem 0 0;
  }
`;

const StyledActivityPicker = styled(ActivityPicker)`
  margin-bottom: 1rem;
  padding-bottom: 2rem;
`;

const DeleteLink = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.1rem;
  text-transform: uppercase;
  text-decoration: underline;
  display: inline-flex;
  align-items: center;
  margin-top: 4rem;
  cursor: pointer;

  ${({ isMobile }) =>
    isMobile &&
    `
    position: absolute;
    left: 0;
    right: 0;
    display: inline-block;
    text-align: center;
    margin-top: 5rem;
  `}
  &:hover {
    text-decoration: none;
  }
  span {
    margin-left: 0.5rem;
  }
`;

export const EditRealizationForm: FC<EditRealizationFormProps> = ({ data, getProPath }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [newCoverImage, setNewCoverImage] = useState<boolean>(false);
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);

  const mediaApi = useApiFactory(MediaApiFactory);
  const { mutation: mediaMutation } = useMutationFetch('cover', (body) =>
    mediaApi.apiImageUploadModelIdPost(data.id, body)
  );

  const realizationsApi = useApiFactory(RealisationApiFactory);
  const { mutation: realizationMutation } = useMutationFetch('realizationsPatch', (body) =>
    realizationsApi.apiRealisationRealisationPatch(data.id.toString(), body)
  );
  const { mutation: realizationDelete } = useMutationFetch('realizationsDelete', (body) =>
    realizationsApi.apiRealisationRealisationDelete(data.id.toString())
  );
  const {
    isOpen: isRequestCategoryModalOpen,
    close: onCloseRequestCategoryModal,
    open: onOpenRequestCategoryModal,
  } = useDisclosure(false);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      title: data.title,
      subtitle: data.subtitle,
      body: data.body,
    },
  });

  const handlePost = (realizationData) => {
    realizationMutation.mutate({
      title: realizationData.title,
      subtitle: realizationData.subtitle,
      body: realizationData.body,
      companyId: data.id,
      sectorIds: selectedSectors,
      images,
    });
    if (newCoverImage)
      mediaMutation.mutate({
        collection: 'cover',
        model: 'realisation',
        photo: coverImage,
      });
  };

  const handleDelete = () => {
    realizationDelete.mutate({});
  };

  const handleCoverUpload = (image, id) => {
    setCoverImage(image);
    setNewCoverImage(true);
  };

  const handleImageUpload = (image, id, uniqueKey) => {
    const imageToDelete = images.some((img) => img.id === id || img.uniqueKey === uniqueKey);
    if (imageToDelete) {
      //delete old image
      setImages(images.filter((img) => img.id !== id && img.uniqueKey !== uniqueKey));
    }
    //Add new image
    setImages((images) => [...images, { base64: image, uniqueKey }]);
  };

  const handleFileDelete = (image, uniqueKey) => {
    setImages(images.filter((img) => img.image !== image && img.uniqueKey !== uniqueKey));
  };

  const handleChange = (sectors) => {
    setSelectedSectors(sectors);
  };

  useEffect(() => {
    if (data.cover === null) return;

    setCoverImage(data.cover.data.original);
  }, [setCoverImage, data]);

  useEffect(() => {
    if (data.images == null) return;
    const newImages = [];

    data.images.forEach((item, index) => {
      newImages.push({ id: item.data.id, image: item.data.original });
    });

    setImages(newImages);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setCoverImage(data.cover.data.id);
  }, [data]);

  useEffect(() => {
    if (!data.relations.sectors) return;

    data.relations.sectors.forEach((item, index) => {
      setSelectedSectors((selectedSectors) => [...selectedSectors, item.data.id]);
    });
  }, [setSelectedSectors, data]);

  useEffect(() => {
    if (newCoverImage) {
      if (!realizationMutation.isSuccess || !mediaMutation.isSuccess) return;
    } else {
      if (!realizationMutation.isSuccess) return;
    }
    router.push(getProPath('/realizations')).then();
  }, [realizationMutation, mediaMutation, newCoverImage, router, getProPath]);

  useEffect(() => {
    if (!realizationDelete.isSuccess) return;
    router.push(getProPath('/realizations')).then();
  }, [realizationDelete, router, getProPath]);

  return (
    <>
      <Form onSubmit={handleSubmit(handlePost)}>
        <Fields>
          <FormGroup>
            <FormLabel htmlFor="title" required={true}>
              {t('app.pro.pages.realizations.add.title')}
            </FormLabel>
            <Input
              ref={register}
              name="title"
              maxLength={70}
              required={true}
              placeholder={t('app.pro.pages.realizations.add.placeholders.title')}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="subtitle">{t('app.pro.pages.realizations.add.subtitle')}</FormLabel>
            <Input
              ref={register}
              name="subtitle"
              maxLength={70}
              placeholder={t('app.pro.pages.realizations.add.placeholders.subtitle')}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="description" required={true}>
              {t('app.pro.pages.realizations.add.description')}
            </FormLabel>
            <Textarea
              ref={register}
              name="body"
              maxLength={600}
              rowsMin={6}
              rowsMax={12}
              required={true}
              placeholder={t('app.pro.pages.realizations.add.placeholders.description')}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="description" required={true}>
              {t('app.pro.pages.realizations.add.sector')}
            </FormLabel>
            <StyledActivityPicker
              value={selectedSectors}
              onChange={handleChange}
              direction={'vertical'}
              openRequestCategoryModal={onOpenRequestCategoryModal}
            />
          </FormGroup>
          {!isMobile && (
            <StyledButton
              arrow="none"
              type="submit"
              disabled={
                newCoverImage
                  ? realizationMutation.isLoading || mediaMutation.isLoading
                  : realizationMutation.isLoading
              }
              isLoading={
                newCoverImage
                  ? realizationMutation.isLoading || mediaMutation.isLoading
                  : realizationMutation.isLoading
              }
            >
              {t('app.pro.pages.realizations.add.save')}
            </StyledButton>
          )}
        </Fields>
        <Images isMobile={isMobile}>
          {[...Array(10)].map((_, index) =>
            index === 0 ? (
              <ImageUpload
                key={index}
                id={data.cover.data.id}
                uniqueKey={`uniqueKey-${index}`}
                cover={true}
                required={true}
                onUpload={handleCoverUpload}
                onDelete={handleFileDelete}
                excistingFile={data.cover.data.original}
              />
            ) : (
              <ImageUpload
                key={index}
                id={index <= data.images.length ? data.images[index - 1].data.id : null}
                uniqueKey={`uniqueKey-${index}`}
                onUpload={handleImageUpload}
                onDelete={handleFileDelete}
                excistingFile={
                  index <= data.images.length ? data.images[index - 1].data.original : ''
                }
                isMobile={isMobile}
                isTablet={isTablet}
              />
            )
          )}
        </Images>
        {isMobile && (
          <StyledButton
            arrow="none"
            type="submit"
            disabled={
              newCoverImage
                ? realizationMutation.isLoading || mediaMutation.isLoading
                : realizationMutation.isLoading
            }
            isLoading={
              newCoverImage
                ? realizationMutation.isLoading || mediaMutation.isLoading
                : realizationMutation.isLoading
            }
          >
            {t('app.pro.pages.realizations.add.save')}
          </StyledButton>
        )}
      </Form>
      <RequestCategoryModal
        open={isRequestCategoryModalOpen}
        onClose={onCloseRequestCategoryModal}
      />
      <DeleteLink isMobile={isMobile}>
        <SvgIcon icon={Icons.DELETE} size={1.4} />
        <span onClick={handleDelete}>{t('app.pro.pages.realizations.add.delete')}</span>
      </DeleteLink>
    </>
  );
};

export default EditRealizationForm;
