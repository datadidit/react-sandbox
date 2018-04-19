import {
    ORDER_LIST,
    MULTI_ORDERED_LISTS } from './constants'

export const order_list = (startIndex, endIndex, type="people") => ({
    type: ORDER_LIST,
    listType: type,
    startIndex: startIndex,
    endIndex: endIndex
})

export const multi_ordered_lists = (result) => ({
    type: MULTI_ORDERED_LISTS,
    result: result
})