const initialState = {
    lat: 0,
    lng: 0,
    updateNeeded: false
}

const cordReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CORD":
            return {...action.payload};
            default:
                return state;
    }
    
}

export default cordReducer;