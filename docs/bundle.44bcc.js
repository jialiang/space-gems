!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(t){return e[t]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=".",t(t.s="mdyV")}({"8Eeq":function(e,t,n){"use strict";(function(e){function r(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var o=n("hosL"),u=n("iGFZ"),i=n("QCyV"),a=n("cU0k"),l=n("mc2X"),c=n("l9WX"),s=n("mOVH");t.a=function(t){function n(n){var o;return(o=t.call(this,n)||this).initGameParameters=function(e){o.rowCount=Math.max(e.rowCount||8,3),o.colCount=Math.max(e.colCount||8,3),o.typeCount=Math.max(e.typeCount||5,3),o.targetScore=e.targetScore||25e3,o.timeLimit=1e3*(e.timeLimit||60),o.highscore=parseInt(localStorage.getItem("highscore")||0),o.soundManager=Object(a.d)()},o.initDispatchers=function(){o.dispatchGems=a.c.call(r(o),"gems",u.a),o.dispatchScore=a.c.call(r(o),"score",u.b),o.dispatchStats=a.c.call(r(o),"stats",u.c)},o.initSetterGetters=function(){o.getGem=function(e){return o.state.gems["selectedGem"===e?o.selectedGemId:e]},o.getGemFromBoard=function(e,t){return o.getGem(o.state.gems.board[e+"_"+t])},o.setSelectedGem=function(e){return o.selectedGemId=e},o.getRemainingTime=function(){return o.state.remainingTime},o.setRemainingTime=function(e,t){return o.setState({remainingTime:e},t)},o.isLocked=function(){return"default"!==o.getStep()},o.isWin=function(){return o.getTotalElapsed()<o.timeLimit?null:o.state.score>=o.targetScore},o.getPage=function(){return o.state.page},o.setPage=function(e){o.setState({page:e}),"startPage"!==e&&o.soundManager.playBgm()},o.getStep=function(){return o.state.step},o.setStep=function(e){return o.setState({step:e})},o.getUndo=function(){return o.undo},o.setUndo=function(e,t){return o.undo=e?{firstGemId:e,secondGemId:t}:null},o.getTotalElapsed=function(){return o.totalElapsed},o.setTotalElapsed=function(e){return o.totalElapsed=e},o.getLastTimestamp=function(){return o.lastTimestamp},o.setLastTimestamp=function(e){return o.lastTimestamp=e},o.getBgmVolume=o.soundManager.getVolume,o.setBgmVolume=o.soundManager.setVolume},o.initLifecycleStages=function(){o.startCountDown=Object(l.g)(r(o)),o.startGame=Object(l.h)(r(o)),o.prepareNewGame=function(){o.setSelectedGem(null),o.setUndo(null),o.setTotalElapsed(null),o.setLastTimestamp(null),o.dispatchGems({type:"set",data:{}}),o.dispatchScore({type:"reset"}),o.dispatchStats({type:"reset"}),o.setStep("starting"),o.setPage("playingPage"),o.setRemainingTime(o.timeLimit)},o.swapGems=Object(l.i)(r(o)),o.findMatches=Object(l.d)(r(o)),o.destroyGems=Object(l.b)(r(o)),o.replaceDestroyedGems=Object(l.f)(r(o)),o.dropGems=Object(l.c)(r(o)),o.cleanupGems=Object(l.a)(r(o)),o.next=Object(l.e)(r(o))},o.initUserEventHandlers=function(){o.handleGemMouseDown=Object(i.b)(r(o)),o.handleGemMouseEnter=Object(i.c)(r(o)),o.handleChangePage=Object(i.a)(r(o)),o.handleTouchMove=Object(i.d)(r(o))},o.initPages=function(){o.startPage=Object(c.d)(r(o)),o.playingPage=Object(c.c)(r(o)),o.menuPage=Object(c.b)(r(o)),o.creditsPage=Object(c.a)(r(o))},o.render=function(){return e("div",{className:"container"},e("div",{className:"section-container"},o[o.getPage()]({gems:o.state.gems,score:o.state.score,highscore:o.highscore,targetScore:o.targetScore,stats:o.state.stats})),e("picture",{className:"background-image"},e("source",{srcset:"images/background.webp",type:"image/webp"}),e("img",{src:"images/background.jpg",alt:""})))},o.initGameParameters(n),o.state={page:"startPage"},o.initDispatchers(),o.initSetterGetters(),o.initLifecycleStages(),o.initUserEventHandlers(),o.initPages(),o}var o,d;d=t,(o=n).prototype=Object.create(d.prototype),o.prototype.constructor=o,o.__proto__=d;var f=n.prototype;return f.componentWillUnmount=function(){this.soundManager.pauseBgm()},f.componentDidUpdate=function(e,t){var n=this,r=this.getStep(),o=this.getPage();r!==t.step&&"default"!==r&&("create"===r||"starting"===r?requestAnimationFrame(this.next):setTimeout((function(){return requestAnimationFrame(n.next)}),s.c)),o!==t.page&&"playingPage"===o&&"starting"!==r&&this.startCountDown(),(this.state.remainingTime!==t.remainingTime||r!==t.step)&&this.state.remainingTime<=0&&"default"===r&&(this.state.score>this.highscore&&(this.highscore=this.state.score,localStorage.setItem("highscore",this.state.score)),this.soundManager.playSfx("timesup"),setTimeout((function(){n.isWin()?n.soundManager.playSfx("congratulations"):n.soundManager.playSfx("gameover"),n.handleChangePage("menuPage")}),s.b))},n}(o.Component)}).call(this,n("hosL").h)},QCyV:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"a",(function(){return i}));var r=function(e){var t=e.isLocked,n=e.setSelectedGem;return function(e){t()||n(e)}},o=function(e){var t=e.getGem,n=e.setSelectedGem,r=e.setUndo,o=e.swapGems;return function(e){var u=t("selectedGem");if(u){var i=t(e);Math.abs(u.row-i.row)+Math.abs(u.col-i.col)===1?(r(u.id,i.id),o(u.id,i.id),n(null)):n(null)}}},u=function(e){var t=e.getGem,n=e.handleGemMouseEnter;return function(e){var r=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY),o=t("selectedGem");o&&r&&o.id!==r.id&&n(r.id)}},i=function(e){var t=e.prepareNewGame,n=e.setPage;return function(e){if("newPlayingPage"===e)return t();document.getElementsByTagName("section")[0].scrollTop=0,n(e)}}},QfWi:function(e,t,n){"use strict";n.r(t),function(e){n.d(t,"default",(function(){return u}));var r=n("hosL"),o=n("8Eeq"),u=(n("pyAK"),function(t){function n(){return t.apply(this,arguments)||this}var r,u;return u=t,(r=n).prototype=Object.create(u.prototype),r.prototype.constructor=r,r.__proto__=u,n.prototype.render=function(){return e("div",{id:"root"},e(o.a,null))},n}(r.Component))}.call(this,n("hosL").h)},cU0k:function(e,t,n){"use strict";function r(e,t){var n=this;return function(r,o){var u;return n.setState(((u={})[e]=t(n.state[e],r),u),o)}}n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"d",(function(){return a}));var o=0,u=function(e){var t=e.row,n=e.col,r=e.board,u=function(e){return Array.isArray(e)?e[Math.floor(Math.random()*e.length)]:Math.floor(Math.random()*e)}(e.selection),i="gem-"+(o+=1);return r&&(r[t+"_"+n]=i),{id:i,value:u,row:t,col:n}},i=function(e){for(var t=e.rowCount,n=e.colCount,r=e.typeCount,o=e.rowOffset,i=void 0===o?0:o,a=e.colOffset,l=void 0===a?0:a,c={},s={},d=0;d<t;d++)for(var f=0;f<n;f++){var p=[],_=[];if(f>1)p=[c[s[d+"_"+(f-1)]].value,c[s[d+"_"+(f-2)]].value];if(d>1)_=[c[s[d-1+"_"+f]].value,c[s[d-2+"_"+f]].value];for(var m=[p[0]===p[1]?p[0]:null,_[0]===_[1]?_[0]:null],h=[],g=0;g<r;g++)g!==m[0]&&g!==m[1]&&h.push(g);var v=u({row:d,col:f,selection:h,board:s});v.row+=i,v.col+=l,c[v.id]=v}return c},a=function(){var e=parseFloat(localStorage.getItem("volume")||.5),t=["Ethereal Eternity","Piano at Night","Space Harmony"],n=Math.floor(Math.random()*t.length);return["5secondsleft","congratulations","ding","gameover","gamestart","timesup"].forEach((function(e){new Audio("sfx/"+e+".mp3").preload=!0})),{playBgm:function r(){var o=t[n];o.play||((o=new Audio("music/"+o+".mp3")).onended=function(){n=n+1===t.length?0:n+1,r()},t[n]=o),o.volume=e,o.play()},pauseBgm:function(){t[n].pause&&t[n].pause()},setVolume:function(r){var o=Math.pow(2*parseFloat(r),2)/2;t[n].play&&(t[n].volume=o),e=o,localStorage.setItem("volume",o)},getVolume:function(){return Math.pow(2*e,.5)/2},playSfx:function(t){var n=new Audio("sfx/"+t+".mp3");n.volume=1.5*e,n.play()}}}},hosL:function(e,t,n){"use strict";function r(e,t){for(var n in t)e[n]=t[n];return e}function o(e){var t=e.parentNode;t&&t.removeChild(e)}function u(e,t,n){var r,o,u,a=arguments,l={};for(u in t)"key"==u?r=t[u]:"ref"==u?o=t[u]:l[u]=t[u];if(arguments.length>3)for(n=[n],u=3;u<arguments.length;u++)n.push(a[u]);if(null!=n&&(l.children=n),"function"==typeof e&&null!=e.defaultProps)for(u in e.defaultProps)void 0===l[u]&&(l[u]=e.defaultProps[u]);return i(e,l,r,o,null)}function i(e,t,n,r,o){var u={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o};return null==o&&(u.__v=u),null!=j.vnode&&j.vnode(u),u}function a(){return{current:null}}function l(e){return e.children}function c(e,t){this.props=e,this.context=t}function s(e,t){if(null==t)return e.__?s(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?s(e):null}function d(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return d(e)}}function f(e){(!e.__d&&(e.__d=!0)&&N.push(e)&&!p.__r++||D!==j.debounceRendering)&&((D=j.debounceRendering)||A)(p)}function p(){for(var e;p.__r=N.length;)e=N.sort((function(e,t){return e.__v.__b-t.__v.__b})),N=[],e.some((function(e){var t,n,o,u,i,a,l;e.__d&&(a=(i=(t=e).__v).__e,(l=t.__P)&&(n=[],(o=r({},i)).__v=o,u=S(l,i,o,t.__n,void 0!==l.ownerSVGElement,null!=i.__h?[a]:null,n,null==a?s(i):a,i.__h),P(n,i),u!=a&&d(i)))}))}function _(e,t,n,r,u,a,c,d,f,p){var _,m,g,v,y,b,w,P=r&&r.__k||I,C=P.length;for(f==B&&(f=null!=c?c[0]:C?s(r,0):null),n.__k=[],_=0;_<t.length;_++)if(null!=(v=n.__k[_]=null==(v=t[_])||"boolean"==typeof v?null:"string"==typeof v||"number"==typeof v?i(null,v,null,null,v):Array.isArray(v)?i(l,{children:v},null,null,null):null!=v.__e||null!=v.__c?i(v.type,v.props,v.key,null,v.__v):v)){if(v.__=n,v.__b=n.__b+1,null===(g=P[_])||g&&v.key==g.key&&v.type===g.type)P[_]=void 0;else for(m=0;m<C;m++){if((g=P[m])&&v.key==g.key&&v.type===g.type){P[m]=void 0;break}g=null}y=S(e,v,g=g||B,u,a,c,d,f,p),(m=v.ref)&&g.ref!=m&&(w||(w=[]),g.ref&&w.push(g.ref,null,v),w.push(m,v.__c||y,v)),null!=y?(null==b&&(b=y),f=h(e,v,g,P,c,y,f),p||"option"!=n.type?"function"==typeof n.type&&(n.__d=f):e.value=""):f&&g.__e==f&&f.parentNode!=e&&(f=s(g))}if(n.__e=b,null!=c&&"function"!=typeof n.type)for(_=c.length;_--;)null!=c[_]&&o(c[_]);for(_=C;_--;)null!=P[_]&&G(P[_],P[_]);if(w)for(_=0;_<w.length;_++)k(w[_],w[++_],w[++_])}function m(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){m(e,t)})):t.push(e)),t}function h(e,t,n,r,o,u,i){var a,l,c;if(void 0!==t.__d)a=t.__d,t.__d=void 0;else if(o==n||u!=i||null==u.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(u),a=null;else{for(l=i,c=0;(l=l.nextSibling)&&c<r.length;c+=2)if(l==u)break e;e.insertBefore(u,i),a=i}return void 0!==a?a:u.nextSibling}function g(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||V.test(t)?n:n+"px"}function v(e,t,n,r,o){var u,i,a;if(o&&"className"==t&&(t="class"),"style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||g(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||g(e.style,t,n[t])}else"o"===t[0]&&"n"===t[1]?(u=t!==(t=t.replace(/Capture$/,"")),(i=t.toLowerCase())in e&&(t=i),t=t.slice(2),e.l||(e.l={}),e.l[t+u]=n,a=u?b:y,n?r||e.addEventListener(t,a,u):e.removeEventListener(t,a,u)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&&"download"!==t&&"href"!==t&&!o&&t in e?e[t]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function y(e){this.l[e.type+!1](j.event?j.event(e):e)}function b(e){this.l[e.type+!0](j.event?j.event(e):e)}function w(e,t,n){var r,o;for(r=0;r<e.__k.length;r++)(o=e.__k[r])&&(o.__=e,o.__e&&("function"==typeof o.type&&o.__k.length>1&&w(o,t,n),t=h(n,o,o,e.__k,null,o.__e,t),"function"==typeof e.type&&(e.__d=t)))}function S(e,t,n,o,u,i,a,s,d){var f,p,m,h,g,v,y,b,S,P,k,G=t.type;if(void 0!==t.constructor)return null;null!=n.__h&&(d=n.__h,s=t.__e=n.__e,t.__h=null,i=[s]),(f=j.__b)&&f(t);try{e:if("function"==typeof G){if(b=t.props,S=(f=G.contextType)&&o[f.__c],P=f?S?S.props.value:f.__:o,n.__c?y=(p=t.__c=n.__c).__=p.__E:("prototype"in G&&G.prototype.render?t.__c=p=new G(b,P):(t.__c=p=new c(b,P),p.constructor=G,p.render=O),S&&S.sub(p),p.props=b,p.state||(p.state={}),p.context=P,p.__n=o,m=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=G.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=r({},p.__s)),r(p.__s,G.getDerivedStateFromProps(b,p.__s))),h=p.props,g=p.state,m)null==G.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==G.getDerivedStateFromProps&&b!==h&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(b,P),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(b,p.__s,P)||t.__v===n.__v){p.props=b,p.state=p.__s,t.__v!==n.__v&&(p.__d=!1),p.__v=t,t.__e=n.__e,t.__k=n.__k,p.__h.length&&a.push(p),w(t,s,e);break e}null!=p.componentWillUpdate&&p.componentWillUpdate(b,p.__s,P),null!=p.componentDidUpdate&&p.__h.push((function(){p.componentDidUpdate(h,g,v)}))}p.context=P,p.props=b,p.state=p.__s,(f=j.__r)&&f(t),p.__d=!1,p.__v=t,p.__P=e,f=p.render(p.props,p.state,p.context),p.state=p.__s,null!=p.getChildContext&&(o=r(r({},o),p.getChildContext())),m||null==p.getSnapshotBeforeUpdate||(v=p.getSnapshotBeforeUpdate(h,g)),k=null!=f&&f.type==l&&null==f.key?f.props.children:f,_(e,Array.isArray(k)?k:[k],t,n,o,u,i,a,s,d),p.base=t.__e,t.__h=null,p.__h.length&&a.push(p),y&&(p.__E=p.__=null),p.__e=!1}else null==i&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=C(n.__e,t,n,o,u,i,a,d);(f=j.diffed)&&f(t)}catch(e){t.__v=null,(d||null!=i)&&(t.__e=s,t.__h=!!d,i[i.indexOf(s)]=null),j.__e(e,t,n)}return t.__e}function P(e,t){j.__c&&j.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){j.__e(e,t.__v)}}))}function C(e,t,n,r,o,u,i,a){var l,c,s,d,f,p=n.props,m=t.props;if(o="svg"===t.type||o,null!=u)for(l=0;l<u.length;l++)if(null!=(c=u[l])&&((null===t.type?3===c.nodeType:c.localName===t.type)||e==c)){e=c,u[l]=null;break}if(null==e){if(null===t.type)return document.createTextNode(m);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,m.is&&{is:m.is}),u=null,a=!1}if(null===t.type)p===m||a&&e.data===m||(e.data=m);else{if(null!=u&&(u=I.slice.call(e.childNodes)),s=(p=n.props||B).dangerouslySetInnerHTML,d=m.dangerouslySetInnerHTML,!a){if(null!=u)for(p={},f=0;f<e.attributes.length;f++)p[e.attributes[f].name]=e.attributes[f].value;(d||s)&&(d&&(s&&d.__html==s.__html||d.__html===e.innerHTML)||(e.innerHTML=d&&d.__html||""))}(function(e,t,n,r,o){var u;for(u in n)"children"===u||"key"===u||u in t||v(e,u,null,n[u],r);for(u in t)o&&"function"!=typeof t[u]||"children"===u||"key"===u||"value"===u||"checked"===u||n[u]===t[u]||v(e,u,t[u],n[u],r)})(e,m,p,o,a),d?t.__k=[]:(l=t.props.children,_(e,Array.isArray(l)?l:[l],t,n,r,"foreignObject"!==t.type&&o,u,i,B,a)),a||("value"in m&&void 0!==(l=m.value)&&(l!==e.value||"progress"===t.type&&!l)&&v(e,"value",l,p.value,!1),"checked"in m&&void 0!==(l=m.checked)&&l!==e.checked&&v(e,"checked",l,p.checked,!1))}return e}function k(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){j.__e(e,n)}}function G(e,t,n){var r,u,i;if(j.unmount&&j.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||k(r,null,t)),n||"function"==typeof e.type||(n=null!=(u=e.__e)),e.__e=e.__d=void 0,null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){j.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&G(r[i],t,n);null!=u&&o(u)}function O(e,t,n){return this.constructor(e,n)}function T(e,t,n){var r,o,i;j.__&&j.__(e,t),o=(r=n===U)?null:n&&n.__k||t.__k,e=u(l,null,[e]),i=[],S(t,(r?t:n||t).__k=e,o||B,B,void 0!==t.ownerSVGElement,n&&!r?[n]:o?null:t.childNodes.length?I.slice.call(t.childNodes):null,i,n||B,r),P(i,e)}function M(e,t){T(e,t,U)}function x(e,t,n){var o,u,a,l=arguments,c=r({},e.props);for(a in t)"key"==a?o=t[a]:"ref"==a?u=t[a]:c[a]=t[a];if(arguments.length>3)for(n=[n],a=3;a<arguments.length;a++)n.push(l[a]);return null!=n&&(c.children=n),i(e.type,c,o||e.key,u||e.ref,null)}function E(e,t){var n={__c:t="__cC"+F++,__:e,Consumer:function(e,t){return e.children(t)},Provider:function(e,n,r){return this.getChildContext||(n=[],(r={})[t]=this,this.getChildContext=function(){return r},this.shouldComponentUpdate=function(e){this.props.value!==e.value&&n.some(f)},this.sub=function(e){n.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){n.splice(n.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Provider.__=n.Consumer.contextType=n}n.r(t),n.d(t,"render",(function(){return T})),n.d(t,"hydrate",(function(){return M})),n.d(t,"createElement",(function(){return u})),n.d(t,"h",(function(){return u})),n.d(t,"Fragment",(function(){return l})),n.d(t,"createRef",(function(){return a})),n.d(t,"isValidElement",(function(){return L})),n.d(t,"Component",(function(){return c})),n.d(t,"cloneElement",(function(){return x})),n.d(t,"createContext",(function(){return E})),n.d(t,"toChildArray",(function(){return m})),n.d(t,"__u",(function(){return G})),n.d(t,"options",(function(){return j}));var j,L,N,A,D,U,F,B={},I=[],V=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;j={__e:function(e,t){for(var n,r,o,u=t.__h;t=t.__;)if((n=t.__c)&&!n.__)try{if((r=n.constructor)&&null!=r.getDerivedStateFromError&&(n.setState(r.getDerivedStateFromError(e)),o=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),o=n.__d),o)return t.__h=u,n.__E=n}catch(t){e=t}throw e}},L=function(e){return null!=e&&void 0===e.constructor},c.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=r({},this.state),"function"==typeof e&&(e=e(r({},n),this.props)),e&&r(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),f(this))},c.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),f(this))},c.prototype.render=l,N=[],A="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,p.__r=0,U=B,F=0},iGFZ:function(e,t,n){"use strict";function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return l}));var i=function(e,t){void 0===e&&(e={}),void 0===t&&(t={});var n=t.data;switch(t.type){case"set":var r={},u=[];return Object.keys(n).forEach((function(e){var t=n[e];r[t.row+"_"+t.col]=t.id,u.push(t.id)})),o(o({},t.data),{},{board:r,gemsKeys:u});case"update":return Object.keys(n).forEach((function(t){var r=n[t];if(void 0===e[t]&&t.indexOf("gem-")>-1)return e.board[r.row+"_"+r.col]=r.id,e.gemsKeys.push(r.id),void(e[t]=r);null!=r.row&&null!=r.col&&(e[t].row=r.row,e[t].col=r.col,e.board[r.row+"_"+r.col]=t),r.destroyed&&(e[t].destroyed=r.destroyed)})),o({},e);case"cleanup":return e.gemsKeys.forEach((function(t){e[t]&&e[t].destroyed&&delete e[t]})),Object.keys(e.board).forEach((function(t){t.indexOf("-")>-1&&delete e.board[t]})),e.gemsKeys=e.gemsKeys.filter((function(t){return e[t]})),o({},e);default:throw new Error}},a=function(e,t){switch(void 0===e&&(e=0),void 0===t&&(t={}),t.type){case"increment":return e+t.value;case"reset":return 0;default:return e}},l=function(e,t){switch(void 0===e&&(e={}),void 0===t&&(t={}),t.type){case"increment":return{match3:(e.match3||0)+(t.data.match3||0),match4:(e.match4||0)+(t.data.match4||0),match5:(e.match5||0)+(t.data.match5||0)};case"reset":default:return{}}}},l9WX:function(e,t,n){"use strict";(function(e){n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return c}));var r=n("mOVH"),o=function(e){return((e||0)/1e3).toFixed(1)},u=function(e){return e.toLocaleString("en-us")},i=function(t){var n=t.handleChangePage,r=t.targetScore,o=t.timeLimit;return function(){return e("section",{id:"intro"},e("div",null,e("h1",null,"Intro"),e("p",null,"Greetings! You were exploring a nice planet when aliens boarded your ship!"),e("p",null,"After a chain of bizarre events, you now find yourself in a situation where you have"," ",e("b",null,o/1e3," seconds "),"to ",e("b",null,"score ",u(r)," points")," in a tile-matching game over relaxing ambient music if you want to save your ship and crew."),e("button",{onClick:function(){return n("newPlayingPage")}},"Start Game")))}},a=function(t){var n=t.timeLimit,i=t.getRemainingTime,a=t.handleGemMouseDown,l=t.handleGemMouseEnter,c=t.handleTouchMove,s=t.setSelectedGem,d=t.handleChangePage;return function(t){var f=t.gems,p=t.score,_=i(),m=f.gemsKeys.map((function(t,o,u){var i=u[u.length-1-o];if(!f[i])return null;var c=f[i],s=c.value,d=c.destroyed,p={transform:"translate3d("+100*c.col+"%, "+100*c.row+"%, 0)"};return _===n&&(p.transitionDelay=o*r.a/1e3+"s"),d&&(p.transform+=" scale(0)"),e("span",{id:i,className:"gem",key:i,style:p,onMouseDown:function(){return a(i)},onMouseEnter:function(){return l(i)},onTouchStart:function(){return a(i)},"data-value":s},s)})),h=_<5e3,g=o(_).split(".");return e("section",{id:"game"},e("div",{className:"top-bar"},e("span",{className:"score"},"Score ",e("b",null,u(p))),e("span",{className:"menu"},e("button",{onClick:function(){return d("menuPage")}},"Menu")),e("span",{className:"time",style:{color:h?"red":""}},"Time"," ",e("b",null,g[0],e("small",null,g[1])))),e("div",{className:"board",onMouseUp:function(){return s(null)},onMouseLeave:function(){return s(null)},onTouchMove:c},m),e("div",{className:"start",style:{opacity:_+1e3>n&&_<n?"":"0"}},"Start!"),e("div",{className:"times-up",style:{display:_?"none":""}},"Time's up!"))}},l=function(t){var n=t.handleChangePage,r=t.targetScore,i=t.getRemainingTime,a=t.isWin,l=t.getBgmVolume,c=t.setBgmVolume;return function(t){var s=t.score,d=t.highscore,f=t.stats,p=i(),_=a();return e("section",{id:"menu"},e("div",null,e("h1",null,null===_?"Game Paused":_?"Congratulations!":"You lost"),e("div",{className:"button-container"},null===_&&e("button",{onClick:function(){return n("playingPage")}},"Resume Game"),e("button",{onClick:function(){return n("newPlayingPage")}},"New Game")),null===_&&e("div",null,"Time Left: ",e("b",null,o(p),"s")),e("div",null,"Target Score: ",e("b",null,u(r))),e("div",null,"Your Score: ",e("b",null,u(s))),e("div",null,"High Score: ",e("b",null,u(d))),e("div",{className:"stats-container"},e("b",null,"Stats This Round:"),e("div",null,"3 of a Kind: ",f.match3||0),e("div",null,"4 of a Kind: ",f.match4||0),e("div",null,"5 of a Kind: ",f.match5||0)),e("div",null,"Volume:",e("input",{type:"range",value:l(),onInput:function(e){return c(e.target.value)},min:"0",max:"0.5",step:"0.025"})),e("div",{className:"button-container"},e("button",{onClick:function(){return n("creditsPage")}},"Credits"))))}},c=function(t){var n=t.handleChangePage;return function(){return e("section",{id:"credits"},e("div",null,e("h1",null,"Credits"),e("ul",null,e("li",null,'The music "Ethereal Eternity", "Piano at Night" and "Space Harmony" by'," ",e("a",{href:"https://www.purple-planet.com/",target:"_blank",rel:"noopener noreferrer"},"Purple Planet Music")," ","used under the"," ",e("a",{href:"https://creativecommons.org/licenses/by/3.0/",target:"_blank",rel:"noopener noreferrer"},"Creative Commons Attribution License 3.0"),"."),e("li",null,'The background image "Beast Landscape Space" by'," ",e("a",{href:"https://pixabay.com/users/8385-8385/",target:"_blank",rel:"noopener noreferrer"},"Reimund Bertrams")," ","used under the"," ",e("a",{href:"https://pixabay.com/service/license/",target:"_blank",rel:"noopener noreferrer"},"Pixabay License"),".")),e("div",{className:"button-container"},e("button",{onClick:function(){return n("menuPage")}},"Back to Menu"))))}}}).call(this,n("hosL").h)},mOVH:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return u}));var r=150,o=35,u=1500},mc2X:function(e,t,n){"use strict";n.d(t,"h",(function(){return u})),n.d(t,"g",(function(){return i})),n.d(t,"i",(function(){return a})),n.d(t,"d",(function(){return l})),n.d(t,"b",(function(){return c})),n.d(t,"f",(function(){return s})),n.d(t,"c",(function(){return d})),n.d(t,"a",(function(){return f})),n.d(t,"e",(function(){return p}));var r=n("cU0k"),o=n("mOVH"),u=function(e){var t=e.rowCount,n=e.colCount,u=e.typeCount,i=e.dispatchGems,a=e.setStep,l=e.startCountDown,c=e.soundManager;return function(){i({type:"update",data:Object(r.a)({rowCount:t,colCount:n,typeCount:u,rowOffset:-t})}),a("create"),setTimeout((function(){c.playSfx("gamestart"),requestAnimationFrame(l)}),o.c+o.a*t*n)}},i=function(e){var t=e.timeLimit,n=e.setRemainingTime,r=e.setTotalElapsed,o=e.setLastTimestamp,u=e.getPage,i=e.getTotalElapsed,a=e.getLastTimestamp,l=e.soundManager,c=!1,s=function e(){var s=a(),d=i();if(!(d&&d>=t)){if("playingPage"!==u())return o(null);var f=performance.now();d||s||(c=!1),d||(d=0),s||(s=f),d+=f-s,s=f;var p=Math.max(t-d,0);!c&&p<=5500&&(l.playSfx("5secondsleft"),c=!0),r(d),o(s),n(p,(function(){return requestAnimationFrame(e)}))}};return function(){return requestAnimationFrame(s)}},a=function(e){var t=e.getGem,n=e.setStep,r=e.dispatchGems,o=e.setUndo;return function(e,u,i){var a,l=t(e),c=t(u);r({type:"update",data:(a={},a[e]={row:c.row,col:c.col},a[u]={row:l.row,col:l.col},a)}),i&&o(null),n(i?"unswap":"swap")}},l=function(e){var t=e.getGemFromBoard,n=e.rowCount,r=e.colCount;return function(){for(var e=[],o=0;o<2;o++)for(var u=0;u<(0===o?n:r);u++){for(var i=[],a=null,l=0;l<(0===o?r:n);l++){var c=t(0===o?u:l,0===o?l:u);c.value!==a||c.destroyed?i.push([c.id]):i[i.length-1].push(c.id),a=c?c.value:null}i.forEach((function(t){t.length>=3&&e.push(t)}))}return e}},c=function(e){var t=e.setStep,n=e.dispatchScore,r=e.dispatchGems,o=e.dispatchStats,u=e.soundManager;return function(e){var i={},a={match3:0,match4:0,match5:0},l=0;e.forEach((function(e){l+=(e.length-2)*e.length*100,a["match"+e.length]+=1,e.forEach((function(e){i[e]={destroyed:!0}}))})),n({type:"increment",value:l}),r({type:"update",data:i}),o({type:"increment",data:a}),u.playSfx("ding"),t("destroy")}},s=function(e){var t=e.getGemFromBoard,n=e.setStep,o=e.dispatchGems,u=e.rowCount,i=e.colCount,a=e.typeCount;return function(){for(var e={},l=0;l<i;l++)for(var c=0,s=u-1;s>=0;s--){var d=t(s,l);if(!d||d.destroyed){c+=1;var f=Object(r.b)({row:-1*c,col:l,selection:a});e[f.id]=f}}o({type:"update",data:e}),n("create")}},d=function(e){var t=e.getGemFromBoard,n=e.setStep,r=e.dispatchGems,o=e.rowCount,u=e.colCount;return function(){for(var e={},i=0;i<u;i++)for(var a=0,l=o,c=o-1;l>0;c--){var s=t(c,i);s&&!s.destroyed?(a>0&&(e[s.id]={row:s.row+a,col:s.col}),l-=1):a+=1}r({type:"update",data:e}),n("drop")}},f=function(e){var t=e.dispatchGems;return function(){t({type:"cleanup"})}},p=function(e){var t=e.getStep,n=e.setStep,r=e.startGame,o=e.findMatches,u=e.swapGems,i=e.getUndo,a=e.destroyGems,l=e.replaceDestroyedGems,c=e.dropGems,s=e.cleanupGems;return function(){var e=t(),d=i();if("starting"===e)return r();"drop"===e&&s();var f=[];return"swap"!==e&&"drop"!==e||(f=o()),"swap"===e&&0===f.length&&d?u(d.firstGemId,d.secondGemId,!0):0!==f.length?a(f):"destroy"===e?l():"create"===e?c():void n("default")}}},mdyV:function(e,t,n){"use strict";n.r(t);var r=n("hosL"),o=r.h,u=r.render,i=function(e){return e&&e.default?e.default:e};if("function"==typeof i(n("QfWi"))){var a=document.getElementById("preact_root")||document.body.firstElementChild;0,function(){var e=i(n("QfWi")),t={},r=document.querySelector('[type="__PREACT_CLI_DATA__"]');r&&(t=JSON.parse(decodeURI(r.innerHTML)).preRenderData||t);var l;t.url&&(l=t.url);a=u(o(e,{CLI_DATA:{preRenderData:t}}),document.body,a)}()}},pyAK:function(){}});
//# sourceMappingURL=bundle.44bcc.js.map