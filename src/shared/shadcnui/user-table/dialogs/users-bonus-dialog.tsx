'use client'

import { addUserBonus } from '@/shared/api/admin/users'
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
import { BonusDb, DynamicBonusesSchema } from '@/shared/types/validation/bonus'
import { cn } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { BonusType } from '@prisma/client'
import { format } from "date-fns"
import { ru } from 'date-fns/locale/ru'
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import { Textarea } from '../../ui/textarea'






const formSchema = z
	.object({
		id: z.string(),
		userId: z.string(),
		amount: z.number(),
		history:DynamicBonusesSchema.array(),
		dynamicBonuses: DynamicBonusesSchema.array(),
		status:z.nativeEnum(BonusType),
		addNum: z.coerce.number().min(1,{message:'Обязательное поле.'}),
		addPurpose: z.string().nonempty({message: 'Обязательное поле. Причина добавления бонусов будет отображаться в профиле клиента.'}),
		addExpiresAt: z.date(),
		mailTitle: z.string(),
		mailDescription:z.string()
	})
export type BonusAdminForm = z.infer<typeof formSchema>

interface Props {
	currentRow: BonusDb
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
							dynamicBonuses: currentRow.dynamicBonuses,
							status:currentRow.status,
							addNum: 0,
							addPurpose: '',
							addExpiresAt: new Date(),
							mailTitle: '',
							mailDescription: ''
					},
		})
		const onSubmit = async (values: BonusAdminForm) => {
			console.log(values)
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
				<div className='w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='bonus-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
								<h4 className="text-lg font-semibold text-left">
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
							<FormField
                control={form.control}
                name='addPurpose'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-left'>
                      Причина начисления
                    </FormLabel>
                    <FormControl>
                      <Input
												placeholder='Напишите причину начисления'
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
									name="addExpiresAt"
									render={({ field }) => (
										<FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
										<FormLabel className='col-span-2 text-left'>Бонус истекает</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
															variant={"outline"}
															className={cn(
																							"w-[240px] pl-3 text-left font-normal",
																							!field.value && "text-muted-foreground",
																							'col-span-4'
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
														/>
											 </PopoverContent>
														</Popover>
														<FormMessage />
													</FormItem>
														)}
											/>
											<Separator className='mt-8 mb-8'/>
								<h4 className="text-lg font-semibold text-left mt-6">
									Отправить уведомление на почту
   							</h4>
								 <p className='text-muted-foreground mb-6'>
										Вы можете оставить поля ниже пустыми, тогда сообщение не отправится на почту клиенту.
									</p>
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