'use client'

import { upsertSpecification } from '@/shared/api/admin/specifications'
import { SpecificationType } from '@/shared/context/specifications-context'
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
import { SpecificationAdmin } from '@/shared/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'


const specNames = {
  material: 'новый материал',
  print: 'новый принт',
  country: 'новую страну'
}
const formSchema = z
  .object({
    name: z.string().min(1, { message: 'First Name is required.' }),
  })

export type SpecForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: SpecificationAdmin
  specType: SpecificationType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SpecActionDialog({ currentRow, specType, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const form = useForm<SpecForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
					name: currentRow.name,
        }
      : {
          name: '',
        },
  })

  const onSubmit = async (values: SpecForm) => {
    if(specType){
      // @ts-ignore:next-line
      values.id = isEdit ? currentRow.id : ''
      const {success, error} = await upsertSpecification(values, specType)
      form.reset()

      const toastMessage = isEdit ? 'Спецификация успешно изменена' : 'Спецификация успешно добавлена'
      if(success){
        toast.success(toastMessage)
      }

      if(error){
        toast.error('Произошла ошибка')
      }

      onOpenChange(false)
    }
  }


  return (
    <>
    {specType && (
        <Dialog
        open={open}
        onOpenChange={(state) => {
          form.reset()
          onOpenChange(state)
        }}
      >
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader className='text-left'>
            <DialogTitle>{specType ? isEdit? `Изменить ${specNames[specType]}` : `Добавить ${specNames[specType]}` : ''}</DialogTitle>
          </DialogHeader>
          <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id='specification-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                       Название
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
              </form>
  
            </Form>
          </div>
          <DialogFooter>
            <Button type='submit' form='specification-form'>
             Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )}
      <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{duration:3000}}
        />
    </>
  )
}