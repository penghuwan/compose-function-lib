/**
 * 同步串行化compose
 */
function compose(...args) {
    return () => {
        args.reduce((composed, f) => f(composed), null);
    }
}

/**
 * 异步串行化compose
 */
function composeAsync(...args) {
    return () => {
        args.reduce(async (composed, f) => {
            const value = await composed;
            return f(value);
        }, {})
    }
}

/* Koa的洋葱圈模型的compose
 */
function onionCompose(...args) {
    return args.reduceRight((composed, fn) => {
        return () => fn(composed);
    }, () => { })
}

module.exports = {
    compose,
    composeAsync,
    onionCompose
}