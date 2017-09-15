class Interface {
    constructor(name, methods) {
        if (arguments.length < 2) {
            throw new Error('An Interface expects atleast 2 arguments ' + arguments.length
                + ' arguments passed')
            
        }
        this.name = name
        this.methods = []
        methods.forEach(method => {
            if (typeof method !== 'string') {
                throw new Error('Interface expects all the method names to be passed as as a string ' +
                    method + ' is a ' + typeof method)
            }
            this.methods.push(method)
        }, this)
    }

    static ensureImplements(object) {
        if(arguments.length < 2) {
            throw new Error("Function Interface.ensureImplements called with " +
                arguments.length + "arguments, but expected at least 2.")
        }

        for (let i = 1, len=arguments.length; i < len; i++) {
            const interf = arguments[i]
            if(interf.constructor !== Interface) {
                throw new Error('Function expects arguments two or above to be instaces of Interface' )
            }

            for(let j = 0, methodsLen = interf.methods.length; j < methodsLen; j++) {
                const method = interf.methods[j]
                if(!object[method] || !typeof object[method] === 'function') {
                    throw new Error('Does not implement the interface ' + interf.name + ' Interface Method '
                    + method + ' not found')
                }
            }
        }
    }
}

const DynamicMap = new Interface('DynamicMap', ['centerOnPoint', 'zoom', 'draw'])

class Map {
    constructor() {
        try {

            Interface.ensureImplements(this, DynamicMap)
        } catch (err) {
            console.log(err)
        }
    }
    centerOnPoint() {
        console.log('Moving to center')
    }
    zoom(){

    }

    draw() {
        console.log('Drawing map')
    }
}

const mapInstance = new Map()

module.exports = Interface