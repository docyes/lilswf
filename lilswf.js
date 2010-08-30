(function(){
    var version = -1,
        raw = '',
        numerics = [],
        SIGNIFICANCE = 4;
    // Init
    function init(){
        //Do something
    }
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
    // Casts and arguments object to an array.
    function argumentsToArray(){
        return Array.prototype.slice.call(arguments);
    }
    // Convert an array of values to a comma delimited string.
    function arrayToCSV(array){
        return array.join(',');
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
        var args = argumentsToArray.apply(null, arguments),
            csv = arrayToCSV(args),
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
            return true;
        },
        // The raw version info.
        raw: function(){
            return raw;
        },
        // The raw version parsed and casted to a set of numbers.
        numerics: function(){
            return numerics;
        },
        // Greater than comparison.
        gt: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(number, '>', version);
        },
        // Greater than or equal comparison.
        gte: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(number, '>=', version);
        },
        // Equal comparison.
        eq: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(number, '==', version);
        },
        // Less than comparison.
        lt: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(number, '<', version);
        },
        // Less than or equal comparison.
        lte: function(){
            var number = argumentsToNumber.apply(null, arguments);
            return compare(number, '<=', version);
        }
    };
})();
