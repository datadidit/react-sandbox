import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {observe} from './LearnReactDnD/Game'
import Board from './LearnReactDnD/Board'

// Tutorial Code
const rootEl = document.getElementById('root');

observe(knightPosition =>
    ReactDOM.render(
        <Board knightPosition={knightPosition} />,
        rootEl
    )
);