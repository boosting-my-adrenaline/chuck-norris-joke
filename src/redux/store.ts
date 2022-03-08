import { reducer } from './reducer'
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const sagaMiddleware = createSagaMiddleware()

// const middlewares = [thunk, sagaMiddleware]
// const middlewareEnhancer = applyMiddleware(...middlewares)

// const middlewareEnhancer = applyMiddleware(sagaMiddleware)
// const composedEnhancers = compose(middlewareEnhancer)

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }
