import React, { FC } from 'react';
import styled from 'styled-components';
import { useMediaQuery, useTheme } from '@material-ui/core';
import LocalityContainerWrapper from './container/Container';
import { Left } from './page-locality/Left';
import { Polaroid } from './page-locality/Polaroid';
import { Right } from './page-locality/Right';

type LocalityPrimarySectionProps = {
  tablet?: boolean;
  mobile?: boolean;
  sectorName: string;
  locality: string;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 0 7.5rem 0;
`;

const TabletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0 6rem 0;
`;

const Group = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MobileWrapper = styled.div`
  margin: 3rem auto;
  max-width: 45rem;
`;

export const LocalityPrimarySection: FC<LocalityPrimarySectionProps> = ({
  tablet = false,
  mobile = false,
  sectorName,
  locality,
}) => {
  const theme = useTheme();
  const showPolaroid = useMediaQuery(theme.breakpoints.down(1000));

  return (
    <LocalityContainerWrapper>
      {mobile ? (
        <MobileWrapper>
          <Polaroid locality={locality} mobile={mobile} />
        </MobileWrapper>
      ) : (
        <>
          {!tablet && (
            <Wrapper>
              <Left sectorName={sectorName} locality={locality} />
              <Polaroid locality={locality} />
              <Right sectorName={sectorName} locality={locality} />
            </Wrapper>
          )}
          {tablet && (
            <TabletWrapper>
              <Group>
                <Left sectorName={sectorName} locality={locality} tablet />
                {!showPolaroid && <Polaroid locality={locality} />}
                <Right sectorName={sectorName} locality={locality} />
              </Group>
            </TabletWrapper>
          )}
        </>
      )}
    </LocalityContainerWrapper>
  );
};
