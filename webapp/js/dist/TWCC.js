/*!
 * ZeroClipboard
 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
 * Copyright (c) 2009-2014 Jon Rohan, James M. Greene
 * Licensed MIT
 * http://zeroclipboard.org/
 * v2.2.0
 */
!function(a,b){"use strict";var c,d,e,f=a,g=f.document,h=f.navigator,i=f.setTimeout,j=f.clearTimeout,k=f.setInterval,l=f.clearInterval,m=f.getComputedStyle,n=f.encodeURIComponent,o=f.ActiveXObject,p=f.Error,q=f.Number.parseInt||f.parseInt,r=f.Number.parseFloat||f.parseFloat,s=f.Number.isNaN||f.isNaN,t=f.Date.now,u=f.Object.keys,v=f.Object.defineProperty,w=f.Object.prototype.hasOwnProperty,x=f.Array.prototype.slice,y=function(){var a=function(a){return a};if("function"==typeof f.wrap&&"function"==typeof f.unwrap)try{var b=g.createElement("div"),c=f.unwrap(b);1===b.nodeType&&c&&1===c.nodeType&&(a=f.unwrap)}catch(d){}return a}(),z=function(a){return x.call(a,0)},A=function(){var a,c,d,e,f,g,h=z(arguments),i=h[0]||{};for(a=1,c=h.length;c>a;a++)if(null!=(d=h[a]))for(e in d)w.call(d,e)&&(f=i[e],g=d[e],i!==g&&g!==b&&(i[e]=g));return i},B=function(a){var b,c,d,e;if("object"!=typeof a||null==a||"number"==typeof a.nodeType)b=a;else if("number"==typeof a.length)for(b=[],c=0,d=a.length;d>c;c++)w.call(a,c)&&(b[c]=B(a[c]));else{b={};for(e in a)w.call(a,e)&&(b[e]=B(a[e]))}return b},C=function(a,b){for(var c={},d=0,e=b.length;e>d;d++)b[d]in a&&(c[b[d]]=a[b[d]]);return c},D=function(a,b){var c={};for(var d in a)-1===b.indexOf(d)&&(c[d]=a[d]);return c},E=function(a){if(a)for(var b in a)w.call(a,b)&&delete a[b];return a},F=function(a,b){if(a&&1===a.nodeType&&a.ownerDocument&&b&&(1===b.nodeType&&b.ownerDocument&&b.ownerDocument===a.ownerDocument||9===b.nodeType&&!b.ownerDocument&&b===a.ownerDocument))do{if(a===b)return!0;a=a.parentNode}while(a);return!1},G=function(a){var b;return"string"==typeof a&&a&&(b=a.split("#")[0].split("?")[0],b=a.slice(0,a.lastIndexOf("/")+1)),b},H=function(a){var b,c;return"string"==typeof a&&a&&(c=a.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),c&&c[1]?b=c[1]:(c=a.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),c&&c[1]&&(b=c[1]))),b},I=function(){var a,b;try{throw new p}catch(c){b=c}return b&&(a=b.sourceURL||b.fileName||H(b.stack)),a},J=function(){var a,c,d;if(g.currentScript&&(a=g.currentScript.src))return a;if(c=g.getElementsByTagName("script"),1===c.length)return c[0].src||b;if("readyState"in c[0])for(d=c.length;d--;)if("interactive"===c[d].readyState&&(a=c[d].src))return a;return"loading"===g.readyState&&(a=c[c.length-1].src)?a:(a=I())?a:b},K=function(){var a,c,d,e=g.getElementsByTagName("script");for(a=e.length;a--;){if(!(d=e[a].src)){c=null;break}if(d=G(d),null==c)c=d;else if(c!==d){c=null;break}}return c||b},L=function(){var a=G(J())||K()||"";return a+"ZeroClipboard.swf"},M=function(){return null==a.opener&&(!!a.top&&a!=a.top||!!a.parent&&a!=a.parent)}(),N={bridge:null,version:"0.0.0",pluginType:"unknown",disabled:null,outdated:null,sandboxed:null,unavailable:null,degraded:null,deactivated:null,overdue:null,ready:null},O="11.0.0",P={},Q={},R=null,S=0,T=0,U={ready:"Flash communication is established",error:{"flash-disabled":"Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.","flash-outdated":"Flash is too outdated to support ZeroClipboard","flash-sandboxed":"Attempting to run Flash in a sandboxed iframe, which is impossible","flash-unavailable":"Flash is unable to communicate bidirectionally with JavaScript","flash-degraded":"Flash is unable to preserve data fidelity when communicating with JavaScript","flash-deactivated":"Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.","flash-overdue":"Flash communication was established but NOT within the acceptable time limit","version-mismatch":"ZeroClipboard JS version number does not match ZeroClipboard SWF version number","clipboard-error":"At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard","config-mismatch":"ZeroClipboard configuration does not match Flash's reality","swf-not-found":"The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity"}},V=["flash-unavailable","flash-degraded","flash-overdue","version-mismatch","config-mismatch","clipboard-error"],W=["flash-disabled","flash-outdated","flash-sandboxed","flash-unavailable","flash-degraded","flash-deactivated","flash-overdue"],X=new RegExp("^flash-("+W.map(function(a){return a.replace(/^flash-/,"")}).join("|")+")$"),Y=new RegExp("^flash-("+W.slice(1).map(function(a){return a.replace(/^flash-/,"")}).join("|")+")$"),Z={swfPath:L(),trustedDomains:a.location.host?[a.location.host]:[],cacheBust:!0,forceEnhancedClipboard:!1,flashLoadTimeout:3e4,autoActivate:!0,bubbleEvents:!0,containerId:"global-zeroclipboard-html-bridge",containerClass:"global-zeroclipboard-container",swfObjectId:"global-zeroclipboard-flash-bridge",hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",forceHandCursor:!1,title:null,zIndex:999999999},$=function(a){if("object"==typeof a&&null!==a)for(var b in a)if(w.call(a,b))if(/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(b))Z[b]=a[b];else if(null==N.bridge)if("containerId"===b||"swfObjectId"===b){if(!nb(a[b]))throw new Error("The specified `"+b+"` value is not valid as an HTML4 Element ID");Z[b]=a[b]}else Z[b]=a[b];{if("string"!=typeof a||!a)return B(Z);if(w.call(Z,a))return Z[a]}},_=function(){return Tb(),{browser:C(h,["userAgent","platform","appName"]),flash:D(N,["bridge"]),zeroclipboard:{version:Vb.version,config:Vb.config()}}},ab=function(){return!!(N.disabled||N.outdated||N.sandboxed||N.unavailable||N.degraded||N.deactivated)},bb=function(a,d){var e,f,g,h={};if("string"==typeof a&&a)g=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof d)for(e in a)w.call(a,e)&&"string"==typeof e&&e&&"function"==typeof a[e]&&Vb.on(e,a[e]);if(g&&g.length){for(e=0,f=g.length;f>e;e++)a=g[e].replace(/^on/,""),h[a]=!0,P[a]||(P[a]=[]),P[a].push(d);if(h.ready&&N.ready&&Vb.emit({type:"ready"}),h.error){for(e=0,f=W.length;f>e;e++)if(N[W[e].replace(/^flash-/,"")]===!0){Vb.emit({type:"error",name:W[e]});break}c!==b&&Vb.version!==c&&Vb.emit({type:"error",name:"version-mismatch",jsVersion:Vb.version,swfVersion:c})}}return Vb},cb=function(a,b){var c,d,e,f,g;if(0===arguments.length)f=u(P);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)w.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&Vb.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),g=P[a],g&&g.length)if(b)for(e=g.indexOf(b);-1!==e;)g.splice(e,1),e=g.indexOf(b,e);else g.length=0;return Vb},db=function(a){var b;return b="string"==typeof a&&a?B(P[a])||null:B(P)},eb=function(a){var b,c,d;return a=ob(a),a&&!vb(a)?"ready"===a.type&&N.overdue===!0?Vb.emit({type:"error",name:"flash-overdue"}):(b=A({},a),tb.call(this,b),"copy"===a.type&&(d=Db(Q),c=d.data,R=d.formatMap),c):void 0},fb=function(){var a=N.sandboxed;if(Tb(),"boolean"!=typeof N.ready&&(N.ready=!1),N.sandboxed!==a&&N.sandboxed===!0)N.ready=!1,Vb.emit({type:"error",name:"flash-sandboxed"});else if(!Vb.isFlashUnusable()&&null===N.bridge){var b=Z.flashLoadTimeout;"number"==typeof b&&b>=0&&(S=i(function(){"boolean"!=typeof N.deactivated&&(N.deactivated=!0),N.deactivated===!0&&Vb.emit({type:"error",name:"flash-deactivated"})},b)),N.overdue=!1,Bb()}},gb=function(){Vb.clearData(),Vb.blur(),Vb.emit("destroy"),Cb(),Vb.off()},hb=function(a,b){var c;if("object"==typeof a&&a&&"undefined"==typeof b)c=a,Vb.clearData();else{if("string"!=typeof a||!a)return;c={},c[a]=b}for(var d in c)"string"==typeof d&&d&&w.call(c,d)&&"string"==typeof c[d]&&c[d]&&(Q[d]=c[d])},ib=function(a){"undefined"==typeof a?(E(Q),R=null):"string"==typeof a&&w.call(Q,a)&&delete Q[a]},jb=function(a){return"undefined"==typeof a?B(Q):"string"==typeof a&&w.call(Q,a)?Q[a]:void 0},kb=function(a){if(a&&1===a.nodeType){d&&(Lb(d,Z.activeClass),d!==a&&Lb(d,Z.hoverClass)),d=a,Kb(a,Z.hoverClass);var b=a.getAttribute("title")||Z.title;if("string"==typeof b&&b){var c=Ab(N.bridge);c&&c.setAttribute("title",b)}var e=Z.forceHandCursor===!0||"pointer"===Mb(a,"cursor");Rb(e),Qb()}},lb=function(){var a=Ab(N.bridge);a&&(a.removeAttribute("title"),a.style.left="0px",a.style.top="-9999px",a.style.width="1px",a.style.height="1px"),d&&(Lb(d,Z.hoverClass),Lb(d,Z.activeClass),d=null)},mb=function(){return d||null},nb=function(a){return"string"==typeof a&&a&&/^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(a)},ob=function(a){var b;if("string"==typeof a&&a?(b=a,a={}):"object"==typeof a&&a&&"string"==typeof a.type&&a.type&&(b=a.type),b){b=b.toLowerCase(),!a.target&&(/^(copy|aftercopy|_click)$/.test(b)||"error"===b&&"clipboard-error"===a.name)&&(a.target=e),A(a,{type:b,target:a.target||d||null,relatedTarget:a.relatedTarget||null,currentTarget:N&&N.bridge||null,timeStamp:a.timeStamp||t()||null});var c=U[a.type];return"error"===a.type&&a.name&&c&&(c=c[a.name]),c&&(a.message=c),"ready"===a.type&&A(a,{target:null,version:N.version}),"error"===a.type&&(X.test(a.name)&&A(a,{target:null,minimumVersion:O}),Y.test(a.name)&&A(a,{version:N.version})),"copy"===a.type&&(a.clipboardData={setData:Vb.setData,clearData:Vb.clearData}),"aftercopy"===a.type&&(a=Eb(a,R)),a.target&&!a.relatedTarget&&(a.relatedTarget=pb(a.target)),qb(a)}},pb=function(a){var b=a&&a.getAttribute&&a.getAttribute("data-clipboard-target");return b?g.getElementById(b):null},qb=function(a){if(a&&/^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)){var c=a.target,d="_mouseover"===a.type&&a.relatedTarget?a.relatedTarget:b,e="_mouseout"===a.type&&a.relatedTarget?a.relatedTarget:b,h=Nb(c),i=f.screenLeft||f.screenX||0,j=f.screenTop||f.screenY||0,k=g.body.scrollLeft+g.documentElement.scrollLeft,l=g.body.scrollTop+g.documentElement.scrollTop,m=h.left+("number"==typeof a._stageX?a._stageX:0),n=h.top+("number"==typeof a._stageY?a._stageY:0),o=m-k,p=n-l,q=i+o,r=j+p,s="number"==typeof a.movementX?a.movementX:0,t="number"==typeof a.movementY?a.movementY:0;delete a._stageX,delete a._stageY,A(a,{srcElement:c,fromElement:d,toElement:e,screenX:q,screenY:r,pageX:m,pageY:n,clientX:o,clientY:p,x:o,y:p,movementX:s,movementY:t,offsetX:0,offsetY:0,layerX:0,layerY:0})}return a},rb=function(a){var b=a&&"string"==typeof a.type&&a.type||"";return!/^(?:(?:before)?copy|destroy)$/.test(b)},sb=function(a,b,c,d){d?i(function(){a.apply(b,c)},0):a.apply(b,c)},tb=function(a){if("object"==typeof a&&a&&a.type){var b=rb(a),c=P["*"]||[],d=P[a.type]||[],e=c.concat(d);if(e&&e.length){var g,h,i,j,k,l=this;for(g=0,h=e.length;h>g;g++)i=e[g],j=l,"string"==typeof i&&"function"==typeof f[i]&&(i=f[i]),"object"==typeof i&&i&&"function"==typeof i.handleEvent&&(j=i,i=i.handleEvent),"function"==typeof i&&(k=A({},a),sb(i,j,[k],b))}return this}},ub=function(a){var b=null;return(M===!1||a&&"error"===a.type&&a.name&&-1!==V.indexOf(a.name))&&(b=!1),b},vb=function(a){var b=a.target||d||null,f="swf"===a._source;switch(delete a._source,a.type){case"error":var g="flash-sandboxed"===a.name||ub(a);"boolean"==typeof g&&(N.sandboxed=g),-1!==W.indexOf(a.name)?A(N,{disabled:"flash-disabled"===a.name,outdated:"flash-outdated"===a.name,unavailable:"flash-unavailable"===a.name,degraded:"flash-degraded"===a.name,deactivated:"flash-deactivated"===a.name,overdue:"flash-overdue"===a.name,ready:!1}):"version-mismatch"===a.name&&(c=a.swfVersion,A(N,{disabled:!1,outdated:!1,unavailable:!1,degraded:!1,deactivated:!1,overdue:!1,ready:!1})),Pb();break;case"ready":c=a.swfVersion;var h=N.deactivated===!0;A(N,{disabled:!1,outdated:!1,sandboxed:!1,unavailable:!1,degraded:!1,deactivated:!1,overdue:h,ready:!h}),Pb();break;case"beforecopy":e=b;break;case"copy":var i,j,k=a.relatedTarget;!Q["text/html"]&&!Q["text/plain"]&&k&&(j=k.value||k.outerHTML||k.innerHTML)&&(i=k.value||k.textContent||k.innerText)?(a.clipboardData.clearData(),a.clipboardData.setData("text/plain",i),j!==i&&a.clipboardData.setData("text/html",j)):!Q["text/plain"]&&a.target&&(i=a.target.getAttribute("data-clipboard-text"))&&(a.clipboardData.clearData(),a.clipboardData.setData("text/plain",i));break;case"aftercopy":wb(a),Vb.clearData(),b&&b!==Jb()&&b.focus&&b.focus();break;case"_mouseover":Vb.focus(b),Z.bubbleEvents===!0&&f&&(b&&b!==a.relatedTarget&&!F(a.relatedTarget,b)&&xb(A({},a,{type:"mouseenter",bubbles:!1,cancelable:!1})),xb(A({},a,{type:"mouseover"})));break;case"_mouseout":Vb.blur(),Z.bubbleEvents===!0&&f&&(b&&b!==a.relatedTarget&&!F(a.relatedTarget,b)&&xb(A({},a,{type:"mouseleave",bubbles:!1,cancelable:!1})),xb(A({},a,{type:"mouseout"})));break;case"_mousedown":Kb(b,Z.activeClass),Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}));break;case"_mouseup":Lb(b,Z.activeClass),Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}));break;case"_click":e=null,Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}));break;case"_mousemove":Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}))}return/^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)?!0:void 0},wb=function(a){if(a.errors&&a.errors.length>0){var b=B(a);A(b,{type:"error",name:"clipboard-error"}),delete b.success,i(function(){Vb.emit(b)},0)}},xb=function(a){if(a&&"string"==typeof a.type&&a){var b,c=a.target||null,d=c&&c.ownerDocument||g,e={view:d.defaultView||f,canBubble:!0,cancelable:!0,detail:"click"===a.type?1:0,button:"number"==typeof a.which?a.which-1:"number"==typeof a.button?a.button:d.createEvent?0:1},h=A(e,a);c&&d.createEvent&&c.dispatchEvent&&(h=[h.type,h.canBubble,h.cancelable,h.view,h.detail,h.screenX,h.screenY,h.clientX,h.clientY,h.ctrlKey,h.altKey,h.shiftKey,h.metaKey,h.button,h.relatedTarget],b=d.createEvent("MouseEvents"),b.initMouseEvent&&(b.initMouseEvent.apply(b,h),b._source="js",c.dispatchEvent(b)))}},yb=function(){var a=Z.flashLoadTimeout;if("number"==typeof a&&a>=0){var b=Math.min(1e3,a/10),c=Z.swfObjectId+"_fallbackContent";T=k(function(){var a=g.getElementById(c);Ob(a)&&(Pb(),N.deactivated=null,Vb.emit({type:"error",name:"swf-not-found"}))},b)}},zb=function(){var a=g.createElement("div");return a.id=Z.containerId,a.className=Z.containerClass,a.style.position="absolute",a.style.left="0px",a.style.top="-9999px",a.style.width="1px",a.style.height="1px",a.style.zIndex=""+Sb(Z.zIndex),a},Ab=function(a){for(var b=a&&a.parentNode;b&&"OBJECT"===b.nodeName&&b.parentNode;)b=b.parentNode;return b||null},Bb=function(){var a,b=N.bridge,c=Ab(b);if(!b){var d=Ib(f.location.host,Z),e="never"===d?"none":"all",h=Gb(A({jsVersion:Vb.version},Z)),i=Z.swfPath+Fb(Z.swfPath,Z);c=zb();var j=g.createElement("div");c.appendChild(j),g.body.appendChild(c);var k=g.createElement("div"),l="activex"===N.pluginType;k.innerHTML='<object id="'+Z.swfObjectId+'" name="'+Z.swfObjectId+'" width="100%" height="100%" '+(l?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"':'type="application/x-shockwave-flash" data="'+i+'"')+">"+(l?'<param name="movie" value="'+i+'"/>':"")+'<param name="allowScriptAccess" value="'+d+'"/><param name="allowNetworking" value="'+e+'"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="'+h+'"/><div id="'+Z.swfObjectId+'_fallbackContent">&nbsp;</div></object>',b=k.firstChild,k=null,y(b).ZeroClipboard=Vb,c.replaceChild(b,j),yb()}return b||(b=g[Z.swfObjectId],b&&(a=b.length)&&(b=b[a-1]),!b&&c&&(b=c.firstChild)),N.bridge=b||null,b},Cb=function(){var a=N.bridge;if(a){var d=Ab(a);d&&("activex"===N.pluginType&&"readyState"in a?(a.style.display="none",function e(){if(4===a.readyState){for(var b in a)"function"==typeof a[b]&&(a[b]=null);a.parentNode&&a.parentNode.removeChild(a),d.parentNode&&d.parentNode.removeChild(d)}else i(e,10)}()):(a.parentNode&&a.parentNode.removeChild(a),d.parentNode&&d.parentNode.removeChild(d))),Pb(),N.ready=null,N.bridge=null,N.deactivated=null,c=b}},Db=function(a){var b={},c={};if("object"==typeof a&&a){for(var d in a)if(d&&w.call(a,d)&&"string"==typeof a[d]&&a[d])switch(d.toLowerCase()){case"text/plain":case"text":case"air:text":case"flash:text":b.text=a[d],c.text=d;break;case"text/html":case"html":case"air:html":case"flash:html":b.html=a[d],c.html=d;break;case"application/rtf":case"text/rtf":case"rtf":case"richtext":case"air:rtf":case"flash:rtf":b.rtf=a[d],c.rtf=d}return{data:b,formatMap:c}}},Eb=function(a,b){if("object"!=typeof a||!a||"object"!=typeof b||!b)return a;var c={};for(var d in a)if(w.call(a,d))if("errors"===d){c[d]=a[d]?a[d].slice():[];for(var e=0,f=c[d].length;f>e;e++)c[d][e].format=b[c[d][e].format]}else if("success"!==d&&"data"!==d)c[d]=a[d];else{c[d]={};var g=a[d];for(var h in g)h&&w.call(g,h)&&w.call(b,h)&&(c[d][b[h]]=g[h])}return c},Fb=function(a,b){var c=null==b||b&&b.cacheBust===!0;return c?(-1===a.indexOf("?")?"?":"&")+"noCache="+t():""},Gb=function(a){var b,c,d,e,g="",h=[];if(a.trustedDomains&&("string"==typeof a.trustedDomains?e=[a.trustedDomains]:"object"==typeof a.trustedDomains&&"length"in a.trustedDomains&&(e=a.trustedDomains)),e&&e.length)for(b=0,c=e.length;c>b;b++)if(w.call(e,b)&&e[b]&&"string"==typeof e[b]){if(d=Hb(e[b]),!d)continue;if("*"===d){h.length=0,h.push(d);break}h.push.apply(h,[d,"//"+d,f.location.protocol+"//"+d])}return h.length&&(g+="trustedOrigins="+n(h.join(","))),a.forceEnhancedClipboard===!0&&(g+=(g?"&":"")+"forceEnhancedClipboard=true"),"string"==typeof a.swfObjectId&&a.swfObjectId&&(g+=(g?"&":"")+"swfObjectId="+n(a.swfObjectId)),"string"==typeof a.jsVersion&&a.jsVersion&&(g+=(g?"&":"")+"jsVersion="+n(a.jsVersion)),g},Hb=function(a){if(null==a||""===a)return null;if(a=a.replace(/^\s+|\s+$/g,""),""===a)return null;var b=a.indexOf("//");a=-1===b?a:a.slice(b+2);var c=a.indexOf("/");return a=-1===c?a:-1===b||0===c?null:a.slice(0,c),a&&".swf"===a.slice(-4).toLowerCase()?null:a||null},Ib=function(){var a=function(a){var b,c,d,e=[];if("string"==typeof a&&(a=[a]),"object"!=typeof a||!a||"number"!=typeof a.length)return e;for(b=0,c=a.length;c>b;b++)if(w.call(a,b)&&(d=Hb(a[b]))){if("*"===d){e.length=0,e.push("*");break}-1===e.indexOf(d)&&e.push(d)}return e};return function(b,c){var d=Hb(c.swfPath);null===d&&(d=b);var e=a(c.trustedDomains),f=e.length;if(f>0){if(1===f&&"*"===e[0])return"always";if(-1!==e.indexOf(b))return 1===f&&b===d?"sameDomain":"always"}return"never"}}(),Jb=function(){try{return g.activeElement}catch(a){return null}},Kb=function(a,b){var c,d,e,f=[];if("string"==typeof b&&b&&(f=b.split(/\s+/)),a&&1===a.nodeType&&f.length>0)if(a.classList)for(c=0,d=f.length;d>c;c++)a.classList.add(f[c]);else if(a.hasOwnProperty("className")){for(e=" "+a.className+" ",c=0,d=f.length;d>c;c++)-1===e.indexOf(" "+f[c]+" ")&&(e+=f[c]+" ");a.className=e.replace(/^\s+|\s+$/g,"")}return a},Lb=function(a,b){var c,d,e,f=[];if("string"==typeof b&&b&&(f=b.split(/\s+/)),a&&1===a.nodeType&&f.length>0)if(a.classList&&a.classList.length>0)for(c=0,d=f.length;d>c;c++)a.classList.remove(f[c]);else if(a.className){for(e=(" "+a.className+" ").replace(/[\r\n\t]/g," "),c=0,d=f.length;d>c;c++)e=e.replace(" "+f[c]+" "," ");a.className=e.replace(/^\s+|\s+$/g,"")}return a},Mb=function(a,b){var c=m(a,null).getPropertyValue(b);return"cursor"!==b||c&&"auto"!==c||"A"!==a.nodeName?c:"pointer"},Nb=function(a){var b={left:0,top:0,width:0,height:0};if(a.getBoundingClientRect){var c=a.getBoundingClientRect(),d=f.pageXOffset,e=f.pageYOffset,h=g.documentElement.clientLeft||0,i=g.documentElement.clientTop||0,j=0,k=0;if("relative"===Mb(g.body,"position")){var l=g.body.getBoundingClientRect(),m=g.documentElement.getBoundingClientRect();j=l.left-m.left||0,k=l.top-m.top||0}b.left=c.left+d-h-j,b.top=c.top+e-i-k,b.width="width"in c?c.width:c.right-c.left,b.height="height"in c?c.height:c.bottom-c.top}return b},Ob=function(a){if(!a)return!1;var b=m(a,null),c=r(b.height)>0,d=r(b.width)>0,e=r(b.top)>=0,f=r(b.left)>=0,g=c&&d&&e&&f,h=g?null:Nb(a),i="none"!==b.display&&"collapse"!==b.visibility&&(g||!!h&&(c||h.height>0)&&(d||h.width>0)&&(e||h.top>=0)&&(f||h.left>=0));return i},Pb=function(){j(S),S=0,l(T),T=0},Qb=function(){var a;if(d&&(a=Ab(N.bridge))){var b=Nb(d);A(a.style,{width:b.width+"px",height:b.height+"px",top:b.top+"px",left:b.left+"px",zIndex:""+Sb(Z.zIndex)})}},Rb=function(a){N.ready===!0&&(N.bridge&&"function"==typeof N.bridge.setHandCursor?N.bridge.setHandCursor(a):N.ready=!1)},Sb=function(a){if(/^(?:auto|inherit)$/.test(a))return a;var b;return"number"!=typeof a||s(a)?"string"==typeof a&&(b=Sb(q(a,10))):b=a,"number"==typeof b?b:"auto"},Tb=function(b){var c,d,e,f=N.sandboxed,g=null;if(b=b===!0,M===!1)g=!1;else{try{d=a.frameElement||null}catch(h){e={name:h.name,message:h.message}}if(d&&1===d.nodeType&&"IFRAME"===d.nodeName)try{g=d.hasAttribute("sandbox")}catch(h){g=null}else{try{c=document.domain||null}catch(h){c=null}(null===c||e&&"SecurityError"===e.name&&/(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(e.message.toLowerCase()))&&(g=!0)}}return N.sandboxed=g,f===g||b||Ub(o),g},Ub=function(a){function b(a){var b=a.match(/[\d]+/g);return b.length=3,b.join(".")}function c(a){return!!a&&(a=a.toLowerCase())&&(/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(a)||"chrome.plugin"===a.slice(-13))}function d(a){a&&(i=!0,a.version&&(l=b(a.version)),!l&&a.description&&(l=b(a.description)),a.filename&&(k=c(a.filename)))}var e,f,g,i=!1,j=!1,k=!1,l="";if(h.plugins&&h.plugins.length)e=h.plugins["Shockwave Flash"],d(e),h.plugins["Shockwave Flash 2.0"]&&(i=!0,l="2.0.0.11");else if(h.mimeTypes&&h.mimeTypes.length)g=h.mimeTypes["application/x-shockwave-flash"],e=g&&g.enabledPlugin,d(e);else if("undefined"!=typeof a){j=!0;try{f=new a("ShockwaveFlash.ShockwaveFlash.7"),i=!0,l=b(f.GetVariable("$version"))}catch(m){try{f=new a("ShockwaveFlash.ShockwaveFlash.6"),i=!0,l="6.0.21"}catch(n){try{f=new a("ShockwaveFlash.ShockwaveFlash"),i=!0,l=b(f.GetVariable("$version"))}catch(o){j=!1}}}}N.disabled=i!==!0,N.outdated=l&&r(l)<r(O),N.version=l||"0.0.0",N.pluginType=k?"pepper":j?"activex":i?"netscape":"unknown"};Ub(o),Tb(!0);var Vb=function(){return this instanceof Vb?void("function"==typeof Vb._createClient&&Vb._createClient.apply(this,z(arguments))):new Vb};v(Vb,"version",{value:"2.2.0",writable:!1,configurable:!0,enumerable:!0}),Vb.config=function(){return $.apply(this,z(arguments))},Vb.state=function(){return _.apply(this,z(arguments))},Vb.isFlashUnusable=function(){return ab.apply(this,z(arguments))},Vb.on=function(){return bb.apply(this,z(arguments))},Vb.off=function(){return cb.apply(this,z(arguments))},Vb.handlers=function(){return db.apply(this,z(arguments))},Vb.emit=function(){return eb.apply(this,z(arguments))},Vb.create=function(){return fb.apply(this,z(arguments))},Vb.destroy=function(){return gb.apply(this,z(arguments))},Vb.setData=function(){return hb.apply(this,z(arguments))},Vb.clearData=function(){return ib.apply(this,z(arguments))},Vb.getData=function(){return jb.apply(this,z(arguments))},Vb.focus=Vb.activate=function(){return kb.apply(this,z(arguments))},Vb.blur=Vb.deactivate=function(){return lb.apply(this,z(arguments))},Vb.activeElement=function(){return mb.apply(this,z(arguments))};var Wb=0,Xb={},Yb=0,Zb={},$b={};A(Z,{autoActivate:!0});var _b=function(a){var b=this;b.id=""+Wb++,Xb[b.id]={instance:b,elements:[],handlers:{}},a&&b.clip(a),Vb.on("*",function(a){return b.emit(a)}),Vb.on("destroy",function(){b.destroy()}),Vb.create()},ac=function(a,d){var e,f,g,h={},i=Xb[this.id],j=i&&i.handlers;if(!i)throw new Error("Attempted to add new listener(s) to a destroyed ZeroClipboard client instance");if("string"==typeof a&&a)g=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof d)for(e in a)w.call(a,e)&&"string"==typeof e&&e&&"function"==typeof a[e]&&this.on(e,a[e]);if(g&&g.length){for(e=0,f=g.length;f>e;e++)a=g[e].replace(/^on/,""),h[a]=!0,j[a]||(j[a]=[]),j[a].push(d);if(h.ready&&N.ready&&this.emit({type:"ready",client:this}),h.error){for(e=0,f=W.length;f>e;e++)if(N[W[e].replace(/^flash-/,"")]){this.emit({type:"error",name:W[e],client:this});break}c!==b&&Vb.version!==c&&this.emit({type:"error",name:"version-mismatch",jsVersion:Vb.version,swfVersion:c})}}return this},bc=function(a,b){var c,d,e,f,g,h=Xb[this.id],i=h&&h.handlers;if(!i)return this;if(0===arguments.length)f=u(i);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)w.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&this.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),g=i[a],g&&g.length)if(b)for(e=g.indexOf(b);-1!==e;)g.splice(e,1),e=g.indexOf(b,e);else g.length=0;return this},cc=function(a){var b=null,c=Xb[this.id]&&Xb[this.id].handlers;return c&&(b="string"==typeof a&&a?c[a]?c[a].slice(0):[]:B(c)),b},dc=function(a){if(ic.call(this,a)){"object"==typeof a&&a&&"string"==typeof a.type&&a.type&&(a=A({},a));var b=A({},ob(a),{client:this});jc.call(this,b)}return this},ec=function(a){if(!Xb[this.id])throw new Error("Attempted to clip element(s) to a destroyed ZeroClipboard client instance");a=kc(a);for(var b=0;b<a.length;b++)if(w.call(a,b)&&a[b]&&1===a[b].nodeType){a[b].zcClippingId?-1===Zb[a[b].zcClippingId].indexOf(this.id)&&Zb[a[b].zcClippingId].push(this.id):(a[b].zcClippingId="zcClippingId_"+Yb++,Zb[a[b].zcClippingId]=[this.id],Z.autoActivate===!0&&lc(a[b]));var c=Xb[this.id]&&Xb[this.id].elements;-1===c.indexOf(a[b])&&c.push(a[b])}return this},fc=function(a){var b=Xb[this.id];if(!b)return this;var c,d=b.elements;a="undefined"==typeof a?d.slice(0):kc(a);for(var e=a.length;e--;)if(w.call(a,e)&&a[e]&&1===a[e].nodeType){for(c=0;-1!==(c=d.indexOf(a[e],c));)d.splice(c,1);var f=Zb[a[e].zcClippingId];if(f){for(c=0;-1!==(c=f.indexOf(this.id,c));)f.splice(c,1);0===f.length&&(Z.autoActivate===!0&&mc(a[e]),delete a[e].zcClippingId)}}return this},gc=function(){var a=Xb[this.id];return a&&a.elements?a.elements.slice(0):[]},hc=function(){Xb[this.id]&&(this.unclip(),this.off(),delete Xb[this.id])},ic=function(a){if(!a||!a.type)return!1;if(a.client&&a.client!==this)return!1;var b=Xb[this.id],c=b&&b.elements,d=!!c&&c.length>0,e=!a.target||d&&-1!==c.indexOf(a.target),f=a.relatedTarget&&d&&-1!==c.indexOf(a.relatedTarget),g=a.client&&a.client===this;return b&&(e||f||g)?!0:!1},jc=function(a){var b=Xb[this.id];if("object"==typeof a&&a&&a.type&&b){var c=rb(a),d=b&&b.handlers["*"]||[],e=b&&b.handlers[a.type]||[],g=d.concat(e);if(g&&g.length){var h,i,j,k,l,m=this;for(h=0,i=g.length;i>h;h++)j=g[h],k=m,"string"==typeof j&&"function"==typeof f[j]&&(j=f[j]),"object"==typeof j&&j&&"function"==typeof j.handleEvent&&(k=j,j=j.handleEvent),"function"==typeof j&&(l=A({},a),sb(j,k,[l],c))}}},kc=function(a){return"string"==typeof a&&(a=[]),"number"!=typeof a.length?[a]:a},lc=function(a){if(a&&1===a.nodeType){var b=function(a){(a||(a=f.event))&&("js"!==a._source&&(a.stopImmediatePropagation(),a.preventDefault()),delete a._source)},c=function(c){(c||(c=f.event))&&(b(c),Vb.focus(a))};a.addEventListener("mouseover",c,!1),a.addEventListener("mouseout",b,!1),a.addEventListener("mouseenter",b,!1),a.addEventListener("mouseleave",b,!1),a.addEventListener("mousemove",b,!1),$b[a.zcClippingId]={mouseover:c,mouseout:b,mouseenter:b,mouseleave:b,mousemove:b}}},mc=function(a){if(a&&1===a.nodeType){var b=$b[a.zcClippingId];if("object"==typeof b&&b){for(var c,d,e=["move","leave","enter","out","over"],f=0,g=e.length;g>f;f++)c="mouse"+e[f],d=b[c],"function"==typeof d&&a.removeEventListener(c,d,!1);delete $b[a.zcClippingId]}}};Vb._createClient=function(){_b.apply(this,z(arguments))},Vb.prototype.on=function(){return ac.apply(this,z(arguments))},Vb.prototype.off=function(){return bc.apply(this,z(arguments))},Vb.prototype.handlers=function(){return cc.apply(this,z(arguments))},Vb.prototype.emit=function(){return dc.apply(this,z(arguments))},Vb.prototype.clip=function(){return ec.apply(this,z(arguments))},Vb.prototype.unclip=function(){return fc.apply(this,z(arguments))},Vb.prototype.elements=function(){return gc.apply(this,z(arguments))},Vb.prototype.destroy=function(){return hc.apply(this,z(arguments))},Vb.prototype.setText=function(a){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData("text/plain",a),this},Vb.prototype.setHtml=function(a){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData("text/html",a),this},Vb.prototype.setRichText=function(a){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData("application/rtf",a),this},Vb.prototype.setData=function(){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData.apply(this,z(arguments)),this},Vb.prototype.clearData=function(){if(!Xb[this.id])throw new Error("Attempted to clear pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.clearData.apply(this,z(arguments)),this},Vb.prototype.getData=function(){if(!Xb[this.id])throw new Error("Attempted to get pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.getData.apply(this,z(arguments))},"function"==typeof define&&define.amd?define(function(){return Vb}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?module.exports=Vb:a.ZeroClipboard=Vb}(function(){return this||window}());
//# sourceMappingURL=ZeroClipboard.min.map
;/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */

(function($) {
    "use strict";
    /*global window, document, jQuery */

    if (window.TWCCHistory !== undefined) {
        return;
    }

    var instance,
    init = function(opts) {

        var _options = $.extend(true, {}, opts),
            _array,
            _index,
            _enabled = true,
            _cookieName = _options.system.historyCookie,
            _min = 0,
            _max = _options.system.historyLimit;

        function _cleanWgs84(obj) {
            var wgs84, idx;
            if(obj === null || typeof(obj) != 'object') return obj;
            wgs84 = obj.constructor();
            for (idx in obj) {
                if (obj.hasOwnProperty(idx)) wgs84[idx] = _cleanWgs84(obj[idx]);
            }
            return wgs84;
        }
        function _importArray() {
            _array = _options.utils.getCookieContent(_cookieName);
            if ($.isEmptyObject(_array)) {
                _array = [];
            }
            _setIndexAt(_getMaxPosition());
        }
        function _getArray() {
            return _array;
        }
        function _exportArray() {
            _options.utils.setCookieContent(_cookieName, _getArray());
        }
        function _setArray(value) {
            _array = value;
        }
        function _toggle(enabled) {
            _enabled = enabled;
        }
        function _getMaxPosition() {
            return _getArray().length - 1;
        }
        function _setIndexAt(idx) {
            _index = Math.min(Math.abs(idx), _max);
            _options.utils.trigger($('body'), 'history.indexchanged', {
                currentIndex: idx,
                maxIndex: _getMaxPosition(),
                currentValue: _getCurrentValue()
            });
        }
        function _resetIndex() {
            _setIndexAt(_getMaxPosition());
        }
        function _getCurrentValue() {
            return _getArray()[_index];
        }
        function _push(value) {
            _array.push(value);
        }
        function _moveTo(idx) {
            _setIndexAt(idx);
            return _getCurrentValue();
        }
        function _sliceContent() {
            _setArray(_getArray().slice(_min, _index+1));
        }
        function _limit() {
            _setArray(_getArray().slice(-_max));
        }
        function _add(value) {
            if (_enabled && value) {
                value.wgs84 = _cleanWgs84(value.wgs84);
                if (JSON.stringify(value) !== JSON.stringify(_getCurrentValue())) {
                    _sliceContent();
                    _push(value);
                    _limit();
                    _resetIndex();
                    _exportArray();
                }
            }
        }
        function _moveToPrevious() {
            if (_index > _min) {
                return _moveTo(_index - 1);
            } else {
                return _getCurrentValue();
            }
        }
        function _moveToNext() {
            if (_index < _getMaxPosition()) {
                return _moveTo(_index + 1);
            } else {
                return _getCurrentValue();
            }
        }

        function _init() {
            _importArray();
        }

        _init();
        return {
            toggle: _toggle,
            isEnabled: function() {return _enabled;},
            add: _add,
            moveToPrevious: _moveToPrevious,
            moveToNext: _moveToNext,
            getCurrentValue: _getCurrentValue
        };
    };

    // exports
    window.TWCCHistory = {
        getInstance: function (opts) {
            instance = instance || init(opts);
            return instance;
        }
    };
})(jQuery);;/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */


(function($, App) {
    "use strict";
    /*global window, jQuery, App */

    var _converterWidget, _wmm,
        _cityLocations = App.locations.capitals;

    $.fn.extend({
        // Return a stack sorted
        sort: function() {
            return this.pushStack([].sort.apply(this, arguments), []);
        },
        //Return options sorted
        sortOptions: function(sortCallback) {
            jQuery('option', this).sort(sortCallback).appendTo(this);
            return this;
        },
        // Return groups sorted
        sortGroups: function(sortCallback) {
            jQuery('optgroup', this).sort(sortCallback).appendTo(this);
            return this;
        },
        // Return the selected node with its options sorted by text (ASC)
        sortOptionsByText: function() {
            return this.sortOptions(function(x, y) {
                var xText = jQuery(x).text().toUpperCase(),
                    yText = jQuery(y).text().toUpperCase();
                return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;
            });
        },
        // Return the selected node with its options sorted by text (ASC)
        sortOptgroupsByLabel: function() {
            return this.sortGroups(function(x, y) {
                var xText = jQuery(x).prop('label').toUpperCase(),
                    yText = jQuery(y).prop('label').toUpperCase();
                return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;
            });
        },
        // Return the selected node with its options sorted by text (ASC)
        sortGrpsNOptionsByText: function() {
            var me = this;
            $('optgroup', this).each(function(idx) {
                $('optgroup:eq(' + idx + ')', me).sortOptionsByText();
            });
            return this.sortOptgroupsByLabel();
        },
        // Get a cross domain content through a proxy (GET method only)
        getXDomain: function(options) {
            var proxy = App.system.httpServer + '/' + App.system.dirWsIncludes + 'proxy.php',
                params = options.data ? '?' + $.param(options.data, true) : '';
            return $.ajax($.extend({
                dataType: 'script'
            }, options, {
                url: proxy,
                cache: true,
                data: {u: options.url + params}
            }));
        }
    });

    function _newDeferred(processName, timeOutMs, retryNumber) {
        var dfd = new $.Deferred(function() {
            _trigger($('body'), 'main.start', processName);
        });
        timeOutMs = timeOutMs || App.system.timeout;
        retryNumber = retryNumber || 0;
        // Reject when taking too long
        setTimeout(function timingOut() {
            if (retryNumber > 0) {
                retryNumber--;
                dfd.notify("retry");
                setTimeout(timingOut, timeOutMs);
            } else {
                dfd.reject(processName+" timed out");
            }
        }, timeOutMs);
        // Send loading message every half-second
        setTimeout(function loading() {
            if (dfd.state() === "pending") {
                dfd.notify(processName+" pending");
                setTimeout(loading, 500);
            }
        }, 1);
        _addToQueue(dfd, processName);
        return dfd;
    }

    function _addToQueue(dfd, processName) {
        $.when(dfd).then(
            function() {
                _trigger($('body'), 'main.succeeded', processName);
            },
            function() {
                _trigger($('body'), 'main.failed', processName);
            },
            function() {
                _trigger($('body'), 'main.progress', processName);
            }
        );
    }

    function _t(translationName) {
        return App.translations.hasOwnProperty(translationName) ? App.translations[translationName] : translationName;
    }

    function _trigger($anchor, eventName, data) {
        $anchor.trigger(eventName, {data: data});
    }

    function _codeAddress(geocoderService, address) {
        if (_isW3WCoordinates(address)) {
            var sourceSrsCode = 'W3wConnector',
                coordinates = _isCsvMode() ? [{x: address}] : {x: address};
            _converterWidget.pushPullSource('selection', sourceSrsCode);
            _converterWidget.pushPullSource('value', coordinates);
            _converterWidget.transform({target:'source'});
        } else {
            geocoderService.geocode({address: address, language: App.context.languageCode}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    _transformGLatlng(results[0].geometry.location);
                } else {
                    alert(_t('geocoderFailed') + status);
                }
            });
        }
    }

    function _isW3WCoordinates(input) {
      var a = /^[a-zA-Z\u00C0-\u017F]+\.[a-zA-Z\u00C0-\u017F]+\.[a-zA-Z\u00C0-\u017F]+$/.test(input),
          b = /^\*[a-z]+$/.test(input);
      return a || b;
    }

    function _sendMsg(b, f, c) {
        var t, u;
        f = f ? f : App.system.applicationNoreply;
        u = App.system.httpServer + '/' + App.system.dirWsIncludes+'s.php';
        t = $.ajax({type:'POST', url:u, async:false, cache:false, data:'ff=g'}).responseText;
        if(t.length<10) {
            alert(_t('messageNotSent')+t);
            return false;
        } else {
            _setCookie(App.system.tokenName,t);
            $.post(u, {ff: 'd', f: f, b: b, l: App.context.languageCode}, function(code) { if(typeof(c) == 'function') c(code); });
            return true;
        }
    }

    function _setCookieParam(name, id, value, expires) {
        var cookieContent = _getCookieContent(name);
        cookieContent[id] = value;
        _setCookieContent(name, cookieContent, expires);
    }

    function _getCookieParam(name, id) {
        var cookieContent = _getCookieContent(name);
        return cookieContent[id];
    }

    function _setCookieContent(name, content, expires) {
        _setCookie(name, JSON.stringify(content), expires);
    }

    function _getCookieContent(name) {
        var cookieString = _getCookie(name);
        return cookieString ? $.parseJSON(_getCookie(name)) : {};
    }

    function _getCookie(name) {
        return $.cookie(name);
    }

    function _setCookie(name, content, expires) {
        expires = expires || 30;
        $.cookie(name, content, {expires:expires});
    }

    function _addOptionToSelect(groupLabel, srsCode, $select, definitionString) {
        var definition = proj4.defs(srsCode),
            label = definition ? definition.title || srsCode : _getTitleFromDefinitionString(definitionString, srsCode),
            optgroupSelector = 'optgroup[label="' + groupLabel + '"]';
        if (!$select.find(optgroupSelector).length) {
            $select.append($('<optgroup>', {label:groupLabel}));
        }
        $select.find(optgroupSelector).append($('<option>', {val:srsCode, text:label}));
    }

    function _getDirectUrl() {
        var wgs84 = _getWgs84(),
            url = App.system.httpServer + '/' + App.context.languageCode + '/';
        url += '?sc='+encodeURI(encodeURIComponent(_getSourceSrsCode()));
        url += '&dc='+encodeURI(encodeURIComponent(_getDestinationSrsCode()));
        url += '&wgs84='+encodeURI(encodeURIComponent(wgs84[0].x+','+wgs84[0].y));
        url += '&z='+_getZoom();
        url += '&mt='+_getMapTypeId();
        url += '#donate';
        /*url += _getMapTypeId() + '/';
        url += _getZoom() + '/';
        url += encodeURI(encodeURIComponent(_getSourceSrsCode())) + '/';
        url += encodeURI(encodeURIComponent(_getDestinationSrsCode())) + '/';
        url += wgs84[0].x + '/';
        url += wgs84[0].y + '/';*/
        return url;
    }

    function _setMapControls(map, createControl) {
        var spareCss = {
            width:'50%',
            height:_getHeaderHeightString()
        };
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(createControl({
            'class': 'spare',
            css: spareCss
        }));
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(createControl({
            'class': 'spare',
            css: spareCss
        }));
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(createControl({
            content: $('#license')
        }));
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(createControl({
            content: $('#c-container')
        }));
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(createControl({
            content: $('#o-container')
        }));
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(createControl({
            fkidx: 2,
            content: $('#d-container')
        }));
        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(createControl({
            content: $('#converter')
        }));
        if (App.context.isDevEnv) {
            var style = 'width:200px;background-color:red;margin-left:4px;padding:2px;text-align:center;',
                text = 'GOOGLE ADS',
                className = 'trsp-panel';
            map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(createControl({
                content: $('<div>', {style: style+'height:90px;', text: text, class: className+' ui-corner-bottom'})
            }));
            map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(createControl({
                content: $('<div>', {style: style+'height:200px;', text: text, class: className+' ui-corner-top'})
            }));
        }
    }

    function _setMapListeners(map, geocoderService, toggleRightClick, isRightClickEnabled) {
        var $body = $('body'),
            $map = $('#map');
        $body.on('mouseover', '#converter', function () {
            map.setOptions({scrollwheel:false});
            toggleRightClick(false);
        });
        $body.on('mouseout', '#converter', function () {
            map.setOptions({scrollwheel:true});
            toggleRightClick(true);
        });
        $('#view-map').click(function(event) {
            event.preventDefault();
            _codeAddress(geocoderService, $('#find-location').val());
        });
        $map.bind('polyline.editend', function (evt, response) {
            _transformGLatlngArray(response.data);
        });
        $map.bind('map.click', function(evt, response) {
            _transformGLatlng(response.data.latLng);
        });
        $map.bind('marker.dragend', function(evt, response) {
            _transformGLatlng(response.data);
        });
        $map.bind('map.rightclick', function (evt, response) {
            if (_isCsvMode() && isRightClickEnabled) {
                var wgs84 = _getWgs84();
                wgs84.push(_gLatlngToXy(response.data.latLng));
                _transformWgs84Array(wgs84);
            }
        });
        $map.bind('place.changed', function (evt, response) {
            var place = response.data;
            if (place.geometry) {
                _transformGLatlng(place.geometry.location);
            }
        });
    }

    function _getHeaderHeightString() {
        var height = $('#h-container').height();
        height = height > 85 ? 69 : height;
        return height +'px';
    }

    function _getTitleFromDefinitionString(definitionString, srsCode) {
        var testReg = /\+title=/ig,
            replaceReg = /.*\+title=([^\+]+).*/ig;
        return testReg.test(definitionString) ? definitionString.replace(replaceReg, '$1') : srsCode;
    }

    function _getStaticMapUrl() {
        var staticMapURL = "http://maps.googleapis.com/maps/api/staticmap?",
            wgs84 = _getWgs84();
        staticMapURL += "&zoom=" + _getZoom();
        staticMapURL += "&size=640x640";
        staticMapURL += "&visual_refresh=true";
        staticMapURL += "&maptype=" + _getMapTypeId();
        staticMapURL += "&language=" + App.context.languageCode;
        if (wgs84.length == 1) {
            staticMapURL += "&markers=" + wgs84[0].y + "," + wgs84[0].x;
        } else {
            var tmp = [];
            $.each(wgs84, function(index, value) {
                tmp.push(value.y + "," + value.x);
            });
            staticMapURL += "&path=geodesic:true|" + tmp.join("|");
        }
        staticMapURL += "&sensor=false";
        return staticMapURL;
    }

    function _openStaticMap() {
        window.open(_getStaticMapUrl(), '_blank');
    }

    function _getRandomCityLocation() {
        var idx = App.math.getRandomInteger(0, _cityLocations.length-1),
            x = _cityLocations[idx].lng,
            y = _cityLocations[idx].lat;
        return {x: x, y: y};
    }

    function _getWgs84() {
        return _converterWidget.wgs84().slice();
    }

    function _transformGLatlngArray(gLatlngArray) {
        var wgs84 = [];
        $.each(gLatlngArray, function(index, gLatlng) {
            wgs84.push(_gLatlngToXy(gLatlng));
        });
        _transformWgs84Array(wgs84);
    }

    function _transformGLatlng(gLatlng) {
        _transformWgs84Array([_gLatlngToXy(gLatlng)]);
    }

    function _transformWgs84Array(wgs84) {
        _converterWidget.transform({wgs84:wgs84});
    }

    function _gLatlngToXy(gLatlng) {
        return {x: gLatlng.lng(), y: gLatlng.lat()};
    }

    function _getSourceSrsCode() {
        return _converterWidget.pushPullSource('selection');
    }

    function _getDestinationSrsCode() {
        return _converterWidget.pushPullDestination('selection');
    }

    function _isCsvMode() {
        return _converterWidget.csv();
    }

    function _getConvergenceConvention() {
        return App.TWCCUi.getConvergenceConvention();
    }

    function _getZoom() {
        return App.map.getZoom();
    }

    function _getMapTypeId() {
        return App.map.getMapTypeId();
    }

    function _enableAutoZoom(enabled) {
        App.TWCCMap.model.setBoolean('autoZoom', enabled);
    }

    function _getWMM() {
        return _wmm;
    }

    function _degToRad(dValue) {
        var rValue;
        switch($.type(dValue)) {
            case 'object':
                rValue = {};
                $.each(dValue, function(target, value) {
                    if (value && $.type(value) !== 'number') {
                        throw 'Wrong data type';
                    }
                    rValue[target] = _degToRad(value);
                });
                break;
            case 'number':
                rValue = $.type(dValue) === 'number' ? dValue*Math.PI/180 : undefined;
                break;
        }
        return rValue;
    }

    function _radToDeg(rValue) {
        return $.type(rValue) === 'number' ? rValue*180/Math.PI : undefined;
    }

    /**
     * Add Utils
     */
    $.extend(App, {
        utils: {
            addOptionToSelect: _addOptionToSelect,
            degToRad: _degToRad,
            enableAutoZoom: _enableAutoZoom,
            getConvergenceConvention: _getConvergenceConvention,
            getCookieContent: _getCookieContent,
            getCookieParam: _getCookieParam,
            getDirectUrl: _getDirectUrl,
            getRandomCityLocation: _getRandomCityLocation,
            getTitleFromDefinitionString: _getTitleFromDefinitionString,
            getWMM: _getWMM,
            newDeferred: _newDeferred,
            openStaticMap: _openStaticMap,
            radToDeg: _radToDeg,
            sendMsg: _sendMsg,
            setCookie: _setCookie,
            setCookieContent: _setCookieContent,
            setCookieParam: _setCookieParam,
            t: _t,
            trigger: _trigger
        }
    });

    /**
     * Add Constants
     */
    $.extend(App, {
        constants: {
            keyboard: {
                RETURN: 13
            }
        }
    });

    /**
     * Add Class generator
     */
    $.extend(App, {
        Class: function(methods) {
            var klass = function() {
                this.initialize.apply(this, arguments);
            };

            for (var property in methods) {
               if (methods.hasOwnProperty(property)) {
                   klass.prototype[property] = methods[property];
               }
            }

            klass.prototype.initialize = klass.prototype.initialize || function(){};

            return klass;
        }
    });

    /**
     * Add Initializers
     */
    $.extend(App, {
        initialisers: {
            initializeMap: function() {
                var _options = $.extend(true, {}, App, App.TWCCMapOptions);
                delete _options.TWCCMapOptions; //Already passed
                App.TWCCMap = TWCCMap.getInstance(_options);
                App.map = App.TWCCMap.getMap();
                _setMapControls(App.map, App.TWCCMap.createControl);
                _setMapListeners(App.map, App.TWCCMap.getGeocoderService(), App.TWCCMap.toggleRightClick, App.TWCCMap.isRightClickEnabled);
                return App.TWCCMap.promise;
            },
            initializeUi: function() {
                var _options = $.extend(true, {}, App);
                App.TWCCUi = TWCCUi.getInstance(_options);
                return App.TWCCUi.promise;
            },
            initializeConverter: function() {
                var _options = $.extend(true, {}, App, App.TWCCConverterOptions);
                delete _options.TWCCConverterOptions; //Already passed
                App.TWCCConverter = TWCCConverter.getInstance(_options);
                _converterWidget = App.TWCCConverter.converterWidget;
                return App.TWCCConverter.promise;
            }
        }
    });

    function _init() {
        var title = '*GPS (WGS84) (deg)',
            wgs84 = {
                title: title,
                defData: '+title=' + title + ' +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees',
                isConnector: false
            };
        if ($.type(Math.sinh) !== "function") {
            Math.sinh = function(z) {
                return (Math.exp(z) - Math.exp(-z))/2;
            };
        }
        $.ajax({
            url: '/js/data/WMM.COF',
            cache: true,
            dataType: 'text'
        }).done(function (cof) {
            _wmm = geoMagFactory(cof2Obj(cof));
        }).fail(function() {
            _wmm = function() { return {}; };
        });
        $.extend(proj4.WGS84, wgs84);
        $.extend(proj4.defs('WGS84'), wgs84);
        var uiPromise = App.initialisers.initializeUi(),
            mapPromise = new $.Deferred().promise();
        uiPromise.done(function() {
            mapPromise = App.initialisers.initializeMap();
        });
        mapPromise.done(function() {
            App.initialisers.initializeConverter().done(function(data) {
                if(App.context.GET.isSetGraticule) {
                    App.TWCCMap.setGraticule();
                }
                _trigger($('body'), 'main.ready', data);
            });
        });
    }

    $(document).ready(_init);
})(jQuery, App);
;(function($, App) {
    "use strict";
    /*global window, jQuery, App */

    function _getRandomInteger(start, end) {
        var x, y, rnd;
        x = end - start;
        y = start;
        rnd = Math.random()*x + y;
        return Math.round(rnd);
    }

    function _round(value, decimals) {
        var valStr;
        decimals = decimals === undefined ? 0 : decimals;
        valStr = value.toString();
        if (valStr === '' || valStr == 'NaN') {
            return '';
        } else {
            return Math.round(_parseFloat(value) * Math.pow(10, _parseFloat(decimals))) / Math.pow(10, _parseFloat(decimals));
        }
    }

    function _parseFloat(value) {
        value = value.toString().replace(/,/gi, '.');
        if (isNaN(value)) value = 0;
        return parseFloat(value);
    }

    /**
     * Add Math to App
     */
    $.extend(App, {
        math: {
            getRandomInteger: _getRandomInteger,
            round: _round,
            parseFloat: _parseFloat
        }
    });
})(jQuery, App);;/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 3.0.1
 *
 * Requires jQuery >= 1.2.6
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.bgiframe = function(s) {
        s = $.extend({
            top         : 'auto', // auto == borderTopWidth
            left        : 'auto', // auto == borderLeftWidth
            width       : 'auto', // auto == offsetWidth
            height      : 'auto', // auto == offsetHeight
            opacity     : true,
            src         : 'javascript:false;',
            conditional : /MSIE 6\.0/.test(navigator.userAgent) // expresion or function. return false to prevent iframe insertion
        }, s);

        // wrap conditional in a function if it isn't already
        if (!$.isFunction(s.conditional)) {
            var condition = s.conditional;
            s.conditional = function() { return condition; };
        }

        var $iframe = $('<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
                           'style="display:block;position:absolute;z-index:-1;"/>');

        return this.each(function() {
            var $this = $(this);
            if ( s.conditional(this) === false ) { return; }
            var existing = $this.children('iframe.bgiframe');
            var $el = existing.length === 0 ? $iframe.clone() : existing;
            $el.css({
                'top': s.top == 'auto' ?
                    ((parseInt($this.css('borderTopWidth'),10)||0)*-1)+'px' : prop(s.top),
                'left': s.left == 'auto' ?
                    ((parseInt($this.css('borderLeftWidth'),10)||0)*-1)+'px' : prop(s.left),
                'width': s.width == 'auto' ? (this.offsetWidth + 'px') : prop(s.width),
                'height': s.height == 'auto' ? (this.offsetHeight + 'px') : prop(s.height),
                'opacity': s.opacity === true ? 0 : undefined
            });

            if ( existing.length === 0 ) {
                $this.prepend($el);
            }
        });
    };

    // old alias
    $.fn.bgIframe = $.fn.bgiframe;

    function prop(n) {
        return n && n.constructor === Number ? n + 'px' : n;
    }

}));
;/*
 * @name BeautyTips
 * @desc a tooltips/baloon-help plugin for jQuery
 *
 * @author Jeff Robbins - Lullabot - http://www.lullabot.com
 * @version 0.9.5 release candidate 1  (5/20/2009)
 */
jQuery.bt={version:'0.9.5-rc1'};;(function($){jQuery.fn.bt=function(content,options){if(typeof content!='string'){var contentSelect=true;options=content;content=false;}
else{var contentSelect=false;}
if(jQuery.fn.hoverIntent&&jQuery.bt.defaults.trigger=='hover'){jQuery.bt.defaults.trigger='hoverIntent';}
return this.each(function(index){var opts=jQuery.extend(false,jQuery.bt.defaults,jQuery.bt.options,options);opts.spikeLength=numb(opts.spikeLength);opts.spikeGirth=numb(opts.spikeGirth);opts.overlap=numb(opts.overlap);var ajaxTimeout=false;if(opts.killTitle){$(this).find('[title]').addBack().each(function(){if(!$(this).prop('bt-xTitle')){$(this).prop('bt-xTitle',$(this).prop('title')).prop('title','');}});}
if(typeof opts.tpropigger=='string'){opts.trigger=[opts.trigger];}
if(opts.trigger[0]=='hoverIntent'){var hoverOpts=jQuery.extend(opts.hoverIntentOpts,{over:function(){this.btOn();},out:function(){this.btOff();}});$(this).hoverIntent(hoverOpts);}
else if(opts.trigger[0]=='hover'){$(this).hover(function(){this.btOn();},function(){this.btOff();});}
else if(opts.trigger[0]=='now'){if($(this).hasClass('bt-active')){this.btOff();}
else{this.btOn();}}
else if(opts.trigger[0]=='none'){}
else if(opts.trigger.length>1&&opts.trigger[0]!=opts.trigger[1]){$(this).bind(opts.trigger[0],function(){this.btOn();}).bind(opts.trigger[1],function(){this.btOff();});}
else{$(this).bind(opts.trigger[0],function(){if($(this).hasClass('bt-active')){this.btOff();}
else{this.btOn();}});}
this.btOn=function(){if(typeof $(this).data('bt-box')=='object'){this.btOff();}
opts.preBuild.apply(this);$(jQuery.bt.vars.closeWhenOpenStack).btOff();$(this).addClass('bt-active '+opts.activeClass);if(contentSelect&&opts.ajaxPath==null){if(opts.killTitle){$(this).prop('title',$(this).prop('bt-xTitle'));}
content=$.isFunction(opts.contentSelector)?opts.contentSelector.apply(this):eval(opts.contentSelector);if(opts.killTitle){$(this).prop('title','');}}
if(opts.ajaxPath!=null&&content==false){if(typeof opts.ajaxPath=='object'){var url=eval(opts.ajaxPath[0]);url+=opts.ajaxPath[1]?' '+opts.ajaxPath[1]:'';}
else{var url=opts.ajaxPath;}
var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}
var cacheData=opts.ajaxCache?$(document.body).data('btCache-'+url.replace(/\./g,'')):null;if(typeof cacheData=='string'){content=selector?$("<div/>").append(cacheData.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):cacheData;}
else{var target=this;var ajaxOpts=jQuery.extend(false,{type:opts.ajaxType,data:opts.ajaxData,cache:opts.ajaxCache,url:url,complete:function(XMLHttpRequest,textStatus){if(textStatus=='success'||textStatus=='notmodified'){if(opts.ajaxCache){$(document.body).data('btCache-'+url.replace(/\./g,''),XMLHttpRequest.responseText);}
ajaxTimeout=false;content=selector?$("<div/>").append(XMLHttpRequest.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):XMLHttpRequest.responseText;}
else{if(textStatus=='timeout'){ajaxTimeout=true;}
content=opts.ajaxError.replace(/%error/g,XMLHttpRequest.statusText);}
if($(target).hasClass('bt-active')){target.btOn();}}},opts.ajaxOpts);jQuery.ajax(ajaxOpts);content=opts.ajaxLoading;}}
var shadowMarginX=0;var shadowMarginY=0;var shadowShiftX=0;var shadowShiftY=0;if(opts.shadow&&!shadowSupport()){opts.shadow=false;jQuery.extend(opts,opts.noShadowOpts);}
if(opts.shadow){if(opts.shadowBlur>Math.abs(opts.shadowOffsetX)){shadowMarginX=opts.shadowBlur*2;}
else{shadowMarginX=opts.shadowBlur+Math.abs(opts.shadowOffsetX);}
shadowShiftX=(opts.shadowBlur-opts.shadowOffsetX)>0?opts.shadowBlur-opts.shadowOffsetX:0;if(opts.shadowBlur>Math.abs(opts.shadowOffsetY)){shadowMarginY=opts.shadowBlur*2;}
else{shadowMarginY=opts.shadowBlur+Math.abs(opts.shadowOffsetY);}
shadowShiftY=(opts.shadowBlur-opts.shadowOffsetY)>0?opts.shadowBlur-opts.shadowOffsetY:0;}
if(opts.offsetParent){var offsetParent=$(opts.offsetParent);var offsetParentPos=offsetParent.offset();var pos=$(this).offset();var top=numb(pos.top)-numb(offsetParentPos.top)+numb($(this).css('margin-top'))-shadowShiftY;var left=numb(pos.left)-numb(offsetParentPos.left)+numb($(this).css('margin-left'))-shadowShiftX;}
else{var offsetParent=($(this).css('position')=='absolute')?$(this).parents().eq(0).offsetParent():$(this).offsetParent();var pos=$(this).btPosition();var top=numb(pos.top)+numb($(this).css('margin-top'))-shadowShiftY;var left=numb(pos.left)+numb($(this).css('margin-left'))-shadowShiftX;}
var width=$(this).btOuterWidth();var height=$(this).outerHeight();if(typeof content=='object'){if(content==null){return;}
var original=content;var clone=$(original).clone(true).show();var origClones=$(original).data('bt-clones')||[];origClones.push(clone);$(original).data('bt-clones',origClones);$(clone).data('bt-orig',original);$(this).data('bt-content-orig',{original:original,clone:clone});content=clone;}
if(typeof content=='null'||content==''){return;}
var $text=$('<div class="bt-content"></div>').append(content).css({padding:opts.padding,position:'absolute',width:(opts.shrinkToFit?'auto':opts.width),zIndex:opts.textzIndex,left:shadowShiftX,top:shadowShiftY}).css(opts.cssStyles);var $box=$('<div class="bt-wrapper"></div>').append($text).addClass(opts.cssClass).css({position:'absolute',width:opts.width,zIndex:opts.wrapperzIndex,visibility:'hidden'}).appendTo(offsetParent);if(jQuery.fn.bgiframe){$text.bgiframe();$box.bgiframe();}
$(this).data('bt-box',$box);var scrollTop=numb($(document).scrollTop());var scrollLeft=numb($(document).scrollLeft());var docWidth=numb($(window).width());var docHeight=numb($(window).height());var winRight=scrollLeft+docWidth;var winBottom=scrollTop+docHeight;var space=new Object();var thisOffset=$(this).offset();space.top=thisOffset.top-scrollTop;space.bottom=docHeight-((thisOffset+height)-scrollTop);space.left=thisOffset.left-scrollLeft;space.right=docWidth-((thisOffset.left+width)-scrollLeft);var textOutHeight=numb($text.outerHeight());var textOutWidth=numb($text.btOuterWidth());if(opts.positions.constructor==String){opts.positions=opts.positions.replace(/ /,'').split(',');}
if(opts.positions[0]=='most'){var position='top';for(var pig in space){position=space[pig]>space[position]?pig:position;}}
else{for(var x in opts.positions){var position=opts.positions[x];if((position=='left'||position=='right')&&space[position]>textOutWidth+opts.spikeLength){break;}
else if((position=='top'||position=='bottom')&&space[position]>textOutHeight+opts.spikeLength){break;}}}
var horiz=left+((width-textOutWidth)*.5);var vert=top+((height-textOutHeight)*.5);var points=new Array();var textTop,textLeft,textRight,textBottom,textTopSpace,textBottomSpace,textLeftSpace,textRightSpace,crossPoint,textCenter,spikePoint;switch(position){case'top':$text.css('margin-bottom',opts.spikeLength+'px');$box.css({top:(top-$text.outerHeight(true))+opts.overlap,left:horiz});textRightSpace=(winRight-opts.windowMargin)-($text.offset().left+$text.btOuterWidth(true));var xShift=shadowShiftX;if(textRightSpace<0){$box.css('left',(numb($box.css('left'))+textRightSpace)+'px');xShift-=textRightSpace;}
textLeftSpace=($text.offset().left+numb($text.css('margin-left')))-(scrollLeft+opts.windowMargin);if(textLeftSpace<0){$box.css('left',(numb($box.css('left'))-textLeftSpace)+'px');xShift+=textLeftSpace;}
textTop=$text.btPosition().top+numb($text.css('margin-top'));textLeft=$text.btPosition().left+numb($text.css('margin-left'));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={y:textBottom+opts.spikeLength,x:((textRight-textLeft)*.5)+xShift,type:'spike'};crossPoint=findIntersectX(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textBottom);crossPoint.x=crossPoint.x<textLeft+opts.spikeGirth/2+opts.cornerRadius?textLeft+opts.spikeGirth/2+opts.cornerRadius:crossPoint.x;crossPoint.x=crossPoint.x>(textRight-opts.spikeGirth/2)-opts.cornerRadius?(textRight-opts.spikeGirth/2)-opts.CornerRadius:crossPoint.x;points[points.length]={x:crossPoint.x-(opts.spikeGirth/2),y:textBottom,type:'join'};points[points.length]={x:textLeft,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textBottom,type:'corner'};points[points.length]={x:crossPoint.x+(opts.spikeGirth/2),y:textBottom,type:'join'};points[points.length]=spikePoint;break;case'left':$text.css('margin-right',opts.spikeLength+'px');$box.css({top:vert+'px',left:((left-$text.btOuterWidth(true))+opts.overlap)+'px'});textBottomSpace=(winBottom-opts.windowMargin)-($text.offset().top+$text.outerHeight(true));var yShift=shadowShiftY;if(textBottomSpace<0){$box.css('top',(numb($box.css('top'))+textBottomSpace)+'px');yShift-=textBottomSpace;}
textTopSpace=($text.offset().top+numb($text.css('margin-top')))-(scrollTop+opts.windowMargin);if(textTopSpace<0){$box.css('top',(numb($box.css('top'))-textTopSpace)+'px');yShift+=textTopSpace;}
textTop=$text.btPosition().top+numb($text.css('margin-top'));textLeft=$text.btPosition().left+numb($text.css('margin-left'));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:textRight+opts.spikeLength,y:((textBottom-textTop)*.5)+yShift,type:'spike'};crossPoint=findIntersectY(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textRight);crossPoint.y=crossPoint.y<textTop+opts.spikeGirth/2+opts.cornerRadius?textTop+opts.spikeGirth/2+opts.cornerRadius:crossPoint.y;crossPoint.y=crossPoint.y>(textBottom-opts.spikeGirth/2)-opts.cornerRadius?(textBottom-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.y;points[points.length]={x:textRight,y:crossPoint.y+opts.spikeGirth/2,type:'join'};points[points.length]={x:textRight,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textTop,type:'corner'};points[points.length]={x:textRight,y:crossPoint.y-opts.spikeGirth/2,type:'join'};points[points.length]=spikePoint;break;case'bottom':$text.css('margin-top',opts.spikeLength+'px');$box.css({top:(top+height)-opts.overlap,left:horiz});textRightSpace=(winRight-opts.windowMargin)-($text.offset().left+$text.btOuterWidth(true));var xShift=shadowShiftX;if(textRightSpace<0){$box.css('left',(numb($box.css('left'))+textRightSpace)+'px');xShift-=textRightSpace;}
textLeftSpace=($text.offset().left+numb($text.css('margin-left')))-(scrollLeft+opts.windowMargin);if(textLeftSpace<0){$box.css('left',(numb($box.css('left'))-textLeftSpace)+'px');xShift+=textLeftSpace;}
textTop=$text.btPosition().top+numb($text.css('margin-top'));textLeft=$text.btPosition().left+numb($text.css('margin-left'));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:((textRight-textLeft)*.5)+xShift,y:shadowShiftY,type:'spike'};crossPoint=findIntersectX(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textTop);crossPoint.x=crossPoint.x<textLeft+opts.spikeGirth/2+opts.cornerRadius?textLeft+opts.spikeGirth/2+opts.cornerRadius:crossPoint.x;crossPoint.x=crossPoint.x>(textRight-opts.spikeGirth/2)-opts.cornerRadius?(textRight-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.x;points[points.length]={x:crossPoint.x+opts.spikeGirth/2,y:textTop,type:'join'};points[points.length]={x:textRight,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textTop,type:'corner'};points[points.length]={x:crossPoint.x-(opts.spikeGirth/2),y:textTop,type:'join'};points[points.length]=spikePoint;break;case'right':$text.css('margin-left',(opts.spikeLength+'px'));$box.css({top:vert+'px',left:((left+width)-opts.overlap)+'px'});textBottomSpace=(winBottom-opts.windowMargin)-($text.offset().top+$text.outerHeight(true));var yShift=shadowShiftY;if(textBottomSpace<0){$box.css('top',(numb($box.css('top'))+textBottomSpace)+'px');yShift-=textBottomSpace;}
textTopSpace=($text.offset().top+numb($text.css('margin-top')))-(scrollTop+opts.windowMargin);if(textTopSpace<0){$box.css('top',(numb($box.css('top'))-textTopSpace)+'px');yShift+=textTopSpace;}
textTop=$text.btPosition().top+numb($text.css('margin-top'));textLeft=$text.btPosition().left+numb($text.css('margin-left'));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:shadowShiftX,y:((textBottom-textTop)*.5)+yShift,type:'spike'};crossPoint=findIntersectY(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textLeft);crossPoint.y=crossPoint.y<textTop+opts.spikeGirth/2+opts.cornerRadius?textTop+opts.spikeGirth/2+opts.cornerRadius:crossPoint.y;crossPoint.y=crossPoint.y>(textBottom-opts.spikeGirth/2)-opts.cornerRadius?(textBottom-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.y;points[points.length]={x:textLeft,y:crossPoint.y-opts.spikeGirth/2,type:'join'};points[points.length]={x:textLeft,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:crossPoint.y+opts.spikeGirth/2,type:'join'};points[points.length]=spikePoint;break;}
var canvas=document.createElement('canvas');$(canvas).prop('width',(numb($text.btOuterWidth(true))+opts.strokeWidth*2+shadowMarginX)).prop('height',(numb($text.outerHeight(true))+opts.strokeWidth*2+shadowMarginY)).appendTo($box).css({position:'absolute',zIndex:opts.boxzIndex});if(typeof G_vmlCanvasManager!='undefined'){canvas=G_vmlCanvasManager.initElement(canvas);}
if(opts.cornerRadius>0){var newPoints=new Array();var newPoint;for(var i=0;i<points.length;i++){if(points[i].type=='corner'){newPoint=betweenPoint(points[i],points[(i-1)%points.length],opts.cornerRadius);newPoint.type='arcStart';newPoints[newPoints.length]=newPoint;newPoints[newPoints.length]=points[i];newPoint=betweenPoint(points[i],points[(i+1)%points.length],opts.cornerRadius);newPoint.type='arcEnd';newPoints[newPoints.length]=newPoint;}
else{newPoints[newPoints.length]=points[i];}}
points=newPoints;}
var ctx=canvas.getContext("2d");if(opts.shadow&&opts.shadowOverlap!==true){var shadowOverlap=numb(opts.shadowOverlap);switch(position){case'top':if(opts.shadowOffsetX+opts.shadowBlur-shadowOverlap>0){$box.css('top',(numb($box.css('top'))-(opts.shadowOffsetX+opts.shadowBlur-shadowOverlap)));}
break;case'right':if(shadowShiftX-shadowOverlap>0){$box.css('left',(numb($box.css('left'))+shadowShiftX-shadowOverlap));}
break;case'bottom':if(shadowShiftY-shadowOverlap>0){$box.css('top',(numb($box.css('top'))+shadowShiftY-shadowOverlap));}
break;case'left':if(opts.shadowOffsetY+opts.shadowBlur-shadowOverlap>0){$box.css('left',(numb($box.css('left'))-(opts.shadowOffsetY+opts.shadowBlur-shadowOverlap)));}
break;}}
drawIt.apply(ctx,[points],opts.strokeWidth);ctx.fillStyle=opts.fill;if(opts.shadow){ctx.shadowOffsetX=opts.shadowOffsetX;ctx.shadowOffsetY=opts.shadowOffsetY;ctx.shadowBlur=opts.shadowBlur;ctx.shadowColor=opts.shadowColor;}
ctx.closePath();ctx.fill();if(opts.strokeWidth>0){ctx.shadowColor='rgba(0, 0, 0, 0)';ctx.lineWidth=opts.strokeWidth;ctx.strokeStyle=opts.strokeStyle;ctx.beginPath();drawIt.apply(ctx,[points],opts.strokeWidth);ctx.closePath();ctx.stroke();}
opts.preShow.apply(this,[$box[0]]);$box.css({display:'none',visibility:'visible'});opts.showTip.apply(this,[$box[0]]);if(opts.overlay){var overlay=$('<div class="bt-overlay"></div>').css({position:'absolute',backgroundColor:'blue',top:top,left:left,width:width,height:height,opacity:'.2'}).appendTo(offsetParent);$(this).data('overlay',overlay);}
if((opts.ajaxPath!=null&&opts.ajaxCache==false)||ajaxTimeout){content=false;}
if(opts.clickAnywhereToClose){jQuery.bt.vars.clickAnywhereStack.push(this);$(document).click(jQuery.bt.docClick);}
if(opts.closeWhenOthersOpen){jQuery.bt.vars.closeWhenOpenStack.push(this);}
opts.postShow.apply(this,[$box[0]]);};this.btOff=function(){var box=$(this).data('bt-box');if(typeof box=='undefined'){return;}
opts.preHide.apply(this,[box]);var i=this;i.btCleanup=function(){var box=$(i).data('bt-box');var contentOrig=$(i).data('bt-content-orig');var overlay=$(i).data('bt-overlay');if(typeof box=='object'){$(box).remove();$(i).removeData('bt-box');}
if(typeof contentOrig=='object'){var clones=$(contentOrig.original).data('bt-clones');$(contentOrig).data('bt-clones',arrayRemove(clones,contentOrig.clone));}
if(typeof overlay=='object'){$(overlay).remove();$(i).removeData('bt-overlay');}
jQuery.bt.vars.clickAnywhereStack=arrayRemove(jQuery.bt.vars.clickAnywhereStack,i);jQuery.bt.vars.closeWhenOpenStack=arrayRemove(jQuery.bt.vars.closeWhenOpenStack,i);$(i).removeClass('bt-active '+opts.activeClass);opts.postHide.apply(i);}
opts.hideTip.apply(this,[box,i.btCleanup]);};var refresh=this.btRefresh=function(){this.btOff();this.btOn();};});function drawIt(points,strokeWidth){this.moveTo(points[0].x,points[0].y);for(i=1;i<points.length;i++){if(points[i-1].type=='arcStart'){this.quadraticCurveTo(round5(points[i].x,strokeWidth),round5(points[i].y,strokeWidth),round5(points[(i+1)%points.length].x,strokeWidth),round5(points[(i+1)%points.length].y,strokeWidth));i++;}
else{this.lineTo(round5(points[i].x,strokeWidth),round5(points[i].y,strokeWidth));}}};function round5(num,strokeWidth){var ret;strokeWidth=numb(strokeWidth);if(strokeWidth%2){ret=num;}
else{ret=Math.round(num-.5)+.5;}
return ret;};function numb(num){return parseInt(num)||0;};function arrayRemove(arr,elem){var x,newArr=new Array();for(x in arr){if(arr[x]!=elem){newArr.push(arr[x]);}}
return newArr;};function canvasSupport(){var canvas_compatible=false;try{canvas_compatible=!!(document.createElement('canvas').getContext('2d'));}catch(e){canvas_compatible=!!(document.createElement('canvas').getContext);}
return canvas_compatible;}
function shadowSupport(){try{var userAgent=navigator.userAgent.toLowerCase();if(/webkit/.test(userAgent)){return true;}
else if(/gecko|mozilla/.test(userAgent)&&parseFloat(userAgent.match(/firefox\/(\d+(?:\.\d+)+)/)[1])>=3.1){return true;}}
catch(err){}
return false;}
function betweenPoint(point1,point2,dist){var y,x;if(point1.x==point2.x){y=point1.y<point2.y?point1.y+dist:point1.y-dist;return{x:point1.x,y:y};}
else if(point1.y==point2.y){x=point1.x<point2.x?point1.x+dist:point1.x-dist;return{x:x,y:point1.y};}};function centerPoint(arcStart,corner,arcEnd){var x=corner.x==arcStart.x?arcEnd.x:arcStart.x;var y=corner.y==arcStart.y?arcEnd.y:arcStart.y;var startAngle,endAngle;if(arcStart.x<arcEnd.x){if(arcStart.y>arcEnd.y){startAngle=(Math.PI/180)*180;endAngle=(Math.PI/180)*90;}
else{startAngle=(Math.PI/180)*90;endAngle=0;}}
else{if(arcStart.y>arcEnd.y){startAngle=(Math.PI/180)*270;endAngle=(Math.PI/180)*180;}
else{startAngle=0;endAngle=(Math.PI/180)*270;}}
return{x:x,y:y,type:'center',startAngle:startAngle,endAngle:endAngle};};function findIntersect(r1x1,r1y1,r1x2,r1y2,r2x1,r2y1,r2x2,r2y2){if(r2x1==r2x2){return findIntersectY(r1x1,r1y1,r1x2,r1y2,r2x1);}
if(r2y1==r2y2){return findIntersectX(r1x1,r1y1,r1x2,r1y2,r2y1);}
var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var r2m=(r2y1-r2y2)/(r2x1-r2x2);var r2b=r2y1-(r2m*r2x1);var x=(r2b-r1b)/(r1m-r2m);var y=r1m*x+r1b;return{x:x,y:y};};function findIntersectY(r1x1,r1y1,r1x2,r1y2,x){if(r1y1==r1y2){return{x:x,y:r1y1};}
var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var y=r1m*x+r1b;return{x:x,y:y};};function findIntersectX(r1x1,r1y1,r1x2,r1y2,y){if(r1x1==r1x2){return{x:r1x1,y:y};}
var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var x=(y-r1b)/r1m;return{x:x,y:y};};};jQuery.fn.btPosition=function(){function num(elem,prop){return elem[0]&&parseInt(jQuery.css(elem[0],prop,true),10)||0;};var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}
return results;};jQuery.fn.btOuterWidth=function(margin){function num(elem,prop){return elem[0]&&parseInt(jQuery.css(elem[0],prop,true),10)||0;};return this["innerWidth"]()
+num(this,"borderLeftWidth")
+num(this,"borderRightWidth")
+(margin?num(this,"marginLeft")
+num(this,"marginRight"):0);};jQuery.fn.btOn=function(){return this.each(function(index){if(jQuery.isFunction(this.btOn)){this.btOn();}});};jQuery.fn.btOff=function(){return this.each(function(index){if(jQuery.isFunction(this.btOff)){this.btOff();}});};jQuery.bt.vars={clickAnywhereStack:[],closeWhenOpenStack:[]};jQuery.bt.docClick=function(e){if(!e){var e=window.event;};if(!$(e.target).parents().addBack().filter('.bt-wrapper, .bt-active').length&&jQuery.bt.vars.clickAnywhereStack.length){$(jQuery.bt.vars.clickAnywhereStack).btOff();$(document).unbind('click',jQuery.bt.docClick);}};jQuery.bt.defaults={trigger:'hover',clickAnywhereToClose:true,closeWhenOthersOpen:false,shrinkToFit:false,width:'200px',padding:'10px',spikeGirth:10,spikeLength:15,overlap:0,overlay:false,killTitle:true,textzIndex:9999,boxzIndex:9998,wrapperzIndex:9997,offsetParent:null,positions:['most'],fill:"rgb(255, 255, 102)",windowMargin:10,strokeWidth:1,strokeStyle:"#000",cornerRadius:5,centerPointX:.5,centerPointY:.5,shadow:false,shadowOffsetX:2,shadowOffsetY:2,shadowBlur:3,shadowColor:"#000",shadowOverlap:false,noShadowOpts:{strokeStyle:'#999'},cssClass:'',cssStyles:{},activeClass:'bt-active',contentSelector:"$(this).prop('title')",ajaxPath:null,ajaxError:'<strong>ERROR:</strong> <em>%error</em>',ajaxLoading:'<blink>Loading...</blink>',ajaxData:{},ajaxType:'GET',ajaxCache:true,ajaxOpts:{},preBuild:function(){},preShow:function(box){},showTip:function(box){$(box).show();},postShow:function(box){},preHide:function(box){},hideTip:function(box,callback){$(box).hide();callback();},postHide:function(){},hoverIntentOpts:{interval:300,timeout:500}};jQuery.bt.options={};})(jQuery);;/*! jQuery UI - v1.11.2 - 2014-12-08
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, resizable.js, selectable.js, sortable.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, menu.js, progressbar.js, selectmenu.js, slider.js, spinner.js, tabs.js, tooltip.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}function s(e){for(var t,i;e.length&&e[0]!==document;){if(t=e.css("position"),("absolute"===t||"relative"===t||"fixed"===t)&&(i=parseInt(e.css("zIndex"),10),!isNaN(i)&&0!==i))return i;e=e.parent()}return 0}function n(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.regional.en=e.extend(!0,{},this.regional[""]),this.regional["en-US"]=e.extend(!0,{},this.regional.en),this.dpDiv=a(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",o)}function o(){e.datepicker._isDisabledDatepicker(v.inline?v.dpDiv.parent()[0]:v.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))}function r(t,i){e.extend(t,i);for(var s in i)null==i[s]&&(t[s]=i[s]);return t}function h(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var l=0,u=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,n=u.call(arguments,1),a=0,o=n.length;o>a;a++)for(i in n[a])s=n[a][i],n[a].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(n){var a="string"==typeof n,o=u.call(arguments,1),r=this;return n=!a&&o.length?e.widget.extend.apply(null,[n].concat(o)):n,a?this.each(function(){var i,a=e.data(this,s);return"instance"===n?(r=a,!1):a?e.isFunction(a[n])&&"_"!==n.charAt(0)?(i=a[n].apply(a,o),i!==a&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+n+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+n+"'")}):this.each(function(){var t=e.data(this,s);t?(t.option(n||{}),t._init&&t._init()):e.data(this,s,new i(n,this))}),r}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=l++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget;var d=!1;e(document).mouseup(function(){d=!1}),e.widget("ui.mouse",{version:"1.11.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!d){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),d=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),d=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),function(){function t(e,t,i){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?i/100:1)]}function i(t,i){return parseInt(e.css(t,i),10)||0}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var n,a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,d=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,p=/%$/,f=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return e("body").append(s),t=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),n=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),n="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,a="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:a?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s||n?i.width():i.outerWidth(),height:s||n?i.height():i.outerHeight()}}},e.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=e.extend({},n);var p,m,g,v,y,b,_=e(n.of),x=e.position.getWithinInfo(n.within),w=e.position.getScrollInfo(x),k=(n.collision||"flip").split(" "),T={};return b=s(_),_[0].preventDefault&&(n.at="left top"),m=b.width,g=b.height,v=b.offset,y=e.extend({},v),e.each(["my","at"],function(){var e,t,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",e=d.exec(i[0]),t=d.exec(i[1]),T[this]=[e?e[0]:0,t?t[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===n.at[0]?y.left+=m:"center"===n.at[0]&&(y.left+=m/2),"bottom"===n.at[1]?y.top+=g:"center"===n.at[1]&&(y.top+=g/2),p=t(T.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var s,l,u=e(this),d=u.outerWidth(),c=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=d+f+i(this,"marginRight")+w.width,S=c+b+i(this,"marginBottom")+w.height,M=e.extend({},y),C=t(T.my,u.outerWidth(),u.outerHeight());"right"===n.my[0]?M.left-=d:"center"===n.my[0]&&(M.left-=d/2),"bottom"===n.my[1]?M.top-=c:"center"===n.my[1]&&(M.top-=c/2),M.left+=C[0],M.top+=C[1],a||(M.left=h(M.left),M.top=h(M.top)),s={marginLeft:f,marginTop:b},e.each(["left","top"],function(t,i){e.ui.position[k[t]]&&e.ui.position[k[t]][i](M,{targetWidth:m,targetHeight:g,elemWidth:d,elemHeight:c,collisionPosition:s,collisionWidth:D,collisionHeight:S,offset:[p[0]+C[0],p[1]+C[1]],my:n.my,at:n.at,within:x,elem:u})}),n.using&&(l=function(e){var t=v.left-M.left,i=t+m-d,s=v.top-M.top,a=s+g-c,h={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:M.left,top:M.top,width:d,height:c},horizontal:0>i?"left":t>0?"right":"center",vertical:0>a?"top":s>0?"bottom":"middle"};d>m&&m>r(t+i)&&(h.horizontal="center"),c>g&&g>r(s+a)&&(h.vertical="middle"),h.important=o(r(t),r(i))>o(r(s),r(a))?"horizontal":"vertical",n.using.call(this,e,h)}),u.offset(e.extend(M,{using:l}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=e.left-t.collisionPosition.marginLeft,h=n-r,l=r+t.collisionWidth-a-n;t.collisionWidth>a?h>0&&0>=l?(i=e.left+h+t.collisionWidth-a-n,e.left+=h-i):e.left=l>0&&0>=h?n:h>l?n+a-t.collisionWidth:n:h>0?e.left+=h:l>0?e.left-=l:e.left=o(e.left-r,e.left)},top:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollTop:s.offset.top,a=t.within.height,r=e.top-t.collisionPosition.marginTop,h=n-r,l=r+t.collisionHeight-a-n;t.collisionHeight>a?h>0&&0>=l?(i=e.top+h+t.collisionHeight-a-n,e.top+=h-i):e.top=l>0&&0>=h?n:h>l?n+a-t.collisionHeight:n:h>0?e.top+=h:l>0?e.top-=l:e.top=o(e.top-r,e.top)}},flip:{left:function(e,t){var i,s,n=t.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,d=l+t.collisionWidth-o-h,c="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+c+p+f+t.collisionWidth-o-a,(0>i||r(u)>i)&&(e.left+=c+p+f)):d>0&&(s=e.left-t.collisionPosition.marginLeft+c+p+f-h,(s>0||d>r(s))&&(e.left+=c+p+f))},top:function(e,t){var i,s,n=t.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,d=l+t.collisionHeight-o-h,c="top"===t.my[1],p=c?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-a,e.top+p+f+m>u&&(0>s||r(u)>s)&&(e.top+=p+f+m)):d>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,e.top+p+f+m>d&&(i>0||d>r(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,s,n,o,r=document.getElementsByTagName("body")[0],h=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)t.style[o]=s[o];t.appendChild(h),i=r||document.documentElement,i.insertBefore(t,i.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",n=e(h).offset().left,a=n>10&&11>n,t.innerHTML="",i.removeChild(t)}()}(),e.ui.position,e.widget("ui.draggable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur()}catch(s){}},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n})),n?(a.isOver||(a.isOver=1,a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,h,l,u,d,c,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,y=i.offset.top,b=y+s.helperProportions.height;for(c=s.snapElements.length-1;c>=0;c--)h=s.snapElements[c].left-s.margins.left,l=h+s.snapElements[c].width,u=s.snapElements[c].top-s.margins.top,d=u+s.snapElements[c].height,h-m>v||g>l+m||u-m>b||y>d+m||!e.contains(s.snapElements[c].item.ownerDocument,s.snapElements[c].item)?(s.snapElements[c].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),a=m>=Math.abs(d-y),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-y),a=m>=Math.abs(d-b),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[c].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=n||a||o||r||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}}),e.ui.draggable,e.widget("ui.droppable",{version:"1.11.2",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(s)?s:function(e){return e.is(s)},this.proportions=function(){return arguments.length?(t=arguments[0],void 0):t?t:t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(t){e.ui.ddmanager.droppables[t]=e.ui.ddmanager.droppables[t]||[],e.ui.ddmanager.droppables[t].push(this)},_splice:function(e){for(var t=0;e.length>t;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,i){if("accept"===t)this.accept=e.isFunction(i)?i:function(e){return e.is(i)};else if("scope"===t){var s=e.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(t,i)},_activate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var s=i||e.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=e(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&e.ui.intersect(s,e.extend(i,{offset:i.element.offset()}),i.options.tolerance,t)?(n=!0,!1):void 0}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(s)),this.element):!1):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(){function e(e,t,i){return e>=t&&t+i>e}return function(t,i,s,n){if(!i.offset)return!1;var a=(t.positionAbs||t.position.absolute).left+t.margins.left,o=(t.positionAbs||t.position.absolute).top+t.margins.top,r=a+t.helperProportions.width,h=o+t.helperProportions.height,l=i.offset.left,u=i.offset.top,d=l+i.proportions().width,c=u+i.proportions().height;switch(s){case"fit":return a>=l&&d>=r&&o>=u&&c>=h;case"intersect":return a+t.helperProportions.width/2>l&&d>r-t.helperProportions.width/2&&o+t.helperProportions.height/2>u&&c>h-t.helperProportions.height/2;case"pointer":return e(n.pageY,u,i.proportions().height)&&e(n.pageX,l,i.proportions().width);case"touch":return(o>=u&&c>=o||h>=u&&c>=h||u>o&&h>c)&&(a>=l&&d>=a||r>=l&&d>=r||l>a&&r>d);default:return!1}}}(),e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var s,n,a=e.ui.ddmanager.droppables[t.options.scope]||[],o=i?i.type:null,r=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(s=0;a.length>s;s++)if(!(a[s].options.disabled||t&&!a[s].accept.call(a[s].element[0],t.currentItem||t.element))){for(n=0;r.length>n;n++)if(r[n]===a[s].element[0]){a[s].proportions().height=0;continue e}a[s].visible="none"!==a[s].element.css("display"),a[s].visible&&("mousedown"===o&&a[s]._activate.call(a[s],i),a[s].offset=a[s].element.offset(),a[s].proportions({width:a[s].element[0].offsetWidth,height:a[s].element[0].offsetHeight}))}},drop:function(t,i){var s=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,a,o=e.ui.intersect(t,this,this.options.tolerance,i),r=!o&&this.isover?"isout":o&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,a=this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope===n}),a.length&&(s=e(a[0]).droppable("instance"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(t,i){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}},e.ui.droppable,e.widget("ui.resizable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(e){return parseInt(e,10)||0},_isNumber:function(e){return!isNaN(parseInt(e,10))},_hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return t[s]>0?!0:(t[s]=1,n=t[s]>0,t[s]=0,n)},_create:function(){var t,i,s,n,a,o=this,r=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=this.element.children(this.handles[i]).first().show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),e(this.handles[i]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var i,s,n,a=this.options,o=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),a.containment&&(i+=e(a.containment).scrollLeft()||0,s+=e(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:o.width(),height:o.height()},this.originalSize=this._helper?{width:o.outerWidth(),height:o.outerHeight()}:{width:o.width(),height:o.height()},this.sizeDiff={width:o.outerWidth()-o.width(),height:o.outerHeight()-o.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===n?this.axis+"-resize":n),o.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var i,s,n=this.originalMousePosition,a=this.axis,o=t.pageX-n.left||0,r=t.pageY-n.top||0,h=this._change[a];return this._updatePrevProperties(),h?(i=h.apply(this,[t,o,r]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var e={};return this.position.top!==this.prevPosition.top&&(e.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(e.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(e.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(e.height=this.size.height+"px"),this.helper.css(e),e},_updateVirtualBoundaries:function(e){var t,i,s,n,a,o=this.options;a={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=a.minHeight*this.aspectRatio,s=a.minWidth/this.aspectRatio,i=a.maxHeight*this.aspectRatio,n=a.maxWidth/this.aspectRatio,t>a.minWidth&&(a.minWidth=t),s>a.minHeight&&(a.minHeight=s),a.maxWidth>i&&(a.maxWidth=i),a.maxHeight>n&&(a.maxHeight=n)),this._vBoundaries=a},_updateCache:function(e){this.offset=this.helper.offset(),this._isNumber(e.left)&&(this.position.left=e.left),this._isNumber(e.top)&&(this.position.top=e.top),this._isNumber(e.height)&&(this.size.height=e.height),this._isNumber(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,i=this.size,s=this.axis;return this._isNumber(e.height)?e.width=e.height*this.aspectRatio:this._isNumber(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===s&&(e.left=t.left+(i.width-e.width),e.top=null),"nw"===s&&(e.top=t.top+(i.height-e.height),e.left=t.left+(i.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,i=this.axis,s=this._isNumber(e.width)&&t.maxWidth&&t.maxWidth<e.width,n=this._isNumber(e.height)&&t.maxHeight&&t.maxHeight<e.height,a=this._isNumber(e.width)&&t.minWidth&&t.minWidth>e.width,o=this._isNumber(e.height)&&t.minHeight&&t.minHeight>e.height,r=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,l=/sw|nw|w/.test(i),u=/nw|ne|n/.test(i);return a&&(e.width=t.minWidth),o&&(e.height=t.minHeight),s&&(e.width=t.maxWidth),n&&(e.height=t.maxHeight),a&&l&&(e.left=r-t.minWidth),s&&l&&(e.left=r-t.maxWidth),o&&u&&(e.top=h-t.minHeight),n&&u&&(e.top=h-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_getPaddingPlusBorderDimensions:function(e){for(var t=0,i=[],s=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],n=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];4>t;t++)i[t]=parseInt(s[t],10)||0,i[t]+=parseInt(n[t],10)||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var e,t=0,i=this.helper||this.element;this._proportionallyResizeElements.length>t;t++)e=this._proportionallyResizeElements[t],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(e)),e.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var t,i,s,n,a,o,r,h=e(this).resizable("instance"),l=h.options,u=h.element,d=l.containment,c=d instanceof e?d.get(0):/parent/.test(d)?u.parent().get(0):d;c&&(h.containerElement=e(c),/document/.test(d)||d===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(t=e(c),i=[],e(["Top","Right","Left","Bottom"]).each(function(e,s){i[e]=h._num(t.css("padding"+s))}),h.containerOffset=t.offset(),h.containerPosition=t.position(),h.containerSize={height:t.innerHeight()-i[3],width:t.innerWidth()-i[1]},s=h.containerOffset,n=h.containerSize.height,a=h.containerSize.width,o=h._hasScroll(c,"left")?c.scrollWidth:a,r=h._hasScroll(c)?c.scrollHeight:n,h.parentData={element:c,left:s.left,top:s.top,width:o,height:r}))},resize:function(t){var i,s,n,a,o=e(this).resizable("instance"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,d={top:0,left:0},c=o.containerElement,p=!0;c[0]!==document&&/static/.test(c.css("position"))&&(d=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-d.left),u&&(o.size.height=o.size.width/o.aspectRatio,p=!1),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio,p=!1),o.position.top=o._helper?h.top:0),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),i=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-d.left:o.offset.left-h.left)),s=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-d.top:o.offset.top-h.top)),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio,p=!1)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio,p=!1)),p||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height)},stop:function(){var t=e(this).resizable("instance"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).resizable("instance"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).resizable("instance"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0},h=function(t,s){e(t).each(function(){var t=e(this),n=e(this).data("ui-resizable-alsoresize"),a={},o=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var i=(n[t]||0)+(r[t]||0);i&&i>=0&&(a[t]=i||null)}),t.css(a)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):e.each(n.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).resizable("instance"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t,i=e(this).resizable("instance"),s=i.options,n=i.size,a=i.originalSize,o=i.originalPosition,r=i.axis,h="number"==typeof s.grid?[s.grid,s.grid]:s.grid,l=h[0]||1,u=h[1]||1,d=Math.round((n.width-a.width)/l)*l,c=Math.round((n.height-a.height)/u)*u,p=a.width+d,f=a.height+c,m=s.maxWidth&&p>s.maxWidth,g=s.maxHeight&&f>s.maxHeight,v=s.minWidth&&s.minWidth>p,y=s.minHeight&&s.minHeight>f;s.grid=h,v&&(p+=l),y&&(f+=u),m&&(p-=l),g&&(f-=u),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=o.top-c):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=o.left-d):((0>=f-u||0>=p-l)&&(t=i._getPaddingPlusBorderDimensions(this)),f-u>0?(i.size.height=f,i.position.top=o.top-c):(f=u-t.height,i.size.height=f,i.position.top=o.top+a.height-f),p-l>0?(i.size.width=p,i.position.left=o.left-d):(p=u-t.height,i.size.width=p,i.position.left=o.left+a.width-p))}}),e.ui.resizable,e.widget("ui.selectable",e.ui.mouse,{version:"1.11.2",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var t,i=this;
this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){t=e(i.options.filter,i.element[0]),t.addClass("ui-selectee"),t.each(function(){var t=e(this),i=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:i.left,top:i.top,right:i.left+t.outerWidth(),bottom:i.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=t.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var i=this,s=this.options;this.opos=[t.pageX,t.pageY],this.options.disabled||(this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),this.helper.css({left:t.pageX,top:t.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",t,{unselecting:s.element}))}),e(t.target).parents().addBack().each(function(){var s,n=e.data(this,"selectable-item");return n?(s=!t.metaKey&&!t.ctrlKey||!n.$element.hasClass("ui-selected"),n.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",t,{selecting:n.element}):i._trigger("unselecting",t,{unselecting:n.element}),!1):void 0}))},_mouseDrag:function(t){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,a=this.opos[0],o=this.opos[1],r=t.pageX,h=t.pageY;return a>r&&(i=r,r=a,a=i),o>h&&(i=h,h=o,o=i),this.helper.css({left:a,top:o,width:r-a,height:h-o}),this.selectees.each(function(){var i=e.data(this,"selectable-item"),l=!1;i&&i.element!==s.element[0]&&("touch"===n.tolerance?l=!(i.left>r||a>i.right||i.top>h||o>i.bottom):"fit"===n.tolerance&&(l=i.left>a&&r>i.right&&i.top>o&&h>i.bottom),l?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,s._trigger("selecting",t,{selecting:i.element}))):(i.selecting&&((t.metaKey||t.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",t,{unselecting:i.element}))),i.selected&&(t.metaKey||t.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",t,{unselecting:i.element})))))}),!1}},_mouseStop:function(t){var i=this;return this.dragged=!1,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element})}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element})}),this._trigger("stop",t),this.helper.remove(),!1}}),e.widget("ui.sortable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(e,t,i){return e>=t&&t+i>e},_isFloating:function(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===e.axis||this._isFloating(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName()},_setHandleClassName:function(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),e.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle")})},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,a.widgetName+"-item")===a?(s=e(this),!1):void 0}),e.data(t.target,a.widgetName+"-item")===a&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,i,s){var n,a,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=e("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-e(document).scrollTop()<o.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-o.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<o.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+o.scrollSpeed)),t.pageX-e(document).scrollLeft()<o.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-o.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<o.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+o.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!e.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],n):!0)){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=e.left,o=a+e.width,r=e.top,h=r+e.height,l=this.offset.click.top,u=this.offset.click.left,d="x"===this.options.axis||s+l>r&&h>s+l,c="y"===this.options.axis||t+u>a&&o>t+u,p=d&&c;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(e){var t="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),i="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),s=t&&i,n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return s?this.floating?a&&"right"===a||"down"===n?2:1:n&&("down"===n?2:1):!1},_intersectsWithSides:function(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&t||"up"===s&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){function i(){r.push(this)}var s,n,a,o,r=[],h=[],l=this._connectWith();if(l&&t)for(s=l.length-1;s>=0;s--)for(a=e(l[s]),n=a.length-1;n>=0;n--)o=e.data(a[n],this.widgetFullName),o&&o!==this&&!o.options.disabled&&h.push([e.isFunction(o.options.items)?o.options.items.call(o.element):e(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);for(h.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return e(r)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,u=this.items,d=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],c=this._connectWith();if(c&&this.ready)for(i=c.length-1;i>=0;i--)for(n=e(c[i]),s=n.length-1;s>=0;s--)a=e.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(d.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a));for(i=d.length-1;i>=0;i--)for(o=d[i][1],r=d[i][0],s=0,l=r.length;l>s;s++)h=e(r[s]),h.data(this.widgetName+"-item",o),u.push({item:h,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),n=e("<"+s+">",t.document[0]).addClass(i||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?t.currentItem.children().each(function(){e("<td>&#160;</td>",t.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(n)}):"img"===s&&n.attr("src",t.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(e,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_contactContainers:function(t){var i,s,n,a,o,r,h,l,u,d,c=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!e.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(c&&e.contains(this.containers[i].element[0],c.element[0]))continue;c=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0);if(c)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,a=null,u=c.floating||this._isFloating(this.currentItem),o=u?"left":"top",r=u?"width":"height",d=u?"clientX":"clientY",s=this.items.length-1;s>=0;s--)e.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[o],l=!1,t[d]-h>this.items[s][r]/2&&(l=!0),n>Math.abs(t[d]-h)&&(n=Math.abs(t[d]-h),a=this.items[s],this.direction=l?"up":"down"));if(!a&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;a?this._rearrange(t,a,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,(e("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(t=e(n.containment)[0],i=e(n.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n=this.options,a=t.pageX,o=t.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(e,t){function i(e,t,i){return function(s){i._trigger(e,s,t._uiHash(t))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&n.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||n.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(n.push(function(e){this._trigger("remove",e,this._uiHash())}),n.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)t||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t){for(s=0;n.length>s;s++)n[s].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}}),e.widget("ui.accordion",{version:"1.11.2",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var t=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),t.collapsible||t.active!==!1&&null!=t.active||(t.active=0),this._processPanels(),0>t.active&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),this._destroyIcons(),e=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&(this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)),void 0)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,s=this.headers.length,n=this.headers.index(t.target),a=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:a=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:a=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:a=this.headers[0];break;case i.END:a=this.headers[s-1]}a&&(e(t.target).attr("tabIndex",-1),e(a).attr("tabIndex",0),a.focus(),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t=this.options;this._processPanels(),t.active===!1&&t.collapsible===!0||!this.headers.length?(t.active=!1,this.active=e()):t.active===!1?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var e=this.headers,t=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),t&&(this._off(e.not(this.headers)),this._off(t.not(this.panels)))},_refresh:function(){var t,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(){var t=e(this),i=t.uniqueId().attr("id"),s=t.next(),n=s.uniqueId().attr("id");
t.attr("aria-controls",n),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(t=n.height(),this.element.siblings(":visible").each(function(){var i=e(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(t-=i.outerHeight(!0))}),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===s&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).css("height","").height())}).height(t))},_activate:function(t){var i=this._findActive(t)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var i={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n[0]===s[0],o=a&&i.collapsible,r=o?e():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:o?e():n,newPanel:r};t.preventDefault(),a&&!i.collapsible||this._trigger("beforeActivate",t,l)===!1||(i.active=o?!1:this.headers.index(n),this.active=a?e():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),a||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")))},_toggle:function(t){var i=t.newPanel,s=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,t):(s.hide(),i.show(),this._toggleComplete(t)),s.attr({"aria-hidden":"true"}),s.prev().attr("aria-selected","false"),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true",tabIndex:0,"aria-expanded":"true"})},_animate:function(e,t,i){var s,n,a,o=this,r=0,h=e.length&&(!t.length||e.index()<t.index()),l=this.options.animate||{},u=h&&l.down||l,d=function(){o._toggleComplete(i)};return"number"==typeof u&&(a=u),"string"==typeof u&&(n=u),n=n||u.easing||l.easing,a=a||u.duration||l.duration,t.length?e.length?(s=e.show().outerHeight(),t.animate(this.hideProps,{duration:a,easing:n,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(this.showProps,{duration:a,easing:n,complete:d,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?r+=i.now:"content"!==o.options.heightStyle&&(i.now=Math.round(s-t.outerHeight()-r),r=0)}}),void 0):t.animate(this.hideProps,a,n,d):e.animate(this.showProps,a,n,d)},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.widget("ui.menu",{version:"1.11.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var i=e(t.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&e(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){if(!this.previousFilter){var i=e(t.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){var i,s,n,a,o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,s=this.previousFilter||"",n=String.fromCharCode(t.keyCode),a=!1,clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e))},refresh:function(){var t,i,s=this,n=this.options.icons.submenu,a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.parent(),s=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))}),t=a.add(this.element),i=t.find(this.options.items),i.not(".ui-menu-item").each(function(){var t=e(this);s._isDivider(t)&&t.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},focus:function(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=t.outerHeight(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-n}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(t),void 0)},previousPage:function(t){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+n>0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first())),void 0):(this.next(t),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).text()))})}}),e.widget("ui.autocomplete",{version:"1.11.2",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,void 0;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),void 0):(this._searchTimeout(e),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(e),this._change(e),void 0)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close()})})},menufocus:function(t,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&e.trim(s).length&&(this.liveRegion.children().hide(),e("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;(!t||t&&!i&&!s)&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").text(i.label).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[e](t),void 0):(this.search(null,t),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion))}}),e.ui.autocomplete;var c,p="ui-button ui-widget ui-state-default ui-corner-all",f="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",m=function(){var t=e(this);setTimeout(function(){t.find(":ui-button").button("refresh")},1)},g=function(t){var i=t.name,s=t.form,n=e([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?e(s).find("[name='"+i+"'][type=radio]"):e("[name='"+i+"'][type=radio]",t.ownerDocument).filter(function(){return!this.form})),n};e.widget("ui.button",{version:"1.11.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,m),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var t=this,i=this.options,s="checkbox"===this.type||"radio"===this.type,n=s?"":"ui-state-active";null===i.label&&(i.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(p).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){i.disabled||this===c&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){i.disabled||e(this).removeClass(n)}).bind("click"+this.eventNamespace,function(e){i.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),s&&this.element.bind("change"+this.eventNamespace,function(){t.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return i.disabled?!1:void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(i.disabled)return!1;e(this).addClass("ui-state-active"),t.buttonElement.attr("aria-pressed","true");var s=t.element[0];g(s).not(s).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return i.disabled?!1:(e(this).addClass("ui-state-active"),c=this,t.document.one("mouseup",function(){c=null}),void 0)}).bind("mouseup"+this.eventNamespace,function(){return i.disabled?!1:(e(this).removeClass("ui-state-active"),void 0)}).bind("keydown"+this.eventNamespace,function(t){return i.disabled?!1:((t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active"),void 0)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",i.disabled),this._resetButton()},_determineButtonType:function(){var e,t,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(p+" ui-state-active "+f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){return this._super(e,t),"disabled"===e?(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),t&&("checkbox"===this.type||"radio"===this.type?this.buttonElement.removeClass("ui-state-focus"):this.buttonElement.removeClass("ui-state-focus ui-state-active")),void 0):(this._resetButton(),void 0)},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?g(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),void 0;var t=this.buttonElement.removeClass(f),i=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(i)))):a.push("ui-button-text-only"),t.addClass(a.join(" "))}}),e.widget("ui.buttonset",{version:"1.11.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){"disabled"===e&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t="rtl"===this.element.css("direction"),i=this.element.find(this.options.items),s=i.filter(":ui-button");i.not(":ui-button").button(),s.button("refresh"),this.buttons=i.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}}),e.ui.button,e.extend(e.ui,{datepicker:{version:"1.11.2"}});var v;e.extend(n.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return r(this._defaults,e||{}),this},_attachDatepicker:function(t,i){var s,n,a;s=t.nodeName.toLowerCase(),n="div"===s||"span"===s,t.id||(this.uuid+=1,t.id="dp"+this.uuid),a=this._newInst(e(t),n),a.settings=e.extend({},i||{}),"input"===s?this._connectDatepicker(t,a):n&&this._inlineDatepicker(t,a)},_newInst:function(t,i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?a(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,i){var s=e(t);i.append=e([]),i.trigger=e([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),e.data(t,"datepicker",i),i.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,i){var s,n,a,o=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),o&&(i.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[r?"before":"after"](i.append)),t.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&t.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),a=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:a,alt:n,title:n}):e("<button type='button'></button>").addClass(this._triggerClass).html(a?e("<img/>").attr({src:a,alt:n,title:n}):n)),t[r?"before":"after"](i.trigger),i.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,s,n,a=new Date(2009,11,20),o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){for(i=0,s=0,n=0;e.length>n;n++)e[n].length>i&&(i=e[n].length,s=n);return s},a.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),a.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-a.getDay())),e.input.attr("size",this._formatDate(e,a).length)}},_inlineDatepicker:function(t,i){var s=e(t);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),e.data(t,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"))},_dialogDatepicker:function(t,i,s,n,a){var o,h,l,u,d,c=this._dialogInst;return c||(this.uuid+=1,o="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+o+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),c=this._dialogInst=this._newInst(this._dialogInput,!1),c.settings={},e.data(this._dialogInput[0],"datepicker",c)),r(c.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(c,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(h=document.documentElement.clientWidth,l=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[h/2-100+u,l/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),c.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],"datepicker",c),this},_destroyDatepicker:function(t){var i,s=e(t),n=e.data(t,"datepicker");s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty())
},_enableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,a.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,a.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(t,i,s){var n,a,o,h,l=this._getInst(t);return 2===arguments.length&&"string"==typeof i?"defaults"===i?e.extend({},e.datepicker._defaults):l?"all"===i?e.extend({},l.settings):this._get(l,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),l&&(this._curInst===l&&this._hideDatepicker(),a=this._getDateDatepicker(t,!0),o=this._getMinMaxDate(l,"min"),h=this._getMinMaxDate(l,"max"),r(l.settings,n),null!==o&&void 0!==n.dateFormat&&void 0===n.minDate&&(l.settings.minDate=this._formatDate(l,o)),null!==h&&void 0!==n.dateFormat&&void 0===n.maxDate&&(l.settings.maxDate=this._formatDate(l,h)),"disabled"in n&&(n.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(e(t),l),this._autoSize(l),this._setDate(l,a),this._updateAlternate(l),this._updateDatepicker(l)),void 0)},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(t){var i,s,n,a=e.datepicker._getInst(t.target),o=!0,r=a.dpDiv.is(".ui-datepicker-rtl");if(a._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;case 13:return n=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",a.dpDiv),n[0]&&e.datepicker._selectDay(t.target,a.selectedMonth,a.selectedYear,n[0]),i=e.datepicker._get(a,"onSelect"),i?(s=e.datepicker._formatDate(a),i.apply(a.input?a.input[0]:null,[s,a])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(t){var i,s,n=e.datepicker._getInst(t.target);return e.datepicker._get(n,"constrainInput")?(i=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(t){var i,s=e.datepicker._getInst(t.target);if(s.input.val()!==s.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,e.datepicker._getFormatConfig(s)),i&&(e.datepicker._setDateFromField(s),e.datepicker._updateAlternate(s),e.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var i,n,a,o,h,l,u;i=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==i&&(e.datepicker._curInst.dpDiv.stop(!0,!0),i&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),n=e.datepicker._get(i,"beforeShow"),a=n?n.apply(t,[t,i]):{},a!==!1&&(r(i.settings,a),i.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(i),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),o=!1,e(t).parents().each(function(){return o|="fixed"===e(this).css("position"),!o}),h={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(i),h=e.datepicker._checkOffset(i,h,o),i.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":o?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),i.inline||(l=e.datepicker._get(i,"showAnim"),u=e.datepicker._get(i,"duration"),i.dpDiv.css("z-index",s(e(t))+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[l]?i.dpDiv.show(l,e.datepicker._get(i,"showOptions"),u):i.dpDiv[l||"show"](l?u:null),e.datepicker._shouldFocusInput(i)&&i.input.focus(),e.datepicker._curInst=i))}},_updateDatepicker:function(t){this.maxRows=4,v=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var i,s=this._getNumberOfMonths(t),n=s[1],a=17,r=t.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&o.apply(r.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&t.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),t.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,i,s){var n=t.dpDiv.outerWidth(),a=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,r=t.input?t.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:e(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?n-o:0,i.left-=s&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=s&&i.top===t.input.offset().top+r?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+a>l&&l>a?Math.abs(a+r):0),i},_findPos:function(t){for(var i,s=this._getInst(t),n=this._get(s,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[n?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},_hideDatepicker:function(t){var i,s,n,a,o=this._curInst;!o||t&&o!==e.data(t,"datepicker")||this._datepickerShowing&&(i=this._get(o,"showAnim"),s=this._get(o,"duration"),n=function(){e.datepicker._tidyDialog(o)},e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),s,n):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,a=this._get(o,"onClose"),a&&a.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),s=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==s)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,i,s){var n=e(t),a=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(a,i+("M"===s?this._get(a,"showCurrentAtPos"):0),s),this._updateDatepicker(a))},_gotoToday:function(t){var i,s=e(t),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(t,i,s){var n=e(t),a=this._getInst(n[0]);a["selected"+("M"===s?"Month":"Year")]=a["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(a),this._adjustDate(n)},_selectDay:function(t,i,s,n){var a,o=e(t);e(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||(a=this._getInst(o[0]),a.selectedDay=a.currentDay=e("a",n).html(),a.selectedMonth=a.currentMonth=i,a.selectedYear=a.currentYear=s,this._selectDate(t,this._formatDate(a,a.currentDay,a.currentMonth,a.currentYear)))},_clearDate:function(t){var i=e(t);this._selectDate(i,"")},_selectDate:function(t,i){var s,n=e(t),a=this._getInst(n[0]);i=null!=i?i:this._formatDate(a),a.input&&a.input.val(i),this._updateAlternate(a),s=this._get(a,"onSelect"),s?s.apply(a.input?a.input[0]:null,[i,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=typeof a.input[0]&&a.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var i,s,n,a=this._get(t,"altField");a&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),s=this._getDate(t),n=this.formatDate(i,s,this._getFormatConfig(t)),e(a).each(function(){e(this).val(n)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},parseDate:function(t,i,s){if(null==t||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,a,o,r,h=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),d=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,c=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,y=-1,b=!1,_=function(e){var i=t.length>n+1&&t.charAt(n+1)===e;return i&&n++,i},x=function(e){var t=_(e),s="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,n="y"===e?s:1,a=RegExp("^\\d{"+n+","+s+"}"),o=i.substring(h).match(a);if(!o)throw"Missing number at position "+h;return h+=o[0].length,parseInt(o[0],10)},w=function(t,s,n){var a=-1,o=e.map(_(t)?n:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(o,function(e,t){var s=t[1];return i.substr(h,s.length).toLowerCase()===s.toLowerCase()?(a=t[0],h+=s.length,!1):void 0}),-1!==a)return a+1;throw"Unknown name at position "+h},k=function(){if(i.charAt(h)!==t.charAt(n))throw"Unexpected literal at position "+h;h++};for(n=0;t.length>n;n++)if(b)"'"!==t.charAt(n)||_("'")?k():b=!1;else switch(t.charAt(n)){case"d":v=x("d");break;case"D":w("D",d,c);break;case"o":y=x("o");break;case"m":g=x("m");break;case"M":g=w("M",p,f);break;case"y":m=x("y");break;case"@":r=new Date(x("@")),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"!":r=new Date((x("!")-this._ticksTo1970)/1e4),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"'":_("'")?k():b=!0;break;default:k()}if(i.length>h&&(o=i.substr(h),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=m?0:-100)),y>-1)for(g=1,v=y;;){if(a=this._getDaysInMonth(m,g-1),a>=v)break;g++,v-=a}if(r=this._daylightSavingAdjust(new Date(m,g-1,v)),r.getFullYear()!==m||r.getMonth()+1!==g||r.getDate()!==v)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,i){if(!t)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,a=(i?i.dayNames:null)||this._defaults.dayNames,o=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function(t){var i=e.length>s+1&&e.charAt(s+1)===t;return i&&s++,i},l=function(e,t,i){var s=""+t;if(h(e))for(;i>s.length;)s="0"+s;return s},u=function(e,t,i,s){return h(e)?s[t]:i[t]},d="",c=!1;if(t)for(s=0;e.length>s;s++)if(c)"'"!==e.charAt(s)||h("'")?d+=e.charAt(s):c=!1;else switch(e.charAt(s)){case"d":d+=l("d",t.getDate(),2);break;case"D":d+=u("D",t.getDay(),n,a);break;case"o":d+=l("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":d+=l("m",t.getMonth()+1,2);break;case"M":d+=u("M",t.getMonth(),o,r);break;case"y":d+=h("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case"@":d+=t.getTime();break;case"!":d+=1e4*t.getTime()+this._ticksTo1970;break;case"'":h("'")?d+="'":c=!0;break;default:d+=e.charAt(s)}return d},_possibleChars:function(e){var t,i="",s=!1,n=function(i){var s=e.length>t+1&&e.charAt(t+1)===i;return s&&t++,s};for(t=0;e.length>t;t++)if(s)"'"!==e.charAt(t)||n("'")?i+=e.charAt(t):s=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=e.charAt(t)}return i},_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),s=e.lastVal=e.input?e.input.val():null,n=this._getDefaultDate(e),a=n,o=this._getFormatConfig(e);try{a=this.parseDate(i,s,o)||n}catch(r){s=t?"":s}e.selectedDay=a.getDate(),e.drawMonth=e.selectedMonth=a.getMonth(),e.drawYear=e.selectedYear=a.getFullYear(),e.currentDay=s?a.getDate():0,e.currentMonth=s?a.getMonth():0,e.currentYear=s?a.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,i,s){var n=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},a=function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,a=n.getFullYear(),o=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":o+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o));break;case"y":case"Y":a+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o))}l=h.exec(i)}return new Date(a,o,r)},o=null==i||""===i?s:"string"==typeof i?a(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return o=o&&"Invalid Date"==""+o?s:o,o&&(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0)),this._daylightSavingAdjust(o)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var s=!t,n=e.selectedMonth,a=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),n===e.selectedMonth&&a===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(s?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var i=this._get(t,"stepMonths"),s="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(s,-i,"M")},next:function(){e.datepicker._adjustDate(s,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(s)},selectDay:function(){return e.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(s,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,i,s,n,a,o,r,h,l,u,d,c,p,f,m,g,v,y,b,_,x,w,k,T,D,S,M,C,N,A,P,I,z,H,F,E,O,j,W,L=new Date,R=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),Y=this._get(e,"isRTL"),B=this._get(e,"showButtonPanel"),J=this._get(e,"hideIfNoPrevNext"),q=this._get(e,"navigationAsDateFormat"),K=this._getNumberOfMonths(e),V=this._get(e,"showCurrentAtPos"),U=this._get(e,"stepMonths"),Q=1!==K[0]||1!==K[1],G=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),X=this._getMinMaxDate(e,"min"),$=this._getMinMaxDate(e,"max"),Z=e.drawMonth-V,et=e.drawYear;if(0>Z&&(Z+=12,et--),$)for(t=this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth()-K[0]*K[1]+1,$.getDate())),t=X&&X>t?X:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=q?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-U,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":J?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(e,"nextText"),n=q?this.formatDate(n,this._daylightSavingAdjust(new Date(et,Z+U,1)),this._getFormatConfig(e)):n,a=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":J?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",o=this._get(e,"currentText"),r=this._get(e,"gotoCurrent")&&e.currentDay?G:R,o=q?this.formatDate(o,r,this._getFormatConfig(e)):o,h=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",l=B?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(e,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(Y?"":h)+"</div>":"",u=parseInt(this._get(e,"firstDay"),10),u=isNaN(u)?0:u,d=this._get(e,"showWeek"),c=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),f=this._get(e,"monthNames"),m=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),v=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),_="",w=0;K[0]>w;w++){for(k="",this.maxRows=4,T=0;K[1]>T;T++){if(D=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),S=" ui-corner-all",M="",Q){if(M+="<div class='ui-datepicker-group",K[1]>1)switch(T){case 0:M+=" ui-datepicker-group-first",S=" ui-corner-"+(Y?"right":"left");break;case K[1]-1:M+=" ui-datepicker-group-last",S=" ui-corner-"+(Y?"left":"right");break;default:M+=" ui-datepicker-group-middle",S=""}M+="'>"}for(M+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+S+"'>"+(/all|left/.test(S)&&0===w?Y?a:s:"")+(/all|right/.test(S)&&0===w?Y?s:a:"")+this._generateMonthYearHeader(e,Z,et,X,$,w>0||T>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",C=d?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",x=0;7>x;x++)N=(x+u)%7,C+="<th scope='col'"+((x+u+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+c[N]+"'>"+p[N]+"</span></th>";for(M+=C+"</tr></thead><tbody>",A=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,A)),P=(this._getFirstDayOfMonth(et,Z)-u+7)%7,I=Math.ceil((P+A)/7),z=Q?this.maxRows>I?this.maxRows:I:I,this.maxRows=z,H=this._daylightSavingAdjust(new Date(et,Z,1-P)),F=0;z>F;F++){for(M+="<tr>",E=d?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(H)+"</td>":"",x=0;7>x;x++)O=g?g.apply(e.input?e.input[0]:null,[H]):[!0,""],j=H.getMonth()!==Z,W=j&&!y||!O[0]||X&&X>H||$&&H>$,E+="<td class='"+((x+u+6)%7>=5?" ui-datepicker-week-end":"")+(j?" ui-datepicker-other-month":"")+(H.getTime()===D.getTime()&&Z===e.selectedMonth&&e._keyEvent||b.getTime()===H.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(W?" "+this._unselectableClass+" ui-state-disabled":"")+(j&&!v?"":" "+O[1]+(H.getTime()===G.getTime()?" "+this._currentClass:"")+(H.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(j&&!v||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(W?"":" data-handler='selectDay' data-event='click' data-month='"+H.getMonth()+"' data-year='"+H.getFullYear()+"'")+">"+(j&&!v?"&#xa0;":W?"<span class='ui-state-default'>"+H.getDate()+"</span>":"<a class='ui-state-default"+(H.getTime()===R.getTime()?" ui-state-highlight":"")+(H.getTime()===G.getTime()?" ui-state-active":"")+(j?" ui-priority-secondary":"")+"' href='#'>"+H.getDate()+"</a>")+"</td>",H.setDate(H.getDate()+1),H=this._daylightSavingAdjust(H);M+=E+"</tr>"}Z++,Z>11&&(Z=0,et++),M+="</tbody></table>"+(Q?"</div>"+(K[0]>0&&T===K[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),k+=M}_+=k}return _+=l,e._keyEvent=!1,_},_generateMonthYearHeader:function(e,t,i,s,n,a,o,r){var h,l,u,d,c,p,f,m,g=this._get(e,"changeMonth"),v=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",_="";if(a||!g)_+="<span class='ui-datepicker-month'>"+o[t]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,_+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",u=0;12>u;u++)(!h||u>=s.getMonth())&&(!l||n.getMonth()>=u)&&(_+="<option value='"+u+"'"+(u===t?" selected='selected'":"")+">"+r[u]+"</option>");_+="</select>"}if(y||(b+=_+(!a&&g&&v?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",a||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(d=this._get(e,"yearRange").split(":"),c=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?c+parseInt(e,10):parseInt(e,10);return isNaN(t)?c:t},f=p(d[0]),m=Math.max(f,p(d[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)e.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null}return b+=this._get(e,"yearSuffix"),y&&(b+=(!a&&g&&v?"":"&#xa0;")+_),b+="</div>"},_adjustInstDate:function(e,t,i){var s=e.drawYear+("Y"===i?t:0),n=e.drawMonth+("M"===i?t:0),a=Math.min(e.selectedDay,this._getDaysInMonth(s,n))+("D"===i?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(s,n,a)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),n=i&&i>t?i:t;return s&&n>s?s:n},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,s){var n=this._getNumberOfMonths(e),a=this._daylightSavingAdjust(new Date(i,s+(0>t?t:n[0]*n[1]),1));return 0>t&&a.setDate(this._getDaysInMonth(a.getFullYear(),a.getMonth())),this._isInRange(e,a)},_isInRange:function(e,t){var i,s,n=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),o=null,r=null,h=this._get(e,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),o=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(o+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||t.getTime()>=n.getTime())&&(!a||t.getTime()<=a.getTime())&&(!o||t.getFullYear()>=o)&&(!r||r>=t.getFullYear())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,s){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var n=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(s,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),n,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new n,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.11.2",e.datepicker,e.widget("ui.dialog",{version:"1.11.2",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"Close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var i=e(this).css(t).offset().top;0>i&&e(this).css("top",t.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0)},_destroy:function(){var e,t=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:e.noop,enable:e.noop,close:function(t){var i,s=this;if(this._isOpen&&this._trigger("beforeClose",t)!==!1){if(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),!this.opener.filter(":focusable").focus().length)try{i=this.document[0].activeElement,i&&"body"!==i.nodeName.toLowerCase()&&e(i).blur()}catch(n){}this._hide(this.uiDialog,this.options.hide,function(){s._trigger("close",t)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return+e(this).css("z-index")}).get(),a=Math.max.apply(null,n);return a>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",a+1),s=!0),s&&!i&&this._trigger("focus",t),s},open:function(){var t=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=e(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"),void 0)},_focusTabbable:function(){var e=this._focusedElement;
e||(e=this.element.find("[autofocus]")),e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).focus()},_keepFocus:function(t){function i(){var t=this.document[0].activeElement,i=this.uiDialog[0]===t||e.contains(this.uiDialog[0],t);i||this._focusTabbable()}t.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),this.close(t),void 0;if(t.keyCode===e.ui.keyCode.TAB&&!t.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");t.target!==n[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==s[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay(function(){n.focus()}),t.preventDefault()):(this._delay(function(){s.focus()}),t.preventDefault())}},mousedown:function(e){this._moveToTop(e)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(t){e(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=e("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(e){e.preventDefault(),this.close(e)}}),t=e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(t),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(e){this.options.title||e.html("&#160;"),e.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var t=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(i)||e.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),void 0):(e.each(i,function(i,s){var n,a;s=e.isFunction(s)?{click:s,text:i}:s,s=e.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(t.element[0],arguments)},a={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,e("<button></button>",s).button(a).appendTo(t.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0)},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){e(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,t(n))},drag:function(e,s){i._trigger("drag",e,t(s))},stop:function(n,a){var o=a.offset.left-i.document.scrollLeft(),r=a.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(o>=0?"+":"")+o+" "+"top"+(r>=0?"+":"")+r,of:i.window},e(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,t(a))}})},_makeResizable:function(){function t(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}var i=this,s=this.options,n=s.resizable,a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function(s,n){e(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,t(n))},resize:function(e,s){i._trigger("resize",e,t(s))},stop:function(n,a){var o=i.uiDialog.offset(),r=o.left-i.document.scrollLeft(),h=o.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(h>=0?"+":"")+h,of:i.window},e(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,t(a))}}).css("position",a)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=e(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),i=e.inArray(this,t);-1!==i&&t.splice(i,1)},_trackingInstances:function(){var e=this.document.data("ui-dialog-instances");return e||(e=[],this.document.data("ui-dialog-instances",e)),e},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide()},_setOptions:function(t){var i=this,s=!1,n={};e.each(t,function(e,t){i._setOption(e,t),e in i.sizeRelatedOptions&&(s=!0),e in i.resizableRelatedOptions&&(n[e]=t)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(e,t){var i,s,n=this.uiDialog;"dialogClass"===e&&n.removeClass(this.options.dialogClass).addClass(t),"disabled"!==e&&(this._super(e,t),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:""+t}),"draggable"===e&&(i=n.is(":data(ui-draggable)"),i&&!t&&n.draggable("destroy"),!i&&t&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(s=n.is(":data(ui-resizable)"),s&&!t&&n.resizable("destroy"),s&&"string"==typeof t&&n.resizable("option","handles",t),s||t===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var e,t,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),e=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),t=Math.max(0,s.minHeight-e),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-e):"none","auto"===s.height?this.element.css({minHeight:t,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=!0;this._delay(function(){t=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(e){t||this._allowInteraction(e)||(e.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var e=this.document.data("ui-dialog-overlays")-1;e?this.document.data("ui-dialog-overlays",e):this.document.unbind("focusin").removeData("ui-dialog-overlays"),this.overlay.remove(),this.overlay=null}}}),e.widget("ui.progressbar",{version:"1.11.2",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return void 0===e?this.options.value:(this.options.value=this._constrainedValue(e),this._refreshValue(),void 0)},_constrainedValue:function(e){return void 0===e&&(e=this.options.value),this.indeterminate=e===!1,"number"!=typeof e&&(e=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,e))},_setOptions:function(e){var t=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(t),this._refreshValue()},_setOption:function(e,t){"max"===e&&(t=Math.max(this.min,t)),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var t=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).toggleClass("ui-corner-right",t===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete")}}),e.widget("ui.selectmenu",{version:"1.11.2",defaultElement:"<select>",options:{appendTo:null,disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:null,change:null,close:null,focus:null,open:null,select:null},_create:function(){var e=this.element.uniqueId().attr("id");this.ids={element:e,button:e+"-button",menu:e+"-menu"},this._drawButton(),this._drawMenu(),this.options.disabled&&this.disable()},_drawButton:function(){var t=this,i=this.element.attr("tabindex");this.label=e("label[for='"+this.ids.element+"']").attr("for",this.ids.button),this._on(this.label,{click:function(e){this.button.focus(),e.preventDefault()}}),this.element.hide(),this.button=e("<span>",{"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all",tabindex:i||this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true"}).insertAfter(this.element),e("<span>",{"class":"ui-icon "+this.options.icons.button}).prependTo(this.button),this.buttonText=e("<span>",{"class":"ui-selectmenu-text"}).appendTo(this.button),this._setText(this.buttonText,this.element.find("option:selected").text()),this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){t.menuItems||t._refreshMenu()}),this._hoverable(this.button),this._focusable(this.button)},_drawMenu:function(){var t=this;this.menu=e("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=e("<div>",{"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()),this.menuInstance=this.menu.menu({role:"listbox",select:function(e,i){e.preventDefault(),t._setSelection(),t._select(i.item.data("ui-selectmenu-item"),e)},focus:function(e,i){var s=i.item.data("ui-selectmenu-item");null!=t.focusIndex&&s.index!==t.focusIndex&&(t._trigger("focus",e,{item:s}),t.isOpen||t._select(s,e)),t.focusIndex=s.index,t.button.attr("aria-activedescendant",t.menuItems.eq(s.index).attr("id"))}}).menu("instance"),this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this._setText(this.buttonText,this._getSelectedItem().text()),this.options.width||this._resizeButton()},_refreshMenu:function(){this.menu.empty();var e,t=this.element.find("option");t.length&&(this._parseOptions(t),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup"),e=this._getSelectedItem(),this.menuInstance.focus(null,e),this._setAria(e.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(e){this.options.disabled||(this.menuItems?(this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",e))},_position:function(){this.menuWrap.position(e.extend({of:this.button},this.options.position))},close:function(e){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",e))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderMenu:function(t,i){var s=this,n="";e.each(i,function(i,a){a.optgroup!==n&&(e("<li>",{"class":"ui-selectmenu-optgroup ui-menu-divider"+(a.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""),text:a.optgroup}).appendTo(t),n=a.optgroup),s._renderItemData(t,a)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-selectmenu-item",t)},_renderItem:function(t,i){var s=e("<li>");return i.disabled&&s.addClass("ui-state-disabled"),this._setText(s,i.label),s.appendTo(t)},_setText:function(e,t){t?e.text(t):e.html("&#160;")},_move:function(e,t){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex):(i=this.menuItems.eq(this.element[0].selectedIndex),n+=":not(.ui-state-disabled)"),s="first"===e||"last"===e?i["first"===e?"prevAll":"nextAll"](n).eq(-1):i[e+"All"](n).eq(0),s.length&&this.menuInstance.focus(t,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex)},_toggle:function(e){this[this.isOpen?"close":"open"](e)},_setSelection:function(){var e;this.range&&(window.getSelection?(e=window.getSelection(),e.removeAllRanges(),e.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(t){this.isOpen&&(e(t.target).closest(".ui-selectmenu-menu, #"+this.ids.button).length||this.close(t))}},_buttonEvents:{mousedown:function(){var e;window.getSelection?(e=window.getSelection(),e.rangeCount&&(this.range=e.getRangeAt(0))):this.range=document.selection.createRange()},click:function(e){this._setSelection(),this._toggle(e)},keydown:function(t){var i=!0;switch(t.keyCode){case e.ui.keyCode.TAB:case e.ui.keyCode.ESCAPE:this.close(t),i=!1;break;case e.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(t);break;case e.ui.keyCode.UP:t.altKey?this._toggle(t):this._move("prev",t);break;case e.ui.keyCode.DOWN:t.altKey?this._toggle(t):this._move("next",t);break;case e.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(t):this._toggle(t);break;case e.ui.keyCode.LEFT:this._move("prev",t);break;case e.ui.keyCode.RIGHT:this._move("next",t);break;case e.ui.keyCode.HOME:case e.ui.keyCode.PAGE_UP:this._move("first",t);break;case e.ui.keyCode.END:case e.ui.keyCode.PAGE_DOWN:this._move("last",t);break;default:this.menu.trigger(t),i=!1}i&&t.preventDefault()}},_selectFocusedItem:function(e){var t=this.menuItems.eq(this.focusIndex);t.hasClass("ui-state-disabled")||this._select(t.data("ui-selectmenu-item"),e)},_select:function(e,t){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=e.index,this._setText(this.buttonText,e.label),this._setAria(e),this._trigger("select",t,{item:e}),e.index!==i&&this._trigger("change",t,{item:e}),this.close(t)},_setAria:function(e){var t=this.menuItems.eq(e.index).attr("id");this.button.attr({"aria-labelledby":t,"aria-activedescendant":t}),this.menu.attr("aria-activedescendant",t)},_setOption:function(e,t){"icons"===e&&this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(t.button),this._super(e,t),"appendTo"===e&&this.menuWrap.appendTo(this._appendTo()),"disabled"===e&&(this.menuInstance.option("disabled",t),this.button.toggleClass("ui-state-disabled",t).attr("aria-disabled",t),this.element.prop("disabled",t),t?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)),"width"===e&&this._resizeButton()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_toggleAttr:function(){this.button.toggleClass("ui-corner-top",this.isOpen).toggleClass("ui-corner-all",!this.isOpen).attr("aria-expanded",this.isOpen),this.menuWrap.toggleClass("ui-selectmenu-open",this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var e=this.options.width;e||(e=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(e)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){return{disabled:this.element.prop("disabled")}},_parseOptions:function(t){var i=[];t.each(function(t,s){var n=e(s),a=n.parent("optgroup");i.push({element:n,index:t,value:n.attr("value"),label:n.text(),optgroup:a.attr("label")||"",disabled:a.prop("disabled")||n.prop("disabled")})}),this.items=i},_destroy:function(){this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.label.attr("for",this.ids.element)}}),e.widget("ui.slider",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),t=n.length;i>t;t++)o.push(a);this.handles=n.add(e(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)})},_createRange:function(){var t=this.options,i="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var i,s,n,a,o,r,h,l,u=this,d=this.options;return d.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(n>i||n===i&&(t===u._lastChangedValue||u.values(t)===d.min))&&(n=i,a=e(this),o=t)}),r=this._start(t,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-a.width()/2,top:t.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,n,a;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(n=this.values(),n[t]=i,a=this._trigger("slide",e,{handle:this.handles[t],value:i,values:n}),s=this.values(t?0:1),a!==!1&&this.values(t,i))):i!==this.value()&&(a=this._trigger("slide",e,{handle:this.handles[t],value:i}),a!==!1&&this.value(i))},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(t,i){var s,n,a;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),void 0;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(t,i){var s,n=0;switch("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(n=this.options.values.length),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!i),this._super(t,i),t){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var e=(this.options.max-this._valueMin())%this.options.step;this.max=this.options.max-e},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var t,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:r.animate}))),t=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(t){var i,s,n,a,o=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(t.target).addClass("ui-state-active"),i=this._start(t,o),i===!1))return}switch(a=this.options.step,s=n=this.options.values&&this.options.values.length?this.values(o):this.value(),t.keyCode){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+a);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-a)}this._slide(t,o,n)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"))}}}),e.widget("ui.spinner",{version:"1.11.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},i=this.element;return e.each(["min","max","step"],function(e,s){var n=i.attr(s);void 0!==n&&n.length&&(t[s]=n)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e),void 0)},mousewheel:function(e,t){if(t){if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()}},"mousedown .ui-spinner-button":function(t){function i(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(t)!==!1&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t)===!1?!1:(this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*e.height())&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()},_keydown:function(t){var i=this.options,s=e.ui.keyCode;switch(t.keyCode){case s.UP:return this._repeat(null,1,t),!0;case s.DOWN:return this._repeat(null,-1,t),!0;case s.PAGE_UP:return this._repeat(null,i.page,t),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"
},_start:function(e){return this.spinning||this._trigger("start",e)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(e,t,i){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,i)},e),this._spin(t*this.options.step,i)},_spin:function(e,t){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+e*this._increment(this.counter)),this.spinning&&this._trigger("spin",t,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_adjustValue:function(e){var t,i,s=this.options;return t=null!==s.min?s.min:0,i=e-t,i=Math.round(i/s.step)*s.step,e=t+i,e=parseFloat(e.toFixed(this._precision())),null!==s.max&&e>s.max?s.max:null!==s.min&&s.min>e?s.min:e},_stop:function(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e))},_setOption:function(e,t){if("culture"===e||"numberFormat"===e){var i=this._parse(this.element.val());return this.options[e]=t,this.element.val(this._format(i)),void 0}("max"===e||"min"===e||"step"===e)&&"string"==typeof t&&(t=this._parse(t)),"icons"===e&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)),this._super(e,t),"disabled"===e&&(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable"))},_setOptions:h(function(e){this._super(e)}),_parse:function(e){return"string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e},_format:function(e){return""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var e=this.value();return null===e?!1:e===this._adjustValue(e)},_value:function(e,t){var i;""!==e&&(i=this._parse(e),null!==i&&(t||(i=this._adjustValue(i)),e=this._format(i))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:h(function(e){this._stepUp(e)}),_stepUp:function(e){this._start()&&(this._spin((e||1)*this.options.step),this._stop())},stepDown:h(function(e){this._stepDown(e)}),_stepDown:function(e){this._start()&&(this._spin((e||1)*-this.options.step),this._stop())},pageUp:h(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:h(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){return arguments.length?(h(this._value).call(this,e),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}}),e.widget("ui.tabs",{version:"1.11.2",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var e=/#.*$/;return function(t){var i,s;t=t.cloneNode(!1),i=t.href.replace(e,""),s=location.href.replace(e,"");try{i=decodeURIComponent(i)}catch(n){}try{s=decodeURIComponent(s)}catch(n){}return t.hash.length>1&&i===s}}(),_create:function(){var t=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible),this._processTabs(),i.active=this._initialActive(),e.isArray(i.disabled)&&(i.disabled=e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):e(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var t=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===t&&(s&&this.tabs.each(function(i,n){return e(n).attr("aria-controls")===s?(t=i,!1):void 0}),null===t&&(t=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===t||-1===t)&&(t=this.tabs.length?0:!1)),t!==!1&&(t=this.tabs.index(this.tabs.eq(t)),-1===t&&(t=i?!1:0)),!i&&t===!1&&this.anchors.length&&(t=0),t},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var i=e(this.document[0].activeElement).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:s++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n=!1,s--;break;case e.ui.keyCode.END:s=this.anchors.length-1;break;case e.ui.keyCode.HOME:s=0;break;case e.ui.keyCode.SPACE:return t.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case e.ui.keyCode.ENTER:return t.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return}t.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),t.ctrlKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(t){return t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,i){function s(){return t>n&&(t=0),0>t&&(t=n),t}for(var n=this.tabs.length-1;-1!==e.inArray(s(),this.options.disabled);)t=i?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):"disabled"===e?(this._setupDisabled(t),void 0):(this._super(e,t),"collapsible"===e&&(this.element.toggleClass("ui-tabs-collapsible",t),t||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(t),"heightStyle"===e&&this._setupHeightStyle(t),void 0)},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,i=this.tablist.children(":has(a[href])");t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e)}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(i,s){var n,a,o,r=e(s).uniqueId().attr("id"),h=e(s).closest("li"),l=h.attr("aria-controls");t._isLocal(s)?(n=s.hash,o=n.substring(1),a=t.element.find(t._sanitizeSelector(n))):(o=h.attr("aria-controls")||e({}).uniqueId()[0].id,n="#"+o,a=t.element.find(n),a.length||(a=t._createPanel(o),a.insertAfter(t.panels[i-1]||t.tablist)),a.attr("aria-live","polite")),a.length&&(t.panels=t.panels.add(a)),l&&h.data("ui-tabs-aria-controls",l),h.attr({"aria-controls":o,"aria-labelledby":r}),a.attr("aria-labelledby",r)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(n.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var i,s=0;i=this.tabs[s];s++)t===!0||-1!==e.inArray(s,t)?e(i).addClass("ui-state-disabled").attr("aria-disabled","true"):e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var i={};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(e){e.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,s=this.element.parent();"fill"===t?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=e(this),s=t.css("position");"absolute"!==s&&"fixed"!==s&&(i-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,e(this).height("").height())}).height(i))},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n.closest("li"),o=a[0]===s[0],r=o&&i.collapsible,h=r?e():this._getPanelForTab(a),l=s.length?this._getPanelForTab(s):e(),u={oldTab:s,oldPanel:l,newTab:r?e():a,newPanel:h};t.preventDefault(),a.hasClass("ui-state-disabled")||a.hasClass("ui-tabs-loading")||this.running||o&&!i.collapsible||this._trigger("beforeActivate",t,u)===!1||(i.active=r?!1:this.tabs.index(a),this.active=o?e():a,this.xhr&&this.xhr.abort(),l.length||h.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(a),t),this._toggle(t,u))},_toggle:function(t,i){function s(){a.running=!1,a._trigger("activate",t,i)}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),o.length&&a.options.show?a._show(o,a.options.show,s):(o.show(),s())}var a=this,o=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),n()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),n()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),o.length&&r.length?i.oldTab.attr("tabIndex",-1):o.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),o.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(t){var i,s=this._findActive(t);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(t){var i=this.options.disabled;i!==!1&&(void 0===t?i=!1:(t=this._getIndex(t),i=e.isArray(i)?e.map(i,function(e){return e!==t?e:null}):e.map(this.tabs,function(e,i){return i!==t?i:null})),this._setupDisabled(i))},disable:function(t){var i=this.options.disabled;if(i!==!0){if(void 0===t)i=!0;else{if(t=this._getIndex(t),-1!==e.inArray(t,i))return;i=e.isArray(i)?e.merge([t],i).sort():[t]}this._setupDisabled(i)}},load:function(t,i){t=this._getIndex(t);var s=this,n=this.tabs.eq(t),a=n.find(".ui-tabs-anchor"),o=this._getPanelForTab(n),r={tab:n,panel:o};this._isLocal(a[0])||(this.xhr=e.ajax(this._ajaxSettings(a,i,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(n.addClass("ui-tabs-loading"),o.attr("aria-busy","true"),this.xhr.success(function(e){setTimeout(function(){o.html(e),s._trigger("load",i,r)},1)}).complete(function(e,t){setTimeout(function(){"abort"===t&&s.panels.stop(!1,!0),n.removeClass("ui-tabs-loading"),o.removeAttr("aria-busy"),e===s.xhr&&delete s.xhr},1)})))},_ajaxSettings:function(t,i,s){var n=this;return{url:t.attr("href"),beforeSend:function(t,a){return n._trigger("beforeLoad",i,e.extend({jqXHR:t,ajaxSettings:a},s))}}},_getPanelForTab:function(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}}),e.widget("ui.tooltip",{version:"1.11.2",options:{content:function(){var t=e(this).attr("title")||"";return e("<a>").text(t).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_addDescribedBy:function(t,i){var s=(t.attr("aria-describedby")||"").split(/\s+/);s.push(i),t.data("ui-tooltip-id",i).attr("aria-describedby",e.trim(s.join(" ")))},_removeDescribedBy:function(t){var i=t.data("ui-tooltip-id"),s=(t.attr("aria-describedby")||"").split(/\s+/),n=e.inArray(i,s);-1!==n&&s.splice(n,1),t.removeData("ui-tooltip-id"),s=e.trim(s.join(" ")),s?t.attr("aria-describedby",s):t.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable(),this.liveRegion=e("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)},_setOption:function(t,i){var s=this;return"disabled"===t?(this[i?"_disable":"_enable"](),this.options[t]=i,void 0):(this._super(t,i),"content"===t&&e.each(this.tooltips,function(e,t){s._updateContent(t.element)}),void 0)},_disable:function(){var t=this;e.each(this.tooltips,function(i,s){var n=e.Event("blur");n.target=n.currentTarget=s.element[0],t.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).removeAttr("title")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var i=this,s=e(t?t.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&s.parents().each(function(){var t,s=e(this);s.data("ui-tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,i.close(t,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,t))},_updateContent:function(e,t){var i,s=this.options.content,n=this,a=t?t.type:null;return"string"==typeof s?this._open(t,e,s):(i=s.call(e[0],function(i){e.data("ui-tooltip-open")&&n._delay(function(){t&&(t.type=a),this._open(t,e,i)})}),i&&this._open(t,e,i),void 0)},_open:function(t,i,s){function n(e){u.of=e,o.is(":hidden")||o.position(u)}var a,o,r,h,l,u=e.extend({},this.options.position);if(s){if(a=this._find(i))return a.tooltip.find(".ui-tooltip-content").html(s),void 0;i.is("[title]")&&(t&&"mouseover"===t.type?i.attr("title",""):i.removeAttr("title")),a=this._tooltip(i),o=a.tooltip,this._addDescribedBy(i,o.attr("id")),o.find(".ui-tooltip-content").html(s),this.liveRegion.children().hide(),s.clone?(l=s.clone(),l.removeAttr("id").find("[id]").removeAttr("id")):l=s,e("<div>").html(l).appendTo(this.liveRegion),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:n}),n(t)):o.position(e.extend({of:i},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){o.is(":visible")&&(n(u.of),clearInterval(h))},e.fx.interval)),this._trigger("open",t,{tooltip:o}),r={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var s=e.Event(t);s.currentTarget=i[0],this.close(s,!0)}}},i[0]!==this.element[0]&&(r.remove=function(){this._removeTooltip(o)}),t&&"mouseover"!==t.type||(r.mouseleave="close"),t&&"focusin"!==t.type||(r.focusout="close"),this._on(!0,i,r)}},close:function(t){var i,s=this,n=e(t?t.currentTarget:this.element),a=this._find(n);a&&(i=a.tooltip,a.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),a.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){s._removeTooltip(e(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&e.each(this.parents,function(t,i){e(i.element).attr("title",i.title),delete s.parents[t]}),a.closing=!0,this._trigger("close",t,{tooltip:i}),a.hiding||(a.closing=!1)))},_tooltip:function(t){var i=e("<div>").attr("role","tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||"")),s=i.uniqueId().attr("id");return e("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),this.tooltips[s]={element:t,tooltip:i}},_find:function(e){var t=e.data("ui-tooltip-id");return t?this.tooltips[t]:null},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(i,s){var n=e.Event("blur"),a=s.element;n.target=n.currentTarget=a[0],t.close(n,!0),e("#"+i).remove(),a.data("ui-tooltip-title")&&(a.attr("title")||a.attr("title",a.data("ui-tooltip-title")),a.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}});var y="ui-effects-",b=e;e.effects={effect:{}},function(e,t){function i(e,t,i){var s=d[t.type]||{};return null==e?i||!t.def?null:t.def:(e=s.floor?~~e:parseFloat(e),isNaN(e)?t.def:s.mod?(e+s.mod)%s.mod:0>e?0:e>s.max?s.max:e)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(e,a){var o,r=a.re.exec(i),h=r&&a.parse(r),l=a.space||"rgba";return h?(o=s[l](h),s[u[l].cache]=o[u[l].cache],n=s._rgba=o._rgba,!1):t}),n.length?("0,0,0,0"===n.join()&&e.extend(n,a.transparent),s):a[i]}function n(e,t,i){return i=(i+1)%1,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+6*(t-e)*(2/3-i):e}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],l=e.Color=function(t,i,s,n){return new e.Color.fn.parse(t,i,s,n)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},d={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},c=l.support={},p=e("<p>")[0],f=e.each;p.style.cssText="background-color:rgba(1,1,1,.5)",c.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),l.fn=e.extend(l.prototype,{parse:function(n,o,r,h){if(n===t)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=e(n).css(o),o=t);var d=this,c=e.type(n),p=this._rgba=[];return o!==t&&(n=[n,o,r,h],c="array"),"string"===c?this.parse(s(n)||a._default):"array"===c?(f(u.rgba.props,function(e,t){p[t.idx]=i(n[t.idx],t)}),this):"object"===c?(n instanceof l?f(u,function(e,t){n[t.cache]&&(d[t.cache]=n[t.cache].slice())}):f(u,function(t,s){var a=s.cache;f(s.props,function(e,t){if(!d[a]&&s.to){if("alpha"===e||null==n[e])return;d[a]=s.to(d._rgba)}d[a][t.idx]=i(n[e],t,!0)}),d[a]&&0>e.inArray(null,d[a].slice(0,3))&&(d[a][3]=1,s.from&&(d._rgba=s.from(d[a])))}),this):t},is:function(e){var i=l(e),s=!0,n=this;return f(u,function(e,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(e,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:t})),s}),s},_space:function(){var e=[],t=this;return f(u,function(i,s){t[s.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var s=l(e),n=s._space(),a=u[n],o=0===this.alpha()?l("transparent"):this,r=o[a.cache]||a.to(o._rgba),h=r.slice();return s=s[a.cache],f(a.props,function(e,n){var a=n.idx,o=r[a],l=s[a],u=d[n.type]||{};null!==l&&(null===o?h[a]=l:(u.mod&&(l-o>u.mod/2?o+=u.mod:o-l>u.mod/2&&(o-=u.mod)),h[a]=i((l-o)*t+o,n)))}),this[n](h)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(t)._rgba;return l(e.map(i,function(e,t){return(1-s)*n[t]+s*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),s=i.pop();return t&&i.push(~~(255*s)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,s=e[0]/255,n=e[1]/255,a=e[2]/255,o=e[3],r=Math.max(s,n,a),h=Math.min(s,n,a),l=r-h,u=r+h,d=.5*u;return t=h===r?0:s===r?60*(n-a)/l+360:n===r?60*(a-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=d?l/u:l/(2-u),[Math.round(t)%360,i,d,null==o?1:o]},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],s=e[2],a=e[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,t+1/3)),Math.round(255*n(r,o,t)),Math.round(255*n(r,o,t-1/3)),a]},f(u,function(s,n){var a=n.props,o=n.cache,h=n.to,u=n.from;l.fn[s]=function(s){if(h&&!this[o]&&(this[o]=h(this._rgba)),s===t)return this[o].slice();var n,r=e.type(s),d="array"===r||"object"===r?s:arguments,c=this[o].slice();return f(a,function(e,t){var s=d["object"===r?e:t.idx];null==s&&(s=c[t.idx]),c[t.idx]=i(s,t)}),u?(n=l(u(c)),n[o]=c,n):l(c)},f(a,function(t,i){l.fn[t]||(l.fn[t]=function(n){var a,o=e.type(n),h="alpha"===t?this._hsla?"hsla":"rgba":s,l=this[h](),u=l[i.idx];return"undefined"===o?u:("function"===o&&(n=n.call(this,u),o=e.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=u+parseFloat(a[2])*("+"===a[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(t){var i=t.split(" ");f(i,function(t,i){e.cssHooks[i]={set:function(t,n){var a,o,r="";if("transparent"!==n&&("string"!==e.type(n)||(a=s(n)))){if(n=l(a||n),!c.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?t.parentNode:t;(""===r||"transparent"===r)&&o&&o.style;)try{r=e.css(o,"backgroundColor"),o=o.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{t.style[i]=n}catch(h){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=l(t.elem,i),t.end=l(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},l.hook(o),e.cssHooks.borderColor={expand:function(e){var t={};return f(["Top","Right","Bottom","Left"],function(i,s){t["border"+s+"Color"]=e}),t}},a=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(b),function(){function t(t){var i,s,n=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[e.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function i(t,i){var s,a,o={};for(s in i)a=i[s],t[s]!==a&&(n[s]||(e.fx.step[s]||!isNaN(parseFloat(a)))&&(o[s]=a));return o}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(b.style(e.elem,i,e.end),e.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(n,a,o,r){var h=e.speed(a,o,r);return this.queue(function(){var a,o=e(this),r=o.attr("class")||"",l=h.children?o.find("*").addBack():o;l=l.map(function(){var i=e(this);return{el:i,start:t(this)}}),a=function(){e.each(s,function(e,t){n[t]&&o[t+"Class"](n[t])})},a(),l=l.map(function(){return this.end=t(this.el[0]),this.diff=i(this.start,this.end),this}),o.attr("class",r),l=l.map(function(){var t=this,i=e.Deferred(),s=e.extend({},h,{queue:!1,complete:function(){i.resolve(t)}});return this.el.animate(this.diff,s),i.promise()}),e.when.apply(e,l.get()).done(function(){a(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),h.complete.call(o[0])})})},e.fn.extend({addClass:function(t){return function(i,s,n,a){return s?e.effects.animateClass.call(this,{add:i},s,n,a):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(i,s,n,a){return arguments.length>1?e.effects.animateClass.call(this,{remove:i},s,n,a):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(i,s,n,a,o){return"boolean"==typeof s||void 0===s?n?e.effects.animateClass.call(this,s?{add:i}:{remove:i},n,a,o):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:i},s,n,a)}}(e.fn.toggleClass),switchClass:function(t,i,s,n,a){return e.effects.animateClass.call(this,{add:i,remove:t},s,n,a)}})}(),function(){function t(t,i,s,n){return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(n=s,s=i,i={}),e.isFunction(s)&&(n=s,s=null),i&&e.extend(t,i),s=s||i.duration,t.duration=e.fx.off?0:"number"==typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default,t.complete=n||i.complete,t}function i(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}e.extend(e.effects,{version:"1.11.2",save:function(e,t){for(var i=0;t.length>i;i++)null!==t[i]&&e.data(y+t[i],e[0].style[t[i]])},restore:function(e,t){var i,s;for(s=0;t.length>s;s++)null!==t[s]&&(i=e.data(y+t[s]),void 0===i&&(i=""),e.css(t[s],i))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var i,s;switch(e[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=e[0]/t.height}switch(e[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=e[1]/t.width}return{x:s,y:i}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var i={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:t.width(),height:t.height()},a=document.activeElement;try{a.id}catch(o){a=document.body}return t.wrap(s),(t[0]===a||e.contains(t[0],a))&&e(a).focus(),s=t.parent(),"static"===t.css("position")?(s.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,s){i[s]=t.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(n),s.css(i).show()},removeWrapper:function(t){var i=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).focus()),t},setTransition:function(t,i,s,n){return n=n||{},e.each(i,function(e,i){var a=t.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),e.fn.extend({effect:function(){function i(t){function i(){e.isFunction(a)&&a.call(n[0]),e.isFunction(t)&&t()}var n=e(this),a=s.complete,r=s.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),i()):o.call(n[0],s,i)}var s=t.apply(this,arguments),n=s.mode,a=s.queue,o=e.effects.effect[s.effect];return e.fx.off||!o?n?this[n](s.duration,s.complete):this.each(function(){s.complete&&s.complete.call(this)}):a===!1?this.each(i):this.queue(a||"fx",i)},show:function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="show",this.effect.call(this,n)}}(e.fn.show),hide:function(e){return function(s){if(i(s))return e.apply(this,arguments);
var n=t.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(e.fn.hide),toggle:function(e){return function(s){if(i(s)||"boolean"==typeof s)return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(e.fn.toggle),cssUnit:function(t){var i=this.css(t),s=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(s=[parseFloat(i),t])}),s}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,i=4;((t=Math.pow(2,--i))-1)/11>e;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e)},e.easing["easeInOut"+t]=function(e){return.5>e?i(2*e)/2:1-i(-2*e+2)/2}})}(),e.effects,e.effects.effect.blind=function(t,i){var s,n,a,o=e(this),r=/up|down|vertical/,h=/up|left|vertical|horizontal/,l=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(o,t.mode||"hide"),d=t.direction||"up",c=r.test(d),p=c?"height":"width",f=c?"top":"left",m=h.test(d),g={},v="show"===u;o.parent().is(".ui-effects-wrapper")?e.effects.save(o.parent(),l):e.effects.save(o,l),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n=s[p](),a=parseFloat(s.css(f))||0,g[p]=v?n:0,m||(o.css(c?"bottom":"right",0).css(c?"top":"left","auto").css({position:"absolute"}),g[f]=v?a:n+a),v&&(s.css(p,0),m||s.css(f,a+n)),s.animate(g,{duration:t.duration,easing:t.easing,queue:!1,complete:function(){"hide"===u&&o.hide(),e.effects.restore(o,l),e.effects.removeWrapper(o),i()}})},e.effects.effect.bounce=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"effect"),l="hide"===h,u="show"===h,d=t.direction||"up",c=t.distance,p=t.times||5,f=2*p+(u||l?1:0),m=t.duration/f,g=t.easing,v="up"===d||"down"===d?"top":"left",y="up"===d||"left"===d,b=o.queue(),_=b.length;for((u||l)&&r.push("opacity"),e.effects.save(o,r),o.show(),e.effects.createWrapper(o),c||(c=o["top"===v?"outerHeight":"outerWidth"]()/3),u&&(a={opacity:1},a[v]=0,o.css("opacity",0).css(v,y?2*-c:2*c).animate(a,m,g)),l&&(c/=Math.pow(2,p-1)),a={},a[v]=0,s=0;p>s;s++)n={},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g).animate(a,m,g),c=l?2*c:c/2;l&&(n={opacity:0},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g)),o.queue(function(){l&&o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i()}),_>1&&b.splice.apply(b,[1,0].concat(b.splice(_,f+1))),o.dequeue()},e.effects.effect.clip=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"hide"),l="show"===h,u=t.direction||"vertical",d="vertical"===u,c=d?"height":"width",p=d?"top":"left",f={};e.effects.save(o,r),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n="IMG"===o[0].tagName?s:o,a=n[c](),l&&(n.css(c,0),n.css(p,a/2)),f[c]=l?a:0,f[p]=l?0:a/2,n.animate(f,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){l||o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i()}})},e.effects.effect.drop=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","opacity","height","width"],o=e.effects.setMode(n,t.mode||"hide"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h?"pos":"neg",d={opacity:r?1:0};e.effects.save(n,a),n.show(),e.effects.createWrapper(n),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,r&&n.css("opacity",0).css(l,"pos"===u?-s:s),d[l]=(r?"pos"===u?"+=":"-=":"pos"===u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}})},e.effects.effect.explode=function(t,i){function s(){b.push(this),b.length===d*c&&n()}function n(){p.css({visibility:"visible"}),e(b).remove(),m||p.hide(),i()}var a,o,r,h,l,u,d=t.pieces?Math.round(Math.sqrt(t.pieces)):3,c=d,p=e(this),f=e.effects.setMode(p,t.mode||"hide"),m="show"===f,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/c),y=Math.ceil(p.outerHeight()/d),b=[];for(a=0;d>a;a++)for(h=g.top+a*y,u=a-(d-1)/2,o=0;c>o;o++)r=g.left+o*v,l=o-(c-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-o*v,top:-a*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:r+(m?l*v:0),top:h+(m?u*y:0),opacity:m?0:1}).animate({left:r+(m?0:l*v),top:h+(m?0:u*y),opacity:m?1:0},t.duration||500,t.easing,s)},e.effects.effect.fade=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"toggle");s.animate({opacity:n},{queue:!1,duration:t.duration,easing:t.easing,complete:i})},e.effects.effect.fold=function(t,i){var s,n,a=e(this),o=["position","top","bottom","left","right","height","width"],r=e.effects.setMode(a,t.mode||"hide"),h="show"===r,l="hide"===r,u=t.size||15,d=/([0-9]+)%/.exec(u),c=!!t.horizFirst,p=h!==c,f=p?["width","height"]:["height","width"],m=t.duration/2,g={},v={};e.effects.save(a,o),a.show(),s=e.effects.createWrapper(a).css({overflow:"hidden"}),n=p?[s.width(),s.height()]:[s.height(),s.width()],d&&(u=parseInt(d[1],10)/100*n[l?0:1]),h&&s.css(c?{height:0,width:u}:{height:u,width:0}),g[f[0]]=h?n[0]:u,v[f[1]]=h?n[1]:0,s.animate(g,m,t.easing).animate(v,m,t.easing,function(){l&&a.hide(),e.effects.restore(a,o),e.effects.removeWrapper(a),i()})},e.effects.effect.highlight=function(t,i){var s=e(this),n=["backgroundImage","backgroundColor","opacity"],a=e.effects.setMode(s,t.mode||"show"),o={backgroundColor:s.css("backgroundColor")};"hide"===a&&(o.opacity=0),e.effects.save(s,n),s.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===a&&s.hide(),e.effects.restore(s,n),i()}})},e.effects.effect.size=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],l=["width","height","overflow"],u=["fontSize"],d=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],c=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(o,t.mode||"effect"),f=t.restore||"effect"!==p,m=t.scale||"both",g=t.origin||["middle","center"],v=o.css("position"),y=f?r:h,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&o.show(),s={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},"toggle"===t.mode&&"show"===p?(o.from=t.to||b,o.to=t.from||s):(o.from=t.from||("show"===p?b:s),o.to=t.to||("hide"===p?b:s)),a={from:{y:o.from.height/s.height,x:o.from.width/s.width},to:{y:o.to.height/s.height,x:o.to.width/s.width}},("box"===m||"both"===m)&&(a.from.y!==a.to.y&&(y=y.concat(d),o.from=e.effects.setTransition(o,d,a.from.y,o.from),o.to=e.effects.setTransition(o,d,a.to.y,o.to)),a.from.x!==a.to.x&&(y=y.concat(c),o.from=e.effects.setTransition(o,c,a.from.x,o.from),o.to=e.effects.setTransition(o,c,a.to.x,o.to))),("content"===m||"both"===m)&&a.from.y!==a.to.y&&(y=y.concat(u).concat(l),o.from=e.effects.setTransition(o,u,a.from.y,o.from),o.to=e.effects.setTransition(o,u,a.to.y,o.to)),e.effects.save(o,y),o.show(),e.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),g&&(n=e.effects.getBaseline(g,s),o.from.top=(s.outerHeight-o.outerHeight())*n.y,o.from.left=(s.outerWidth-o.outerWidth())*n.x,o.to.top=(s.outerHeight-o.to.outerHeight)*n.y,o.to.left=(s.outerWidth-o.to.outerWidth)*n.x),o.css(o.from),("content"===m||"both"===m)&&(d=d.concat(["marginTop","marginBottom"]).concat(u),c=c.concat(["marginLeft","marginRight"]),l=r.concat(d).concat(c),o.find("*[width]").each(function(){var i=e(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&e.effects.save(i,l),i.from={height:s.height*a.from.y,width:s.width*a.from.x,outerHeight:s.outerHeight*a.from.y,outerWidth:s.outerWidth*a.from.x},i.to={height:s.height*a.to.y,width:s.width*a.to.x,outerHeight:s.height*a.to.y,outerWidth:s.width*a.to.x},a.from.y!==a.to.y&&(i.from=e.effects.setTransition(i,d,a.from.y,i.from),i.to=e.effects.setTransition(i,d,a.to.y,i.to)),a.from.x!==a.to.x&&(i.from=e.effects.setTransition(i,c,a.from.x,i.from),i.to=e.effects.setTransition(i,c,a.to.x,i.to)),i.css(i.from),i.animate(i.to,t.duration,t.easing,function(){f&&e.effects.restore(i,l)})})),o.animate(o.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){0===o.to.opacity&&o.css("opacity",o.from.opacity),"hide"===p&&o.hide(),e.effects.restore(o,y),f||("static"===v?o.css({position:"relative",top:o.to.top,left:o.to.left}):e.each(["top","left"],function(e,t){o.css(t,function(t,i){var s=parseInt(i,10),n=e?o.to.left:o.to.top;return"auto"===i?n+"px":s+n+"px"})})),e.effects.removeWrapper(o),i()}})},e.effects.effect.scale=function(t,i){var s=e(this),n=e.extend(!0,{},t),a=e.effects.setMode(s,t.mode||"effect"),o=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"hide"===a?0:100),r=t.direction||"both",h=t.origin,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},u={y:"horizontal"!==r?o/100:1,x:"vertical"!==r?o/100:1};n.effect="size",n.queue=!1,n.complete=i,"effect"!==a&&(n.origin=h||["middle","center"],n.restore=!0),n.from=t.from||("show"===a?{height:0,width:0,outerHeight:0,outerWidth:0}:l),n.to={height:l.height*u.y,width:l.width*u.x,outerHeight:l.outerHeight*u.y,outerWidth:l.outerWidth*u.x},n.fade&&("show"===a&&(n.from.opacity=0,n.to.opacity=1),"hide"===a&&(n.from.opacity=1,n.to.opacity=0)),s.effect(n)},e.effects.effect.puff=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"hide"),a="hide"===n,o=parseInt(t.percent,10)||150,r=o/100,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:n,complete:i,percent:a?o:100,from:a?h:{height:h.height*r,width:h.width*r,outerHeight:h.outerHeight*r,outerWidth:h.outerWidth*r}}),s.effect(t)},e.effects.effect.pulsate=function(t,i){var s,n=e(this),a=e.effects.setMode(n,t.mode||"show"),o="show"===a,r="hide"===a,h=o||"hide"===a,l=2*(t.times||5)+(h?1:0),u=t.duration/l,d=0,c=n.queue(),p=c.length;for((o||!n.is(":visible"))&&(n.css("opacity",0).show(),d=1),s=1;l>s;s++)n.animate({opacity:d},u,t.easing),d=1-d;n.animate({opacity:d},u,t.easing),n.queue(function(){r&&n.hide(),i()}),p>1&&c.splice.apply(c,[1,0].concat(c.splice(p,l+1))),n.dequeue()},e.effects.effect.shake=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","height","width"],o=e.effects.setMode(n,t.mode||"effect"),r=t.direction||"left",h=t.distance||20,l=t.times||3,u=2*l+1,d=Math.round(t.duration/u),c="up"===r||"down"===r?"top":"left",p="up"===r||"left"===r,f={},m={},g={},v=n.queue(),y=v.length;for(e.effects.save(n,a),n.show(),e.effects.createWrapper(n),f[c]=(p?"-=":"+=")+h,m[c]=(p?"+=":"-=")+2*h,g[c]=(p?"-=":"+=")+2*h,n.animate(f,d,t.easing),s=1;l>s;s++)n.animate(m,d,t.easing).animate(g,d,t.easing);n.animate(m,d,t.easing).animate(f,d/2,t.easing).queue(function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}),y>1&&v.splice.apply(v,[1,0].concat(v.splice(y,u+1))),n.dequeue()},e.effects.effect.slide=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","width","height"],o=e.effects.setMode(n,t.mode||"show"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h,d={};e.effects.save(n,a),n.show(),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(n).css({overflow:"hidden"}),r&&n.css(l,u?isNaN(s)?"-"+s:-s:s),d[l]=(r?u?"+=":"-=":u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}})},e.effects.effect.transfer=function(t,i){var s=e(this),n=e(t.to),a="fixed"===n.css("position"),o=e("body"),r=a?o.scrollTop():0,h=a?o.scrollLeft():0,l=n.offset(),u={top:l.top-r,left:l.left-h,height:n.innerHeight(),width:n.innerWidth()},d=s.offset(),c=e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:d.top-r,left:d.left-h,height:s.innerHeight(),width:s.innerWidth(),position:a?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){c.remove(),i()})}});;/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
;/*
 jquery.fullscreen 1.1.4
 https://github.com/kayahr/jquery-fullscreen-plugin
 Copyright (C) 2012 Klaus Reimer <k@ailis.de>
 Licensed under the MIT license
 (See http://www.opensource.org/licenses/mit-license)
*/
function d(b){var c,a;if(!this.length)return this;c=this[0];c.ownerDocument?a=c.ownerDocument:(a=c,c=a.documentElement);if(null==b){if(!a.cancelFullScreen&&!a.webkitCancelFullScreen&&!a.mozCancelFullScreen)return null;b=!!a.fullScreen||!!a.webkitIsFullScreen||!!a.mozFullScreen;return!b?b:a.fullScreenElement||a.webkitCurrentFullScreenElement||a.mozFullScreenElement||b}b?(b=c.requestFullScreen||c.webkitRequestFullScreen||c.mozRequestFullScreen)&&b.call(c,Element.ALLOW_KEYBOARD_INPUT):(b=a.cancelFullScreen||
a.webkitCancelFullScreen||a.mozCancelFullScreen)&&b.call(a);return this}jQuery.fn.fullScreen=d;jQuery.fn.toggleFullScreen=function(){return d.call(this,!d.call(this))};var e,f,g;e=document;e.webkitCancelFullScreen?(f="webkitfullscreenchange",g="webkitfullscreenerror"):e.mozCancelFullScreen?(f="mozfullscreenchange",g="mozfullscreenerror"):(f="fullscreenchange",g="fullscreenerror");jQuery(document).bind(f,function(){jQuery(document).trigger(new jQuery.Event("fullscreenchange"))});
jQuery(document).bind(g,function(){jQuery(document).trigger(new jQuery.Event("fullscreenerror"))});;!function(a){if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else{var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.proj4=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){function Point(a,b,c){if(!(this instanceof Point))return new Point(a,b,c);if(Array.isArray(a))this.x=a[0],this.y=a[1],this.z=a[2]||0;else if("object"==typeof a)this.x=a.x,this.y=a.y,this.z=a.z||0;else if("string"==typeof a&&"undefined"==typeof b){var d=a.split(",");this.x=parseFloat(d[0],10),this.y=parseFloat(d[1],10),this.z=parseFloat(d[2],10)||0}else this.x=a,this.y=b,this.z=c||0;console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")}var c=a("mgrs");Point.fromMGRS=function(a){return new Point(c.toPoint(a))},Point.prototype.toMGRS=function(a){return c.forward([this.x,this.y],a)},b.exports=Point},{mgrs:66}],2:[function(a,b){function Projection(a,b){if(!(this instanceof Projection))return new Projection(a);b=b||function(a){if(a)throw a};var e=c(a);if("object"!=typeof e)return void b(a);var g=f(e),h=Projection.projections.get(g.projName);h?(d(this,g),d(this,h),this.init(),b(null,this)):b(a)}var c=a("./parseCode"),d=a("./extend"),e=a("./projections"),f=a("./deriveConstants");Projection.projections=e,Projection.projections.start(),b.exports=Projection},{"./deriveConstants":32,"./extend":33,"./parseCode":36,"./projections":38}],3:[function(a,b){b.exports=function(a,b,c){var d,e,f,g=c.x,h=c.y,i=c.z||0;for(f=0;3>f;f++)if(!b||2!==f||void 0!==c.z)switch(0===f?(d=g,e="x"):1===f?(d=h,e="y"):(d=i,e="z"),a.axis[f]){case"e":c[e]=d;break;case"w":c[e]=-d;break;case"n":c[e]=d;break;case"s":c[e]=-d;break;case"u":void 0!==c[e]&&(c.z=d);break;case"d":void 0!==c[e]&&(c.z=-d);break;default:return null}return c}},{}],4:[function(a,b){var c=Math.PI/2,d=a("./sign");b.exports=function(a){return Math.abs(a)<c?a:a-d(a)*Math.PI}},{"./sign":21}],5:[function(a,b){var c=2*Math.PI,d=a("./sign");b.exports=function(a){return Math.abs(a)<Math.PI?a:a-d(a)*c}},{"./sign":21}],6:[function(a,b){b.exports=function(a){return Math.abs(a)>1&&(a=a>1?1:-1),Math.asin(a)}},{}],7:[function(a,b){b.exports=function(a){return 1-.25*a*(1+a/16*(3+1.25*a))}},{}],8:[function(a,b){b.exports=function(a){return.375*a*(1+.25*a*(1+.46875*a))}},{}],9:[function(a,b){b.exports=function(a){return.05859375*a*a*(1+.75*a)}},{}],10:[function(a,b){b.exports=function(a){return a*a*a*(35/3072)}},{}],11:[function(a,b){b.exports=function(a,b,c){var d=b*c;return a/Math.sqrt(1-d*d)}},{}],12:[function(a,b){b.exports=function(a,b,c,d,e){var f,g;f=a/b;for(var h=0;15>h;h++)if(g=(a-(b*f-c*Math.sin(2*f)+d*Math.sin(4*f)-e*Math.sin(6*f)))/(b-2*c*Math.cos(2*f)+4*d*Math.cos(4*f)-6*e*Math.cos(6*f)),f+=g,Math.abs(g)<=1e-10)return f;return 0/0}},{}],13:[function(a,b){var c=Math.PI/2;b.exports=function(a,b){var d=1-(1-a*a)/(2*a)*Math.log((1-a)/(1+a));if(Math.abs(Math.abs(b)-d)<1e-6)return 0>b?-1*c:c;for(var e,f,g,h,i=Math.asin(.5*b),j=0;30>j;j++)if(f=Math.sin(i),g=Math.cos(i),h=a*f,e=Math.pow(1-h*h,2)/(2*g)*(b/(1-a*a)-f/(1-h*h)+.5/a*Math.log((1-h)/(1+h))),i+=e,Math.abs(e)<=1e-10)return i;return 0/0}},{}],14:[function(a,b){b.exports=function(a,b,c,d,e){return a*e-b*Math.sin(2*e)+c*Math.sin(4*e)-d*Math.sin(6*e)}},{}],15:[function(a,b){b.exports=function(a,b,c){var d=a*b;return c/Math.sqrt(1-d*d)}},{}],16:[function(a,b){var c=Math.PI/2;b.exports=function(a,b){for(var d,e,f=.5*a,g=c-2*Math.atan(b),h=0;15>=h;h++)if(d=a*Math.sin(g),e=c-2*Math.atan(b*Math.pow((1-d)/(1+d),f))-g,g+=e,Math.abs(e)<=1e-10)return g;return-9999}},{}],17:[function(a,b){var c=1,d=.25,e=.046875,f=.01953125,g=.01068115234375,h=.75,i=.46875,j=.013020833333333334,k=.007120768229166667,l=.3645833333333333,m=.005696614583333333,n=.3076171875;b.exports=function(a){var b=[];b[0]=c-a*(d+a*(e+a*(f+a*g))),b[1]=a*(h-a*(e+a*(f+a*g)));var o=a*a;return b[2]=o*(i-a*(j+a*k)),o*=a,b[3]=o*(l-a*m),b[4]=o*a*n,b}},{}],18:[function(a,b){var c=a("./pj_mlfn"),d=1e-10,e=20;b.exports=function(a,b,f){for(var g=1/(1-b),h=a,i=e;i;--i){var j=Math.sin(h),k=1-b*j*j;if(k=(c(h,j,Math.cos(h),f)-a)*k*Math.sqrt(k)*g,h-=k,Math.abs(k)<d)return h}return h}},{"./pj_mlfn":19}],19:[function(a,b){b.exports=function(a,b,c,d){return c*=b,b*=b,d[0]*a-c*(d[1]+b*(d[2]+b*(d[3]+b*d[4])))}},{}],20:[function(a,b){b.exports=function(a,b){var c;return a>1e-7?(c=a*b,(1-a*a)*(b/(1-c*c)-.5/a*Math.log((1-c)/(1+c)))):2*b}},{}],21:[function(a,b){b.exports=function(a){return 0>a?-1:1}},{}],22:[function(a,b){b.exports=function(a,b){return Math.pow((1-a)/(1+a),b)}},{}],23:[function(a,b){b.exports=function(a){var b={x:a[0],y:a[1]};return a.length>2&&(b.z=a[2]),a.length>3&&(b.m=a[3]),b}},{}],24:[function(a,b){var c=Math.PI/2;b.exports=function(a,b,d){var e=a*d,f=.5*a;return e=Math.pow((1-e)/(1+e),f),Math.tan(.5*(c-b))/e}},{}],25:[function(a,b,c){c.wgs84={towgs84:"0,0,0",ellipse:"WGS84",datumName:"WGS84"},c.ch1903={towgs84:"674.374,15.056,405.346",ellipse:"bessel",datumName:"swiss"},c.ggrs87={towgs84:"-199.87,74.79,246.62",ellipse:"GRS80",datumName:"Greek_Geodetic_Reference_System_1987"},c.nad83={towgs84:"0,0,0",ellipse:"GRS80",datumName:"North_American_Datum_1983"},c.nad27={nadgrids:"@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",ellipse:"clrk66",datumName:"North_American_Datum_1927"},c.potsdam={towgs84:"606.0,23.0,413.0",ellipse:"bessel",datumName:"Potsdam Rauenberg 1950 DHDN"},c.carthage={towgs84:"-263.0,6.0,431.0",ellipse:"clark80",datumName:"Carthage 1934 Tunisia"},c.hermannskogel={towgs84:"653.0,-212.0,449.0",ellipse:"bessel",datumName:"Hermannskogel"},c.ire65={towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"mod_airy",datumName:"Ireland 1965"},c.rassadiran={towgs84:"-133.63,-157.5,-158.62",ellipse:"intl",datumName:"Rassadiran"},c.nzgd49={towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",ellipse:"intl",datumName:"New Zealand Geodetic Datum 1949"},c.osgb36={towgs84:"446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",ellipse:"airy",datumName:"Airy 1830"},c.s_jtsk={towgs84:"589,76,480",ellipse:"bessel",datumName:"S-JTSK (Ferro)"},c.beduaram={towgs84:"-106,-87,188",ellipse:"clrk80",datumName:"Beduaram"},c.gunung_segara={towgs84:"-403,684,41",ellipse:"bessel",datumName:"Gunung Segara Jakarta"},c.rnb72={towgs84:"106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",ellipse:"intl",datumName:"Reseau National Belge 1972"}},{}],26:[function(a,b,c){c.MERIT={a:6378137,rf:298.257,ellipseName:"MERIT 1983"},c.SGS85={a:6378136,rf:298.257,ellipseName:"Soviet Geodetic System 85"},c.GRS80={a:6378137,rf:298.257222101,ellipseName:"GRS 1980(IUGG, 1980)"},c.IAU76={a:6378140,rf:298.257,ellipseName:"IAU 1976"},c.airy={a:6377563.396,b:6356256.91,ellipseName:"Airy 1830"},c.APL4={a:6378137,rf:298.25,ellipseName:"Appl. Physics. 1965"},c.NWL9D={a:6378145,rf:298.25,ellipseName:"Naval Weapons Lab., 1965"},c.mod_airy={a:6377340.189,b:6356034.446,ellipseName:"Modified Airy"},c.andrae={a:6377104.43,rf:300,ellipseName:"Andrae 1876 (Den., Iclnd.)"},c.aust_SA={a:6378160,rf:298.25,ellipseName:"Australian Natl & S. Amer. 1969"},c.GRS67={a:6378160,rf:298.247167427,ellipseName:"GRS 67(IUGG 1967)"},c.bessel={a:6377397.155,rf:299.1528128,ellipseName:"Bessel 1841"},c.bess_nam={a:6377483.865,rf:299.1528128,ellipseName:"Bessel 1841 (Namibia)"},c.clrk66={a:6378206.4,b:6356583.8,ellipseName:"Clarke 1866"},c.clrk80={a:6378249.145,rf:293.4663,ellipseName:"Clarke 1880 mod."},c.clrk58={a:6378293.645208759,rf:294.2606763692654,ellipseName:"Clarke 1858"},c.CPM={a:6375738.7,rf:334.29,ellipseName:"Comm. des Poids et Mesures 1799"},c.delmbr={a:6376428,rf:311.5,ellipseName:"Delambre 1810 (Belgium)"},c.engelis={a:6378136.05,rf:298.2566,ellipseName:"Engelis 1985"},c.evrst30={a:6377276.345,rf:300.8017,ellipseName:"Everest 1830"},c.evrst48={a:6377304.063,rf:300.8017,ellipseName:"Everest 1948"},c.evrst56={a:6377301.243,rf:300.8017,ellipseName:"Everest 1956"},c.evrst69={a:6377295.664,rf:300.8017,ellipseName:"Everest 1969"},c.evrstSS={a:6377298.556,rf:300.8017,ellipseName:"Everest (Sabah & Sarawak)"},c.fschr60={a:6378166,rf:298.3,ellipseName:"Fischer (Mercury Datum) 1960"},c.fschr60m={a:6378155,rf:298.3,ellipseName:"Fischer 1960"},c.fschr68={a:6378150,rf:298.3,ellipseName:"Fischer 1968"},c.helmert={a:6378200,rf:298.3,ellipseName:"Helmert 1906"},c.hough={a:6378270,rf:297,ellipseName:"Hough"},c.intl={a:6378388,rf:297,ellipseName:"International 1909 (Hayford)"},c.kaula={a:6378163,rf:298.24,ellipseName:"Kaula 1961"},c.lerch={a:6378139,rf:298.257,ellipseName:"Lerch 1979"},c.mprts={a:6397300,rf:191,ellipseName:"Maupertius 1738"},c.new_intl={a:6378157.5,b:6356772.2,ellipseName:"New International 1967"},c.plessis={a:6376523,rf:6355863,ellipseName:"Plessis 1817 (France)"},c.krass={a:6378245,rf:298.3,ellipseName:"Krassovsky, 1942"},c.SEasia={a:6378155,b:6356773.3205,ellipseName:"Southeast Asia"},c.walbeck={a:6376896,b:6355834.8467,ellipseName:"Walbeck"},c.WGS60={a:6378165,rf:298.3,ellipseName:"WGS 60"},c.WGS66={a:6378145,rf:298.25,ellipseName:"WGS 66"},c.WGS7={a:6378135,rf:298.26,ellipseName:"WGS 72"},c.WGS84={a:6378137,rf:298.257223563,ellipseName:"WGS 84"},c.sphere={a:6370997,b:6370997,ellipseName:"Normal Sphere (r=6370997)"}},{}],27:[function(a,b,c){c.greenwich=0,c.lisbon=-9.131906111111,c.paris=2.337229166667,c.bogota=-74.080916666667,c.madrid=-3.687938888889,c.rome=12.452333333333,c.bern=7.439583333333,c.jakarta=106.807719444444,c.ferro=-17.666666666667,c.brussels=4.367975,c.stockholm=18.058277777778,c.athens=23.7163375,c.oslo=10.722916666667},{}],28:[function(a,b){function c(a,b,c){var d;return Array.isArray(c)?(d=f(a,b,c),3===c.length?[d.x,d.y,d.z]:[d.x,d.y]):f(a,b,c)}function d(a){return a instanceof e?a:a.oProj?a.oProj:e(a)}function proj4(a,b,e){a=d(a);var f,h=!1;return"undefined"==typeof b?(b=a,a=g,h=!0):("undefined"!=typeof b.x||Array.isArray(b))&&(e=b,b=a,a=g,h=!0),b=d(b),e?c(a,b,e):(f={forward:function(d){return c(a,b,d)},inverse:function(d){return c(b,a,d)}},h&&(f.oProj=b),f)}var e=a("./Proj"),f=a("./transform"),g=e("WGS84");b.exports=proj4},{"./Proj":2,"./transform":64}],29:[function(a,b){var c=Math.PI/2,d=1,e=2,f=3,g=4,h=5,i=484813681109536e-20,j=1.0026,k=.3826834323650898,l=function(a){if(!(this instanceof l))return new l(a);if(this.datum_type=g,a){if(a.datumCode&&"none"===a.datumCode&&(this.datum_type=h),a.datum_params){for(var b=0;b<a.datum_params.length;b++)a.datum_params[b]=parseFloat(a.datum_params[b]);(0!==a.datum_params[0]||0!==a.datum_params[1]||0!==a.datum_params[2])&&(this.datum_type=d),a.datum_params.length>3&&(0!==a.datum_params[3]||0!==a.datum_params[4]||0!==a.datum_params[5]||0!==a.datum_params[6])&&(this.datum_type=e,a.datum_params[3]*=i,a.datum_params[4]*=i,a.datum_params[5]*=i,a.datum_params[6]=a.datum_params[6]/1e6+1)}this.datum_type=a.grids?f:this.datum_type,this.a=a.a,this.b=a.b,this.es=a.es,this.ep2=a.ep2,this.datum_params=a.datum_params,this.datum_type===f&&(this.grids=a.grids)}};l.prototype={compare_datums:function(a){return this.datum_type!==a.datum_type?!1:this.a!==a.a||Math.abs(this.es-a.es)>5e-11?!1:this.datum_type===d?this.datum_params[0]===a.datum_params[0]&&this.datum_params[1]===a.datum_params[1]&&this.datum_params[2]===a.datum_params[2]:this.datum_type===e?this.datum_params[0]===a.datum_params[0]&&this.datum_params[1]===a.datum_params[1]&&this.datum_params[2]===a.datum_params[2]&&this.datum_params[3]===a.datum_params[3]&&this.datum_params[4]===a.datum_params[4]&&this.datum_params[5]===a.datum_params[5]&&this.datum_params[6]===a.datum_params[6]:this.datum_type===f||a.datum_type===f?this.nadgrids===a.nadgrids:!0},geodetic_to_geocentric:function(a){var b,d,e,f,g,h,i,j=a.x,k=a.y,l=a.z?a.z:0,m=0;if(-c>k&&k>-1.001*c)k=-c;else if(k>c&&1.001*c>k)k=c;else if(-c>k||k>c)return null;return j>Math.PI&&(j-=2*Math.PI),g=Math.sin(k),i=Math.cos(k),h=g*g,f=this.a/Math.sqrt(1-this.es*h),b=(f+l)*i*Math.cos(j),d=(f+l)*i*Math.sin(j),e=(f*(1-this.es)+l)*g,a.x=b,a.y=d,a.z=e,m},geocentric_to_geodetic:function(a){var b,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t=1e-12,u=t*t,v=30,w=a.x,x=a.y,y=a.z?a.z:0;if(o=!1,b=Math.sqrt(w*w+x*x),d=Math.sqrt(w*w+x*x+y*y),b/this.a<t){if(o=!0,q=0,d/this.a<t)return r=c,void(s=-this.b)}else q=Math.atan2(x,w);e=y/d,f=b/d,g=1/Math.sqrt(1-this.es*(2-this.es)*f*f),j=f*(1-this.es)*g,k=e*g,p=0;do p++,i=this.a/Math.sqrt(1-this.es*k*k),s=b*j+y*k-i*(1-this.es*k*k),h=this.es*i/(i+s),g=1/Math.sqrt(1-h*(2-h)*f*f),l=f*(1-h)*g,m=e*g,n=m*j-l*k,j=l,k=m;while(n*n>u&&v>p);return r=Math.atan(m/Math.abs(l)),a.x=q,a.y=r,a.z=s,a},geocentric_to_geodetic_noniter:function(a){var b,d,e,f,g,h,i,l,m,n,o,p,q,r,s,t,u,v=a.x,w=a.y,x=a.z?a.z:0;if(v=parseFloat(v),w=parseFloat(w),x=parseFloat(x),u=!1,0!==v)b=Math.atan2(w,v);else if(w>0)b=c;else if(0>w)b=-c;else if(u=!0,b=0,x>0)d=c;else{if(!(0>x))return d=c,void(e=-this.b);d=-c}return g=v*v+w*w,f=Math.sqrt(g),h=x*j,l=Math.sqrt(h*h+g),n=h/l,p=f/l,o=n*n*n,i=x+this.b*this.ep2*o,t=f-this.a*this.es*p*p*p,m=Math.sqrt(i*i+t*t),q=i/m,r=t/m,s=this.a/Math.sqrt(1-this.es*q*q),e=r>=k?f/r-s:-k>=r?f/-r-s:x/q+s*(this.es-1),u===!1&&(d=Math.atan(q/r)),a.x=b,a.y=d,a.z=e,a},geocentric_to_wgs84:function(a){if(this.datum_type===d)a.x+=this.datum_params[0],a.y+=this.datum_params[1],a.z+=this.datum_params[2];else if(this.datum_type===e){var b=this.datum_params[0],c=this.datum_params[1],f=this.datum_params[2],g=this.datum_params[3],h=this.datum_params[4],i=this.datum_params[5],j=this.datum_params[6],k=j*(a.x-i*a.y+h*a.z)+b,l=j*(i*a.x+a.y-g*a.z)+c,m=j*(-h*a.x+g*a.y+a.z)+f;a.x=k,a.y=l,a.z=m}},geocentric_from_wgs84:function(a){if(this.datum_type===d)a.x-=this.datum_params[0],a.y-=this.datum_params[1],a.z-=this.datum_params[2];else if(this.datum_type===e){var b=this.datum_params[0],c=this.datum_params[1],f=this.datum_params[2],g=this.datum_params[3],h=this.datum_params[4],i=this.datum_params[5],j=this.datum_params[6],k=(a.x-b)/j,l=(a.y-c)/j,m=(a.z-f)/j;a.x=k+i*l-h*m,a.y=-i*k+l+g*m,a.z=h*k-g*l+m}}},b.exports=l},{}],30:[function(a,b){var c=1,d=2,e=3,f=5,g=6378137,h=.006694379990141316;b.exports=function(a,b,i){function j(a){return a===c||a===d}var k,l,m;if(a.compare_datums(b))return i;if(a.datum_type===f||b.datum_type===f)return i;var n=a.a,o=a.es,p=b.a,q=b.es,r=a.datum_type;if(r===e)if(0===this.apply_gridshift(a,0,i))a.a=g,a.es=h;else{if(!a.datum_params)return a.a=n,a.es=a.es,i;for(k=1,l=0,m=a.datum_params.length;m>l;l++)k*=a.datum_params[l];if(0===k)return a.a=n,a.es=a.es,i;r=a.datum_params.length>3?d:c}return b.datum_type===e&&(b.a=g,b.es=h),(a.es!==b.es||a.a!==b.a||j(r)||j(b.datum_type))&&(a.geodetic_to_geocentric(i),j(a.datum_type)&&a.geocentric_to_wgs84(i),j(b.datum_type)&&b.geocentric_from_wgs84(i),b.geocentric_to_geodetic(i)),b.datum_type===e&&this.apply_gridshift(b,1,i),a.a=n,a.es=o,b.a=p,b.es=q,i}},{}],31:[function(a,b){function c(a){var b=this;if(2===arguments.length){var d=arguments[1];c[a]="string"==typeof d?"+"===d[0]?e(arguments[1]):f(arguments[1]):d}else if(1===arguments.length){if(Array.isArray(a))return a.map(function(a){Array.isArray(a)?c.apply(b,a):c(a)});if("string"==typeof a){if(a in c)return c[a]}else"EPSG"in a?c["EPSG:"+a.EPSG]=a:"ESRI"in a?c["ESRI:"+a.ESRI]=a:"IAU2000"in a?c["IAU2000:"+a.IAU2000]=a:console.log(a);return}}var d=a("./global"),e=a("./projString"),f=a("./wkt");d(c),b.exports=c},{"./global":34,"./projString":37,"./wkt":65}],32:[function(a,b){var c=a("./constants/Datum"),d=a("./constants/Ellipsoid"),e=a("./extend"),f=a("./datum"),g=1e-10,h=.16666666666666666,i=.04722222222222222,j=.022156084656084655;b.exports=function(a){if(a.datumCode&&"none"!==a.datumCode){var b=c[a.datumCode];b&&(a.datum_params=b.towgs84?b.towgs84.split(","):null,a.ellps=b.ellipse,a.datumName=b.datumName?b.datumName:a.datumCode)}if(!a.a){var k=d[a.ellps]?d[a.ellps]:d.WGS84;e(a,k)}return a.rf&&!a.b&&(a.b=(1-1/a.rf)*a.a),(0===a.rf||Math.abs(a.a-a.b)<g)&&(a.sphere=!0,a.b=a.a),a.a2=a.a*a.a,a.b2=a.b*a.b,a.es=(a.a2-a.b2)/a.a2,a.e=Math.sqrt(a.es),a.R_A&&(a.a*=1-a.es*(h+a.es*(i+a.es*j)),a.a2=a.a*a.a,a.b2=a.b*a.b,a.es=0),a.ep2=(a.a2-a.b2)/a.b2,a.k0||(a.k0=1),a.axis||(a.axis="enu"),a.datum=f(a),a}},{"./constants/Datum":25,"./constants/Ellipsoid":26,"./datum":29,"./extend":33}],33:[function(a,b){b.exports=function(a,b){a=a||{};var c,d;if(!b)return a;for(d in b)c=b[d],void 0!==c&&(a[d]=c);return a}},{}],34:[function(a,b){b.exports=function(a){a("EPSG:4326","+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"),a("EPSG:4269","+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"),a("EPSG:3857","+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"),a.WGS84=a["EPSG:4326"],a["EPSG:3785"]=a["EPSG:3857"],a.GOOGLE=a["EPSG:3857"],a["EPSG:900913"]=a["EPSG:3857"],a["EPSG:102113"]=a["EPSG:3857"]}},{}],35:[function(a,b){var proj4=a("./core");proj4.defaultDatum="WGS84",proj4.Proj=a("./Proj"),proj4.WGS84=new proj4.Proj("WGS84"),proj4.Point=a("./Point"),proj4.toPoint=a("./common/toPoint"),proj4.defs=a("./defs"),proj4.transform=a("./transform"),proj4.mgrs=a("mgrs"),proj4.version=a("../package.json").version,a("./includedProjections")(proj4),b.exports=proj4},{"../package.json":67,"./Point":1,"./Proj":2,"./common/toPoint":23,"./core":28,"./defs":31,"./includedProjections":"gWUPNW","./transform":64,mgrs:66}],36:[function(a,b){function c(a){return"string"==typeof a}function d(a){return a in h}function e(a){var b=["GEOGCS","GEOCCS","PROJCS","LOCAL_CS"];return b.reduce(function(b,c){return b+1+a.indexOf(c)},0)}function f(a){return"+"===a[0]}function g(a){return c(a)?d(a)?h[a]:e(a)?i(a):f(a)?j(a):void 0:a}var h=a("./defs"),i=a("./wkt"),j=a("./projString");b.exports=g},{"./defs":31,"./projString":37,"./wkt":65}],37:[function(a,b){var c=.017453292519943295,d=a("./constants/PrimeMeridian");b.exports=function(a){var b={},e={};a.split("+").map(function(a){return a.trim()}).filter(function(a){return a}).forEach(function(a){var b=a.split("=");b.push(!0),e[b[0].toLowerCase()]=b[1]});var f,g,h,i={proj:"projName",datum:"datumCode",rf:function(a){b.rf=parseFloat(a,10)},lat_0:function(a){b.lat0=a*c},lat_1:function(a){b.lat1=a*c},lat_2:function(a){b.lat2=a*c},lat_ts:function(a){b.lat_ts=a*c},lon_0:function(a){b.long0=a*c},lon_1:function(a){b.long1=a*c},lon_2:function(a){b.long2=a*c},alpha:function(a){b.alpha=parseFloat(a)*c},lonc:function(a){b.longc=a*c},x_0:function(a){b.x0=parseFloat(a,10)},y_0:function(a){b.y0=parseFloat(a,10)},k_0:function(a){b.k0=parseFloat(a,10)},k:function(a){b.k0=parseFloat(a,10)},r_a:function(){b.R_A=!0},zone:function(a){b.zone=parseInt(a,10)},south:function(){b.utmSouth=!0},towgs84:function(a){b.datum_params=a.split(",").map(function(a){return parseFloat(a,10)})},to_meter:function(a){b.to_meter=parseFloat(a,10)},from_greenwich:function(a){b.from_greenwich=a*c},pm:function(a){b.from_greenwich=(d[a]?d[a]:parseFloat(a,10))*c},nadgrids:function(a){"@null"===a?b.datumCode="none":b.nadgrids=a},axis:function(a){var c="ewnsud";3===a.length&&-1!==c.indexOf(a.substr(0,1))&&-1!==c.indexOf(a.substr(1,1))&&-1!==c.indexOf(a.substr(2,1))&&(b.axis=a)}};for(f in e)g=e[f],f in i?(h=i[f],"function"==typeof h?h(g):b[h]=g):b[f]=g;return"string"==typeof b.datumCode&&"WGS84"!==b.datumCode&&(b.datumCode=b.datumCode.toLowerCase()),b}},{"./constants/PrimeMeridian":27}],38:[function(a,b,c){function d(a,b){var c=g.length;return a.names?(g[c]=a,a.names.forEach(function(a){f[a.toLowerCase()]=c}),this):(console.log(b),!0)}var e=[a("./projections/merc"),a("./projections/longlat")],f={},g=[];c.add=d,c.get=function(a){if(!a)return!1;var b=a.toLowerCase();return"undefined"!=typeof f[b]&&g[f[b]]?g[f[b]]:void 0},c.start=function(){e.forEach(d)}},{"./projections/longlat":50,"./projections/merc":51}],39:[function(a,b,c){var d=1e-10,e=a("../common/msfnz"),f=a("../common/qsfnz"),g=a("../common/adjust_lon"),h=a("../common/asinz");c.init=function(){Math.abs(this.lat1+this.lat2)<d||(this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e3=Math.sqrt(this.es),this.sin_po=Math.sin(this.lat1),this.cos_po=Math.cos(this.lat1),this.t1=this.sin_po,this.con=this.sin_po,this.ms1=e(this.e3,this.sin_po,this.cos_po),this.qs1=f(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat2),this.cos_po=Math.cos(this.lat2),this.t2=this.sin_po,this.ms2=e(this.e3,this.sin_po,this.cos_po),this.qs2=f(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat0),this.cos_po=Math.cos(this.lat0),this.t3=this.sin_po,this.qs0=f(this.e3,this.sin_po,this.cos_po),this.ns0=Math.abs(this.lat1-this.lat2)>d?(this.ms1*this.ms1-this.ms2*this.ms2)/(this.qs2-this.qs1):this.con,this.c=this.ms1*this.ms1+this.ns0*this.qs1,this.rh=this.a*Math.sqrt(this.c-this.ns0*this.qs0)/this.ns0)},c.forward=function(a){var b=a.x,c=a.y;this.sin_phi=Math.sin(c),this.cos_phi=Math.cos(c);var d=f(this.e3,this.sin_phi,this.cos_phi),e=this.a*Math.sqrt(this.c-this.ns0*d)/this.ns0,h=this.ns0*g(b-this.long0),i=e*Math.sin(h)+this.x0,j=this.rh-e*Math.cos(h)+this.y0;return a.x=i,a.y=j,a},c.inverse=function(a){var b,c,d,e,f,h;return a.x-=this.x0,a.y=this.rh-a.y+this.y0,this.ns0>=0?(b=Math.sqrt(a.x*a.x+a.y*a.y),d=1):(b=-Math.sqrt(a.x*a.x+a.y*a.y),d=-1),e=0,0!==b&&(e=Math.atan2(d*a.x,d*a.y)),d=b*this.ns0/this.a,this.sphere?h=Math.asin((this.c-d*d)/(2*this.ns0)):(c=(this.c-d*d)/this.ns0,h=this.phi1z(this.e3,c)),f=g(e/this.ns0+this.long0),a.x=f,a.y=h,a},c.phi1z=function(a,b){var c,e,f,g,i,j=h(.5*b);if(d>a)return j;for(var k=a*a,l=1;25>=l;l++)if(c=Math.sin(j),e=Math.cos(j),f=a*c,g=1-f*f,i=.5*g*g/e*(b/(1-k)-c/g+.5/a*Math.log((1-f)/(1+f))),j+=i,Math.abs(i)<=1e-7)return j;return null},c.names=["Albers_Conic_Equal_Area","Albers","aea"]},{"../common/adjust_lon":5,"../common/asinz":6,"../common/msfnz":15,"../common/qsfnz":20}],40:[function(a,b,c){var d=a("../common/adjust_lon"),e=Math.PI/2,f=1e-10,g=a("../common/mlfn"),h=a("../common/e0fn"),i=a("../common/e1fn"),j=a("../common/e2fn"),k=a("../common/e3fn"),l=a("../common/gN"),m=a("../common/asinz"),n=a("../common/imlfn");c.init=function(){this.sin_p12=Math.sin(this.lat0),this.cos_p12=Math.cos(this.lat0)},c.forward=function(a){var b,c,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H=a.x,I=a.y,J=Math.sin(a.y),K=Math.cos(a.y),L=d(H-this.long0);return this.sphere?Math.abs(this.sin_p12-1)<=f?(a.x=this.x0+this.a*(e-I)*Math.sin(L),a.y=this.y0-this.a*(e-I)*Math.cos(L),a):Math.abs(this.sin_p12+1)<=f?(a.x=this.x0+this.a*(e+I)*Math.sin(L),a.y=this.y0+this.a*(e+I)*Math.cos(L),a):(B=this.sin_p12*J+this.cos_p12*K*Math.cos(L),z=Math.acos(B),A=z/Math.sin(z),a.x=this.x0+this.a*A*K*Math.sin(L),a.y=this.y0+this.a*A*(this.cos_p12*J-this.sin_p12*K*Math.cos(L)),a):(b=h(this.es),c=i(this.es),m=j(this.es),n=k(this.es),Math.abs(this.sin_p12-1)<=f?(o=this.a*g(b,c,m,n,e),p=this.a*g(b,c,m,n,I),a.x=this.x0+(o-p)*Math.sin(L),a.y=this.y0-(o-p)*Math.cos(L),a):Math.abs(this.sin_p12+1)<=f?(o=this.a*g(b,c,m,n,e),p=this.a*g(b,c,m,n,I),a.x=this.x0+(o+p)*Math.sin(L),a.y=this.y0+(o+p)*Math.cos(L),a):(q=J/K,r=l(this.a,this.e,this.sin_p12),s=l(this.a,this.e,J),t=Math.atan((1-this.es)*q+this.es*r*this.sin_p12/(s*K)),u=Math.atan2(Math.sin(L),this.cos_p12*Math.tan(t)-this.sin_p12*Math.cos(L)),C=0===u?Math.asin(this.cos_p12*Math.sin(t)-this.sin_p12*Math.cos(t)):Math.abs(Math.abs(u)-Math.PI)<=f?-Math.asin(this.cos_p12*Math.sin(t)-this.sin_p12*Math.cos(t)):Math.asin(Math.sin(L)*Math.cos(t)/Math.sin(u)),v=this.e*this.sin_p12/Math.sqrt(1-this.es),w=this.e*this.cos_p12*Math.cos(u)/Math.sqrt(1-this.es),x=v*w,y=w*w,D=C*C,E=D*C,F=E*C,G=F*C,z=r*C*(1-D*y*(1-y)/6+E/8*x*(1-2*y)+F/120*(y*(4-7*y)-3*v*v*(1-7*y))-G/48*x),a.x=this.x0+z*Math.sin(u),a.y=this.y0+z*Math.cos(u),a))},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I;if(this.sphere){if(b=Math.sqrt(a.x*a.x+a.y*a.y),b>2*e*this.a)return;return c=b/this.a,o=Math.sin(c),p=Math.cos(c),q=this.long0,Math.abs(b)<=f?r=this.lat0:(r=m(p*this.sin_p12+a.y*o*this.cos_p12/b),s=Math.abs(this.lat0)-e,q=d(Math.abs(s)<=f?this.lat0>=0?this.long0+Math.atan2(a.x,-a.y):this.long0-Math.atan2(-a.x,a.y):this.long0+Math.atan2(a.x*o,b*this.cos_p12*p-a.y*this.sin_p12*o))),a.x=q,a.y=r,a}return t=h(this.es),u=i(this.es),v=j(this.es),w=k(this.es),Math.abs(this.sin_p12-1)<=f?(x=this.a*g(t,u,v,w,e),b=Math.sqrt(a.x*a.x+a.y*a.y),y=x-b,r=n(y/this.a,t,u,v,w),q=d(this.long0+Math.atan2(a.x,-1*a.y)),a.x=q,a.y=r,a):Math.abs(this.sin_p12+1)<=f?(x=this.a*g(t,u,v,w,e),b=Math.sqrt(a.x*a.x+a.y*a.y),y=b-x,r=n(y/this.a,t,u,v,w),q=d(this.long0+Math.atan2(a.x,a.y)),a.x=q,a.y=r,a):(b=Math.sqrt(a.x*a.x+a.y*a.y),B=Math.atan2(a.x,a.y),z=l(this.a,this.e,this.sin_p12),C=Math.cos(B),D=this.e*this.cos_p12*C,E=-D*D/(1-this.es),F=3*this.es*(1-E)*this.sin_p12*this.cos_p12*C/(1-this.es),G=b/z,H=G-E*(1+E)*Math.pow(G,3)/6-F*(1+3*E)*Math.pow(G,4)/24,I=1-E*H*H/2-G*H*H*H/6,A=Math.asin(this.sin_p12*Math.cos(H)+this.cos_p12*Math.sin(H)*C),q=d(this.long0+Math.asin(Math.sin(B)*Math.sin(H)/Math.cos(A))),r=Math.atan((1-this.es*I*this.sin_p12/Math.sin(A))*Math.tan(A)/(1-this.es)),a.x=q,a.y=r,a)},c.names=["Azimuthal_Equidistant","aeqd"]},{"../common/adjust_lon":5,"../common/asinz":6,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/gN":11,"../common/imlfn":12,"../common/mlfn":14}],41:[function(a,b,c){var d=a("../common/mlfn"),e=a("../common/e0fn"),f=a("../common/e1fn"),g=a("../common/e2fn"),h=a("../common/e3fn"),i=a("../common/gN"),j=a("../common/adjust_lon"),k=a("../common/adjust_lat"),l=a("../common/imlfn"),m=Math.PI/2,n=1e-10;c.init=function(){this.sphere||(this.e0=e(this.es),this.e1=f(this.es),this.e2=g(this.es),this.e3=h(this.es),this.ml0=this.a*d(this.e0,this.e1,this.e2,this.e3,this.lat0))},c.forward=function(a){var b,c,e=a.x,f=a.y;if(e=j(e-this.long0),this.sphere)b=this.a*Math.asin(Math.cos(f)*Math.sin(e)),c=this.a*(Math.atan2(Math.tan(f),Math.cos(e))-this.lat0);else{var g=Math.sin(f),h=Math.cos(f),k=i(this.a,this.e,g),l=Math.tan(f)*Math.tan(f),m=e*Math.cos(f),n=m*m,o=this.es*h*h/(1-this.es),p=this.a*d(this.e0,this.e1,this.e2,this.e3,f);b=k*m*(1-n*l*(1/6-(8-l+8*o)*n/120)),c=p-this.ml0+k*g/h*n*(.5+(5-l+6*o)*n/24)}return a.x=b+this.x0,a.y=c+this.y0,a},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c,d=a.x/this.a,e=a.y/this.a;if(this.sphere){var f=e+this.lat0;b=Math.asin(Math.sin(f)*Math.cos(d)),c=Math.atan2(Math.tan(d),Math.cos(f))}else{var g=this.ml0/this.a+e,h=l(g,this.e0,this.e1,this.e2,this.e3);if(Math.abs(Math.abs(h)-m)<=n)return a.x=this.long0,a.y=m,0>e&&(a.y*=-1),a;var o=i(this.a,this.e,Math.sin(h)),p=o*o*o/this.a/this.a*(1-this.es),q=Math.pow(Math.tan(h),2),r=d*this.a/o,s=r*r;b=h-o*Math.tan(h)/p*r*r*(.5-(1+3*q)*r*r/24),c=r*(1-s*(q/3+(1+3*q)*q*s/15))/Math.cos(h)}return a.x=j(c+this.long0),a.y=k(b),a},c.names=["Cassini","Cassini_Soldner","cass"]},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/gN":11,"../common/imlfn":12,"../common/mlfn":14}],42:[function(a,b,c){var d=a("../common/adjust_lon"),e=a("../common/qsfnz"),f=a("../common/msfnz"),g=a("../common/iqsfnz");c.init=function(){this.sphere||(this.k0=f(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts)))},c.forward=function(a){var b,c,f=a.x,g=a.y,h=d(f-this.long0);if(this.sphere)b=this.x0+this.a*h*Math.cos(this.lat_ts),c=this.y0+this.a*Math.sin(g)/Math.cos(this.lat_ts);else{var i=e(this.e,Math.sin(g));b=this.x0+this.a*this.k0*h,c=this.y0+this.a*i*.5/this.k0}return a.x=b,a.y=c,a},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c;return this.sphere?(b=d(this.long0+a.x/this.a/Math.cos(this.lat_ts)),c=Math.asin(a.y/this.a*Math.cos(this.lat_ts))):(c=g(this.e,2*a.y*this.k0/this.a),b=d(this.long0+a.x/(this.a*this.k0))),a.x=b,a.y=c,a},c.names=["cea"]},{"../common/adjust_lon":5,"../common/iqsfnz":13,"../common/msfnz":15,"../common/qsfnz":20}],43:[function(a,b,c){var d=a("../common/adjust_lon"),e=a("../common/adjust_lat");c.init=function(){this.x0=this.x0||0,this.y0=this.y0||0,this.lat0=this.lat0||0,this.long0=this.long0||0,this.lat_ts=this.lat_ts||0,this.title=this.title||"Equidistant Cylindrical (Plate Carre)",this.rc=Math.cos(this.lat_ts)},c.forward=function(a){var b=a.x,c=a.y,f=d(b-this.long0),g=e(c-this.lat0);return a.x=this.x0+this.a*f*this.rc,a.y=this.y0+this.a*g,a},c.inverse=function(a){var b=a.x,c=a.y;return a.x=d(this.long0+(b-this.x0)/(this.a*this.rc)),a.y=e(this.lat0+(c-this.y0)/this.a),a},c.names=["Equirectangular","Equidistant_Cylindrical","eqc"]},{"../common/adjust_lat":4,"../common/adjust_lon":5}],44:[function(a,b,c){var d=a("../common/e0fn"),e=a("../common/e1fn"),f=a("../common/e2fn"),g=a("../common/e3fn"),h=a("../common/msfnz"),i=a("../common/mlfn"),j=a("../common/adjust_lon"),k=a("../common/adjust_lat"),l=a("../common/imlfn"),m=1e-10;c.init=function(){Math.abs(this.lat1+this.lat2)<m||(this.lat2=this.lat2||this.lat1,this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=d(this.es),this.e1=e(this.es),this.e2=f(this.es),this.e3=g(this.es),this.sinphi=Math.sin(this.lat1),this.cosphi=Math.cos(this.lat1),this.ms1=h(this.e,this.sinphi,this.cosphi),this.ml1=i(this.e0,this.e1,this.e2,this.e3,this.lat1),Math.abs(this.lat1-this.lat2)<m?this.ns=this.sinphi:(this.sinphi=Math.sin(this.lat2),this.cosphi=Math.cos(this.lat2),this.ms2=h(this.e,this.sinphi,this.cosphi),this.ml2=i(this.e0,this.e1,this.e2,this.e3,this.lat2),this.ns=(this.ms1-this.ms2)/(this.ml2-this.ml1)),this.g=this.ml1+this.ms1/this.ns,this.ml0=i(this.e0,this.e1,this.e2,this.e3,this.lat0),this.rh=this.a*(this.g-this.ml0))},c.forward=function(a){var b,c=a.x,d=a.y;if(this.sphere)b=this.a*(this.g-d);else{var e=i(this.e0,this.e1,this.e2,this.e3,d);b=this.a*(this.g-e)}var f=this.ns*j(c-this.long0),g=this.x0+b*Math.sin(f),h=this.y0+this.rh-b*Math.cos(f);return a.x=g,a.y=h,a},c.inverse=function(a){a.x-=this.x0,a.y=this.rh-a.y+this.y0;var b,c,d,e;this.ns>=0?(c=Math.sqrt(a.x*a.x+a.y*a.y),b=1):(c=-Math.sqrt(a.x*a.x+a.y*a.y),b=-1);var f=0;if(0!==c&&(f=Math.atan2(b*a.x,b*a.y)),this.sphere)return e=j(this.long0+f/this.ns),d=k(this.g-c/this.a),a.x=e,a.y=d,a;var g=this.g-c/this.a;return d=l(g,this.e0,this.e1,this.e2,this.e3),e=j(this.long0+f/this.ns),a.x=e,a.y=d,a},c.names=["Equidistant_Conic","eqdc"]},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/imlfn":12,"../common/mlfn":14,"../common/msfnz":15}],45:[function(a,b,c){var d=Math.PI/4,e=a("../common/srat"),f=Math.PI/2,g=20;c.init=function(){var a=Math.sin(this.lat0),b=Math.cos(this.lat0);b*=b,this.rc=Math.sqrt(1-this.es)/(1-this.es*a*a),this.C=Math.sqrt(1+this.es*b*b/(1-this.es)),this.phic0=Math.asin(a/this.C),this.ratexp=.5*this.C*this.e,this.K=Math.tan(.5*this.phic0+d)/(Math.pow(Math.tan(.5*this.lat0+d),this.C)*e(this.e*a,this.ratexp))},c.forward=function(a){var b=a.x,c=a.y;return a.y=2*Math.atan(this.K*Math.pow(Math.tan(.5*c+d),this.C)*e(this.e*Math.sin(c),this.ratexp))-f,a.x=this.C*b,a},c.inverse=function(a){for(var b=1e-14,c=a.x/this.C,h=a.y,i=Math.pow(Math.tan(.5*h+d)/this.K,1/this.C),j=g;j>0&&(h=2*Math.atan(i*e(this.e*Math.sin(a.y),-.5*this.e))-f,!(Math.abs(h-a.y)<b));--j)a.y=h;return j?(a.x=c,a.y=h,a):null},c.names=["gauss"]},{"../common/srat":22}],46:[function(a,b,c){var d=a("../common/adjust_lon"),e=1e-10,f=a("../common/asinz");c.init=function(){this.sin_p14=Math.sin(this.lat0),this.cos_p14=Math.cos(this.lat0),this.infinity_dist=1e3*this.a,this.rc=1},c.forward=function(a){var b,c,f,g,h,i,j,k,l=a.x,m=a.y;return f=d(l-this.long0),b=Math.sin(m),c=Math.cos(m),g=Math.cos(f),i=this.sin_p14*b+this.cos_p14*c*g,h=1,i>0||Math.abs(i)<=e?(j=this.x0+this.a*h*c*Math.sin(f)/i,k=this.y0+this.a*h*(this.cos_p14*b-this.sin_p14*c*g)/i):(j=this.x0+this.infinity_dist*c*Math.sin(f),k=this.y0+this.infinity_dist*(this.cos_p14*b-this.sin_p14*c*g)),a.x=j,a.y=k,a
},c.inverse=function(a){var b,c,e,g,h,i;return a.x=(a.x-this.x0)/this.a,a.y=(a.y-this.y0)/this.a,a.x/=this.k0,a.y/=this.k0,(b=Math.sqrt(a.x*a.x+a.y*a.y))?(g=Math.atan2(b,this.rc),c=Math.sin(g),e=Math.cos(g),i=f(e*this.sin_p14+a.y*c*this.cos_p14/b),h=Math.atan2(a.x*c,b*this.cos_p14*e-a.y*this.sin_p14*c),h=d(this.long0+h)):(i=this.phic0,h=0),a.x=h,a.y=i,a},c.names=["gnom"]},{"../common/adjust_lon":5,"../common/asinz":6}],47:[function(a,b,c){var d=a("../common/adjust_lon");c.init=function(){this.a=6377397.155,this.es=.006674372230614,this.e=Math.sqrt(this.es),this.lat0||(this.lat0=.863937979737193),this.long0||(this.long0=.4334234309119251),this.k0||(this.k0=.9999),this.s45=.785398163397448,this.s90=2*this.s45,this.fi0=this.lat0,this.e2=this.es,this.e=Math.sqrt(this.e2),this.alfa=Math.sqrt(1+this.e2*Math.pow(Math.cos(this.fi0),4)/(1-this.e2)),this.uq=1.04216856380474,this.u0=Math.asin(Math.sin(this.fi0)/this.alfa),this.g=Math.pow((1+this.e*Math.sin(this.fi0))/(1-this.e*Math.sin(this.fi0)),this.alfa*this.e/2),this.k=Math.tan(this.u0/2+this.s45)/Math.pow(Math.tan(this.fi0/2+this.s45),this.alfa)*this.g,this.k1=this.k0,this.n0=this.a*Math.sqrt(1-this.e2)/(1-this.e2*Math.pow(Math.sin(this.fi0),2)),this.s0=1.37008346281555,this.n=Math.sin(this.s0),this.ro0=this.k1*this.n0/Math.tan(this.s0),this.ad=this.s90-this.uq},c.forward=function(a){var b,c,e,f,g,h,i,j=a.x,k=a.y,l=d(j-this.long0);return b=Math.pow((1+this.e*Math.sin(k))/(1-this.e*Math.sin(k)),this.alfa*this.e/2),c=2*(Math.atan(this.k*Math.pow(Math.tan(k/2+this.s45),this.alfa)/b)-this.s45),e=-l*this.alfa,f=Math.asin(Math.cos(this.ad)*Math.sin(c)+Math.sin(this.ad)*Math.cos(c)*Math.cos(e)),g=Math.asin(Math.cos(c)*Math.sin(e)/Math.cos(f)),h=this.n*g,i=this.ro0*Math.pow(Math.tan(this.s0/2+this.s45),this.n)/Math.pow(Math.tan(f/2+this.s45),this.n),a.y=i*Math.cos(h)/1,a.x=i*Math.sin(h)/1,this.czech||(a.y*=-1,a.x*=-1),a},c.inverse=function(a){var b,c,d,e,f,g,h,i,j=a.x;a.x=a.y,a.y=j,this.czech||(a.y*=-1,a.x*=-1),g=Math.sqrt(a.x*a.x+a.y*a.y),f=Math.atan2(a.y,a.x),e=f/Math.sin(this.s0),d=2*(Math.atan(Math.pow(this.ro0/g,1/this.n)*Math.tan(this.s0/2+this.s45))-this.s45),b=Math.asin(Math.cos(this.ad)*Math.sin(d)-Math.sin(this.ad)*Math.cos(d)*Math.cos(e)),c=Math.asin(Math.cos(d)*Math.sin(e)/Math.cos(b)),a.x=this.long0-c/this.alfa,h=b,i=0;var k=0;do a.y=2*(Math.atan(Math.pow(this.k,-1/this.alfa)*Math.pow(Math.tan(b/2+this.s45),1/this.alfa)*Math.pow((1+this.e*Math.sin(h))/(1-this.e*Math.sin(h)),this.e/2))-this.s45),Math.abs(h-a.y)<1e-10&&(i=1),h=a.y,k+=1;while(0===i&&15>k);return k>=15?null:a},c.names=["Krovak","krovak"]},{"../common/adjust_lon":5}],48:[function(a,b,c){var d=Math.PI/2,e=Math.PI/4,f=1e-10,g=a("../common/qsfnz"),h=a("../common/adjust_lon");c.S_POLE=1,c.N_POLE=2,c.EQUIT=3,c.OBLIQ=4,c.init=function(){var a=Math.abs(this.lat0);if(this.mode=Math.abs(a-d)<f?this.lat0<0?this.S_POLE:this.N_POLE:Math.abs(a)<f?this.EQUIT:this.OBLIQ,this.es>0){var b;switch(this.qp=g(this.e,1),this.mmf=.5/(1-this.es),this.apa=this.authset(this.es),this.mode){case this.N_POLE:this.dd=1;break;case this.S_POLE:this.dd=1;break;case this.EQUIT:this.rq=Math.sqrt(.5*this.qp),this.dd=1/this.rq,this.xmf=1,this.ymf=.5*this.qp;break;case this.OBLIQ:this.rq=Math.sqrt(.5*this.qp),b=Math.sin(this.lat0),this.sinb1=g(this.e,b)/this.qp,this.cosb1=Math.sqrt(1-this.sinb1*this.sinb1),this.dd=Math.cos(this.lat0)/(Math.sqrt(1-this.es*b*b)*this.rq*this.cosb1),this.ymf=(this.xmf=this.rq)/this.dd,this.xmf*=this.dd}}else this.mode===this.OBLIQ&&(this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0))},c.forward=function(a){var b,c,i,j,k,l,m,n,o,p,q=a.x,r=a.y;if(q=h(q-this.long0),this.sphere){if(k=Math.sin(r),p=Math.cos(r),i=Math.cos(q),this.mode===this.OBLIQ||this.mode===this.EQUIT){if(c=this.mode===this.EQUIT?1+p*i:1+this.sinph0*k+this.cosph0*p*i,f>=c)return null;c=Math.sqrt(2/c),b=c*p*Math.sin(q),c*=this.mode===this.EQUIT?k:this.cosph0*k-this.sinph0*p*i}else if(this.mode===this.N_POLE||this.mode===this.S_POLE){if(this.mode===this.N_POLE&&(i=-i),Math.abs(r+this.phi0)<f)return null;c=e-.5*r,c=2*(this.mode===this.S_POLE?Math.cos(c):Math.sin(c)),b=c*Math.sin(q),c*=i}}else{switch(m=0,n=0,o=0,i=Math.cos(q),j=Math.sin(q),k=Math.sin(r),l=g(this.e,k),(this.mode===this.OBLIQ||this.mode===this.EQUIT)&&(m=l/this.qp,n=Math.sqrt(1-m*m)),this.mode){case this.OBLIQ:o=1+this.sinb1*m+this.cosb1*n*i;break;case this.EQUIT:o=1+n*i;break;case this.N_POLE:o=d+r,l=this.qp-l;break;case this.S_POLE:o=r-d,l=this.qp+l}if(Math.abs(o)<f)return null;switch(this.mode){case this.OBLIQ:case this.EQUIT:o=Math.sqrt(2/o),c=this.mode===this.OBLIQ?this.ymf*o*(this.cosb1*m-this.sinb1*n*i):(o=Math.sqrt(2/(1+n*i)))*m*this.ymf,b=this.xmf*o*n*j;break;case this.N_POLE:case this.S_POLE:l>=0?(b=(o=Math.sqrt(l))*j,c=i*(this.mode===this.S_POLE?o:-o)):b=c=0}}return a.x=this.a*b+this.x0,a.y=this.a*c+this.y0,a},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c,e,g,i,j,k,l=a.x/this.a,m=a.y/this.a;if(this.sphere){var n,o=0,p=0;if(n=Math.sqrt(l*l+m*m),c=.5*n,c>1)return null;switch(c=2*Math.asin(c),(this.mode===this.OBLIQ||this.mode===this.EQUIT)&&(p=Math.sin(c),o=Math.cos(c)),this.mode){case this.EQUIT:c=Math.abs(n)<=f?0:Math.asin(m*p/n),l*=p,m=o*n;break;case this.OBLIQ:c=Math.abs(n)<=f?this.phi0:Math.asin(o*this.sinph0+m*p*this.cosph0/n),l*=p*this.cosph0,m=(o-Math.sin(c)*this.sinph0)*n;break;case this.N_POLE:m=-m,c=d-c;break;case this.S_POLE:c-=d}b=0!==m||this.mode!==this.EQUIT&&this.mode!==this.OBLIQ?Math.atan2(l,m):0}else{if(k=0,this.mode===this.OBLIQ||this.mode===this.EQUIT){if(l/=this.dd,m*=this.dd,j=Math.sqrt(l*l+m*m),f>j)return a.x=0,a.y=this.phi0,a;g=2*Math.asin(.5*j/this.rq),e=Math.cos(g),l*=g=Math.sin(g),this.mode===this.OBLIQ?(k=e*this.sinb1+m*g*this.cosb1/j,i=this.qp*k,m=j*this.cosb1*e-m*this.sinb1*g):(k=m*g/j,i=this.qp*k,m=j*e)}else if(this.mode===this.N_POLE||this.mode===this.S_POLE){if(this.mode===this.N_POLE&&(m=-m),i=l*l+m*m,!i)return a.x=0,a.y=this.phi0,a;k=1-i/this.qp,this.mode===this.S_POLE&&(k=-k)}b=Math.atan2(l,m),c=this.authlat(Math.asin(k),this.apa)}return a.x=h(this.long0+b),a.y=c,a},c.P00=.3333333333333333,c.P01=.17222222222222222,c.P02=.10257936507936508,c.P10=.06388888888888888,c.P11=.0664021164021164,c.P20=.016415012942191543,c.authset=function(a){var b,c=[];return c[0]=a*this.P00,b=a*a,c[0]+=b*this.P01,c[1]=b*this.P10,b*=a,c[0]+=b*this.P02,c[1]+=b*this.P11,c[2]=b*this.P20,c},c.authlat=function(a,b){var c=a+a;return a+b[0]*Math.sin(c)+b[1]*Math.sin(c+c)+b[2]*Math.sin(c+c+c)},c.names=["Lambert Azimuthal Equal Area","Lambert_Azimuthal_Equal_Area","laea"]},{"../common/adjust_lon":5,"../common/qsfnz":20}],49:[function(a,b,c){var d=1e-10,e=a("../common/msfnz"),f=a("../common/tsfnz"),g=Math.PI/2,h=a("../common/sign"),i=a("../common/adjust_lon"),j=a("../common/phi2z");c.init=function(){if(this.lat2||(this.lat2=this.lat1),this.k0||(this.k0=1),this.x0=this.x0||0,this.y0=this.y0||0,!(Math.abs(this.lat1+this.lat2)<d)){var a=this.b/this.a;this.e=Math.sqrt(1-a*a);var b=Math.sin(this.lat1),c=Math.cos(this.lat1),g=e(this.e,b,c),h=f(this.e,this.lat1,b),i=Math.sin(this.lat2),j=Math.cos(this.lat2),k=e(this.e,i,j),l=f(this.e,this.lat2,i),m=f(this.e,this.lat0,Math.sin(this.lat0));this.ns=Math.abs(this.lat1-this.lat2)>d?Math.log(g/k)/Math.log(h/l):b,isNaN(this.ns)&&(this.ns=b),this.f0=g/(this.ns*Math.pow(h,this.ns)),this.rh=this.a*this.f0*Math.pow(m,this.ns),this.title||(this.title="Lambert Conformal Conic")}},c.forward=function(a){var b=a.x,c=a.y;Math.abs(2*Math.abs(c)-Math.PI)<=d&&(c=h(c)*(g-2*d));var e,j,k=Math.abs(Math.abs(c)-g);if(k>d)e=f(this.e,c,Math.sin(c)),j=this.a*this.f0*Math.pow(e,this.ns);else{if(k=c*this.ns,0>=k)return null;j=0}var l=this.ns*i(b-this.long0);return a.x=this.k0*j*Math.sin(l)+this.x0,a.y=this.k0*(this.rh-j*Math.cos(l))+this.y0,a},c.inverse=function(a){var b,c,d,e,f,h=(a.x-this.x0)/this.k0,k=this.rh-(a.y-this.y0)/this.k0;this.ns>0?(b=Math.sqrt(h*h+k*k),c=1):(b=-Math.sqrt(h*h+k*k),c=-1);var l=0;if(0!==b&&(l=Math.atan2(c*h,c*k)),0!==b||this.ns>0){if(c=1/this.ns,d=Math.pow(b/(this.a*this.f0),c),e=j(this.e,d),-9999===e)return null}else e=-g;return f=i(l/this.ns+this.long0),a.x=f,a.y=e,a},c.names=["Lambert Tangential Conformal Conic Projection","Lambert_Conformal_Conic","Lambert_Conformal_Conic_2SP","lcc"]},{"../common/adjust_lon":5,"../common/msfnz":15,"../common/phi2z":16,"../common/sign":21,"../common/tsfnz":24}],50:[function(a,b,c){function d(a){return a}c.init=function(){},c.forward=d,c.inverse=d,c.names=["longlat","identity"]},{}],51:[function(a,b,c){var d=a("../common/msfnz"),e=Math.PI/2,f=1e-10,g=57.29577951308232,h=a("../common/adjust_lon"),i=Math.PI/4,j=a("../common/tsfnz"),k=a("../common/phi2z");c.init=function(){var a=this.b/this.a;this.es=1-a*a,"x0"in this||(this.x0=0),"y0"in this||(this.y0=0),this.e=Math.sqrt(this.es),this.lat_ts?this.k0=this.sphere?Math.cos(this.lat_ts):d(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts)):this.k0||(this.k0=this.k?this.k:1)},c.forward=function(a){var b=a.x,c=a.y;if(c*g>90&&-90>c*g&&b*g>180&&-180>b*g)return null;var d,k;if(Math.abs(Math.abs(c)-e)<=f)return null;if(this.sphere)d=this.x0+this.a*this.k0*h(b-this.long0),k=this.y0+this.a*this.k0*Math.log(Math.tan(i+.5*c));else{var l=Math.sin(c),m=j(this.e,c,l);d=this.x0+this.a*this.k0*h(b-this.long0),k=this.y0-this.a*this.k0*Math.log(m)}return a.x=d,a.y=k,a},c.inverse=function(a){var b,c,d=a.x-this.x0,f=a.y-this.y0;if(this.sphere)c=e-2*Math.atan(Math.exp(-f/(this.a*this.k0)));else{var g=Math.exp(-f/(this.a*this.k0));if(c=k(this.e,g),-9999===c)return null}return b=h(this.long0+d/(this.a*this.k0)),a.x=b,a.y=c,a},c.names=["Mercator","Popular Visualisation Pseudo Mercator","Mercator_1SP","Mercator_Auxiliary_Sphere","merc"]},{"../common/adjust_lon":5,"../common/msfnz":15,"../common/phi2z":16,"../common/tsfnz":24}],52:[function(a,b,c){var d=a("../common/adjust_lon");c.init=function(){},c.forward=function(a){var b=a.x,c=a.y,e=d(b-this.long0),f=this.x0+this.a*e,g=this.y0+this.a*Math.log(Math.tan(Math.PI/4+c/2.5))*1.25;return a.x=f,a.y=g,a},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b=d(this.long0+a.x/this.a),c=2.5*(Math.atan(Math.exp(.8*a.y/this.a))-Math.PI/4);return a.x=b,a.y=c,a},c.names=["Miller_Cylindrical","mill"]},{"../common/adjust_lon":5}],53:[function(a,b,c){var d=a("../common/adjust_lon"),e=1e-10;c.init=function(){},c.forward=function(a){for(var b=a.x,c=a.y,f=d(b-this.long0),g=c,h=Math.PI*Math.sin(c),i=0;!0;i++){var j=-(g+Math.sin(g)-h)/(1+Math.cos(g));if(g+=j,Math.abs(j)<e)break}g/=2,Math.PI/2-Math.abs(c)<e&&(f=0);var k=.900316316158*this.a*f*Math.cos(g)+this.x0,l=1.4142135623731*this.a*Math.sin(g)+this.y0;return a.x=k,a.y=l,a},c.inverse=function(a){var b,c;a.x-=this.x0,a.y-=this.y0,c=a.y/(1.4142135623731*this.a),Math.abs(c)>.999999999999&&(c=.999999999999),b=Math.asin(c);var e=d(this.long0+a.x/(.900316316158*this.a*Math.cos(b)));e<-Math.PI&&(e=-Math.PI),e>Math.PI&&(e=Math.PI),c=(2*b+Math.sin(2*b))/Math.PI,Math.abs(c)>1&&(c=1);var f=Math.asin(c);return a.x=e,a.y=f,a},c.names=["Mollweide","moll"]},{"../common/adjust_lon":5}],54:[function(a,b,c){var d=484813681109536e-20;c.iterations=1,c.init=function(){this.A=[],this.A[1]=.6399175073,this.A[2]=-.1358797613,this.A[3]=.063294409,this.A[4]=-.02526853,this.A[5]=.0117879,this.A[6]=-.0055161,this.A[7]=.0026906,this.A[8]=-.001333,this.A[9]=67e-5,this.A[10]=-34e-5,this.B_re=[],this.B_im=[],this.B_re[1]=.7557853228,this.B_im[1]=0,this.B_re[2]=.249204646,this.B_im[2]=.003371507,this.B_re[3]=-.001541739,this.B_im[3]=.04105856,this.B_re[4]=-.10162907,this.B_im[4]=.01727609,this.B_re[5]=-.26623489,this.B_im[5]=-.36249218,this.B_re[6]=-.6870983,this.B_im[6]=-1.1651967,this.C_re=[],this.C_im=[],this.C_re[1]=1.3231270439,this.C_im[1]=0,this.C_re[2]=-.577245789,this.C_im[2]=-.007809598,this.C_re[3]=.508307513,this.C_im[3]=-.112208952,this.C_re[4]=-.15094762,this.C_im[4]=.18200602,this.C_re[5]=1.01418179,this.C_im[5]=1.64497696,this.C_re[6]=1.9660549,this.C_im[6]=2.5127645,this.D=[],this.D[1]=1.5627014243,this.D[2]=.5185406398,this.D[3]=-.03333098,this.D[4]=-.1052906,this.D[5]=-.0368594,this.D[6]=.007317,this.D[7]=.0122,this.D[8]=.00394,this.D[9]=-.0013},c.forward=function(a){var b,c=a.x,e=a.y,f=e-this.lat0,g=c-this.long0,h=f/d*1e-5,i=g,j=1,k=0;for(b=1;10>=b;b++)j*=h,k+=this.A[b]*j;var l,m,n=k,o=i,p=1,q=0,r=0,s=0;for(b=1;6>=b;b++)l=p*n-q*o,m=q*n+p*o,p=l,q=m,r=r+this.B_re[b]*p-this.B_im[b]*q,s=s+this.B_im[b]*p+this.B_re[b]*q;return a.x=s*this.a+this.x0,a.y=r*this.a+this.y0,a},c.inverse=function(a){var b,c,e,f=a.x,g=a.y,h=f-this.x0,i=g-this.y0,j=i/this.a,k=h/this.a,l=1,m=0,n=0,o=0;for(b=1;6>=b;b++)c=l*j-m*k,e=m*j+l*k,l=c,m=e,n=n+this.C_re[b]*l-this.C_im[b]*m,o=o+this.C_im[b]*l+this.C_re[b]*m;for(var p=0;p<this.iterations;p++){var q,r,s=n,t=o,u=j,v=k;for(b=2;6>=b;b++)q=s*n-t*o,r=t*n+s*o,s=q,t=r,u+=(b-1)*(this.B_re[b]*s-this.B_im[b]*t),v+=(b-1)*(this.B_im[b]*s+this.B_re[b]*t);s=1,t=0;var w=this.B_re[1],x=this.B_im[1];for(b=2;6>=b;b++)q=s*n-t*o,r=t*n+s*o,s=q,t=r,w+=b*(this.B_re[b]*s-this.B_im[b]*t),x+=b*(this.B_im[b]*s+this.B_re[b]*t);var y=w*w+x*x;n=(u*w+v*x)/y,o=(v*w-u*x)/y}var z=n,A=o,B=1,C=0;for(b=1;9>=b;b++)B*=z,C+=this.D[b]*B;var D=this.lat0+C*d*1e5,E=this.long0+A;return a.x=E,a.y=D,a},c.names=["New_Zealand_Map_Grid","nzmg"]},{}],55:[function(a,b,c){var d=a("../common/tsfnz"),e=a("../common/adjust_lon"),f=a("../common/phi2z"),g=Math.PI/2,h=Math.PI/4,i=1e-10;c.init=function(){this.no_off=this.no_off||!1,this.no_rot=this.no_rot||!1,isNaN(this.k0)&&(this.k0=1);var a=Math.sin(this.lat0),b=Math.cos(this.lat0),c=this.e*a;this.bl=Math.sqrt(1+this.es/(1-this.es)*Math.pow(b,4)),this.al=this.a*this.bl*this.k0*Math.sqrt(1-this.es)/(1-c*c);var f=d(this.e,this.lat0,a),g=this.bl/b*Math.sqrt((1-this.es)/(1-c*c));1>g*g&&(g=1);var h,i;if(isNaN(this.longc)){var j=d(this.e,this.lat1,Math.sin(this.lat1)),k=d(this.e,this.lat2,Math.sin(this.lat2));this.el=this.lat0>=0?(g+Math.sqrt(g*g-1))*Math.pow(f,this.bl):(g-Math.sqrt(g*g-1))*Math.pow(f,this.bl);var l=Math.pow(j,this.bl),m=Math.pow(k,this.bl);h=this.el/l,i=.5*(h-1/h);var n=(this.el*this.el-m*l)/(this.el*this.el+m*l),o=(m-l)/(m+l),p=e(this.long1-this.long2);this.long0=.5*(this.long1+this.long2)-Math.atan(n*Math.tan(.5*this.bl*p)/o)/this.bl,this.long0=e(this.long0);var q=e(this.long1-this.long0);this.gamma0=Math.atan(Math.sin(this.bl*q)/i),this.alpha=Math.asin(g*Math.sin(this.gamma0))}else h=this.lat0>=0?g+Math.sqrt(g*g-1):g-Math.sqrt(g*g-1),this.el=h*Math.pow(f,this.bl),i=.5*(h-1/h),this.gamma0=Math.asin(Math.sin(this.alpha)/g),this.long0=this.longc-Math.asin(i*Math.tan(this.gamma0))/this.bl;this.uc=this.no_off?0:this.lat0>=0?this.al/this.bl*Math.atan2(Math.sqrt(g*g-1),Math.cos(this.alpha)):-1*this.al/this.bl*Math.atan2(Math.sqrt(g*g-1),Math.cos(this.alpha))},c.forward=function(a){var b,c,f,j=a.x,k=a.y,l=e(j-this.long0);if(Math.abs(Math.abs(k)-g)<=i)f=k>0?-1:1,c=this.al/this.bl*Math.log(Math.tan(h+f*this.gamma0*.5)),b=-1*f*g*this.al/this.bl;else{var m=d(this.e,k,Math.sin(k)),n=this.el/Math.pow(m,this.bl),o=.5*(n-1/n),p=.5*(n+1/n),q=Math.sin(this.bl*l),r=(o*Math.sin(this.gamma0)-q*Math.cos(this.gamma0))/p;c=Math.abs(Math.abs(r)-1)<=i?Number.POSITIVE_INFINITY:.5*this.al*Math.log((1-r)/(1+r))/this.bl,b=Math.abs(Math.cos(this.bl*l))<=i?this.al*this.bl*l:this.al*Math.atan2(o*Math.cos(this.gamma0)+q*Math.sin(this.gamma0),Math.cos(this.bl*l))/this.bl}return this.no_rot?(a.x=this.x0+b,a.y=this.y0+c):(b-=this.uc,a.x=this.x0+c*Math.cos(this.alpha)+b*Math.sin(this.alpha),a.y=this.y0+b*Math.cos(this.alpha)-c*Math.sin(this.alpha)),a},c.inverse=function(a){var b,c;this.no_rot?(c=a.y-this.y0,b=a.x-this.x0):(c=(a.x-this.x0)*Math.cos(this.alpha)-(a.y-this.y0)*Math.sin(this.alpha),b=(a.y-this.y0)*Math.cos(this.alpha)+(a.x-this.x0)*Math.sin(this.alpha),b+=this.uc);var d=Math.exp(-1*this.bl*c/this.al),h=.5*(d-1/d),j=.5*(d+1/d),k=Math.sin(this.bl*b/this.al),l=(k*Math.cos(this.gamma0)+h*Math.sin(this.gamma0))/j,m=Math.pow(this.el/Math.sqrt((1+l)/(1-l)),1/this.bl);return Math.abs(l-1)<i?(a.x=this.long0,a.y=g):Math.abs(l+1)<i?(a.x=this.long0,a.y=-1*g):(a.y=f(this.e,m),a.x=e(this.long0-Math.atan2(h*Math.cos(this.gamma0)-k*Math.sin(this.gamma0),Math.cos(this.bl*b/this.al))/this.bl)),a},c.names=["Hotine_Oblique_Mercator","Hotine Oblique Mercator","Hotine_Oblique_Mercator_Azimuth_Natural_Origin","Hotine_Oblique_Mercator_Azimuth_Center","omerc"]},{"../common/adjust_lon":5,"../common/phi2z":16,"../common/tsfnz":24}],56:[function(a,b,c){var d=a("../common/e0fn"),e=a("../common/e1fn"),f=a("../common/e2fn"),g=a("../common/e3fn"),h=a("../common/adjust_lon"),i=a("../common/adjust_lat"),j=a("../common/mlfn"),k=1e-10,l=a("../common/gN"),m=20;c.init=function(){this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=d(this.es),this.e1=e(this.es),this.e2=f(this.es),this.e3=g(this.es),this.ml0=this.a*j(this.e0,this.e1,this.e2,this.e3,this.lat0)},c.forward=function(a){var b,c,d,e=a.x,f=a.y,g=h(e-this.long0);if(d=g*Math.sin(f),this.sphere)Math.abs(f)<=k?(b=this.a*g,c=-1*this.a*this.lat0):(b=this.a*Math.sin(d)/Math.tan(f),c=this.a*(i(f-this.lat0)+(1-Math.cos(d))/Math.tan(f)));else if(Math.abs(f)<=k)b=this.a*g,c=-1*this.ml0;else{var m=l(this.a,this.e,Math.sin(f))/Math.tan(f);b=m*Math.sin(d),c=this.a*j(this.e0,this.e1,this.e2,this.e3,f)-this.ml0+m*(1-Math.cos(d))}return a.x=b+this.x0,a.y=c+this.y0,a},c.inverse=function(a){var b,c,d,e,f,g,i,l,n;if(d=a.x-this.x0,e=a.y-this.y0,this.sphere)if(Math.abs(e+this.a*this.lat0)<=k)b=h(d/this.a+this.long0),c=0;else{g=this.lat0+e/this.a,i=d*d/this.a/this.a+g*g,l=g;var o;for(f=m;f;--f)if(o=Math.tan(l),n=-1*(g*(l*o+1)-l-.5*(l*l+i)*o)/((l-g)/o-1),l+=n,Math.abs(n)<=k){c=l;break}b=h(this.long0+Math.asin(d*Math.tan(l)/this.a)/Math.sin(c))}else if(Math.abs(e+this.ml0)<=k)c=0,b=h(this.long0+d/this.a);else{g=(this.ml0+e)/this.a,i=d*d/this.a/this.a+g*g,l=g;var p,q,r,s,t;for(f=m;f;--f)if(t=this.e*Math.sin(l),p=Math.sqrt(1-t*t)*Math.tan(l),q=this.a*j(this.e0,this.e1,this.e2,this.e3,l),r=this.e0-2*this.e1*Math.cos(2*l)+4*this.e2*Math.cos(4*l)-6*this.e3*Math.cos(6*l),s=q/this.a,n=(g*(p*s+1)-s-.5*p*(s*s+i))/(this.es*Math.sin(2*l)*(s*s+i-2*g*s)/(4*p)+(g-s)*(p*r-2/Math.sin(2*l))-r),l-=n,Math.abs(n)<=k){c=l;break}p=Math.sqrt(1-this.es*Math.pow(Math.sin(c),2))*Math.tan(c),b=h(this.long0+Math.asin(d*p/this.a)/Math.sin(c))}return a.x=b,a.y=c,a},c.names=["Polyconic","poly"]},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/gN":11,"../common/mlfn":14}],57:[function(a,b,c){var d=a("../common/adjust_lon"),e=a("../common/adjust_lat"),f=a("../common/pj_enfn"),g=20,h=a("../common/pj_mlfn"),i=a("../common/pj_inv_mlfn"),j=Math.PI/2,k=1e-10,l=a("../common/asinz");c.init=function(){this.sphere?(this.n=1,this.m=0,this.es=0,this.C_y=Math.sqrt((this.m+1)/this.n),this.C_x=this.C_y/(this.m+1)):this.en=f(this.es)},c.forward=function(a){var b,c,e=a.x,f=a.y;if(e=d(e-this.long0),this.sphere){if(this.m)for(var i=this.n*Math.sin(f),j=g;j;--j){var l=(this.m*f+Math.sin(f)-i)/(this.m+Math.cos(f));if(f-=l,Math.abs(l)<k)break}else f=1!==this.n?Math.asin(this.n*Math.sin(f)):f;b=this.a*this.C_x*e*(this.m+Math.cos(f)),c=this.a*this.C_y*f}else{var m=Math.sin(f),n=Math.cos(f);c=this.a*h(f,m,n,this.en),b=this.a*e*n/Math.sqrt(1-this.es*m*m)}return a.x=b,a.y=c,a},c.inverse=function(a){var b,c,f,g;return a.x-=this.x0,f=a.x/this.a,a.y-=this.y0,b=a.y/this.a,this.sphere?(b/=this.C_y,f/=this.C_x*(this.m+Math.cos(b)),this.m?b=l((this.m*b+Math.sin(b))/this.n):1!==this.n&&(b=l(Math.sin(b)/this.n)),f=d(f+this.long0),b=e(b)):(b=i(a.y/this.a,this.es,this.en),g=Math.abs(b),j>g?(g=Math.sin(b),c=this.long0+a.x*Math.sqrt(1-this.es*g*g)/(this.a*Math.cos(b)),f=d(c)):j>g-k&&(f=this.long0)),a.x=f,a.y=b,a},c.names=["Sinusoidal","sinu"]},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/asinz":6,"../common/pj_enfn":17,"../common/pj_inv_mlfn":18,"../common/pj_mlfn":19}],58:[function(a,b,c){c.init=function(){var a=this.lat0;this.lambda0=this.long0;var b=Math.sin(a),c=this.a,d=this.rf,e=1/d,f=2*e-Math.pow(e,2),g=this.e=Math.sqrt(f);this.R=this.k0*c*Math.sqrt(1-f)/(1-f*Math.pow(b,2)),this.alpha=Math.sqrt(1+f/(1-f)*Math.pow(Math.cos(a),4)),this.b0=Math.asin(b/this.alpha);var h=Math.log(Math.tan(Math.PI/4+this.b0/2)),i=Math.log(Math.tan(Math.PI/4+a/2)),j=Math.log((1+g*b)/(1-g*b));this.K=h-this.alpha*i+this.alpha*g/2*j},c.forward=function(a){var b=Math.log(Math.tan(Math.PI/4-a.y/2)),c=this.e/2*Math.log((1+this.e*Math.sin(a.y))/(1-this.e*Math.sin(a.y))),d=-this.alpha*(b+c)+this.K,e=2*(Math.atan(Math.exp(d))-Math.PI/4),f=this.alpha*(a.x-this.lambda0),g=Math.atan(Math.sin(f)/(Math.sin(this.b0)*Math.tan(e)+Math.cos(this.b0)*Math.cos(f))),h=Math.asin(Math.cos(this.b0)*Math.sin(e)-Math.sin(this.b0)*Math.cos(e)*Math.cos(f));return a.y=this.R/2*Math.log((1+Math.sin(h))/(1-Math.sin(h)))+this.y0,a.x=this.R*g+this.x0,a},c.inverse=function(a){for(var b=a.x-this.x0,c=a.y-this.y0,d=b/this.R,e=2*(Math.atan(Math.exp(c/this.R))-Math.PI/4),f=Math.asin(Math.cos(this.b0)*Math.sin(e)+Math.sin(this.b0)*Math.cos(e)*Math.cos(d)),g=Math.atan(Math.sin(d)/(Math.cos(this.b0)*Math.cos(d)-Math.sin(this.b0)*Math.tan(e))),h=this.lambda0+g/this.alpha,i=0,j=f,k=-1e3,l=0;Math.abs(j-k)>1e-7;){if(++l>20)return;i=1/this.alpha*(Math.log(Math.tan(Math.PI/4+f/2))-this.K)+this.e*Math.log(Math.tan(Math.PI/4+Math.asin(this.e*Math.sin(j))/2)),k=j,j=2*Math.atan(Math.exp(i))-Math.PI/2}return a.x=h,a.y=j,a},c.names=["somerc"]},{}],59:[function(a,b,c){var d=Math.PI/2,e=1e-10,f=a("../common/sign"),g=a("../common/msfnz"),h=a("../common/tsfnz"),i=a("../common/phi2z"),j=a("../common/adjust_lon");c.ssfn_=function(a,b,c){return b*=c,Math.tan(.5*(d+a))*Math.pow((1-b)/(1+b),.5*c)},c.init=function(){this.coslat0=Math.cos(this.lat0),this.sinlat0=Math.sin(this.lat0),this.sphere?1===this.k0&&!isNaN(this.lat_ts)&&Math.abs(this.coslat0)<=e&&(this.k0=.5*(1+f(this.lat0)*Math.sin(this.lat_ts))):(Math.abs(this.coslat0)<=e&&(this.con=this.lat0>0?1:-1),this.cons=Math.sqrt(Math.pow(1+this.e,1+this.e)*Math.pow(1-this.e,1-this.e)),1===this.k0&&!isNaN(this.lat_ts)&&Math.abs(this.coslat0)<=e&&(this.k0=.5*this.cons*g(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts))/h(this.e,this.con*this.lat_ts,this.con*Math.sin(this.lat_ts))),this.ms1=g(this.e,this.sinlat0,this.coslat0),this.X0=2*Math.atan(this.ssfn_(this.lat0,this.sinlat0,this.e))-d,this.cosX0=Math.cos(this.X0),this.sinX0=Math.sin(this.X0))},c.forward=function(a){var b,c,f,g,i,k,l=a.x,m=a.y,n=Math.sin(m),o=Math.cos(m),p=j(l-this.long0);return Math.abs(Math.abs(l-this.long0)-Math.PI)<=e&&Math.abs(m+this.lat0)<=e?(a.x=0/0,a.y=0/0,a):this.sphere?(b=2*this.k0/(1+this.sinlat0*n+this.coslat0*o*Math.cos(p)),a.x=this.a*b*o*Math.sin(p)+this.x0,a.y=this.a*b*(this.coslat0*n-this.sinlat0*o*Math.cos(p))+this.y0,a):(c=2*Math.atan(this.ssfn_(m,n,this.e))-d,g=Math.cos(c),f=Math.sin(c),Math.abs(this.coslat0)<=e?(i=h(this.e,m*this.con,this.con*n),k=2*this.a*this.k0*i/this.cons,a.x=this.x0+k*Math.sin(l-this.long0),a.y=this.y0-this.con*k*Math.cos(l-this.long0),a):(Math.abs(this.sinlat0)<e?(b=2*this.a*this.k0/(1+g*Math.cos(p)),a.y=b*f):(b=2*this.a*this.k0*this.ms1/(this.cosX0*(1+this.sinX0*f+this.cosX0*g*Math.cos(p))),a.y=b*(this.cosX0*f-this.sinX0*g*Math.cos(p))+this.y0),a.x=b*g*Math.sin(p)+this.x0,a))},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c,f,g,h,k=Math.sqrt(a.x*a.x+a.y*a.y);if(this.sphere){var l=2*Math.atan(k/(.5*this.a*this.k0));return b=this.long0,c=this.lat0,e>=k?(a.x=b,a.y=c,a):(c=Math.asin(Math.cos(l)*this.sinlat0+a.y*Math.sin(l)*this.coslat0/k),b=j(Math.abs(this.coslat0)<e?this.lat0>0?this.long0+Math.atan2(a.x,-1*a.y):this.long0+Math.atan2(a.x,a.y):this.long0+Math.atan2(a.x*Math.sin(l),k*this.coslat0*Math.cos(l)-a.y*this.sinlat0*Math.sin(l))),a.x=b,a.y=c,a)}if(Math.abs(this.coslat0)<=e){if(e>=k)return c=this.lat0,b=this.long0,a.x=b,a.y=c,a;a.x*=this.con,a.y*=this.con,f=k*this.cons/(2*this.a*this.k0),c=this.con*i(this.e,f),b=this.con*j(this.con*this.long0+Math.atan2(a.x,-1*a.y))}else g=2*Math.atan(k*this.cosX0/(2*this.a*this.k0*this.ms1)),b=this.long0,e>=k?h=this.X0:(h=Math.asin(Math.cos(g)*this.sinX0+a.y*Math.sin(g)*this.cosX0/k),b=j(this.long0+Math.atan2(a.x*Math.sin(g),k*this.cosX0*Math.cos(g)-a.y*this.sinX0*Math.sin(g)))),c=-1*i(this.e,Math.tan(.5*(d+h)));return a.x=b,a.y=c,a},c.names=["stere"]},{"../common/adjust_lon":5,"../common/msfnz":15,"../common/phi2z":16,"../common/sign":21,"../common/tsfnz":24}],60:[function(a,b,c){var d=a("./gauss"),e=a("../common/adjust_lon");c.init=function(){d.init.apply(this),this.rc&&(this.sinc0=Math.sin(this.phic0),this.cosc0=Math.cos(this.phic0),this.R2=2*this.rc,this.title||(this.title="Oblique Stereographic Alternative"))},c.forward=function(a){var b,c,f,g;return a.x=e(a.x-this.long0),d.forward.apply(this,[a]),b=Math.sin(a.y),c=Math.cos(a.y),f=Math.cos(a.x),g=this.k0*this.R2/(1+this.sinc0*b+this.cosc0*c*f),a.x=g*c*Math.sin(a.x),a.y=g*(this.cosc0*b-this.sinc0*c*f),a.x=this.a*a.x+this.x0,a.y=this.a*a.y+this.y0,a},c.inverse=function(a){var b,c,f,g,h;if(a.x=(a.x-this.x0)/this.a,a.y=(a.y-this.y0)/this.a,a.x/=this.k0,a.y/=this.k0,h=Math.sqrt(a.x*a.x+a.y*a.y)){var i=2*Math.atan2(h,this.R2);b=Math.sin(i),c=Math.cos(i),g=Math.asin(c*this.sinc0+a.y*b*this.cosc0/h),f=Math.atan2(a.x*b,h*this.cosc0*c-a.y*this.sinc0*b)}else g=this.phic0,f=0;return a.x=f,a.y=g,d.inverse.apply(this,[a]),a.x=e(a.x+this.long0),a},c.names=["Stereographic_North_Pole","Oblique_Stereographic","Polar_Stereographic","sterea","Oblique Stereographic Alternative"]},{"../common/adjust_lon":5,"./gauss":45}],61:[function(a,b,c){var d=a("../common/e0fn"),e=a("../common/e1fn"),f=a("../common/e2fn"),g=a("../common/e3fn"),h=a("../common/mlfn"),i=a("../common/adjust_lon"),j=Math.PI/2,k=1e-10,l=a("../common/sign"),m=a("../common/asinz");c.init=function(){this.e0=d(this.es),this.e1=e(this.es),this.e2=f(this.es),this.e3=g(this.es),this.ml0=this.a*h(this.e0,this.e1,this.e2,this.e3,this.lat0)},c.forward=function(a){var b,c,d,e=a.x,f=a.y,g=i(e-this.long0),j=Math.sin(f),k=Math.cos(f);if(this.sphere){var l=k*Math.sin(g);if(Math.abs(Math.abs(l)-1)<1e-10)return 93;c=.5*this.a*this.k0*Math.log((1+l)/(1-l)),b=Math.acos(k*Math.cos(g)/Math.sqrt(1-l*l)),0>f&&(b=-b),d=this.a*this.k0*(b-this.lat0)}else{var m=k*g,n=Math.pow(m,2),o=this.ep2*Math.pow(k,2),p=Math.tan(f),q=Math.pow(p,2);b=1-this.es*Math.pow(j,2);var r=this.a/Math.sqrt(b),s=this.a*h(this.e0,this.e1,this.e2,this.e3,f);c=this.k0*r*m*(1+n/6*(1-q+o+n/20*(5-18*q+Math.pow(q,2)+72*o-58*this.ep2)))+this.x0,d=this.k0*(s-this.ml0+r*p*n*(.5+n/24*(5-q+9*o+4*Math.pow(o,2)+n/30*(61-58*q+Math.pow(q,2)+600*o-330*this.ep2))))+this.y0}return a.x=c,a.y=d,a},c.inverse=function(a){var b,c,d,e,f,g,h=6;if(this.sphere){var n=Math.exp(a.x/(this.a*this.k0)),o=.5*(n-1/n),p=this.lat0+a.y/(this.a*this.k0),q=Math.cos(p);b=Math.sqrt((1-q*q)/(1+o*o)),f=m(b),0>p&&(f=-f),g=0===o&&0===q?this.long0:i(Math.atan2(o,q)+this.long0)}else{var r=a.x-this.x0,s=a.y-this.y0;for(b=(this.ml0+s/this.k0)/this.a,c=b,e=0;!0&&(d=(b+this.e1*Math.sin(2*c)-this.e2*Math.sin(4*c)+this.e3*Math.sin(6*c))/this.e0-c,c+=d,!(Math.abs(d)<=k));e++)if(e>=h)return 95;if(Math.abs(c)<j){var t=Math.sin(c),u=Math.cos(c),v=Math.tan(c),w=this.ep2*Math.pow(u,2),x=Math.pow(w,2),y=Math.pow(v,2),z=Math.pow(y,2);b=1-this.es*Math.pow(t,2);var A=this.a/Math.sqrt(b),B=A*(1-this.es)/b,C=r/(A*this.k0),D=Math.pow(C,2);f=c-A*v*D/B*(.5-D/24*(5+3*y+10*w-4*x-9*this.ep2-D/30*(61+90*y+298*w+45*z-252*this.ep2-3*x))),g=i(this.long0+C*(1-D/6*(1+2*y+w-D/20*(5-2*w+28*y-3*x+8*this.ep2+24*z)))/u)}else f=j*l(s),g=this.long0}return a.x=g,a.y=f,a},c.names=["Transverse_Mercator","Transverse Mercator","tmerc"]},{"../common/adjust_lon":5,"../common/asinz":6,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/mlfn":14,"../common/sign":21}],62:[function(a,b,c){var d=.017453292519943295,e=a("./tmerc");c.dependsOn="tmerc",c.init=function(){this.zone&&(this.lat0=0,this.long0=(6*Math.abs(this.zone)-183)*d,this.x0=5e5,this.y0=this.utmSouth?1e7:0,this.k0=.9996,e.init.apply(this),this.forward=e.forward,this.inverse=e.inverse)},c.names=["Universal Transverse Mercator System","utm"]},{"./tmerc":61}],63:[function(a,b,c){var d=a("../common/adjust_lon"),e=Math.PI/2,f=1e-10,g=a("../common/asinz");c.init=function(){this.R=this.a},c.forward=function(a){var b,c,h=a.x,i=a.y,j=d(h-this.long0);Math.abs(i)<=f&&(b=this.x0+this.R*j,c=this.y0);var k=g(2*Math.abs(i/Math.PI));(Math.abs(j)<=f||Math.abs(Math.abs(i)-e)<=f)&&(b=this.x0,c=i>=0?this.y0+Math.PI*this.R*Math.tan(.5*k):this.y0+Math.PI*this.R*-Math.tan(.5*k));var l=.5*Math.abs(Math.PI/j-j/Math.PI),m=l*l,n=Math.sin(k),o=Math.cos(k),p=o/(n+o-1),q=p*p,r=p*(2/n-1),s=r*r,t=Math.PI*this.R*(l*(p-s)+Math.sqrt(m*(p-s)*(p-s)-(s+m)*(q-s)))/(s+m);0>j&&(t=-t),b=this.x0+t;var u=m+p;return t=Math.PI*this.R*(r*u-l*Math.sqrt((s+m)*(m+1)-u*u))/(s+m),c=i>=0?this.y0+t:this.y0-t,a.x=b,a.y=c,a},c.inverse=function(a){var b,c,e,g,h,i,j,k,l,m,n,o,p;return a.x-=this.x0,a.y-=this.y0,n=Math.PI*this.R,e=a.x/n,g=a.y/n,h=e*e+g*g,i=-Math.abs(g)*(1+h),j=i-2*g*g+e*e,k=-2*i+1+2*g*g+h*h,p=g*g/k+(2*j*j*j/k/k/k-9*i*j/k/k)/27,l=(i-j*j/3/k)/k,m=2*Math.sqrt(-l/3),n=3*p/l/m,Math.abs(n)>1&&(n=n>=0?1:-1),o=Math.acos(n)/3,c=a.y>=0?(-m*Math.cos(o+Math.PI/3)-j/3/k)*Math.PI:-(-m*Math.cos(o+Math.PI/3)-j/3/k)*Math.PI,b=Math.abs(e)<f?this.long0:d(this.long0+Math.PI*(h-1+Math.sqrt(1+2*(e*e-g*g)+h*h))/2/e),a.x=b,a.y=c,a},c.names=["Van_der_Grinten_I","VanDerGrinten","vandg"]},{"../common/adjust_lon":5,"../common/asinz":6}],64:[function(a,b){var c=.017453292519943295,d=57.29577951308232,e=1,f=2,g=a("./datum_transform"),h=a("./adjust_axis"),i=a("./Proj"),j=a("./common/toPoint");b.exports=function k(a,b,l){function m(a,b){return(a.datum.datum_type===e||a.datum.datum_type===f)&&"WGS84"!==b.datumCode}var n;return Array.isArray(l)&&(l=j(l)),a.datum&&b.datum&&(m(a,b)||m(b,a))&&(n=new i("WGS84"),k(a,n,l),a=n),"enu"!==a.axis&&h(a,!1,l),"longlat"===a.projName?(l.x*=c,l.y*=c):(a.to_meter&&(l.x*=a.to_meter,l.y*=a.to_meter),a.inverse(l)),a.from_greenwich&&(l.x+=a.from_greenwich),l=g(a.datum,b.datum,l),b.from_greenwich&&(l.x-=b.from_greenwich),"longlat"===b.projName?(l.x*=d,l.y*=d):(b.forward(l),b.to_meter&&(l.x/=b.to_meter,l.y/=b.to_meter)),"enu"!==b.axis&&h(b,!0,l),l}},{"./Proj":2,"./adjust_axis":3,"./common/toPoint":23,"./datum_transform":30}],65:[function(a,b){function c(a,b,c){a[b]=c.map(function(a){var b={};return d(a,b),b}).reduce(function(a,b){return i(a,b)},{})}function d(a,b){var e;return Array.isArray(a)?(e=a.shift(),"PARAMETER"===e&&(e=a.shift()),1===a.length?Array.isArray(a[0])?(b[e]={},d(a[0],b[e])):b[e]=a[0]:a.length?"TOWGS84"===e?b[e]=a:(b[e]={},["UNIT","PRIMEM","VERT_DATUM"].indexOf(e)>-1?(b[e]={name:a[0].toLowerCase(),convert:a[1]},3===a.length&&(b[e].auth=a[2])):"SPHEROID"===e?(b[e]={name:a[0],a:a[1],rf:a[2]},4===a.length&&(b[e].auth=a[3])):["GEOGCS","GEOCCS","DATUM","VERT_CS","COMPD_CS","LOCAL_CS","FITTED_CS","LOCAL_DATUM"].indexOf(e)>-1?(a[0]=["name",a[0]],c(b,e,a)):a.every(function(a){return Array.isArray(a)})?c(b,e,a):d(a,b[e])):b[e]=!0,void 0):void(b[a]=!0)}function e(a,b){var c=b[0],d=b[1];!(c in a)&&d in a&&(a[c]=a[d],3===b.length&&(a[c]=b[2](a[c])))}function f(a){return a*h}function g(a){function b(b){var c=a.to_meter||1;return parseFloat(b,10)*c}"GEOGCS"===a.type?a.projName="longlat":"LOCAL_CS"===a.type?(a.projName="identity",a.local=!0):a.projName="object"==typeof a.PROJECTION?Object.keys(a.PROJECTION)[0]:a.PROJECTION,a.UNIT&&(a.units=a.UNIT.name.toLowerCase(),"metre"===a.units&&(a.units="meter"),a.UNIT.convert&&(a.to_meter=parseFloat(a.UNIT.convert,10))),a.GEOGCS&&(a.datumCode=a.GEOGCS.DATUM?a.GEOGCS.DATUM.name.toLowerCase():a.GEOGCS.name.toLowerCase(),"d_"===a.datumCode.slice(0,2)&&(a.datumCode=a.datumCode.slice(2)),("new_zealand_geodetic_datum_1949"===a.datumCode||"new_zealand_1949"===a.datumCode)&&(a.datumCode="nzgd49"),"wgs_1984"===a.datumCode&&("Mercator_Auxiliary_Sphere"===a.PROJECTION&&(a.sphere=!0),a.datumCode="wgs84"),"_ferro"===a.datumCode.slice(-6)&&(a.datumCode=a.datumCode.slice(0,-6)),"_jakarta"===a.datumCode.slice(-8)&&(a.datumCode=a.datumCode.slice(0,-8)),~a.datumCode.indexOf("belge")&&(a.datumCode="rnb72"),a.GEOGCS.DATUM&&a.GEOGCS.DATUM.SPHEROID&&(a.ellps=a.GEOGCS.DATUM.SPHEROID.name.replace("_19","").replace(/[Cc]larke\_18/,"clrk"),"international"===a.ellps.toLowerCase().slice(0,13)&&(a.ellps="intl"),a.a=a.GEOGCS.DATUM.SPHEROID.a,a.rf=parseFloat(a.GEOGCS.DATUM.SPHEROID.rf,10)),~a.datumCode.indexOf("osgb_1936")&&(a.datumCode="osgb36")),a.b&&!isFinite(a.b)&&(a.b=a.a);
var c=function(b){return e(a,b)},d=[["standard_parallel_1","Standard_Parallel_1"],["standard_parallel_2","Standard_Parallel_2"],["false_easting","False_Easting"],["false_northing","False_Northing"],["central_meridian","Central_Meridian"],["latitude_of_origin","Latitude_Of_Origin"],["scale_factor","Scale_Factor"],["k0","scale_factor"],["latitude_of_center","Latitude_of_center"],["lat0","latitude_of_center",f],["longitude_of_center","Longitude_Of_Center"],["longc","longitude_of_center",f],["x0","false_easting",b],["y0","false_northing",b],["long0","central_meridian",f],["lat0","latitude_of_origin",f],["lat0","standard_parallel_1",f],["lat1","standard_parallel_1",f],["lat2","standard_parallel_2",f],["alpha","azimuth",f],["srsCode","name"]];d.forEach(c),a.long0||!a.longc||"Albers_Conic_Equal_Area"!==a.PROJECTION&&"Lambert_Azimuthal_Equal_Area"!==a.PROJECTION||(a.long0=a.longc)}var h=.017453292519943295,i=a("./extend");b.exports=function(a,b){var c=JSON.parse((","+a).replace(/\s*\,\s*([A-Z_0-9]+?)(\[)/g,',["$1",').slice(1).replace(/\s*\,\s*([A-Z_0-9]+?)\]/g,',"$1"]')),e=c.shift(),f=c.shift();c.unshift(["name",f]),c.unshift(["type",e]),c.unshift("output");var h={};return d(c,h),g(h.output),i(b,h.output)}},{"./extend":33}],66:[function(a,b,c){function d(a){return a*(Math.PI/180)}function e(a){return 180*(a/Math.PI)}function f(a){var b,c,e,f,g,i,j,k,l,m=a.lat,n=a.lon,o=6378137,p=.00669438,q=.9996,r=d(m),s=d(n);l=Math.floor((n+180)/6)+1,180===n&&(l=60),m>=56&&64>m&&n>=3&&12>n&&(l=32),m>=72&&84>m&&(n>=0&&9>n?l=31:n>=9&&21>n?l=33:n>=21&&33>n?l=35:n>=33&&42>n&&(l=37)),b=6*(l-1)-180+3,k=d(b),c=p/(1-p),e=o/Math.sqrt(1-p*Math.sin(r)*Math.sin(r)),f=Math.tan(r)*Math.tan(r),g=c*Math.cos(r)*Math.cos(r),i=Math.cos(r)*(s-k),j=o*((1-p/4-3*p*p/64-5*p*p*p/256)*r-(3*p/8+3*p*p/32+45*p*p*p/1024)*Math.sin(2*r)+(15*p*p/256+45*p*p*p/1024)*Math.sin(4*r)-35*p*p*p/3072*Math.sin(6*r));var t=q*e*(i+(1-f+g)*i*i*i/6+(5-18*f+f*f+72*g-58*c)*i*i*i*i*i/120)+5e5,u=q*(j+e*Math.tan(r)*(i*i/2+(5-f+9*g+4*g*g)*i*i*i*i/24+(61-58*f+f*f+600*g-330*c)*i*i*i*i*i*i/720));return 0>m&&(u+=1e7),{northing:Math.round(u),easting:Math.round(t),zoneNumber:l,zoneLetter:h(m)}}function g(a){var b=a.northing,c=a.easting,d=a.zoneLetter,f=a.zoneNumber;if(0>f||f>60)return null;var h,i,j,k,l,m,n,o,p,q,r=.9996,s=6378137,t=.00669438,u=(1-Math.sqrt(1-t))/(1+Math.sqrt(1-t)),v=c-5e5,w=b;"N">d&&(w-=1e7),o=6*(f-1)-180+3,h=t/(1-t),n=w/r,p=n/(s*(1-t/4-3*t*t/64-5*t*t*t/256)),q=p+(3*u/2-27*u*u*u/32)*Math.sin(2*p)+(21*u*u/16-55*u*u*u*u/32)*Math.sin(4*p)+151*u*u*u/96*Math.sin(6*p),i=s/Math.sqrt(1-t*Math.sin(q)*Math.sin(q)),j=Math.tan(q)*Math.tan(q),k=h*Math.cos(q)*Math.cos(q),l=s*(1-t)/Math.pow(1-t*Math.sin(q)*Math.sin(q),1.5),m=v/(i*r);var x=q-i*Math.tan(q)/l*(m*m/2-(5+3*j+10*k-4*k*k-9*h)*m*m*m*m/24+(61+90*j+298*k+45*j*j-252*h-3*k*k)*m*m*m*m*m*m/720);x=e(x);var y=(m-(1+2*j+k)*m*m*m/6+(5-2*k+28*j-3*k*k+8*h+24*j*j)*m*m*m*m*m/120)/Math.cos(q);y=o+e(y);var z;if(a.accuracy){var A=g({northing:a.northing+a.accuracy,easting:a.easting+a.accuracy,zoneLetter:a.zoneLetter,zoneNumber:a.zoneNumber});z={top:A.lat,right:A.lon,bottom:x,left:y}}else z={lat:x,lon:y};return z}function h(a){var b="Z";return 84>=a&&a>=72?b="X":72>a&&a>=64?b="W":64>a&&a>=56?b="V":56>a&&a>=48?b="U":48>a&&a>=40?b="T":40>a&&a>=32?b="S":32>a&&a>=24?b="R":24>a&&a>=16?b="Q":16>a&&a>=8?b="P":8>a&&a>=0?b="N":0>a&&a>=-8?b="M":-8>a&&a>=-16?b="L":-16>a&&a>=-24?b="K":-24>a&&a>=-32?b="J":-32>a&&a>=-40?b="H":-40>a&&a>=-48?b="G":-48>a&&a>=-56?b="F":-56>a&&a>=-64?b="E":-64>a&&a>=-72?b="D":-72>a&&a>=-80&&(b="C"),b}function i(a,b){var c=""+a.easting,d=""+a.northing;return a.zoneNumber+a.zoneLetter+j(a.easting,a.northing,a.zoneNumber)+c.substr(c.length-5,b)+d.substr(d.length-5,b)}function j(a,b,c){var d=k(c),e=Math.floor(a/1e5),f=Math.floor(b/1e5)%20;return l(e,f,d)}function k(a){var b=a%q;return 0===b&&(b=q),b}function l(a,b,c){var d=c-1,e=r.charCodeAt(d),f=s.charCodeAt(d),g=e+a-1,h=f+b,i=!1;g>x&&(g=g-x+t-1,i=!0),(g===u||u>e&&g>u||(g>u||u>e)&&i)&&g++,(g===v||v>e&&g>v||(g>v||v>e)&&i)&&(g++,g===u&&g++),g>x&&(g=g-x+t-1),h>w?(h=h-w+t-1,i=!0):i=!1,(h===u||u>f&&h>u||(h>u||u>f)&&i)&&h++,(h===v||v>f&&h>v||(h>v||v>f)&&i)&&(h++,h===u&&h++),h>w&&(h=h-w+t-1);var j=String.fromCharCode(g)+String.fromCharCode(h);return j}function m(a){if(a&&0===a.length)throw"MGRSPoint coverting from nothing";for(var b,c=a.length,d=null,e="",f=0;!/[A-Z]/.test(b=a.charAt(f));){if(f>=2)throw"MGRSPoint bad conversion from: "+a;e+=b,f++}var g=parseInt(e,10);if(0===f||f+3>c)throw"MGRSPoint bad conversion from: "+a;var h=a.charAt(f++);if("A">=h||"B"===h||"Y"===h||h>="Z"||"I"===h||"O"===h)throw"MGRSPoint zone letter "+h+" not handled: "+a;d=a.substring(f,f+=2);for(var i=k(g),j=n(d.charAt(0),i),l=o(d.charAt(1),i);l<p(h);)l+=2e6;var m=c-f;if(m%2!==0)throw"MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters"+a;var q,r,s,t,u,v=m/2,w=0,x=0;return v>0&&(q=1e5/Math.pow(10,v),r=a.substring(f,f+v),w=parseFloat(r)*q,s=a.substring(f+v),x=parseFloat(s)*q),t=w+j,u=x+l,{easting:t,northing:u,zoneLetter:h,zoneNumber:g,accuracy:q}}function n(a,b){for(var c=r.charCodeAt(b-1),d=1e5,e=!1;c!==a.charCodeAt(0);){if(c++,c===u&&c++,c===v&&c++,c>x){if(e)throw"Bad character: "+a;c=t,e=!0}d+=1e5}return d}function o(a,b){if(a>"V")throw"MGRSPoint given invalid Northing "+a;for(var c=s.charCodeAt(b-1),d=0,e=!1;c!==a.charCodeAt(0);){if(c++,c===u&&c++,c===v&&c++,c>w){if(e)throw"Bad character: "+a;c=t,e=!0}d+=1e5}return d}function p(a){var b;switch(a){case"C":b=11e5;break;case"D":b=2e6;break;case"E":b=28e5;break;case"F":b=37e5;break;case"G":b=46e5;break;case"H":b=55e5;break;case"J":b=64e5;break;case"K":b=73e5;break;case"L":b=82e5;break;case"M":b=91e5;break;case"N":b=0;break;case"P":b=8e5;break;case"Q":b=17e5;break;case"R":b=26e5;break;case"S":b=35e5;break;case"T":b=44e5;break;case"U":b=53e5;break;case"V":b=62e5;break;case"W":b=7e6;break;case"X":b=79e5;break;default:b=-1}if(b>=0)return b;throw"Invalid zone letter: "+a}var q=6,r="AJSAJS",s="AFAFAF",t=65,u=73,v=79,w=86,x=90;c.forward=function(a,b){return b=b||5,i(f({lat:a[1],lon:a[0]}),b)},c.inverse=function(a){var b=g(m(a.toUpperCase()));return[b.left,b.bottom,b.right,b.top]},c.toPoint=function(a){var b=c.inverse(a);return[(b[2]+b[0])/2,(b[3]+b[1])/2]}},{}],67:[function(a,b){b.exports={name:"proj4",version:"2.2.1",description:"Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",main:"lib/index.js",directories:{test:"test",doc:"docs"},scripts:{test:"./node_modules/istanbul/lib/cli.js test ./node_modules/mocha/bin/_mocha test/test.js"},repository:{type:"git",url:"git://github.com/proj4js/proj4js.git"},author:"",license:"MIT",jam:{main:"dist/proj4.js",include:["dist/proj4.js","README.md","AUTHORS","LICENSE.md"]},devDependencies:{"grunt-cli":"~0.1.13",grunt:"~0.4.2","grunt-contrib-connect":"~0.6.0","grunt-contrib-jshint":"~0.8.0",chai:"~1.8.1",mocha:"~1.17.1","grunt-mocha-phantomjs":"~0.4.0",browserify:"~3.24.5","grunt-browserify":"~1.3.0","grunt-contrib-uglify":"~0.3.2",curl:"git://github.com/cujojs/curl.git",istanbul:"~0.2.4",tin:"~0.4.0"},dependencies:{mgrs:"0.0.0"}}},{}],"./includedProjections":[function(a,b){b.exports=a("gWUPNW")},{}],gWUPNW:[function(a,b){var c=[a("./lib/projections/tmerc"),a("./lib/projections/utm"),a("./lib/projections/sterea"),a("./lib/projections/stere"),a("./lib/projections/somerc"),a("./lib/projections/omerc"),a("./lib/projections/lcc"),a("./lib/projections/krovak"),a("./lib/projections/cass"),a("./lib/projections/laea"),a("./lib/projections/aea"),a("./lib/projections/gnom"),a("./lib/projections/cea"),a("./lib/projections/eqc"),a("./lib/projections/poly"),a("./lib/projections/nzmg"),a("./lib/projections/mill"),a("./lib/projections/sinu"),a("./lib/projections/moll"),a("./lib/projections/eqdc"),a("./lib/projections/vandg"),a("./lib/projections/aeqd")];b.exports=function(proj4){c.forEach(function(a){proj4.Proj.projections.add(a)})}},{"./lib/projections/aea":39,"./lib/projections/aeqd":40,"./lib/projections/cass":41,"./lib/projections/cea":42,"./lib/projections/eqc":43,"./lib/projections/eqdc":44,"./lib/projections/gnom":46,"./lib/projections/krovak":47,"./lib/projections/laea":48,"./lib/projections/lcc":49,"./lib/projections/mill":52,"./lib/projections/moll":53,"./lib/projections/nzmg":54,"./lib/projections/omerc":55,"./lib/projections/poly":56,"./lib/projections/sinu":57,"./lib/projections/somerc":58,"./lib/projections/stere":59,"./lib/projections/sterea":60,"./lib/projections/tmerc":61,"./lib/projections/utm":62,"./lib/projections/vandg":63}]},{},[35])(35)});;/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */
/* ======================================================================
    converter.class.js
   ====================================================================== */
/*

  File: converter.class.js
  Description: User Interface for Proj4.js library
    ---------------------------------------------------------------------
    |  /!\ Warning: needs JQuery 1.4.2 or later and Proj4.js libraries!  |
    ---------------------------------------------------------------------

  Version |    Date     |         Author          |  Modifications
  ----------------------------------------------------------------------
  1.0     |  2010-01-01 | clem.rz -at- gmail.com  | Creation of converter.class.js
  1.1     |  2010-08-01 | clem.rz -at- gmail.com  | Adding of m <-> km option for XY and ZXY projections
  1.2     |  2010-08-23 | clem.rz -at- gmail.com  | Rewriting the document for JQuery 1.4.2
  1.2.1   |  2010-08-24 | clem.rz -at- gmail.com  | Convert on enter key, sort CRS by country and by text
  1.2.2   |  2010-08-30 | clem.rz -at- gmail.com  | Correction for callback function in continueDefSource
  1.2.3   |  2010-09-01 | clem.rz -at- gmail.com  | check existing functions and remove empty optgroups
  1.2.4   |  2010-09-01 | clem.rz -at- gmail.com  | modification of showLoadingSign
  1.2.5   |  2010-09-01 | clem.rz -at- gmail.com  | callback function if defs ajax loading fails
  1.2.6   |  2010-09-02 | clem.rz -at- gmail.com  | toggleLoadingSing has been replaced with showLoadingSign
  1.2.7   |  2010-09-03 | clem.rz -at- gmail.com  | bug in the removing loop of continueDefSource, adding possibility
                                                  | of specifying new codes like: ESRI, IAU2000, SR-ORG, and urls and urns
                                                  | adding callback function for reload
  2.0     |  2010-09-07 | clem.rz -at- gmail.com  | Creation of Proj4js.Proj object on selection only, this reduce memory usage
  2.0.1   |  2010-09-15 | clem.rz -at- gmail.com  | Show Hide loading sign issue
  2.0.2   |  2010-11-19 | clem.rz -at- gmail.com  | The CRS info link is optional
                                                  | pass WGS84 array in case of CSV
  2.0.3   |  2011-04-04 | clem.rz -at- gmail.com  | Correction of dmsToDd function
  2.0.4   |  2011-04-15 | clem.rz -at- gmail.com  | Correction of App.math.parseFloat when value isNaN returns 0
  2.0.5   |  2013-02-08 | clem.rz -at- gmail.com  | Modification of loadCRS
                                                  | its content and the function getDefTitle have been moved to global.js.php
  2.0.6   |  2013-09-13 | clem.rz -at- gmail.com  | Update to new JQuery specs
  2.1.0   |  2013-10-06 | clem.rz -at- gmail.com  | Addition of the convergence information
  2.1.1   |  2013-10-13 | clem.rz -at- gmail.com  | Addition of getConvergence function
  2.1.2   |  2013-12-19 | clem.rz -at- gmail.com  | Addition of conventions for convergence angle
  2.1.3   |  2014-01-06 | clem.rz -at- gmail.com  | Compatibility changes for html5
  2.1.4   |  2014-03-17 | clem.rz -at- gmail.com  | Add connector specific changes
                                                  | Remove the nfo parameter
  2.1.5   |  2014-04-13 | clem.rz -at- gmail.com  | Fix some connectors bugs
  2.2.0   |  2014-05-12 | clem.rz -at- gmail.com  | Use an object as parameter of constructors instead of plenty o arguments!
                                                  | Utils functions moved to utils.js file
  3.0.0   |  2014-11-18 | clem.rz -at- gmail.com  | Refactor everything into jQuery UI Widgets
*/
/**
 * Usage:
 * $container.converterSet(options);
 */

(function($, proj4, TWCCHistory, App) {
    "use strict";
    /*global window, jQuery, App, Proj4js, TWCCHistory */

    //region Utils
    var _INPUT_ERROR_MESSAGE = 'INPUT ERROR ON LINE ';

    function _parseFloat(value) {
        value = +value.toString().replace(/\,/gi, '.');
        return isNaN(value) ? 0 : value;
    }

    function _newDeferred() {
        return App.utils.newDeferred.apply(this, arguments);
    }

    function _capitalize(string) {
        return string.charAt(0).toUpperCase() + string.substring(1);
    }

    function _getMagneticDeclinationForToday(wgs84) {
        var wmm = App.utils.getWMM();
        return wmm(wgs84[0].y, wgs84[0].x).dec;
    }

    function _getUTMZone(wgs84lng) {
        return (wgs84lng >= 0) ? Math.floor((wgs84lng + 180) / 6) + 1 : Math.floor(wgs84lng / 6) + 31;
    }

    function getHemisphere(wgs84Lat) {
        return (wgs84Lat >= 0) ? 'n' : 's';
    }

    function _getKeyCode(event) {
        if (event.keyCode) {
            return event.keyCode;
        } else {
            return event.which;
        }
    }

    function _dmsToDd(dmsValue) {
        var value, cardinal, ddValue;
        if (dmsValue !== undefined) {
            value = Math.abs(_parseFloat(dmsValue.D));
            value += Math.abs(_parseFloat(dmsValue.M)) / 60;
            value += Math.abs(_parseFloat(dmsValue.S)) / 3600;
            cardinal = (_parseFloat(dmsValue.D) >= 0) ? 1 : -1;
            cardinal *= ((dmsValue.C == 'N' || dmsValue.C == 'E') ? 1 : -1);
            ddValue = cardinal * value;
        }
        return ddValue;
    }

    function _dmToDd(dmsValue) {
        var value, cardinal, ddValue;
        if (dmsValue !== undefined) {
            value = Math.abs(_parseFloat(dmsValue.D));
            value += Math.abs(_parseFloat(dmsValue.M)) / 60;
            cardinal = (_parseFloat(dmsValue.D) >= 0) ? 1 : -1;
            cardinal *= ((dmsValue.C == 'N' || dmsValue.C == 'E') ? 1 : -1);
            ddValue = cardinal * value;
        }
        return ddValue;
    }

    function _ddToDms(ddValue, ddOpts) {
        var degrees, minutes_temp, minutes, seconds, cardinal;
        if ($.type(+ddValue) !== 'number' || isNaN(ddValue)) {
            degrees = 0;
            minutes = 0;
            seconds = 0;
            if (ddOpts) {
                cardinal = ddOpts.N ? 'N' : 'E';
            }
        } else {
            if (ddOpts) {
                cardinal = (ddValue >= 0) ? (ddOpts.N ? 'N' : 'E') : (ddOpts.S ? 'S' : 'W');
            }
            ddValue = Math.abs(ddValue);
            degrees = Math.floor(ddValue);
            minutes_temp = (ddValue - degrees) * 60;
            minutes = Math.floor(minutes_temp);
            seconds = (minutes_temp - minutes) * 60;
        }
        return {
            'C': cardinal,
            'D': degrees.toString(),
            'M': minutes.toString(),
            'S': seconds.toString()
        };
    }

    function _ddToDm(ddValue, ddOpts) {
        var degrees, minutes, cardinal;
        if ($.type(+ddValue) !== 'number' || isNaN(ddValue)) {
            degrees = 0;
            minutes = 0;
            if (ddOpts) {
                cardinal = ddOpts.N ? 'N' : 'E';
            }
        } else {
            if (ddOpts) {
                cardinal = (ddValue >= 0) ? (ddOpts.N ? 'N' : 'E') : (ddOpts.S ? 'S' : 'W');
            }
            ddValue = Math.abs(ddValue);
            degrees = Math.floor(ddValue);
            minutes = (ddValue - degrees) * 60;
        }
        return {
            'C': cardinal,
            'D': degrees.toString(),
            'M': minutes.toString()
        };
    }

    function _getDefinitionString(srsCode, definitions) {
        var definitionString = '';
        $.each(definitions, function(country, definition) {
            if (definition.hasOwnProperty(srsCode)) {
                definitionString = definition[srsCode].def;
                return false;
            } else {
                return true;
            }
        });
        return definitionString;
    }

    /**
     * Return the convergence angle
     * Source:
     * http://www.threelittlemaids.co.uk/magdec/transverse_mercator_projection.pdf
     * http://www.ga.gov.au/geodesy/datums/redfearn_geo_to_grid.jsp
     * http://www.threelittlemaids.co.uk/magdec/explain.html
     */
    function _computeConvergence(a, b, lng0, wgs84) {
        var sc = App.utils.getConvergenceConvention(),
            lng_0 = lng0 || App.utils.degToRad(_getUTMZone(wgs84.x) * 6 - 183),
            lat = App.utils.degToRad(wgs84.y),
            lng = App.utils.degToRad(wgs84.x),
            e2 = (a - b) / a,
            eta2 = e2 * Math.pow(Math.cos(lat), 2) / (1 - e2),
            P = lng - lng_0,
            J13 = Math.sin(lat),
            J14 = (1 + 3 * eta2 + 2 * Math.pow(eta2, 2)) * Math.sin(lat) * Math.pow(Math.cos(lat), 2) / 3,
            J15 = (2 - Math.pow(Math.tan(lat), 2)) * Math.sin(lat) * Math.pow(Math.cos(lat), 4) / 15,
            C = P * J13 + Math.pow(P, 3) * J14 + Math.pow(P, 5) * J15;
        C *= (sc) ? -1 : 1;
        return App.utils.radToDeg(C);
    }

    function getCoef(lenghtUnit) {
        var coef;
        switch (lenghtUnit) {
            case 'm':
                coef = 1;
                break;
            case 'km':
                coef = 1000;
                break;
            case 'us-ft':
                coef = 0.304800609601219;
                break;
            default:
                coef = 1000;
        }
        return coef;
    }

    function _toMeter(value, lenghtUnit) {
        return _parseFloat(value) * getCoef(lenghtUnit);
    }

    function _fromMeter(value, lenghtUnit) {
        return _parseFloat(value) / getCoef(lenghtUnit);
    }
    //endregion

    //region Converter widgets
    $.widget('twcc.converterSet', {
        options: {
            units: {
                dms:{D:'°', M:'\'', S:'\'\''},
                dd:{x:{DD:'°E'}, y:{DD:'°N'}},
                cartesian:{XY:{m:'m', km:'km', 'us-ft':'ft'},CONVERGENCE:'°'}
            },
            labels:{
                spherical:{x:'Lng = ', y:'Lat = ', convergence:'Conv. = '},
                cartesian:{x:'X = ', y:'Y = ', z:'Zone = ', h:'Hemisphere = ', convergence:'Conv. = '},
                csv:{csv:'CSV : ', l:'Format : '}
            },
            options:{
                x:{E:'East',W:'West'},
                y:{N:'North',S:'South'},
                o:{_DMS:'Deg. min. sec.', _DM:'Deg. min.', _DD:'Decimal deg.'},
                h:{n:'North', s:'South'},
                u:{_M:'Meters', _KM:'Kilometers', _F:'Feet'}
            },
            value: {x:0,y:0},
            wgs84: [],
            defaultWgs84: [{x:0,y:0}],
            selections: {},
            definitions: {},
            url: '',
            $containers: [],
            masterLoadingToggleSwitch: false,
            csv: false
        },
        _create: function() {
            var history,
                self = this;
            this._bindEvents();
            this._historyManager = TWCCHistory.getInstance(App);
            history = this._historyManager.getCurrentValue();
            if (!this.options.wgs84) {
                if (history) {
                    var reg = /UD\d+/gi;
                    if (history.wgs84.length > 1) {
                        this.options.wgs84 = history.wgs84;
                        self.options.csv = true;
                    } else {
                        if ($.type(history.wgs84) !== 'array') {
                            throw 'Wrong data type';
                        }
                        this.options.wgs84 = history.wgs84;
                    }
                    this.options.selections.source = reg.test(history.sc) ? 'WGS84' : history.sc;
                    this.options.selections.destination = reg.test(history.dc) ? 'WGS84' : history.dc;
                } else {
                    this.options.wgs84 = this.options.defaultWgs84;
                }
            }
            this.options.$containers = this.element.find('.converter-container');
            this.options.$containers.each(function(index) {
                $(this).converter({
                    units: self.options.units,
                    labels: self.options.labels,
                    options: self.options.options,
                    csv: self.options.csv,
                    target: index ? 'dest' : 'source',
                    selection: self.options.selections[index ? 'destination' : 'source'],
                    value: self.options.value,
                    wgs84: self.options.wgs84
                });
            });
            this.options.masterLoadingToggleSwitch = true;
            this._toggleLoading();
            this._reload()
                .progress(function(message) {
                    self._trigger('.notify', null, message);
                })
                .done(function() {
                    self._reloadSucceeded.apply(self, arguments);
                    self._trigger('.done', null, {wgs84:self.wgs84(), csv:self.csv()});
                    self.setConvergence();
                })
                .fail(function() {
                    self._reloadFailed.apply(self, arguments);
                });
        },
        _bindEvents: function() {
            var self = this;
            this.element.bind('converter.transform', function(event, obj) {
                self.transform(obj);
            });
            this.element.bind('converter.source.wgs84_changed ' +
                'converterset.done ', function(event, response) {
                var data = {
                    wgs84: response.wgs84,
                    convergenceInDegrees: self._convergence(),
                    srsCode: self._selection(),
                    magneticDeclinationInDegrees: _getMagneticDeclinationForToday(response.wgs84)
                };
                self._addToHistory(data);
                self._triggerWgs84Changed(event, data);
            });
            this.element.bind('converter.source.selection_changed ' +
                'converter.dest.selection_changed ', function(event, response) {
                var data = {
                    wgs84: response.wgs84,
                    srsCode: self._selection()
                };
                self._addToHistory(data);
                self._triggerConvergenceChange();
            });
            this.element.bind('converter.source.convergence_changed ' +
                'converter.dest.convergence_changed ', function() {
                self._triggerConvergenceChange();
            });
            this.element.find('.history').click(function() {
                if ($(this).hasClass('next')) {
                    self._historyManager.moveToNext();
                } else {
                    self._historyManager.moveToPrevious();
                }
                self._restoreFromHistory();
            });
        },
        _triggerWgs84Changed: function(event, data) {
            this._trigger('.wgs84_changed', event, data);
        },
        _triggerConvergenceChange: function() {
            this._trigger('.convergence_changed', null, {
                convergenceInDegrees: this._convergence()
            });
        },
        _reloadSucceeded: function() {
            this._loadDefinitionsObject();
            this.options.masterLoadingToggleSwitch = false;
            this._toggleLoading();
        },
        _reloadFailed: function(XMLHttpRequest) {
            this._trigger('.fail', null, XMLHttpRequest);
        },
        _reload: function() {
            var self = this,
                dfd = _newDeferred('Reload');
            this._toggleLoading(true);
            this._loadDefinitions().always(function() {
                self._toggleLoading(false);
            }).done(function() {
                var plainDefinitions = {};
                if (self.options.definitions.WGS84) {
                    self.options.definitions = {'*World': self.options.definitions};
                }
                $.each(self.options.definitions, function(country, newDef) {
                    $.extend(plainDefinitions, newDef);
                });
                dfd.resolve();
            }).fail(function(message, args) {
                dfd.reject(args);
            });
            return dfd.promise();
        },
        _loadDefinitions: function() {
            var self = this,
                dfd = _newDeferred('Load definitions');
            if ($.type(this.options.definitions) !== 'object') {
                dfd.reject('Wrong definitions type');
            } else {
                if ($.isEmptyObject(this.options.definitions)) {
                    $.ajax({
                        url: this.options.url,
                        data: {u: 'u'},
                        type: "POST",
                        cache: false,
                        dataType: 'json'
                    }).done(function(data, textStatus, jqXHR) {
                        if (data.error !== undefined) {
                            dfd.reject('Server Error', [jqXHR, textStatus, data]);
                        } else {
                            self.options.definitions = data;
                            dfd.resolve();
                        }
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        dfd.reject('Server Error', arguments);
                    });
                } else {
                    dfd.resolve();
                }
            }
            return dfd.promise();
        },
        _loadDefinitionsObject: function() {
            this._pushPullAll('loadDefinitionsObject', this.options.definitions);
        },
        _toggleLoading: function(show) {
            show = this.options.masterLoadingToggleSwitch || !!show;
            this._pushPullAll('toggleLoading', show);
        },
        _addToHistory: function(response) {
            if (this._historyManager.isEnabled()) {
                this._historyManager.add({
                    wgs84: response.wgs84,
                    sc: response.srsCode.source,
                    dc: response.srsCode.destination
                });
            }
        },
        _restoreFromHistory: function() {
            var self = this,
                obj = this._historyManager.getCurrentValue();
            this._underTheRadar(function() {
                var isCsv = obj.wgs84.length > 1,
                    csv = self.csv();
                if (csv !== isCsv) {
                    self.csv(isCsv);
                }
                self.transform(obj);
                self.pushPullSource('selection', obj.sc);
                self.pushPullDestination('selection', obj.dc);
            });
        },
        _underTheRadar: function(func) {
            if ($.type(func) !== 'function') {
                throw 'Invalid function';
            }
            this._historyManager.toggle(false);
            func();
            this._historyManager.toggle(true);
        },
        _pushPullWithCriterion: function(key, value, criteria, criterion) {
            var returnedValue = null,
                self = this;
            this.options.$containers.each(function() {
                if ($(this).converter('option', criteria) === criterion) {
                    returnedValue = self._pushPullOne(key, value, $(this));
                }
            });
            return returnedValue;
        },
        _pushPullOne: function(key, value, $container) {
            var returnedValue = value === undefined ? $container.converter(key) : $container.converter(key, value);
            if (this.options.hasOwnProperty(key)) {
                this.options[key] = returnedValue;
            }
            return returnedValue;
        },
        pushPullSource: function(key, value) {
            return this._pushPullWithCriterion(key, value, 'target', 'source');
        },
        pushPullDestination: function(key, value) {
            return this._pushPullWithCriterion(key, value, 'target', 'dest');
        },
        _pushPullAll: function(key, value) {
            var self = this;
            this.options.$containers.each(function() {
                self._pushPullOne(key, value, $(this));
            });
            return this.options[key];
        },
        _pullAll: function(key) {
            return {
                source: this.pushPullSource(key),
                destination: this.pushPullDestination(key)
            };
        },
        wgs84: function(value) {
            return this._pushPullAll('wgs84', value);
        },
        toggle: function(enable) {
            return this._pushPullAll('toggle', enable);
        },
        _getFirstWgs84: function() {
            var wgs84 = null,
                wgs84Array = this.wgs84();
            $.each(wgs84Array, function() {
                if (!this.error) {
                    wgs84 = this;
                    return false;
                }
                return true;
            });
            return wgs84 || {x:0,y:0};
        },
        _convergence: function() {
            return this._pullAll('convergence');
        },
        _selection: function() {
            this.options.selections = this._pullAll('selection');
            return this.options.selections;
        },
        setConvergence: function() {
            this._pushPullAll('setConvergence');
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        csv: function(enable) {
            if (enable != this.options.csv && enable !== undefined) {
                if (!enable) {
                    var wgs84 = [this._getFirstWgs84()];
                    if (JSON.stringify(wgs84[0]) === JSON.stringify(this.wgs84()[0])) {
                        this.wgs84(wgs84);
                    } else {
                        this.transform({wgs84:wgs84});
                    }
                }
                this._trigger('.csv_changed', null, {csv:enable});
            }
            return this._pushPullAll('csv', enable);
        },
        unloadCRS: function(srsCode) {
            this._pushPullAll('unloadCRS', srsCode);
        },
        removeEmptyOptgroups: function() {
            this._pushPullAll('removeEmptyOptgroups');
        },
        mergeDefinitions: function(definitionsObject) {
            var self = this,
                dfd = new $.Deferred();
            this.options.masterLoadingToggleSwitch = true;
            this._toggleLoading();
            this.options.definitions = $.type(this.options.definitions) !== 'object' ? {} : this.options.definitions;
            $.extend(true, this.options.definitions, definitionsObject);
            this._reload()
                .progress(function() {
                    dfd.notify('Reloading');
                })
                .done(function() {
                    self._reloadSucceeded.apply(self, arguments);
                    dfd.resolve();
                })
                .fail(function() {
                    self._reloadFailed.apply(self, arguments);
                    dfd.reject.apply(null, arguments);
                });
            return dfd.promise();
        },
        transform: function(data) {
            var fromPivot = data.hasOwnProperty('wgs84');
            if (!(fromPivot && $.type(data.wgs84) === 'array' || data.hasOwnProperty('target'))) {
                throw 'Wrong data format';
            }
            if (fromPivot) {
                this._pushPullAll('transform', data);
            } else {
                var wgs84;
                if (data.target === 'source') {
                    wgs84 = this.pushPullSource('transform', {input:null});
                    this.pushPullDestination('transform', {wgs84:wgs84});
                } else {
                    wgs84 = this.pushPullDestination('transform', {input:null});
                    this.pushPullSource('transform', {wgs84:wgs84});
                }
            }
        },
        _setOption: function(key, value) {
            return this._superApply(arguments);
        },
        _destroy: function() {
            this._toggleLoading(true);
            this._pushPullAll('destroy');
            return this._super();
        }
    });

    $.widget('twcc.converter', {
        options: {
            readOnly: false,
            wrapper: {
                fieldSet: ['<div>'],
                title: ['<h3>'],
                info: ['<a>', {name: 'info', href: '#'}]
            },
            projections: {},
            units: {},
            labels: {},
            options: {},
            angleUnit: 'dd',
            lengthUnit: 'm',
            convergence: null,
            hint: '',
            wgs84: [{x:0, y:0}],
            value: {x:0, y:0},
            selection: null,
            mapping: {
                aea: 'cartesian',
                aeqd: 'cartesian',
                cass: 'cartesian',
                cea: 'cartesian',
                csv: 'csv',
                eqc: 'cartesian',
                eqdc: 'cartesian',
                equi: 'cartesian',
                gauss: 'cartesian',
                geocent: 'cartesian',
                gnom: 'cartesian',
                gstmerc: 'cartesian',
                laea: 'cartesian',
                lcc: 'cartesian',
                longlat: 'spherical',
                merc: 'cartesian',
                mill: 'cartesian',
                moll: 'cartesian',
                nzmg: 'cartesian',
                omerc: 'cartesian',
                ortho: 'cartesian',
                poly: 'cartesian',
                sinu: 'cartesian',
                somerc: 'cartesian',
                stere: 'cartesian',
                sterea: 'cartesian',
                tmerc: 'cartesian',
                utm: 'utm',
                vandg: 'spherical',
                connector: 'connector'
            },
            $select: null,
            $container: null,
            csv: false
        },
        _widget: undefined,
        _create: function() {
            $.extend(this.options, {
                $select: this.element.find('select.crs-list'),
                $container: this.element.find('.container')
            });
            this._bindEvents();
            this._unload();
        },
        _triggerTransform: function(event) {
            event.preventDefault();
            this._trigger('.transform', event, {
                target: this.options.target
            });
        },
        _bindEvents: function() {
            var self = this;
            this.options.$select.bind('change', function() {
                self.selection();
            });
            this.element.bind('angleswitchgeofield.update_display', function(event, response) {
                self.options.angleUnit = response.value;
                self.value();
                self.updateContainer();
            });
            this.element.find('.convert-button').click(function(event) {
                self._triggerTransform(event);
            });
            this.element.on('keyup', 'input, select', function(event) {
                if (_getKeyCode(event) == App.constants.keyboard.RETURN) {
                    self._triggerTransform(event);
                }
            });
        },
        _getFieldSetUnit: function(projName) {
            var widgetPrefix = this._getWidgetPrefix(projName),
                unitName = this._getFieldSetUnitName(widgetPrefix);
            if (unitName) {
                return this.options.units[unitName];
            } else {
                var camelArray = widgetPrefix.match(/([A-Z]?[a-z]*)/g);
                unitName = this._getFieldSetUnitName(camelArray[1]);
                if (unitName) {
                    return this.options.units[unitName];
                }
            }
        },
        _getFieldSetUnitName: function(widgetPrefix) {
            var unitName;
            switch (widgetPrefix) {
                case 'utm':
                    unitName = 'cartesian';
                    break;
                case 'Dm':
                    unitName = 'dms';
                    break;
                case 'csv':
                case 'connector':
                    break;
                default:
                    unitName = widgetPrefix.toLowerCase();
            }
            if (unitName && this.options.units.hasOwnProperty(unitName)) {
                return unitName;
            }
        },
        _getFieldSetLabel: function(projName) {
            var widgetPrefix = this._getWidgetPrefix(projName),
                labelName = this._getFieldSetLabelName(widgetPrefix);
            if (labelName) {
                return this.options.labels[labelName];
            } else {
                var camelArray = widgetPrefix.match(/([A-Z]?[a-z]*)/g);
                labelName = this._getFieldSetLabelName(camelArray[0]);
                if (labelName) {
                    return this.options.labels[labelName];
                }
            }
        },
        _getFieldSetLabelName: function(widgetPrefix) {
            var labelName;
            switch (widgetPrefix) {
                case 'utm':
                    labelName = 'cartesian';
                    break;
                case 'connector':
                    break;
                default:
                    labelName = widgetPrefix.toLowerCase();
            }
            if (labelName && this.options.labels.hasOwnProperty(labelName)) {
                return labelName;
            }
        },
        _getWidgetMidfix: function(prefix) {
            var midfix = '';
            if (prefix === 'spherical') {
                midfix = this.options.angleUnit;
                midfix = midfix.charAt(0).toUpperCase() + midfix.substr(1).toLowerCase();
            }
            return midfix;
        },
        _getWidgetPrefix: function(projName) {
            var prefix,
                projection = this.options.projections[this.options.selection];
            projName = projection.isConnector && projName !== 'csv' ? 'connector' : projName;
            if (this.options.mapping.hasOwnProperty(projName)) {
                prefix = this.options.mapping[projName];
            } else {
                console.error('Projection not found: ' + projName);
                prefix = 'cartesian';
            }
            return prefix + this._getWidgetMidfix(prefix);
        },
        _getWidgetName: function(projName) {
            return this._getWidgetPrefix(projName) + 'FieldSet';
        },
        _unload: function() {
            this.element.find('select.crs-list, .container').empty();
            this.projections = {};
        },
        toggleLoading: function(show) {
            this.element.find('.container').toggle(!show);
            this.element.find('.loading').toggle(!!show);
        },
        removeEmptyOptgroups: function() {
            this.options.$select.find('optgroup:empty').remove();
        },
        loadDefinitionsObject: function(definitions) {
            var flag,
                self = this,
                $select = this.options.$select;
            this.options.definitions = definitions;
            this.removeEmptyOptgroups();
            flag = false;
            $.each(this.options.definitions, function(country, newDef) {
                $.each(newDef, function(srsCode, obj) {
                    if (!self.options.$select.has('optgroup[label="'+country+'"] option[value="'+srsCode+'"]').length) {
                        App.utils.addOptionToSelect(country, srsCode, self.options.$select, obj.def);
                        flag = true;
                    }
                });
            });
            if (flag) {
                $select.sortGrpsNOptionsByText();
                this.selection(this.options.selection || $select.find('option:first').val());
            }
        },
        unloadCRS: function(srsCode) {
            var self = this;
            if (this.selection() === srsCode) {
                var originalSrsCode = this._widget.options.srsCode;
                this.selection(originalSrsCode);
            }
            this.options.$select.find('option[value="'+srsCode.toString()+'"]').remove();
            proj4.defs(srsCode, undefined);
            delete this.options.projections[srsCode];
            $.each(this.options.definitions, function(country, definition) {
                if (definition.hasOwnProperty(srsCode)) {
                    delete self.options.definitions[country][srsCode];
                    return false;
                }
                return true;
            });
            this.removeEmptyOptgroups();
        },
        updateContainer: function() {
            var self = this,
                srsCode = this.selection();
            this.options.value = (!this.options.csv && $.type(this.options.value) === 'array') ? this.options.value[0] : this.options.value;
            this.options.value = (this.options.csv && $.type(this.options.value) !== 'array') ? [this.options.value] : this.options.value;
            if (srsCode) {
                if (!this.options.projections.hasOwnProperty(srsCode)) {
                    this._registerProjection(srsCode);
                }
                var $title, $temp,
                    projection = this._getProjection(srsCode),
                    projectionName = projection.projName,
                    unit = this._getFieldSetUnit(projectionName) || '',
                    label = this._getFieldSetLabel(projectionName) || '',
                    options = {
                        srsCode: srsCode,
                        target: this.options.target,
                        convergence: this.options.convergence,
                        wgs84: this.options.wgs84,
                        value: this.options.value,
                        units: unit,
                        labels: label,
                        lengthUnit: this.options.lengthUnit,
                        options: this.options.options,
                        readOnly: this.options.readOnly
                    },
                    crsTitle = projection.title || srsCode,
                    widgetName = this._getWidgetName(this.options.csv ? 'csv' : projection.projName),
                    $fieldSetContainer = $.apply(null, this.options.wrapper.fieldSet);
                this.options.$container.empty();
                $title = $.apply(null, this.options.wrapper.title);
                $title.append(crsTitle);
                $temp = $.apply(null, this.options.wrapper.info);
                $temp.click(function(event) {
                    self._trigger('.info', event, {
                        srsCode: srsCode,
                        definitionString: projection.defData
                    });
                });
                $temp.text(' [?]');
                $title.append($temp);
                $fieldSetContainer.append($title);
                if (widgetName == 'csvFieldSet') {
                    unit = unit.D ? this.options.units.dd : unit;
                    var hint = (
                        (projectionName === 'utm' ? label.h + ',' + label.z + ',' : '') + (label.x ? label.x + (unit.x ? '(' + unit.x.DD + ')' : '(' + unit.XY.m + ')') : '') + (label.y ? ',' + label.y + (unit.y ? '(' + unit.y.DD + ')' : '(' + unit.XY.m + ')') : '')
                        ).replace(/[\s]*=[\s]*/ig, '');
                    $.extend(options, {
                        originalProjection: projection.isConnector ? 'connector' : projectionName,
                        hint: hint,
                        units: null,
                        labels: this.options.labels.csv
                    });
                }
                this._widget = $fieldSetContainer[widgetName](options).data('twcc'+_capitalize(widgetName));
                this.options.$container.append($fieldSetContainer);
            }
        },
        _registerProjection: function(srsCode) {
            var projection;
            if (!proj4.defs(srsCode)) {
                var isConnector = srsCode.indexOf('Connector') >= 0,
                    definitionString = _getDefinitionString(srsCode, this.options.definitions),
                    definition  = {
                        defData: definitionString,
                        isConnector: isConnector
                    };
                proj4.defs(srsCode, definitionString);
                $.extend(proj4.defs(srsCode), definition);
            }
            projection = $.extend({}, proj4.defs(srsCode));
            this._setProjection(srsCode, projection);
        },
        _getProjection: function(srsCode) {
            if (!this.options.projections.hasOwnProperty(srsCode)) {
                throw 'Unknown srsCode';
            }
            return this.options.projections[srsCode];
        },
        _setProjection: function(srsCode, projection) {
            this.options.projections[srsCode] = projection;
        },
        selection: function(value) {
            var $select = this.options.$select,
                flag = false,
                self = this,
                originalSelection = this.options.selection;
            if (value !== undefined) {
                this.options.selection = value;
                try {
                    $select.val(this.options.selection);
                } catch (e) {} //IE6 BUG
                flag = true;
            } else if ($select.val() && $select.val() != this.options.selection) {
                this.options.selection = $select.val();
                flag = true;
            }
            if (flag) {
                this.updateContainer();
                var srsCode = self.options.selection,
                    wgs84 = self.wgs84();
                self.transform({wgs84: wgs84});
                self.setConvergence();
                if (originalSelection !== srsCode) {
                    self._trigger('.'+self.options.target+'.selection_changed', null, {wgs84:wgs84});
                }
            }
            return this.options.selection;
        },
        projection: function() {
            return this._getProjection(this.selection());
        },
        _pushPull: function(key, value) {
            var returnedValue;
            if (!this._widget) {
                return null;
            }
            returnedValue = this._widget[key](value);
            if (this.options.hasOwnProperty(key)) {
                this.options[key] = returnedValue;
            }
            return returnedValue;
        },
        value: function(value) {
            if (value !== undefined) {
                if (!this.options.csv && $.type(value) !== 'object' || this.options.csv && $.type(value) !== 'array') {
                    throw 'Invalid type';
                }
            }
            return this._pushPull('value', value);
        },
        wgs84: function(value) {
            if (value !== undefined && JSON.stringify(this.options.wgs84) !== JSON.stringify(value)) {
                this._pushPull('wgs84', value);
                this._trigger('.'+this.options.target+'.wgs84_changed', null, {wgs84:value});
                this.setConvergence();
            }
            return this.options.wgs84;
        },
        convergence: function(value) {
            var originalConvergence = this.options.convergence;
            this._pushPull('convergence', value);
            if (value !== undefined && originalConvergence !== this.options.convergence) {
                var wgs84 = this.wgs84();
                this._trigger('.'+this.options.target+'.convergence_changed', null, {wgs84:wgs84});
            }
            return this.options.convergence;
        },
        setConvergence: function() {
            if (this._widget && $.type(this._widget.convergence()) !== 'null') {
                var convergence,
                    wgs84 = this.wgs84()[0],
                    projection = this.projection(),
                    long0 = this._widget.zone ? null : projection.long0 || null;
                convergence = _computeConvergence(projection.a, projection.b, long0, wgs84);
                this.convergence(convergence);
            }
        },
        csv: function(enable) {
            if (enable !== undefined) {
                this.value();
                this.options.csv = !!enable;
                this.updateContainer();
            }
            return this.options.csv;
        },
        hint: function(value) {
            return this._pushPull('hint', value);
        },
        toggle: function(enable) {
            return this._pushPull('toggle', enable);
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        _formatCoordinates: function(coordinates) {
            var coordinatesArray,
                whiteList = ['array', 'object'];
            if ($.inArray($.type(coordinates), whiteList) < 0) {
                throw 'Wrong data type';
            }
            coordinatesArray = $.type(coordinates) === 'array' ? coordinates : [coordinates];
            return coordinatesArray;
        },
        _setupInputProjection: function(projection, wgs84, fromPivot, value) {
            var parameters = fromPivot ? {z:_getUTMZone(wgs84.x),h:getHemisphere(wgs84.y)} : value,
                defData = projection.defData;
            defData = defData.replace(/\+zone=[^\s]+/ig, "+zone=" + parameters.z);
            defData = defData.replace("+south", "");
            defData += parameters.h === "s" ? " +south" : "";
            console.log(new proj4.Proj(defData));
            return new proj4.Proj(defData);
        },
        _isValidPoint: function(point, isConnector) {
            var isValid = 1;
            isValid &= $.type(point) === 'object';
            isValid &= point.hasOwnProperty('x');
            if (isConnector) {
                isValid &= point.x.indexOf(_INPUT_ERROR_MESSAGE) < 0;
            } else {
                isValid &= point.hasOwnProperty('y');
                isValid &= $.type(point.x) === 'number' && !isNaN(point.x);
                isValid &= $.type(point.y) === 'number' && !isNaN(point.y);
            }
            return !!isValid;
        },
        _getConnector: function() {
            var connectorName = this.selection();
            if (!window.hasOwnProperty(connectorName)) {
                $.ajax({
                    url: '/js/connectors/' + connectorName + '.js',
                    async: false,
                    cache: true,
                    dataType: 'script'
                });
            }
            return window[connectorName].getInstance(App.context);
        },
        transform: function(data) {
            var coordinates, pointsA, originalProjection, projections,
                self = this,
                pointsB = [],
                wgs84Array = [],
                fromPivot = data.hasOwnProperty('wgs84'),
                value = this.value(),
                inputIsUtm = !!this._widget.zone,
                pivotProjection = proj4.WGS84,
                inputProjection = this.projection(),
                getPivotProjection = function() {return $.extend({isConnector: inputProjection.isConnector}, new proj4.Proj(pivotProjection.defData));},
                getInputProjection = function() {return inputIsUtm ? self._setupInputProjection.apply(self, arguments) : $.extend({isConnector: inputProjection.isConnector}, new proj4.Proj(inputProjection.defData));},
                pivotProjectionObject = {type: 'pivot', getProjection: getPivotProjection},
                inputProjectionObject = {type: 'input', getProjection: getInputProjection};
            if (!(fromPivot || data.hasOwnProperty('input'))) {
                throw 'Wrong data format';
            }
            this.toggleLoading(true);
            var dataValue = fromPivot ? data.wgs84 : data.input;
            if (fromPivot && dataValue) {
                this.wgs84(dataValue);
            }
            if (fromPivot) {
                coordinates = dataValue || this.wgs84();
                projections = {A: pivotProjectionObject, B: inputProjectionObject};
            } else {
                coordinates = dataValue || value;
                projections = {A: inputProjectionObject, B: pivotProjectionObject};
                originalProjection = this._widget.options.originalProjection;
            }
            pointsA = this._formatCoordinates(coordinates);
            $.each(pointsA, function(index, pointA) {
                var pointB = {},
                    wgs84 = self.wgs84()[index],
                    projectionA = projections.A.getProjection(inputProjection, wgs84, fromPivot, value),
                    projectionB = projections.B.getProjection(inputProjection, wgs84, fromPivot, value),
                    AIsConnector = originalProjection === 'connector' || !fromPivot && projectionA.isConnector,
                    BIsConnector = fromPivot && projectionB.isConnector,
                    areConnectors = AIsConnector || BIsConnector;
                if (!self._isValidPoint(pointA, AIsConnector) || fromPivot && wgs84.error) {
                    wgs84Array.push({x:0,y:0,error:true});
                    pointsB.push(_INPUT_ERROR_MESSAGE + (index+1));
                } else {
                    var connector;
                    if (areConnectors) {
                        connector = self._getConnector();
                    }
                    if (areConnectors && fromPivot) {
                        pointB[projections.B.type] = connector.forward(pointA);
                    } else {
                        if (areConnectors) {
                            pointA = connector.inverse(pointA);
                        }
                        pointB[projections.B.type] = proj4(projectionA, projectionB, $.extend({}, pointA));
                    }
                    pointB[projections.A.type] = $.extend({}, pointA);
                    wgs84Array.push({x:pointB.pivot.x, y:pointB.pivot.y});
                    pointsB.push({x:pointB.input.x, y:pointB.input.y});
                }
            });
            if (!this.csv()) {
                pointsB = pointsB[0];
            }
            if (fromPivot) {
                this.value(pointsB);
            } else {
                this.wgs84(wgs84Array);
            }
            this.toggleLoading(false);
            return this.wgs84();
        },
        _setOption: function(key, value) {
            return this._superApply(arguments);
        },
        _destroy: function() {
            this._unload();
            return this._super();
        }
    });
    //endregion

    //region FieldSet widgets
    $.widget('twcc.fieldSet', {
        options: {
            srsCode: null,
            value: {},
            units: {},
            target: null,
            wrapper: {
                set: ['<div>', {class:'table'}],
                geoField: ['<div>', {class: 'row'}],
                geoCaption: ['<div>', {class: 'caption'}]
            },
            readOnly: false,
            geoFields: {},
            geoFieldsIndex: 0,
            wgs84: null
        },
        _create: function() {
            var geoFieldsOptions,
                $set = $.apply(null, this.options.wrapper.set);
            geoFieldsOptions = this._getGeoFieldsOptions();
            this._setDefaultsGeoFieldsOptions(geoFieldsOptions);
            this._buildGeoFields($set, geoFieldsOptions);
            this._setFieldsHandlers();
            this.element.append($set);
        },
        _setFieldsHandlers: function() {
            //Do not remove
        },
        _setDefaultsGeoFieldsOptions: function(obj) {
            var self = this;
            $.each(obj, function(key, geoFieldOption) {
                var params = {
                    name: self.options.srsCode+'_'+self.options.target,
                    readOnly: self.options.readOnly,
                    unit: self.options.units,
                    target: self.options.target,
                    value: self.options.value[geoFieldOption.options.axis]
                };
                obj[key].options = $.extend(params, obj[key].options);
            });
        },
        _buildGeoField: function($container, key, type, options) {
            var $geoField,
                index = this.options.geoFieldsIndex++;
            if (type.indexOf('Switch') >= 0 || type.indexOf('connector') >= 0) {
                $geoField = $.apply(null, this.options.wrapper.geoCaption);
            } else {
                $geoField = $.apply(null, this.options.wrapper.geoField);
            }
            this.options.geoFields[index] = $geoField[type](options);
            $container.append($geoField);
        },
        _buildGeoFields: function($container, geoFieldsOptions) {
            var self = this;
            $.each(geoFieldsOptions, function(key, obj) {
                self._buildGeoField($container, key, obj.type, obj.options);
            });
        },
        _getGeoFieldsOptions: function() {
            return {};
        },
        _getConvergenceIcon: function() {
            return '<img src="'+App.system.dirWsImages+'GN_'+this.options.target+'.png" alt="">';
        },
        convergence: function() {
            return null;
        },
        hint: function() {
            return null;
        },
        wgs84: function(value) {
            if (value === undefined) {
                return this._getWgs84();
            } else {
                return this._setWgs84(value);
            }
        },
        _getWgs84: function() {
            return this.options.wgs84;
        },
        _setWgs84: function(value) {
            this.options.wgs84 = value;
            return this.options.wgs84;
        },
        value: function(value) {
            if (value === undefined) {
                this.options.value = this._getValue();
            } else {
                this.options.value = this._setValue(value);
            }
            this._setToStringMethod();
            return this.options.value;
        },
        _getValue: function() {
            return this.options.value;
        },
        _setValue: function(value) {
            this.options.value = value;
        },
        _setToStringMethod: function() {
            var self = this;
            this.options.value.toString = function() {
                return self._getStringValue();
            };
        },
        _getStringValue: function() {
            return "";
        },
        toggle: function(enable) {
            enable = enable === undefined ? this.options.readOnly : !!enable;
            this.options.readOnly = this._toggle(enable);
            return this.options.readOnly;
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        _toggle: function(enable) {
            return !enable;
        },
        _setOption: function(key, value) {
            return this._superApply(arguments);
        },
        _destroy: function() {
            this.element.empty();
            return this._super();
        }
    });

    $.widget('twcc.connectorFieldSet', $.twcc.fieldSet, {
        options: {
            options: {},
            geoFields: {},
            value: {}
        },
        _getGeoFieldsOptions: function() {
            return [{
                type: 'connectorGeoField',
                options: {
                    axis: 'x'
                }
            }];
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[0].connectorGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[0].connectorGeoField('value', value.x)
            };
        },
        _toggle: function(enable) {
            return this.options.geoFields[0].connectorGeoField('toggle', enable);
        },
        _getStringValue: function() {
            return this.options.geoFields[0].connectorGeoField('value');
        }
    });

    $.widget('twcc.csvFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            units: {},
            options: {},
            geoFields: {},
            value: [],
            hint: '',
            wgs84: [],
            originalProjection: null
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'csvGeoField',
                    options: {
                        value: this._toString(this.options.value),
                        label: this.options.labels.csv
                    }
                },
                {
                    type: 'labelGeoField',
                    options: {
                        value: this.options.hint,
                        label: this.options.labels.l

                    }
                }
            ];
        },
        _getValue: function() {
            return this._fromString(this.options.geoFields[0].csvGeoField('value'));
        },
        _setValue: function(value) {
            return this._fromString(this.options.geoFields[0].csvGeoField('value', this._toString(value)));
        },
        _fromString: function(value) {
            var array = value.split("\n"),
                self = this;
            $.each(array, function(index, coordinatesString) {
                var subArray = coordinatesString.split(',');
                switch (self.options.originalProjection) {
                    case 'utm':
                        array[index] = {
                            h: subArray[0],
                            z: +subArray[1],
                            x: +subArray[2],
                            y: +subArray[3]
                        };
                        break;
                    case 'connector':
                        array[index] = {
                            x: subArray[0],
                            y: subArray[1]
                        };
                        break;
                    default:
                        array[index] = {
                            x: +subArray[0],
                            y: +subArray[1]
                        };
                }
            });
            return array;
        },
        _toString: function(value) {
            var array = [],
                self = this;
            if ($.type(value) !== 'array') {
                throw 'Invalid type';
            }
            $.each(value, function(index, obj) {
                var wgs84 = self.wgs84()[index];
                if (wgs84.error) {
                    array.push(obj.toString());
                } else {
                    if (self.options.originalProjection == 'utm') {
                        var hemisphere = obj.h || getHemisphere(wgs84.y),
                            zone = obj.z || _getUTMZone(wgs84.x);
                        array.push(hemisphere+','+zone+','+obj.x+','+obj.y);
                    } else {
                        array.push(obj.x+','+obj.y);
                    }
                }
            });
            return array.join("\n");
        },
        originalProjection: function(proj) {
            if (proj === undefined) {
                return this.options.originalProjection;
            } else {
                this.options.originalProjection = proj;
            }
        },
        hint: function(hint) {
            if (hint === undefined) {
                this.options.hint = this.options.geoFields[1].labelGeoField('value');
                return this.options.hint;
            } else {
                this.options.hint = hint;
                this.options.geoFields[1].labelGeoField('value', this.options.hint);
            }
        },
        _toggle: function(enable) {
            this.options.geoFields[0].csvGeoField('toggle', enable);
            return this.options.geoFields[1].labelGeoField('toggle', enable);
        },
        _getStringValue: function() {
            return this.options.hint + '\n' + this.options.geoFields[0].csvGeoField('value');
        }
    });

    $.widget('twcc.utmFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            lengthUnit: 'm',
            value: {},
            convergence: 0,
            wgs84: []
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'hemisphereGeoField',
                    options: {
                        label: this.options.labels.h,
                        options: this.options.options.h,
                        axis: 'h'
                    }
                },
                {
                    type: 'zoneGeoField',
                    options: {
                        label: this.options.labels.z,
                        options: this.options.options.z,
                        axis: 'z'
                    }
                },
                {
                    type: 'xyGeoField',
                    options: {
                        label: this.options.labels.x,
                        lengthUnit: this.options.lengthUnit,
                        axis: 'x'
                    }
                },
                {
                    type: 'xyGeoField',
                    options: {
                        label: this.options.labels.y,
                        lengthUnit: this.options.lengthUnit,
                        axis: 'y'
                    }
                },
                {
                    type: 'convergenceGeoField',
                    options: {
                        value: this.options.convergence,
                        label: this.options.labels.convergence,
                        icon: this._getConvergenceIcon()
                    }
                },
                {
                    type: 'lengthSwitchGeoField',
                    options: {
                        value: this.options.lengthUnit,
                        unit: this.options.options.u
                    }
                }
            ];
        },
        _setFieldsHandlers: function() {
            var self = this;
            this._super();
            this.element.bind('lengthswitchgeofield.update_display', function(event, response) {
                self.options.lengthUnit = self.unit(response.value);
            });
        },
        _getValue: function() {
            return {
                h: this.hemisphere(),
                z: this.zone(),
                x: this.options.geoFields[2].xyGeoField('value'),
                y: this.options.geoFields[3].xyGeoField('value')
            };
        },
        _setValue: function(value) {
            var wgs84 = this._getWgs84()[0];
            if (!value.h || !value.z) {
                $.extend(value, {
                    y: Math.abs(value.y),
                    h: getHemisphere(wgs84.y),
                    z: _getUTMZone(wgs84.x)
                });
            }
            return {
                h: this.hemisphere(value.h),
                z: this.zone(value.z),
                x: this.options.geoFields[2].xyGeoField('value', value.x),
                y: this.options.geoFields[3].xyGeoField('value', value.y)
            };
        },
        unit: function(lengthUnit) {
            if (lengthUnit === undefined) {
                this.options.lengthUnit = this.options.geoFields[2].xyGeoField('unit');
            } else {
                this.options.geoFields[2].xyGeoField('unit', lengthUnit);
                this.options.geoFields[3].xyGeoField('unit', lengthUnit);
                this.options.lengthUnit = this.options.geoFields[5].lengthSwitchGeoField('value', lengthUnit);
            }
            return this.options.lengthUnit;
        },
        convergence: function(value) {
            if (value === undefined) {
                this.options.convergence = this.options.geoFields[4].convergenceGeoField('value');
            } else {
                this.options.convergence = this.options.geoFields[4].convergenceGeoField('value', value);
            }
            return this.options.convergence;
        },
        zone: function(value) {
            if (value === undefined) {
                this.options.value.z = this.options.geoFields[1].zoneGeoField('value');
            } else {
                this.options.value.z = this.options.geoFields[1].zoneGeoField('value', value);
            }
            return this.options.value.z;
        },
        hemisphere: function(value) {
            if (value === undefined) {
                this.options.value.h = this.options.geoFields[0].hemisphereGeoField('value');
            } else {
                this.options.value.h = this.options.geoFields[0].hemisphereGeoField('value', value);
            }
            return this.options.value.h;
        },
        _toggle: function(enable) {
            this.options.geoFields[0].hemisphereGeoField('toggle', enable);
            this.options.geoFields[1].zoneGeoField('toggle', enable);
            this.options.geoFields[2].xyGeoField('toggle', enable);
            this.options.geoFields[3].xyGeoField('toggle', enable);
            return this.options.geoFields[5].lengthSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[2].xyGeoField('getStringValue')+', '+geoFields[3].xyGeoField('getStringValue')+' '+geoFields[1].zoneGeoField('value')+geoFields[0].hemisphereGeoField('value');
        }
    });

    $.widget('twcc.cartesianFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            lengthUnit: 'm',
            value: {},
            convergence: 0
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'xyGeoField',
                    options: {
                        label: this.options.labels.x,
                        lengthUnit: this.options.lengthUnit,
                        axis: 'x'
                    }
                },
                {
                    type: 'xyGeoField',
                    options: {
                        label: this.options.labels.y,
                        lengthUnit: this.options.lengthUnit,
                        axis: 'y'
                    }
                },
                {
                    type: 'convergenceGeoField',
                    options: {
                        value: this.options.convergence,
                        label: this.options.labels.convergence,
                        icon: this._getConvergenceIcon()
                    }
                },
                {
                    type: 'lengthSwitchGeoField',
                    options: {
                        value: this.options.lengthUnit,
                        unit: this.options.options.u
                    }
                }
            ];
        },
        _setFieldsHandlers: function() {
            var self = this;
            this._super();
            this.element.bind('lengthswitchgeofield.update_display', function(event, response) {
                self.options.lengthUnit = self.unit(response.value);
            });
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[0].xyGeoField('value'),
                y: this.options.geoFields[1].xyGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[0].xyGeoField('value', value.x),
                y: this.options.geoFields[1].xyGeoField('value', value.y)
            };
        },
        unit: function(lengthUnit) {
            if (lengthUnit === undefined) {
                this.options.lengthUnit = this.options.geoFields[0].xyGeoField('unit');
            } else {
                this.options.geoFields[0].xyGeoField('unit', lengthUnit);
                this.options.geoFields[1].xyGeoField('unit', lengthUnit);
                this.options.lengthUnit = this.options.geoFields[3].lengthSwitchGeoField('value', lengthUnit);
            }
            return this.options.lengthUnit;
        },
        convergence: function(value) {
            if (value === undefined) {
                this.options.convergence = this.options.geoFields[2].convergenceGeoField('value');
            } else {
                this.options.convergence = this.options.geoFields[2].convergenceGeoField('value', value);
            }
            return this.options.convergence;
        },
        _toggle: function(enable) {
            this.options.geoFields[0].xyGeoField('toggle', enable);
            this.options.geoFields[1].xyGeoField('toggle', enable);
            return this.options.geoFields[3].lengthSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[0].xyGeoField('getStringValue')+', '+geoFields[1].xyGeoField('getStringValue');
        }
    });

    $.widget('twcc.sphericalDdFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            value: {}
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'ddGeoField',
                    options: {
                        unit: this.options.units.y,
                        label: this.options.labels.y,
                        axis: 'y'
                    }
                },
                {
                    type: 'ddGeoField',
                    options: {
                        unit: this.options.units.x,
                        label: this.options.labels.x,
                        axis: 'x'
                    }
                },
                {
                    type: 'angleSwitchGeoField',
                    options: {
                        value: 'dd',
                        unit: this.options.options.o
                    }
                }
            ];
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[1].ddGeoField('value'),
                y: this.options.geoFields[0].ddGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[1].ddGeoField('value', value.x),
                y: this.options.geoFields[0].ddGeoField('value', value.y)
            };
        },
        _toggle: function(enable) {
            this.options.geoFields[0].ddGeoField('toggle', enable);
            this.options.geoFields[1].ddGeoField('toggle', enable);
            return this.options.geoFields[2].angleSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[0].ddGeoField('getStringValue')+', '+geoFields[1].ddGeoField('getStringValue');
        }
    });

    $.widget('twcc.sphericalDmFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            value: {}
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'dmGeoField',
                    options: {
                        label: this.options.labels.y,
                        options: this.options.options.y,
                        axis: 'y'
                    }
                },
                {
                    type: 'dmGeoField',
                    options: {
                        label: this.options.labels.x,
                        options: this.options.options.x,
                        axis: 'x'
                    }
                },
                {
                    type: 'angleSwitchGeoField',
                    options: {
                        value: 'dm',
                        unit: this.options.options.o
                    }
                }
            ];
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[1].dmGeoField('value'),
                y: this.options.geoFields[0].dmGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[1].dmGeoField('value', value.x),
                y: this.options.geoFields[0].dmGeoField('value', value.y)
            };
        },
        _toggle: function(enable) {
            this.options.geoFields[0].dmGeoField('toggle', enable);
            this.options.geoFields[1].dmGeoField('toggle', enable);
            return this.options.geoFields[2].angleSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[0].dmGeoField('getStringValue')+', '+geoFields[1].dmGeoField('getStringValue');
        }
    });

    $.widget('twcc.sphericalDmsFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            value: {}
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'dmsGeoField',
                    options: {
                        label: this.options.labels.y,
                        options: this.options.options.y,
                        axis: 'y'
                    }
                },
                {
                    type: 'dmsGeoField',
                    options: {
                        label: this.options.labels.x,
                        options: this.options.options.x,
                        axis: 'x'
                    }
                },
                {
                    type: 'angleSwitchGeoField',
                    options: {
                        value: 'dms',
                        unit: this.options.options.o
                    }
                }
            ];
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[1].dmsGeoField('value'),
                y: this.options.geoFields[0].dmsGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[1].dmsGeoField('value', value.x),
                y: this.options.geoFields[0].dmsGeoField('value', value.y)
            };
        },
        _toggle: function(enable) {
            this.options.geoFields[0].dmsGeoField('toggle', enable);
            this.options.geoFields[1].dmsGeoField('toggle', enable);
            return this.options.geoFields[2].angleSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[0].dmsGeoField('getStringValue')+', '+geoFields[1].dmsGeoField('getStringValue');
        }
    });
    //endregion

    //region Geo Field widgets
    $.widget('twcc.geoField', {
        options: {
            name: null,
            unit: null,
            label: null,
            readOnly: false,
            lengthUnit: 'm',
            glue: '_',
            wrapper: {
                field: ['<span>'],
                fields: ['<div>', {class: 'cell fields'}],
                label: ['<div>', {class: 'cell label'}],
                options: ['<div>', {class: 'fields'}]
            },
            attributes: {},
            fields: {},
            icon: ''
        },
        _create: function() {
            var $cell, fieldsOptions,
                self = this;
            $.each(this.options.attributes, function(key) {
                var params = {
                    disabled: self.options.readOnly,
                    readonly: self.options.readOnly
                };
                self.options.attributes[key] = $.extend(params, self.options.attributes[key]);
            });
            $cell = this._getEmptyFieldCell();
            fieldsOptions = this._getFieldsOptions();
            this._setDefaultsFieldsOptions(fieldsOptions);
            $.each(fieldsOptions, function(name, fieldOptions) {
                var $field = self._buildField(name, fieldOptions);
                self._setFieldHandlers($field);
                $field.append(self._getFieldSetUnit(name));
                $field.append('&nbsp;');
                $cell.append($field);
            });
            this._appendLabelCell();
            this.element.append($cell);
        },
        _getFieldSetUnit: function(name) {
            return this.options.unit[name];
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _clean: function(value, precision) {
            return this._superClean(value, precision);
        },
        _superClean: function(value, precision) {
            return isNaN(value) || value === null ? '' : App.math.round(value, precision || 0);
        },
        _buildField: function(name, fieldOptions) {
            this.options.fields[name] = $.apply(null, this.options.wrapper.field).field(fieldOptions);
            return this.options.fields[name];
        },
        _appendLabelCell: function() {
            var $label, $cell,
                id = this._getForId();
            if (id) {
                $label = $('<label>', {for: id}).html(this.options.icon + this.options.label);
            } else {
                $label = this.options.icon + this.options.label;
            }
            $cell = $.apply(null, this.options.wrapper.label).append($label);
            this.element.append($cell);
        },
        _getForId: function() {
            //Do not remove
        },
        _getEmptyFieldCell: function() {
            return $.apply(null, this.options.wrapper.fields);
        },
        _getFieldsOptions: function() {
            return {};
        },
        _setDefaultsFieldsOptions: function(obj) {
            var self = this;
            $.each(obj, function(key) {
                var params = {
                    name: self.options.name + self.options.glue + key,
                    attributes: self.options.attributes[key],
                    value: self._clean(self.options.value)
                };
                obj[key] = $.extend(params, obj[key]);
            });
        },
        value: function(value) {
            if (value === undefined) {
                this.options.value = this._constraint(this._getRawValue());
            } else {
                this.options.value = this._setValue(this._clean(value));
            }
            return this.options.value;
        },
        toggle: function(enable) {
            enable = enable === undefined ? this.options.readOnly : !!enable;
            this.options.readOnly = this._toggle(enable);
            return this.options.readOnly;
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        _toggle: function(enable) {
            var self = this;
            $.each(this.options.fields, function(name, $field) {
                var fieldOptions = self._getFieldsOptions()[name];
                self._toggleField($field, enable, fieldOptions);
            });
            return !enable;
        },
        _toggleField: function($field, enable) {
            $field.field('toggle', enable);
        },
        _getRawValue: function() {
            return this.options.value;
        },
        getStringValue: function() {
            return this.options.value;
        },
        _constraint: function(value) {
            return value;
        },
        _setValue: function(value) {
            this.options.value = value;
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            this._update();
        },
        _update: function() {
            this._destroy();
            this._create();
        },
        _destroy: function() {
            this.element.empty();
            return this._super();
        }
    });

    $.widget('twcc.ddGeoField', $.twcc.geoField, {
        options: {
            value: 0,
            attributes: {
                DD: {size: '20', class: 'width_5'}
            }
        },
        _getFieldsOptions: function() {
            return {
                DD: {
                    type: 'text'
                }
            };
        },
        _getForId: function() {
            return this.options.fields.DD.field('id');
        },
        _getRawValue: function() {
            return App.math.parseFloat(this.options.fields.DD.field('value'));
        },
        getStringValue: function() {
            return this.options.value + this._getFieldSetUnit('DD');
        },
        _setValue: function(value) {
            return this.options.fields.DD.field('value', value);
        },
        _constraint: function(value) {
            var max = this.options.axis === 'y' ? Math.atan(Math.sinh(Math.PI))*180/Math.PI : 180,
                min = -max;
            value = Math.max(value, min);
            value = Math.min(value, max);
            return value;
        },
        _clean: function(value) {
            return this._constraint(this._super(value, 15));
        }
    });

    $.widget('twcc.dmGeoField', $.twcc.ddGeoField, {
        options: {
            value: 0,
            options: {},
            attributes: {
                C: {size: '1'},
                D: {size: '4', class: 'width_1'},
                M: {size: '6', class: 'width_3'}
            }
        },
        _buildField: function(name, fieldOptions) {
            if (fieldOptions.type === 'option') {
                this.options.fields[name] = $.apply(null, this.options.wrapper.field).optionField(fieldOptions);
                return this.options.fields[name];
            } else {
                return this._superApply(arguments);
            }
        },
        _getFieldsOptions: function() {
            var value = this._clean(this.options.value);
            return {
                C: {
                    type: 'option',
                    value: value.C || '',
                    options: this.options.options
                },
                D: {
                    type: 'text',
                    value: this._superClean(value.D)
                },
                M: {
                    type: 'text',
                    value: this._superClean(value.M, 12)
                }
            };
        },
        _getForId: function() {
            return this.options.fields.D.field('id');
        },
        _getFieldSetUnit: function(name) {
            if (name != 'C') {
                return this._superApply(arguments);
            } else {
                return '';
            }
        },
        _getObjectValue: function() {
            return {
                C: this.options.fields.C.optionField('value'),
                D: App.math.parseFloat(this.options.fields.D.field('value')),
                M: App.math.parseFloat(this.options.fields.M.field('value'))
            };
        },
        value: function(value) {
            if (value === undefined) {
                this._clean(_dmToDd(this._getObjectValue()));
            } else {
                value = this._clean(value);
                this.options.fields.C.optionField('value', value.C || '');
                this.options.fields.D.field('value', this._superClean(value.D));
                this.options.fields.M.field('value', this._superClean(value.M, 12));
            }
            return this.options.value;
        },
        getStringValue: function() {
            var objectValue = this._getObjectValue();
            return objectValue.D + this._getFieldSetUnit('D') +
                objectValue.M + this._getFieldSetUnit('M') +
                objectValue.C;
        },
        _clean: function(ddValue) {
            this.options.value = this._constraint(ddValue);
            return _ddToDm(this.options.value, this.options.options);
        },
        _toggleField: function($field, enable, fieldOptions) {
            if (fieldOptions.type === 'option') {
                return $field.optionField('toggle', enable);
            } else {
                return this._superApply(arguments);
            }
        }
    });

    $.widget('twcc.dmsGeoField', $.twcc.dmGeoField, {
        options: {
            value: 0,
            options: {},
            attributes: {
                C: {size: '1'},
                D: {size: '4', class: 'width_1'},
                M: {size: '4', class: 'width_1'},
                S: {size: '6', class: 'width_3'}
            }
        },
        _getFieldsOptions: function() {
            var value = this._clean(this.options.value);
            return {
                C: {
                    type: 'option',
                    value: value.C || '',
                    options: this.options.options
                },
                D: {
                    type: 'text',
                    value: this._superClean(value.D)
                },
                M: {
                    type: 'text',
                    value: this._superClean(value.M)
                },
                S: {
                    type: 'text',
                    value: this._superClean(value.S, 12)
                }
            };
        },
        _getObjectValue: function() {
            return {
                C: this.options.fields.C.optionField('value'),
                D: App.math.parseFloat(this.options.fields.D.field('value')),
                M: App.math.parseFloat(this.options.fields.M.field('value')),
                S: App.math.parseFloat(this.options.fields.S.field('value'))
            };
        },
        value: function(value) {
            if (value === undefined) {
                this._clean(_dmsToDd(this._getObjectValue()));
            } else {
                value = this._clean(value);
                this.options.fields.C.optionField('value', value.C || '');
                this.options.fields.D.field('value', this._superClean(value.D));
                this.options.fields.M.field('value', this._superClean(value.M));
                this.options.fields.S.field('value', this._superClean(value.S, 12));
            }
            return this.options.value;
        },
        getStringValue: function() {
            var objectValue = this._getObjectValue();
            return objectValue.D + this._getFieldSetUnit('D') +
                objectValue.M + this._getFieldSetUnit('M') +
                objectValue.S + this._getFieldSetUnit('S') +
                objectValue.C;
        },
        _clean: function(ddValue) {
            this.options.value = this._constraint(ddValue);
            return _ddToDms(this.options.value, this.options.options);
        }
    });

    $.widget('twcc.switchGeoField', $.twcc.geoField, {
        _clean: function(value) {
            return this._constraint(value);
        },
        _setFieldHandlers: function($field) {
            var self = this;
            $field.find(':first-child').click(function(event) {
                self._trigger('.update_display', event, {value:self.value()});
            });
        },
        _appendLabelCell: function() {
            //Do not remove
        },
        _getEmptyFieldCell: function() {
            return $.apply(null, this.options.wrapper.options);
        },
        _setDefaultsFieldsOptions: function() {
            //Do not remove
        },
        _getRawValue: function() {
            return $('input:radio:checked', this.element).val();
        },
        _setValue: function(value) {
            this.element.find('input:radio[value="'+value+'"]').prop('checked', true);
            return value;
        },
        _getForId: function(name) {
            return this.options.fields[name].field('id');
        },
        _getFieldSetUnit: function(name) {
            var unit = this._superApply(arguments),
                id = this._getForId(name);
            return $('<label>', {for: id}).append(unit);
        }
    });

    $.widget('twcc.angleSwitchGeoField', $.twcc.switchGeoField, {
        options: {
            value: 'dd'
        },
        _getFieldsOptions: function() {
            this.options.value = this._clean(this.options.value);
            var name = this.options.name + '_DMS_DM_DD',
                value = this.options.value,
                isDD = value === 'dd',
                isDm = value === 'dm',
                isDms = !isDD && !isDm;
            return {
                _DMS: {
                    name: name,
                    type: 'radio',
                    value: 'dms',
                    attributes: {
                        checked: isDms
                    }
                },
                _DM: {
                    name: name,
                    type: 'radio',
                    value: 'dm',
                    attributes: {
                        checked: isDm
                    }
                },
                _DD: {
                    name: name,
                    type: 'radio',
                    value: 'dd',
                    attributes: {
                        checked: isDD
                    }
                }
            };
        },
        _constraint: function(value) {
            return $.inArray(value, ['dms', 'dm', 'dd']) < 0 ? 'dms' : value;
        }
    });

    $.widget('twcc.lengthSwitchGeoField', $.twcc.switchGeoField, {
        options: {
            value: 'm'
        },
        _getFieldsOptions: function() {
            this.options.value = this._clean(this.options.value);
            var name = this.options.name + '_M_KM_F',
                value = this.options.value,
                isKm = value === 'km',
                isFt = value === 'us-ft',
                isM = !isKm && !isFt;
            return {
                _M: {
                    name: name,
                    type: 'radio',
                    value: 'm',
                    attributes: {
                        checked: isM
                    }
                },
                _KM: {
                    name: name,
                    type: 'radio',
                    value: 'km',
                    attributes: {
                        checked: isKm
                    }
                },
                _F: {
                    name: name,
                    type: 'radio',
                    value: 'us-ft',
                    attributes: {
                        checked: isFt
                    }
                }
            };
        },
        _constraint: function(value) {
            return $.inArray(value, ['m', 'km', 'us-ft']) < 0 ? 'm' : value;
        }
    });

    $.widget('twcc.xyGeoField', $.twcc.geoField, {
        options: {
            value: 0,
            attributes: {
                XY: {size: '20', class: 'width_4'}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                XY: {
                    type: 'text'
                }
            };
        },
        _getForId: function() {
            return this.options.fields.XY.field('id');
        },
        _getFieldSetUnit: function() {
            return this.options.unit.XY[this.options.lengthUnit];
        },
        _getRawValue: function() {
            return _toMeter(this.options.fields.XY.field('value'), this.options.lengthUnit);
        },
        getStringValue: function() {
            return this.options.fields.XY.field('value') + this.options.lengthUnit;
        },
        _setValue: function(value) {
            return _toMeter(this.options.fields.XY.field('value', value), this.options.lengthUnit);
        },
        _clean: function(value) {
            return this._super(_fromMeter(value, this.options.lengthUnit), this.options.lengthUnit == 'm' ? 2 : 5);
        },
        unit: function(lengthUnit) {
            if (lengthUnit !== undefined) {
                this.value();
                this.options.lengthUnit = this._cleanUnit(lengthUnit);
                this._update();
            }
            return this.options.lengthUnit;
        },
        _cleanUnit: function(value) {
            return $.inArray(value, ['m', 'km', 'us-ft']) < 0 ? 'm' : value;
        }
    });

    $.widget('twcc.zoneGeoField', $.twcc.geoField, {
        options: {
            value: 31,
            attributes: {
                Z: {size: '5', class: 'width_2'}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                Z: {
                    type: 'text'
                }
            };
        },
        _getForId: function() {
            return this.options.fields.Z.field('id');
        },
        _getRawValue: function() {
            return parseInt(this.options.fields.Z.field('value'));
        },
        _setValue: function(value) {
            return this.options.fields.Z.field('value', value);
        },
        _constraint: function(value) {
            var min = 0;
            value = Math.max(value, min);
            return value;
        },
        _clean: function(value) {
            return this._constraint(this._super(value));
        }
    });

    $.widget('twcc.hemisphereGeoField', $.twcc.geoField, {
        options: {
            value: 'n',
            attributes: {
                E: {size: '1'}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                E: {
                    type: 'option',
                    options: this.options.options
                }
            };
        },
        _getForId: function() {
            return this.options.fields.E.optionField('id');
        },
        _getFieldSetUnit: function() {
            //Do not remove
        },
        _buildField: function(name, fieldOptions) {
            this.options.fields[name] = $.apply(null, this.options.wrapper.field).optionField(fieldOptions);
            return this.options.fields[name];
        },
        _clean: function(value) {
            return this._constraint(value || 'n');
        },
        _getRawValue: function() {
            return this.options.fields.E.optionField('value');
        },
        _constraint: function(value) {
            return $.inArray(value, ['n', 's']) < 0 ? 'n' : value;
        },
        _setValue: function(value) {
            return this.options.fields.E.optionField('value', value);
        },
        _toggleField: function($field, enable) {
            return $field.optionField('toggle', enable);
        }
    });

    $.widget('twcc.csvGeoField', $.twcc.geoField, {
        options: {
            value: '',
            attributes: {
                CSV: {rows: '5', wrap: 'off'}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                CSV: {
                    type: 'textarea'
                }
            };
        },
        _getFieldSetUnit: function() {
            return '';
        },
        _getForId: function() {
            return this.options.fields.CSV.textareaField('id');
        },
        _buildField: function(name, fieldOptions) {
            this.options.fields[name] = $.apply(null, this.options.wrapper.field).textareaField(fieldOptions);
            return this.options.fields[name];
        },
        _clean: function(value) {
            return this._constraint(value || '');
        },
        _getRawValue: function() {
            return this.options.fields.CSV.textareaField('value');
        },
        _setValue: function(value) {
            return this.options.fields.CSV.textareaField('value', value);
        },
        _toggleField: function($field, enable) {
            return $field.textareaField('toggle', enable);
        }
    });

    $.widget('twcc.convergenceGeoField', $.twcc.geoField, {
        options: {
            value: 0,
            attributes: {
                CONVERGENCE: {size: '10', class: 'width_4', readonly: true}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                CONVERGENCE: {
                    type: 'text'
                }
            };
        },
        _getForId: function() {
            return this.options.fields.CONVERGENCE.field('id');
        },
        _getRawValue: function() {
            return this.options.fields.CONVERGENCE.field('value');
        },
        _constraint: function(value) {
            var max = 360,
                min = -max;
            value = Math.max(value, min);
            value = Math.min(value, max);
            return value;
        },
        _setValue: function(value) {
            return this.options.fields.CONVERGENCE.field('value', value);
        },
        _clean: function(value) {
            return this._constraint(this._super(value, 4));
        }
    });

    $.widget('twcc.connectorGeoField', $.twcc.geoField, {
        options: {
            value: ''
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                XX: {type: 'text'}
            };
        },
        _appendLabelCell: function() {
            //Do not remove
        },
        _getRawValue: function() {
            return this.options.fields.XX.field('value');
        },
        _setValue: function(value) {
            return this.options.fields.XX.field('value', value);
        },
        _constraint: function(value) {
            return value;
        },
        _clean: function(value) {
            return this._constraint(value);
        }
    });

    $.widget('twcc.labelGeoField', $.twcc.geoField, {
        options: {
            value: ''
        },
        _create: function() {
            this._super();
            this.options.fields.L.text(this.options.value);
        },
        _buildField: function(name, fieldOptions) {
            this.options.fields[name] = fieldOptions;
            return this.options.fields[name];
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                L: $('<span>')
            };
        },
        _getFieldSetUnit: function() {
            return '';
        },
        _getRawValue: function() {
            return this.options.fields.L.text();
        },
        _constraint: function(value) {
            return value;
        },
        _setValue: function(value) {
            this.options.fields.L.text(value);
            return value;
        },
        _clean: function(value) {
            return this._constraint(value);
        },
        _toggleField: function() {
            return this.options.readonly;
        }
    });
    //endregion

    //region Field widgets
    $.widget('twcc.field', {
        options: {
            type: null,
            value: null,
            name: null,
            glue: '_id_',
            attributes: {},
            readOnly: false
        },
        _create: function() {
            this.options.attributes = $.extend({
                val: this.options.value,
                id: this.options.name + this.options.glue + Math.floor(Math.random()*10001),
                name: this.options.name,
                disabled: this.options.readOnly,
                readonly: this.options.readOnly
            }, this.options.attributes);
            this._setTag();
        },
        _setTag: function() {
            $.extend(this.options.attributes, {type: this.options.type});
            this.element.tag({
                name: 'input',
                attributes: this.options.attributes
            });
        },
        value: function(value) {
            if (value === undefined) {
                this.options.value = this.element.tag('value');
            } else {
                this.options.value = this.element.tag('value', value);
            }
            return this.options.value;
        },
        toggle: function(enable) {
            enable = enable === undefined ? this.options.readOnly : !!enable;
            this.options.readOnly = this._toggle(enable);
            return this.options.readOnly;
        },
        _toggle: function(enable) {
            return this.element.tag('toggle', enable);
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        id: function() {
            return this.options.attributes.id;
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            this._update();
        },
        _update: function() {
            this._destroy();
            this._create();
        },
        _destroy: function() {
            this.element.empty();
            return this._super();
        }
    });

    $.widget('twcc.textareaField', $.twcc.field, {
        options: {
            type: 'textarea'
        },
        _setTag: function() {
            this.element.tag({
                name: 'textarea',
                attributes: this.options.attributes
            });
        }
    });

    $.widget('twcc.optionField', $.twcc.field, {
        options: {
            type: 'option',
            options: {}
        },
        _setTag: function() {
            this.element.selectTag({
                attributes: this.options.attributes,
                options: this.options.options
            });
        },
        value: function(value) {
            if (value === undefined) {
                this.options.value = this.element.selectTag('value');
            } else {
                this.options.value = this.element.selectTag('value', value);
            }
            return this.options.value;
        },
        _toggle: function(enable) {
            return this.element.selectTag('toggle', enable);
        }
    });
    //endregion

    //region Tag widgets
    $.widget('twcc.tag', {
        options: {
            name: null,
            attributes : {},
            readOnly: false
        },
        _$elt: null,
        _create: function() {
            var checked;
            if (this.options.attributes.val) {
                this.options.attributes.val = this._clean(this.options.attributes.val);
            }
            if (this.options.attributes.hasOwnProperty('checked')) {
                checked = this.options.attributes.checked;
                delete this.options.attributes.checked;
            }
            this._$elt = $('<'+this.options.name+'>', this.options.attributes);
            if (checked !== undefined) {
                this._$elt.prop('checked', checked);
            }
            this._appendChildren();
            this.value(this.options.attributes.val);
            this.element.append(this._$elt);
        },
        value: function(value) {
            if (value === undefined) {
                this.options.attributes.val = this._$elt.val();
            } else {
                this.options.attributes.val = this._clean(value);
                this._$elt.val(this.options.attributes.val);
            }
            return this.options.attributes.val;
        },
        toggle: function(enable) {
            var disable = enable === undefined ? this.options.readOnly : !enable;
            this.options.readOnly = this._toggle(disable);
            return this.options.readOnly;
        },
        _toggle: function(disable) {
            this._$elt
                .prop('disabled', disable)
                .prop('readonly', disable);
            return disable;
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        _clean: function(value) {
            // Prevent scientific notation due to the Number.toString() method
            if (typeof(value) === 'number' && value.toString().split('e').length > 1) {
                value =  App.math.round(value);
            }
            return value;
        },
        _appendChildren: function() {
            //do not remove
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            this._update();
        },
        _update: function() {
            this._destroy();
            this._create();
        },
        _destroy: function() {
            this._$elt.remove();
            return this._super();
        }
    });

    $.widget('twcc.selectTag', $.twcc.tag, {
        options: {
            name: 'select',
            options: {}
        },
        _$elt: null,
        _appendChildren: function() {
            var self = this;
            $.each(this.options.options, function(optVal, optText) {
                self._$elt.append($('<option>', {
                    value: optVal,
                    text: optText
                }));
            });
        }
    });
    //endregion
})(jQuery, proj4, TWCCHistory, App);
;/*
	cof2Obj.js
	Converts the WMM.COF text to a JSON object usable by geoMagFactory().
*/

function cof2Obj(cof) {
	'use strict';
	var modelLines = cof.split('\n'),
		wmm = [],
		i, vals, epoch, model, modelDate;
	for (i in modelLines) {
		if (modelLines.hasOwnProperty(i)) {
			vals = modelLines[i].replace(/^\s+|\s+$/g, "").split(/\s+/);
			if (vals.length === 3) {
				epoch = parseFloat(vals[0]);
				model = vals[1];
				modelDate = vals[2];
			} else if (vals.length === 6) {
				wmm.push({
					n: parseInt(vals[0], 10),
					m: parseInt(vals[1], 10),
					gnm: parseFloat(vals[2]),
					hnm: parseFloat(vals[3]),
					dgnm: parseFloat(vals[4]),
					dhnm: parseFloat(vals[5])
				});
			}
		}
	}

	return {epoch: epoch, model: model, modelDate: modelDate, wmm: wmm};
}
;/*	2012-03-26
    Copyright 2012 Christopher Weiss (cmweiss@gmail.com)

    Suggestions for improvements are appreciated.

    Adapted from the geomagc software and World Magnetic Model of the NOAA
    Satellite and Information Service, National Geophysical Data Center
    http://www.ngdc.noaa.gov/geomag/WMM/DoDWMM.shtml

    geoMagFactory() requires a world magnetic model (WMM) object. The helper
    function cof2Obj(), available in cof2Obj.js, takes the text of WMM.COF and
    returns an object suitable for geoMagFactory(). A syncronous XMLHttpRequest
    to fetch the WMM.COF is recommended in a web environment. The helper
    function syncXHR(), available in syncXHR.js, takes the url of the WMM.COF
    file and returns the WMM.COF file as text.

    Usage:
    geoMagFactory(wmm) returns a function which can compute the Earth's
    magnetic field.
    The returned function requires two arguments, latitude and longitude (in
    decimal degrees), and, optionally, altitude in feet (default is 0), and
    a date object (default is the current system time).

    var cof = syncXHR('http://host/path/WMM.COF'),
	    wmm = cof2Obj(cof),
	    geoMag = geoMagFactory(wmm),
	    latitude = 40.0,                // decimal degrees (north is positive)
	    longitude = -80.0,              // decimal degrees (east is positive)
	    altitude = 0,                   // feet (optional, default is 0)
	    time = new Date(2012, 4, 20),   // (optional, default is the current
                                        // system time)
	    myGeoMag = geoMag(latitude, longitude, altitude, time),
	    magneticVariation = myGeoMag.dec,   // Geomagnetic declination
                                            // (variation) in decimal degrees
                                            // -- east is positive
	    magneticDip = myGeoMag.dip, // Geomagnetic dip in decimal degrees
                                    // (down is positive)
	    magneticFieldIntensity = myGeoMag.ti,   // Total intensity of the
                                                // geomagnetic field in
                                                // nanoteslas
	    magneticBH = myGeoMag.bh,   // Horizontal intensity of the geomagnetic
                                    // field in nT
	    magneticBX = myGeoMag.bx,   // North component of the geomagnetic field
                                    // in nT
	    magneticBY = myGeoMag.by,   // East component of the geomagnetic field
                                    // in nT
	    magneticBZ = myGeoMag.bz,   // Vertical component of the geomagnetic
                                    // field (down is positive)
	    lat = myGeoMag.lat, // input latitude
	    lon = myGeoMag.lon; // input longitude
*/

/*jslint plusplus: true */
function geoMagFactory(wmm) {
	'use strict';
	function rad2deg(rad) {
		return rad * (180 / Math.PI);
	}
	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}

	var i, model, epoch = wmm.epoch,
		z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		maxord = 12,
		tc = [z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice()],
		sp = z.slice(),
		cp = z.slice(),
		pp = z.slice(),
		p = [z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice()],
		dp = [z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice()],
		a = 6378.137,
		b = 6356.7523142,
		re = 6371.2,
		a2 = a * a,
		b2 = b * b,
		c2 = a2 - b2,
		a4 = a2 * a2,
		b4 = b2 * b2,
		c4 = a4 - b4,
		c = [z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice()],
		cd = [z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice()],
		n, m,
		snorm = [z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice(), z.slice()],
		j,
		k = [z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice(), z.slice(), z.slice(), z.slice(), z.slice(), z.slice(),
			z.slice()],
		flnmj,
		fn = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		fm = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		D2;

	tc[0][0] = 0;
	sp[0] = 0.0;
	cp[0] = 1.0;
	pp[0] = 1.0;
	p[0][0] = 1;

	model = wmm.wmm;
	for (i in model) {
		if (model.hasOwnProperty(i)) {
			if (model[i].m <= model[i].n) {
				c[model[i].m][model[i].n] = model[i].gnm;
				cd[model[i].m][model[i].n] = model[i].dgnm;
				if (model[i].m !== 0) {
					c[model[i].n][model[i].m - 1] = model[i].hnm;
					cd[model[i].n][model[i].m - 1] = model[i].dhnm;
				}
			}
		}
	}
	wmm = null;
	model = null;

	/* CONVERT SCHMIDT NORMALIZED GAUSS COEFFICIENTS TO UNNORMALIZED */
	snorm[0][0] = 1;

	for (n = 1; n <= maxord; n++) {
		snorm[0][n] = snorm[0][n - 1] * (2 * n - 1) / n;
		j = 2;

		for (m = 0, D2 = (n - m + 1); D2 > 0; D2--, m++) {
			k[m][n] = (((n - 1) * (n - 1)) - (m * m)) /
				((2 * n - 1) * (2 * n - 3));
			if (m > 0) {
				flnmj = ((n - m + 1) * j) / (n + m);
				snorm[m][n] = snorm[m - 1][n] * Math.sqrt(flnmj);
				j = 1;
				c[n][m - 1] = snorm[m][n] * c[n][m - 1];
				cd[n][m - 1] = snorm[m][n] * cd[n][m - 1];
			}
			c[m][n] = snorm[m][n] * c[m][n];
			cd[m][n] = snorm[m][n] * cd[m][n];
		}
	}
	k[1][1] = 0.0;

	return function (glat, glon, h, date) {
		function decimalDate(date) {
			date = date || new Date();
			var year = date.getFullYear(),
				daysInYear = 365 +
					(((year % 400 === 0) || (year % 4 === 0 && (year % 100 > 0))) ? 1 : 0),
				msInYear = daysInYear * 24 * 60 * 60 * 1000;

			return date.getFullYear() + (date.valueOf() - (new Date(year, 0)).valueOf()) / msInYear;
		}

		var alt = (h / 3280.8399) || 0, // convert h (in feet) to kilometers or set default of 0
			time = decimalDate(date),
			dt = time - epoch,
			rlat = deg2rad(glat),
			rlon = deg2rad(glon),
			srlon = Math.sin(rlon),
			srlat = Math.sin(rlat),
			crlon = Math.cos(rlon),
			crlat = Math.cos(rlat),
			srlat2 = srlat * srlat,
			crlat2 = crlat * crlat,
			q,
			q1,
			q2,
			ct,
			st,
			r2,
			r,
			d,
			ca,
			sa,
			aor,
			ar,
			br = 0.0,
			bt = 0.0,
			bp = 0.0,
			bpp = 0.0,
			par,
			temp1,
			temp2,
			parp,
			D4,
			bx,
			by,
			bz,
			bh,
			ti,
			dec,
			dip,
			gv;
		sp[1] = srlon;
		cp[1] = crlon;

		/* CONVERT FROM GEODETIC COORDS. TO SPHERICAL COORDS. */
		q = Math.sqrt(a2 - c2 * srlat2);
		q1 = alt * q;
		q2 = ((q1 + a2) / (q1 + b2)) * ((q1 + a2) / (q1 + b2));
		ct = srlat / Math.sqrt(q2 * crlat2 + srlat2);
		st = Math.sqrt(1.0 - (ct * ct));
		r2 = (alt * alt) + 2.0 * q1 + (a4 - c4 * srlat2) / (q * q);
		r = Math.sqrt(r2);
		d = Math.sqrt(a2 * crlat2 + b2 * srlat2);
		ca = (alt + d) / r;
		sa = c2 * crlat * srlat / (r * d);

		for (m = 2; m <= maxord; m++) {
			sp[m] = sp[1] * cp[m - 1] + cp[1] * sp[m - 1];
			cp[m] = cp[1] * cp[m - 1] - sp[1] * sp[m - 1];
		}

		aor = re / r;
		ar = aor * aor;

		for (n = 1; n <= maxord; n++) {
			ar = ar * aor;
			for (m = 0, D4 = (n + m + 1); D4 > 0; D4--, m++) {

		/*
				COMPUTE UNNORMALIZED ASSOCIATED LEGENDRE POLYNOMIALS
				AND DERIVATIVES VIA RECURSION RELATIONS
		*/
				if (n === m) {
					p[m][n] = st * p[m - 1][n - 1];
					dp[m][n] = st * dp[m - 1][n - 1] + ct *
						p[m - 1][n - 1];
				} else if (n === 1 && m === 0) {
					p[m][n] = ct * p[m][n - 1];
					dp[m][n] = ct * dp[m][n - 1] - st * p[m][n - 1];
				} else if (n > 1 && n !== m) {
					if (m > n - 2) { p[m][n - 2] = 0; }
					if (m > n - 2) { dp[m][n - 2] = 0.0; }
					p[m][n] = ct * p[m][n - 1] - k[m][n] * p[m][n - 2];
					dp[m][n] = ct * dp[m][n - 1] - st * p[m][n - 1] -
						k[m][n] * dp[m][n - 2];
				}

		/*
				TIME ADJUST THE GAUSS COEFFICIENTS
		*/

				tc[m][n] = c[m][n] + dt * cd[m][n];
				if (m !== 0) {
					tc[n][m - 1] = c[n][m - 1] + dt * cd[n][m - 1];
				}

		/*
				ACCUMULATE TERMS OF THE SPHERICAL HARMONIC EXPANSIONS
		*/
				par = ar * p[m][n];
				if (m === 0) {
					temp1 = tc[m][n] * cp[m];
					temp2 = tc[m][n] * sp[m];
				} else {
					temp1 = tc[m][n] * cp[m] + tc[n][m - 1] * sp[m];
					temp2 = tc[m][n] * sp[m] - tc[n][m - 1] * cp[m];
				}
				bt = bt - ar * temp1 * dp[m][n];
				bp += (fm[m] * temp2 * par);
				br += (fn[n] * temp1 * par);
		/*
					SPECIAL CASE:  NORTH/SOUTH GEOGRAPHIC POLES
		*/
				if (st === 0.0 && m === 1) {
					if (n === 1) {
						pp[n] = pp[n - 1];
					} else {
						pp[n] = ct * pp[n - 1] - k[m][n] * pp[n - 2];
					}
					parp = ar * pp[n];
					bpp += (fm[m] * temp2 * parp);
				}
			}
		}

		bp = (st === 0.0 ? bpp : bp / st);
		/*
			ROTATE MAGNETIC VECTOR COMPONENTS FROM SPHERICAL TO
			GEODETIC COORDINATES
		*/
		bx = -bt * ca - br * sa;
		by = bp;
		bz = bt * sa - br * ca;

		/*
			COMPUTE DECLINATION (DEC), INCLINATION (DIP) AND
			TOTAL INTENSITY (TI)
		*/
		bh = Math.sqrt((bx * bx) + (by * by));
		ti = Math.sqrt((bh * bh) + (bz * bz));
		dec = rad2deg(Math.atan2(by, bx));
		dip = rad2deg(Math.atan2(bz, bh));

		/*
			COMPUTE MAGNETIC GRID VARIATION IF THE CURRENT
			GEODETIC POSITION IS IN THE ARCTIC OR ANTARCTIC
			(I.E. GLAT > +55 DEGREES OR GLAT < -55 DEGREES)
			OTHERWISE, SET MAGNETIC GRID VARIATION TO -999.0
		*/

		if (Math.abs(glat) >= 55.0) {
			if (glat > 0.0 && glon >= 0.0) {
				gv = dec - glon;
			} else if (glat > 0.0 && glon < 0.0) {
				gv = dec + Math.abs(glon);
			} else if (glat < 0.0 && glon >= 0.0) {
				gv = dec + glon;
			} else if (glat < 0.0 && glon < 0.0) {
				gv = dec - Math.abs(glon);
			}
			if (gv > 180.0) {
				gv -= 360.0;
			} else if (gv < -180.0) { gv += 360.0; }
		}

		return {dec: dec, dip: dip, ti: ti, bh: bh, bx: bx, by: by, bz: bz, lat: glat, lon: glon, gv: gv, epoch: epoch};
	};
}
;/**
 * @name polylineEdit for Google Maps V3 API
 * @version 1.0.1 [January 29, 2011]
 * @author: ryshkin@gmail.com
 * @fileoverview <b>Author:</b> ryshkin@gmail.com<br/> <b>Licence:</b>
 *               Licensed under <a
 *               href="http://opensource.org/licenses/mit-license.php">MIT</a>
 *               license.<br/> This library Extends the functionality of a
 *               class google.maps.Polyline by methods runEdit() and stopEdit()<br/>
 *               Enjoy guys:)<br/>
 *               Special thanks <code>Jan Pieter Waagmeester jieter@jpwaag.com</code> for the idea of using the library google.maps.geometry , which performs spherical linear interpolation between the two locations.
 */
/**
 * @name google
 * @class The fundamental namespace for Google APIs 
 */
/**
 * @name google.maps
 * @class The fundamental namespace for Google Maps V3 API 
 */
/**
 * @name google.maps.Polyline
 * @class Extends standart class google.maps.Polyline by methods runEdit() and
 *        stopEdit()
 */
if (typeof(google.maps.Polyline.prototype.runEdit) === "undefined") {
  /**
   * Starts editing the polyline. Optional parameter <code>flag</code>
   * indicates the use of ghost markers in the middle of each segment. By
   * default, the <code>flag</code> is true.
   * 
   * @param {}
   *            flag - (true) include additional points in the middle of each
   *            segment
   */
  google.maps.Polyline.prototype.runEdit = function (flag, callback) { //CRO 2011-02-15 adding callback function
    if (!flag) {
      flag = true;
    }
    var self = this;
    if (flag) {
      var imgGhostVertex = new google.maps.MarkerImage(
                'css/ghostVertex.png', new google.maps.Size(11, 11),
                new google.maps.Point(0, 0), new google.maps.Point(6, 6));
      var imgGhostVertexOver = new google.maps.MarkerImage(
                'css/ghostVertexOver.png', new google.maps.Size(11, 11),
                new google.maps.Point(0, 0), new google.maps.Point(6, 6));
      var ghostPath = new google.maps.Polyline({
        map : this.getMap(),
        strokeColor : this.strokeColor,
        strokeOpacity : 0.2,
        strokeWeight : this.strokeWeight
      });
      var vertexGhostMouseOver = function () {
        this.setIcon(imgGhostVertexOver);
      };
      var vertexGhostMouseOut = function () {
        this.setIcon(imgGhostVertex);
      };
//BO CRO 2014-10-18
      var triggerDrag = function () {
        $(this.getMap().getDiv()).trigger('polylineedit');
      };
//EO CRO 2014-10-18
      var vertexGhostDrag = function () {
        if (ghostPath.getPath().getLength() === 0) {
          ghostPath.setPath([this.marker.getPosition(), this.getPosition(), self.getPath().getAt(this.marker.inex + 1)]);
        }  
        ghostPath.getPath().setAt(1, this.getPosition());
      };
      var moveGhostMarkers = function (marker) {
        var Vertex = self.getPath().getAt(marker.inex);
        var prevVertex = self.getPath().getAt(marker.inex - 1);
        if ((typeof(Vertex) !== "undefined") && (typeof(Vertex.ghostMarker) !== "undefined")) {
          if (typeof(google.maps.geometry) === "undefined") {
            Vertex.ghostMarker.setPosition(new google.maps.LatLng(Vertex.lat() + 0.5 * (self.getPath().getAt(marker.inex + 1).lat() - Vertex.lat()), Vertex.lng() + 0.5 * (self.getPath().getAt(marker.inex + 1).lng() - Vertex.lng())));
          } else {
            Vertex.ghostMarker.setPosition(google.maps.geometry.spherical.interpolate(Vertex, self.getPath().getAt(marker.inex + 1), 0.5));
          }
        }
        if ((typeof(prevVertex) !== "undefined") && (typeof(prevVertex.ghostMarker) !== "undefined")) {
          if (typeof(google.maps.geometry) === "undefined") {
            prevVertex.ghostMarker.setPosition(new google.maps.LatLng(prevVertex.lat() + 0.5 * (marker.getPosition().lat() - prevVertex.lat()), prevVertex.lng() + 0.5 * (marker.getPosition().lng() - prevVertex.lng())));
          } else {
            prevVertex.ghostMarker.setPosition(google.maps.geometry.spherical.interpolate(prevVertex, marker.getPosition(), 0.5));
          }
        }
      };
      var vertexGhostDragEnd = function () {
        ghostPath.getPath().forEach(function () {
          ghostPath.getPath().pop();
        });
        self.getPath().insertAt(this.marker.inex + 1, this.getPosition());
        createMarkerVertex(self.getPath().getAt(this.marker.inex + 1)).inex = this.marker.inex + 1;
				moveGhostMarkers(this.marker);
        createGhostMarkerVertex(self.getPath().getAt(this.marker.inex + 1));
        self.getPath().forEach(function (vertex, inex) {
          if (vertex.marker) {
            vertex.marker.inex = inex;
          }
        });
//BO CRO 2011-02-15
				if (typeof(callback) === "function") callback(self);
//EO CRO 2011-02-15
      };
      var createGhostMarkerVertex = function (point) {
        if (point.marker.inex < self.getPath().getLength() - 1) {
          var markerGhostVertex = new google.maps.Marker({
            position : (typeof(google.maps.geometry) === "undefined") ? new google.maps.LatLng(
                                                                          point.lat() + 0.5 * (self.getPath().getAt(point.marker.inex + 1).lat() - point.lat()),
                                                                          point.lng() + 0.5 * (self.getPath().getAt(point.marker.inex + 1).lng() - point.lng()))
                       :google.maps.geometry.spherical.interpolate(point, self.getPath().getAt(point.marker.inex + 1), 0.5),
            map : self.getMap(),
            icon : imgGhostVertex,
            draggable : true,
            raiseOnDrag : false
          });
          google.maps.event.addListener(markerGhostVertex, "mouseover", vertexGhostMouseOver);
          google.maps.event.addListener(markerGhostVertex, "mouseout", vertexGhostMouseOut);
          google.maps.event.addListener(markerGhostVertex, "drag", vertexGhostDrag);
//BO CRO 2014-10-18
          google.maps.event.addListener(markerGhostVertex, "drag", triggerDrag);
//EO CRO 2014-10-18
          google.maps.event.addListener(markerGhostVertex, "dragend", vertexGhostDragEnd);
          point.ghostMarker = markerGhostVertex;
          markerGhostVertex.marker = point.marker;
          return markerGhostVertex;
        }
        return null;
      };
    }
    var imgVertex = new google.maps.MarkerImage('css/vertex.png',
      new google.maps.Size(11, 11), new google.maps.Point(0, 0),
      new google.maps.Point(6, 6));
    var imgVertexOver = new google.maps.MarkerImage('css/vertexOver.png',
      new google.maps.Size(11, 11), new google.maps.Point(0, 0),
      new google.maps.Point(6, 6));
    var vertexMouseOver = function () {
      this.setIcon(imgVertexOver);
    };
    var vertexMouseOut = function () {
      this.setIcon(imgVertex);
    };
    var vertexDrag = function () {
      var movedVertex = this.getPosition();
      movedVertex.marker = this;
      movedVertex.ghostMarker = self.getPath().getAt(this.inex).ghostMarker;
      self.getPath().setAt(this.inex, movedVertex);
      if (flag) {
        moveGhostMarkers(this);
      }
		};
    var vertexRightClick = function () {
      if (flag) {
        var Vertex = self.getPath().getAt(this.inex);
        var prevVertex = self.getPath().getAt(this.inex - 1);
        if (typeof(Vertex.ghostMarker) !== "undefined") {
          Vertex.ghostMarker.setMap(null);
        }
        self.getPath().removeAt(this.inex);
        if (typeof(prevVertex) !== "undefined") {
          if (this.inex < self.getPath().getLength()) {
            moveGhostMarkers(prevVertex.marker);
          }
          else {
            prevVertex.ghostMarker.setMap(null);
            prevVertex.ghostMarker = undefined;
          }
        }
      } 
      else {
        self.getPath().removeAt(this.inex);
      }
      this.setMap(null);
      self.getPath().forEach(function (vertex, inex) {
        if (vertex.marker) {
          vertex.marker.inex = inex;
        }
      });
//BO CRO 2011-02-15
			if (typeof(callback) === "function") callback(self);
      /*if (self.getPath().getLength() === 1) {
        self.getPath().pop().marker.setMap(null);
      }*/
//EO CRO 2011-02-15
    };
    var vertexDragEnd = function () {
//BO CRO 2011-02-15
			if (typeof(callback) === "function") callback(self);
//EO CRO 2011-02-15
    };
    var createMarkerVertex = function (point) {
      var markerVertex = new google.maps.Marker({
        position : point,
        map : self.getMap(),
        icon : imgVertex,
        draggable : true,
        raiseOnDrag : false
      });
      google.maps.event.addListener(markerVertex, "mouseover", vertexMouseOver);
      google.maps.event.addListener(markerVertex, "mouseout", vertexMouseOut);
      google.maps.event.addListener(markerVertex, "drag", vertexDrag);
//BO CRO 2014-10-18
      google.maps.event.addListener(markerVertex, "drag", triggerDrag);
//EO CRO 2014-10-18
      google.maps.event.addListener(markerVertex, "rightclick", vertexRightClick);
			google.maps.event.addListener(markerVertex, "dragend", vertexDragEnd);
      point.marker = markerVertex;
      return markerVertex;
    };
    this.getPath().forEach(function (vertex, inex) {
      createMarkerVertex(vertex).inex = inex;
      if (flag) {
        createGhostMarkerVertex(vertex);
      }
    });
  };
}
if (typeof(google.maps.Polyline.prototype.stopEdit) === "undefined") {
  /**
   * Stops editing polyline
  */
  google.maps.Polyline.prototype.stopEdit = function () {
    this.getPath().forEach(function (vertex, inex) {
      if (vertex.marker) {
        vertex.marker.setMap(null);
        vertex.marker = undefined;
      }
      if (vertex.ghostMarker) {
        vertex.ghostMarker.setMap(null);
        vertex.ghostMarker = undefined;
      }
    });
  };
};/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */

/**
 * Events triggered by TWCCMap and attached to the map container:
 *  - marker.dragend (evt, latLng)
 *  - map.click (evt, mouseEvt)
 *  - map.rightclick (evt, mouseEvt)
 *  - polyline.editend (evt, WGS84)
 *  - map.metricschanged (metrics)
 */

(function($) {
    "use strict";
    /*global document, window, jQuery, console */

    if (window.TWCCMap !== undefined) {
        return;
    }

    var instance,
    init = function(opts) {
        var _model, _map, NorthAzimuth_, _geocoderService, _elevationService, _marker, _infowindow, _polyline, _rightClickEnabled, _maxZoomService, _tmpOverlay,
            _dfd = null,
            _northAzimuths = {},
            _options = {
                mapOptions: {
                    zoom: 2,
                    center: new google.maps.LatLng(0, 0),
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        mapTypeIds: [
                            google.maps.MapTypeId.ROADMAP,
                            google.maps.MapTypeId.SATELLITE,
                            google.maps.MapTypeId.HYBRID,
                            google.maps.MapTypeId.TERRAIN
                        ],
                        position: google.maps.ControlPosition.LEFT_TOP,
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_TOP,
                        style: google.maps.NavigationControlStyle.SMALL
                    },
                    panControl: true,
                    panControlOptions: {
                        position: google.maps.ControlPosition.LEFT_TOP
                    },
                    rotateControl: true,
                    scaleControl: true,
                    scaleControlOptions: {
                        position: google.maps.ControlPosition.BOTTOM_RIGHT
                    }
                },
                mapContainerElt: $('#map')[0],
                locationSelector: null,
                infowindowAdsSelector: null,
                controls: {},
                context: {
                    languageCode: 'en',
                    isDevEnv: false
                },
                timeout: 10000
            };

        $.extend(true, _options, opts);

        _model = {
            anglesInRadians: {},
            booleans: {autoZoom:true},
            metrics: {},
            setAngleInRadians: function(key, angleInRadians) {
                _model.anglesInRadians[key] = angleInRadians;
            },
            setAngleInDegrees: function(key, angleInDegrees) {
                _model.setAngleInRadians(key, _options.utils.degToRad(angleInDegrees));
            },
            getAngleInRadians: function (key) {
                return _model.anglesInRadians[key];
            },
            setBoolean: function(key, bool) {
                _model.booleans[key] = !!bool;
            },
            getBoolean: function(key) {
                return _model.booleans[key];
            },
            setMetrics: function(key, value) {
                _model.metrics[key] = value;
            },
            getMetrics: function(key) {
                return _model.metrics[key];
            }
        };

        NorthAzimuth_ = _options.Class((function() {
            var _distance, _delta,
                _defaultPathOptions = {
                    geodesic: false,
                    strokeColor: 'black',
                    strokeOpacity: 1.0,
                    strokeWeight: 1,
                    icons: [{offset: '100%'}]
                };
            return {
                initialize: function() { // Constructor
                    var _args = arguments[0] || {},
                    _pathOptions = _args.pathOptions || {},
                    _symbol = _args.symbol || {};
                    _distance = _args.distance || 80;
                    _delta = _args.delta || 0;
                    this.condition = _args.condition;
                    this.options = $.extend(true, {}, _defaultPathOptions, {icons: [{icon: _symbol}]}, _pathOptions);
                },
                set: function(WGS84, declination) {
                    var north = _getNeedle(WGS84, declination, _distance + _delta);
                    if (this.condition || (north !== undefined)) {
                        if (this.polyline) {
                            this.polyline.setPath(north);
                        } else {
                            this.polyline = new google.maps.Polyline($.extend(true, {}, this.options || {}, {path: north}));
                            this.polyline.setMap(_map);
                        }
                    }
                    return this;
                },
                reset: function() {
                    if (this.polyline) {
                        this.polyline.setMap();
                    }
                    delete this.polyline;
                    return this;
                },
                build: function(angleInRadians, WGS84) {
                    if (!isNaN(angleInRadians)) {
                        this.set(WGS84, angleInRadians);
                    } else {
                        this.reset();
                    }
                    return this;
                }
            };
        })());

        function _t() {
            return _options.utils.t.apply(this, arguments);
        }

        function _newDeferred() {
            return _options.utils.newDeferred.apply(this, arguments);
        }

        function _toggleRightClick(enable) {
            _rightClickEnabled = enable;
        }

        function _isRightClickEnabled() {
            return _rightClickEnabled;
        }

        function _getGeocoderService() {
            return _geocoderService;
        }

        function _createControl(obj) {
            var controlDiv,
                opts = {
                    fkidx:1,
                    css:{
                        width: '',
                        height: '',
                        backgroundColor: 'transparent'
                    }
                };
            $.extend(opts, obj||{});
            controlDiv = $('<div>')
                .css(opts.css||{})
                .prop('index', opts.fkidx)
                .addClass(opts['class']);
            if (opts.content !== undefined) {
                controlDiv.append(opts.content);
            }
            return controlDiv[0];
        }

        function _getNormalizedCoordinates(coord, zoom) {
            var y = coord.y,
                x = coord.x,
                tileRange = 1 << zoom;
            if (y < 0 || y >= tileRange) {
                return null;
            }
            if (x < 0 || x >= tileRange) {
                x = (x % tileRange + tileRange) % tileRange;
            }
            return {
                x: x,
                y: y
            };
        }

        function _getMapType(WMSProviderData) {
            var mapType,
                replacer = function(match, p1) {
                    return eval(p1);
                },
                options = {
                    getTileUrl: function(coord, zoom) {
                        var url,
                            normalizedCoord = _getNormalizedCoordinates(coord, zoom);
                        if (!normalizedCoord) {
                            return null;
                        }
                        url = WMSProviderData.url
                            .replace(/\{z\}/ig, zoom)
                            .replace(/\{x\}/ig, normalizedCoord.x)
                            .replace(/\{y\}/ig, normalizedCoord.y)
                            .replace(/\[([^\]]+)\]/ig, replacer);
                        return url;
                    },
                    tileSize: _newGSize(256, 256),
                    isPng: WMSProviderData.isPng||false,
                    maxZoom: WMSProviderData.zoom.max,
                    minZoom: WMSProviderData.zoom.min||0,
                    alt: WMSProviderData.alternativeText,
                    name: WMSProviderData.name
                };
            if (WMSProviderData.options) {
                $.extend(options, WMSProviderData.options);
            }
            mapType = new google.maps.ImageMapType(options);
            return mapType;
        }

        function _setPolylineGetBounds() {
            google.maps.Polyline.prototype.getBounds = function() {
                var bounds = new google.maps.LatLngBounds();
                this.getPath().forEach(function(e) {
                    bounds.extend(e);
                });
                return bounds;
            };
        }

        function _setCanvasProjectionOverlayClass() {
            function CanvasProjectionOverlay() {}
            CanvasProjectionOverlay.prototype = new google.maps.OverlayView();
            $.extend(CanvasProjectionOverlay.prototype, {
                constructor: CanvasProjectionOverlay,
                onAdd: function(){},
                draw: function(){},
                onRemove: function(){}
            });
            _tmpOverlay = new CanvasProjectionOverlay();
            _tmpOverlay.setMap(_map);
        }

        function _getStreetViewCloseBtn(panorama) {
            var closeBtn = $('<div style="z-index: 1; margin: 3px; position: absolute; right: 0px; top: 70px;"><div title="' + _t('close') + '" style="position: absolute; left: 0px; top: 0px; z-index: 2;"><div style="width: 16px; height: 16px; overflow: hidden; position: absolute; left: 0px; top: 0px;"><img src="http://maps.gstatic.com/mapfiles/api-3/images/cb_scout2.png" draggable="false" style="position: absolute; left: -490px; top: -102px; width: 1028px; height: 214px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;" alt="X"><\/div><div style="width: 16px; height: 16px; overflow: hidden; position: absolute; left: 0px; top: 0px; display: none;"><img src="http://maps.gstatic.com/mapfiles/api-3/images/cb_scout2.png" draggable="false" style="position: absolute; left: -539px; top: -102px; width: 1028px; height: 214px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;" alt="X"><\/div><\/div><div style="z-index: 1; font-size: 1px; background-color: rgb(187, 187, 187); width: 16px; height: 16px;"><\/div><\/div>');
            closeBtn.bind("click", function(event) {
                event.preventDefault();
                panorama.setVisible(false);
            });
            return closeBtn;
        }

        function _getGooglePromise(googleAsyncFunction, args, OK) {
            return $.Deferred(function(dfrd) {
                googleAsyncFunction(args, function(results, status) {
                    if(status === OK || (results && results.status === OK)) {
                        dfrd.resolve(results[0] || results);
                    } else {
                        dfrd.reject(new Error(status));
                    }
                });
            }).promise();
        }

        function _getGeocoderPromise(obj) {
            return _getGooglePromise(_geocoderService.geocode, obj, google.maps.GeocoderStatus.OK);
        }

        function _getElevationPromise(obj) {
            return _getGooglePromise(_elevationService.getElevationForLocations, obj, google.maps.ElevationStatus.OK);
        }

        function _getMaxZoomPromise(obj) {
            return _getGooglePromise(_maxZoomService.getMaxZoomAtLatLng, obj, google.maps.MaxZoomStatus.OK);
        }

        function _addGoogleListeners() {
            var $body = $('body');
            if (_options.locationSelector) {
                var autocompleteService = new google.maps.places.Autocomplete($(_options.locationSelector)[0], {bounds: _map.getBounds()});
                google.maps.event.addListener(autocompleteService, 'place_changed', function() {
                    var place = autocompleteService.getPlace();
                    _trigger('place.changed', place);
                });
                google.maps.event.addListener(_map, 'bounds_changed', function() {
                    autocompleteService.setBounds(_map.getBounds());
                });
                google.maps.event.addListenerOnce(_map, 'tilesloaded', function() {
                    $('.pac-container')
                        .css('left', ($(_options.locationSelector).offset().left).toString() + 'px')
                        .css('top', ($(_options.locationSelector).offset().top + 20).toString() + 'px');
                });
            }
            google.maps.event.addListener(_map, 'click', function(event) {
                _infowindow.close();
                _trigger('map.click', event);
            });
            google.maps.event.addListener(_map, 'rightclick', function(event) {
                _trigger('map.rightclick', event);
            });
            google.maps.event.addListener(_map, 'zoom_changed', function() {
                if (_marker) {
                    setTimeout(function() {_buildAzimuths(_marker.getPosition());}, 100);
                }
            });
            google.maps.event.addListener(_infowindow, 'domready', function() {
                $('#zoom-btn').button({ icons: {primary: 'ui-icon-zoomin'}, text: false });
                _trigger('infowindow.dom_ready');
            });
            google.maps.event.addListenerOnce(_map, 'idle', function(){
                setTimeout(function() {_dfd.resolve();}, 1000);
            });
            $body.on('click', '#zoom-btn', function() {
                _doZoom();
            });
            $body.bind('converterset.wgs84_changed', function(event, response) {
                var convergence = _options.utils.degToRad(response.convergenceInDegrees);
                response.wgs84 = _removeErrors(response.wgs84);
                _model.setAngleInDegrees('magneticDeclination', response.magneticDeclinationInDegrees);
                _model.setAngleInRadians('srcConvergence', convergence.source);
                _model.setAngleInRadians('dstConvergence', convergence.destination);
                _setGeometricPointer(response.wgs84);
                _trigger('converter.changed', response);
            });
            $body.bind('converterset.convergence_changed', function(event, response) {
                if (_marker) {
                    var convergence = _options.utils.degToRad(response.convergenceInDegrees);
                    _model.setAngleInRadians('srcConvergence', convergence.source);
                    _model.setAngleInRadians('dstConvergence', convergence.destination);
                    _buildAzimuths(_marker.getPosition());
                }
            });
        }

        function _initMap() {
            var panoramaOptions = {
                    addressControlOptions: {position: google.maps.ControlPosition.BOTTOM_CENTER},
                    panControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
                    zoomControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
                    visible: false
                },
                panorama = new google.maps.StreetViewPanorama(_options.mapContainerElt, panoramaOptions);

            _dfd = _newDeferred('Map');
            _map = new google.maps.Map(_options.mapContainerElt);
            _options.mapOptions.streetView = panorama;
            $.each(_options.wmsProviders, function(key, WMSProviderData){
                if (WMSProviderData.isEnabled) {
                    _options.mapOptions.mapTypeControlOptions.mapTypeIds.push(WMSProviderData.code);
                    _map.mapTypes.set(WMSProviderData.code, _getMapType(WMSProviderData));
                }
            });
            if ($.inArray(_options.mapOptions.mapTypeId, _options.mapOptions.mapTypeControlOptions.mapTypeIds) < 0) {
                _options.mapOptions.mapTypeId = google.maps.MapTypeId.TERRAIN;
            }
            _map.setOptions(_options.mapOptions);
            _toggleRightClick(true);
            _setPolylineGetBounds();
            _geocoderService = new google.maps.Geocoder();
            _elevationService = new google.maps.ElevationService();
            _maxZoomService = new google.maps.MaxZoomService();
            _infowindow = new google.maps.InfoWindow({content: _t('dragMe')});
            _setCanvasProjectionOverlayClass();
            panorama.controls[google.maps.ControlPosition.RIGHT_TOP].push(_createControl({
                fkidx:2,
                content:_getStreetViewCloseBtn(panorama)
            }));
            if (!_options.context.isDevEnv && google.maps.adsense) {
                _initAdsManagers();
            }
            _addGoogleListeners();
        }

        function _getNeedle(WGS84Origin, angle, distance) {
            var origin, vertice, needle;
            if (_tmpOverlay.getProjection() !== undefined) {
                origin = _tmpOverlay.getProjection().fromLatLngToContainerPixel(WGS84Origin);
                vertice = _newGPoint(Math.round(origin.x+(distance)*Math.sin(angle)), Math.round(origin.y-(distance)*Math.cos(angle)));
                needle = [WGS84Origin, _tmpOverlay.getProjection().fromContainerPixelToLatLng(vertice)];
            }
            return needle;
        }

        function _getGridNorthSymbol(color) {
            return {
                path: 'M 1,1 1,-1 -1,-1 -1,1 z',
                fillColor: color,
                fillOpacity: 1.0,
                scale: 2.5,
                strokeColor: color,
                strokeWeight: 0
            };
        }

        function _clearAzimuths() {
            for(var northAzimuth in _northAzimuths) {
                if (_northAzimuths.hasOwnProperty(northAzimuth)) {
                    _northAzimuths[northAzimuth].reset();
                }
            }
        }

        function _buildAzimuths(wgs84) {
            _northAzimuths.magnetic = _northAzimuths.magnetic || new NorthAzimuth_({
                delta: 15,
                symbol: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    fillColor: 'black',
                    fillOpacity: 1.0,
                    scale: 2.0,
                    strokeColor: 'black',
                    strokeWeight: 0
                }
            });
            _northAzimuths.magnetic.build(_model.getAngleInRadians('magneticDeclination'), wgs84);

            _northAzimuths.srcGrid = _northAzimuths.srcGrid || new NorthAzimuth_({
                pathOptions: {strokeColor: 'red'},
                symbol: _getGridNorthSymbol('red')
            });
            _northAzimuths.srcGrid.build(_model.getAngleInRadians('srcConvergence'), wgs84);

            _northAzimuths.dstGrid = _northAzimuths.dstGrid || new NorthAzimuth_({
                symbol: _getGridNorthSymbol('black')
            });
            _northAzimuths.dstGrid.build(_model.getAngleInRadians('dstConvergence'), wgs84);

            _northAzimuths.true = _northAzimuths.true || new NorthAzimuth_({
                condition: _northAzimuths.dstGrid.polyline !== undefined ||
                    _northAzimuths.srcGrid.polyline !== undefined ||
                    _northAzimuths.magnetic.polyline !== undefined,
                symbol: {
                    path: 'M 0,-225 30,-140 120,-140 50,-85 75,0 0,-50 -75,0 -50,-85 -120,-140 -30,-140 z',
                    fillColor: 'black',
                    fillOpacity: 1.0,
                    scale: 0.04,
                    strokeColor: 'black',
                    strokeWeight: 0
                }
            });
            _northAzimuths.true.build(0, wgs84);
        }

        function _newGSize(width, height) {
            return new google.maps.Size(width, height);
        }

        function _newGPoint(x, y) {
            return new google.maps.Point(x, y);
        }

        function _getMarkerIcon() {
            return new google.maps.MarkerImage(_options.system.dirWsImages + 'twcc_icon.png',
                _newGSize(40, 55),
                _newGPoint(0, 0),
                _newGPoint(19, 55));
        }

        function _getMarkerShadow() {
            return new google.maps.MarkerImage(_options.system.dirWsImages + 'twcc_icon_shadow.png',
                _newGSize(47, 33),
                _newGPoint(0, 0),
                _newGPoint(6, 33));
        }

        function _getLatLng(wgs84) {
            return wgs84.lat ? wgs84 : new google.maps.LatLng(wgs84.y, wgs84.x);
        }

        function _removeErrors(wgs84Array) {
            var newWgs84Array = [];
            $.each(wgs84Array, function() {
                if (this.lat === undefined && this.x === undefined || this.error) {
                    return true;
                } //INPUT ERROR => continue
                newWgs84Array.push(this);
            });
            return newWgs84Array;
        }

        function _getLatLngArray(wgs84Array) {
            var myLatLngArray = [];
            $.each(wgs84Array, function() {
                myLatLngArray.push(_getLatLng(this));
            });
            return myLatLngArray;
        }

        function _updateMarkerPosition(myLatLng) {
            _marker.setPosition(myLatLng);
        }

        function _updatePolylinePosition(myLatLngArray) {
            _polyline.stopEdit();
            _polyline.setPath(myLatLngArray);
        }

        function _trigger(eventName, data) {
            _options.utils.trigger($(_options.mapContainerElt), eventName, data);
        }

        function _createMarker(myLatLng) {
            _marker = new google.maps.Marker({
                position: myLatLng,
                map: _map,
                title: _t('dragMe'),
                shadow: _getMarkerShadow(),
                icon: _getMarkerIcon(),
                shape: {coord: [0, 0, 0, 35, 40, 35, 40, 0], type: 'poly'},
                draggable: true
            });
            google.maps.event.addListener(_marker, 'click', function() {
                _infowindow.close();
                _infowindow.open(_map, _marker);
            });
            google.maps.event.addListener(_marker, 'dragend', function() {
                _trigger('marker.dragend', _marker.getPosition());
            });
            google.maps.event.addListener(_marker, 'dragstart', function() {
                _infowindow.close();
                _clearAzimuths();
                _trigger('marker.dragstart');
            });
            _marker.setMap(_map);
        }

        function _createPolyline(myLatLngArray) {
            _polyline = new google.maps.Polyline({path: myLatLngArray, geodesic: true});
            $(_options.mapContainerElt).bind('polylineedit', function () {
                _setPolylineMetrics();
            });
            _polyline.setMap(_map);
        }

        function _resetMarker() {
            if (_marker) {
                _infowindow.close();
                _marker.setMap();
                _marker = undefined;
            }
        }

        function _resetPolyline() {
            if (_polyline) {
                _polyline.stopEdit();
                _polyline.setMap();
                _polyline = undefined;
            }
        }

        function _startPolylineEdit() {
            _polyline.runEdit(true, function(poly) {
                var wgs84 = [];
                poly.getPath().forEach(function(vtx) {
                    wgs84.push(vtx);
                });
                _trigger('polyline.editend', wgs84);
            });
        }

        function _setAutoZoom() {
            if (_model.getBoolean('autoZoom') === true) {
                var bounds = _polyline.getBounds();
                if (bounds) {
                    _map.fitBounds(bounds);
                    _map.setZoom(_map.getZoom() - 1);
                }
            }
        }

        function _setMetrics(length, area) {
            _model.setMetrics('length', length);
            _model.setMetrics('area', area);
            _trigger('map.metricschanged', {
                length: length,
                area: area
            });
        }

        function _setPolylineMetrics() {
            var path = _polyline.getPath();
            _setMetrics(google.maps.geometry.spherical.computeLength(path), google.maps.geometry.spherical.computeArea(path));
        }

        function _setPolyline(WGS84Array) {
            var myLatLngArray = _getLatLngArray(WGS84Array);
            if (_polyline) {
                _updatePolylinePosition(myLatLngArray);
            } else {
                _createPolyline(myLatLngArray);
            }
            _startPolylineEdit();
            _setAutoZoom();
            _setPolylineMetrics();
        }

        function _setMarker(wgs84) {
            var myLatLng = _getLatLng(wgs84);
            _buildAzimuths(myLatLng);
            if (_marker) {
                _updateMarkerPosition(myLatLng);
            } else {
                _createMarker(myLatLng);
            }
            _buildInfowindow(myLatLng);
            _setMetrics();
        }

        function _setGeometricPointer(wgs84) {
            if (wgs84.length == 1) { //marker
                _resetPolyline();
                _setMarker(wgs84[0]);
            } else { //polyline
                _resetMarker();
                _clearAzimuths();
                _setPolyline(wgs84);
            }
        }

        function _setGraticule() {
            var _graticule = new GridOverlay(_map);
            _graticule.setMap(_map);
        }

        //from http://forum.webrankinfo.com/maps-api-suggestion-villes-t129145.html
        function _getAddressComponent(result, address_type, name_type){
            var i, j, ret;
            address_type = (address_type === null) ? 'country' : address_type;
            name_type = (name_type === null) ? 'long_name' : name_type;

            if(result){
                for(i=0; i<result.address_components.length; i++){
                    for(j=0; j<result.address_components[i].types.length; j++){
                        if(result.address_components[i].types[j] == address_type){
                            if(result.address_components[i][name_type]){
                                ret = result.address_components[i][name_type];
                                break;
                            }
                        }
                    }
                    if (ret) {
                        break;
                    }
                }
            }
            return ret;
        }

        function _buildInfowindow(latlng) {
            var elevationPromise, timezonePromise, geocoderPromise, html,
                elevation = '',
                direction = '',
                timezone = '',
                timeStamp = Math.round((new Date().getTime())/1000),
                timezoneParameters = {
                    location: latlng.toUrlValue(),
                    timestamp: timeStamp,
                    sensor: 'false',
                    language: _options.context.languageCode
                },
                lat = Math.round(latlng.lat()*10000000)/10000000,
                lng = Math.round(latlng.lng()*10000000)/10000000;

            elevationPromise = _getElevationPromise({
                'locations': [latlng]
            }).done(function(elevationResult) {
                if (elevationResult) {
                    elevation = '<p style="float:right;"><img src="' + _options.system.dirWsImages + 'elevation_icon.png" alt="' + _t('elevation') + '" title="' + _t('elevation') + '" style="float:left;" width="38" height="30"> ' + elevationResult.elevation.toString().split('.')[0] + _t('unitMeter') + '<\/p>';
                }
            });

            timezonePromise = $.fn.getXDomain({
                dataType: 'json',
                url: 'https://maps.googleapis.com/maps/api/timezone/json',
                data: timezoneParameters,
                crossDomain: true
            }).done(function(TZdata) {
                if (TZdata.status == "OK") {
                    var offset = (TZdata.dstOffset + TZdata.rawOffset)/3600;
                    timezone = '<p style="float:left;">' + TZdata.timeZoneName + ', GMT';
                    if (offset > 0) {
                        timezone = timezone + '+';
                    }
                    if (offset !== 0) {
                        timezone = timezone + offset;
                    }
                    timezone = timezone + '<\/p>';
                }
            });

            geocoderPromise = _getGeocoderPromise({
                latLng: latlng,
                language: _options.context.languageCode
            }).done(function(geocoderResult) {
                if (geocoderResult) {
                    var iso;
                    direction = '<p>';
                    direction = direction + '<a id="zoom-btn" href="#" title="' + _t('zoom') + '" style="float:right;">' + _t('zoom') + '<\/a>';
                    direction = direction + '<img src="' + _options.system.dirWsImages + 'address_icon.png" alt="' + _t('address') + '" title="' + _t('address') + '" style="float:left;" width="38" height="30"> ' + geocoderResult.formatted_address + ' ';
                    iso = _getAddressComponent(geocoderResult, 'country', 'short_name');
                    if (iso && iso !== '') {
                        direction = direction + '<img src="' + _options.system.dirWsImages + 'flags/' + iso + '.png" alt="' + iso + '" style="vertical-align:middle;" width="22" height="15">';
                    }
                    direction = direction + '<\/p>';
                }
            });

            _infowindow.close();
            $.when(elevationPromise, timezonePromise, geocoderPromise).always(function() {
                html = '<div class="iw-content"><h3>' + _t('dragMe') + '<\/h3>';
                html = html + direction;
                html = html + '<div class="divp">';
                html = html + elevation;
                html = html + '<p style="float:left;"><img src="' + _options.system.dirWsImages + 'gps_icon.png" alt="GPS (WGS84)" title="GPS (WGS84)" style="float:left;" width="38" height="30"><\/p><p style="float:left;">' + lat + _t('unitDegreeNorth') +'<br>' + lng + _t('unitDegreeEast') + '<\/p>';
                html = html + timezone;
                html = html + '<\/div>';
                html = html + '<div><a href="#" id="directurl" style="text-decoration:none;" title="' + _t('directLink') + '"><img src="' + _options.system.dirWsImages + 'url.png" alt="' + _t('directLink') + '" style="border:0px none;vertical-align:middle;" width="16" height="16"> ' + _t('directLink') + '<\/a><\/div><\/div>';
                _infowindow.setContent(html);
                _infowindow.open(_map, _marker);
            });
        }

        function _doZoom() {
            var latlng = _marker.getPosition();
            $('#zoom-btn').button("option", "disabled", true);
            _getMaxZoomPromise(latlng)
                .done(function(response) {
                    $('#zoom-btn').button("option", "disabled", false);
                    _map.setCenter(latlng);
                    _map.setZoom(response.zoom);
                })
                .fail(function() {
                    alert("Error in MaxZoomService");
                });
        }

        function _initAdsManagers() {
            var adsManager_1, adsManager_2,
                adsManagerOptions = {
                    position: google.maps.ControlPosition.LEFT_BOTTOM,
                    map: _map,
                    visible: true,
                    publisherId: _options.system.adsense.publisherId,
                    backgroundColor: "#FFFFFF",
                    borderColor: "#FFFFFF"
                },
                $div_1 = $('<div style="margin-left:4px;padding:2px;" class="trsp-panel"><\/div>'),
                $div_2 = $div_1.clone();
            $div_1.prop('id', 'c-ads-1').addClass('ui-corner-bottom');
            $div_2.prop('id', 'c-ads-2').addClass('ui-corner-top');
            adsManager_1 = new google.maps.adsense.AdUnit($div_1[0], $.extend({format: google.maps.adsense.AdFormat[_options.system.adsense.adsFormats[0]]}, adsManagerOptions));
            adsManager_1.setChannelNumber(_options.system.adsense.channelsId.adUnit);
            adsManager_2 = new google.maps.adsense.AdUnit($div_2[0], $.extend({format: google.maps.adsense.AdFormat[_options.system.adsense.adsFormats[1]]}, adsManagerOptions));
            adsManager_2.setChannelNumber(_options.system.adsense.channelsId.adUnit);
        }

        _initMap();
        return {
            promise: _dfd.promise(),
            createControl: _createControl,
            toggleRightClick: _toggleRightClick,
            isRightClickEnabled: _isRightClickEnabled,
            getGeocoderService: _getGeocoderService,
            setGraticule: _setGraticule,
            model: {
                setAngleInRadians: _model.setAngleInRadians,
                setAngleInDegrees: _model.setAngleInDegrees,
                getMetrics: _model.getMetrics,
                setBoolean: _model.setBoolean
            },
            getMap: function() {return _map;}
        };
    };

    // exports
    window.TWCCMap = {
        getInstance: function (opts) {
            instance = instance || init(opts);
            return instance;
        }
    };
})(jQuery);;/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */

/**
 * Events triggered by TWCCUi and attached to the body:
 *  - ui.clickconvert (selctor)
 *  - ui.modechanged (mode)
 */

(function($) {
    "use strict";
    /*global window, document, jQuery */

    if (window.TWCCUi !== undefined) {
        return;
    }

    var instance,
    init = function(opts) {
        var _zeroClipboardClient,
            _dfd = null,
            _convergenceConvention = true,
            _options = $.extend(true, {}, opts),
            _SHDelay = 250,
            _paletteTimer = {};

        function _trigger(eventName, data) {
            var $anchor = $('body');
            _options.utils.trigger($anchor, eventName, data);
        }

        function _t() {
            return _options.utils.t.apply(this, arguments);
        }

        function _newDeferred() {
            return _options.utils.newDeferred.apply(this, arguments);
        }

        function _initBeautyTipsUi() {
            var btOptions = {
                trigger: 'none',
                showTip: function(box) {
                    $(box).fadeIn(_SHDelay);
                },
                hideTip: function(box, callback) {
                    $(box).animate({opacity: 0}, _SHDelay, callback);
                },
                shrinkToFit: true,
                padding: '0px',
                windowMargin: '0px',
                fill: 'rgba(0, 0, 0, .9)',
                cornerRadius: 10,
                strokeWidth: 1,
                shadow: true,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 3,
                shadowColor: 'rgba(6,6,6,.5)',
                shadowOverlap: false,
                noShadowOpts: {strokeStyle: '#666', strokeWidth: 1},
                positions: ['left', 'top'],
                cssStyles: {color: '#FFF'},
                closeWhenOthersOpen: true,
                clickAnywhereToClose: false
            }, $crsList = $('.crs-list');
            $.extend($.bt.defaults, btOptions);
            $crsList.first().bt({contentSelector: "$('.help-1')"});
            $crsList.last().bt({contentSelector: "$('.help-2')"});
            $('.source .container').bt({contentSelector: "$('.help-3')"});
            $('.source .convert-button').bt({contentSelector: "$('.help-4')"});
            $('.next_button').button({icons: {secondary:'ui-icon-seek-next'}});
        }

        function _initConverterUi() {
            $('.previous.history').button({icons: {primary: 'ui-icon-seek-first'}, text: false});
            $('#help').button({icons: {primary: 'ui-icon-help'}, text: false});
            $('.next.history').button({icons: {primary: 'ui-icon-seek-end'}, text: false});
            $('.source .convert-button').button({icons: {primary: 'ui-icon-arrowthick-1-s'}});
            $('.destination .convert-button').button({icons: {primary: 'ui-icon-arrowthick-1-n'}});
            $('#converter').draggable({handle: '.drag-handle'});
            $('input[type="text"]', '#p-research').addClass('ui-corner-all');
            $('#p-new').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('customSystem'),
                width: 400,
                autoOpen: false
            });
            $('#p-crs').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('systemDefinition'),
                width: 500,
                autoOpen: false
            });
            $('#p-research').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('research'),
                width: 400,
                autoOpen: false
            });
            _setHistoryButtons(0, 0);
        }

        function _initOptionsUi() {
            $('.button-set').buttonset();
            $('#auto-zoom-toggle').button({icons: {primary: 'ui-icon-zoomin'}, text: false, disabled: true});
            $('#print-map').button({icons: {primary: 'ui-icon-print'}, text: false});
            $('#full-screen')
                .button({icons: {primary: 'ui-icon-arrow-4-diag'}, text: false})
                .closest('p').toggle($(document).fullScreen() !== null);
            $('#o-container').accordion({
                collapsible:true,
                active:false,
                heightStyle: 'content',
                icons:{header:'ui-icon-gear'}
            });
            $('#p-convention_help').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('conventionTitle'),
                width: '840px',
                autoOpen: false
            });
        }

        function _initAdsenseUi() {
            var parameters = _options.system.adsense.parameters;
            window.adsbygoogle = window.adsbygoogle || [];
            $('ins.adsbygoogle').each(function() {
                window.adsbygoogle.push({params:$.extend({}, parameters)});
            });
        }

        function _initGeneralUi() {
            var hash = _getAddressBarAnchor(),
                $pDonate = $('#p-donate'),
                $pLoading = $('#p-loading'),
                progressbar = $pLoading.find('.progressbar'),
                progressLabel = $('.progress-label');
            $('.section, .searchbtn').addClass('ui-corner-all');
            $('.view').addClass('ui-corner-br ui-corner-tr');
            $('.search-field').addClass('ui-corner-bl ui-corner-tl');
            $('#p-poll').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('poll'),
                width: 500,
                open: function() {_addAnchorToAddressBar('poll');},
                close: function() {_removeAnchorFromAddressBar('poll');},
                autoOpen: hash=='poll'
            });
            if (_options.system.raterMasterSw && !_options.context.session.userHasRatedOne) {
                _showPoll(false);
            }
            $('#p-contact').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('contactUs'),
                width: 500,
                open: function() {_addAnchorToAddressBar('contact');},
                close: function() {_removeAnchorFromAddressBar('contact');},
                autoOpen: hash=='contact'
            });
            $('.contact-button').button({icons: {secondary: 'ui-icon-mail-closed'}});
            $pDonate.find('input.dont-show-again').prop('checked', _getPreferenceCookie('p-donate'));
            $('.help-1').find('input.dont-show-again').prop('checked', _getPreferenceCookie('help-1'));
            $pDonate.dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('donate'),
                width: 750,
                open: function() {_addAnchorToAddressBar('donate');},
                close: function() {_removeAnchorFromAddressBar('donate');},
                autoOpen: hash=='donate'
            });
            $pDonate.find('.progressbar').progressbar({
                value: _options.donations.total,
                max: _options.donations.max
            });
            progressbar.progressbar({
                value: false,
                change: function() {
                    progressLabel.text(Math.round(progressbar.progressbar('value'))+'%');
                },
                complete: function() {
                    progressLabel.text('Complete!');
                }
            });
            $('#p-about').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('about'),
                width: '70%',
                open: function() {_addAnchorToAddressBar('about');},
                close: function() {_removeAnchorFromAddressBar('about');},
                autoOpen: hash=='about'
            });
            $('body').bind('history.indexchanged', function(event, response) {
                var history = response.data;
                _setHistoryButtons(history.currentIndex, history.maxIndex);
            });
            $('#p-info').dialog({
                closeText: _t('close'),
                modal: true,
                title: 'Information',
                width: 750,
                autoOpen: true
            });
            $('#csvFeatures').hide();
            $('#language')
                .find('>dt>a')
                .button({icons: {secondary:'ui-icon-triangle-1-s'}});
            if (_options.system.facebookEnabled) {
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: _options.system.facebookAppId,
                        xfbml: true,
                        version: 'v2.2'
                    });
                };
                $.fn.getXDomain({
                    url: 'http://connect.facebook.net/'+_options.context.locale+'/sdk.js'
                });
            }
            if (!_options.context.isDevEnv) {
                window.___gcfg = {
                    lang: _options.context.googlePlusLocale,
                    parsetags: 'onload'
                };
                $.fn.getXDomain({
                    url: 'https://apis.google.com/js/plusone.js'
                });
            }
            $pLoading.dialog({
                dialogClass: 'no-close',
                modal: true,
                title: _t('loading'),
                autoOpen: true
            });
            $('.ui-widget-overlay').css({
                backgroundImage: 'none',
                opacity: 0.7
            });
        }

        function _getTarget($elt) {
            return $elt.closest('.converter-container').hasClass('source') ? 'source' : 'destination';
        }

        function _bindConverterPanelEvents() {
            var $snipet = $('a.snippet'),
                offset = 16,
                $converter = $('#converter'),
                $body = $('body');
            $snipet.bind('mouseenter', function() {
                $('body').append('<div id="Tip" style="z-index:9999;" class="ui-corner-all"><img src="'+this.href+'" alt="'+this.href+'"><\/div>');
            });
            $snipet.bind('mousemove', function(event) {
                $('#Tip')
                    .css({'left': event.pageX+offset, 'top': event.pageY+offset})
                    .show();
            });
            $snipet.bind('mouseout', function() {
                $('#Tip').remove();
            });
            $snipet.click(function(event) {
                event.preventDefault();
            });
            $('.search-crs').click(function(event) {
                var target = _getTarget($(this));
                event.preventDefault();
                $('#select').val(target);
                $('#p-research').dialog('open');
            });
            $converter.bind('converter.info', _showCrsInfo);
            $converter.on('click', '.show-p-new', function(event) {
                var target = _getTarget($(this));
                event.preventDefault();
                $('#new-form input[name="target"]').val(target);
                $('#p-new').dialog('open');
            });
            $body.on('click', '#view-reference', function(event) {
                var url = 'http://spatialreference.org/ref/?search=' + encodeURIComponent($('#find-reference').val());
                event.preventDefault();
                window.open(url);
            });
            $body.on('submit', '#reference-form', function(event) {
                event.preventDefault();
                $('#view-reference').click();
            });
            $('#crsResult').bind('change', function(event) {
                _updateConverterWithSelectedSrs($(event.target).val());
            });
            $('#research').click(function(event) {
                event.preventDefault();
                _goResearch();
            });
            _zeroClipboardClient.clip($converter.find('.octicon-clippy'));
            _zeroClipboardClient.on("copy", function(event) {
                var $target = $(event.target),
                    $container = $target.closest('.converter-container');
                if ($container.length) {
                    _zeroClipboardClient.setData("text/plain", $container.converter('value').toString());
                }
            });
        }

        function _startHelp() {
            $('#help').animate({opacity: 'hide'}, _SHDelay);
            $('.crs-list').first().btOn();
        }

        function _bindBeautyTipsEvents() {
            $('.close_button, .help-4 .next_button').click(function(event) {
                event.preventDefault();
                $('#help').animate({opacity: 'show'}, _SHDelay);
            });
            $('.next_button').click(function(event) {
                event.preventDefault();
            });
            $('.close_button', '.help-1').click(function() {
                $('.crs-list').first().btOff();
            });
            $('.close_button', '.help-2').click(function() {
                $('.crs-list').last().btOff();
            });
            $('.close_button', '.help-3').click(function() {
                $('.source .container').btOff();
            });
            $('.close_button, .next_button', '.help-4').click(function() {
                $('.source .convert-button').btOff();
            });
            $('.next_button', '.help-1').click(function() {
                $('.crs-list').last().btOn();
            });
            $('.next_button', '.help-2').click(function() {
                $('.source .container').btOn();
            });
            $('.next_button', '.help-3').click(function() {
                $('.source .convert-button').btOn();
            });
            $('.help-1').find('input.dont-show-again').bind('change', function() {
                _setPreferenceCookie('help-1', $(this)[0].checked);
            });
            $('#help').click(function() {
                event.preventDefault();
                _startHelp();
            });
            $(window).load(function() {
                if (!_getPreferenceCookie('help-1')) {
                    _startHelp();
                }
            });
        }

        function _bindLanguageEvents() {
            var $ul = $('.dropdown dd ul'),
                $a = $('.dropdown dt a');

            $a.click(function(event) {
                event.preventDefault();
                $ul.slideToggle(200);
            });
            $ul.find('li a').click(function(event) {
                var html, value;
                event.preventDefault();
                html = $(this).html();
                value = $(this).parent().find('span.value').text();
                $a.find('span').html(html);
                $ul.hide();
                document.location.href = $(this).prop('href');
            });
            $(document).click(function(event) {
                var $clicked = $(event.target);
                if (!$clicked.parents().hasClass('dropdown')) {
                    $ul.hide();
                }
            });
        }

        function _bindOptionsPanelEvents() {
            $('.convention').click(function(event) {
                event.preventDefault();
                $('#p-convention_help').dialog('open');
            });
            $('#print-map').click(function(event) {
                event.preventDefault();
                _options.utils.openStaticMap();
            });
            $('#full-screen').click(function(event) {
                event.preventDefault();
                $(document).toggleFullScreen();
            });
            $('#auto-zoom-toggle').click(function() {
                _options.utils.enableAutoZoom($(this).is(':checked'));
            });
            $('input[name="csv"]').click(function() {
                var isCsv = !!+$(this).val();
                _setMode(isCsv);
                _trigger('ui.csv_changed', isCsv);
            });
            $('input[name="convention"]').click(function() {
                _setConvergenceConvention(!!+$(this).val());
            });
            $('body').bind('converterset.csv_changed main.ready', function(event, obj) {
                var isCsv = obj.data === undefined ? obj.csv : obj.data.csv;
                _setCsvButtonset(isCsv);
                _setMode(isCsv);
            });
        }

        function _bindOtherPanelsEvents() {
            var $body = $('body');
            $('.toggle-next').click(function(event) {
                event.preventDefault();
                $(this).parent().find('.toogle-me').toggle();
            });
            $(document).bind('fullscreenchange', function() {
                _hideAll();
                _togglePalettes();
            });
            $(document).bind('mousemove', function(event) {
                _togglePalette(event.target, '.trsp-panel, #converter');
            });
            $body.on('click', '.show-p-poll', function(event) {
                event.preventDefault();
                _showPoll();
            });
            $body.on('click', '#directurl', function() {
                _buildDirectLink('directurl');
            });
            $body.on('mousedown', '#view-map, .donate_btn, .about, converter.info, .convert-button, .contact, .search-crs, .show-p-new', function() {
                _hideAll();
            });
            $body.bind('map.metricschanged', function(event, response) {
                _setMetrics(response.data);
            });
            $('#location-form').bind('submit', function(event) {
                event.preventDefault();
                $('#view-map').click();
            });
            $body.bind('converter.changed', function(event, response) {
                _setMagneticDeclination(response.data.magneticDeclinationInDegrees);
            });
            $('#p-donate').find('input.dont-show-again').bind('change', function() {
                _setPreferenceCookie('p-donate', $(this)[0].checked);
            });
            $('.donate_btn').click(function(event) {
                event.preventDefault();
                $('#p-donate').dialog('open');
            });
            $('.about').click(function(event) {
                event.preventDefault();
                $('#p-about').dialog('open');
            });
            $body.one('main.ready', function() {
                setTimeout(_closeLoading, 800);
            });
            $body.bind('main.start', _displayLoading);
            $body.bind('main.failed', {
                message: ': failure! ' + _t('contactUs'),
                className: 'failure'
            }, function() {
                _displayLoading.apply(this, arguments);
                _closeLoading();
            });
            $body.bind('main.succeeded', {
                message: ': success.',
                className: 'success'
            }, function() {
                var $progressBar = $('#p-loading').find('.progressbar'),
                    value = $progressBar.progressbar('value') || 0;
                _displayLoading.apply(this, arguments);
                $progressBar.progressbar('value', value+100/5);
            });
            $body.on('click', '.ui-widget-overlay', function() {
                _hideAll();
            });
        }

        function _bindContactUsEvents(openDialogOnly) {
            $('.contact').click(function(event) {
                event.preventDefault();
                $('#p-contact').dialog('open');
            });
            if (!openDialogOnly) {
                $('#contact-form').bind('submit', function(event) {
                    event.preventDefault();
                    $('#send-message').click();
                });
                $('#send-message').click(function(event) {
                    event.preventDefault();
                    $('#p-contact').dialog('close');
                    if (!_validateContactForm()) {
                        return;
                    }
                    _sendEmail();
                });
            }
        }

        function _bindKeysEvents() {
            var ESCAPE_KEY = 27,
                F11_KEY = 122;
            $(document).keyup(function(event) {
                switch (event.keyCode) {
                    case ESCAPE_KEY:
                        event.preventDefault();
                        _hideAll();
                        break;
                    case F11_KEY:
                        event.preventDefault();
                        $(document).toggleFullScreen();
                        break;
                }
            });
        }

        function _initZeroClipboard() {
            ZeroClipboard.config({
                swfPath: '/js/vendor/ZeroClipboard.swf'
            });
            _zeroClipboardClient = new ZeroClipboard();
            _zeroClipboardClient.on('ready', function() {
                _zeroClipboardClient.on('aftercopy', function(event) {
                    $(event.target).animate({opacity:0.3}, 500, function() {
                        $(this).animate({opacity:1},500);
                    });
                    _trigger('clipboard.aftercopy');
                });
            });
        }

        function _setupUiAndListeners() {
            _initConverterUi();
            _initOptionsUi();
            _initBeautyTipsUi();
            _initAdsenseUi();
            _initGeneralUi();
            _initZeroClipboard();
            _bindConverterPanelEvents();
            _bindOptionsPanelEvents();
            _bindBeautyTipsEvents();
            _bindOtherPanelsEvents();
            _bindContactUsEvents();
            _bindLanguageEvents();
            _bindKeysEvents();
        }

        function _closeLoading() {
            var $pLoading = $('#p-loading');
            if ($pLoading.find('.failure').length) {
                $pLoading.closest('.no-close').find('.ui-dialog-titlebar-close').show();
            } else {
                $pLoading.dialog('close');
                if (!_getPreferenceCookie('p-donate') && !_options.context.GET.isSetNoDonate) {
                    $('#p-donate').dialog('open');
                }
            }
            $('.ui-widget-overlay').removeAttr('style');
        }

        function _displayLoading(event, response) {
            var $elt,
                name = response.data,
                $loading = $('#p-loading .logs'),
                className = 'loading-'+name.toLowerCase().replace(/\s/ig, '-'),
                data = event.data;
            if (!$loading.find('.'+className).length) {
                var html = $('<div>', {class:className}).text('Loading '+name);
                $loading.append(html);
            }
            $elt = $loading.find('.'+className);
            if (data && data.message && data.className) {
                if ($elt.length && !$elt.hasClass(data.className)) {
                    $elt.addClass(data.className).append(data.message);
                }
            }
        }

        function _setMetrics(metrics) {
            if (metrics !== undefined) {
                _setLength(metrics.length);
                _setArea(metrics.area);
            }
        }

        function _setLength(length) {
            var unit = _t('unitMeter'),
                precision = 0;
            if (!length || length === undefined) {
                $('#lengthContainer').text('-' + unit);
            } else {
                if (length > 999) {
                    unit = _t('unitKilometer');
                    length /= 1000;
                    precision = 1;
                }
                $('#lengthContainer').text(_options.math.round(length, precision).toString() + unit);
            }
        }

        function _setArea(area) {
            var unit = _t('unitMeter') + '<sup>2</sup>',
                precision = 0;
            if (!area || area === undefined) {
                $('#areaContainer').html('-' + unit);
            } else {
                if (area > 999999) {
                    unit = _t('unitKilometer') + '<sup>2</sup>';
                    area /= 1000000;
                    precision = 1;
                }
                $('#areaContainer').html(_options.math.round(area, precision).toString() + unit);
            }
        }

        function _goResearch() {
            var $crsResult = $('#crsResult');
            $crsResult
                .html('<option value="#" class="disabledoption">' + _t('loading') + '<\/option>')
                .prop('disabled', true);
            $.post(_options.system.httpServer + '/' + _options.system.dirWsIncludes + 'c.php', {
                l:_options.context.languageCode,
                i:$('#crsCountry').val(),
                c:$('#crsCode').val(),
                n:$('#crsName').val(),
                f:''
            }).done(function(response) {
                $crsResult.html('');
                if(!$(response).length) {
                    $crsResult.append($('<option>', {val:'', text:_t('resultEmpty'), classname:'disabledoption'}));
                } else {
                    $crsResult.prop('disabled', false);
                    $.each(response, function(country, obj) {
                        $.each(obj, function(srsCode, crs) {
                            _options.utils.addOptionToSelect(country, srsCode, $('#crsResult'), crs.def);
                        });
                    });
                }
            }).fail(function() {
                $crsResult.html('');
                $crsResult.append($('<option>', {val:'', text:_t('resultEmpty'), classname:'disabledoption'}));
            });
        }

        function _updateConverterWithSelectedSrs(srsCode) {
            var target = $('#select').val();
            if ($('#closeSearch').prop('checked')) {
                $('#p-research').dialog('close');
            }
            App.TWCCConverter.setSelection(target, srsCode);
        }

        function _getLoadingHtml() {
            return '<div class="loading"><img src="' + _options.system.dirWsImages + 'loading.gif" alt="" width="35" height="35">' + _t('loading') + '<\/div>';
        }

        function _showPoll(hideAll) {
            hideAll = hideAll === undefined ? true : hideAll;
            $('#poll-info').html(_getLoadingHtml());
            if (hideAll) _hideAll();
            $('#p-poll').dialog('open');
            _loadPoll();
        }

        function _loadPoll(serializedValues) {
            serializedValues = serializedValues||'';
            $('#poll-info').html(_getLoadingHtml());
            $.post(_options.system.dirWsModules + 'rater/forms.php', 'rater=true&'+serializedValues, _buildPoll);
        }

        function _buildPoll(response) {
            var $pollInfo = $('#poll-info');
            $pollInfo.html(response);
            $pollInfo.find('form').each(function() {
                $(this).bind('submit', function(event) {
                    event.preventDefault();
                    _loadPoll($(this).serialize());
                });
                _bindContactUsEvents(true);
            });
        }

        function _showCrsInfo(event, response) {
            var $crsInfo = $('#crs-info');
            $crsInfo.html(_getLoadingHtml());
            $.post(_options.system.dirWsIncludes + 'crs_info.php', {
                c: response.srsCode,
                d: response.definitionString,
                l: _options.context.languageCode
            }, function(response) {
                $crsInfo.html(response);
            });
            $('#p-crs').dialog('open');
        }

        function _removeAnchorFromAddressBar() {
            window.location.hash = '';
        }

        function _addAnchorToAddressBar(anchor) {
            window.location.hash = '#' + anchor;
        }

        function _getAddressBarAnchor() {
            return window.location.hash.replace('#', '');
        }

        function _validateContactForm() {
            if ($('#message').val().length < 1) {
                alert(_t('messageNotSent') + 'empty msg.');
                $('#p-contact').dialog('open');
                return false;
            }
            if ($('#email').val().length < 1) {
                alert(_t('messageWrongEmail'));
                $('#p-contact').dialog('open');
                return false;
            }
            return true;
        }

        function _sendEmail() {
            _options.utils.sendMsg($('#message').val(), $('#email').val(), _manageResponse);
        }

        function _manageResponse(response) {
            switch (response) {
                case '1':
                    alert(_t('messageSent'));
                    break;
                case '-3':
                    alert(_t('messageWrongEmail'));
                    break;
                default: //-1 & -2
                    alert(_t('messageNotSent') + response);
                    break;
            }
            if (response == '1') {
                $('#email').val('');
                $('#message').val('');
            } else {
                $('#p-contact').dialog('open');
            }
        }

        function _hideAll() {
            $('.crs-list, .source .container, .source .convert-button').each(function(){
                $(this).btOff();
            });
            $('#help').animate({opacity: 'show'}, _SHDelay);
            $('#p-new').dialog('close');
            $('#p-contact').dialog('close');
            $('#p-about').dialog('close');
            $('#p-crs').dialog('close');
            $('#p-poll').dialog('close');
            $('#p-info').dialog('close');
            $('#p-donate').dialog('close');
            $('#p-research').dialog('close');
            $('#p-convention_help').dialog('close');
        }

        function _setPreferenceCookie(prefId, prefValue) {
            _options.utils.setCookieParam(_options.system.preferencesCookie, prefId, prefValue, 7);
        }

        function _getPreferenceCookie(prefId) {
            return _options.utils.getCookieParam(_options.system.preferencesCookie, prefId);
        }

        function _setCsvButtonset(isCsv) {
            if (isCsv !== _getMode()) {
                $('input[name="csv"][value="'+(+isCsv)+'"]').prop('checked', true);
                $('.csv-radio').buttonset('refresh');
            }
        }

        function _setMode(isCsv) {
            isCsv = !!isCsv;
            $('#manualFeatures').toggle(!isCsv);
            $('#csvFeatures').toggle(isCsv);
            if (isCsv) {
                $('#auto-zoom-toggle').button('enable');
                $('.convention-radio').buttonset('disable');
                _setMetrics();
            } else {
                $('#auto-zoom-toggle').button('disable');
                $('.convention-radio').buttonset('enable');
            }
        }

        function _getMode() {
            return !!+$('input[name="csv"]:checked').val();
        }

        function _setMagneticDeclination(angle) {
            var roundedAngle = angle === undefined ? '' : _options.math.round(angle, 4).toString();
            $('#magneticDeclinationContainer').text(roundedAngle);
        }

        function _buildDirectLink(eltId) {
            var url = _options.utils.getDirectUrl(),
                $elt = $('#' + eltId),
                $container = $('<span>'),
                $input = $('<input>', {
                    id: eltId + '-input',
                    type: 'text',
                    class: 'search-field ui-corner-bl ui-corner-tl',
                    value: url
                }),
                $button = $('<span>', {
                    id: eltId + '-button',
                    'data-clipboard-target': eltId + '-input',
                    title: _t('copyToClipboard'),
                    class: 'view ui-corner-br ui-corner-tr octicon octicon-clippy'
                });//.button({icons: {primary: 'ui-icon-copy'}, text: false});
            $container.append($input).append($button);
            $elt.replaceWith($container);
            $('#'+eltId+'-input').select();
            _zeroClipboardClient.clip($button);
        }

        function _setConvergenceConvention(isSurvey) {
            _convergenceConvention = isSurvey;
            _trigger('ui.convergence_changed');
        }

        function _setHistoryButtons(idx, max) {
            var min = 0,
                enableNextButton = idx < max,
                enablePreviousButton = idx > min;
            $('.previous.history').button('option', 'disabled', !enablePreviousButton);
            $('.next.history').button('option', 'disabled', !enableNextButton);
        }

        function _togglePalettes() {
            if($(document).fullScreen()) {
                $('.trsp-panel, .spare, #converter, #h-container').fadeOut();
            } else {
                $('.trsp-panel, .spare, #converter, #h-container').fadeIn();
            }
        }

        function _togglePalette(target, palette) {
            if($(document).fullScreen()) {
                if ($(palette).is(':hidden')) {
                    $(palette).fadeIn();
                } else if ($(target).closest(palette).length) {
                    clearInterval(_paletteTimer[palette]);
                } else {
                    clearInterval(_paletteTimer[palette]);
                    _paletteTimer[palette] = setTimeout(function() {
                        if($(document).fullScreen()) {
                            $(palette).fadeOut();
                        }
                    }, 1000);
                }
            }
        }

        function _initUI() {
            _dfd = _newDeferred('UI');
            _setupUiAndListeners();
            _dfd.resolve();
        }

        _initUI();
        return {
            promise: _dfd.promise(),
            getConvergenceConvention: function() {return _convergenceConvention;}
        };
    };

    // exports
    window.TWCCUi = {
        getInstance: function (opts) {
            instance = instance || init(opts);
            return instance;
        }
    };
})(jQuery);
;/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */

/**
 * Events triggered by TWCCConverter and attached to the body:
 *  - converter.success (obj)
 */



(function($) {
    "use strict";
    /*global document, window, jQuery, console */

    if (window.TWCCConverter !== undefined) {
        return;
    }

    var instance,
    init = function(opts) {
        var _dfd = null,
            _converterWidget = null,
            _defIdx = 0,
            _options = $.extend(true, {}, opts);

        function _t() {
            return _options.utils.t.apply(this, arguments);
        }

        function _newDeferred() {
            return _options.utils.newDeferred.apply(this, arguments);
        }

        function _getErrorMessage(XMLHttpRequest) {
            return _t('errorContactUs').replace('%s', XMLHttpRequest.status.toString());
        }

        function _checkCRS(value, target) {
            var msg = '',
                reg = new RegExp("\\+title=[^\\+]+", "i");
            if (value === '') return '';
            value = value.toString().replace(reg, "");
            $.each(_converterWidget.options.definitions, function(country, crs) {
                $.each(crs, function(srsCode, definition) {
                    var definitionString = definition.def||"";
                    if (srsCode.toUpperCase() == value.toUpperCase() || definitionString.toUpperCase().replace(reg, "") == value.toUpperCase()) {
                        msg = _t('crsAlreadyExists')+country+" > "+(definitionString ? _options.utils.getTitleFromDefinitionString(definitionString, srsCode) : srsCode);
                        _selection(target, srsCode);
                        return false;
                    }
                });
                if (msg !== '') return false;
            });
            return msg;
        }

        function _addSystem(definitionString, srsCode) {
            var promise,
                definition = {'*[UD]':{}};
            definition['*[UD]'][srsCode] = {
                def: definitionString,
                isConnector: false
            };
            promise = _converterWidget.mergeDefinitions(definition);
            return  promise;
        }

        function _alertPNew(checkMsg, failed) {
            alert(checkMsg);
            $('#loadingxtra').hide();
            $('#new-form').show();
            if (!failed) {
                $('#p-new').dialog("close");
                $('#find-reference').val('');
                $('#add-reference').val('');
            } else {
                _defIdx--;
            }
        }

        function _getThirdPartyUrl(srsCode, baseUrl, toUpperCase) {
            var params = srsCode.split(':');
            toUpperCase = toUpperCase || false;
            return baseUrl.replace(/\$\{\d\}/ig, function(index) {
                index = index.match(/\d+/)[0];
                var value = params[index] || index;
                return toUpperCase ? value.toUpperCase() : value.toLowerCase();
            });
        }

        function _loadProj4jsFormat(srsCode, method, options) {
            window.Proj4js = {defs: {}};
            method(options).done(function() {
                _addNewReference(Proj4js.defs[srsCode]);
            }).fail(function(jqXHR) {
                _alertPNew(_getErrorMessage(jqXHR), true);
            }).always(function() {
                delete window.Proj4js;
            });
        }

        function _addSpatialReferenceDefinition(srsCode) {
            var url = _getThirdPartyUrl(srsCode, 'http://spatialreference.org/ref/${0}/${1}/proj4js/');
            window.Proj4js = {defs: {}};
            _loadProj4jsFormat(srsCode, $.fn.getXDomain, {
                url: url
            });
        }

        function _addLocalDefinition(srsCode) {
            var url = _getThirdPartyUrl(srsCode, '/js/data/defs/${0}${1}.js', true);
            _loadProj4jsFormat(srsCode, $.ajax, {
                url: url,
                cache: true,
                dataType: 'script'
            });
        }

        function _addNewReference(defData) {
            var title, srsCode, defMatch, checkMsg, newTitle,
                target = $("#new-form input[name='target']").val(),
                DEFDATA = defData.toUpperCase(),
                isEpsg = DEFDATA.indexOf("EPSG:") === 0,
                isEsri = DEFDATA.indexOf("ESRI:") === 0,
                isIau = DEFDATA.indexOf("IAU2000:") === 0,
                isSrOrg = DEFDATA.indexOf("SR-ORG:") === 0,
                isIgnf = DEFDATA.indexOf("IGNF:") === 0;
            $('#new-form').hide();
            $('#loadingxtra').show();
            checkMsg = _checkCRS(defData, target);
            if (checkMsg) {
                _alertPNew(checkMsg);
                return;
            }
            if (isEpsg || isEsri || isIau || isSrOrg) {
                srsCode = DEFDATA;
                _addSpatialReferenceDefinition(srsCode);
            } else if (isIgnf) {
                srsCode = DEFDATA;
                _addLocalDefinition(srsCode);
            } else {
                defMatch = defData.match(new RegExp("^[^\\[]+\\[\"([^\\]]+)\"\\][\\s=]+\"([^\"]+)\";$", "i"));
                if (defMatch !== null) {
                    defData = defMatch[2];
                }
                title = _options.utils.getTitleFromDefinitionString(defData, '');
                _defIdx ++;
                srsCode = 'UD'+_defIdx;
                if (title === undefined) {
                    title = _t('undefinedTitle');
                    defData = '+title='+title+' '+defData;
                }
                newTitle = srsCode+' '+title;
                defData = defData.replace('+title='+title, '+title='+newTitle);
                checkMsg = _checkCRS(srsCode, target);
                if (!checkMsg) {
                    checkMsg = _checkCRS(defData, target);
                }
                if (checkMsg) {
                    _alertPNew(checkMsg);
                    return;
                }
                _addSystem(defData, srsCode).done(function() {
                    $('#loadingxtra').hide();
                    $('#new-form').show();
                    var currentSelection = _selection(target);
                    try {
                        _selection(target, srsCode);
                        alert(_t('newSystemAdded')+'"'+newTitle+'".');
                        $('#p-new').dialog("close");
                        $('#find-reference').val('');
                        $('#add-reference').val('');
                        _options.utils.sendMsg('New user-defined system:\n\r'+srsCode+' = "'+defData+'"');
                    } catch (e) {
                        _defIdx --;
                        _selection(target, currentSelection);
                        _unload(srsCode);
                        if (defData === '') {
                            alert((_t('errorContactUs')).replace('%s', '-2 (NotFound)'));
                        } else {
                            alert((_t('errorContactUs')).replace('%s', '-1 (WrongFormat:'+defData+')'));
                        }
                    }
                });
            }
        }

        function _unload(srsCode) {
            _converterWidget.unloadCRS(srsCode);
        }

        function _selection(target, srsCode) {
            target = target.toLowerCase();
            var pushPull = 'pushPull' + target.charAt(0).toUpperCase() + target.slice(1);
            return _converterWidget[pushPull]('selection', srsCode);
        }

        function _initConverter() {
            var converterContext = _options.context.converter,
                sourceSrsCode = converterContext.defaultSourceSrs,
                destinationSrsCode = converterContext.defaultDestSrs,
                wgs84 = converterContext.defaultWgs84,
                wgs84IsValid = !(wgs84 === '' || wgs84.x === '' || wgs84.y === ''),
                $converter = $('#converter'),
                $body = $('body'),
                converterOptions = {
                    units: {
                        dms:{D:_t('unitDegree'), M:_t('unitMinute'), S:_t('unitSecond')},
                        dd:{x:{DD:_t('unitDegreeEast')}, y:{DD:_t('unitDegreeNorth')}},
                        cartesian:{XY:{m:_t('unitMeter'), km:_t('unitKilometer'), 'us-ft':_t('unitFeet')},CONVERGENCE:_t('unitDegree')}
                    },
                    labels:{
                        spherical:{x:_t('labelLng'), y:_t('labelLat'), convergence:_t('labelConvergence')},
                        cartesian:{x:_t('labelX'), y:_t('labelY'), z:_t('labelZone'), h:_t('labelHemi'), convergence:_t('labelConvergence')},
                        csv:{csv:_t('labelCsv'), l:_t('labelFormat')}
                    },
                    options:{
                        x:{E:_t('optionE'),W:_t('optionW')},
                        y:{N:_t('optionN'),S:_t('optionS')},
                        o:{_DMS:_t('optionDMS'), _DM:_t('optionDM'), _DD:_t('optionDD')},
                        h:{n:_t('optionNorth'), s:_t('optionSouth')},
                        u:{_M:_t('optionM'), _KM:_t('optionKM'), _F:_t('optionF')}
                    }
                };

            if (converterContext.fromUrl && !wgs84IsValid) {
                alert('Invalid URL');
            }
            wgs84 = (converterContext.fromUrl && wgs84IsValid) ? [wgs84] : converterContext.fromRss ? [{x:10,y:10}] : null;
            _options.context.converter.fromUrl = false;
            _options.context.converter.fromRss = false;
            _dfd = _newDeferred('Converter');
            _converterWidget = $converter.converterSet({
                units: converterOptions.units,
                labels: converterOptions.labels,
                options: converterOptions.options,
                wgs84: wgs84,
                defaultWgs84: [_options.utils.getRandomCityLocation()],
                value: {x:0, y:0},
                selections: {
                    source: sourceSrsCode,
                    destination: destinationSrsCode
                },
                url: _options.system.httpServer + '/' + _options.system.dirWsIncludes + 'c.php'
            }).data('twccConverterSet');
            $converter.one('converterset.done', function(event, data) {
                _dfd.resolve(data);
            });
            $converter.bind('converterset.fail', function(event, data) {
                var errorMessage = _getErrorMessage.call(null, data);
                alert(errorMessage);
            });
            $body.on('click', '#new-reference', function(event) {
                event.preventDefault();
                var defData = $('#add-reference').val();
                _addNewReference(defData);
            });
            $body.on('submit', '#new-form', function(event) {
                event.preventDefault();
                $('#new-reference').click();
            });
            $body.bind('ui.convergence_changed', function() {
                _converterWidget.setConvergence();
            });
            $body.bind('ui.csv_changed', function(evt, response) {
                _converterWidget.csv(response.data);
            });
            $('.to-remove').remove();
        }

        _initConverter();
        return {
            promise: _dfd.promise(),
            converterWidget: _converterWidget,
            setSelection: _selection
        };
    };

    // exports
    window.TWCCConverter = {
        getInstance: function (opts) {
            instance = instance || init(opts);
            return instance;
        }
    };
})(jQuery);;/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */
(function(window, document, $, App) {
    "use strict";
    /*global document, window, jQuery */

    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-17790812-2', 'auto');
    ga('send', 'pageview');

    $(document).ready(function() {
        var $body = $('body');
        $body.on('change', '.crs-list', trackSelect);
        $body.on('click', '#converter input[type="radio"]', trackDynamicRadio);
        $body.on('click', '#o-container input[type="radio"]', trackStaticRadio);
        $body.on('click', '.octicon-clippy', trackClipboardClick);
        $body.bind('clipboard.aftercopy', trackClipboardSuccess);
        $body.one('infowindow.dom_ready', trackLoadingTime);
        $body.one('main.ready', function(event, obj) {
            var isCsv = obj.data === undefined ? obj.csv : obj.data.csv;
            if (isCsv) {
                $body.off('infowindow.dom_ready', trackLoadingTime);
            }
        });

        function trackSelect(evt) {
            var $select = $(evt.target),
                crs = $select.find('option:selected').text();
            trackEvent('select', 'change', crs);
        }

        function trackDynamicRadio(evt) {
            var $radio = $(evt.target),
                crs = $radio.closest('div.section').find('select[name^="crs"] option:selected').text(),
                value = $radio.val();
            trackEvent('radio', 'click', value);
        }

        function trackStaticRadio(evt) {
            var $radio = $(evt.target),
                name = $radio.prop('name');
            trackEvent('radio', 'click', name);
        }

        function trackClipboardClick() {
            trackEvent('clipboard', 'click');
        }

        function trackClipboardSuccess() {
            trackEvent('clipboard', 'success');
        }

        function trackLoadingTime() {
            var endTime = new Date().getTime(),
                timeSpent = endTime - App.context.startTime;
            trackTiming('TWCC', 'Render infowindow', timeSpent);
        }

        function trackEvent(category, action, opt_label, opt_quantity) {
            try {
                ga('send', 'event', category, action, opt_label, opt_quantity);
            } catch (err) {}
        }

        function trackTiming(category, variable, timeMs, opt_label) {
            try {
                ga('send', 'timing', category, variable, timeMs, opt_label);
            } catch (err) {}
        }
    });
})(window, document, jQuery, App);