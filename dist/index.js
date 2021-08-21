/*! @yfill/loader v1.0.4 | Sat, 21 Aug 2021 16:28:56 GMT | https://yfill.cn/loader */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Loader=t()}(this,(function(){"use strict";function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function t(t){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?e(Object(o),!0).forEach((function(e){n(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}(e,t)||i(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var c="https://cdn.jsdelivr.net/npm",u={registry:c,enableSuffix:!1,versionHandling:!1,crossOrigin:void 0,prefetch:!0,libAliasMap:{}},l=/^((https|http):)?\/\//,s=function(e,t,n,o){var i=e.registry,a=e.versionHandling,c=r("".concat(t).split(/(?!^@)+@/),2),u=c[0],s=c[1],d=void 0===s?"index":s,f=n||(a?"".concat(u,"/").concat(d).concat(o):"".concat(t).concat(o));return l.test(f)?f:"".concat("/"==="".concat(i||"").slice(-1)?i:"".concat(i||"","/")).concat(f)},d=function(e){return{}.toString.call(e).slice(8,-1).toLowerCase()},f=function(e){return"array"===d(e)},p=function(e){return"function"===d(e)};function y(e,t){!function(e,t,n,r){if(!e(t))throw new TypeError(r||"".concat(t," is not a ").concat(n))}(p,e,"function",t)}var v,h=function(e,t){var n=document.createElement("link");n.href=t,n.rel="prefetch",n.setAttribute("prefetch-name",e),document.head.appendChild(n)},m=function e(t,n){var o=t.enableSuffix,i=t.libAliasMap,a="string"==typeof n?{name:n}:n,c=a.name,u=a.style,l=void 0!==u&&u,d=a.deps,p=void 0===d?[]:d,y=a.scriptAlias,v=void 0===y?"":y,m=a.styleAlias,b=void 0===m?"":m;if(!document.head.querySelector('link[prefetch-name="'.concat(c,'"]'))){var g=r((i||{})[c]||[],3),j=g[0],w=g[1],A=g[2],M=s(t,c,v||j,o?".js":"");if(l||b||w){var O=s(t,c,b||w,".css");h(c,O)}(f(p)&&p.length&&p||f(A)&&A.length&&A||[]).forEach((function(n){return e(t,n)})),h(c,M)}},b=function(e,t){t.forEach((function(t){return m(e,t)}))},g={exports:{}},j={},w={},A={},M=function(){return{LoadedMap:g,LoadStatusMap:j,ResolveMap:w,RejectMap:A,LoadedObj:v}},O=function(e){v=e},S=function(e,t,n,i,a){var u=M(),s=u.LoadedMap,d=u.LoadStatusMap,p=u.ResolveMap,v=u.RejectMap,h=u.LoadedObj||{},m=h.deps,b=h.factory,g=null==t?void 0:t.registry,j=!(l.test(e)||g&&g!==c);try{var w=r("".concat(e).split(/(?!^@)+@/),2),A=w[0],S=w[1];y(b,"the library(".concat(e,") does not point to umd or amd resources by default, you can point to the correct resource by setting scriptAlias").concat(j?", you can go to the website(https://www.jsdelivr.com/package/npm/".concat(A,"?version=").concat(S||"",") to find the corresponding resources"):""))}catch(e){return void a(e)}var P=function(t){var n=b.apply(void 0,o(t))||s.exports;b.length>t.length&&function(){var e;(e=console).warn.apply(e,arguments)}("the library that the library depends on may not be injected correctly, please check whether deps is correctly declared"),s.exports={},s[e]=n,d[e]="loaded",(p[e]||[]).forEach((function(e){return e(n)})),O(void 0),delete p[e],delete v[e],i(n)};n.length>0||!f(m)||!m.length?P(n):x(t,m).then((function(e){return P(e)}))},P=function(e,t,n,r,o){return new Promise((function(i,a){var c=M(),u=c.LoadedMap,l=c.LoadStatusMap,s=c.ResolveMap,d=c.RejectMap;if(u[e])i(u[e]);else{if(document.head.querySelector('script[name="'.concat(e,'"]'))){var f=s[e]||[],p=d[e]||[];return f.push(i),p.push(a),s[e]=f,void(d[e]=p)}l[e]="loading";var y=document.createElement("script");void 0!==r&&(y.crossOrigin=r),y.src=n,y.async=!0,y.setAttribute("name",e),y.onload=function(){return S(e,t,o,i,a)},y.onerror=function(t){return function(e,t){var n=M(),r=n.LoadStatusMap,o=n.ResolveMap,i=n.RejectMap,a=new Error("".concat(e," load failed"));r[e]="loadFailed",t(a),(i[e]||[]).forEach((function(e){return e(a)})),O(void 0),delete o[e],delete i[e]}(e,a)},document.head.appendChild(y)}}))},E=function e(t,n){var o=t.enableSuffix,i=t.crossOrigin,a=t.libAliasMap,c="string"==typeof n?{name:n}:n,u=c.name,l=c.style,d=void 0!==l&&l,p=c.deps,y=void 0===p?[]:p,v=c.scriptAlias,h=void 0===v?"":v,m=c.styleAlias,b=void 0===m?"":m,g=r((a||{})[u]||[],3),j=g[0],w=g[1],A=g[2],M=s(t,u,h||j,o?".js":"");(d||b||w)&&function(e,t){if(!document.head.querySelector('link[name="'.concat(t,'"]'))){var n=document.createElement("link");n.href=e,n.rel="stylesheet",n.type="text/css",n.setAttribute("name",t),document.head.appendChild(n)}}(s(t,u,b||w,".css"),u);var O=f(y)&&y.length&&y||f(A)&&A.length&&A||[];return Promise.all(O.map((function(n){return e(t,n)}))).then((function(e){return P(u,t,M,i,e)}))},L=function(e){!function(e){var t,n=M(),r=n.LoadedMap,o=n.LoadStatusMap,i=document.head.querySelector('script[name="'.concat(e,'"]'));null==i||null===(t=i.parentNode)||void 0===t||t.removeChild(i),delete r[e],delete o[e]}(e),function(e){var t,n=document.head.querySelector('link[name="'.concat(e,'"]'));null==n||null===(t=n.parentNode)||void 0===t||t.removeChild(n)}(e)},x=function(e,t){return Promise.all(t.map((function(t){return E(e,t)})))};function C(e,t){var n=d(t);return f(t)?x(e,t):{object:!0,string:!0}[n]?E(e,t):Promise.resolve()}function k(e){return f(e)?void e.forEach((function(e){return L(e)})):L(e)}function R(e){var n=e||{},r=n.registry,o=n.libAliasMap,i=!r||r===c,a=t(t(t({},u),{},{enableSuffix:!i,versionHandling:!i},null!=e?e:{}),{},{libAliasMap:t(t({},u.libAliasMap),o||{})});function l(e){return C(a,e)}return function(e){var t=e.registry||c;if(!document.head.querySelector('[dns-prefetch="'.concat(t,'"]'))){var n=document.createElement("link");n.rel="dns-prefetch",n.href=t,n.setAttribute("dns-prefetch",t),document.head.appendChild(n)}}(a),function(e){var t=e.prefetch,n=e.libAliasMap;if(t){var r=Object.keys(n||{});b(e,r)}}(a),l.options=a,l.install=function(e){M().LoadedMap.vue=e,e.mixin({beforeCreate:function(){this.$loader=l}})},l.load=l,l.unload=k,l.vueComponentLoad=function(e){return function(e,n){return function(){return Promise.resolve(C(t(t({},e),{},{registry:e.vueComponentRegistry||e.registry,vueComponentRegistry:void 0}),n))}}(a,e)},l}return function(){if("undefined"==typeof Promise)throw new Error("Promise is a dependency of Loader, but Promise does not exist")}(),function(){function e(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t.slice(-1)[0],o=[void 0].concat(t).slice(-2)[0];O({deps:o,factory:r})}e.amd={},window.define=e}(),R.create=function(e){return R(e)},R}));
