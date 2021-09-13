import React, { FC, useEffect } from 'react';
import { useFetchBasicPage } from '../hooks/useFetchBasicPage';
import {
  SectionTitle,
  FlexibleContentRenderer,
  Icons,
  AssessmentPolicySteps,
} from '@homeproved/shared/ui';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FlexibleContent } from '../types';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';

const FlexibleContentWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  ${({ mobile, theme }) =>
    !mobile &&
    `
    padding: 6rem 10rem;
    border: 0.2rem solid ${theme.palette.grey['A200']};
    border-radius: ${theme.config.defaultBorderRadius};

    @media screen and (max-width: ${theme.breakpoints.values.md + 'px'}) {
      padding: 2rem 4rem;
    }
  `}
`;

const Subtitle = styled(({ mobile, children, ...restProps }) => <h2 {...restProps}>{children}</h2>)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0 auto 5rem;
  position: relative;
  max-width: ${({ mobile }) => (mobile ? '30rem' : 'none')};
  &:after {
    content: '';
    display: block;
    width: 12rem;
    height: 2px;
    background-color: #3a3a3a;
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StyledSectionTitle = styled(SectionTitle)`
  height: 6rem;
  margin-top: -2rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs + 'px'}) {
    margin-top: 0rem;
  }
  svg {
    margin-right: 1rem;
    margin-top: -1rem;
    margin-left: -4rem;
  }
`;

export const AssessmentPolicyPage: FC = () => {
  const { t } = useTranslation();
  const { query } = useFetchBasicPage('assessment-policy');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));

  useEffect(() => {
    if (query.isError) {
      // TODO: show snackbar error
    }
  }, [query]);

  // TODO: page loader?
  if (query.isLoading) return null;

  return query.isSuccess ? (
    <Box pl={2} pr={2}>
      <StyledSectionTitle
        label={query.data.data.title}
        icon={Icons.SCROLL}
        iconSize={3}
        morePadding
        underlineMobile
      />
      <AssessmentPolicySteps />
      <FlexibleContentWrapper mobile={isMobile}>
        <Subtitle mobile={isMobile}>{t('basicPages.assessmentPolicy.reviewGuidelines')}</Subtitle>
        {query.data.data.flexibleContent.map((item: FlexibleContent, index) => (
          <FlexibleContentRenderer key={index} item={item.fields} type={item.name} />
        ))}
      </FlexibleContentWrapper>
    </Box>
  ) : null;
};
