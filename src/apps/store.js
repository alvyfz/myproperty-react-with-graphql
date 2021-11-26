import { configureStore } from "@reduxjs/toolkit";
import listPropertyReducer from "../stores/ListProperty";
import searchReducer from "../stores/Search";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  listProperty: listPropertyReducer,
  search: searchReducer,
  // idLogin: idLoginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
