import ContentLoader from "react-content-loader"
import "./_pizza-block.scss"

const PizzaSkeleton: React.FC = () => (
	<ContentLoader
		speed={1}
		width={280}
		height={490}
		viewBox='0 0 280 490'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<circle cx='119' cy='128' r='116' />
		<rect x='15' y='256' rx='11' ry='11' width='217' height='37' />
		<rect x='2' y='330' rx='0' ry='0' width='255' height='79' />
		<rect x='5' y='434' rx='11' ry='11' width='90' height='27' />
		<rect x='144' y='422' rx='21' ry='21' width='117' height='48' />
	</ContentLoader>
)

export default PizzaSkeleton
