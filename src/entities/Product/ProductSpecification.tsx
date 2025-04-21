import s from './ProductSpecification.module.scss'

const ProductSpecification = ({specifications}:{specifications: any}) => {

	return(
	<div>
		<h3 className={s.Heading3}>Характеристики:</h3>
		<table className={s.Table}>
			<tbody>
			<tr className={s.Item}>
				<td className={s.ItemTitle}>Бренд:</td>
				<td className={s.ItemValue}>{specifications.manufacturer}</td>
			</tr>
			<tr className={s.Item}>
				<td className={s.ItemTitle}>Страна производства:</td>
				<td className={s.ItemValue}>{specifications.country}</td>
			</tr>
			<tr className={s.Item}>
				<td className={s.ItemTitle}>Материал:</td>
				<td className={s.ItemValue}>{specifications.material}</td>
			</tr>
			<tr className={s.Item}>
				<td className={s.ItemTitle}>Печать:</td>
				<td className={s.ItemValue}>{specifications.print}</td>
			</tr>
			<tr className={s.Item}>
				<td className={s.ItemTitle}>Посадка:</td>
				<td className={s.ItemValue}>Стандартная</td>
			</tr>
			</tbody>
		</table>
	</div>
	)
}
export default ProductSpecification