import {MULTI_ORDERED_LISTS, ORDER_LIST} from "./constants";
let cloneDeep = require('lodash/cloneDeep');

const initial_state = {
    people: [
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
        },
        {
            name: 'Altheia',
            id: 5
        },
        {
            name: 'Myron',
            id: 6
        },
        {
            name: 'Sharon',
            id: 7
        },
        {
            name: 'Andrew',
            id: 8
        }
    ],
    places: {
        notvisited: [
                {
                    name: 'New Orleans',
                    id: 1
                },
                {
                    name: 'Hawaii',
                    id: 2
                },
                {
                    name: 'Greece',
                    id: 3
                }
            ],
        visited: []
    },
    employees: [
        {
            name: "Tony",
            salary: 60000,
            age: 25,
            rank: 1
        },
        {
            name: 'Sasha',
            salary: 65000,
            age: 27,
            rank: 2,
        },
        {
            name: 'Frank',
            salary: 70000,
            age: 30,
            rank: 3
        }
    ]
}

export const reorder = (state, startIndex, endIndex, type="people") => {
    let result = Array.from(state[type])

    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    //console.log("Latest newPeople ")
    //console.log(newPeople)
    return ({
        ...state,
        people: result
    })
}

export const multi_reorder = (state, result) => {
    // Get droppable Ids
    let sourceDroppableId = result.source.droppableId
    let destinationDroppableId = result.destination.droppableId

    // Clone source and destination states
    let newPlaces = cloneDeep(state.places)
    let newDestination = newPlaces[destinationDroppableId]
    let newSource = newPlaces[sourceDroppableId]

    // Remove item from it's source
    const [removed] = newSource.splice(result.source.index, 1)

    // Be aware of droppableId if there the same just add back to source
    if(sourceDroppableId === destinationDroppableId){
        newSource.splice(result.destination.index, 0, removed)
        newPlaces[sourceDroppableId] = newSource
        return ({
            ...state,
            places: newPlaces
        })
    }else{
        newDestination.splice(result.destination.index, 0, removed)
        newPlaces[destinationDroppableId] = newDestination
        newPlaces[sourceDroppableId] = newSource
        return ({
            ...state,
            places: newPlaces
        })
    }
}

const reducer = (state = initial_state, action) => {
    switch(action.type){
        case ORDER_LIST:
            return reorder(state, action.startIndex, action.endIndex, action.listType)
        case MULTI_ORDERED_LISTS:
            return multi_reorder(state, action.result)
        default:
            return state
    }
}

export default reducer