const initialState = {
    status: false
}

const globalLoading = (state = initialState, action) => {
    switch (action.type) {
        case 'CONTROL_LOADING':
            
            state= {
                status: action.payload
            }
            return state;      
        default:
            return state;
    }
}
export default globalLoading