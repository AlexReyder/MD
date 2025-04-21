'use client'

import { createFAQ } from '@/shared/api/admin/faq'
import { Button } from '@/shared/shadcnui/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/shared/shadcnui/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/shadcnui/ui/form'
import { Input } from '@/shared/shadcnui/ui/input'
import { FAQAdmin } from '@/shared/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'
import { Textarea } from '../../ui/textarea'

const formSchema = z
  .object({
    id: z.string(),
    question: z.string().min(6, { message: 'Обязательное поле. Минимум 6 символов.' }),
    answer: z.string().min(6, { message: 'Обязательное поле. Минимум 6 символов.' }),
  })

export type FAQAdminForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: FAQAdmin
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FAQActionDialog({ currentRow, open, onOpenChange }: Props) {

  const isEdit = !!currentRow
  const form = useForm<FAQAdminForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
					question: currentRow.question,
					answer: currentRow.answer,

        }
      : {
          id: '',
          question: '',
					answer: '',
        },
  })

  const onSubmit = async (values: FAQAdminForm) => {
      const {success, error} = await createFAQ(values)
      console.log(error)
      form.reset()
      const toastMessage = isEdit ? 'Ответ успешно изменен' : 'Ответ успешно добавлен'
      if(success){
        toast.success(toastMessage)
      }
      if(error){
        toast.error('Произошла ошибка')
      }
      onOpenChange(false)
  }

  return (
    <>
     <Dialog
        open={open}
        onOpenChange={(state) => {
          form.reset()
          onOpenChange(state)
        }}
      >
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader className='text-left'>
            <DialogTitle>
              {isEdit? `Изменить ответ` : `Добавить ответ`}
            </DialogTitle>
          </DialogHeader>
          <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id='filter-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'
              >
                <FormField
                  control={form.control}
                  name='question'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                       Вопрос
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=''
                          className='col-span-4'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name='answer'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                        Ответ
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=''
                          className='col-span-4'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                  />
              </form>
  
            </Form>
          </div>
          <DialogFooter>
            <Button type='submit' form='filter-form'>
             Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{duration:3000}}
    />
    </>
  )
}