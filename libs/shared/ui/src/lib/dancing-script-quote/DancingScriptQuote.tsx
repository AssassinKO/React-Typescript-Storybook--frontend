import React, { FC } from 'react';
import styled from 'styled-components';
import he from 'he';
import { useTheme } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';

export type DancingScriptQuoteProps = {
  quote: string;
  color?: 'white' | 'dark';
  size?: number;
  className?: string;
};

type ParsedQuotePart = {
  regular?: string;
  underline?: string;
};

const Wrapper = styled(({ color, size, ...restProps }) => <span {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.DancingScript};
  font-size: ${({ size }) => `${size}rem`};
  color: ${({ color, theme }) => (color === 'dark' ? theme.palette.grey['800'] : '#FFF')};
`;

const UnderlineWrapper = styled.span`
  position: relative;
  svg {
    position: absolute;
    top: calc(100% + 0.3rem);
    left: 0.25rem;
    width: calc(100% - 1.25rem);
    height: 0.25rem;
  }
`;

const parseQuote = (quote) => {
  let originalString = quote;
  let result;
  const matches = originalString.match(/<u>(.*?)<\/u>/g);
  if (!matches) return [{ regular: quote }];
  matches.forEach((val, index) => {
    originalString = originalString.replace(val, `///${index}`);
  });

  result = originalString;
  const final = [];
  let last = '';
  matches.forEach((val, index) => {
    result = result.split(`///${index}`);
    result.splice(1, 0, `${val.replace(/<\/?u>/g, '')}`);
    final.push({ regular: result[0] }, { underline: result[1] });
    last = result = result[2];
  });

  final.push({ regular: last });

  return final;
};

export const DancingScriptQuote: FC<DancingScriptQuoteProps> = ({
  quote,
  color = 'dark',
  size = 3.2,
  className,
}) => {
  const theme = useTheme();
  if (!quote) return null;
  const parsedQuote: ParsedQuotePart[] = parseQuote(he.decode(quote));

  return (
    <Wrapper color={color} size={size} className={className}>
      {parsedQuote.map((part: ParsedQuotePart, index) =>
        Object.keys(part).includes('regular') ? (
          <React.Fragment key={index}>{ReactHtmlParser(part.regular)}</React.Fragment>
        ) : (
          <UnderlineWrapper key={index}>
            {ReactHtmlParser(part.underline)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 59.2 2.5"
              preserveAspectRatio="none"
            >
              <path
                d="M.5 2s53.2-3.4 58.2 0"
                fill="none"
                stroke={color === 'dark' ? theme.palette.grey['800'] : '#FFF'}
                strokeLinecap="round"
              />
            </svg>
          </UnderlineWrapper>
        )
      )}
    </Wrapper>
  );
};
