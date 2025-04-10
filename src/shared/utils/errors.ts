/* eslint-disable indent */
import { JWTError } from '@/shared/constants/jwt'
import { refreshTokenFx } from '@/shared/context/auth'
import {
  addProductToCartFx,
  addProductsFromLSToCartFx,
  deleteAllFromCartFx,
  deleteCartItemFx,
  getCartItemsFx,
} from '@/shared/context/cart'
import {
  addProductToComparisonFx,
  addProductsFromLSToComparisonFx,
  deleteComparisonItemFx,
  getComparisonItemsFx,
} from '@/shared/context/comparison'
import {
  addProductToFavoriteFx,
  addProductsFromLSToFavoritesFx,
  deleteFavoriteItemFx,
  getFavoriteItemsFx,
} from '@/shared/context/favorites'
import { makePaymentFx } from '@/shared/context/order'

import { loginCheckFx } from '@/shared/context/user'
import {
  IAddProductToCartFx,
  IAddProductsFromLSToCartFx,
  IDeleteCartItemsFx,
} from '@/shared/types/cart'
import {
  IAddProductToComparisonFx,
  IAddProductsFromLSToComparisonFx,
  IDeleteComparisonItemsFx,
} from '@/shared/types/comparison'
import {
  IAddProductsFromLSToFavoriteFx,
  IDeleteFavoriteItemsFx,
} from '@/shared/types/favorites'
import { IMakePaymentFx } from '@/shared/types/order'

export const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshData?: {
    repeatRequestMethodName: string
    payload?: unknown
  }
) => {
  if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })

    if (repeatRequestAfterRefreshData) {
      const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData

      switch (repeatRequestMethodName) {
        case 'getCartItemsFx':
          return getCartItemsFx({
            jwt: newTokens.accessToken,
          })
        case 'addProductToComparisonFx':
          return addProductToComparisonFx({
            ...(payload as IAddProductToComparisonFx),
            jwt: newTokens.accessToken,
          })
        case 'getComparisonItemsFx':
          return getComparisonItemsFx({
            jwt: newTokens.accessToken,
          })
        case 'addProductsFromLSToComparisonFx':
          return addProductsFromLSToComparisonFx({
            ...(payload as IAddProductsFromLSToComparisonFx),
            jwt: newTokens.accessToken,
          })
        case 'deleteComparisonItemFx':
          return deleteComparisonItemFx({
            ...(payload as IDeleteComparisonItemsFx),
            jwt: newTokens.accessToken,
          })
        case 'addProductToCartFx':
          return addProductToCartFx({
            ...(payload as IAddProductToCartFx),
            jwt: newTokens.accessToken,
          })
        case 'makePaymentFx':
          makePaymentFx({
            ...(payload as IMakePaymentFx),
            jwt: newTokens.accessToken,
          })
          break
        case 'deleteAllFromCartFx':
          deleteAllFromCartFx({
            jwt: newTokens.accessToken,
          })
          break
        case 'addProductsFromLSToCartFx':
          return addProductsFromLSToCartFx({
            ...(payload as IAddProductsFromLSToCartFx),
            jwt: newTokens.accessToken,
          })
        case 'deleteCartItemFx':
          return deleteCartItemFx({
            ...(payload as IDeleteCartItemsFx),
            jwt: newTokens.accessToken,
          })
        case 'addProductToFavoriteFx':
          return addProductToFavoriteFx({
            ...(payload as Omit<IAddProductToCartFx, 'count'>),
            jwt: newTokens.accessToken,
          })
        case 'getFavoriteItemsFx':
          return getFavoriteItemsFx({
            jwt: newTokens.accessToken,
          })
        case 'addProductsFromLSToFavoritesFx':
          return addProductsFromLSToFavoritesFx({
            ...(payload as IAddProductsFromLSToFavoriteFx),
            jwt: newTokens.accessToken,
          })
        case 'deleteFavoriteItemFx':
          return deleteFavoriteItemFx({
            ...(payload as IDeleteFavoriteItemsFx),
            jwt: newTokens.accessToken,
          })
        case 'loginCheckFx':
          await loginCheckFx({
            jwt: newTokens.accessToken,
          })
          break
      }
    }
  }
}
