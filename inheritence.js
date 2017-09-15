//SuperClass
//Constructor with name Person
function Person(name) {
    this.name = name
}

//Prototype method
Person.prototype.getName = function() {
    return this.name
}

//SubClass
function Author(name, books) {
    Person.call(this, name) //Calling super class constructor in the current scope
    this.books = books //Adding attribute to author
}

//Setting up prototype chain
//Gets the attributes of the person, name and getName method
Author.prototype = new Person()

//Setting correct constructor for the Author, else it will call superclass constructor - Person
Author.prototype.constructor = Author

Author.prototype.getBooks = function() {
    return this.books
}

function extend(subClass, superClass) {
    function f(){}
    f.prototype = superClass.prototype
    subClass.prototype = new f()
    subClass.prototype.constructor = subClass

    subClass.superClass = superClass.prototype
    if (superClass.prototype.constructor === Object.prototype.constructor) {
        superClass.prototype.constructor = superClass
    }
}

function Writer(name, books) {
    Writer.superClass.constructor.call(this, name)
    this.books = books || []
}

Writer.prototype.getBooks = function() {
    return this.books
}

extend(Writer, Person)

//Override supercalss method
Writer.prototype.getName = function() {
    const name = Writer.superClass.getName.call()
    return 'Writer name is ' + name
}

console.log(new Writer('Williams').getName())