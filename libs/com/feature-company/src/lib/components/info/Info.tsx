import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTheme } from '@material-ui/core';
import Moment from 'react-moment';
import { CompanyData } from '@homeproved/shared/data-access';

export interface InfoProps {
  data: CompanyData;
  mobile?: boolean;
}

const Wrapper = styled.div`
  flex: 0 0 40%;
`;

const Label = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;

  ${({ theme, mobile }) =>
    mobile &&
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

const Value = styled.div`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Text = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  margin: ${({ mobile }) => (mobile ? '1rem 0 0' : '0 0 2rem 1.5rem')};
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const Info: FC<InfoProps> = ({ data, mobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const ConditionalWrapper = ({ mobile, wrapper, children }) =>
    mobile ? children : wrapper(children);

  return (
    <ConditionalWrapper mobile={mobile} wrapper={(children) => <Wrapper>{children}</Wrapper>}>
      {!!data.foundedAt && (
        <Label mobile={mobile}>
          <SvgIcon icon={Icons.ROCKET_OUTLINE} color={theme.palette.grey['A400']} size={2.5} />
          <Text mobile={mobile}>
            <Title>{`${t('app.com.pages.company.startDate')}:`}</Title>
            <Value>
              <Moment format={'DD/MM/YYYY'}>{data.foundedAt}</Moment>
            </Value>
          </Text>
        </Label>
      )}
      {!!data.numEmployees && (
        <Label mobile={mobile}>
          <SvgIcon icon={Icons.EMPLOYEE} color={theme.palette.grey['A400']} size={2.5} />
          <Text mobile={mobile}>
            <Title>{`${t('app.com.pages.company.employeesNumber')}:`}</Title>
            <Value>{data.numEmployees}</Value>
          </Text>
        </Label>
      )}
      {!!data.governmentNr && (
        <Label mobile={mobile}>
          <SvgIcon icon={Icons.GOVERNMENT} color={theme.palette.grey['A400']} size={2.5} />
          <Text mobile={mobile}>
            <Title>{`${t('app.com.pages.company.governmentNumber')}:`}</Title>
            <Value>{data.governmentNr}</Value>
          </Text>
        </Label>
      )}
    </ConditionalWrapper>
  );
};
