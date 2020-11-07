import Component from '../react/component'


function render(vnode, container) {
       return container.appendChild(_render(vnode))
}

function renderComponent(comp) {
    // 统一成类组件后，调用render就返回JSX
    const renderer = comp.render()
    // _render 这里就是直接渲染
    comp.base = _render(renderer) // jsx对象
}

function setComponentProps(comp,props) {
    // comp 统一是类组建了
    // 设置组件
    comp.props = props;

    renderComponent(comp)
}

function createComponent(comp, props) {
    //comp 传进来的是函数、类 的组件

    let instance;

    if(comp.prototype && comp.prototype.render) {
        // 如果是类的传进来的组件，用这两个属性确认是类
        // comp是一个类
        // 如果传进来的是一个类，只要new就可以获得组件了
        
        instance = new comp(props)
    } else {
        // 这里就是函数的组件
        // 这里计划把函数组件转成类组件，方便后面统一管理
        // comp是一个函数
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
    console.log('===render===')
    console.log(vnode)

    if(vnode === undefined || vnode === null || typeof vnode === 'boolean') {
        return ''
    };

    if(typeof vnode === 'string') {
        // 字符串组件
        return document.createTextNode(vnode)
    }


    if(typeof vnode.tag === 'function') {
        console.log('in func')
        // 如果是函数式组件
        // 1创建组件
        const comp = createComponent(vnode.tag, vnode, props);
        console.log(comp)
        // 2设置组件属性
        setComponentProps(comp,vnode.props)
        // 3组件渲染的节点对象返回
        // 这里是故意的保存在base里
        console.log(comp)
        return comp.base;
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