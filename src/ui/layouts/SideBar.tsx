import styled from 'styled-components';

import Mainnav from '../navigation/Mainnav';
import HeadingLogo from '../ui-elements/HeadingLogo';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const SideBar = () => {
  return (
    <StyledSidebar>
      <HeadingLogo />

      <Mainnav />
    </StyledSidebar>
  );
};
export default SideBar;
