import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

const loggerMiddleware = createLogger();

const middleware = applyMiddleware(
    loggerMiddleware
)

const store = createStore(reducer, composeWithDevTools(middleware))

export default store