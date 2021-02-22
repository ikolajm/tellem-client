export default e => {
    let target = e.target
    switch (target.tagName) {
        case ("path"):
            target = target.parentNode.parentNode;
            break;
        case ("svg"):
            target = target.parentNode;
        default:
            target = target;
            break;
    }
    return target;
}