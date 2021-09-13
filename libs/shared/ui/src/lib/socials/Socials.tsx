import React, { FC } from 'react';
import styled from 'styled-components';
import { SvgIcon, Icons } from '../..';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';

const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Label = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled.a`
  display: inline-block;
  margin: 1rem 0.8rem;

  &:hover {
    margin: 0;

    svg {
      width: 4rem;
      height: 4rem;
    }
  }
`;

export const Socials: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Wrapper>
      <Label>{t('shared.likeSharePin')}</Label>
      <IconWrapper>
        <Link href={'https://www.facebook.com/HelloHomeproved'} target={'_blank'}>
          <SvgIcon icon={Icons.FACEBOOK} size={2.4} color={theme.palette.grey['800']} />
        </Link>
        <Link href={'https://www.instagram.com/homeprovedcom'} target={'_blank'}>
          <SvgIcon icon={Icons.INSTAGRAM} size={2.4} color={theme.palette.grey['800']} />
        </Link>
        <Link href={'https://www.pinterest.com/homeprovedcom'} target={'_blank'}>
          <SvgIcon icon={Icons.PINTEREST} size={2.4} color={theme.palette.grey['800']} />
        </Link>
      </IconWrapper>
    </Wrapper>
  );
};
