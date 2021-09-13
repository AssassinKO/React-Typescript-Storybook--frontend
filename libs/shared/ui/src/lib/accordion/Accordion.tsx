import React, { FC, useEffect } from 'react';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { Icons, SvgIcon } from '../svg-icon';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import Link from 'next/link';
import { SectorSidebarItem } from '../types';

export type AccordionProps = {
  items: SectorSidebarItem[];
};

const AccordionSummary = styled(MuiAccordionSummary)`
  padding: 0;
  min-height: 64px;
  .Mui-expanded {
    margin: 0;
  }
  .MuiAccordionSummary-content {
    margin: 0;
  }
  .MuiIconButton-root {
    margin: 0;
    padding: 0;
  }
`;

const AccordionDetails = styled(MuiAccordionDetails)`
  padding: 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    width: 100%;
  }
`;

const Wrapper = styled.div``;
const AccordionItemTitle = styled(({ active, ...restProps }) => <Typography {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 700;
  font-size: 1.4rem;
  text-transform: uppercase;
  margin-left: 3.5rem;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 0;
    height: 0.3rem;
    background: ${({ theme }) => theme.config.gradients.default};
    bottom: -0.6rem;
    position: absolute;
    transition: width 0.2s ease;
  }
  ${({ active }) =>
    active &&
    `
    &:after {
    width: 6.5rem;
    }
  `};
`;

const ListItem = styled(({ active, ...restProps }) => <li {...restProps} />)`
  a {
    padding: 1rem 1rem 1rem 8rem;
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    font-size: 1.6rem;
    line-height: 1.6rem;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.grey[800]};
    display: block;
    ${({ active, theme }) =>
      active &&
      `
      cursor: default;
    font-weight: 700;
    background-color: ${theme.palette.grey['A200']};
  `};
    &:hover {
      font-weight: 700;
    }
  }
`;

export const Accordion: FC<AccordionProps> = ({ items }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (e, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item.isActive) {
        setExpanded(item.name);
        return;
      }
      if (item.subItems.find((i) => i.isActive)) {
        setExpanded(item.name);
      }
    });
  }, [items]);

  return (
    <Wrapper>
      {items.map((item) => (
        <MuiAccordion
          square
          expanded={expanded === item.name}
          onChange={handleChange(item.name)}
          key={`accordion-item-${item.id}`}
        >
          <AccordionSummary
            aria-controls={`${item.name}-content`}
            id={`${item.name}-header`}
            expandIcon={<SvgIcon icon={Icons.ANGLE_DOWN} />}
          >
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Box ml={2}>
                <SvgIcon icon={Icons[item.icon.toUpperCase()]} size={3} />
              </Box>
              <AccordionItemTitle active={expanded === item.name}>{item.name}</AccordionItemTitle>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {item?.subItems?.map((subItem) => (
                <ListItem key={`accordion-detail-${subItem.id}`} active={subItem.isActive}>
                  <Link href={subItem.url}>{subItem.name}</Link>
                </ListItem>
              ))}
            </ul>
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </Wrapper>
  );
};
