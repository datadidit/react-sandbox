import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { Droppable } from 'react-beautiful-dnd'
import DraggableCard from './DraggableCard'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

const style = theme => ({
    grid: {
        minHeight: '500px',
        backgroundColor: 'lightgrey'
    }
})

const grid = 8

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

class GridDroppable extends Component {
    constructor(props){
        super(props)
        this.state = {
            draggables: this.props.draggables || []
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.draggables != nextProps.draggables){
            this.setState({
                draggables: nextProps.draggables
            })
            console.log("Updated state")
        }
    }

    render() {
        const { classes } = this.props
        const { draggables } = this.state
        let draggableCards = []
        for(let [index, draggable] of draggables.entries()) {
            draggableCards.push(<DraggableCard name={draggable.name} id={draggable.id} index={index}/>)
        }

        return (
            <Droppable droppableId="droppable-mui-grid">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}
                         style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {draggableCards}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

GridDroppable.propTypes = {
    draggables: PropTypes.array.isRequired
}

export default withStyles(style)(GridDroppable)

