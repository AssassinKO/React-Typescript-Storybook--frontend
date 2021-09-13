import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export type VacancyTileProps = {
  label: string;
  publishDate: string;
};

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.grey['A200']};
  padding: 3rem 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.config.gradients.rotated};
    color: #fff;
  }
`;

const Label = styled.div`
  margin-bottom: 2rem;
  font-size: 2.4rem;
  font-weight: 700;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PublishDate = styled.div`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  border-top: 0.1rem solid ${({ theme }) => theme.palette.grey['800']};
  margin-top: auto;
  padding-top: 1.5rem;

  ${Wrapper}:hover & {
    border-color: #fff;
  }
`;

export const VacancyTile: FC<VacancyTileProps> = ({ label, publishDate }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Label>{label}</Label>
      <PublishDate>{t('shared.publishedOn') + ' ' + publishDate}</PublishDate>
    </Wrapper>
  );
};
