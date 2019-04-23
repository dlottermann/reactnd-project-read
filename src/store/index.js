import { createStore, applyMiddleware } from "redux";
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, applyMiddleware(middleware));
window.store = store;
export default store;