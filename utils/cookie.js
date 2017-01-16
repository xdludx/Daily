/**
 * 基于浏览器的一些cookie操作
 * document.cookie可以显示当前的cookie信息。格式如_q=U.kfoj2400; _t=24825992; csg.supplier.id=90000368566"
 */
var Cookie = {
    originalString : document.cookie,
    read: function() {
        this.originalString = document.cookie;
    },
    _getCookieHash: function() {
        var cookieArr = this.originalString.split(";");
        var cookieHash = {};
        for (var i=0; i<cookieArr.length; i++) {
            if (cookieArr[i].indexOf("=")!=-1)
                cookieHash[cookieArr[i].split("=")[0].replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")]=unescape(cookieArr[i].split("=")[1]).replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");
        }
        return cookieHash;
    },
    setCookie: function(sName, sValue, dExpire, sDomain, sPath){
        var _cookieString = sName + "=" + escape(sValue);
        if (dExpire)   _cookieString += "; expires=" + dExpire.toGMTString();
        if (sDomain)   _cookieString += "; domain=" + sDomain;
        if (sPath)      _cookieString += "; path=" + sPath;
        document.cookie = _cookieString;
        this.originalString = document.cookie;
        this.values = this._getCookieHash();
    },
    deleteCookie: function(sName) {
        var _date=new Date(1);
        document.cookie = sName + "=;expires=" + _date.toGMTString();
        this.originalString = document.cookie;
        this.values = this._getCookieHash();
    },
    refresh : function() {
        this.read();
        Cookie.values = Cookie._getCookieHash();
    }
};
Cookie.values = Cookie._getCookieHash();

module.exports = Cookie;
