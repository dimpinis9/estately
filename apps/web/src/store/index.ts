import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer, rootSaga } from "./rootReducer";

// Extend Window type for Redux DevTools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Setup Redux DevTools Extension
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Create store with explicit typing
export const store = createStore(
  rootReducer,
  {} as any, // Initial state
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Run saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
