import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import { DragDropContext } from 'react-beautiful-dnd'
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types'
import GridDroppable from "./DroppableGrid";

const style = theme => ({
    grid: {
        background: 'white'
    },
    gridItem: {
        minHeight: '500px'
    },
    paper: {
        background: 'lightgrey',
        width: '100%',
        height: '100%'
    }
})

class MultipleListExample extends Component {
    constructor(props){
        super(props)

        this.onDragEndMultiple = this.onDragEndMultiple.bind(this)
    }

    onDragEndMultiple = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        this.props.multipleOrder(result)
    }

    render(){
        const { classes, places } = this.props
        let columns = []
        for(const [key, val] of Object.entries(places)){
            columns.push(
                <Grid item
                      className={classes.gridItem}
                      xs={4}>
                    <Paper className={classes.paper}>
                        <h1>{key}</h1>
                        <GridDroppable
                            droppableId={key}
                            draggables={val}/>
                    </Paper>
                </Grid>
            )
        }

        return (
            <DragDropContext
                onDragEnd={this.onDragEndMultiple}
                >
                <Grid
                    spacing={16}
                    className={classes.grid}
                    container>
                    {columns}
                </Grid>
            </DragDropContext>
        )
    }
}

MultipleListExample.propTypes = {
    places: PropTypes.object.isRequired,
    multipleOrder: PropTypes.func.isRequired
}

export default withStyles(style)(MultipleListExample)