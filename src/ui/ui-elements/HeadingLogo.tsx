import { css, styled } from 'styled-components';

type HeadingLogoProps = {
  page?: string;
};

const StyledHeadingLogo = styled.div<HeadingLogoProps>`
  text-align: center;
  text-transform: uppercase;

  & h2 {
    font-size: 3.6rem;
    font-weight: 700;
    color: var(--color-brand-700);
    letter-spacing: 0.2rem;
    line-height: 1.3;

    ${({ page }) =>
      page === 'login' &&
      css`
        font-size: 6rem;
      `}
  }

  & p {
    letter-spacing: 1.2rem;
    font-weight: 600;
    padding-left: 0.4rem;

    ${({ page }) =>
      page === 'login' &&
      css`
        font-size: 2rem;
        letter-spacing: 2rem;
        padding-left: 1rem;
      `}
  }
`;
const HeadingLogo = ({ page }: HeadingLogoProps) => {
  return (
    <StyledHeadingLogo page={page}>
      <h2>Coral</h2>
      <p>Resort</p>
    </StyledHeadingLogo>
  );
};
export default HeadingLogo;
