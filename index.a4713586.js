!function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){},,function(e,t,r){"use strict";r.r(t);r(0);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],a=!0,n=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(a=(l=c.next()).done)&&(r.push(l.value),!t||r.length!==t);a=!0);}catch(e){n=!0,o=e}finally{try{a||null==c.return||c.return()}finally{if(n)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("service-worker.js").then((function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}),(function(e){console.log("ServiceWorker registration failed: ",e)}))}));var o,l,c=document.querySelector(".app__goal"),s=document.querySelector(".app__goal--achieved"),i=document.querySelector(".glass__remove-button--js"),u=document.querySelector(".glass__add-button--js"),d=document.querySelector(".glass__counter--js"),y=document.querySelector(".glass__water--js"),f=document.querySelector(".glass__capacity--js"),p=document.querySelector(".glass-capacity--js"),g=document.querySelector(".select-goal--js"),v=(new Date).toISOString().slice(0,10),S=function(){var e=parseFloat(localStorage.getItem("goal"))||1.5,t=parseFloat(localStorage.getItem("glassCapacity"))||.25;return[e,t,parseFloat(e/t),parseInt(localStorage.getItem(v),10)||0]},m=a(S(),4),_=m[0],w=m[1],b=m[2],h=m[3],j=function(){var e=parseInt(d.innerHTML,10)<h;d.innerHTML=h,s.classList.remove("app__goal--achieved--animated"),d.classList.remove("glass__counter--dark"),d.classList.remove("glass__counter--animated"),y.classList.remove("glass__water--animated"),d.offsetWidth,d.classList.add("glass__counter--animated"),h>=b&&s.classList.add("app__goal--achieved--animated");var t=h/b;t<.6?(y.style.setProperty("--waterStartScaleX","0.8"),y.style.setProperty("--waterEndScaleX","0.8")):t<.7?(y.style.setProperty("--waterStartScaleX",e?"0.8":"0.9"),y.style.setProperty("--waterEndScaleX",e?"0.9":"0.8")):t<.9?(y.style.setProperty("--waterStartScaleX",e?"0.9":"1"),y.style.setProperty("--waterEndScaleX",e?"1":"0.9")):(y.style.setProperty("--waterStartScaleX","1"),y.style.setProperty("--waterEndScaleX","1"));var r=parseFloat(getComputedStyle(y).getPropertyValue("--waterEndScaleY"))||0,a=t;a>1&&(a=1),r===a&&1===r?(y.style.setProperty("--waterStartScaleY","0"),y.style.setProperty("--waterEndScaleY","1")):(y.style.setProperty("--waterStartScaleY","".concat(r)),y.style.setProperty("--waterEndScaleY","".concat(a))),a<.75&&d.classList.add("glass__counter--dark"),y.classList.add("glass__water--animated")},L=function(){localStorage.setItem(v,h)},P=function(){c.innerHTML="".concat(parseFloat(b.toFixed(2)).toString())},E=function(){f.innerHTML="".concat(1e3*w," ml")};(o=p.querySelector("[value='"+w+"'"))&&(o.selected=!0),function(){var e=1,t=0;do{t=.25*e;var r=document.createElement("option");r.value=t,r.text="".concat(t," l"),g.add(r),e++}while(t<5)}(),(l=g.querySelector("[value='"+_+"'"))&&(l.selected=!0),P(),E(),j(),i.addEventListener("click",(function(){h>0&&(h--,j(),L())})),u.addEventListener("click",(function(){h++,j(),L()})),p.addEventListener("change",(function(){var e=p.options[p.selectedIndex].value;localStorage.setItem("glassCapacity",e);var t=a(S(),4);_=t[0],w=t[1],b=t[2],h=t[3],E(),P()})),g.addEventListener("change",(function(){var e=g.options[g.selectedIndex].value;localStorage.setItem("goal",e);var t=a(S(),4);_=t[0],w=t[1],b=t[2],h=t[3],P(),s.classList.remove("app__goal--achieved--animated")}))}]);