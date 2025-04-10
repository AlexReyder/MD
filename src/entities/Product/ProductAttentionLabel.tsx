import styles from '@/styles/product/index.module.scss'

interface Props{
	isBestseller?: boolean
	isNew?: boolean
}

const ProductAttentionLabel = ({isBestseller, isNew}: Props) => {

	return (
		<>
		{(isBestseller || isNew) && (
            <div className={styles.product__top__label}>
              {isNew && (
                <span className={styles.product__top__label__new}>
                  Новинка
                </span>
              )}
              {isBestseller && (
                <span className={styles.product__top__label__bestseller}>
                  Хит
                </span>
              )}
            </div>
          )}
		</>
	)
}
export default ProductAttentionLabel