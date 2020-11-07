import React from './react';
import ReactDOM from './react-dom';

function Home () {
    return (
        <div className="active">hello <div> <p>line1</p><p>line2</p></div></div>
    )
}

ReactDOM.render(<Home name="home" />, document.querySelector("#root"));
