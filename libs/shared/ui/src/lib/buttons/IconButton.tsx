import React, { FC, ReactElement } from 'react';
import {
  ButtonProps as MuiButtonProps,
  IconButton as MuiIconButton,
  Theme,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { IconButtonVariant } from './types';
import { Tooltip } from '../tooltip/Tooltip';
import { Icons, SvgIcon } from '../svg-icon';

type IconButtonProps = Omit<MuiButtonProps, 'variant' | 'color' | 'size'> & {
  icon?: Icons;
  variant?: IconButtonVariant;
  tooltip?: string | ReactElement[];
  iconColor?: string;
  size?: number;
  active?: boolean;
};

type IconButtonBackgroundType = 'normal' | 'hover' | 'disabled';

const getBackgroundColorByVariant = (
  variant: IconButtonVariant,
  theme: Theme,
  type: IconButtonBackgroundType
) => {
  return {
    gradient: {
      normal: theme.config.gradients.default,
      hover: theme.config.gradients.orange,
      disabled: theme.palette.grey['200'],
    }[type],
    dark: {
      normal: theme.palette.grey['800'],
      hover: theme.palette.grey['900'],
      disabled: theme.palette.grey['200'],
    }[type],
    light: {
      normal: theme.palette.grey['A200'],
      hover: theme.palette.grey['A100'],
      disabled: theme.palette.grey['200'],
    }[type],
    white: {
      normal: '#FFF',
      hover: theme.palette.grey['A100'],
      disabled: theme.palette.grey['200'],
    }[type],
    transparent: {
      normal: 'transparent',
      hover: 'rgba(255, 255, 255, .25)',
      disabled: 'transparent',
    }[type],
    green: {
      normal: theme.palette.green.main,
      hover: theme.palette.green.light,
      disabled: theme.palette.grey['200'],
    }[type],
  }[variant];
};

const StyledIconButton = styled(({ variant, active, ...restProps }) => (
  <MuiIconButton {...restProps} />
))`
  background: ${({ variant, active, theme }) =>
    active === false ? '#fff' : getBackgroundColorByVariant(variant, theme, 'normal')};
  width: 3.4rem;
  height: 3.4rem;
  border: ${({ variant, active, theme }) =>
    active === false
      ? `1px solid ${getBackgroundColorByVariant(variant, theme, 'normal')}`
      : 'none'};
  &:hover {
    background: ${({ variant, theme }) => getBackgroundColorByVariant(variant, theme, 'hover')};
  }
  &:disabled {
    background: ${({ variant, theme }) => getBackgroundColorByVariant(variant, theme, 'disabled')};
    color: ${({ theme }) => theme.palette.grey['500']};
  }
  @media print {
    display: none;
  }
`;

const Icon = styled(({ hasText, ...other }) => <SvgIcon {...other} />)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const IconButton: FC<IconButtonProps> = ({
  children,
  icon,
  variant = 'dark',
  iconColor,
  href,
  tooltip,
  size = 1.5,
  active,
  ...restProps
}) => {
  const theme = useTheme();
  const router = useRouter();

  const button = (
    <StyledIconButton variant={variant} active={active} {...restProps}>
      <Icon
        color={
          iconColor
            ? iconColor
            : ['light', 'white'].includes(variant)
            ? theme.palette.grey[800]
            : theme.palette.common.white
        }
        icon={icon}
        size={size}
        hasText={!!children}
      />
    </StyledIconButton>
  );

  const handleHrefClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    router.push(href).then();
  };

  const btnWithHref = href ? (
    <span onClick={handleHrefClick}>{button}</span>
  ) : (
    <span>{button}</span>
  );

  return tooltip ? <Tooltip title={tooltip}>{btnWithHref}</Tooltip> : <>{btnWithHref}</>;
};
