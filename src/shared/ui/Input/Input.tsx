import { FieldError } from 'react-hook-form'
import s from './Input.module.scss'


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	registerName: string
	register: any
	errors: FieldError | undefined
}

export const Input = ({ registerName,register, errors, ...props }: InputProps,) => {
	return (
		<div className={s.Container}>
			<input
			  name={registerName}
				className={s.Input}
				{...props}
				{...register(
					registerName
				)}
			/>
			{errors && (
				<span className={s.Error}>{errors?.message}</span>
			)}
		</div>
	)
}


