import { Icons, SvgIcon } from '../svg-icon';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button } from '../buttons';
import { PaginationMeta } from '@homeproved/shared/data-access';

type InfinitePaginationProps = {
  loadMore: () => void;
} & PaginationMeta;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  margin-bottom: 1rem;
  font-weight: 700;
  padding: 0;
`;

export const InfinitePagination: FC<InfinitePaginationProps> = ({ loadMore, total, perPage }) => {
  const { t } = useTranslation();
  return perPage < total ? (
    <Wrapper>
      <Inner onClick={loadMore}>
        <StyledButton variant="text">{t('app.pro.pages.reviews.more')}</StyledButton>
        <SvgIcon color="gradient" icon={Icons.DOUBLE_ANGLE_DOWN} size={2} />
      </Inner>
    </Wrapper>
  ) : null;
};
