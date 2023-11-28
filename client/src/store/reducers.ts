import { combineReducers } from "redux";
import typeSlice from "./slices/typeSlice";
import brandSlice from "./slices/brandSlice";
import deviceSlice from "./slices/deviceSlice";
import basketSlice from "./slices/basketSlice";
import userSlice from "./slices/userSlice";
import shopSlice from "./slices/shopSlice";

const rootReducer = combineReducers({
    user: userSlice,
    type: typeSlice,
    brand: brandSlice,
    device: deviceSlice,
    basket: basketSlice,
    shop: shopSlice
})

export default rootReducer