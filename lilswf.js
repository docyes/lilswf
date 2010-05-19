/**
 * lil lib to help you detect flash.
 * NOTE: I am not production ready yet.
 */
var lilswf = function(){
    var window,
        undefined,
        self = this;
        self.raw = "",
        self.version = [],
        self.installed = self.isCool = false;
    /**
     * A safe accessor for the native ActiveX GetVariable method.
     * 
     * @param {Object} activeXObj A reference to an ActiveXObject.
     * @param {String} name The variable name for lookup.
     * @type {String}
     * @return The value of the AxtiveX if it is found or an empty string.
     */       
    function activeXObjectGetVariable(activeXObj, name){
        try{
            return activeXObj.GetVariable(name);
        }catch(e){
            return "";
        }
    }
    /**
     * A safe accessor for creating a native ActiveX object 
     * 
     * @param {String} name The ActiveX object name lookup.
     * @type Object || undefined
     * @return One of an ActiveX object or undefined.
     */    
    function newActiveObject(name){
        try{
            return new ActiveXObject(name);
        }catch(e){
            return undefined;
        }
    }
    /**
     * TBD.
     * 
     * @return
     */
    function argumentsToNumberArray(){
        return stringNumbersToArrayNumbers(Array.apply(null, arguments).join(""));
    }
    /**
     * TBD.
     * 
     * @return
     */
    function stringNumbersToArrayNumbers(str){
        var parts = str.match(/[0-9]+/g),
        i = 0,
        l = parts.length;
        for(; i < l; i++){
            parts[i] = parseInt(parts[i], 10);
        }
        return parts;        
    }
    /**
     * TBD.
     * 
     * @type Boolean
     * @return TBD.
     */
    function compare(arrayA, operator, arrayB){
        var sumA = sumB = 0,
            units = 1,
            i = 0,
            l = Math.min(arrayA.length, arrayB.length);
        for(; i < l; i++){
            sumA += arrayA[(l-i-1)] * units;
            sumB += arrayB[(l-i-1)] * units;
            units *= 10;
        }
        switch(operator){
            case "<":
                return sumA < sumB;
            case "<=":
                return sumA <= sumB;
            case ">":
                return sumA > sumB;
            case ">=":
                return sumA >= sumB;
            case "==":
                return sumA == sumB;
            default:
                throw new Error("Invalid comparison operator.");
        }
    }
    self.eq = function(){
        return compare(argumentsToNumberArray(arguments), "==", self.version);
    };
    self.gt = function(){
        return compare(argumentsToNumberArray(arguments), ">", self.version);
    };
    self.gte = function(){
        return compare(argumentsToNumberArray(arguments), ">=", self.version);
    };
    self.lt = function(){
        return compare(argumentsToNumberArray(arguments), "<", self.version);
    };
    self.lte = function(){
        return compare(argumentsToNumberArray(arguments), "<=", self.version);
    };
    return self;
}();
