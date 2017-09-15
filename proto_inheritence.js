function clone(object) {
    function F() {}
    F.prototype = object    
    return new F()
}

const Person = {
    name: 'default name',
    getName: function() {
        return this.name
    }
}

const Reader = clone(Person)
console.log(Reader.getName())
Reader.name = 'JOHN SMITH'
console.log(Reader.getName())

const Author = clone(Person)
Author.books = []
Author.getBooks = function() {
    return this.books
}

