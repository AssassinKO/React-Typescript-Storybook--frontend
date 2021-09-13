import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Sector } from '@homeproved/shared/data-access';

export type SpecializationsProps = {
  specializations: Sector[];
  mobile?: boolean;
};

const List = styled(({ mobile, ...restProps }) => <ul {...restProps} />)`
  ${({ mobile }) => !mobile && `columns: 2;`}
  max-width: 50rem;
`;

const Specialization = styled.li`
  break-inside: avoid;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const SubSpecialization = styled.div`
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Label = styled.div`
  margin-bottom: 0.5rem;
`;

export const Specializations: FC<SpecializationsProps> = ({ specializations, mobile }) => {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t('app.com.pages.company.activities')}</Title>
      <List mobile={mobile}>
        {specializations.map((item, index) => {
          return (
            <Specialization key={index}>
              <Label>{item.data.name}</Label>
              {!!item.data.descendants && (
                <>
                  {item.data.descendants.map((subitem: Sector, index) => {
                    return <SubSpecialization key={index}>{subitem.data.name}</SubSpecialization>;
                  })}
                </>
              )}
            </Specialization>
          );
        })}
      </List>
    </>
  );
};
