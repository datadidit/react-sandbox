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
        console.log(result)
    }

    render(){
        const { classes, visited, notvisited } = this.props

        console.log("Visited ")
        console.log(visited)
        console.log(this.props)
        return (
            <DragDropContext
                onDragEnd={this.onDragEndMultiple}
                >
                <Grid
                    spacing={16}
                    className={classes.grid}
                    container>
                    <Grid item
                          className={classes.gridItem}
                          xs={4}>
                        <Paper className={classes.paper}>
                            <GridDroppable
                                droppableId={"notvisited"}
                                draggables={notvisited}/>
                        </Paper>
                    </Grid>
                    <Grid item
                          className={classes.gridItem}
                          xs={4}>
                        <Paper className={classes.paper}>
                            <GridDroppable
                                droppableId={"visited"}
                                draggables={visited}/>
                        </Paper>
                    </Grid>
                </Grid>
            </DragDropContext>
        )
    }
}

MultipleListExample.propTypes = {
    visited: PropTypes.array.isRequired,
    notvisited: PropTypes.array.isRequired
}

export default withStyles(style)(MultipleListExample)