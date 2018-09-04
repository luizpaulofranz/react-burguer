import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// we need these other imports to add middlewares on our redux flow
// compose allows us to combine multiple middlewares to pass into store
// we must compose this becouse store receives only one object
// the same with combineReducers
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// we must pass only one reducer, so we need to combine them.
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/orders';
const rootReducer = combineReducers({
    // burguerBuilder is the slice of state which this reducer handles
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});

// to debug purposes we apply this middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creating our redux global state object
const store = createStore(
    rootReducer // we have to pass only one reducer
    // the second argument is just on object, tha's why we need to compose them
    ,composeEnhancers(
        applyMiddleware(thunk)
    )
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
