import React, { FC } from 'react';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

export type SocialMediaTypes = 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email';

export type SocialsShareProps = {
  media: SocialMediaTypes[];
  label?: string;
};

const Label = styled.div`
  margin-right: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;

  > *:not(${Label}) {
    margin: 0.2rem;
    border: 0.1rem solid ${({ theme }) => theme.palette.grey['400']} !important;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;

    &:hover {
      border-color: ${({ theme }) => theme.palette.grey['800']} !important;
    }
  }
`;

export const SocialsShare: FC<SocialsShareProps> = ({ media, label }) => {
  const theme = useTheme();
  const types = {
    facebook: FacebookShareButton,
    twitter: TwitterShareButton,
    linkedin: LinkedinShareButton,
    whatsapp: WhatsappShareButton,
    email: EmailShareButton,
  };
  const icons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    linkedin: LinkedinIcon,
    whatsapp: WhatsappIcon,
    email: EmailIcon,
  };

  return (
    <Wrapper>
      {!!label && <Label>{label}</Label>}
      {media.map((item, index) => {
        const SocialShareButton = types[item];
        const SocialShareIcon = icons[item];
        return (
          <SocialShareButton key={index} url={window.location.href}>
            <SocialShareIcon
              size={26}
              bgStyle={{ fill: '#fff' }}
              iconFillColor={theme.palette.grey['800']}
            />
          </SocialShareButton>
        );
      })}
    </Wrapper>
  );
};
