import { getAllOrders } from '@/shared/api/admin/orders'
import OrdersProvider from '@/shared/context/orders-context'
import { ErrorTemplate } from '@/shared/shadcnui/layouts/error-template'
import { Main } from '@/shared/shadcnui/layouts/main'
import { columns } from '@/shared/shadcnui/order-table/order-columns'
import { OrdersTable } from '@/shared/shadcnui/order-table/order-table'
import { ValidateOrderDbSchema } from '@/shared/types/validation/order'

export default async function AdminDashboardPage() {
	const ordersData = await getAllOrders()
	const data = ValidateOrderDbSchema.parse(ordersData.success)

	return (
		<>
		{
			ordersData.error === null ? 
			<OrdersProvider>
				<Main>
					<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
							<div>
										<h2 className='text-2xl font-bold tracking-tight'>Список заказов</h2>
										<p className='text-muted-foreground'>
											Управление заказами.
										</p>
							</div>
					</div>
					<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
							<OrdersTable data={data} columns={columns} />
					</div>
					</Main>
			</OrdersProvider>
			:
			<ErrorTemplate/>
		}		
		</>

	);
}
