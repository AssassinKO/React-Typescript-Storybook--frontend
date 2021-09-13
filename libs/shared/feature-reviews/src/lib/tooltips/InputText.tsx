import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IconButton, Icons } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';

import { Card, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import ReactHtmlParser from 'react-html-parser';

type InputTextProps = {
  onSubmitPublicAnswer: (data: { message: string }) => void;
  defaultValue: string | null;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isMobile: boolean;
};

type FormValues = {
  message: string;
};

const StyledIconButton = styled(IconButton)`
  width: 4rem;
  height: 4rem;
`;

const Wrapper = styled(({ mobile, ...restProps }) => <Card {...restProps} />)`
  padding: 2rem 2.5rem;
  box-shadow: ${({ mobile }) => (mobile ? 'none' : '0px 3px 9px -1px rgb(0 0 0 / 20%)')};
  position: relative;
  overflow: visible;
  margin-top: 1.5rem;
  display: flex;
  margin-bottom: ${({ mobile }) => (mobile ? '2rem' : '3rem')};
  form {
    flex-grow: 1;
    display: flex;
    flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
    justify-content: space-between;
    textarea {
      font-family: ${({ theme }) => theme.config.fonts.PTSans};
      resize: none;
      &:first-child {
        flex-grow: 1;
      }
    }
    span {
      align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};
    }
  }
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${({ mobile }) => (mobile ? '0 1.5rem 2.5rem 1.5rem' : '0 2.5rem 2.5rem 2.5rem')};
    border-color: transparent transparent #fff transparent;
    position: absolute;
    left: ${({ mobile }) => (mobile ? '50%' : '6rem')};
    top: 0;
    transform: ${({ mobile }) => (mobile ? 'translate(-50%,-100%)' : 'translateY(-100%)')};
  }
`;

const InputField = styled.textarea`
  border: none;
  font-size: 1.4rem;
  padding: 0.5rem 0;
  &:focus-visible {
    border: none;
    outline: none;
  }
`;

const Title = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => (mobile ? '1.4rem' : '1.6rem')};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  margin-bottom: 0.7rem;
`;

const List = styled.ul`
  padding-left: 0;
  list-style-type: none;
  margin: 0;
`;

const ListItem = styled(({ mobile, ...restProps }) => <li {...restProps} />)`
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  line-height: ${({ mobile }) => (mobile ? '2.4rem' : 'inherit')};
`;

const TitleMobile = styled(Typography)`
  font-size: 1.6rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-align: center;
  text-transform: uppercase;
  margin: 2rem auto 3rem;
`;

const OuterWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: ${({ mobile }) => (mobile ? '0 3rem' : '0')};
  margin-bottom: 4rem;
`;

export const InputText: FC<InputTextProps> = ({
  onSubmitPublicAnswer,
  defaultValue,
  handleInputChange,
  isMobile,
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      message: defaultValue == null ? '' : defaultValue,
    },
  });
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    messageRef && messageRef.current.focus();
  }, [messageRef]);

  return (
    <OuterWrapper mobile={isMobile}>
      {isMobile && (
        <TitleMobile>{t('app.pro.pages.reviewDetail.buttons.answerPublic')}</TitleMobile>
      )}
      <Wrapper mobile={isMobile}>
        <form onSubmit={handleSubmit(onSubmitPublicAnswer)}>
          <InputField
            name="message"
            ref={(e) => {
              register(e, {
                required: true,
              });
              messageRef.current = e;
            }}
            rows={isMobile ? 4 : 2}
            placeholder={t('app.pro.pages.reviewDetail.limitNotReached.placeholder')}
            onChange={handleInputChange}
          />
          <StyledIconButton
            icon={Icons.EMAIL}
            variant="gradient"
            size={2}
            onClick={handleSubmit(onSubmitPublicAnswer)}
          />
        </form>
      </Wrapper>
      <Title variant="body1" mobile={isMobile}>
        {t('app.pro.pages.reviewDetail.limitNotReached.tips.title')}
      </Title>
      <List>
        <ListItem mobile={isMobile}>
          {ReactHtmlParser(t('app.pro.pages.reviewDetail.limitNotReached.tips.tip1'))}
        </ListItem>
        <ListItem mobile={isMobile}>
          {ReactHtmlParser(t('app.pro.pages.reviewDetail.limitNotReached.tips.tip2'))}
        </ListItem>
        <ListItem mobile={isMobile}>
          {ReactHtmlParser(t('app.pro.pages.reviewDetail.limitNotReached.tips.tip3'))}
        </ListItem>
        <ListItem mobile={isMobile}>
          {ReactHtmlParser(t('app.pro.pages.reviewDetail.limitNotReached.tips.tip4'))}
        </ListItem>
        <ListItem mobile={isMobile}>
          {ReactHtmlParser(t('app.pro.pages.reviewDetail.limitNotReached.tips.tip5'))}
        </ListItem>
      </List>
    </OuterWrapper>
  );
};
