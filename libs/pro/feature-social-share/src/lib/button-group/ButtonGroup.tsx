import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Button, Icons, Modal, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';

export interface ButtonGroupProps {
  image: string;
  url: string;
}

const Wrapper = styled.div`
  text-align: center;
  display: table;
  margin: 3rem auto 0;
`;

const DownloadButton = styled(Button)`
  font-weight: 600;
  font-size: 1.2rem;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;

  &:hover {
    font-weight: 600;
    text-decoration: none;
  }
  span {
    margin-left: 0.5rem;
  }
`;

const SocialMediaWrapper = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonGroup: FC<ButtonGroupProps> = ({ image, url }) => {
  const { t } = useTranslation();
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const handleDownload = () => {
    if (image == null) return;

    const link = document.createElement('a');
    link.download = `rating-${moment.now()}.png`;
    link.href = image;
    link.click();
  };

  return (
    <>
      <Wrapper>
        <DownloadButton variant={'text'} onClick={handleDownload}>
          <SvgIcon icon={Icons.DOWNLOAD} size={1} />
          <span>{t('app.pro.pages.socialShare.download')}</span>
        </DownloadButton>
        <Button onClick={() => setShowShareModal(true)}>
          {t('app.pro.pages.socialShare.share')}
        </Button>
      </Wrapper>
      <Modal open={showShareModal} onClose={() => setShowShareModal(false)} maxWidth={35}>
        <SocialMediaWrapper>
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} borderRadius={5} />
            {'Facebook'}
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={40} borderRadius={5} />
            {'Twitter'}
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={40} borderRadius={5} />
            {'Linkedin'}
          </LinkedinShareButton>
        </SocialMediaWrapper>
      </Modal>
    </>
  );
};
