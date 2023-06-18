import {createStore,combineReducers} from 'redux'
import user from './user'


// const store1=createStore(combineReducers({user}))
const store1=createStore(user)
window.store=store1

export default store1