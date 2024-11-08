import { legacy_createStore as createStore } from "redux";
import appReducers from "./redux/reducer/reducer";


const store = createStore(appReducers);
export default store