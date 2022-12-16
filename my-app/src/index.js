import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

export let rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App appState={state}
                     dispatch={store.dispatch.bind(store)}/>
            </BrowserRouter>
        </React.StrictMode>
    );
}

rerenderEntireTree(store.getState());

store.subscribe( () => {
    let state = store.getState();
    rerenderEntireTree(state);
});