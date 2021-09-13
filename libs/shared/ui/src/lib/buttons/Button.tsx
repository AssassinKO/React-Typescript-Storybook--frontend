import React, { FC } from 'react';
import { useTheme, ButtonProps as MuiButtonProps } from '@material-ui/core';
import styled from 'styled-components';
import { SvgIcon, Icons } from '../svg-icon';
import { DarkVariantButton } from './DarkVariantButton';
import { TextVariantButton } from './TextVariantButton';
import { GradientVariantButton } from './GradientVariantButton';
import Link from 'next/link';
import { LightVariantButton } from './LightVariantButton';
import { ButtonVariant } from './types';
import { WhiteVariantButton } from './WhiteVariantButton';
import { TransparentVariantButton } from './TransparentVariantButton';
import { FilterVariantButton } from './FilterVariantButton';
import { GreenVariantButton } from './GreenVariantButton';
import { ButtonSpinner } from '../button-spinner/ButtonSpinner';

export type ButtonArrow = 'left' | 'right' | 'none';

export type ButtonProps = Omit<MuiButtonProps, 'variant' | 'color'> & {
  icon?: Icons;
  variant?: ButtonVariant;
  pill?: boolean;
  arrow?: ButtonArrow;
  border?: boolean;
  color?: 'white' | 'dark';
  target?: string;
  framedIcon?: boolean;
  frameSize?: number;
  frameColor?: string;
  isLoading?: boolean;
};

const Icon = styled(({ hasText, ...other }) => <SvgIcon {...other} />)`
  position: absolute;
  top: 50%;
  left: 1.25rem;
  transform: translateY(-50%);
`;

const Arrow = styled(({ hasText, position, ...other }) => <SvgIcon {...other} />)`
  position: absolute;
  top: 50%;
  left: ${({ position }) => position === 'left' && '1.75rem'};
  right: ${({ position }) => position === 'right' && '1rem'};
  transform: translateY(-50%);
`;

const StyledA = styled.a`
  text-decoration: none;
`;
const Frame = styled(({ size, color, ...other }) => <div {...other} />)`
  position: absolute;
  top: 50%;
  left: 1.25rem;
  transform: translateY(-50%);
  background-color: ${({ color }) => color};
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
  border-radius: 50%;
  svg {
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 1.2rem !important;
    height: 1.2rem !important;
  }
  svg,
  path {
    fill: #fff !important;
  }
`;

export const Button: FC<ButtonProps> = ({
  children,
  icon,
  variant = 'gradient',
  pill = true,
  href,
  arrow = 'right',
  border = false,
  disabled,
  target = '_self',
  framedIcon = false,
  frameSize,
  frameColor,
  isLoading = false,
  ...restProps
}) => {
  const theme = useTheme();
  const button = (
    <>
      {
        {
          gradient: (
            <GradientVariantButton
              withIcon={Boolean(icon)}
              arrow={arrow}
              pill={pill}
              disabled={disabled}
              {...restProps}
            >
              {arrow === 'left' && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={Icons.ANGLE_LEFT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
              {icon && (
                <Icon
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={icon}
                  size="button"
                  hasText={!!children}
                />
              )}
              {children}
              {isLoading && (
                <ButtonSpinner
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  size={1.5}
                />
              )}
              {arrow === 'right' && !isLoading && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={Icons.ANGLE_RIGHT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
            </GradientVariantButton>
          ),
          dark: (
            <DarkVariantButton
              withIcon={Boolean(icon)}
              arrow={arrow}
              pill={pill}
              disabled={disabled}
              {...restProps}
            >
              {arrow === 'left' && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={Icons.ANGLE_LEFT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
              {icon && (
                <Icon
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={icon}
                  size="button"
                  hasText={!!children}
                />
              )}
              {children}
              {isLoading && (
                <ButtonSpinner
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  size={1.5}
                />
              )}
              {arrow === 'right' && !isLoading && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={Icons.ANGLE_RIGHT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
            </DarkVariantButton>
          ),
          light: (
            <LightVariantButton
              withIcon={Boolean(icon)}
              arrow={arrow}
              pill={pill}
              disabled={disabled}
              {...restProps}
            >
              {arrow === 'left' && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={Icons.ANGLE_LEFT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
              {icon && (
                <Icon
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={icon}
                  size="button"
                  hasText={!!children}
                />
              )}
              {children}
              {isLoading && (
                <ButtonSpinner
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  size={1.5}
                />
              )}
              {arrow === 'right' && !isLoading && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={Icons.ANGLE_RIGHT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
            </LightVariantButton>
          ),
          white: (
            <WhiteVariantButton
              withIcon={Boolean(icon)}
              arrow={arrow}
              withBorder={border}
              pill={pill}
              disabled={disabled}
              {...restProps}
            >
              {arrow === 'left' && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={Icons.ANGLE_LEFT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
              {icon && (
                <Icon
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={icon}
                  size="button"
                  hasText={!!children}
                />
              )}
              {children}
              {isLoading && (
                <ButtonSpinner
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  size={1.5}
                />
              )}
              {arrow === 'right' && !isLoading && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={Icons.ANGLE_RIGHT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
            </WhiteVariantButton>
          ),
          transparent: (
            <TransparentVariantButton
              withIcon={Boolean(icon)}
              arrow={arrow}
              disabled={disabled}
              color={'white'}
              {...restProps}
            >
              {arrow === 'left' && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={Icons.ANGLE_LEFT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
              {icon && (
                <Icon
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={icon}
                  size="button"
                  hasText={!!children}
                />
              )}
              {children}
              {isLoading && (
                <ButtonSpinner
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  size={1.5}
                />
              )}
              {arrow === 'right' && !isLoading && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={Icons.ANGLE_RIGHT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
            </TransparentVariantButton>
          ),
          text: (
            <TextVariantButton
              withIcon={Boolean(icon)}
              withArrow={false}
              arrow={arrow}
              disabled={disabled}
              {...restProps}
            >
              {arrow === 'left' && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={Icons.ANGLE_LEFT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
              {icon && (
                <>
                  {framedIcon ? (
                    <Frame size={frameSize} color={frameColor}>
                      <Icon
                        color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                        icon={icon}
                        size="button"
                        hasText={!!children}
                      />
                    </Frame>
                  ) : (
                    <Icon
                      color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                      icon={icon}
                      size="button"
                      hasText={!!children}
                    />
                  )}
                </>
              )}
              {children}
              {isLoading && (
                <ButtonSpinner
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  size={1.5}
                />
              )}
            </TextVariantButton>
          ),
          filter: (
            <FilterVariantButton
              withIcon={Boolean(icon)}
              arrow={arrow}
              pill={pill}
              disabled={disabled}
              {...restProps}
            >
              {arrow === 'left' && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={Icons.ANGLE_DOWN}
                  size={3}
                  hasText={!!children}
                  position={arrow}
                />
              )}
              {icon && (
                <Icon
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={icon}
                  size="button"
                  hasText={!!children}
                />
              )}
              {children}
              {isLoading && (
                <ButtonSpinner
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  size={1.5}
                />
              )}
              {arrow === 'right' && !isLoading && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.grey['800']}
                  icon={Icons.ANGLE_DOWN}
                  size={3}
                  hasText={!!children}
                  position={arrow}
                />
              )}
            </FilterVariantButton>
          ),
          green: (
            <GreenVariantButton
              withIcon={Boolean(icon)}
              arrow={arrow}
              pill={pill}
              disabled={disabled}
              {...restProps}
            >
              {arrow === 'left' && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={Icons.ANGLE_LEFT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
              {icon && (
                <Icon
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={icon}
                  size="button"
                  hasText={!!children}
                />
              )}
              {children}
              {isLoading && (
                <ButtonSpinner
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  size={1.5}
                />
              )}
              {arrow === 'right' && !isLoading && (
                <Arrow
                  color={disabled ? theme.palette.grey['500'] : theme.palette.common.white}
                  icon={Icons.ANGLE_RIGHT}
                  size={1.5}
                  hasText={!!children}
                  position={arrow}
                />
              )}
            </GreenVariantButton>
          ),
        }[variant]
      }
    </>
  );

  return href ? (
    <Link href={href} passHref>
      <StyledA href={href} target={target}>
        {button}
      </StyledA>
    </Link>
  ) : (
    <>{button}</>
  );
};
