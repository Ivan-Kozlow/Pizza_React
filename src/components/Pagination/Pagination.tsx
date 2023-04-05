import ReactPaginate from "react-paginate"
import cls from "./Pagination.module.scss"

type paginationProps = {
	changePage: (page: number) => void
}

const Pagination: React.FC<paginationProps> = ({ changePage }) => {
	return (
		<ReactPaginate
			className={cls.pagination}
			breakLabel='...'
			nextLabel='>'
			onPageChange={(e) => changePage(e.selected + 1)}
			pageRangeDisplayed={5}
			pageCount={3}
			previousLabel='<'
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination
