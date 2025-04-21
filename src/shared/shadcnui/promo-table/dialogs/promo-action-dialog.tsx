'use client'

import { createPromocode } from '@/shared/api/admin/promocode'
import { Button } from '@/shared/shadcnui/ui/button'
import { Calendar } from "@/shared/shadcnui/ui/calendar"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcnui/ui/popover"
import { PromocodeAdd, PromocodeAddSchema, PromocodeDb } from '@/shared/types/validation/promocode'
import { cn } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from "date-fns"
import { ru } from 'date-fns/locale/ru'
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'First Name is required.' }),
    material: z.any().nullable().optional(),
    print: z.any().nullable().optional(),
  })



interface Props {
  currentRow?: PromocodeDb
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PromoActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const form = useForm<PromocodeAdd>({
    resolver: zodResolver(PromocodeAddSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          value: '',
          discount: 0,
          expiresAt: new Date()
        },
  })

  const onSubmit = async (values: PromocodeAdd) => {
      const {success, error} = await createPromocode(values)
      const toastMessage = isEdit ? 'Промокод успешно изменен' : 'Промокод успешно добавлен'

      if(success){
        toast.success(toastMessage)
      }
      
      if(error){
        toast.error('Произошла ошибка')
      }

      form.reset()
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
              {isEdit ? 'Изменить промокод' : 'Добавить промокд'}
            </DialogTitle>
          </DialogHeader>
          <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id='promo-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'
              >
                <FormField
                  control={form.control}
                  name='value'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                       Значение
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Значение'
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
                  name='discount'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                       Скидка
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Скидка'
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
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Истекает</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP",{locale: ru})
                              ) : (
                                <span>Выбрать дату</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                           
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
  
            </Form>
          </div>
          <DialogFooter>
            <Button type='submit' form='promo-form'>
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