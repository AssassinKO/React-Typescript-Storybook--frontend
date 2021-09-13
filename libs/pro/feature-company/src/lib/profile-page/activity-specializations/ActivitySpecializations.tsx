import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ActivityPicker, RequestCategoryModal } from '@homeproved/shared/feature-sectors';
import {
  CompaniesApiFactory,
  CompanyData,
  useApiFactory,
  useMutationFetch,
} from '@homeproved/shared/data-access';
import { Button } from '@homeproved/shared/ui';
import { useForm } from 'react-hook-form';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useDisclosure } from 'react-use-disclosure';

type ActivitySpecializationsProps = {
  data: CompanyData;
  mobileSaveButton?: boolean;
};

const Form = styled.form`
  margin-bottom: 2rem;
  padding: 2rem;
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

const Top = styled(({ mobileSaveButton, ...restProps }) => <div {...restProps} />)`
  display: flex;
  margin-bottom: 2rem;
  justify-content: ${({ mobileSaveButton }) => mobileSaveButton && 'center'};
`;

const Label = styled.div`
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const SaveButton = styled(({ mobileSaveButton, ...restProps }) => <Button {...restProps} />)`
  display: table;
  margin: ${({ mobileSaveButton }) => (mobileSaveButton ? '2rem auto 0' : '0 0 0 auto')};
`;

export const ActivitySpecializations: FC<ActivitySpecializationsProps> = ({
  data,
  mobileSaveButton = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);
  const [changed, setChanged] = useState(false);
  const { handleSubmit } = useForm();
  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { mutation } = useMutationFetch('companyPatch', (body) =>
    companiesApi.apiCompaniesCompanyPatch(data.id.toString(), body)
  );
  const {
    isOpen: isRequestCategoryModalOpen,
    close: onCloseRequestCategoryModal,
    open: onOpenRequestCategoryModal,
  } = useDisclosure(false);

  useEffect(() => {
    if (!data.relations || !data.relations.sectors) return;
    const newSectors = [];
    data.relations.sectors.forEach((sector) => {
      sector.data.descendants.forEach((subsector) => {
        newSectors.push(subsector['data'].id);
      });
    });
    setSelectedSectors(newSectors);
  }, [data]);

  const handlePatch = (data) => {
    mutation.mutate({ sectorIds: selectedSectors });
    setChanged(false);
  };

  const handleChange = (sectors) => {
    setChanged(true);
    setSelectedSectors(sectors);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handlePatch)}>
        <Top mobileSaveButton={mobileSaveButton}>
          <Label>{t('app.pro.pages.profile.activitySpecialization')}</Label>
          {!mobileSaveButton && (
            <SaveButton
              type={'submit'}
              variant={'gradient'}
              onClick={handlePatch}
              disabled={!changed || selectedSectors.length === 0}
            >
              {t('app.pro.pages.profile.save')}
            </SaveButton>
          )}
        </Top>
        <ActivityPicker
          value={selectedSectors}
          onChange={handleChange}
          isMobile={isMobile}
          openRequestCategoryModal={onOpenRequestCategoryModal}
        />
        {mobileSaveButton && (
          <SaveButton
            type={'submit'}
            variant={'gradient'}
            onClick={handlePatch}
            mobileSaveButton={mobileSaveButton}
            disabled={!changed || selectedSectors.length === 0}
          >
            {t('app.pro.pages.profile.save')}
          </SaveButton>
        )}
      </Form>
      <RequestCategoryModal
        open={isRequestCategoryModalOpen}
        onClose={onCloseRequestCategoryModal}
      />
    </>
  );
};
