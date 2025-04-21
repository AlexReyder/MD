import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from './Form.module.scss'
interface Props{
	title: string
	isDisabled: boolean
	isSubmitting: boolean
}

export const FormSubmit = ({title, isDisabled, isSubmitting}: Props) =>{
			return (
							<button 
								className={s.FormSubmit} 
								type='submit' 
								disabled={isDisabled}
							>
														{isSubmitting ? (
															<FontAwesomeIcon icon={faSpinner} spin />
														) : title }
							</button>
			)
}