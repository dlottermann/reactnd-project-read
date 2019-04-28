import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";


const store = createStore(reducer, middleware);
window.store = store;
export default store;