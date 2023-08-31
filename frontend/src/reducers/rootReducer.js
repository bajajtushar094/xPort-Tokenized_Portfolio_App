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
    portfolioInsight: {},
    tickers: {}
}

const rootReducer = (state=initState, action) => {
    if(action.type==='LOGIN_USER') {
        return {
            ...state,
            isAuthenticated:true,
            user: action.user,
        }
    }

    if(action.type==='PORTFOLIO_INSIGHTS'){
        return {
            ...state,
            portfolioInsight: action.portfolioInsight
        }
    }

    if(action.type==="TICKERS"){
        return {
            ...state,
            tickers: action.tickers
        }
    }
}

export default rootReducer;