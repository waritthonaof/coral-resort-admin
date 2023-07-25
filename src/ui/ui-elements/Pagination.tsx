import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: var(--color-grey-50);
  color: inherit;
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ count }: { count?: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page'));

  const currPage = !page || page < 1 ? 1 : page;

  const limit = !searchParams.get('limit')
    ? 10
    : Number(searchParams.get('limit'));

  const pageCount = count ? Math.ceil(count / limit) : 0;

  const handleNextPage = () => {
    const next = currPage === pageCount ? currPage : currPage + 1;

    searchParams.set('page', String(next));
    setSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    const prev = currPage === 1 ? currPage : currPage - 1;

    searchParams.set('page', String(prev));
    setSearchParams(searchParams);
  };

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currPage - 1) * limit + 1}</span> to{' '}
        <span>{currPage === pageCount ? count : currPage * limit}</span> of{' '}
        <span>{count}</span> result
      </P>
      <Buttons>
        <PaginationButton onClick={handlePrevPage} disabled={currPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={handleNextPage}
          disabled={currPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};
export default Pagination;
