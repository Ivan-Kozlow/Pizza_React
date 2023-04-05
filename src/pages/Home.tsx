import qs from 'qs'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Components
import Categories from '../components/Categories/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaItemSkelet from '../components/PizzaItem/PizzaBlockSkelet'
import PizzaItem from '../components/PizzaItem/PizzaItem'
import Sort, { sortList } from '../components/Sort/Sort'

// Redux
import { useSelector } from 'react-redux'
import { setCurrentPage, setFilters, setIndexCategor } from '../redux/filter/Slice'
import { fetchPizzas } from '../redux/pizzas/async'
import { status as StatusRDX } from '../redux/pizzas/types'
import { RootState, useAppDispatch } from '../redux/store'
import HomeReject from './HomeReject'
import { filterBy } from '../redux/filter/types'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { categoryId, currentPage, sort } = useSelector((state: RootState) => state.filter)
	const { items, status } = useSelector((state: RootState) => state.pizzas)
	const searchValue = useSelector((state: RootState) => state.search.searchValue)

	const firstRender = React.useRef(false)
	const isSearch = React.useRef(false)

	// URL change
	React.useEffect(() => {
		if (firstRender.current) {
			const queryString = qs.stringify({
				sort: sort.sort,
				categoryId,
				currentPage,
			})
			navigate(`?${queryString}`)
		}
		firstRender.current = true
	}, [categoryId, sort.sort, currentPage])

	// push to redux from url
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as filterBy
			const sort = sortList.find((obj) => obj.sort === params.sort)
			console.log(sort)

			dispatch(
				setFilters({
					categoryId,
					currentPage,
					sort: sort || sortList[0],
				})
			)
			isSearch.current = true
		}
	}, [])

	type pizzas = {
		fetchPizzas: () => void
	}

	const getPizzas = async () => {
		const sortBy = sort.sort
		dispatch(fetchPizzas({ categoryId, sortBy, currentPage }))
	}

	// Fetch (axios) to server
	React.useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			getPizzas()
		}
		isSearch.current = false
	}, [categoryId, sort, currentPage])

	const skeletons = [...new Array(4)].map((_, i) => <PizzaItemSkelet key={i} />)
	// filter pizza`s and render
	const pizzas = items
		.filter((obj) => (obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false))
		.map((obj) => <PizzaItem key={obj.id} {...obj} />)

	const onChangeCategory = React.useCallback((obj: number) => {
		dispatch(setIndexCategor(obj))
	}, [])

	const onChangePage = (curPage: number) => {
		dispatch(setCurrentPage(curPage))
	}

	return (
		<>
			<div className='content__top'>
				<Categories valueId={categoryId} setValue={onChangeCategory} />
				<Sort sort={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{status === StatusRDX.ERROR ? <HomeReject /> : status === StatusRDX.LOADING ? skeletons : pizzas}
			</div>
			<Pagination changePage={onChangePage} />
		</>
	)
}

export default Home
