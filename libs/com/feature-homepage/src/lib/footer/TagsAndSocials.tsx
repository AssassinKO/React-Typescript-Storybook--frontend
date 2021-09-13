import React, { FC } from 'react';
import { DEFAULT_WRAPPER_STYLE, Socials, Tag } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type TagsAndSocialsProps = {
  isMobile: boolean;
  isTablet: boolean;
};

const Wrapper = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  width: 100%;
  margin: ${({ isTablet }) => (isTablet ? '2rem 0' : '2rem 0 -6rem')};
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    flex-wrap: wrap;
  }
`;

const Inner = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  ${DEFAULT_WRAPPER_STYLE};
  display: ${({ isTablet }) => (isTablet ? 'block' : 'flex')};
  justify-content: space-between;
  align-items: center;
`;

const Tags = styled(({ isMobile, isTablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: ${({ isTablet }) => (isTablet ? 'center' : 'flex-start')};
  flex-wrap: wrap;
  padding: ${({ isMobile, isTablet }) => !isMobile && isTablet && '0 3rem'};
`;

const StyledTag = styled(({ isMobile, ...restProps }) => <Tag {...restProps} />)`
  margin: ${({ isMobile }) => (isMobile ? '1rem 1rem 0 0' : '2rem 2rem 0 0')};
  font-size: ${({ isMobile }) => isMobile && '1.1rem'};
`;

export const TagsAndSocials: FC<TagsAndSocialsProps> = ({ isMobile, isTablet }) => {
  const { t } = useTranslation();
  const tags: string[] = t('app.com.pages.landing.footer.tags', {
    returnObjects: true,
    defaultValue: [],
  });

  return (
    <Wrapper isTablet={isTablet}>
      <Inner isTablet={isTablet}>
        {isTablet && <Socials />}
        <Tags isMobile={isMobile} isTablet={isTablet}>
          {tags != null &&
            tags.length > 0 &&
            tags.map((tag, index) => (
              <StyledTag key={index} size={'large'} isMobile={isMobile}>
                {tag}
              </StyledTag>
            ))}
        </Tags>
        {!isTablet && <Socials />}
      </Inner>
    </Wrapper>
  );
};
