const MyNameSpace = {}
MyNameSpace.Singleton = (function () {
    let _singletonInstance
    function constructor() {
        
        return {
            //public methods
            add: function(num1, num2) {return num1 + num2}
        }
    }

    return {
        getInstance: function() {
            if (!_singletonInstance) {
                _singletonInstance = constructor()
            }

            return _singletonInstance
        }
    }
})()

console.log(MyNameSpace.Singleton.getInstance().add(2,5))