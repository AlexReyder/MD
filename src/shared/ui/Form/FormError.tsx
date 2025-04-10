import s from './Form.module.scss'

export const FormError = ({errorMessage}: {errorMessage: string | null}) => {

	return(
		<>
		{
			errorMessage? (
			<div className={s.ErrorBlock}>
				<p className={s.Error}>{errorMessage}</p>
			</div>
			) : null
		}
		</>
	)
}