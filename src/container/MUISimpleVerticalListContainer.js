import React from 'react'
import { connect } from 'react-redux'
import MUISimpleVerticalList from '../react-beautiful-dnd/MUISimpleVerticalList'
import { order_list} from "../redux/actions";

const mapStateToPros = (state) => ({
    people: state.people
})

const mapDispatchToProps = (dispatch) => ({
    reorder: (startIndex, endIndex) => dispatch(order_list(startIndex, endIndex))
})

export default connect(mapStateToPros, mapDispatchToProps)(MUISimpleVerticalList)
