import React, { FC } from 'react';
import styled from 'styled-components';
import { SvgIcon, Icons } from '../../svg-icon';
import ReactHtmlParser from 'react-html-parser';

export type DosAndDontsProps = {
  titleDo?: string;
  contentDo?: string;
  titleDont?: string;
  contentDont?: string;
};

const StyledDosAndDonts = styled.div`
  margin: 2rem 0;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledDosAndDontsHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledDosAndDontsTitle = styled(({ isDo, ...restProps }) => <div {...restProps} />)`
  font-weight: 700;
  font-size: 1.8rem;
  padding-left: 1rem;
  color: ${(props) =>
    props.isDo ? props.theme.palette.turquoise.main : props.theme.palette.primary.main};
`;

const StyledDosAndDontsCircle = styled(({ isDo, ...restProps }) => <div {...restProps} />)`
  border-radius: 50%;
  padding: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.isDo ? props.theme.config.gradients.turquoise : props.theme.config.gradients.default};
`;

const StyledSvgIcon = styled(({ ...restProps }) => <SvgIcon {...restProps} />)`
  width: 1rem !important;
  height: 1rem !important;
`;

const Content = styled.div`
  margin-top: 0;
  padding-left: 3.5rem;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  ul {
    padding-left: 2rem;
  }
`;

export const DosAndDonts: FC<DosAndDontsProps> = ({
  titleDo,
  contentDo,
  titleDont,
  contentDont,
}) => (
  <>
    <StyledDosAndDonts>
      {!!titleDo && (
        <StyledDosAndDontsHeader>
          <>
            <StyledDosAndDontsCircle isDo={true}>
              <StyledSvgIcon icon={Icons.CHECKMARK} color={'#FFF'} size={'small'} />
            </StyledDosAndDontsCircle>
            <StyledDosAndDontsTitle isDo={true}>{titleDo}</StyledDosAndDontsTitle>
          </>
        </StyledDosAndDontsHeader>
      )}
      {!!contentDo && <Content>{ReactHtmlParser(contentDo)}</Content>}
    </StyledDosAndDonts>
    <StyledDosAndDonts>
      {!!titleDont && (
        <StyledDosAndDontsHeader>
          <>
            <StyledDosAndDontsCircle isDo={false}>
              <StyledSvgIcon icon={Icons.CROSS} color={'#FFF'} size={'small'} />
            </StyledDosAndDontsCircle>
            <StyledDosAndDontsTitle isDo={false}>{titleDont}</StyledDosAndDontsTitle>
          </>
        </StyledDosAndDontsHeader>
      )}
      {!!contentDont && <Content>{ReactHtmlParser(contentDont)}</Content>}
    </StyledDosAndDonts>
  </>
);
