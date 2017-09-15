//Beverage abstract class
//CondimentBeverage abstract class extends Beverage class
//A Concrete Beverage class extends Beverage Class
//A Concrete CondimentBeverage class extends CondimentBeverage class and contains instance of Beverage item

class Beverage {
    constructor() {
        this.description = 'Empty'
    }

    getDescription() {
        return this.description
    }

    cost(){}
}

class HouseBlend extends Beverage {
    constructor() {
        super()
        this.description = 'House Blend'
    }
    cost() {
        return 20.0
    }
}

class CondimentBeverageDecorator {
    getDescription(){}
}

class Soy extends CondimentBeverageDecorator {
    constructor(beverage) {
        super()
        this.beverage = beverage
    }

    getDescription() {
        return this.beverage.getDescription() + ', Soy'
    }

    cost() {
        return this.beverage.cost() + 5.0
    }
}

class Mocha extends CondimentBeverageDecorator {
    constructor(beverage) {
        super()
        this.beverage = beverage
    }

    getDescription() {
        return this.beverage.getDescription() + ', Mocha'
    }

    cost() {
        return this.beverage.cost() + 6.0
    }
}

let houseBlend = new HouseBlend()
houseBlend = new Mocha(houseBlend)
houseBlend = new Soy(houseBlend)
console.log(houseBlend.cost())