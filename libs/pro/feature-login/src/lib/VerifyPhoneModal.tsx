import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from '@homeproved/shared/ui';
import ReactHtmlParser from 'react-html-parser';
import { LabelWithLinks } from '@homeproved/shared/feature-forms';
import { useForm } from 'react-hook-form';
import {
  VerificationCodeFormData,
  verificationCodeFormSchema,
} from '@homeproved/shared/feature-forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApiFactory, useMutationFetch, UsersApiFactory } from '@homeproved/shared/data-access';
import {
  ChangeNumberNotice,
  CodeForm,
  ContentWrapper,
  Description,
  InputFields,
  Label,
  Question,
} from './Atoms';

type VerifyPhoneModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  email: string;
  phoneNumber: string;
};

export const VerifyPhoneModal: FC<VerifyPhoneModalProps> = ({
  open,
  onClose,
  onSuccess,
  email,
  phoneNumber,
}) => {
  const { t } = useTranslation();
  const translationBaseKey = 'app.pro.pages.registration.steps.verifyPhone';
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [initialFocusGiven, setInitialFocusGiven] = useState(false);
  const [successHandled, setSuccessHandled] = useState(false);
  const { handleSubmit, register, getValues, reset: resetForm } = useForm<VerificationCodeFormData>(
    {
      resolver: zodResolver(verificationCodeFormSchema),
    }
  );
  const usersApi = useApiFactory(UsersApiFactory);
  const { mutation: verifyPhoneMutation } = useMutationFetch(
    'verifyPhone',
    usersApi.apiAuthPhoneVerifyPost
  );
  // @TODO: resend SMS functionality is absent in design
  /*const { mutation: resendPhoneVerificationMutation } = useMutationFetch(
    'resendPhoneVerification',
    usersApi.apiAuthPhoneVerificationNotificationPost
  );*/

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById('code_1') != null && !initialFocusGiven && open) {
        document.getElementById('code_1').focus();
        setInitialFocusGiven(true);
      }
    }, 0);
  }, [initialFocusGiven, open]);

  const handleCodeSubmit = (data: VerificationCodeFormData) => {
    verifyPhoneMutation.mutate({
      email,
      code: `${data.code_1}${data.code_2}${data.code_3}${data.code_4}`,
    });
  };

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (
      getValues().code_1 !== '' &&
      getValues().code_2 !== '' &&
      getValues().code_3 !== '' &&
      getValues().code_4 !== ''
    ) {
      setSubmitEnabled(true);
      document.getElementById('submitBtn').focus();
    } else {
      const fieldNumber: number = parseInt(e.target['name'].split('_')[1]);
      const nextFieldNumber: number = fieldNumber === 4 ? 1 : fieldNumber + 1;
      document.getElementById(`code_${nextFieldNumber}`).focus();
    }
  };

  useEffect(() => {
    if (verifyPhoneMutation.isSuccess && !successHandled) {
      setSuccessHandled(true);
      onSuccess();
    }
  }, [onSuccess, successHandled, verifyPhoneMutation.isSuccess]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setSubmitEnabled(false);
        setInitialFocusGiven(false);
        resetForm();
        onClose();
      }}
      title={t(`${translationBaseKey}.title`)}
      titleSize={2.2}
      paddingTop={8}
    >
      <ContentWrapper>
        <Description>
          {ReactHtmlParser(
            t(`${translationBaseKey}.description`).replace('%PHONE_NUMBER%', phoneNumber)
          )}
        </Description>
        <CodeForm onSubmit={handleSubmit(handleCodeSubmit)}>
          <Label>{ReactHtmlParser(t(`${translationBaseKey}.code`))}</Label>
          <InputFields>
            <input
              type="number"
              id="code_1"
              name="code_1"
              min={0}
              max={9}
              maxLength={1}
              ref={register}
              onChange={handleChangeInput}
            />
            <input
              type="number"
              id="code_2"
              name="code_2"
              min={0}
              max={9}
              maxLength={1}
              ref={register}
              onChange={handleChangeInput}
            />
            <input
              type="number"
              id="code_3"
              name="code_3"
              min={0}
              max={9}
              maxLength={1}
              ref={register}
              onChange={handleChangeInput}
            />
            <input
              type="number"
              id="code_4"
              name="code_4"
              min={0}
              max={9}
              maxLength={1}
              ref={register}
              onChange={handleChangeInput}
            />
          </InputFields>
          <Button id="submitBtn" size="large" type="submit" disabled={!submitEnabled}>
            {t(`${translationBaseKey}.validateBtn`)}
          </Button>
        </CodeForm>
        <ChangeNumberNotice>
          <Question>{t(`${translationBaseKey}.changePhoneNumber`)}</Question>
          <LabelWithLinks
            label={t(`${translationBaseKey}.contactHomeproved.label`)}
            linksInLabel={[
              {
                label: t(`${translationBaseKey}.contactHomeproved.labelEmail`),
                path: `mailto:${t(`${translationBaseKey}.contactHomeproved.labelEmail`)}`,
              },
              {
                label: t(`${translationBaseKey}.contactHomeproved.labelPhone`),
                path: `tel:${t(`${translationBaseKey}.contactHomeproved.labelPhone`)}`,
              },
            ]}
          />
        </ChangeNumberNotice>
      </ContentWrapper>
    </Modal>
  );
};
