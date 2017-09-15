function boo() {
    let a = 10
    function bar() {
        return a *= 2
    }
    bar()
    return a
}

console.log(boo())
console.log(boo())


// console.log(baz())
// console.log(baz())
// console.log(baz())
