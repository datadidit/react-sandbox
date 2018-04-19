import React from 'react'
import { connect } from 'react-redux'
import DevExpressTable from "../react-beautiful-dnd/DraggableDevGrid";

const columns = [
    { name: 'name', title: 'Name' },
    { name: 'salary', title: 'Salary'},
    { name: 'age', title: 'Age'}
]

const mapStateToProps = state => ({
    rows: state.employees,
    columns: columns
})

export default connect(mapStateToProps, null)(DevExpressTable)