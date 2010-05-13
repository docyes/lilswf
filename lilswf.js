var lilswf = function(){
    var self = this,
        /**
         * Object literal syntax for expressing activeX detection.
         * {String} n
         * {Function} v A function to call to validate the activeX object check against.
         */
        axRules = [
           {
              "n":"ShockwaveFlash.ShockwaveFlash.7",
              "v":function(obj){
                  return axV(obj);
              }
           },
           {
              "n":"ShockwaveFlash.ShockwaveFlash.6",
              "v":function(obj){
              var version = "6,0,21";
              try{
                  obj.AllowScriptAccess = "always";
                      version = axV(obj);
                  }catch(err){}
                  return version;
              }
           },
           {
              "n":"ShockwaveFlash.ShockwaveFlash",
              "v":function(obj){
                  return axV(obj);
              }
           }
        ];
        self.v = genV();
    function genV(){
        return (navigator.appVersion.indexOf("Mac")==-1 && window.execScript)?axRulesParser():{installed: false, raw:"", major:-1, minor:-1, revision:-1, revisionStr:""}
    }
    /**
     * TBD.
     */
    function axRulesParser(){
        var info = {installed: false, raw:"", major:-1, minor:-1, revision:-1, revisionStr:""};
        if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
            var version = -1;
            for(var i=0; i<axRules.length && version==-1; i++){
                var axRule = axRules[i];
                var obj = axObj(axRule.name);
                if(!obj.activeXError){
                    info.installed = true;
                    version = axRule.version(obj);
                    if(version!=-1){
                        var v = axParser(version);
                        info.raw = v.raw;
                        info.major = v.major;
                        info.minor = v.minor;
                        info.revision = v.revision;
                        info.revisionStr = v.revisionStr;
                    }
                }
            }
        }
        return info;
    }
    /**
     * Gracefully extract the ActiveX version of the plugin.
     * 
     * @param {Object} activeXObj The flash ActiveX object.
     * @type String
     */
    function axV(axObj){
        var v = -1;
        try{
            v = axObj.GetVariable("$version");
        }catch(err){}
        return v;
    }
    /**
     * Try and retrieve an ActiveX object having a specified name.
     * 
     * @param {String} name The ActiveX object name lookup.
     * @return One of ActiveX object or a simple object having an attribute of activeXError with a value of true.
     * @type Object
     */
    function axObj(name){
        var obj = -1;
        try{
            obj = new ActiveXObject(name);
        }catch(err){
            obj = {activeXError:true};
        }
        return obj;
    }
    /**
     * Parse an ActiveX $version string into an object.
     * 
     * @param {String} str The ActiveX Object GetVariable($version) return value. 
     * @return An object having raw, major, minor, revision and revisionStr attributes.
     * @type Object
     */
    function axVParser(str){
        var v = str.split(",");
        return {
            "raw":str,
            "major":parseInt(v[0].split(" ")[1], 10),
            "minor":parseInt(v[1], 10),
            "revision":parseInt(v[2], 10),
            "revisionStr":v[2]
        };
    }
    return self;
}();