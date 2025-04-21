'use client'

import { addUserBonus } from '@/shared/api/admin/users'
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
import { Bonus } from '@/shared/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { BonusType } from '@prisma/client'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../../ui/button'
import { Textarea } from '../../ui/textarea'



const formSchema = z
	.object({
		id: z.string(),
		userId: z.string(),
		amount: z.number(),
		history:z.any(),
		status:z.nativeEnum(BonusType),
		addNum: z.preprocess((val) => Number(val), z.number()),
		mailTitle: z.string(),
		mailDescription:z.string()
	})
export type BonusAdminForm = z.infer<typeof formSchema>

interface Props {
	currentRow: Bonus
	open: boolean
	onOpenChange: (open: boolean) => void
}



export function UsersBonusDialog({ currentRow, open, onOpenChange }: Props) {
		const form = useForm<BonusAdminForm>({
			resolver: zodResolver(formSchema),
			defaultValues: 
					{
							id: currentRow.id,
							userId: currentRow.userId,
							amount: currentRow.amount,
							history: currentRow.history,
							status:currentRow.status,
							addNum: 0,
							mailTitle: '',
							mailDescription: ''
					},
		})
		const onSubmit = async (values: BonusAdminForm) => {
		 
				const {success, error} = await addUserBonus(values)
				form.reset()
						if(success){
								toast.success('Бонусы успешно начислены')
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
			<DialogContent className='sm:max-w-5xl max-h-9/10 h-full'>
				<DialogHeader className='text-left'>
					<DialogTitle className=" text-2xl font-semibold ">Начислить бонусы</DialogTitle>
				</DialogHeader>
				<div className='-mr-4  w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='bonus-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
															<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
								Расчет
   							</h4>
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-left'>
                      Текущее количество
                    </FormLabel>
                    <FormControl>
                      <Input
												disabled={true}
												placeholder=''
												type='number'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
							              <FormField
                control={form.control}
                name='addNum'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-left'>
                      Начислить
                    </FormLabel>
                    <FormControl>
                      <Input
												placeholder='Добавить количество бонусов'
												type='number'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
								<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
									Отправить уведомление на почту
   							</h4>
								 <FormField
                control={form.control}
                name='mailTitle'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-left'>
                      Заголовок письма
                    </FormLabel>
                    <FormControl>
                      <Input
												placeholder='Укажите заголовок письма'
												type='text'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
									 <FormField
                control={form.control}
                name='mailDescription'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-left'>
                      Тело письма
                    </FormLabel>
                    <FormControl>
                      <Textarea
												placeholder='Укажите тело письма'
                        className='col-span-4'
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
          <Button type='submit' form='bonus-form'>
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