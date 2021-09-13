import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme, FormGroup } from '@material-ui/core';
import { Button } from '@homeproved/shared/ui';
import { Checkbox } from '@homeproved/shared/feature-forms';

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: 4rem;
  background: ${({ theme }) => theme.palette.grey['A200']};
  border-radius: ${({ mobile }) => (mobile ? 0 : '0.5rem')};
  margin: ${({ mobile }) => (mobile ? '0 -2rem' : 0)};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    padding: 4rem 4rem 4rem 8rem;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const Subtitle = styled.div`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Form = styled.form`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const FormLeft = styled.div`
  flex: 0 0 35%;
`;

const FormRight = styled.div`
  flex: 0 0 55%;
`;

const TextInput = styled.input`
  border: none;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
`;

const TextArea = styled.textarea`
  border: none;
  padding: 2rem;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  resize: none;
`;

const StyledButton = styled(Button)`
  margin-top: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.sm + 'px'}) {
    margin: 2rem 0 0 auto;
    display: table;
  }
`;

export const QuestionsForm: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handlePrivacy = () => {
    // @TODO: handle click event
  };

  return (
    <Wrapper mobile={isMobile}>
      <Form>
        <FormLeft>
          <Title>{t('shared.form.questionsForm.title')}</Title>
          <Subtitle>{t('shared.form.questionsForm.subtitle')}</Subtitle>
          <FormGroup>
            <TextInput type="text" placeholder={t('shared.form.questionsForm.firstName')} />
          </FormGroup>
          <FormGroup>
            <TextInput type="text" placeholder={t('shared.form.questionsForm.email')} />
          </FormGroup>
          {!isMobile && (
            <FormGroup>
              <Checkbox
                label={t('shared.form.questionsForm.privacyAccept')}
                labelColor={theme.palette.grey['800']}
                onChange={handlePrivacy}
              />
            </FormGroup>
          )}
        </FormLeft>
        <FormRight>
          <FormGroup>
            <TextArea rows={10} placeholder={t('shared.form.questionsForm.defineQuestion')} />
          </FormGroup>
          {isMobile && (
            <FormGroup>
              <Checkbox
                label={t('shared.form.questionsForm.privacyAccept')}
                labelColor={theme.palette.grey['800']}
                onChange={handlePrivacy}
              />
            </FormGroup>
          )}
          <StyledButton>{t('shared.form.questionsForm.sent')}</StyledButton>
        </FormRight>
      </Form>
    </Wrapper>
  );
};

export default QuestionsForm;
