(function(){
    var version = -1,
        raw = '',
        numbers = [],
        SIGNIFICANCE = 4;
    // Init
    (function init(){
        if(navigator.plugins && navigator.plugins.length>0){
            var type = 'application/x-shockwave-flash',
                mimeTypes = navigator.mimeTypes;
            if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
                raw = mimeTypes[type].enabledPlugin.description;
            }
        }else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
            // I will be here soon!
        }
        if(raw){
            numbers = numberGroupsFromString(raw);
            version = arrayOfNumbersToInt(numbers, SIGNIFICANCE);
        }
    })();
    // Safe accessor for native ActiveX GetVariable method.
    function activeXObjectGetVariable(activeXObj, name){
        try{
            return activeXObj.GetVariable(name);
        }catch(e){
            return '';
        }
    }
    // Safe constructor for ActiveX object creation.
    function newActiveXObject(name){
        try{
            return new ActiveXObject(name);
        }catch(e){
            return undefined;
        }
    }
    // Get number groups from a string 
    function numberGroupsFromString(str){
        return str.match(/[0-9]+/g);
    }
    // Takes and array of numbers and normalizes it to numerical value based on significant digits.
    function arrayOfNumbersToInt(array, significant, options){
        var sum = 0,
            units = 1,
            options = options || {},
            i = 0,
            l = options.length || array.length;
            for(; i < l; i++){
                sum += array[(l-i-1)] * units;
                units *= Math.pow(10, significant);
            }
        return sum;
    }
    // Takes an arbitrary loose set of arguments and parses them into a normalized number for comparison.
    function argumentsToNumber(){
        var args = Array.prototype.slice.call(arguments),
            csv = args.join(','),
            numberGroups = numberGroupsFromString(csv),
            version = arrayOfNumbersToInt(numberGroups, SIGNIFICANCE);
        return version;
    }
    // Compare to values againts a defined operator. The minimum length of the two values is used without rounding.
    function compare(a, operator, b){
        var minLength = Math.min(a.toString().length, b.toString().length),
            a = parseInt(a.toString().substring(0, minLength), 10),
            b = parseInt(b.toString().substring(0, minLength), 10),
            program = 'return ' + a + ' ' + operator + ' ' + b + ';';
        return Function(program)();
    }
    // Public
    var lilswf = window.lilswf = {
        // Does it exist.
        has: function(){
            return !!(raw);
        },
        // The raw version info.
        raw: function(){
            return raw;
        },
        // The raw version parsed and casted to a set of numbers.
        numbers: function(){
            return numbers;
        },
        // Greater than comparison.
        gt: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(version, '>', number);
        },
        // Greater than or equal comparison.
        gte: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(version, '>=', number);
        },
        // Equal comparison.
        eq: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(version, '==', number);
        },
        // Less than comparison.
        lt: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(version, '<', number);
        },
        // Less than or equal comparison.
        lte: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(version, '<=', number);
        },
        // Enables test mode of private methods.
        enableTest: function(){
            var privates = ['numberGroupsFromString', 'arrayOfNumbersToInt', 'argumentsToNumber', 'compare'];
            for(var i=0; i<privates.length; i++){
                var name = privates[i];
                lilswf[name] = eval(name);
            }
        }
    };
})();
