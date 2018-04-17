import { ORDER_LIST } from './constants'

export const order_list = (startIndex, endIndex) => ({
    type: ORDER_LIST,
    startIndex: startIndex,
    endIndex: endIndex
})