class Duck {
    constructor() {
        this.flyBehaviour = null
        this.quackBehaviour = null
    }

    setFlyBehaviour(flyBehaviour) {
        this.flyBehaviour = flyBehaviour
    }

    setQuackBehaviour(quackBehaviour) {
        this.quackBehaviour = quackBehaviour
    }

    performQuack(){}
    performFly(){}
}

class MallardDuck extends Duck {
    constructor() {
        super()
    }

    performQuack() {
        this.quackBehaviour.quack()
    }

    performFly() {
        this.flyBehaviour.fly()
    }
}

//Interface
class FlyBehaviour {
    fly(){}
}

class FlyWithWings extends FlyBehaviour{
    fly() {
        console.log('Flying with wings')
    }
}

class QuackBehaviour {
    quack(){}
}

class DuckQuack extends QuackBehaviour {
    quack() {
        console.log('QUACK QUACK..')
    }
}

const duck = new MallardDuck()
duck.setFlyBehaviour(new FlyWithWings())
duck.setQuackBehaviour(new DuckQuack())

duck.performFly()
duck.performQuack()