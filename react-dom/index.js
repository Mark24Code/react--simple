
function render(vnode, container) {
    console.log('===render===')
    console.log(vnode)

    if(vnode === undefined) return;

    if(typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode)
        return container.appendChild(textNode)
    }
}
 
export default  {
    render
}