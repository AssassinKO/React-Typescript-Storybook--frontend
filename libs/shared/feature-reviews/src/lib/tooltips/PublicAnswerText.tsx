import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Box, Card, Typography } from '@material-ui/core';
import { Button, Icons, SvgIcon } from '@homeproved/shared/ui';

type PublicAnswerTextProps = {
  message: string;
  onClickEditPublicAnswer: () => void;
  isMobile: boolean;
  userView: boolean;
  companyName;
};

const Wrapper = styled(({ mobile, userView, ...restProps }) => <Card {...restProps} />)`
  margin-top: 2rem;
  padding: 2.5rem 2rem;
  box-shadow: ${({ mobile, userView }) =>
    mobile || userView ? 'none' : '0px 3px 9px -1px rgb(0 0 0 / 20%)'};
  position: relative;
  overflow: visible;
  margin-bottom: ${({ mobile }) => (mobile ? 0 : '3rem')};
  background-color: ${({ theme }) => theme.palette.grey['A200']};
  display: flex;
  flex-direction: column;
  &:after {
    content: '';
    display: ${({ userView, mobile }) => (userView && !mobile ? 'none' : 'block')};
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${({ mobile }) => (mobile ? '0 1.5rem 2.5rem 1.5rem' : '2.5rem 2.5rem 0 2.5rem')};
    border-color: ${({ theme, mobile }) =>
      mobile
        ? `transparent transparent ${theme.palette.grey['A200']} transparent`
        : `${theme.palette.grey['A200']} transparent transparent transparent`};
    position: absolute;
    left: ${({ mobile }) => (mobile ? '50%' : '6rem')};
    bottom: ${({ mobile }) => (mobile ? '100%' : 0)};
    transform: ${({ mobile }) => (mobile ? 'translateX(-50%)' : 'translateY(100%)')};
  }
`;

const Text = styled(({ mobile, userView, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-weight: ${({ mobile, userView }) => (mobile || userView ? 300 : 700)};
  font-size: 1.4rem;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  font-weight: 700;
  padding: 0 0 0 2.5rem;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const OuterWrapper = styled(({ mobile, userView, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: column;
  margin-top: ${({ mobile, userView }) => (mobile && userView ? '3rem' : 0)};
`;

const TitleMobile = styled(Typography)`
  font-size: 1.6rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-align: center;
  text-transform: uppercase;
  margin: 1rem auto 2rem;
  color: ${({ theme }) => theme.palette.green.light};
  display: flex;
  align-items: center;
`;

const CheckmarkIcon = styled(SvgIcon)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg,
  path {
    fill: #fff;
  }
`;
const CheckmarkIconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.green.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const AnsweredBy = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const TextBalloon = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  margin-right: 1rem;
  &:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.4rem 0 0.4rem 1rem;
    border-color: transparent transparent transparent #fff;
    position: absolute;
    right: 0px;
    bottom: 0px;
    transform: rotate(45deg);
  }
`;

const StyledSvgIcon = styled(SvgIcon)`
  transform: scaleX(-1);
`;

export const PublicAnswerText: FC<PublicAnswerTextProps> = ({
  message,
  onClickEditPublicAnswer,
  isMobile,
  userView,
  companyName,
}) => {
  const { t } = useTranslation();

  return (
    <OuterWrapper mobile={isMobile} userView={userView}>
      {isMobile && !userView && (
        <TitleMobile>
          <CheckmarkIconWrapper>
            <CheckmarkIcon icon={Icons.CHECKMARK_OUTLINE} size={1.5} />
          </CheckmarkIconWrapper>
          {t('app.pro.pages.reviewDetail.buttons.answeredPublic')}
        </TitleMobile>
      )}
      <Wrapper mobile={isMobile} userView={userView}>
        {userView && (
          <Box display="flex" alignItems="center" mb={2} style={{ marginTop: '-1rem' }}>
            <TextBalloon>
              <StyledSvgIcon icon={Icons.HELMET_SOLID} size={2} />
            </TextBalloon>
            <AnsweredBy variant="body1">{`${t(
              'app.com.pages.company.companyShell.reviewDetail.answer'
            )} ${companyName}:`}</AnsweredBy>
          </Box>
        )}
        <Text mobile={isMobile} userView={userView}>
          {message}
        </Text>
        {!userView && (
          <StyledButton variant="text" icon={Icons.PENCIL_SOLID} onClick={onClickEditPublicAnswer}>
            {t('app.pro.pages.reviewDetail.buttons.edit')}
          </StyledButton>
        )}
      </Wrapper>
    </OuterWrapper>
  );
};
