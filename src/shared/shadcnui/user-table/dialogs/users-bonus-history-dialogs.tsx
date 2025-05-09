'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/shadcnui/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/shared/shadcnui/ui/table"
import { User } from '@/shared/types/schemas'
import { BonusesTypeEnum } from '@/shared/types/validation/bonus'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'


interface Props {
	currentRow?: User
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function UserBonusHistoryDialog({ currentRow, open, onOpenChange }: Props) {
	return (
		<>
		<Dialog
				open={open}
				onOpenChange={(state) => {
					onOpenChange(state)
				}}
			>
					<DialogContent className='sm:max-w-6xl h-6/9 block'>
						<DialogHeader className='text-left'>
							<DialogTitle>
							История бонусов
							</DialogTitle>
						</DialogHeader>
						<div className='h-full w-full overflow-y-auto py-1 pr-4 mt-6'>
						<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Тип</TableHead>
								<TableHead>Цель</TableHead>
								<TableHead>Количество</TableHead>
								<TableHead>Истекает до</TableHead>
								<TableHead>Дата создания</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{currentRow?.Bonus[0].history.map((item) => (
								<TableRow key={item.createdAt.toString()}>
									<TableCell className="font-medium">{item.type === BonusesTypeEnum.ADD ? 'Начисление' : 'Списание'}</TableCell>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.amount}</TableCell>
									<TableCell>{
										item.expiresAt ? format(item.expiresAt,"d.MM.yyyy h:mm ", {locale: ru}) : 'Отсутствует'
										}</TableCell>
									<TableCell >{format(item.createdAt,"d.MM.yyyy h:mm ", {locale: ru})}</TableCell>
								</TableRow>
							))}
						</TableBody>
			</Table>
					</div>
				</DialogContent>
		</Dialog>
		</>
	)
}