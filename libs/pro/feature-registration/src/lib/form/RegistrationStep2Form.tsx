import React, { FC } from 'react';
import { LabelWithLinks, RegistrationFormData } from '@homeproved/shared/feature-forms';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { ContactStatement, Description, IconsWrapper, Section, Wrapper } from './step2/Atoms';
import { EmailVerification } from './step2/EmailVerification';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import ReactHtmlParser from 'react-html-parser';
import { useTheme } from 'styled-components';
import { useMediaQuery } from '@material-ui/core';

type RegistrationStep2FormProps = {
  isMobile: boolean;
  email: RegistrationFormData['email'];
};

export const RegistrationStep2Form: FC<RegistrationStep2FormProps> = ({ email }) => {
  const { t } = useTranslation();
  const { getPath: getComPath } = useComLocalizedRoutes();
  const translationBaseKey = 'app.pro.pages.registration.steps.step2';
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  return (
    <Wrapper>
      <Section>
        <IconsWrapper>
          <SvgIcon icon={Icons.ENVELOPE_SOLID} color="gradient" size={4} />
        </IconsWrapper>
        <Description>
          {isTablet
            ? ReactHtmlParser(t(`${translationBaseKey}.descriptionTablet`))
            : ReactHtmlParser(t(`${translationBaseKey}.description`))}
        </Description>
        <EmailVerification email={email} />
      </Section>
      <ContactStatement>
        <LabelWithLinks
          label={t(`${translationBaseKey}.question.label`)}
          linksInLabel={[
            {
              label: t(`${translationBaseKey}.question.linkLabel`),
              path: process.env.NEXT_PUBLIC_COM_URL + getComPath('/contact'),
            },
          ]}
          options={{
            linkWeight: 700,
            linkUnderline: 'always',
          }}
        />
      </ContactStatement>
    </Wrapper>
  );
};
