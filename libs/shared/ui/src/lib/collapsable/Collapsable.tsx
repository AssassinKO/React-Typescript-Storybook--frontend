import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Accordion, AccordionDetails, AccordionSummary, useTheme } from '@material-ui/core';
import { Icons, SvgIcon } from '../svg-icon';
import ReactHtmlParser from 'react-html-parser';

export type CollapsableProps = {
  title: string;
  text: string;
};

const StyledAccordion = styled(Accordion)`
  background: transparent;
  box-shadow: none;

  &:before {
    content: none;
  }
  &.Mui-expanded {
    margin: 0;
  }
  .MuiAccordionSummary-root {
    padding: 0;
  }
`;

const StyledAccordionSummary = styled(({ expanded, ...restProps }) => (
  <AccordionSummary {...restProps} />
))`
  &.Mui-expanded {
    min-height: 4.8rem;
  }
  .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme, expanded }) =>
      expanded ? theme.palette.primary.main : theme.palette.grey['800']};
    border-bottom: 0.2rem solid ${({ theme }) => theme.palette.primary.main};
    margin: 0;
    padding: 1.5rem 4rem 1.5rem 0;
    line-height: 2.3rem;

    &.Mui-expanded {
      margin: 0;
    }
  }
`;

const StyledIcon = styled(({ ...restProps }) => <SvgIcon {...restProps} />)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  display: block;
  margin-top: 1rem;
  padding: 0;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  h3 {
    font-family: ${({ theme }) => theme.config.fonts.Cabrito};
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1.4rem;
  }
  ul {
    padding-left: 1.8rem;
    li {
      padding-left: 1rem;
    }
  }
`;

export const Collapsable: FC<CollapsableProps> = ({ title, text }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledAccordion onChange={handleChange}>
      <StyledAccordionSummary expanded={expanded}>
        {title}
        <StyledIcon
          icon={expanded ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
          color={theme.palette.grey['800']}
        />
      </StyledAccordionSummary>
      <StyledAccordionDetails>{ReactHtmlParser(text)}</StyledAccordionDetails>
    </StyledAccordion>
  );
};
