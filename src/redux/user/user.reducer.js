const INITITAL_STATE = {
    currentUser: null
}
//state is the current state, if no value is passed the initial state will be used
const userReducer = (state = INITITAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state
    }
}

export default userReducer;