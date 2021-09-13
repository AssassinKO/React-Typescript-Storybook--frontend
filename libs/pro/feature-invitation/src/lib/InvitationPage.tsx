import React, { useEffect, useState } from 'react';

import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Button, Icons, Modal, SectionTitle, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import {
  CompaniesApiFactory,
  InvitationsApiFactory,
  useApiFactory,
  useMutationFetch,
  useQueryFetch,
} from '@homeproved/shared/data-access';
import { ExcelUpload } from './components/ExcelUpload';
import { AddClientsTable } from './components/AddClientsTable';
import {
  Description,
  FormatText,
  ModalBody,
  ModalContent,
  PageShell,
  ThumbsUp,
  Title,
  WhiteBox,
  LimitText,
  LimitAmount,
  LimitBall,
  StyledButton,
} from './components/Atoms';
import { useUser } from '@homeproved/shared-feature-auth-codana';
import { useCompany } from '@homeproved/shared/feature-company';
import ReactHtmlParser from 'react-html-parser';
import { AcceptGDPRField } from './components/AcceptGDPRField';
import { ErrorMessage } from '@homeproved/shared/feature-forms';

export type InvitationPageProps = {
  getPath: GetPathFunction;
};

export const InvitationPage = ({ getPath }) => {
  const { t } = useTranslation();
  const user = useUser();
  const { company, isSuccess } = useCompany(user?.['relations']?.company?.data?.id?.toString());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const isDesktop = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.md));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.lg));
  const isOffCanvas = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.offCanvas));
  const invitationsApi = useApiFactory(InvitationsApiFactory);
  const proDashboardApi = useApiFactory(CompaniesApiFactory);
  const { query } = useQueryFetch(
    'pro-dashboard-get',
    () => proDashboardApi.apiCompaniesProDashboardGet(company.id.toString()),
    {
      options: {
        enabled: isSuccess,
        refetchOnWindowFocus: false,
      },
    }
  );

  const [remainingInvites, setRemainingInvites] = useState(0);

  const [excelFile, setExcelFile] = useState(null);
  const { mutation: postExcelMutation } = useMutationFetch('postExcel', (body) =>
    invitationsApi.apiCompaniesInviteForReviewExcelPost(body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isGDPRAccepted, setIsGDPRAccepted] = useState(false);

  useEffect(() => {
    if (postExcelMutation.isError && !isOpen) {
      setIsOpen(true);
    }
    if (postExcelMutation.isSuccess && !isOpen) {
      setExcelFile(null);
      setIsOpen(true);
    }
  }, [postExcelMutation, isOpen]);

  useEffect(() => {
    if (query.isSuccess && query?.data?.data?.numberOfInvitesRemainingForReviews != null) {
      setRemainingInvites(query.data.data.numberOfInvitesRemainingForReviews);
    }
  }, [query]);

  const handleFileUpload = (file) => {
    setExcelFile(file);
  };
  const handleFileDelete = () => {
    setExcelFile(null);
  };

  const sendFile = () => {
    if (excelFile == null || !isGDPRAccepted) return;
    const formData = new FormData();
    formData.append('file', excelFile[0]);
    postExcelMutation.mutate(formData);
  };
  const closeModal = () => {
    setIsOpen(false);
    postExcelMutation.reset();
  };

  return (
    <PageShell>
      <SectionTitle
        label={t('app.pro.pages.invitation.title')}
        textAlign={isMobile ? 'center' : 'left'}
        font={'PTSans'}
        uppercase={true}
        ignoreMobile
      />
      {(isTablet || (!isDesktop && !isOffCanvas)) && (
        <WhiteBox pt={2} pb={2} pl={2} pr={2} mb={2}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            mb={1}
          >
            <SvgIcon icon={Icons.EMAIL} color="gradient" size={3} />
            <Box ml={2} mr={2}>
              <LimitText variant="body1">{t('app.pro.pages.invitation.limit.text')}</LimitText>
            </Box>
            <LimitAmount variant="body1">
              {company?.relations?.subscription?.data?.features?.reviewInvitationsNr ?? 0}
            </LimitAmount>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button variant="gradient" href={getPath('/registration/step1')}>
              {t('app.pro.pages.invitation.limit.cta')}
            </Button>
          </Box>
        </WhiteBox>
      )}
      <WhiteBox mb={5} pt={4} pr={2} pb={4} pl={2} position="relative">
        {!isTablet && (isDesktop || isOffCanvas) && (
          <LimitBall>
            <Box marginBottom="0.5rem">
              <SvgIcon icon={Icons.EMAIL} color="gradient" size={isLargeDesktop ? 4 : 3.5} />
            </Box>
            <Box maxWidth="18rem">
              <LimitText variant="body1">{t('app.pro.pages.invitation.limit.text')}</LimitText>
            </Box>
            <Box mb={1}>
              <LimitAmount variant="body1">{remainingInvites}</LimitAmount>
            </Box>
            <StyledButton
              variant="gradient"
              size={isLargeDesktop ? 'medium' : 'small'}
              largeDesktop={isLargeDesktop}
              href={getPath('/registration/step1')}
            >
              {t('app.pro.pages.invitation.limit.cta')}
            </StyledButton>
          </LimitBall>
        )}
        <Box
          maxWidth="32rem"
          margin="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Title variant="h2">{t('app.pro.pages.invitation.uploadExcel.title')}</Title>
          <Description variant="body1">
            {t('app.pro.pages.invitation.uploadExcel.description')}
          </Description>
          <ExcelUpload onUpload={handleFileUpload} onDelete={handleFileDelete} file={excelFile} />
          <FormatText variant="body1">
            {t('app.pro.pages.invitation.uploadExcel.format')}
          </FormatText>
          <Box mb={3}>
            <AcceptGDPRField value={isGDPRAccepted} onChange={setIsGDPRAccepted} />
          </Box>
          <Button
            variant="gradient"
            onClick={sendFile}
            disabled={
              !excelFile || postExcelMutation.isLoading || !isGDPRAccepted || remainingInvites === 0
            }
            isLoading={postExcelMutation.isLoading}
          >
            {t('app.pro.pages.invitation.uploadExcel.buttonText')}
          </Button>
          {remainingInvites === 0 && (
            <Box mt={1}>
              <ErrorMessage>
                {t('app.pro.pages.invitation.uploadManually.form.limitReachedText')}
              </ErrorMessage>
            </Box>
          )}
        </Box>
      </WhiteBox>
      <WhiteBox pt={4} pr={2} pb={4} pl={2}>
        <Box
          maxWidth="71.5rem"
          margin="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <AddClientsTable
            isMobile={isMobile}
            company={company}
            remainingInvites={remainingInvites}
          />
        </Box>
      </WhiteBox>
      <Modal open={isOpen} onClose={closeModal} icon={Icons.FLAG}>
        <ModalBody>
          {postExcelMutation.isSuccess && (
            <>
              <ThumbsUp>
                <img src="/approved2.png" loading="lazy" alt="Approved" />
              </ThumbsUp>
              <ModalContent variant="h3">
                {t('app.pro.pages.invitation.uploadManually.modal.successMessage')}
              </ModalContent>
            </>
          )}
          {postExcelMutation.isError && (
            <>
              <Box mb={2}>
                <SvgIcon icon={Icons.CROSS} color={theme.palette.primary.main} />
              </Box>
              <ModalContent variant="h3">
                {ReactHtmlParser(t('app.pro.pages.invitation.uploadManually.modal.failedMessage'))}
              </ModalContent>
            </>
          )}
        </ModalBody>
      </Modal>
    </PageShell>
  );
};

export default InvitationPage;
