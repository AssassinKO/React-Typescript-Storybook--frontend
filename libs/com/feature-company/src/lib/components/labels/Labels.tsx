import React, { FC } from 'react';
import styled from 'styled-components';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTheme } from '@material-ui/core';
import { Tag } from '@homeproved/shared/data-access';

export interface LabelsProps {
  labels: Tag[];
  mobile?: boolean;
}

const Wrapper = styled.div`
  flex: 0 0 60%;
  display: flex;
  align-self: flex-start;
  flex-wrap: wrap;
`;

const Label = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  ${({ theme, isMobile }) =>
    isMobile &&
    `
    flex: 0 0 calc(50% - 1rem);
    border: 0.1rem solid ${theme.palette.grey['A400']};
    border-radius: ${theme.config.defaultBorderRadius};
    margin: 0.5rem;
    padding: 1rem;
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  `}
`;

const Title = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-weight: 600;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin: ${({ isMobile }) => (isMobile ? '1rem 0 0' : '0 0 0 1.5rem')};
`;

export const Labels: FC<LabelsProps> = ({ labels, mobile = false }) => {
  const theme = useTheme();

  const ConditionalWrapper = ({ isMobile, wrapper, children }) =>
    isMobile ? children : wrapper(children);

  return (
    <ConditionalWrapper isMobile={mobile} wrapper={(children) => <Wrapper>{children}</Wrapper>}>
      {labels.map((item, index) => (
        <Label key={index} isMobile={mobile}>
          <SvgIcon icon={Icons.HELMET_SOLID} color={theme.palette.grey['A400']} size={2.5} />
          <Title isMobile={mobile}>{item.data.name}</Title>
        </Label>
      ))}
    </ConditionalWrapper>
  );
};
