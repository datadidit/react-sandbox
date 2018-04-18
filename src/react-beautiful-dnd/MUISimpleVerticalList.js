import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import GridDroppable from './DroppableGrid'
import Grid from 'material-ui/Grid'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'

const style = theme => ({
    grid: {
        minHeight: '500px',
        backgroundColor: 'lightgrey'
    }
})

class MUISimpleVerticalList extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: this.props.people
        }

        this.onDragEnd = this.onDragEnd.bind(this)
    }

    onDragEnd(result){
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        // dropped outside the list
        this.props.reorder(result.source.index, result.destination.index)
    }

    render(){
        const { classes, people } = this.props

        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Grid container>
                    <Grid item
                          xs={4}
                          className={classes.grid}>
                        <GridDroppable draggables={people}/>
                    </Grid>
                </Grid>
            </DragDropContext>
        )
    }
}

MUISimpleVerticalList.propTypes = {
    people: PropTypes.array.isRequired,
    reorder: PropTypes.func.isRequired
}

export default withStyles(style)(MUISimpleVerticalList)