import { IAddToCartBtnProps } from '@/shared/types/goods'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddToCartBtn = ({
  handleAddToCart,
  addToCartSpinner,
  text,
  btnDisabled = false,
  className,
}: IAddToCartBtnProps) => (
  <button
    className={`${className}`}
    disabled={btnDisabled}
    onClick={handleAddToCart}
    type='submit'
  >
    {addToCartSpinner ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
    ) : (
      text
    )}
  </button>
)

export default AddToCartBtn