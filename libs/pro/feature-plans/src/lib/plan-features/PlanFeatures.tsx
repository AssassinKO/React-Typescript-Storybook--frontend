import React, { FC, useEffect, useState } from 'react';
import { Button, Modal } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { Features, HeaderText, ModalHeader, Title, Wrapper } from './Atoms';
import { Feature } from '../feature/Feature';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import { getURLWithoutSubdomain } from '@homeproved/shared/util';
import { PlanUid } from '../util/helpers';
import { CompanyData, PlanData } from '@homeproved/shared/data-access';
import { useUser } from '@homeproved/shared/feature-auth';
import { PlanCircle } from './PlanCircle';

type PlanFeaturesProps = {
  plan: PlanUid;
  teamPlan: PlanData;
  modal?: boolean;
  company: CompanyData;
};

export const PlanFeatures: FC<PlanFeaturesProps> = ({ plan, teamPlan, modal = false, company }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const user = useUser();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies();
  const cookie = cookies['upgrade_modal'];

  const cookieDomain =
    typeof window !== 'undefined' ? getURLWithoutSubdomain(window.location.hostname) : undefined;

  const screenOne = useMediaQuery(theme.breakpoints.down(875));
  const screenTwo = useMediaQuery('(min-width:1040px) and (max-width:1200px)');

  const teamFeatures: string[] = t('app.pro.pages.upgradeModal.features', {
    returnObjects: true,
    defaultValue: [],
  });

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!modal) return;

    if (cookie === 'false' || cookie === undefined) {
      setShowModal(true);
      setCookie('upgrade_modal', true, {
        path: '/',
        domain: cookieDomain,
      });
    }
  }, [setShowModal, setCookie, modal, cookie, cookieDomain]);

  useEffect(() => {
    if (!company) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof Chargebee !== 'function') return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cbInstance = Chargebee.getInstance();
    const cart = cbInstance.getCart();

    const customer = {
      id: company.chargebeeId,
      first_name: user.firstName,
      last_name: user.lastName,
      email: company.email,
      company: company.name,
      vat_number: company.vat,
      billing_address: {
        first_name: user.firstName,
        last_name: user.lastName,
        company: company.name,
        email: company.email,
        city: company.city,
        zip: company.postalCode,
        country: company.country,
        phone: company.phone,
        line1: `${company.street} ${company.streetNr}`,
        line2: '',
      },
    };

    cart.setCustomer(customer);
  }, [company, user]);

  const handleChargebee = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Chargebee.registerAgain();
  };

  const ConditionalWrapper = ({ modal, children, showModal }) =>
    modal ? (
      <Modal
        open={showModal}
        onClose={handleClose}
        maxWidth={66}
        paddingTop={0}
        paddingBottom={0}
        background={'gradient'}
        featureModal={modal}
      >
        {children}
      </Modal>
    ) : (
      <Wrapper plan={plan} isMobile={isMobile}>
        {children}
      </Wrapper>
    );

  return (
    <ConditionalWrapper modal={modal} showModal={showModal}>
      {plan !== PlanUid.TEAM && (
        <ModalHeader isMobile={isMobile} screenTwo={modal ? false : screenTwo}>
          {isMobile && (
            <HeaderText>
              <Title mobile>{t('app.pro.pages.upgradeModal.title')}</Title>
            </HeaderText>
          )}
          <PlanCircle
            plan={plan}
            teamPlan={teamPlan}
            isMobile={isMobile}
            screenTwo={screenTwo}
            modal={modal}
          />
          {!isMobile ? (
            <HeaderText>
              <Title>{t('app.pro.pages.upgradeModal.title')}</Title>
              <Button
                onClick={handleChargebee}
                variant={'white'}
                data-cb-type="checkout"
                data-cb-item-0="TEAM-ONLINE-EUR-Monthly"
              >
                {t('app.pro.pages.upgradeModal.upgrade')}
              </Button>
            </HeaderText>
          ) : (
            <Button
              onClick={handleChargebee}
              variant={'white'}
              data-cb-type="checkout"
              data-cb-item-0="TEAM-ONLINE-EUR-Monthly"
            >
              {t('app.pro.pages.upgradeModal.upgrade')}
            </Button>
          )}
        </ModalHeader>
      )}
      <Features
        isMobile={isMobile}
        screenOne={modal ? false : screenOne}
        screenTwo={modal ? false : screenTwo}
        featureModal={modal}
      >
        {teamFeatures !== null &&
          teamFeatures.length > 0 &&
          teamFeatures.map((feature, index) => (
            <Feature
              key={index}
              title={feature['title']}
              text={feature['text']}
              isMobile={isMobile}
              icon={feature['icon']}
              iconColor={theme.palette.grey['800']}
              iconSize={2}
              gradient={true}
            />
          ))}
      </Features>
    </ConditionalWrapper>
  );
};
