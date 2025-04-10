"use client"
import { signIn } from '@/shared/api/auth'
import { signInSchema } from '@/shared/types/schemas'
import { Form, FormContainer, FormFooter, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormSchema = z.infer<typeof signInSchema>

const AuthPopupLogin = ({includeHeading = true, className = ''}: {includeHeading?: boolean, className?: string}) => {
  const router = useRouter()
  const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema)
  })
  
  async function onSubmit(data: FormSchema) {
    const {success, error} = await signIn(data)
    if(success){
      router.push('/')
    }
    // setError(error)
  }

  return (
      <FormContainer className={className}>
        {includeHeading ? ( <FormHeader title='Войти' description='Войти в свой личный аккаунт'/> ) : <></>}
         
        <Form action={handleSubmit(onSubmit)}>
           <Input registerName='email' register={register} errors={errors.email} type='email' placeholder='Электронная почта' />
           <Input registerName='password' register={register} errors={errors.password} type='password' placeholder='Пароль' />
           <FormSubmit 
            title='Войти' 
            isDisabled={!isDirty || isSubmitting}       
            isSubmitting={isSubmitting}
           />
        </Form>
        <FormFooter>
            <Link
                href='/password-recovery'
                className='inner__reset'
              >
                Восстановить пароль
              </Link>
        <div>
        <span className='inner__bottom__text'>
                Еще нет аккаунта?
                </span>
                <Link
                  href="/signup"
                  className='btn-reset inner__switch'
                >
                  Зарегистрироваться!
                </Link>
        </div>
        </FormFooter>
      </FormContainer>

  )
  // return (
  //   <div className='card-back'>
  //     <div className='card-body wow-bg'>
  //       <h3 className='card-body__title'>
  //       Войти
  //       </h3>
  //       <p className='card-body__description'>
  //       Войти в свой аккаунт
  //       </p>
  //       <form onSubmit={handleSubmit(onSubmit)}>
  //          <Input registerName='email' register={register} errors={errors.email} type='email' placeholder='email' />
  //          <Input registerName='password' register={register} errors={errors.password} type='password' placeholder='password' />
  //         <div className='card-body__inner'>
  //           <div className='inner__top'>
  //             <button className='inner__btn' type='submit' disabled={!isDirty || isSubmitting}>
  //               {isSubmitting ? (
  //                 <FontAwesomeIcon icon={faSpinner} spin />
  //               ) : (
  //                "Войти"
  //               )}
  //             </button>
  //             <Link
  //               href='/auth/recovery'
  //               className='inner__reset'
  //             >
  //               Восстановить пароль
  //             </Link>
  //           </div>
  //           <div className='inner__bottom'>
  //             <span className='inner__bottom__text'>
  //             Еще нет аккаунта?
  //             </span>
  //             <button
  //               type='button'
  //               className='btn-reset inner__switch'
  //               // onClick={toggleAuth}
  //             >
  //               Зарегистрироваться!
  //             </button>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // )
}

export default AuthPopupLogin
