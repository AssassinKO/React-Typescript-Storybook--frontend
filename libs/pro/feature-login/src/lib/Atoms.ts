import styled from 'styled-components';

export const ContentWrapper = styled.div`
  text-align: center;
`;

export const Description = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

export const CodeForm = styled.form`
  margin: 3rem 0 6rem 0;
`;

export const Label = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const InputFields = styled.div`
  display: flex;
  width: 22rem;
  margin: 2rem auto;
  justify-content: space-between;

  & > input {
    width: 4.25rem;
    height: 6rem;
    background: ${({ theme }) => theme.palette.grey['A200']};
    border-radius: 0.5rem;
    border: none;
    font-family: ${({ theme }) => theme.config.fonts.Cabrito};
    font-size: 2.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.text.primary};
    text-align: center;
    padding: 0;

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const ChangeNumberNotice = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
`;

export const Question = styled.span`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-right: 0.5rem;
`;
