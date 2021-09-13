import { MediaResponseDataConversions } from '@homeproved/shared/data-access';
import { GradientUnderline, Icons, SvgIcon } from '@homeproved/shared/ui';
import { Typography } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';

type ArticleData = {
  image: MediaResponseDataConversions[];
  name: string;
  title: string;
  description?: string;
  isFavorite?: boolean;
};

type CoverProps = {
  article: ArticleData;
  isVisible: boolean;
  isMobile: boolean;
  isTablet: boolean;
  height: string;
  showDescription?: boolean;
  bannerMaxWidth: string;
};

const StyledCover = styled(({ image, height, ...restProps }) => <div {...restProps} />)`
  width: 100%;
  height: ${({ height }) => height};
  background: ${({ image }) => `url(${image}) center center no-repeat`};
  border-radius: 0.5rem;
  position: relative;
  margin-bottom: 2rem;
  overflow: hidden;
  background-size: cover;
`;

const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Text = styled(Typography)`
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const CoverContent = styled(({ active, ...restProps }) => <div {...restProps} />)`
  background-color: rgba(0, 0, 0, 0.65);
  padding: 2rem 3.3rem 2rem 2rem;
  transition: transform 0.5s ease;
  transform: ${({ active }) => (active ? 'translateX(0)' : 'translateX(100%)')};
`;
const CoverContentWrapper = styled(({ bannerMaxWidth, ...restProps }) => <div {...restProps} />)`
  overflow: hidden;
  position: absolute;
  right: 1.2rem;
  bottom: 2.5rem;
  max-width: ${({ bannerMaxWidth }) => bannerMaxWidth};
  width: calc(100% - 2.4rem);
  &:after {
    content: '';
    display: block;
    width: 0.8rem;
    height: 100%;
    background: ${({ theme }) => theme.config.gradients.vertical};
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;
const FavoriteTriangle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 8rem 8rem 0;
  border-color: transparent rgba(0, 0, 0, 0.65) transparent transparent;
`;
const StyledIcon = styled(SvgIcon)`
  position: absolute;
  right: -6.8rem;
  top: 1.2rem;
`;

export const Cover: FC<CoverProps> = ({
  article,
  isVisible,
  isMobile,
  isTablet,
  height,
  showDescription,
  bannerMaxWidth,
}) => {
  return (
    <StyledCover
      image={article.image?.[isMobile ? 'landscape-s' : isTablet ? 'landscape-m' : 'landscape-l']}
      height={height}
    >
      <CoverContentWrapper bannerMaxWidth={bannerMaxWidth}>
        <CoverContent active={isVisible}>
          <GradientUnderline text={article.name} color="#fff" />
          <Title variant="h2">{article.title}</Title>
          {showDescription && <Text variant="body1">{article.description}</Text>}
        </CoverContent>
      </CoverContentWrapper>
      {article.isFavorite && (
        <FavoriteTriangle>
          <StyledIcon icon={Icons.HEART_SOLID} color="#fff" size={2.5} />
        </FavoriteTriangle>
      )}
    </StyledCover>
  );
};
