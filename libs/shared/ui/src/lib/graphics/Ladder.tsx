import React, { FC } from 'react';
import styled from 'styled-components';

type LadderProps = {
  className?: string;
};

const Wrapper = styled.div`
  svg {
    display: block;
    width: 100%;
  }
`;

export const Ladder: FC<LadderProps> = ({ className }) => (
  <Wrapper className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 259.5">
      <path d="M9.698 259.521h-5.7l71.9-259.5h1.2l2.1 1.2-69.5 258.3z" fill="#dd6f24" />
      <path d="M5.698 259.521h-5.7l73.4-259.5h3.6l-71.3 259.5z" fill="#ef8c3e" />
      <path d="M74.698 8.421l.5-1.9h25.1l-.4 1.9h-25.2z" fill="#dd6f24" />
      <path d="M74.398 7.621l.7-2.5h25.1l-.5 2.5h-25.3z" fill="#ef8c3e" />
      <path d="M70.198 24.521l.6-2.1h26l-.5 2.1h-26.1z" fill="#dd6f24" />
      <path d="M69.998 23.721l.7-2.7h25.9l-.6 2.7h-26z" fill="#ef8c3e" />
      <path d="M65.498 41.921l.6-2.2h27l-.5 2.2h-27.1z" fill="#dd6f24" />
      <path d="M65.198 41.021l.8-2.9h26.9l-.6 2.9h-27.1z" fill="#ef8c3e" />
      <path d="M60.398 60.521l.7-2.4h28l-.5 2.4h-28.2z" fill="#dd6f24" />
      <path d="M60.098 59.621l.8-3.1h27.9l-.7 3.1h-28z" fill="#ef8c3e" />
      <path d="M54.798 80.721l.7-2.6h29.1l-.6 2.6h-29.2z" fill="#dd6f24" />
      <path d="M54.598 79.721l.9-3.3h29l-.7 3.3h-29.2z" fill="#ef8c3e" />
      <path d="M48.798 102.521l.8-2.8h30.3l-.6 2.8h-30.5z" fill="#dd6f24" />
      <path d="M48.598 101.421l1-3.6h30.2l-.8 3.6h-30.4z" fill="#ef8c3e" />
      <path d="M42.298 126.221l.8-3.1h31.6l-.7 3.1h-31.7z" fill="#dd6f24" />
      <path d="M42.098 125.021l1.1-3.9h31.5l-.9 3.9h-31.7z" fill="#ef8c3e" />
      <path d="M35.198 152.021l.9-3.3h33l-.7 3.3h-33.2z" fill="#dd6f24" />
      <path d="M34.998 150.721l1.2-4.3h32.9l-.9 4.3h-33.2z" fill="#ef8c3e" />
      <path d="M27.398 180.321l1-3.6h34.6l-.8 3.6h-34.8z" fill="#dd6f24" />
      <path d="M27.198 178.821l1.3-4.7h34.4l-1 4.7h-34.7z" fill="#ef8c3e" />
      <path d="M18.898 211.421l1.1-4h36.3l-.9 4h-36.5z" fill="#dd6f24" />
      <path d="M18.698 209.821l1.4-5.2h36.1l-1.1 5.2h-36.4z" fill="#ef8c3e" />
      <path d="M9.498 245.721l1.2-4.4h38.2l-1 4.4h-38.4z" fill="#dd6f24" />
      <path d="M9.298 243.921l1.6-5.7h38l-1.3 5.7h-38.3z" fill="#ef8c3e" />
      <path d="M50.298 259.421h-5.7l57-259.5h1.3l2.1 1.2-54.7 258.3z" fill="#dd6f24" />
      <path d="M46.298 259.421h-5.7l58.5-259.5h3.6l-56.4 259.5z" fill="#ef8c3e" />
    </svg>
  </Wrapper>
);
