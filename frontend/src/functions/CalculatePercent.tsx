const roundToHalf = (num: number): number => parseFloat((Math.ceil(num * 2).toFixed())) / 2

const getDiscountPrice = (percent: number, productPrice: number): number => {
   if(percent === 0) return productPrice

   return productPrice - (productPrice * parseFloat('0.' + `0${ percent }`.slice(-2)))
}

export { roundToHalf, getDiscountPrice }