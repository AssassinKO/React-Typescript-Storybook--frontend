import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Button } from '../buttons/Button';
import { Icons, SvgIcon } from '../svg-icon';
import { ProfilePicture } from '../profile-picture/ProfilePicture';
import { useTranslation } from 'react-i18next';
import { Title, Wrapper, Text } from './Atoms';

type TrustManagerProps = {
  isMobile: boolean;
};

export const TrustManager: FC<TrustManagerProps> = ({ isMobile }) => {
  const { t } = useTranslation();
  return (
    <Wrapper mobile={isMobile}>
      <Box mb={3} display="flex" justifyContent="center">
        <ProfilePicture name="Trust Manager" picture="./trustmanager.png" size={7} />
      </Box>
      <Title variant="h3">Trust Manager</Title>
      <Box display="flex" flexDirection="column" alignItems="center">
        <div>
          <Text variant="body1">
            <a href="tel:032070701" target="_blank">
              <SvgIcon icon={Icons.PHONE} size={1.8} /> <span>03 207 07 01</span>
            </a>
          </Text>
          <Text variant="body1">
            <a href="mailto:trustmanager@homeproved.pro" target="_blank">
              <SvgIcon icon={Icons.ENVELOPE_OUTLINE} size={1.8} />{' '}
              <span>Trustmanager@homeproved.pro</span>
            </a>
          </Text>
        </div>
      </Box>
      <Box mt={3}>
        <Button href="mailto:trustmanager@homeproved.pro" variant="gradient">
          {t('app.pro.pages.reviews.ctaTalk')}
        </Button>
      </Box>
    </Wrapper>
  );
};
