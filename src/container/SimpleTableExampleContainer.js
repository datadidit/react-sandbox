import React from 'react'
import { connect } from 'react-redux'
import SimpleTableExample from '../react-beautiful-dnd/SimpleTableExample'
import { order_list } from "../redux/actions";

const columns = [
    { name: 'name', title: 'Name' },
    { name: 'salary', title: 'Salary'},
    { name: 'age', title: 'Age'}
]

const mapStateToProps = state => ({
    rows: state.employees,
    columns: columns
})

const mapDispatchToProps = (dispatch) => ({
    reorder: (startIndex, endIndex, listType) => dispatch(order_list(startIndex, endIndex, listType))
})

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTableExample)