/*All possible stataes State:
//1. SoldOut State
//2. Sold State
//3.No Quarter State
//4. Has Quarter State
*/

const Interface = require('./interface');
const StateInterface = new Interface('State', ['ejectQuarter', 'turnCrank', 'insertQuarter', 'dispense']);

class SoldOutState {
    constructor(gumballMachine) {
        Interface.ensureImplements(this, StateInterface);
        this.gumballMachine = gumballMachine;
    }

    ejectQuarter() {
        console.log('No quarter present');
    }

    turnCrank() {
        console.log('Invalid operation, No gumball present');
    }

    insertQuarter() {
        console.log('Sorry, no gumball presnet now');
    }

    dispense() {
        console.log('Can not dispense, no gumball present');
    }
}

class SoldState {
    constructor(gumballMachine) {
        Interface.ensureImplements(this, StateInterface);
        this.gumballMachine = gumballMachine;
    }

    ejectQuarter() {
        console.log('Can not eject now, you already turned the crank')
    }

    turnCrank() {
        console.log('You turned already');
    }

    insertQuarter() {
        console.log('Already one operation in progress...please wait');
    }

    dispense() {
        console.log('A gumball coming your way, enjoy maadi');
        this.gumballMachine.releaseBall();
        if (this.gumballMachine.getCurrentBallCount() > 0) {
            this.gumballMachine.setState(this.gumballMachine.getNoQuarterState())
        } else {
            this.gumballMachine.setState(this.gumballMachine.getSoldOutState())
        }
    }
}

class NoQuarterState {
    constructor(gumballMachine) {
        Interface.ensureImplements(this, StateInterface);
        this.gumballMachine = gumballMachine;
    }

    ejectQuarter() {
        console.log('No quarter available');
    }

    turnCrank() {
        console.log('You got to insert the quarter first');
    }

    insertQuarter() {
        this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
    }

    dispense() {
        console.log('Invalid Operation, no qurter present');
    }
}

class HasQuarterState {
    constructor(gumballMachine) {
        Interface.ensureImplements(this, StateInterface);
        this.gumballMachine = gumballMachine;
    }

    ejectQuarter() {
        console.log('Ejecting quarter');
        this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    }

    turnCrank() {
        console.log('You have turned the quarter, processing...');
        this.gumballMachine.setState(this.gumballMachine.getSoldState());
    }

    insertQuarter() {
        console.log('Already a quarter is present, can not insert another one');
    }

    dispense() {
        console.log('Wait for the processing to be over');
    }
}

class GumballMachine {
    constructor(gumBallCount) {
        this.gumBallCount = gumBallCount;
        this.hasQuarterState = new HasQuarterState(this);
        this.noQuarterState = new NoQuarterState(this);
        this.soldOutState = new SoldOutState(this);
        this.soldState = new SoldState(this);
        //Machine is empty in the beginning
        this.state = this.noQuarterState;
    }

    setState(state) {
        this.state = state;
    }

    insertQuarter() {
        this.state.insertQuarter();
    }

    ejectQuarter() {
        this.state.ejectQuarter();
    }

    turnCrank() {
        this.state.turnCrank();
    }

    releaseBall() {
        console.log('A gumbell comes out rolling');
        if (this.count > 0) {
            this.count -= 1;
        }
    }

    getCurrentBallCount() {
        return this.count;
    }

    getNoQuarterState() {
        return this.noQuarterState;
    }

    getHasQuarterState() {
        return this.hasQuarterState;
    }

    getSoldOutState() {
        return this.soldOutState;
    }

    getSoldState() {
        return this.soldState;
    }
}

let gumballMachine = new GumballMachine(20);
gumballMachine.insertQuarter()

gumballMachine.turnCrank()
gumballMachine.ejectQuarter()
gumballMachine.releaseBall()