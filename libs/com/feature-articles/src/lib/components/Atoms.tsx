import { Button } from '@homeproved/shared/ui';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled.div``;
export const InnerWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  position: relative;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
`;

export const ContentWrapper = styled(({ desktop, ...restProps }) => <div {...restProps} />)`
  width: 100%;
`;
export const LoadingMessage = styled(Typography)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.6rem;
`;

export const Sidebar = styled(
  ({ offCanvas, offCanvasOpen, innerRef, smallDesktop, ...restProps }) => (
    <div ref={innerRef} {...restProps} />
  )
)`
  box-shadow: ${({ theme }) => theme.config.defaultBoxShadow};
  width: 30rem;
  height: 100%;
  min-height: ${({ smallDesktop }) =>
    smallDesktop ? 'calc(100vh - 10rem)' : 'calc(100vh - 8rem)'};
  background: rgba(255, 255, 255, 0.97);
  padding: 1.2rem 1.5rem;
  transition: left 0.25s ease-in-out;
  ${({ offCanvas, offCanvasOpen }) =>
    offCanvas &&
    `
    position: absolute;
    top: 0;
    left: ${offCanvasOpen ? 0 : '-30rem'};
    z-index: 99;
  `}
`;

export const StyledA = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const HeaderContainer = styled.div`
  margin: 0 -0.6rem;
  display: flex;
`;
export const FaqBlockWrapper = styled(({ mobile, tablet, ...restProps }) => <div {...restProps} />)`
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  max-width: ${({ mobile }) => (mobile ? '40rem' : 'none')};
  margin: ${({ mobile }) => (mobile ? '0 auto' : '0 0.6rem 1.2rem')};
  flex-basis: ${({ mobile, tablet }) =>
    mobile ? '100%' : tablet ? 'calc(50% - 1.2rem)' : 'calc(25% - 1.2rem)'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 2rem 4rem;
  background: ${({ theme }) => theme.config.gradients.rotated};
  border-radius: 0.5rem;
`;

export const FaqTitle = styled(({ tablet, ...restProps }) => <Typography {...restProps} />)`
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
  text-align: ${({ tablet }) => (tablet ? 'center' : 'left')};
`;
export const FaqDescription = styled(({ mobile, tablet, ...restProps }) => (
  <Typography {...restProps} />
))`
  font-size: 1.4rem;
  line-height: 1.9rem;
  color: #fff;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 4rem;
  text-align: ${({ tablet, mobile }) => (mobile ? 'left' : tablet ? 'center' : 'left')};
  align-self: center;
`;

export const Header = styled(({ mobile, tablet, noFaq, ...restProps }) => <div {...restProps} />)`
  border: ${({ mobile, theme }) => (mobile ? 'none' : `0.1rem solid ${theme.palette.grey[400]}`)};
  border-radius: 0.5rem;
  padding: ${({ mobile }) => (mobile ? 0 : '5rem 5.5rem 6rem')};
  margin: ${({ mobile }) => (mobile ? '0 auto 3.5rem' : '0 0.6rem 1.2rem')};
  flex-basis: ${({ tablet, noFaq }) => (tablet || noFaq ? '100%' : 'calc(75% - 1.2rem)')};
`;

export const Title = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => (mobile ? '1.8rem' : '3.2rem')};
  font-weight: 700;
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
  margin-bottom: ${({ mobile }) => (mobile ? '1rem' : '0.5rem')};
`;
export const SubTitle = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => (mobile ? '1.4rem' : '2rem')};
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  color: ${({ theme }) => theme.palette.primary.main};
  text-transform: uppercase;
  margin-bottom: ${({ mobile }) => (mobile ? '2rem' : '2.5rem')};
  font-weight: 500;
`;
export const Description = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => (mobile ? '1.2rem' : '1.6rem')};
  line-height: ${({ mobile }) => (mobile ? '2.5rem' : '3rem')};
  font-weight: ${({ mobile }) => (mobile ? 300 : 500)};
  margin: ${({ mobile }) => (mobile ? '0 auto 2rem' : 0)};
  max-width: ${({ mobile }) => (mobile ? '30rem' : '100%')};
`;

export const Tiles = styled(({ isMobile, isTablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.6rem;

  > * {
    max-width: ${({ isMobile }) => (isMobile ? '40rem' : 'none')};
    margin: ${({ isMobile }) => (isMobile ? '0 auto 2rem' : '0 0.6rem 1.2rem')};
    flex-basis: ${({ isMobile, isTablet }) =>
      isMobile ? '100%' : isTablet ? 'calc(50% - 1.2rem)' : 'calc(25% - 1.2rem)'};
  }
`;

export const ArticleContent = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  margin-top: ${({ mobile }) => (mobile ? '3rem' : '8rem')};
`;

export const ArticleTitle = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => (mobile ? '1.8rem' : '2.5rem')};
  font-weight: 700;
  margin-bottom: ${({ mobile }) => (mobile ? '1rem' : '0.5rem')};
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
`;

export const ArticleSubtitle = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => (mobile ? '1.6rem' : '1.8rem')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
`;

export const Separator = styled.div`
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey[500]};
  margin-bottom: 2rem;
`;

export const ArticleDescription = styled(({ mobile, ...restProps }) => (
  <Typography {...restProps} />
))`
  font-size: ${({ mobile }) => (mobile ? '1.4rem' : '1.6rem')};
  line-height: 2.5rem;
  margin-bottom: ${({ mobile }) => (mobile ? '3rem' : '5rem')};
`;

export const CustomGridItem = styled(({ variant, mobile, tablet, order, ...restProps }) => (
  <div {...restProps} />
))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  order: ${({ order }) => order};
  margin: ${({ mobile }) => (mobile ? '0' : '0 3rem')};
  ${({ variant, tablet }) =>
    variant === 'left'
      ? `
    flex-basis: ${tablet ? '100%' : 'calc(60% - 6rem)'};
    ${FlexibleContentText}{
      padding: 0;
    }
  `
      : variant === 'right'
      ? `
    flex-basis: ${tablet ? '100%' : 'calc(40% - 6rem)'};
  `
      : `
    flex-basis: 100%;
    ${FlexibleContentText}{
      padding: 0;
    }
  `}
`;

export const Caption = styled(({ maxWidth, ...restProps }) => <Typography {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.3rem;
  max-width: ${({ maxWidth }) => maxWidth};
  margin: auto;
  width: 100%;
`;

export const CustomGrid = styled(({ mobile, noMarginBottom, ...restProps }) => (
  <div {...restProps} />
))`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${({ mobile }) => (mobile ? 0 : '-3rem')};
  margin-right: ${({ mobile }) => (mobile ? 0 : '-3rem')};
  margin-bottom: ${({ mobile, noMarginBottom }) => (noMarginBottom ? 0 : mobile ? '4rem' : '6rem')};
  ${({ noMarginBottom }) =>
    noMarginBottom &&
    `
  ${CustomGridItem} {
    position: relative;
    ${Caption} {
      position: absolute;
      bottom: -2rem;
    }
  }
  `}
`;

export const FlexibleContentText = styled(
  ({ mobile, tablet, noPadding, maxWidth, ...restProps }) => <div {...restProps} />
)`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ tablet, noPadding }) =>
    noPadding ? '0 !important' : tablet ? '2rem 0 0 !important' : '0 2rem'};
  max-width: ${({ maxWidth }) => maxWidth};
  margin: auto;
  width: 100%;
  h2 {
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.5rem;
    margin-bottom: 2rem;
    margin-top: 0;
  }
  h3 {
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    font-size: 1.8rem;
    line-height: 2.3rem;
    margin-top: 0;
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 2rem;
    font-weight: ${({ mobile }) => (mobile ? 700 : 500)};
  }
  p {
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    font-size: 1.4rem;
    line-height: ${({ mobile }) => (mobile ? '2.5rem' : '2.2rem')};
    margin-bottom: 0;
    margin-top: 0;
  }
  blockquote {
    margin: 0 0 0 3rem;
    p {
      font-style: italic;
      font-size: 2rem;
    }
    &:before {
      content: '';
      background: url('/quote.svg');
      width: 1.5rem;
      height: 1.5rem;
      display: block;
      position: absolute;
      left: 0;
    }
  }
`;

export const StyledImage = styled(({ maxWidth, alt, title, ...restProps }) => (
  <img alt={alt} title={title} {...restProps} />
))`
  border-radius: 0.5rem;
  max-width: ${({ maxWidth }) => maxWidth};
  margin: auto;
`;

export const CoveredImage = styled(({ maxWidth, alt, title, marginBottom, ...restProps }) => (
  <img alt={alt} title={title} {...restProps} />
))`
  border-radius: 0.5rem;
  max-width: ${({ maxWidth }) => maxWidth};
  margin: auto;
  height: 40rem;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '2rem' : 0)};
`;

export const StyledTextButton = styled(Button)`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.4rem;
  padding-left: 3rem;
  letter-spacing: 0.02rem;
  margin-left: -1rem;
  svg {
    width: 0.8em;
    height: 0.8em;
  }
`;

export const GalleryTitle = styled(Typography)`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;
