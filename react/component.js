import ReactDOM, {renderComponent} from '../react-dom';
// 简单版
class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {}

        this.setState = this.setState.bind(this)
    }

    setState(stateChange) {
        Object.assign(this.state, stateChange);
        renderComponent(this)
    }
}

export default Component