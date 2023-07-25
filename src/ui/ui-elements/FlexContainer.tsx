import styled, { css } from 'styled-components';

type FlextContainerProps = {
  direction?: 'row' | 'column';
};

const FlextContainer = styled.div<FlextContainerProps>`
  display: flex;

  ${({ direction }) =>
    direction === 'row' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${({ direction }) =>
    direction === 'column' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

FlextContainer.defaultProps = {
  direction: 'row',
};

export default FlextContainer;
