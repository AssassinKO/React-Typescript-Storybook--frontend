import React, { FC } from 'react';
import styled from 'styled-components';
import { SvgIcon, Icons } from '../..';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.config.gradients.rotated};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  padding: 2rem;
  text-align: center;
`;

const Label = styled.div`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const StyledSvgIcon = styled(({ ...restProps }) => <SvgIcon {...restProps} />)`
  margin: 2rem 1rem;

  &:hover {
    cursor: pointer;
    margin: 1rem 0;
    width: 6rem;
    height: 6rem;
  }
`;

const SocialsTile: FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Label>{t('shared.likeSharePin')}</Label>
      <IconWrapper>
        <StyledSvgIcon icon={Icons.FACEBOOK} size={'medium'} color={'#fff'} />
        <StyledSvgIcon icon={Icons.INSTAGRAM} size={'medium'} color={'#fff'} />
        <StyledSvgIcon icon={Icons.PINTEREST} size={'medium'} color={'#fff'} />
      </IconWrapper>
    </Wrapper>
  );
};

export default SocialsTile;
