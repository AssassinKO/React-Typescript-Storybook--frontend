import styled from 'styled-components';
import { PaintBucket } from '../graphics';

export const BackgroundGraphics = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  overflow: hidden;
`;

export const CloudWithSaw = styled.img`
  position: absolute;
  top: 10%;
  left: 20%;
  transform: translateX(-50%);
`;

export const SingleCloud = styled.img`
  position: absolute;
  top: 22%;
  left: calc(60% + 7rem);
  transform: translateX(-50%);
`;

export const CloudWithBrush = styled.img`
  position: absolute;
  top: 65%;
  left: 85%;
  transform: translateX(-50%);
`;

export const StyledPaintBucket = styled(PaintBucket)`
  position: absolute;
  bottom: 0;
  left: calc(50% - 45rem);
  width: 8rem;
`;

export const ReviewCloud = styled(({ top, left, alt, ...restProps }) => (
  <img {...restProps} alt={alt} />
))`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  transform: translateX(-50%);
`;
