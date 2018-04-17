import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import GridDroppable from './DroppableGrid'
import Grid from 'material-ui/Grid'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'

const people = [
    {
        name: "Marcus",
        id: 1
    },
    {
        name: "Joy",
        id: 2
    },
    {
        name: 'Malcolm',
        id: 3
    },
    {
        name: 'Hope',
        id: 4
    }
]

const style = theme => ({
    grid: {
        minHeight: '500px',
        backgroundColor: 'lightgrey'
    }
})

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class MUISimpleVerticalList extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: this.props.people || people
        }

        this.onDragEnd = this.onDragEnd.bind(this)
    }

    onDragEnd(result){
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
    reorder: PropTypes.func
}

export default withStyles(style)(MUISimpleVerticalList)