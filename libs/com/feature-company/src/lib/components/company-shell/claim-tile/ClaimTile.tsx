import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button, Icons, SvgIcon } from '@homeproved/shared/ui';
import { CompanyData } from '@homeproved/shared/data-access';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';

export interface ClaimTileProps {
  data: CompanyData;
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.config.gradients.rotated};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  margin: 3rem 0;
  padding: 3rem 5rem;
  color: #fff;
  text-align: center;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 2rem;
`;

export const ClaimTile: FC<ClaimTileProps> = ({ data }) => {
  const { t } = useTranslation();
  const { getPath: getProPath } = useProLocalizedRoutes();

  return (
    <Wrapper>
      <SvgIcon icon={Icons.HELMET_SOLID} color={'#fff'} size={4.5} />
      <Title>{`${t('app.com.pages.company.companyShell.owner')} ${data.name}?`}</Title>
      <Text>{t('app.com.pages.company.companyShell.claimText')}</Text>
      <Button
        variant="white"
        href={`${process.env.NEXT_PUBLIC_PRO_URL}${getProPath('/registration/step1')}?id=${
          data.id
        }`}
        target="_blank"
      >
        {t('app.com.pages.company.companyShell.claim')}
      </Button>
    </Wrapper>
  );
};
