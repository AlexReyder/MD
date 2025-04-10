import styles from '@/styles/product-list-item/index.module.scss'

const ProductAvailable = ({ vendorCode, isInStock }: any) => {
  return (
    <div className={styles.product}>
      <span
        className={`${styles.product__stock} ${
          isInStock ? styles.product__stock__green : styles.product__stock__red
        }`}
      >
        {isInStock ? 'В наличии' : 'Под заказ'}
      </span>
      <span className={styles.product__code}>
        Артикул
        .: {vendorCode}
      </span>
    </div>
  )
}

export default ProductAvailable