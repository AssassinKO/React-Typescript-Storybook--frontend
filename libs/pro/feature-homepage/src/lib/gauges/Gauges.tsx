import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Bounce, Gauge, Icons, SvgIcon } from '@homeproved/shared/ui';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { HomepageContainerWrapper } from '../container/Container';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';

type HomepageGaugesProps = {
  isVisible: boolean;
};

const StyledHomepageGauges = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
  flex-direction: column;
  margin-top: ${({ mobile }) => (mobile ? '1rem' : '-6rem')};
`;

const StyledHomepageGaugesTitle = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-size: ${({ isMobile }) => (isMobile ? '2rem' : '3.5rem')};
  font-weight: 900;
  text-align: center;
  position: relative;
  width: 100%;
  max-width: 100rem;
  margin-bottom: 3rem;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    margin-top: 8rem;
  }
`;

const SpeechImage = styled.img`
  display: block;
  position: absolute;
  right: 4rem;
  top: 0;
  width: 8.3rem;
  height: 8.9rem;
`;

const StyledHomepageGaugesList = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: ${({ isMobile }) => (isMobile ? '100%' : '80%')};
  margin-top: ${({ isMobile }) => (isMobile ? '1rem' : '4rem')};
  margin-bottom: ${({ isMobile }) => (isMobile ? 0 : '4rem')};
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const StyledHomepageGaugesListEntry = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  width: 33%;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 100%;
    margin-bottom: 3rem;
  }
  .text {
    margin-top: 2rem;
    padding: 0 2rem;
    text-align: center;
    max-width: 40rem;
  }
`;

export const HomepageGauges: FC<HomepageGaugesProps> = ({ isVisible }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const { t } = useTranslation();
  const gaugesData = useMemo(
    () => [
      {
        value: 72,
        text: t('app.pro.pages.landing.gauges.1'),
      },
      {
        value: 88,
        text: t('app.pro.pages.landing.gauges.2'),
      },
      {
        value: 76,
        text: t('app.pro.pages.landing.gauges.3'),
      },
    ],
    [t]
  );
  const [gauges, setGauges] = useState(
    gaugesData.map((gaugeData) => {
      return { ...gaugeData, value: 0 };
    })
  );
  const [inScreen, setInScreen] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible && !inScreen) {
      setInScreen(true);
    }
  }, [inScreen, setInScreen, isVisible]);

  const gaugesFinished = useCallback(() => {
    return gauges.filter((gauge, index) => gauge.value < gaugesData[index].value).length === 0;
  }, [gauges, gaugesData]);

  useEffect(() => {
    if (!gaugesFinished()) {
      if (inScreen || isMobile) {
        const intervalId = setInterval(
          () =>
            setGauges(
              gauges.map((gauge, index) => {
                if (gauge.value < gaugesData[index].value) {
                  return { ...gauge, value: gauge.value + 1 };
                } else {
                  return gauge;
                }
              })
            ),
          5
        );
        return () => clearInterval(intervalId);
      }
    }
  }, [setGauges, gauges, inScreen, isMobile, gaugesData, gaugesFinished]);

  return (
    <HomepageContainerWrapper>
      <StyledHomepageGauges mobile={isMobile}>
        <StyledHomepageGaugesTitle isMobile={isMobile}>
          {ReactHtmlParser(t('app.pro.pages.landing.gauges.title'))}
          {!isMobile && <SpeechImage src="speech.png" alt="" />}
        </StyledHomepageGaugesTitle>
        <StyledHomepageGaugesList isMobile={isMobile}>
          {gauges.map((e, index) => (
            <StyledHomepageGaugesListEntry key={index}>
              <Gauge size={isMobile ? 'small' : 'large'} value={e.value} />
              <div className="text">{ReactHtmlParser(e.text)}</div>
            </StyledHomepageGaugesListEntry>
          ))}
        </StyledHomepageGaugesList>
        <Bounce translateY={2}>
          <SvgIcon icon={Icons.DOUBLE_ANGLE_DOWN} size={3} />
        </Bounce>
      </StyledHomepageGauges>
    </HomepageContainerWrapper>
  );
};
