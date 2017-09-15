//Elements:
//Weather Data implements Subject interface
//Statistics Display Device implements Observer interface and Display Element Interface
//Current Display Device implements Observer interface and Display Element Interface

const Interface = require('./interface')

//Subject Interface
const Subject = new Interface('Subject', ['notifyObserver', 'registerObserver', 'removeObserver', 'setState'])
//Observer Interface
const Observer = new Interface('Observer', ['update'])
//Display Element Interface
const DisplayElement = new Interface('DisplayElement', ['display'])

class WeatherData {
    constructor() {
        this.observerList = []
        Interface.ensureImplements(this, Subject)
    }

    notifyObserver() {
        const totalObserver = this.observerList.length
        for(let i=0; i<totalObserver; i++) {
            this.observerList[i].update({
                temprature: this.temprature, 
                humidity: this.humidity,
                percipitation: this.percipitation 
            })
        }
    }

    registerObserver(observer) {
        this.observerList.push(observer)
    }

    removeObserver(observer) {
        const observerIndex = this.observerList.findIndex((element, index, arr) => {
                return true
            })
        this.observerList.splice(observerIndex, 1)
    }

    setState({humidity, temprature, percipitation}) {
        this.humidity = humidity
        this.temprature = temprature
        this.percipitation = percipitation
    }
}

class StatisticsDisplay {
    constructor(weatherData) {
        Interface.ensureImplements(this, Observer, DisplayElement)
        weatherData.registerObserver(this)
    }
    
    update({temprature, humidity, percipitation}) {
        this.temprature = temprature
        this.humidity = humidity
        this.percipitation = percipitation
    }

    display() {
        console.log(`Temprature is ${this.temprature} degree celcius`)
    }
}

const weatherData = new WeatherData()
const statsDisplay = new StatisticsDisplay(weatherData)
weatherData.setState({
    temprature: 22.3,
    humidity: 22,
    percipitation: 43
})
weatherData.notifyObserver()
statsDisplay.display()

weatherData.setState({
    temprature: 25.3,
    humidity: 22,
    percipitation: 43
})
weatherData.notifyObserver()
statsDisplay.display()

weatherData.removeObserver(statsDisplay)

weatherData.setState({
    temprature: 25,
    humidity: 22,
    percipitation: 43
})
weatherData.notifyObserver()
statsDisplay.display()