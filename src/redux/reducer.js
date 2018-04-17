import { ORDER_LIST } from "./constants";
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
    ]
}

export const reorder = (state, startIndex, endIndex) => {
    let newPeople = cloneDeep(state.people)

    const [removed] = newPeople.splice(startIndex, 1)
    newPeople.splice(endIndex, 0, removed)

    //console.log("Latest newPeople ")
    //console.log(newPeople)
    return ({
        ...state,
        people: newPeople
    })
}

const reducer = (state = initial_state, action) => {
    switch(action.type){
        case ORDER_LIST:
            return reorder(state, action.startIndex, action.endIndex)
        default:
            return state
    }
}

export default reducer