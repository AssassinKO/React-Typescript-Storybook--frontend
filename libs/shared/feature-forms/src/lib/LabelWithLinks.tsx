import React, { FC } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';
import styled from 'styled-components';

type LinkInLabelOptions = {
  linkWeight?:
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | 'lighter'
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'inherit';
  linkColor?: string;
  linkUnderline?: 'always' | 'hover' | 'none';
};

export type FrameName = string;

export type LinkInLabel = {
  label: string;
  path: string;
  target?: '_blank' | '_self' | '_parent' | '_top' | FrameName;
};

type LabelWithLinksProps = {
  label: string;
  linksInLabel: LinkInLabel[];
  options?: LinkInLabelOptions;
};

const DEFAULT_OPTIONS: LinkInLabelOptions = {
  linkWeight: 'inherit',
  linkColor: 'inherit',
  linkUnderline: 'hover',
};

const LabelLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

const LabelOptionalStyles = styled(({ linkWeight, linkColor, linkUnderline, ...restProps }) => (
  <span {...restProps} />
))`
  font-weight: ${({ linkWeight }) =>
    linkWeight != null ? linkWeight : DEFAULT_OPTIONS.linkWeight};
  color: ${({ linkColor }) => (linkColor != null ? linkColor : DEFAULT_OPTIONS.linkColor)};
  text-decoration: ${({ linkUnderline }) =>
    linkUnderline === 'always'
      ? 'underline'
      : linkUnderline === 'none'
      ? 'none'
      : DEFAULT_OPTIONS.linkUnderline === 'hover'
      ? 'none'
      : DEFAULT_OPTIONS.linkUnderline};

  &:hover {
    text-decoration: ${({ linkUnderline }) =>
      ['hover', 'always'].includes(linkUnderline) ? 'underline' : 'none'};
  }
`;

export const LabelWithLinks: FC<LabelWithLinksProps> = ({
  label,
  linksInLabel,
  options = DEFAULT_OPTIONS,
}) => {
  const splitLabel = label.split('%LINK%');
  const htmlNodes = [];
  splitLabel.forEach((val) => {
    htmlNodes.push(<>{ReactHtmlParser(val)}</>);
  });
  const resultNodes = [];
  let numProcessed = 0;
  linksInLabel.forEach((link, index) => {
    resultNodes.push(htmlNodes[index]);
    resultNodes.push(
      <Link href={link.path} passHref>
        <LabelLink href={link.path} target={link.target || '_self'}>
          <LabelOptionalStyles {...options}>{link.label}</LabelOptionalStyles>
        </LabelLink>
      </Link>
    );
    numProcessed++;
  });
  if (numProcessed < splitLabel.length) {
    resultNodes.push(splitLabel[splitLabel.length - 1]);
  }

  return (
    <>
      {resultNodes.map((node, index) => {
        return <React.Fragment key={index}>{node}</React.Fragment>;
      })}
    </>
  );
};
