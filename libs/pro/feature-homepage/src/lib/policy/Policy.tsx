import React, { FC } from 'react';
import styled from 'styled-components';
import { Bounce, Button, Icons, SvgIcon } from '@homeproved/shared/ui';
import { HomepageContainerWrapper } from '../container/Container';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

const StyledHomepageTools = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
  flex-direction: column;
`;

const StyledHomepageToolsInner = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .left {
    margin: 6rem 6rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;

    img {
      max-width: 29rem;
    }
  }
  .right {
    margin: 6rem 6rem 0;
    max-width: 53rem;
  }
`;

const StyledHomepageTotal = styled.div`
  background: ${({ theme }) => theme.config.gradients.default};
  width: 100%;
  color: white;
  margin-top: 6rem;
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8vw 100vw 0 0;
    border-color: #fff transparent transparent transparent;
  }
  &:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 8vw 100vw;
    border-color: transparent transparent #fff transparent;
  }
`;

const StyledHomepageToolsHeader = styled.div`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1.6rem;
`;

const StyledHomepageToolsText = styled.div`
  font-size: 1.6rem;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const HomepagePolicy: FC = () => {
  const { t } = useTranslation();
  const { getPath: comGetPath } = useComLocalizedRoutes();
  return (
    <StyledHomepageTotal>
      <StyledHomepageTools>
        <HomepageContainerWrapper>
          <StyledHomepageToolsInner>
            <div className="left">
              <img src="/img_polaroid-paraat.png" alt="" loading="lazy" />
            </div>
            <div className="right">
              <StyledHomepageToolsHeader>
                {t('app.pro.pages.landing.policy.header')}
              </StyledHomepageToolsHeader>
              <StyledHomepageToolsText>
                {t('app.pro.pages.landing.policy.text')}
              </StyledHomepageToolsText>
              <Button
                variant="white"
                href={process.env.NEXT_PUBLIC_COM_URL + comGetPath('/assessment-policy')}
                target="_blank"
              >
                {t('app.pro.pages.landing.policy.button')}
              </Button>
            </div>
          </StyledHomepageToolsInner>
        </HomepageContainerWrapper>
        <Bounce translateY={-4}>
          <SvgIcon icon={Icons.DOUBLE_ANGLE_DOWN} size={3} color={'#fff'} />
        </Bounce>
      </StyledHomepageTools>
    </StyledHomepageTotal>
  );
};
