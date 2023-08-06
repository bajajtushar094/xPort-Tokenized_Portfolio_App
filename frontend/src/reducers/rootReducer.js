import jwt_decode from 'jwt-decode';

// const initState = {
//     isAuthenticated:  localStorage.getItem('authTokens')?(JSON.parse(localStorage.getItem('authTokens'))):false,
//     user: localStorage.getItem('authTokens')?jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access):null,
//     datasetDescription: {},
//     features: []
// }

const initState = {
    isAuthenticated: false,
    user: null,
    datasetDescription: {},
    features: []
}

const rootReducer = (state=initState, action) => {
    if(action.type==='LOGIN_USER') {
        return {
            ...state,
            isAuthenticated:true,
            user: action.user,
        }
    }
}

export default rootReducer;