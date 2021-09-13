import styled from 'styled-components';

const StyledShadowOverlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

export const ShadowOverlay = () => {
  return <StyledShadowOverlay />;
};
