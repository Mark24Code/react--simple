import React, { Component } from './react';
import ReactDOM from './react-dom';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            isDisplay: true,
        }

        this.handleClick  = this.handleClick.bind(this);
        this.displayToggle = this.displayToggle.bind(this);
    }

    componentWillMount() {
        console.log("组件将要加载")
    }
    
    componentDidMount() {
         console.log('组件加载完成')
    }

    componentWillReceiveProps(props) {
        console.log('组件将要接收props:',props)
    }

    componentWillUpdate() {
        console.log("组件将要更新")
    }

    componentDidUpdate() {
        console.log('组件更新完成')
    }

    componentWillUnmount() {
       console.log("组件即将卸载") 
    }

    handleClick () {
        this.setState({
            num: this.state.num + 1
            // num: undefined
        })
    }
    
    displayToggle () {
        this.setState({
            isDisplay: !this.state.isDisplay
        })
    }
 
    render() {
        return <div>
            Hello React: <span>{this.state.num}</span> 
            <button onClick={this.handleClick}>change</button>
        </div>
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
