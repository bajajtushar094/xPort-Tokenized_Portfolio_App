export const LOCAL_SERVER_URL = `http://localhost:5000`;
export const LOCAL_SERVER_URL_MAIN = `http://localhost:5000`; 
export const LOCAL_SERVER_URL_IP = `http://127.0.0.1:5000`;

export const config = ()=>{
    const confs = {
        'local':{
            'mobile':'6900616159',
            'password': 'password',
            'register':`${LOCAL_SERVER_URL}/auth/register/`,
            'login':`${LOCAL_SERVER_URL}/auth/login`,
            'getAllPortfolio':`${LOCAL_SERVER_URL}/portfolio`,
            'addPortfolio':`${LOCAL_SERVER_URL}/portfolio/addPortfolio`,
            'additionalUserInfo':`${LOCAL_SERVER_URL}/auth/additionalUserInfo`,
            'getStockData':`${LOCAL_SERVER_URL}/stockData`,
            "getChartValues":`${LOCAL_SERVER_URL}/stockData/getChartValues`,
            'getTickers':`${LOCAL_SERVER_URL}/stockData/getTickers`
        }
    }

    return confs['local'];
}