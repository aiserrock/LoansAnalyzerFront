import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import rootReducer from './Store/rootReducer'


const store = createStore(rootReducer, applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
