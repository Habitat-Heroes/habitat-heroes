import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './reducers/rootReducer';

const persistConfig = {
  key: 'habitat-heroes',
  storage,
};

// To support the persisting of redux across sessions
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creation of redux store
const store = configureStore({
  reducer: persistedReducer,
  // Creation of custom middleware, needed for redux persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

const hasPurged = localStorage.getItem('purged');
if (!hasPurged) {
  persistor.purge();
  localStorage.setItem('purged', true);
}

export default store;
