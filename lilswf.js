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
     * Parse an ActiveX $version variable into properly casted members:
     * 
     * @param {String} raw The ActiveX Object GetVariable($version) string return value. 
     * @type Array
     * @return An array of integers casted from the original raw version string. Values that can't be casted are returned as a -1 value.
     */    
    function parseActiveXVersionVariable(raw){
        var parts = raw.match(/[0-9]+/g),
            i = 0,
            l = parts.length;
        for(; i < l; i++){
            parts[i] = parts[i], 10);
        }
        return parts;
    }
    /**
     * TBD.
     * 
     * @params arguments
     * @type Boolean
     */    
    self.atLeast = function(){
        return false;
    };
    return self;
}();
