import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import Link from 'next/link';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const StyledLink = styled.a`
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 600;
  text-decoration: underline;
  margin-right: 0.5rem;
  cursor: pointer;
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

export const ReportError: FC = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedRoutes();

  return (
    <Wrapper>
      <Link href={getPath('/')} passHref>
        <StyledLink href={getPath('/')}>
          {t('app.com.pages.company.companyShell.reportError')}
        </StyledLink>
      </Link>
      <SvgIcon size={1.5} icon={Icons.FLAG} />
    </Wrapper>
  );
};
