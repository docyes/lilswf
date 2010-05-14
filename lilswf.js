var lilswf = function(){
    var window,
        undefined,
        self = this;
        self.raw = "",
        self.version = [],
        self.installed = self.isCool = false;
    function activeXObjectGetVariable(activeXObj, name){
        try{
            return activeXObj.GetVariable(name);
        }catch(e){
            return "";
        }
    }
    function newActiveObject(name){
        try{
            return new ActiveXObject(name);
        }catch(e){
            return undefined;
        }
    }
    function parseActiveXVersionVariable(raw){
        var parts = raw.split(","),
            version = [],
            i = 0,
            l = parts.length;
        for(; i < l; i++){
            version[i] = parseInt(parts[i], 10) || -1;
        }
        return version;
    }
    self.atLeast = function(){
        return false;
    };
    return self;
}();
