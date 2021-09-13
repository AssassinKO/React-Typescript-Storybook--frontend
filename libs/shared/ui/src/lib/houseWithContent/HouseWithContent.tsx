import React, { FC } from 'react';
import styled from 'styled-components';

type HouseWithContentProps = {
  roofTopIcon?: React.ReactNode;
  roofTopTitle?: React.ReactNode | string;
  width?: number;
  isMobile?: boolean;
};

const House = styled(({ width, ...restProps }) => <div {...restProps} />)`
  position: relative;
  overflow: hidden;
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  min-width: 30rem;
`;

const Roof = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

const Content = styled(({ topPadding, isMobile, ...restProps }) => <div {...restProps} />)`
  position: relative;
  z-index: 1;
  padding: ${({ topPadding, isMobile }) =>
    `${topPadding}rem ${isMobile ? '3' : '8'}rem 3rem ${isMobile ? '3' : '8'}rem`};
  width: 100%;
`;

const RoofTopContent = styled(({ topPadding, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ topPadding }) => `${topPadding}rem`};
`;

const RoofTopIcon = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  width: 4rem;
  margin-top: ${({ mobile }) => (mobile ? '1rem' : 0)};
`;

const RoofTopTitle = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  width: 20rem;
  margin-top: ${({ mobile }) => (mobile ? '1rem' : '2rem')};
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.grey['800']};
  text-align: center;
`;

export const HouseWithContent: FC<HouseWithContentProps> = ({
  roofTopIcon,
  roofTopTitle,
  width,
  isMobile = false,
  children,
}) => {
  let topPadding = 15;
  if (width) {
    topPadding = width / 2 - 7;
    topPadding = topPadding < 15 ? 15 : topPadding;
  }

  return (
    <House width={isMobile ? '100%' : width}>
      <Roof>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 536.4">
          <path
            d="M100 536.4V38.7c0-.9-.4-1.8-1.2-2.4L51.8.6c-1.1-.8-2.6-.8-3.7 0l-47 36.8C.4 38 0 38.9 0 39.8v496.6h100z"
            fill="#fff"
          />
        </svg>
      </Roof>
      {(roofTopIcon || roofTopTitle) && (
        <RoofTopContent topPadding={topPadding}>
          {roofTopIcon && <RoofTopIcon mobile={isMobile}>{roofTopIcon}</RoofTopIcon>}
          {roofTopTitle && <RoofTopTitle mobile={isMobile}>{roofTopTitle}</RoofTopTitle>}
        </RoofTopContent>
      )}
      <Content topPadding={topPadding} isMobile={isMobile}>
        {children}
      </Content>
    </House>
  );
};
