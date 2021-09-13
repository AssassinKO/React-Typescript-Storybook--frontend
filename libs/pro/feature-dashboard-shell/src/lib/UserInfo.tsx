import React, { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUser } from '@homeproved/shared/feature-auth';
import { CompanyLogoContext } from './company-logo-context';
import { CompanyLogo } from './CompanyLogo';

type UserInfoProps = {
  color?: 'white' | 'dark';
};

const Wrapper = styled.div`
  display: flex;
  margin-right: 2.5rem;
`;

const Info = styled(({ color, ...restProps }) => <div {...restProps} />)`
  color: ${({ color, theme }) => (color === 'white' ? '#FFF' : theme.palette.grey['800'])};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  align-self: center;
  white-space: nowrap;
`;

export const UserInfo: FC<UserInfoProps> = ({ color = 'white' }) => {
  const user = useUser();
  const [logo, setLogo] = useState(
    user?.relations?.company?.data?.logo?.data?.conversions['square-xs']
  );
  const newLogo = useContext(CompanyLogoContext);

  useEffect(() => {
    if (newLogo.newLogoSrc === null) return;

    setLogo(newLogo.newLogoSrc);
  }, [newLogo.newLogoSrc, setLogo]);

  if (!user) return null;

  return (
    <Wrapper>
      {!!logo && <CompanyLogo logo={logo} />}
      <Info color={color}>
        <div>{`${user.firstName} ${user.lastName}`}</div>
        {user?.relations?.company?.data?.name != null && (
          <div>
            <strong>{`${user.relations.company.data.name}`}</strong>
          </div>
        )}
      </Info>
    </Wrapper>
  );
};
