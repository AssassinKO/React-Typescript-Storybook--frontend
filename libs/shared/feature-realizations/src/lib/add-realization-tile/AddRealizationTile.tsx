import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

export interface AddRealizationTileProps {
  limitReached: boolean;
  getPath: GetPathFunction;
}

const Wrapper = styled.div`
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  background: ${({ theme }) => theme.config.gradients.rotated};
  padding: 6rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  color: #fff;
`;

const StyledButton = styled(Button)`
  margin-top: 2rem;
`;

const StyledImage = styled.img`
  margin-bottom: 2rem;
`;

export const AddRealizationTile: FC<AddRealizationTileProps> = ({ limitReached, getPath }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return limitReached ? (
    <Wrapper>
      <Title>{t('app.pro.pages.realizations.limit.title')}</Title>
      <Text>{ReactHtmlParser(t('app.pro.pages.realizations.limit.text'))}</Text>
      <StyledButton variant={'light'} arrow="none" pill={false} href={getPath('/my-account')}>
        {t('app.pro.pages.realizations.upgrade')}
      </StyledButton>
    </Wrapper>
  ) : (
    <Wrapper>
      <StyledImage src="./heart_speech.png" alt="" />
      <StyledButton
        variant={'light'}
        arrow="none"
        pill={false}
        onClick={() => router.push(getPath('/add-realization'))}
      >
        {t('app.pro.pages.realizations.add.add')}
      </StyledButton>
    </Wrapper>
  );
};

export default AddRealizationTile;
