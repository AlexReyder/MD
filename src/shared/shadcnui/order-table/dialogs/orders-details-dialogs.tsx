'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/shadcnui/ui/dialog'
import { OrderDb } from '@/shared/types/validation/order'


interface Props {
	currentRow?: OrderDb
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function OrderDetailsDialog({ currentRow, open, onOpenChange }: Props) {


	return (
		<>
		<Dialog
				open={open}
				onOpenChange={(state) => {
					onOpenChange(state)
				}}
			>
				<DialogContent className='sm:max-w-lg'>
					<DialogHeader className='text-left'>
						<DialogTitle>
						Данные заказчика
						</DialogTitle>
					</DialogHeader>
					<div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
							<div className='flex items-center gap-2 mt-2'>
							<h4 className="leading-7 font-semibold tracking-tight">Фамилия: </h4>
							<p className="leading-7">{currentRow?.details.surname}</p>
						</div>
						<div className='flex items-center gap-2'>
							<h4 className="leading-7 font-semibold tracking-tight">Имя: </h4>
							<p className="leading-7">{currentRow?.details.name}</p>
						</div>
							<div className='flex items-center gap-2 mt-2'>
							<h4 className="leading-7 font-semibold tracking-tight">Отчество: </h4>
							<p className="leading-7">{currentRow?.details?.patronymic}</p>
						</div>
						<div className='flex items-center gap-2 mt-2'>
							<h4 className="leading-7 font-semibold tracking-tight">Номер телефона: </h4>
							<p className="leading-7">{currentRow?.details.phone}</p>
						</div>
						<div className='flex items-center gap-2 mt-2'>
							<h4 className="leading-7 font-semibold tracking-tight">Электронная почта: </h4>
							<p className="leading-7">{currentRow?.details.email}</p>
						</div>
						<div className='flex items-center gap-2 mt-2'>
							<h4 className="leading-7 font-semibold tracking-tight">Комментарий: </h4>
							<p className="leading-7">{currentRow?.details.comment}</p>
						</div>
						<div className='flex items-center gap-2 mt-2'>
							<h4 className="leading-7 font-semibold tracking-tight">WhatsApp: </h4>
							<p className="leading-7">{currentRow?.User.whatsapp ? 'Привязан' : 'Не привязан'}</p>
						</div>
						<div className='flex items-center gap-2 mt-2'>
							<h4 className="leading-7 font-semibold tracking-tight">Telegran: </h4>
							<p className="leading-7">{currentRow?.User.telegram ? 'Привязан' : 'Не привязан'}</p>
						</div>
					</div>
				</DialogContent>
		</Dialog>
		</>
	)
}