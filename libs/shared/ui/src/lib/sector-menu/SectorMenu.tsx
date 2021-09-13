import { Sector } from '@homeproved/shared/data-access';
import { Box } from '@material-ui/core';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '../buttons';
import { OffCanvasToggle } from '../off-canvas-toggle/OffCanvasToggle';
import { Icons } from '../svg-icon';

type SectorWithLink = Sector & { url: string };

export type SectorMenuProps = {
  sectors: SectorWithLink[];
  isMobile: boolean;
  isLargerDesktop: boolean;
  offCanvasOpen: boolean;
  onToggleOffCanvas: () => void;
  toggleBtnRef: React.RefObject<HTMLDivElement>;
  activeSector?: string;
};

const Wrapper = styled(({ largerDesktop, mobile, offCanvasOpen, ...restProps }) => (
  <div {...restProps} />
))`
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? 'row-reverse' : 'column')};
  padding-right: ${({ mobile, largerDesktop }) => (mobile || largerDesktop ? 0 : '2.5rem')};
  margin-right: ${({ mobile }) => (mobile ? '-0.8rem' : 0)};
  margin-left: ${({ mobile }) => (mobile ? '-0.8rem' : 0)};
  height: ${({ mobile }) => (mobile ? '6.9rem' : 'auto')};
  flex-wrap: wrap;
  overflow: hidden;
  transition: opacity 0.3s ease;
  opacity: ${({ mobile, offCanvasOpen }) => (mobile || !offCanvasOpen ? 1 : 0)};
  ${({ largerDesktop }) =>
    largerDesktop &&
    `
    position: absolute;
    left: -2.5rem;
    transform: translateX(-100%);
  `};
  justify-content: ${({ mobile }) => (mobile ? 'center' : 'flex-start')};
`;

const StyledIconButton = styled(({ mobile, active, ...restProps }) => (
  <IconButton {...restProps} />
))`
  width: ${({ mobile }) => (mobile ? '4.5rem' : '5.6rem')};
  height: ${({ mobile }) => (mobile ? '4.5rem' : '5.6rem')};
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.config.gradients.default} !important;
    cursor: default;
    svg, path{
      fill: #fff;
    }
  `}
`;

const OffCanvasToggleWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  width: ${({ mobile }) => (mobile ? '4.5rem' : '5.6rem')};
  height: ${({ mobile }) => (mobile ? '4.5rem' : '5.6rem')};
  border: ${({ theme }) => `1px solid ${theme.palette.grey[200]}`};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

declare global {
  interface Array<T> {
    nop(): Array<T>;
  }
}

Array.prototype.nop = function () {
  return this;
};

export const SectorMenu: FC<SectorMenuProps> = ({
  sectors,
  isMobile,
  isLargerDesktop,
  offCanvasOpen,
  onToggleOffCanvas,
  toggleBtnRef,
  activeSector,
}) => {
  const [showAllSectors, setShowAllSectors] = useState(false);
  return (
    <Wrapper largerDesktop={isLargerDesktop} mobile={isMobile} offCanvasOpen={offCanvasOpen}>
      <Box mb={3} pl={isMobile ? '0.8rem' : 0} pr={isMobile ? '0.8rem' : 0}>
        <OffCanvasToggleWrapper mobile={isMobile}>
          <OffCanvasToggle
            offCanvasOpen={offCanvasOpen}
            onToggleOffCanvas={onToggleOffCanvas}
            innerRef={toggleBtnRef}
            color="#000"
          />
        </OffCanvasToggleWrapper>
      </Box>
      {sectors[isMobile || showAllSectors ? 'nop' : 'slice'](0, 7).map((sector) => (
        <Box key={sector.data.id} mb={3} pl={isMobile ? '0.8rem' : 0} pr={isMobile ? '0.8rem' : 0}>
          <Link href={sector.url} passHref>
            <a href={sector.url}>
              <StyledIconButton
                icon={Icons[sector.data.icon.toUpperCase()]}
                variant="light"
                size={3}
                mobile={isMobile}
                active={
                  activeSector === sector.data.slug ||
                  sector.data?.descendants?.some(
                    (descendant) => descendant?.['data']?.slug === activeSector
                  )
                }
              />
            </a>
          </Link>
        </Box>
      ))}
      {!isMobile && !showAllSectors && sectors.length > 7 && (
        <Box mb={3} pl={isMobile ? '0.8rem' : 0} pr={isMobile ? '0.8rem' : 0}>
          <StyledIconButton
            icon={Icons.KEBAB}
            variant="light"
            size={3}
            mobile={isMobile}
            style={{ transform: 'rotate(90deg)' }}
            onClick={() => setShowAllSectors(true)}
          />
        </Box>
      )}
    </Wrapper>
  );
};
