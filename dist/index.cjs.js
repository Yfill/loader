/*! @yfill/loader v1.0.1 | Sun, 10 Jan 2021 11:38:25 GMT | https://yfill.cn/loader */
"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function n(n){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?t(Object(o),!0).forEach((function(t){e(n,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(o,e))}))}return n}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||a(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var c="https://cdn.jsdelivr.net/npm",u={registry:c,enableSuffix:!1,versionHandling:!1,crossOrigin:void 0,prefetch:!0,libAliasMap:{}},l=/^((https|http|ftp|rtsp|mms):)?\/\//,s=function(e,t,n,o){var a=e.registry,i=e.versionHandling,c=r("".concat(t).split(/(?!^@)+@/),2),u=c[0],s=c[1],d=void 0===s?"index":s,f=n||(i?"".concat(u,"/").concat(d).concat(o):"".concat(t).concat(o));return l.test(f)?f:"".concat("/"==="".concat(a||"").slice(-1)?a:"".concat(a||"","/")).concat(f)},d=function(e){return{}.toString.call(e).slice(8,-1).toLowerCase()},f=function(e){return"array"===d(e)},p=function(e){return"function"===d(e)};function v(e,t){!function(e,t,n,r){if(!e(t))throw new TypeError(r||"".concat(t," is not a ").concat(n))}(p,e,"function",t)}var y,m=function(e,t){var n=document.createElement("link");n.href=t,n.rel="prefetch",n.setAttribute("prefetch-name",e),document.head.appendChild(n)},h=function e(t,n){var o=t.enableSuffix,a=t.libAliasMap,i="string"==typeof n?{name:n}:n,c=i.name,u=i.style,l=void 0!==u&&u,d=i.deps,p=void 0===d?[]:d,v=i.nameAlias,y=void 0===v?"":v,h=i.styleAlias,b=void 0===h?"":h;if(!document.head.querySelector('link[prefetch-name="'.concat(c,'"]'))){var g=r((a||{})[c]||[],3),j=g[0],w=g[1],O=g[2],S=s(t,c,y||j,o?".js":"");if(l||b||w){var A=s(t,c,b||w,".css");m(c,A)}(f(p)&&p.length&&p||f(O)&&O.length&&O||[]).forEach((function(n){return e(t,n)})),m(c,S)}},b=function(e,t){t.forEach((function(t){return h(e,t)}))},g={exports:{}},j={},w={},O={},S=function(){return{LoadedMap:g,LoadStatusMap:j,ResolveMap:w,RejectMap:O,LoadedObj:y}},A=function(e){y=e},M=function(e,t,n,r,a){var i=S(),u=i.LoadedMap,s=i.LoadStatusMap,d=i.ResolveMap,p=i.RejectMap,y=i.LoadedObj||{},m=y.deps,h=y.factory,b=null==t?void 0:t.registry,g=!(l.test(e)||b&&b!==c);try{v(h,"the library(".concat(e,") does not point to umd or amd resources by default, you can point to the correct resource by setting nameAlias").concat(g?", you can go to the website(https://www.jsdelivr.com/package/npm/".concat(e,") to find the corresponding resources"):""))}catch(e){return void a(e)}var j=function(t){var n=h.apply(void 0,o(t))||u.exports;h.length>t.length&&function(){var e;(e=console).warn.apply(e,arguments)}("The library that the library depends on may not be injected correctly, please check whether deps is correctly declared"),u.exports={},u[e]=n,s[e]="loaded",(d[e]||[]).forEach((function(e){return e(n)})),A(void 0),delete d[e],delete p[e],r(n)};n.length>0||!f(m)||!m.length?j(n):x(t,m).then((function(e){return j(e)}))},E=function(e,t,n,r,o){return new Promise((function(a,i){var c=S(),u=c.LoadedMap,l=c.LoadStatusMap,s=c.ResolveMap,d=c.RejectMap;if(u[e])a(u[e]);else{if(document.head.querySelector('script[name="'.concat(e,'"]'))){var f=s[e]||[],p=d[e]||[];return f.push(a),p.push(i),s[e]=f,void(d[e]=p)}l[e]="loading";var v=document.createElement("script");void 0!==r&&(v.crossOrigin=r),v.src=n,v.async=!0,v.setAttribute("name",e),v.onload=function(){return M(e,t,o,a,i)},v.onerror=function(t){return function(e,t){var n=S(),r=n.LoadStatusMap,o=n.ResolveMap,a=n.RejectMap,i=new Error("".concat(e," load failed"));r[e]="loadFailed",t(i),(a[e]||[]).forEach((function(e){return e(i)})),A(void 0),delete o[e],delete a[e]}(e,i)},document.head.appendChild(v)}}))},P=function e(t,n){var o=t.enableSuffix,a=t.crossOrigin,i=t.libAliasMap,c="string"==typeof n?{name:n}:n,u=c.name,l=c.style,d=void 0!==l&&l,p=c.deps,v=void 0===p?[]:p,y=c.nameAlias,m=void 0===y?"":y,h=c.styleAlias,b=void 0===h?"":h,g=r((i||{})[u]||[],3),j=g[0],w=g[1],O=g[2],S=s(t,u,m||j,o?".js":"");(d||b||w)&&function(e,t){if(!document.head.querySelector('link[name="'.concat(t,'"]'))){var n=document.createElement("link");n.href=e,n.rel="stylesheet",n.type="text/css",n.setAttribute("name",t),document.head.appendChild(n)}}(s(t,u,b||w,".css"),u);var A=f(v)&&v.length&&v||f(O)&&O.length&&O||[];return Promise.all(A.map((function(n){return e(t,n)}))).then((function(e){return E(u,t,S,a,e)}))},L=function(e){!function(e){var t,n=S(),r=n.LoadedMap,o=n.LoadStatusMap,a=document.head.querySelector('script[name="'.concat(e,'"]'));null==a||null===(t=a.parentNode)||void 0===t||t.removeChild(a),delete r[e],delete o[e]}(e),function(e){var t,n=document.head.querySelector('link[name="'.concat(e,'"]'));null==n||null===(t=n.parentNode)||void 0===t||t.removeChild(n)}(e)},x=function(e,t){return Promise.all(t.map((function(t){return P(e,t)})))};function C(e,t){var n=d(t);return f(t)?x(e,t):{object:!0,string:!0}[n]?P(e,t):Promise.resolve()}function k(e){return f(e)?void e.forEach((function(e){return L(e)})):L(e)}function R(e){var t=e||{},r=t.registry,o=t.libAliasMap,a=!r||r===c,i=n(n(n({},u),{},{enableSuffix:!a,versionHandling:!a},null!=e?e:{}),{},{libAliasMap:n(n({},u.libAliasMap),o||{})});function l(e){return C(i,e)}return function(e){var t=e.registry||c;if(!document.head.querySelector('[dns-prefetch="'.concat(t,'"]'))){var n=document.createElement("link");n.rel="dns-prefetch",n.href=t,n.setAttribute("dns-prefetch",t),document.head.appendChild(n)}}(i),function(e){var t=e.prefetch,n=e.libAliasMap;if(t){var r=Object.keys(n||{});b(e,r)}}(i),l.options=i,l.install=function(e){S().LoadedMap.vue=e,e.mixin({beforeCreate:function(){this.$loader=l}})},l.load=l,l.unload=k,l.vueComponentLoad=function(e){return function(e,t){return function(){return Promise.resolve(C(n(n({},e),{},{registry:e.vueComponentRegistry||e.registry,vueComponentRegistry:void 0}),t))}}(i,e)},l}!function(){if("undefined"==typeof Promise)throw new Error("promise is a dependency of Loader, but Promise does not exist")}(),function(){function e(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t.slice(-1)[0],o=[void 0].concat(t).slice(-2)[0];A({deps:o,factory:r})}e.amd={},window.define=e}(),R.create=function(e){return R(e)};var q=R;module.exports=q;