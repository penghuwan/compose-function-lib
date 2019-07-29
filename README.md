# Compose Function
compose是对处理函数集 functions 组合后的复合函数的统称，下面展示了三种compose函数

+ compose: 复合同步函数
+ composeAsync: 复合异步函数
+ onionCompose: 以类型Koa的洋葱圈的方式进行复合

# Example

## compose
```
function log1() {
  console.log("log1");
  return "log1"
}
function log2(str) {
  str += " log2";
  console.log(str);
  return str;
}
function log3(str) {
  str += " log3"
  console.log(str);
}

const composedFn = compose(log1, log2, log3);
composedFn();
```
输出
```
log1
log1 log2
log1 log2 log3
```
## composeAsync
```
async function log1() {
  console.log("log1");
  return "log1"
}
async function log2(str) {
  str += " log2";
  console.log(str);
  return str;
}
async function log3(str) {
  str += " log3"
  console.log(str);
}

const composedFn = composeAsync(log1, log2, log3);
composedFn();
```
输出
```
log1
log1 log2
log1 log2 log3
```

## onionCompose
```
async function log1(next) {
  console.log("log1 enter");
  await next();
  console.log("log1 out");
}
async function log2(next) {
  console.log("log2 enter");
  await next();
  console.log("log2 out");
}
async function log3(next) {
  console.log("log3 enter");
  await next();
  console.log("log3 out");
}

let onionFn = onionCompose(log1, log2, log3);
onionFn();
```
输出
```
log1 enter
log2 enter
log3 enter
log3 out
log2 out
log1 out
```