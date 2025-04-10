import s from './ProductSpecification.module.scss'

const ProductSpecification = ({specifications}:{specifications: string}) => {

	return(
	<div>
		<h3 className={s.Heading3}>Характеристики:</h3>
		<table className={s.Table}>
			<tbody>
			<tr className={s.Item}>
				<td className={s.ItemTitle}>Бренд:</td>
				<td className={s.ItemValue}>HellBlast</td>
			</tr>
			<tr className={s.Item}>
				<td className={s.ItemTitle}>Страна производства:</td>
				<td className={s.ItemValue}>Перу</td>
			</tr>
			<tr className={s.Item}>
				<td className={s.ItemTitle}>Материал:</td>
				<td className={s.ItemValue}>100% хлопок (20/1)</td>
			</tr>
			<tr className={s.Item}>
				<td className={s.ItemTitle}>Печать:</td>
				<td className={s.ItemValue}>Шелкография (пластизол)</td>
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