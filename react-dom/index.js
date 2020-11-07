
function render(vnode, container) {
    console.log('===render===')
    console.log(vnode)

    if(vnode === undefined) return;

    if(typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode)
        return container.appendChild(textNode)
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

    return container.appendChild(dom)

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