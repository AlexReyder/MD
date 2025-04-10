"use client"
import { signUp } from '@/shared/api/auth'
import { signUpSchema } from '@/shared/types/schemas'
import { Form, FormContainer, FormFooter, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormSchema = z.infer<typeof signUpSchema>

const AuthPopupRegistration = ({className = ''}: {className?: string}) => {
    const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
      defaultValues: {
        name:"",
        surname:"",
        phone:"",
        email: "",
        password: "",
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
      <FormHeader title='Регистрация' description='Создать аккаунт'/>   
        <Form action={handleSubmit(onSubmit)}>
        <Input registerName='name' register={register} errors={errors.email} type='text' placeholder='Имя' />
        <Input registerName='surname' register={register} errors={errors.email} type='text' placeholder='Фамилия' />
        <Input registerName='email' register={register} errors={errors.email} type='email' placeholder='Электронная почта' />
        <Input registerName='phone' register={register} errors={errors.email} type='text' placeholder='Номер телефона' />
        <Input registerName='password' register={register} errors={errors.password} type='password' placeholder='Пароль' />
        <FormSubmit 
                title='Создать' 
                isDisabled={!isDirty || isSubmitting}       
                isSubmitting={isSubmitting}
        />
        <FormFooter>
        <span className='inner__bottom__text'>
               Уже есть аккаунт?
              </span>
              <Link
                href='/signin'
                className='btn-reset inner__switch'
              >
               Войти!
              </Link>
        </FormFooter>
        </Form>
      </FormContainer>
  )
}

export default AuthPopupRegistration
