import React from './react';
import ReactDOM from './react-dom';

const demo = () => (
    <div className="active" title="123">Hello</div>
)

ReactDOM.render('demo', document.querySelector("#root"));
