import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionTitle, SvgIcon, Icons, Button } from '@homeproved/shared/ui';
import { useRouter } from 'next/router';
import EditRealizationForm from './realization-form/EditRealizationForm';
import { useRealization } from './hooks';
import Link from 'next/link';
import { useUser } from '@homeproved/shared-feature-auth-codana';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useMediaQuery, useTheme } from '@material-ui/core';

type EditRealizationPageProps = {
  rid: string;
  getProPath: GetPathFunction;
  getComPath: GetPathFunction;
};

const Wrapper = styled.div`
  position: relative;
`;

const BackToOverviewLink = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const FormWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  background-color: #fff;
  margin: ${({ isMobile }) => (isMobile ? '3rem 0 5rem' : '3rem 0 0')};
  padding: 3rem;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

const StyledButton = styled(Button)`
  display: table;
  margin: 0 0 2rem auto;
  font-size: 1.2rem;
  padding: 0.8rem 2rem 0.8rem 4rem;
  z-index: 2;
`;

const StyledA = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:visited {
    color: inherit;
  }
`;

export const EditRealizationPage: FC<EditRealizationPageProps> = ({
  rid,
  getProPath,
  getComPath,
}) => {
  const { t } = useTranslation();
  const user = useUser();
  const router = useRouter();
  const { realization, isSuccess } = useRealization(rid);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Wrapper>
      {isSuccess && (
        <StyledButton icon={Icons.EYE} arrow="none" pill={false}>
          <Link
            href={
              process.env.NEXT_PUBLIC_COM_URL +
              getComPath('/company/:slug/realization/:rslug', {
                slug: user.relations.company.data.slug,
                rslug: realization.slug,
              })
            }
            passHref
          >
            <StyledA
              href={
                process.env.NEXT_PUBLIC_COM_URL +
                getComPath('/company/:slug/realization/:rslug', {
                  slug: user.relations.company.data.slug,
                  rslug: realization.slug,
                })
              }
              target={'_blank'}
            >
              {t('app.pro.pages.realizations.add.view')}
            </StyledA>
          </Link>
        </StyledButton>
      )}
      <SectionTitle
        label={t('app.pro.pages.realizations.add.edit')}
        textAlign={'left'}
        font={'PTSans'}
        uppercase={true}
      />
      <BackToOverviewLink onClick={() => router.push(getProPath('/realizations'))}>
        <SvgIcon icon={Icons.ANGLE_LEFT} size={1.5} />
        {t('app.pro.pages.realizations.back')}
      </BackToOverviewLink>
      {isSuccess && (
        <FormWrapper isMobile={isMobile}>
          <EditRealizationForm data={realization} getProPath={getProPath} />
        </FormWrapper>
      )}
    </Wrapper>
  );
};
