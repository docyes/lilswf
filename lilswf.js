/**
 * lil lib to help you detect flash.
 * NOTE: I am not done and production ready yet.
 */
var lilswf = function(){
    var window,
        undefined,
        self = this;
    /**
     * A safe accessor for the native ActiveX GetVariable method.
     * 
     * @param {Object} activeXObj A reference to an ActiveXObject.
     * @param {String} name The variable name for lookup.
     * @type {String}
     * @return The value of the AxtiveX if it is found or an empty string.
     * 
     * 
     * Returns the value of the Flash variable specified by name. Returns null if the variable does not exist. The argument type is string.
     * 
     * @param {Object} activeXObj The flash ActiveX object.
     * @type String
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
     * @param {String} str The ActiveX Object GetVariable($version) return value. 
     * @type Object
     * @return An object literal having the following properties:
     * {String} raw
     * {Number} major 
     * {Number} minor
     * {Number} revision 
     * {String} revisionString
     */
    function parseActiveXVersionVariable(str){
        var parts = str.split(","),
            version = [],
            part;
        for(var i = 0, l = parts.length; i < l; i++){
            part = parts[i];
            version[i] = parseInt(part, 10) || -1;
        }
        return version;
    }
    return self;
}();
