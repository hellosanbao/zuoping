var djt = { $: function (objName) { return document.getElementById(objName); }, isIE: navigator.appVersion.indexOf("MSIE") != -1 ? true : false, addEvent: function (l, i, I) { if (l.attachEvent) { l.attachEvent("on" + i, I) } else { l.addEventListener(i, I, false) } }, delEvent: function (l, i, I) { if (l.detachEvent) { l.detachEvent("on" + i, I) } else { l.removeEventListener(i, I, false) } } };
//滚动图片构造函数
// new  ScrollPicleft('滚动区ID'，'左按钮ID','右按钮ID',滚动区宽度,翻页宽度,移动速度(单位毫秒，越小越快),每次移动像素(单位px，越大越快),自动播放,自动播放间隔时间,'分页ID');
// new  ScrollPicleft('id','leftid','rightid',958,220,2,8,true,3000);
function ScrollPicleft2(scrollContId, arrLeftId, arrRightId, frameWidth, pageWidth, speed, space, autoPlay, autoPlayTime, dotListId) {
    this.scrollContId = scrollContId; this.arrLeftId = arrLeftId; this.arrRightId = arrRightId; this.dotListId = dotListId; this.dotClassName = "dotItem"; this.dotOnClassName = "dotItemOn"; this.dotObjArr = []; this.pageWidth = pageWidth; this.frameWidth = frameWidth; this.speed = speed; this.space = space; this.pageIndex = 0; this.autoPlay = autoPlay; this.autoPlayTime = autoPlayTime; var _autoTimeObj, _scrollTimeObj, _state = "ready"; this.stripDiv = document.createElement("DIV"); this.listDiv01 = document.createElement("DIV"); this.listDiv02 = document.createElement("DIV"); if (!ScrollPicleft.childs) { ScrollPicleft.childs = [] }; this.ID = ScrollPicleft.childs.length; ScrollPicleft.childs.push(this); this.initialize = function () {
        if (!this.scrollContId) { throw new Error("必须指定scrollContId."); return }; this.scrollContDiv = djt.$(this.scrollContId); if (!this.scrollContDiv) { throw new Error("scrollContId不是正确的对象.(scrollContId = \"" + this.scrollContId + "\")"); return }; this.scrollContDiv.style.width = this.frameWidth + "px"; this.scrollContDiv.style.overflow = "hidden"; this.listDiv01.innerHTML = this.listDiv02.innerHTML = this.scrollContDiv.innerHTML; this.scrollContDiv.innerHTML = ""; this.scrollContDiv.appendChild(this.stripDiv); this.stripDiv.appendChild(this.listDiv01); this.stripDiv.appendChild(this.listDiv02); this.stripDiv.style.overflow = "hidden"; this.stripDiv.style.zoom = "1"; this.stripDiv.style.width = "32766px"; var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") == -1 ? false : true; if (isIE) { this.listDiv01.style.styleFloat = "left"; this.listDiv02.style.styleFloat = "left"; } else { this.listDiv01.style.cssFloat = "left"; this.listDiv02.style.cssFloat = "left"; }
        djt.addEvent(this.scrollContDiv, "mouseover", Function("ScrollPicleft.childs[" + this.ID + "].stop()")); djt.addEvent(this.scrollContDiv, "mouseout", Function("ScrollPicleft.childs[" + this.ID + "].play()")); if (this.arrLeftId) { this.arrLeftObj = djt.$(this.arrLeftId); if (this.arrLeftObj) { djt.addEvent(this.arrLeftObj, "mousedown", Function("ScrollPicleft.childs[" + this.ID + "].rightMouseDown()")); djt.addEvent(this.arrLeftObj, "mouseup", Function("ScrollPicleft.childs[" + this.ID + "].rightEnd()")); djt.addEvent(this.arrLeftObj, "mouseout", Function("ScrollPicleft.childs[" + this.ID + "].rightEnd()")) } }; if (this.arrRightId) { this.arrRightObj = djt.$(this.arrRightId); if (this.arrRightObj) { djt.addEvent(this.arrRightObj, "mousedown", Function("ScrollPicleft.childs[" + this.ID + "].leftMouseDown()")); djt.addEvent(this.arrRightObj, "mouseup", Function("ScrollPicleft.childs[" + this.ID + "].leftEnd()")); djt.addEvent(this.arrRightObj, "mouseout", Function("ScrollPicleft.childs[" + this.ID + "].leftEnd()")) } }; if (this.dotListId) { this.dotListObj = djt.$(this.dotListId); if (this.dotListObj) { var pages = Math.round(this.listDiv01.offsetWidth / this.frameWidth + 0.4), i, tempObj; for (i = 0; i < pages; i++) { tempObj = document.createElement("span"); this.dotListObj.appendChild(tempObj); this.dotObjArr.push(tempObj); if (i == this.pageIndex) { tempObj.className = this.dotClassName } else { tempObj.className = this.dotOnClassName }; tempObj.title = "第" + (i + 1) + "页"; djt.addEvent(tempObj, "click", Function("ScrollPicleft.childs[" + this.ID + "].pageTo(" + i + ")")) } } }; if (this.autoPlay) { this.play() }
    }; this.leftMouseDown = function () { if (_state != "ready") { return }; _state = "floating"; _scrollTimeObj = setInterval("ScrollPicleft.childs[" + this.ID + "].moveLeft()", this.speed) }; this.rightMouseDown = function () { if (_state != "ready") { return }; _state = "floating"; _scrollTimeObj = setInterval("ScrollPicleft.childs[" + this.ID + "].moveRight()", this.speed) }; this.moveLeft = function () { if (this.scrollContDiv.scrollLeft + this.space >= this.listDiv01.scrollWidth) { this.scrollContDiv.scrollLeft = this.scrollContDiv.scrollLeft + this.space - this.listDiv01.scrollWidth } else { this.scrollContDiv.scrollLeft += this.space }; this.accountPageIndex() }; this.moveRight = function () { if (this.scrollContDiv.scrollLeft - this.space <= 0) { this.scrollContDiv.scrollLeft = this.listDiv01.scrollWidth + this.scrollContDiv.scrollLeft - this.space } else { this.scrollContDiv.scrollLeft -= this.space }; this.accountPageIndex() }; this.leftEnd = function () { if (_state != "floating") { return }; _state = "stoping"; clearInterval(_scrollTimeObj); var fill = this.pageWidth - this.scrollContDiv.scrollLeft % this.pageWidth; this.move(fill) }; this.rightEnd = function () { if (_state != "floating") { return }; _state = "stoping"; clearInterval(_scrollTimeObj); var fill = -this.scrollContDiv.scrollLeft % this.pageWidth; this.move(fill) }; this.move = function (num, quick) { var thisMove = num / 5; if (!quick) { if (thisMove > this.space) { thisMove = this.space }; if (thisMove < -this.space) { thisMove = -this.space } }; if (Math.abs(thisMove) < 1 && thisMove != 0) { thisMove = thisMove >= 0 ? 1 : -1 } else { thisMove = Math.round(thisMove) }; var temp = this.scrollContDiv.scrollLeft + thisMove; if (thisMove > 0) { if (this.scrollContDiv.scrollLeft + thisMove >= this.listDiv01.scrollWidth) { this.scrollContDiv.scrollLeft = this.scrollContDiv.scrollLeft + thisMove - this.listDiv01.scrollWidth } else { this.scrollContDiv.scrollLeft += thisMove } } else { if (this.scrollContDiv.scrollLeft - thisMove <= 0) { this.scrollContDiv.scrollLeft = this.listDiv01.scrollWidth + this.scrollContDiv.scrollLeft - thisMove } else { this.scrollContDiv.scrollLeft += thisMove } }; num -= thisMove; if (Math.abs(num) == 0) { _state = "ready"; if (this.autoPlay) { this.play() }; this.accountPageIndex(); return } else { this.accountPageIndex(); setTimeout("ScrollPicleft.childs[" + this.ID + "].move(" + num + "," + quick + ")", this.speed) } }; this.next = function () { if (_state != "ready") { return }; _state = "stoping"; this.move(this.pageWidth, true) }; this.play = function () { if (!this.autoPlay) { return }; clearInterval(_autoTimeObj); _autoTimeObj = setInterval("ScrollPicleft.childs[" + this.ID + "].next()", this.autoPlayTime * 1000) }; this.stop = function () { clearInterval(_autoTimeObj) }; this.pageTo = function (num) { if (_state != "ready") { return }; _state = "stoping"; var fill = num * this.frameWidth - this.scrollContDiv.scrollLeft; this.move(fill, true) }; this.accountPageIndex = function () { this.pageIndex = Math.round(this.scrollContDiv.scrollLeft / this.frameWidth); if (this.pageIndex > Math.round(this.listDiv01.offsetWidth / this.frameWidth + 0.4) - 1) { this.pageIndex = 0 }; var i; for (i = 0; i < this.dotObjArr.length; i++) { if (i == this.pageIndex) { this.dotObjArr[i].className = this.dotClassName } else { this.dotObjArr[i].className = this.dotOnClassName } } }
    this.initialize();
};

function ScrollPicleft(scrollContId, arrLeftId, arrRightId,pageWidth,frameWidth) {
    this.scrollContId = scrollContId;
    this.arrLeftId = arrLeftId;
    this.arrRightId = arrRightId;
    this.dotListId = 1;
    this.dotClassName = "dotItem";
    this.dotOnClassName = "dotItemOn";
    this.dotObjArr = [];
    this.pageWidth = pageWidth;
    this.frameWidth = frameWidth;
    this.speed = 10;
    this.space = 10;
    this.pageIndex = 0;
    this.autoPlay = true;
    this.autoPlayTime = 3;
    var _autoTimeObj, _scrollTimeObj, _state = "ready";
    this.stripDiv = document.createElement("DIV");
    this.listDiv01 = document.createElement("DIV");
    this.listDiv02 = document.createElement("DIV");
    if (!ScrollPicleft.childs) {
        ScrollPicleft.childs = []
    };
    this.ID = ScrollPicleft.childs.length;
    ScrollPicleft.childs.push(this);
    this.initialize = function () {
        if (!this.scrollContId) {
            throw new Error("必须指定scrollContId.");
            return
        };
        this.scrollContDiv = djt.$(this.scrollContId);
        if (!this.scrollContDiv) {
            throw new Error("scrollContId不是正确的对象.(scrollContId = \"" + this.scrollContId + "\")");
            return
        };
        this.scrollContDiv.style.width = this.frameWidth + "px";
        this.scrollContDiv.style.overflow = "hidden";
        this.listDiv01.innerHTML = this.listDiv02.innerHTML = this.scrollContDiv.innerHTML;
        this.scrollContDiv.innerHTML = "";
        this.scrollContDiv.appendChild(this.stripDiv);
        this.stripDiv.appendChild(this.listDiv01);
        this.stripDiv.appendChild(this.listDiv02);
        this.stripDiv.style.overflow = "hidden";
        this.stripDiv.style.zoom = "1";
        this.stripDiv.style.width = "32766px";
        var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") == -1 ? false : true;
        if (isIE) {
            this.listDiv01.style.styleFloat = "left";
            this.listDiv02.style.styleFloat = "left";
        } else {
            this.listDiv01.style.cssFloat = "left";
            this.listDiv02.style.cssFloat = "left";
        }
        djt.addEvent(this.scrollContDiv, "mouseover", Function("ScrollPicleft.childs[" + this.ID + "].stop()"));
        djt.addEvent(this.scrollContDiv, "mouseout", Function("ScrollPicleft.childs[" + this.ID + "].play()"));
        if (this.arrLeftId) {
            this.arrLeftObj = djt.$(this.arrLeftId);
            if (this.arrLeftObj) {
                djt.addEvent(this.arrLeftObj, "mousedown", Function("ScrollPicleft.childs[" + this.ID + "].rightMouseDown()"));
                djt.addEvent(this.arrLeftObj, "mouseup", Function("ScrollPicleft.childs[" + this.ID + "].rightEnd()"));
                djt.addEvent(this.arrLeftObj, "mouseout", Function("ScrollPicleft.childs[" + this.ID + "].rightEnd()"))
            }
        };
        if (this.arrRightId) {
            this.arrRightObj = djt.$(this.arrRightId);
            if (this.arrRightObj) {
                djt.addEvent(this.arrRightObj, "mousedown", Function("ScrollPicleft.childs[" + this.ID + "].leftMouseDown()"));
                djt.addEvent(this.arrRightObj, "mouseup", Function("ScrollPicleft.childs[" + this.ID + "].leftEnd()"));
                djt.addEvent(this.arrRightObj, "mouseout", Function("ScrollPicleft.childs[" + this.ID + "].leftEnd()"))
            }
        };
        if (this.dotListId) {
            this.dotListObj = djt.$(this.dotListId);
            if (this.dotListObj) {
                var pages = Math.round(this.listDiv01.offsetWidth / this.frameWidth + 0.4),
					i, tempObj;
                for (i = 0; i < pages; i++) {
                    tempObj = document.createElement("span");
                    this.dotListObj.appendChild(tempObj);
                    this.dotObjArr.push(tempObj);
                    if (i == this.pageIndex) {
                        tempObj.className = this.dotClassName
                    } else {
                        tempObj.className = this.dotOnClassName
                    };
                    tempObj.title = "第" + (i + 1) + "页";
                    djt.addEvent(tempObj, "click", Function("ScrollPicleft.childs[" + this.ID + "].pageTo(" + i + ")"))
                }
            }
        };
        if (this.autoPlay) {
            this.play()
        }
    };
    this.leftMouseDown = function () {
        if (_state != "ready") {
            return
        };
        _state = "floating";
        _scrollTimeObj = setInterval("ScrollPicleft.childs[" + this.ID + "].moveLeft()", this.speed)
    };
    this.rightMouseDown = function () {
        if (_state != "ready") {
            return
        };
        _state = "floating";
        _scrollTimeObj = setInterval("ScrollPicleft.childs[" + this.ID + "].moveRight()", this.speed)
    };
    this.moveLeft = function () {
        if (this.scrollContDiv.scrollLeft + this.space >= this.listDiv01.scrollWidth) {
            this.scrollContDiv.scrollLeft = this.scrollContDiv.scrollLeft + this.space - this.listDiv01.scrollWidth
        } else {
            this.scrollContDiv.scrollLeft += this.space
        };
        this.accountPageIndex()
    };
    this.moveRight = function () {
        if (this.scrollContDiv.scrollLeft - this.space <= 0) {
            this.scrollContDiv.scrollLeft = this.listDiv01.scrollWidth + this.scrollContDiv.scrollLeft - this.space
        } else {
            this.scrollContDiv.scrollLeft -= this.space
        };
        this.accountPageIndex()
    };
    this.leftEnd = function () {
        if (_state != "floating") {
            return
        };
        _state = "stoping";
        clearInterval(_scrollTimeObj);
        var fill = this.pageWidth - this.scrollContDiv.scrollLeft % this.pageWidth;
        this.move(fill)
    };
    this.rightEnd = function () {
        if (_state != "floating") {
            return
        };
        _state = "stoping";
        clearInterval(_scrollTimeObj);
        var fill = -this.scrollContDiv.scrollLeft % this.pageWidth;
        this.move(fill)
    };
    this.move = function (num, quick) {
        var thisMove = num / 5;
        if (!quick) {
            if (thisMove > this.space) {
                thisMove = this.space
            };
            if (thisMove < -this.space) {
                thisMove = -this.space
            }
        };
        if (Math.abs(thisMove) < 1 && thisMove != 0) {
            thisMove = thisMove >= 0 ? 1 : -1
        } else {
            thisMove = Math.round(thisMove)
        };
        var temp = this.scrollContDiv.scrollLeft + thisMove;
        if (thisMove > 0) {
            if (this.scrollContDiv.scrollLeft + thisMove >= this.listDiv01.scrollWidth) {
                this.scrollContDiv.scrollLeft = this.scrollContDiv.scrollLeft + thisMove - this.listDiv01.scrollWidth
            } else {
                this.scrollContDiv.scrollLeft += thisMove
            }
        } else {
            if (this.scrollContDiv.scrollLeft - thisMove <= 0) {
                this.scrollContDiv.scrollLeft = this.listDiv01.scrollWidth + this.scrollContDiv.scrollLeft - thisMove
            } else {
                this.scrollContDiv.scrollLeft += thisMove
            }
        };
        num -= thisMove;
        if (Math.abs(num) == 0) {
            _state = "ready";
            if (this.autoPlay) {
                this.play()
            };
            this.accountPageIndex();
            return
        } else {
            this.accountPageIndex();
            setTimeout("ScrollPicleft.childs[" + this.ID + "].move(" + num + "," + quick + ")", this.speed)
        }
    };
    this.next = function () {
        if (_state != "ready") {
            return
        };
        _state = "stoping";
        this.move(this.pageWidth, true)
    };
    this.play = function () {
        if (!this.autoPlay) {
            return
        };
        clearInterval(_autoTimeObj);
        _autoTimeObj = setInterval("ScrollPicleft.childs[" + this.ID + "].next()", this.autoPlayTime * 1000)
    };
    this.stop = function () {
        clearInterval(_autoTimeObj)
    };
    this.pageTo = function (num) {
        if (_state != "ready") {
            return
        };
        _state = "stoping";
        var fill = num * this.frameWidth - this.scrollContDiv.scrollLeft;
        this.move(fill, true)
    };
    this.accountPageIndex = function () {
        this.pageIndex = Math.round(this.scrollContDiv.scrollLeft / this.frameWidth);
        if (this.pageIndex > Math.round(this.listDiv01.offsetWidth / this.frameWidth + 0.4) - 1) {
            this.pageIndex = 0
        };
        var i;
        for (i = 0; i < this.dotObjArr.length; i++) {
            if (i == this.pageIndex) {
                this.dotObjArr[i].className = this.dotClassName
            } else {
                this.dotObjArr[i].className = this.dotOnClassName
            }
        }
    }
    this.initialize();
};


function Marquee(){this.ID=document.getElementById(arguments[0]);if(!this.ID){alert('您要设置的"'+arguments[0]+'"初始化错误\r\n请检查标签ID设置是否正确!');this.ID=-1;return}this.Direction=this.Width=this.Height=this.DelayTime=this.WaitTime=this.CTL=this.StartID=this.Stop=this.MouseOver=0;this.Step=1;this.Timer=30;this.DirectionArray={top:0,up:0,bottom:1,down:1,left:2,right:3};if(typeof arguments[1]=="number"||typeof arguments[1]=="string"){this.Direction=arguments[1]}if(typeof arguments[2]=="number"){this.Step=arguments[2]}if(typeof arguments[3]=="number"){this.Width=arguments[3]}if(typeof arguments[4]=="number"){this.Height=arguments[4]}if(typeof arguments[5]=="number"){this.Timer=arguments[5]}if(typeof arguments[6]=="number"){this.DelayTime=arguments[6]}if(typeof arguments[7]=="number"){this.WaitTime=arguments[7]}if(typeof arguments[8]=="number"){this.ScrollStep=arguments[8]}this.ID.style.overflow=this.ID.style.overflowX=this.ID.style.overflowY="hidden";this.ID.noWrap=true;this.IsNotOpera=(navigator.userAgent.toLowerCase().indexOf("opera")==-1);if(arguments.length>=7){this.Start()}}Marquee.prototype.Start=function(){if(this.ID==-1){return}if(this.WaitTime<800){this.WaitTime=800}if(this.Timer<20){this.Timer=20}if(this.Width==0){this.Width=parseInt(this.ID.style.width)}if(this.Height==0){this.Height=parseInt(this.ID.style.height)}if(typeof this.Direction=="string"){this.Direction=this.DirectionArray[this.Direction.toString().toLowerCase()]}this.HalfWidth=Math.round(this.Width/2);this.HalfHeight=Math.round(this.Height/2);this.BakStep=this.Step;this.ID.style.width=this.Width+"px";this.ID.style.height=this.Height+"px";if(typeof this.ScrollStep!="number"){this.ScrollStep=this.Direction>1?this.Width:this.Height}var d="<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;display:inline;'><tr><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td></tr></table>";var b="<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;'><tr><td>MSCLASS_TEMP_HTML</td></tr><tr><td>MSCLASS_TEMP_HTML</td></tr></table>";var e=this;e.tempHTML=e.ID.innerHTML;if(e.Direction<=1){e.ID.innerHTML=b.replace(/MSCLASS_TEMP_HTML/g,e.ID.innerHTML)}else{if(e.ScrollStep==0&&e.DelayTime==0){e.ID.innerHTML+=e.ID.innerHTML}else{e.ID.innerHTML=d.replace(/MSCLASS_TEMP_HTML/g,e.ID.innerHTML)}}var f=this.Timer;var a=this.DelayTime;var c=this.WaitTime;e.StartID=function(){e.Scroll()};e.Continue=function(){if(e.MouseOver==1){setTimeout(e.Continue,a)}else{clearInterval(e.TimerID);e.CTL=e.Stop=0;e.TimerID=setInterval(e.StartID,f)}};e.Pause=function(){e.Stop=1;clearInterval(e.TimerID);setTimeout(e.Continue,a)};e.Begin=function(){e.ClientScroll=e.Direction>1?e.ID.scrollWidth/2:e.ID.scrollHeight/2;if((e.Direction<=1&&e.ClientScroll<=e.Height+e.Step)||(e.Direction>1&&e.ClientScroll<=e.Width+e.Step)){e.ID.innerHTML=e.tempHTML;delete (e.tempHTML);return}delete (e.tempHTML);e.TimerID=setInterval(e.StartID,f);if(e.ScrollStep<0){return}e.ID.onmousemove=function(g){if(e.ScrollStep==0&&e.Direction>1){var g=g||window.event;if(window.event){if(e.IsNotOpera){e.EventLeft=g.srcElement.id==e.ID.id?g.offsetX-e.ID.scrollLeft:g.srcElement.offsetLeft-e.ID.scrollLeft+g.offsetX}else{e.ScrollStep=null;return}}else{e.EventLeft=g.layerX-e.ID.scrollLeft}e.Direction=e.EventLeft>e.HalfWidth?3:2;e.AbsCenter=Math.abs(e.HalfWidth-e.EventLeft);e.Step=Math.round(e.AbsCenter*(e.BakStep*2)/e.HalfWidth)}};e.ID.onmouseover=function(){if(e.ScrollStep==0){return}e.MouseOver=1;clearInterval(e.TimerID)};e.ID.onmouseout=function(){if(e.ScrollStep==0){if(e.Step==0){e.Step=1}return}e.MouseOver=0;if(e.Stop==0){clearInterval(e.TimerID);e.TimerID=setInterval(e.StartID,f)}}};setTimeout(e.Begin,c)};Marquee.prototype.Scroll=function(){switch(this.Direction){case 0:this.CTL+=this.Step;if(this.CTL>=this.ScrollStep&&this.DelayTime>0){this.ID.scrollTop+=this.ScrollStep+this.Step-this.CTL;this.Pause();return}else{if(this.ID.scrollTop>=this.ClientScroll){this.ID.scrollTop-=this.ClientScroll}this.ID.scrollTop+=this.Step}break;case 1:this.CTL+=this.Step;if(this.CTL>=this.ScrollStep&&this.DelayTime>0){this.ID.scrollTop-=this.ScrollStep+this.Step-this.CTL;this.Pause();return}else{if(this.ID.scrollTop<=0){this.ID.scrollTop+=this.ClientScroll}this.ID.scrollTop-=this.Step}break;case 2:this.CTL+=this.Step;if(this.CTL>=this.ScrollStep&&this.DelayTime>0){this.ID.scrollLeft+=this.ScrollStep+this.Step-this.CTL;this.Pause();return}else{if(this.ID.scrollLeft>=this.ClientScroll){this.ID.scrollLeft-=this.ClientScroll}this.ID.scrollLeft+=this.Step}break;case 3:this.CTL+=this.Step;if(this.CTL>=this.ScrollStep&&this.DelayTime>0){this.ID.scrollLeft-=this.ScrollStep+this.Step-this.CTL;this.Pause();return}else{if(this.ID.scrollLeft<=0){this.ID.scrollLeft+=this.ClientScroll}this.ID.scrollLeft-=this.Step}break}};

function SetHome(obj,vrl){ 
try{ 
obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl); 
} 
catch(e){ 
if(window.netscape) { 
try { 
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
} 
catch (e) { 
alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。"); 
} 
var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
prefs.setCharPref('browser.startup.homepage',vrl); 
}else{ 
alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。"); 
} 
} 
} 
// 加入收藏 兼容360和IE6 
function AddFavorite(sTitle,sURL) 
{ 
try 
{ 
window.external.addFavorite(sURL, sTitle); 
} 
catch (e) 
{ 
try 
{ 
window.sidebar.addPanel(sTitle, sURL, ""); 
} 
catch (e) 
{ 
alert("加入收藏失败，请使用Ctrl+D进行添加"); 
} 
} 
} 