import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import GridDroppable from './DroppableGrid'
import Grid from 'material-ui/Grid'

const people = [
    {
        name: "Marcus",
        id: 1
    },
    {
        name: "Joy",
        id: 2
    }
]

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
            items: people
        }

        this.onDragEnd = this.onDragEnd.bind(this)
    }

    onDragEnd(result){
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        console.log("Items")
        console.log(items)

        this.setState({
            items
        });
    }

    render(){
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Grid container>
                    <GridDroppable draggables={this.state.items}/>
                </Grid>
            </DragDropContext>
        )
    }
}

export default MUISimpleVerticalList