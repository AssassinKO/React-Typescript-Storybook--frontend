import React from 'react';
import styled from 'styled-components';
import { Tooltip as MuiTooltip, TooltipProps } from '@material-ui/core';

type Props = Omit<TooltipProps, 'title'> & {
  title: string | React.ReactNode;
};

export const Tooltip = styled(({ children, title, ...restProps }: Props) => (
  <MuiTooltip
    title={title as NonNullable<React.ReactNode>}
    arrow
    placement={restProps.placement || 'right'}
    classes={{ popper: restProps.className, tooltip: 'tooltip', arrow: 'arrow' }}
    {...restProps}
  >
    {children}
  </MuiTooltip>
))`
  .tooltip {
    background-color: ${({ theme }) => theme.palette.grey['900']};
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    font-size: 1.2rem;
  }
  .arrow {
    color: ${({ theme }) => theme.palette.grey['900']};
  }
  .tooltip.MuiTooltip-tooltipPlacementLeft .arrow {
    transform-origin: left center;
  }
`;
