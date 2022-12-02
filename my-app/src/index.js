import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

let posts = [
        {
            id: 1,
            message: "Hi, how are you?",
            countLikes: 12
        },
        {
            id: 2,
            message: "It is my post",
            countLikes: 7
        }
    ];

let dialogs = [
    {
        id: "1",
        name: "Doe"
    },
    {
        id: "2",
        name: "Smith"
    },
    {
        id: "3",
        name: "Jones"
    }
];

let messages = [
    {
        id: "1",
        message: "Hi, i am chicha"
    },
    {
        id: "2",
        message: "Second massage"
    },
    {
        id: "3",
        message: "npx cfcr Message"
    }
];

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App dataPost={posts} dataPerson={dialogs} dataMessage={messages}/>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
