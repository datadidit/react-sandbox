import React from 'react'
import { connect } from 'react-redux'
import { SimpleTableExample } from '../react-beautiful-dnd'
import { order_list } from "../redux/actions";
import MUITable from "../react-beautiful-dnd/MUITableExample";

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

const SimpleTableContainer = connect(mapStateToProps, mapDispatchToProps)(SimpleTableExample)
const MUITableContainer = connect(mapStateToProps, mapDispatchToProps)(MUITable)

export {
    SimpleTableContainer,
    MUITableContainer
}
