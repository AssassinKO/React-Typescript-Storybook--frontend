import React, { FC } from 'react';
import { Backdrop, Fade, useMediaQuery, useTheme } from '@material-ui/core';
import { Icons } from '../svg-icon';
import { CloseButton, Content, Icon, ModalInner, Title, Wrapper } from './Atoms';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  titleAlign?: 'left' | 'center' | 'right';
  titleUppercase?: boolean;
  icon?: Icons;
  titleSize?: number;
  titleFont?: 'Cabrito' | 'PTSans';
  maxWidth?: number | null;
  width?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingTopMobile?: number;
  paddingBottomMobile?: number;
  background?: 'white' | 'gradient';
  featureModal?: boolean;
  height?: string;
  centerTitleMobile?: boolean;
  borderRadiusMobile?: number;
};

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  icon,
  titleSize = 1.6,
  titleAlign = 'center',
  titleUppercase = false,
  titleFont = 'Cabrito',
  maxWidth,
  width = 'auto',
  paddingTop = 4,
  paddingBottom = 4,
  paddingTopMobile = 2,
  paddingBottomMobile = 2,
  children,
  background = 'white',
  height,
  centerTitleMobile = false,
  borderRadiusMobile = 0,
  featureModal = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  return (
    <Wrapper
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} mountOnEnter unmountOnExit>
        <ModalInner
          isMobile={isMobile}
          maxWidth={maxWidth}
          paddingTop={paddingTop}
          paddingBottom={paddingBottom}
          paddingTopMobile={paddingTopMobile}
          paddingBottomMobile={paddingBottomMobile}
          background={background}
          height={height}
          borderRadiusMobile={borderRadiusMobile}
          width={width}
        >
          {title && (
            <Title
              isMobile={isMobile}
              titleSize={titleSize}
              textAlign={titleAlign}
              uppercase={titleUppercase}
              font={titleFont}
              centerMobile={centerTitleMobile}
            >
              {icon && <Icon icon={icon} size={2.5} color={theme.palette.primary.main} />}
              {title}
            </Title>
          )}
          <Content isMobile={isMobile} withTitle={title != null} featureModal={featureModal}>
            {children}
          </Content>
          <CloseButton
            isMobile={isMobile}
            withTitle={title != null}
            onClick={onClose}
            background={background}
          />
        </ModalInner>
      </Fade>
    </Wrapper>
  );
};
