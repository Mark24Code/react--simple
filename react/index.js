function createElement(tag, props, ...childrens) {
    // Babel会把JSX翻译成 React.createElement，关注 .babelrc 的配置，定义了翻译头
    // 这也就是为什么出现了JSX的全局里面比如显式引入React
    // 本次的代码里，假设JSX经过Babel翻译完了，这才是真正的源码，而React.createElement使用的是这个
    // 这个就是 把收到的对象再一次的封装成一个对象
    return {
        tag,
        props,
        childrens
    }
}

export default {
    createElement,
}