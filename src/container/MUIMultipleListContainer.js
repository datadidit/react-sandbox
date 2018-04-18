import React from 'react'
import { connect } from 'react-redux'
import MUIMultipleVerticalList from '../react-beautiful-dnd/MUIMultipleVerticalLists'

const mapStateToProps = (state) => ({
    visited: state.places.visited,
    notvisited: state.places.notvisited,
    places: state.places
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, null)(MUIMultipleVerticalList)