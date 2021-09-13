export const getPadding = (withIcon, arrow, size) => {
  const padding = {
    topBottom: size === 'large' ? '1.6rem' : size === 'small' ? '.7rem' : '1.2rem',
    left: getLeftPadding(withIcon, arrow, size),
    right: getRightPadding(arrow, size),
  };

  return `${padding.topBottom} ${padding.right} ${padding.topBottom} ${padding.left}`;
};

const ADDITIONAL_PADDING_SIZE = 2;

const getLeftPadding = (withIcon, arrow, size) => {
  let additionalPadding = 0;
  if (withIcon) additionalPadding += ADDITIONAL_PADDING_SIZE;
  if (arrow === 'left') additionalPadding += ADDITIONAL_PADDING_SIZE;

  return size === 'large'
    ? `${2.4 + additionalPadding}rem`
    : size === 'small'
    ? `${1 + additionalPadding}rem`
    : `${3 + additionalPadding}rem`;
};

const getRightPadding = (arrow, size) => {
  let additionalPadding = 0;
  if (arrow === 'right') additionalPadding += ADDITIONAL_PADDING_SIZE;

  return size === 'large'
    ? `${2.4 + additionalPadding}rem`
    : size === 'small'
    ? `${1 + additionalPadding}rem`
    : `${2 + additionalPadding}rem`;
};
