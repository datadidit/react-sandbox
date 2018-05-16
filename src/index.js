import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {observe} from './read-dnd/Game'
import Board from './read-dnd/Board'
import {Provider} from 'react-redux';
import {Switch, Route, BrowserRouter, Link} from 'react-router-dom';
import store from './redux/configureStore'
import { SimpleVerticalList } from './react-beautiful-dnd'
import MUISimpleVerticalList from './container/MUISimpleVerticalListContainer'
import MUIMultipleVerticalLists from './container/MUIMultipleListContainer'
import DevExpressTableContainer from "./container/DevExpressTableContainer";
import {
    SimpleTableContainer,
    MUITableContainer
} from "./container/SimpleTableExampleContainer";
import MultiGridExample from './react-virtualized/MultiGridExample'
import BasicGridExample from './react-virtualized/BasicGridExample'

// Tutorial Code
const rootEl = document.getElementById('root');

/*observe(knightPosition =>
    ReactDOM.render(
        <Board knightPosition={knightPosition} />,
        rootEl
    )
);*/

class Index extends Component {
    render() {
        return (
            <div>
                <h1>React Drag and Drop Related Examples</h1>
                <ul>
                    <li><Link to="/simpleverticallist">Simple Vertical List Example</Link></li>
                    <li><Link to="/muisimpleverticallist">MUI Simple Vertical List</Link></li>
                    <li><Link to="/multilistexample">Multiple Lists</Link></li>
                    <li><Link to="/simpletableexample">SimpleTableExample</Link></li>
                    <li><Link to="/muitableexample">MUI Table Example</Link></li>
                    <li><Link to="/devexpresstable">Dev Express Draggable Rows</Link></li>
                </ul>
                <h1>React Virtualized Examples</h1>
                <ul>
                    <li><Link to="/basicgridexample">Basic Grid Example</Link></li>
                    <li><Link to="/multigridexample">Multi Grid Example</Link></li>
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/simpleverticallist" component={SimpleVerticalList}/>
                <Route exact path="/muisimpleverticallist" component={MUISimpleVerticalList}/>
                <Route exact path="/multilistexample" component={MUIMultipleVerticalLists}/>
                <Route exact path="/devexpresstable" component={DevExpressTableContainer} />
                <Route exact path="/simpletableexample" component={SimpleTableContainer} />
                <Route exact path="/muitableexample" component={MUITableContainer} />
                <Route exact path="/multigridexample" component={MultiGridExample} />
                <Route exact path="/basicgridexample" component={BasicGridExample} />
                <Route exact path="/" component={Index}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    , rootEl
)