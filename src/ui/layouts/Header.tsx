import styled from 'styled-components';
import { useLogout } from '../../hooks/auth-hook';
import ButtonIcon from '../ui-elements/ButtonIcon';
import { HiArrowRightOnRectangle, HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../ui-elements/UserAvatar';
import DarkModeToggle from '../ui-elements/DarkModeToggle';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  gap: 2.4rem;
`;

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <StyledHeader>
      <UserAvatar />

      <StyledHeaderMenu>
        <li>
          <ButtonIcon onClick={() => navigate('/account')}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <ButtonIcon onClick={logout}>
            <HiArrowRightOnRectangle />
          </ButtonIcon>
        </li>
      </StyledHeaderMenu>
    </StyledHeader>
  );
};
export default Header;
