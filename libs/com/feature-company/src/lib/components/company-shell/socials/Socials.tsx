import React, { FC } from 'react';
import styled from 'styled-components';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import Link from 'next/link';
import { CompanyData } from '@homeproved/shared/data-access';

export interface SocialsProps {
  data: CompanyData;
  isMobile: boolean;
}

const Wrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  align-items: center;
  margin: ${({ isMobile }) => (isMobile ? '3rem 0 0' : '3rem 0')};
`;

const SocialIcon = styled(SvgIcon)`
  margin-right: 2rem;
`;

export const Socials: FC<SocialsProps> = ({ data, isMobile }) => {
  return (
    !!data && (
      <Wrapper isMobile={isMobile}>
        {!!data.facebook && (
          <Link href={data.facebook} passHref>
            <a href={data.facebook} target="_blank" rel="noreferrer">
              <SocialIcon icon={Icons.FACEBOOK} size={isMobile ? 3.6 : 2.2} />
            </a>
          </Link>
        )}
        {!!data.instagram && (
          <Link href={data.instagram} passHref>
            <a href={data.instagram} target="_blank" rel="noreferrer">
              <SocialIcon icon={Icons.INSTAGRAM} size={isMobile ? 3.6 : 2.2} />
            </a>
          </Link>
        )}
        {!!data.linkedin && (
          <Link href={data.linkedin} passHref>
            <a href={data.linkedin} target="_blank" rel="noreferrer">
              <SocialIcon icon={Icons.LINKEDIN} size={isMobile ? 3.6 : 2.2} />
            </a>
          </Link>
        )}
        {!!data.twitter && (
          <Link href={data.twitter} passHref>
            <a href={data.twitter} target="_blank" rel="noreferrer">
              <SocialIcon icon={Icons.TWITTER} size={isMobile ? 3.6 : 2.2} />
            </a>
          </Link>
        )}
        {!!data.whatsapp && (
          <Link href={data.whatsapp} passHref>
            <a href={data.whatsapp} target="_blank" rel="noreferrer">
              <SocialIcon icon={Icons.WHATSAPP} size={isMobile ? 3.6 : 2.2} />
            </a>
          </Link>
        )}
      </Wrapper>
    )
  );
};
