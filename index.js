import React, { Component } from './react';
import ReactDOM from './react-dom';

function Home () {
    return (
        <div className="active">hello <div> <p>line1</p><p>line2</p></div></div>
    )
}

class House extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>House</div>
    }
}

ReactDOM.render(<House name="home" />, document.querySelector("#root"));
