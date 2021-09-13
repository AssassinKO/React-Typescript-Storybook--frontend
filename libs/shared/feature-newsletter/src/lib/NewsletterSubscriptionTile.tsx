import React, { FC } from 'react';
import styled from 'styled-components';
import { ActiveCampaignForm } from '@homeproved/shared/feature-active-campaign';
import { NewsletterTileIcon } from './NewsletterTileIcon';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';

type NewsletterSubscriptionTileProps = {
  isMobile?: boolean;
};

const Wrapper = styled.div`
  position: relative;
  padding: 10rem 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.config.gradients.rotated};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

const FormCSSWrapper = styled.div`
  form {
    width: auto !important;
    ._form-content {
      ._form-title {
        display: block;
        font-family: ${({ theme }) => theme.config.fonts.Cabrito} !important;
        font-size: 2rem !important;
        font-weight: 600 !important;
        text-align: center !important;
        color: #fff !important;
      }
      ._html-code p {
        display: block;
        font-family: ${({ theme }) => theme.config.fonts.PTSans} !important;
        font-size: 1.3rem !important;
        font-weight: 300 !important;
        text-align: center !important;
        color: #fff !important;
      }
      ._form-label {
        display: none !important;
      }
      ._field-wrapper {
        border: none !important;
        border-radius: ${({ theme }) => theme.config.defaultBorderRadius} !important;

        input {
          height: 4rem !important;
          background: #f4d7d1 !important;
          border: 0.1rem solid #f4d7d1 !important;
          border-radius: ${({ theme }) => theme.config.defaultBorderRadius} !important;
          font-family: ${({ theme }) => theme.config.fonts.Cabrito} !important;
          font-size: 1.6rem !important;

          &:hover {
            border: 0.1rem solid #333 !important;
          }
        }
      }
      ._checkbox-radio {
        display: flex !important;

        input {
          margin-right: 1rem !important;
        }

        label {
          display: inline-block !important;
          font-size: 1.2rem !important;
          font-weight: 300 !important;
          line-height: 1.6rem !important;
          color: #fff !important;
        }
      }
      ._button-wrapper {
        display: block !important;
        text-align: center !important;

        button {
          display: inline-flex !important;
        }
      }
      ._form-thank-you {
        color: #fff !important;
        margin-top: 3rem !important;
        font-family: ${({ theme }) => theme.config.fonts.Cabrito} !important;
        font-size: 2rem;
      }
    }
  }
`;

export const NewsletterSubscriptionTile: FC<NewsletterSubscriptionTileProps> = ({ isMobile }) => {
  const currentLanguage = useCurrentLanguage();

  const getFormId = () => {
    switch (currentLanguage) {
      case 'nl':
        return 5;
      case 'fr':
        return 13;
      case 'en':
        return 9;
      default:
        return 5;
    }
  };

  return (
    <Wrapper>
      <NewsletterTileIcon />
      <FormCSSWrapper>
        <ActiveCampaignForm formId={getFormId()} isMobile={isMobile} gradient />
      </FormCSSWrapper>
    </Wrapper>
  );
};
