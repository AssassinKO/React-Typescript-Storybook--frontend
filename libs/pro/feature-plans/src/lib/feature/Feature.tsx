import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTheme } from '@material-ui/core';

export interface FeatureProps {
  title: string;
  text: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  isMobile: boolean;
  gradient?: boolean;
}

const Wrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  padding: 0 2rem 1rem;
  position: relative;
  flex: ${({ isMobile }) => !isMobile && '0 0 50%'};
`;

const Header = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  align-items: center;

  ${({ isMobile, theme }) =>
    isMobile &&
    `
    border-bottom: 0.1rem solid ${theme.palette.grey['300']};
    padding-bottom: 1rem;
  `};
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Icon = styled(({ gradient, ...restProps }) => <div {...restProps} />)`
  margin-right: 1.5rem;
  overflow: hidden;

  ${({ gradient }) =>
    gradient &&
    `
    top: 0;
    left: 0;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  `};
  img {
    max-width: 2.4rem;
  }
`;

const Arrow = styled(({ active, ...restProps }) => <SvgIcon {...restProps} />)`
  margin-right: 0;
  margin-left: auto;

  ${({ active }) =>
    active &&
    `
    transform: rotate(90deg);
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  `};
`;

const Text = styled(({ isMobile, gradient, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6rem;
  padding: ${({ isMobile, gradient }) =>
    isMobile ? '1rem 0' : gradient ? '0 0 1rem 4.5rem' : '0 0 1rem 3rem'};
`;

export const Feature: FC<FeatureProps> = ({
  title,
  text,
  icon,
  iconSize = 1.5,
  iconColor,
  isMobile,
  gradient = false,
}) => {
  const theme = useTheme();
  const [toggleText, setToggleText] = useState(false);

  return (
    <Wrapper isMobile={isMobile}>
      <Header onClick={() => setToggleText(!toggleText)} isMobile={isMobile}>
        <Icon gradient={gradient}>
          {icon ? (
            <img src={`./feature-icons/${icon}`} alt="" />
          ) : (
            <SvgIcon icon={Icons.STAR_SOLID} size={1.5} color={theme.palette.green.main} />
          )}
        </Icon>
        <Title>{title}</Title>
        {isMobile && (
          <Arrow
            icon={Icons.ANGLE_RIGHT}
            size={1.8}
            color={gradient ? '#fff' : theme.palette.grey['500']}
            active={toggleText}
          />
        )}
      </Header>
      {isMobile && toggleText ? (
        <Text isMobile>{text}</Text>
      ) : !isMobile ? (
        <Text gradient={gradient}>{text}</Text>
      ) : null}
    </Wrapper>
  );
};
