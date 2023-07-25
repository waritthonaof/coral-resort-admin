import {
  FC,
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  MouseEvent,
  RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

import { useOutsideClick } from '../../hooks/outside-click-hoos';

const StyledToggle = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<ListStyledProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${({ position }) => (position !== null ? position.x : '')}px;
  top: ${({ position }) => (position !== null ? position.y : '')}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface Children {
  children?: ReactNode;
}

interface ListStyledProps {
  position: { x: number; y: number } | null;
  ref?: RefObject<HTMLElement>;
}

interface ListProps extends Children {
  id: string;
}

interface ButtonProps extends Children {
  icon: JSX.Element;
  onClick?: () => void;
}

interface OptionsComponent extends FC<Children> {
  Toggle: ({ id }: { id: string }) => JSX.Element;
  List: FC<ListProps>;
  Button: FC<ButtonProps>;
}

interface OptionsContextValue {
  openId: string;
  position: { x: number; y: number } | null;
  open: (id: string) => Dispatch<SetStateAction<string>> | void;
  close: () => Dispatch<SetStateAction<string>> | void;
  setPosition: Dispatch<SetStateAction<{ x: number; y: number } | null>>;
}

const initialContextValue: OptionsContextValue = {
  openId: '',
  position: null,
  open: () => {},
  close: () => {},
  setPosition: () => {},
};

const OptionsContext = createContext<OptionsContextValue>(initialContextValue);

const Options: OptionsComponent = ({ children }) => {
  const [openId, setOpenId] = useState<string>('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const close = () => setOpenId('');
  const open = (id: string) => setOpenId(id);

  return (
    <OptionsContext.Provider
      value={{
        openId,
        position,
        close,
        open,
        setPosition,
      }}>
      {children}
    </OptionsContext.Provider>
  );
};

const Toggle = ({ id }: { id: string }) => {
  const { openId, close, open, setPosition } = useContext(OptionsContext);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const target = e.target as Element | null;
    const rect = target?.closest('button')?.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect?.width! - rect?.x!,
      y: rect?.y! + rect?.height! + 8,
    });
    openId === '' || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleOpen}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List: FC<ListProps> = ({ id, children }) => {
  const { openId, position, close } = useContext(OptionsContext);

  const ref = useOutsideClick(close, false);

  if (openId !== id) return;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button: FC<ButtonProps> = ({ children, icon, onClick }) => {
  const { close } = useContext(OptionsContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Options.Toggle = Toggle;
Options.List = List;
Options.Button = Button;

export default Options;
