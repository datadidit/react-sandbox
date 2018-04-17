import React, {Component} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card, {CardContent} from 'material-ui/Card'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'

const style = theme => ({
    card: {
        margin: '10px'
    }
})

const grid=8

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

class DraggableCard extends Component {
    render(){
        const { name, id, classes, index } = this.props
        return (
            <Draggable draggableId={id} index={index}>
                {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            syle={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                            >
                            <Card className={classes.card}>
                                <CardContent>
                                    { name }
                                </CardContent>
                            </Card>
                        </div>
                    )
                }
            </Draggable>
        )
    }
}

DraggableCard.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}


export default withStyles(style)(DraggableCard)