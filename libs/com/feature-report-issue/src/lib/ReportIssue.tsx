import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { SvgIcon, Icons } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { ReportPopup } from '@homeproved/shared/feature-forms';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

const StyledReportIssue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  color: ${({ theme }) => theme.palette.grey[700]};
  &:hover {
    color: ${({ theme }) => theme.palette.grey[800]};
    svg {
      fill: ${({ theme }) => theme.palette.grey[800]};
    }
  }
`;

const Text = styled.div`
  text-decoration: underline;
  cursor: pointer;
  padding: 0 1rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: bold;
`;

type ReportIssueProps = {
  companyId: string;
};

export const ReportIssue: FC<ReportIssueProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const { getPath } = useLocalizedRoutes();

  return (
    <>
      <StyledReportIssue>
        <Text
          onClick={() => {
            setModalOpen(true);
          }}
        >
          {t('shared.report.open')}
        </Text>
        <SvgIcon icon={Icons.FLAG} size={1.5} color={'inherit'} />
      </StyledReportIssue>
      <ReportPopup
        isOpen={modalOpen}
        setOpen={setModalOpen}
        companyId={companyId}
        getPath={getPath}
      />
    </>
  );
};
