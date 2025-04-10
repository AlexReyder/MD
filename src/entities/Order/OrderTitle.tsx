import s from './Order.module.scss'

const OrderTitle = ({ orderNumber, text }: { orderNumber: string, text: string}) => (
  <h3 className={s.ItemTitle}>
    <span>{orderNumber}</span>
    <span>{text}</span>
  </h3>
)

export default OrderTitle