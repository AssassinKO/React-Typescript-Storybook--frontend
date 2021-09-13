import styled from 'styled-components';

export const Top = styled.div`
  text-align: center;
`;

export const Title = styled.div`
  font-size: 4rem;
  font-weight: 900;
  font-family: ${({ theme }) => theme.config.fonts.DancingScript};
`;

export const ThumbsUp = styled.img`
  width: 5.3rem;
  height: auto;
  margin-left: 2rem;
`;

export const Subtitle = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-top: 1.5rem;
`;

export const Circle = styled.div`
  background-color: ${({ theme }) => theme.palette.grey['A200']};
  width: 38rem;
  height: 38rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem auto 0;
`;

export const Bottom = styled.div`
  text-align: center;
  margin-top: -2rem;
`;

export const PriceTitle = styled.div`
  display: table;
  margin: 4rem auto 0.5rem;
  font-size: 2.4rem;
  font-family: ${({ theme }) => theme.config.fonts.DancingScript};
  position: relative;

  &:after {
    content: '';
    background: url('../curved-arrow-down.png') no-repeat;
    width: 3.6rem;
    height: 6.9rem;
    display: block;
    position: absolute;
    top: 0;
    left: -4rem;
  }
`;

export const PriceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-transform: uppercase;
  margin-top: 1rem;
`;
