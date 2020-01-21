const initialState = {
    lat: 0,
    lng: 0,
    updateNeeded: false
}

const cordReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CORD":
            return {...action.payload};
        case "FORCE_MAP_UPDATE_ENFORCED":
            return { ...state, updateNeeded: false};
            default:
                return state;
    }
};

export default cordReducer;