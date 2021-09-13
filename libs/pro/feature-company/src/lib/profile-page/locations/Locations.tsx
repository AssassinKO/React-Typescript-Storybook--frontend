import React, { FC } from 'react';
import styled from 'styled-components';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const Wrapper = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  text-align: center;
`;

const Label = styled.div`
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const StyledA = styled.a`
  color: inherit;
  text-decoration: underline;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;

  &:hover,
  &:visited {
    color: inherit;
  }
`;

const StyledIcon = styled(SvgIcon)`
  margin-right: 0.5rem;
`;

export const Locations: FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Label>{t('app.pro.pages.profile.locations')}</Label>
      <div>
        <Link href={''} passHref>
          <StyledA href={''}>
            <StyledIcon icon={Icons.LOCATION_OUTLINE} size={1.5} />
            {t('app.pro.pages.profile.addLocation')}
          </StyledA>
        </Link>
      </div>
    </Wrapper>
  );
};
