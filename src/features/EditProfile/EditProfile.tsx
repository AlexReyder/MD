"use client"
import { signUp } from '@/shared/api/auth'
import { signUpSchema } from '@/shared/types/schemas'
import { Form, FormContainer, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormSchema = z.infer<typeof signUpSchema>
// [data: string]: UserProfileDTO}
  const EditProfile = ({data, className}:{className: any, data: any}) => {
		const {name, surname, email, phone} = data;
		const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
			defaultValues: {
				name: name ?? "",
				surname: surname ?? "",
				phone,
				email,
			},
			resolver: zodResolver(signUpSchema)
		})

		async function onSubmit(data: FormSchema) {
			const error = await signUp(data)
			console.log(error)
			// setError(error)
		}


	return (
		<FormContainer className={className}>
				<FormHeader title='Личные данные' description='Изменить личные данные'/>
				<Form action={handleSubmit(onSubmit)}>
				<Input registerName='name' register={register} errors={errors.email} type='text' placeholder='name' />
				<Input registerName='surname' register={register} errors={errors.email} type='text' placeholder='surname' />
				<Input registerName='email' register={register} errors={errors.email} type='email' placeholder='email' />
				<Input registerName='phone' register={register} errors={errors.email} type='text' placeholder='phone' />
					<FormSubmit 
										title='Сохранить' 
										isDisabled={!isDirty || isSubmitting}       
										isSubmitting={isSubmitting}
									 />
				</Form>
		</FormContainer>
	)
}

export default EditProfile