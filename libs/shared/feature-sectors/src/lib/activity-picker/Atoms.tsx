import styled from 'styled-components';

export const Wrapper = styled(({ isMobile, direction, ...restProps }) => <div {...restProps} />)`
  display: ${({ isMobile, direction }) =>
    isMobile || direction === 'vertical' ? 'block' : 'flex'};
  position: relative;
  justify-content: stretch;
  align-items: stretch;
  width: 100%;
`;

export const FormWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.grey['A200']};
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: column;
  height: 30rem;
  flex: 1;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    max-width: 100%;
    margin: 1rem 1rem 1rem 0;
  }
`;

export const SearchWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const SectorListTitle = styled.div`
  font-weight: normal;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const SectorListWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const SectorWrapper = styled.div``;

export const StyledSector = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  cursor: pointer;
  padding: 9px;
  svg {
    float: right;
    transform: translateY(-15%);
  }
  &.expanded {
    background: ${({ theme }) => theme.palette.grey['A200']};
  }
`;

export const SectorExpandable = styled(({ expanded, ...restProps }) => <div {...restProps} />)`
  height: ${({ expanded }) => (expanded ? 'auto' : '0')};
  width: 100%;
  overflow: hidden;
  .MuiCheckbox-root {
    color: ${({ theme }) => theme.palette.grey['900']};
    &.Mui-checked {
      color: #2979ff;
    }
  }
`;

export const SubSector = styled.div`
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.palette.grey['200']};
  }
  margin-left: 1rem;
`;

export const SelectedWrapper = styled(({ direction, mobile, ...restProps }) => (
  <div {...restProps} />
))`
  display: flex;
  flex-direction: column;
  padding: ${({ direction, mobile }) =>
    direction === 'horizontal' && !mobile ? '2rem' : '2rem 0 0'};
  min-height: ${({ mobile }) => (mobile ? '0' : '15rem')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  flex: 1;
  > b {
    margin-bottom: 0.5rem;
  }
  sup {
    font-size: 1.4rem;
    position: absolute;
  }
`;

export const RequestLinkWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  position: ${({ mobile }) => (mobile ? 'relative' : 'absolute')};
  margin-top: ${({ mobile }) => (mobile ? '1.5rem' : 0)};
  text-align: ${({ mobile }) => (mobile ? 'center' : 'left')};
  bottom: 0;
  right: 0;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  span {
    margin-right: 0.5rem;
  }

  &:hover u {
    font-weight: 700;
  }
`;

export const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SelectedActivity = styled.div`
  padding: 0.5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;

  background: ${({ theme }) => theme.palette.grey['A200']};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  user-select: none;

  &:hover {
    svg {
      opacity: 0.6;
    }
  }
  span {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      margin-left: 0.4rem;
      transform: scale(0.6);
      opacity: 0.2;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
