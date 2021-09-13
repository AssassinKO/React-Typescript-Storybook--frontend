import React, { FC, useEffect } from 'react';

import styled from 'styled-components';
import useScript from './hooks/useScript';

const FormStyling = styled.div<{ gradient: boolean; formId: number; mobile: boolean }>`
  width: 100%;
  form {
    padding: 0 !important;
    margin: 0 !important;
    ._form_element {
      margin: 0 !important;
    }
    ._form-content {
      ._form-title {
        display: none;
      }
      p {
        font-weight: 800;
        font-size: 1.6rem !important;
        font-family: ${({ theme }) => theme.config.fonts.Cabrito} !important;
        color: ${({ theme }) => theme.palette.text.primary} !important;
        margin-top: 0 !important;
        text-align: ${({ mobile }) => (mobile ? 'center !important' : 'left !important;')};
      }
      label {
        font-size: 1.4rem !important;
        font-weight: 800 !important;
        margin-bottom: 0 !important;
        font-family: ${({ theme }) => theme.config.fonts.PTSans} !important;
        color: ${({ theme }) => theme.palette.text.primary} !important;
      }
      ._field-wrapper {
        border-radius: 8px;
        border: 1px solid #acacac;
        margin-bottom: 1rem;
        padding: 0;
        input,
        textarea {
          padding: 1rem !important;
          border: none !important;
          outline: none !important;
          font-size: 1.4rem !important;
          border-radius: 8px !important;
          font-family: ${({ theme }) => theme.config.fonts.PTSans} !important;
          color: ${({ theme }) => theme.palette.text.primary} !important;
        }
      }
      ._button-wrapper {
        ${({ gradient, formId, theme, mobile }) => `button#_form_${formId}_submit{
          position: relative !important;
          background: ${
            gradient ? '#FFF !important' : `${theme.config.gradients.default} !important`
          };
          color: ${gradient ? `${theme.palette.grey['800']} !important` : `#FFF !important`};
          border-radius: 2rem !important;
          border: none !important;
          padding: 1rem 1rem 1rem 2rem !important;
          font-weight: 700 !important;
          font-size: 1.4rem !important;
          line-height: 1.4rem !important;
          white-space: nowrap !important;
          text-transform: uppercase !important;
          font-family: ${theme.config.fonts.PTSans} !important;
          display: flex;
          align-items: center;
          margin-top: 1rem !important;
          margin-left: ${mobile ? `auto` : 0};
          margin-right: ${mobile ? `auto` : 0};
          &:after{
            content: '';
            display: block;
            background: ${gradient ? 'url(/button_arrow_dark.svg)' : 'url(/button_arrow.svg)'};
            width: 1.5rem;
            background-size: 1.5rem;
            height: 1.5rem;
            margin-left: 1.5rem;
          }
          }`}
      }
    }
    ._form-thank-you {
      font-family: ${({ theme }) => theme.config.fonts.PTSans};
      font-size: 1.6rem;
      text-align: left;
    }
  }
`;

type ActiveCampaignFormProps = {
  formId: number;
  isMobile: boolean;
  gradient?: boolean;
};

export const ActiveCampaignForm: FC<ActiveCampaignFormProps> = ({
  formId,
  isMobile,
  gradient = false,
}) => {
  const src = `https://homeproved.activehosted.com/f/embed.php?id=${formId}`;
  useEffect(() => {
    const script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
    if (script) {
      script.remove();
    }
  }, [src]);

  useScript(src);

  return (
    <FormStyling gradient={gradient} formId={formId} mobile={isMobile}>
      <div className={`_form_${formId}`} />
    </FormStyling>
  );
};
