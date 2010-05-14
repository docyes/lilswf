/**
 * lil lib to help you detect flash.
 * NOTE: I am not done and production ready yet.
 */
var lilswf = function(){
    var self = this;
    var undefined;
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
        var value = "";
        try{
            value = activeXObj.GetVariable(name);
        }catch(e){}
        return value;
    }
    /**
     * A safe accessor for creating a native ActiveX object 
     * 
     * @param {String} name The ActiveX object name lookup.
     * @type Object || undefined
     * @return One of an ActiveX object or undefined.
     */
    function newActiveObject(name){
        var obj = undefined;
        try{
            obj = new ActiveXObject(name);
        }catch(e){}
        return obj;
    }
    /**
     * Parse an ActiveX $version variable into properly casted members:
     * 
     * @param {String} str The ActiveX Object GetVariable($version) return value. 
     * @return An object having raw, major, minor, revision and revisionStr attributes.
     * @type Object
     * @return An object literal having the following properties:
     * {String} raw
     * {Number} major 
     * {Number} minor
     * {Number} revision 
     * {String} revisionString
     */
    function parseActiveXVersionVariable(str){
        var v = str.split(",");
        return {
            raw: str,
            major: parseInt(v[0].split(" ")[1], 10),
            minor: parseInt(v[1], 10),
            revision: parseInt(v[2], 10),
            revisionString: v[2]
        };
    }
    return self;
}();