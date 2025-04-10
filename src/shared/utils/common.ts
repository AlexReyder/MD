export const mergeArrays = (a, b, predicate = (a, b) => a === b) => {
  const c = [...a];
  b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
  return c;
}



export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}

export const addOverflowHiddenToBody = (paddingRight = '') => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
  paddingRight && (body.style.paddingRight = paddingRight)
}



export const formatPrice = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')


export const getSearchParamsUrl = () => {
  const paramsString = window.location.search
  const urlParams = new URLSearchParams(paramsString)

  return urlParams
}



export const updateSearchParam = (
  key: string,
  value: string | number,
  pathname: string
) => {
  const urlParams = getSearchParamsUrl()
  urlParams.set(key, `${value}`)
  const newPath = `${pathname}?${urlParams.toString()}`
  // window.history.pushState({ path: newPath }, '', newPath)
  return newPath
}




