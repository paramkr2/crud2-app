import {createStore , combineReducers, applyMiddleware, compose} from 'redux'

import userActions from './actions/userActions' 
import userReducers from './reducers/userReducers'
import listReducers from './reducers/listReducers'
import uiReducers from './reducers/uiReducers'
import thunk from 'redux-thunk'

let initialState = {};

const middleware = [thunk]


// this will use the default switch case 
const reducers = combineReducers({
    user: userReducers,
    list: listReducers,
    ui:uiReducers,
})

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
// the above commented line is needed if you have developer tools installed , it is usefull for that stuff

export default store;