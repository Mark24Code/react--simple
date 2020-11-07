import Component from '../react/component'


function renderComponent(comp) {
    // 统一成类组件后，调用render就返回 virtual dom
    const renderer = comp.render()
    
    // render是返回的virtual dom
    // 这里是递归调用，返回一个所有子组建的virtua dom挂载在 base属性上
    comp.base = _render(renderer) // jsx对象
}


function setComponentProps(comp,props) {
    // comp 统一是类组建了
    // 设置组件属性
    comp.props = props;

    renderComponent(comp)
}

function createComponent(comp, props) {
    // comp 其实是tag
    // tag 在JSX翻译的 React.createElement(tag)
    // tag 指向的是 'div'或者  函数组件 function，或者class组建的class
    // 而tag如果运行或者调用render，就会返回我们想要的 vdom
    
    // 这个函数，如果是类组件会返回实例
    // 如果是函数组件，会构造出类组件，返回实例

    let instance;

    if(comp.prototype && comp.prototype.render) {
        // 如果是类的传进来的组件，用这两个属性确认是类组件
        // 类组件，这里comp就是tag，tag指向的是代码里面，组件的那个类
        // 如果传进来的是一个类，只要new就可以获得 返回实例了
        instance = new comp(props)

    } else {
        // 这里就是函数的组件
        // 函数组件，这里 comp就是tag，tag指向书写的函数组件的函数
        // 这里计划把函数组件转成类组件，方便后面统一管理
        // 这里就出去，额外的去构建类
        instance = new Component(props);
        instance.constructor = comp;
        // 定义render函数
        instance.render = function() {
            // 如果调用render相当于，这里就是执行了comp函数
            // 执行了函数，就返回了JSX
            return this.constructor(props)
        }
    }

    return instance;
}


function _render(vnode) {
    // 作用：
    // 对React的JSX对象——virtualdom 对象进行分类处理
    // 根据类型特点，生成具体的DOM节点
    // 并且生成DOM节点插入容器中，真实的渲染过程

    if(vnode === undefined || vnode === null || typeof vnode === 'boolean') {
        // 更完善的补充，空和布尔值
        return ''
    };

    if(typeof vnode === 'string') {
        // 字符串的节点
        return document.createTextNode(vnode)
    }

    if(typeof vnode.tag === 'function') {
        // 函数式组件
        
        // # 说明为啥tag 是funtion是函数组件
        // # 如果源代码如下
        // const Home = () => {
        //     return <div>hello</div>
        // }
        // const test = <Home />
        // # 经过babel翻译JSX之后会变成
        // "use strict";

        // const Home = () => {
        //     return /*#__PURE__*/React.createElement("div", null, "hello");
        // };

        // const test = /*#__PURE__*/React.createElement(Home, null);
        // # 这里 test的第一个参数 tag指向的是 Home函数
    
        // 1创建组件
        // 返回的是一个 统一的类的实例
        const comp = createComponent(vnode.tag, vnode, props);
        // 2设置组件属性
        setComponentProps(comp,vnode.props)
        // 3组件渲染的节点对象返回
        // 这里是故意的保存在base里,这是一个设计
        return comp.base; // 节点，内部是一个递归操作
    }

    const { tag, props, childrens } = vnode;
    const dom = document.createElement(tag);
    if(props) {
        Object.keys(props).forEach(key => {
            const value = props[key];
            setAttribute(dom,key,value)
        })
    }

    childrens.forEach(child => render(child,dom))

    return dom
}

function render(vnode, container) {
    // render负责插入具体 dom_node，这是关键的展示html步骤
    // 分成render、_render是为了解耦，
    // _render负责生成 dom_node。生存和插入分开
    return container.appendChild(_render(vnode))
}

 
function setAttribute (dom, key, value) {
    // 高度自定义的DSL，在设置属性的时候要根据情况来赋值
    // 这部分，JSX的虚拟DOM一些特殊的属性，会在这里转化为 DOM的具体属性



    // 属性改写
    if(key==='className') {
        key = 'class'
    }

    if(/on\w+/.test(key)) {
        // 事件
        key = key.toLowerCase();
        dom[key] = value || '';
    } else if(key === 'style') {
        // 样式
        if(!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if( value && typeof value === 'object') {
            // style对象 {width: 20}
            for(let k in value) {
                // 可以是数值、字符串
                if(typeof value[k] === 'number') {
                    dom.style[k] = value[k] + 'px';
                } else {
                    dom.style[k] = value[k];
                }
            }
        }
    } else {
        // 如果存在可以直接赋值
        if(key in dom ) {
            dom[key] = value || '';
        }

        // 如果不在设置或者删除
        if(value) {
            // 更新值
            dom.setAttribute(key,value);
        } else {
            dom.removeAttribute(key);
        }
    }

}
export default  {
    render
}