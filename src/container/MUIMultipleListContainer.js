import React from 'react'
import { connect } from 'react-redux'
import MUIMultipleVerticalList from '../react-beautiful-dnd/MUIMultipleVerticalLists'
import { multi_ordered_lists } from "../redux/actions";

const mapStateToProps = (state) => ({
    visited: state.places.visited,
    notvisited: state.places.notvisited,
    places: state.places
})

const mapDispatchToProps = (dispatch) => ({
    multipleOrder: results => dispatch(multi_ordered_lists(results))
})

export default connect(mapStateToProps, mapDispatchToProps)(MUIMultipleVerticalList)