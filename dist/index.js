/*! @yfill/loader v1.0.10 | Sun, 10 Apr 2022 10:47:33 GMT | https://yfill.cn/loader */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Loader=t()}(this,(function(){"use strict";function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function t(t){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?e(Object(o),!0).forEach((function(e){n(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,a=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw o}}return a}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||a(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var c="https://cdn.jsdelivr.net/npm",u={registry:c,enableSuffix:!1,versionHandling:!1,crossOrigin:void 0,prefetch:!0,libAliasMap:{}},l=/^((https|http|file):)?\/\//,d=function(e,t,n,o){var a=e.registry,i=e.versionHandling,c=r("".concat(t).split(/(?!^@)+@/),2),u=c[0],d=c[1],f=void 0===d?"index":d,s=n||(i?"".concat(u,"/").concat(f).concat(o):"".concat(t).concat(o));return l.test(s)?s:"".concat("/"==="".concat(a||"").slice(-1)?a:"".concat(a||"","/")).concat(s)},f=function(e){return{}.toString.call(e).slice(8,-1).toLowerCase()},s=function(e){return"array"===f(e)},p=function(e){return"function"===f(e)};function v(e,t){!function(e,t,n,r){if(!e(t))throw new TypeError(r||"".concat(t," is not a ").concat(n))}(p,e,"function",t)}var y,h=function(e,t){var n=document.createElement("link");n.href=t,n.rel="prefetch",n.setAttribute("prefetch-name",e),document.head.appendChild(n)},m=function e(t,n){var o=t.enableSuffix,a=t.libAliasMap,i="string"==typeof n?{name:n}:n,c=i.name,u=i.style,l=void 0!==u&&u,f=i.deps,p=void 0===f?[]:f,v=i.scriptAlias,y=void 0===v?"":v,m=i.styleAlias,b=void 0===m?"":m;if(!document.head.querySelector('link[prefetch-name="'.concat(c,'"]'))){var g=r((a||{})[c]||[],3),M=g[0],j=g[1],w=g[2],O=d(t,c,y||M,o?".js":"");if(l||b||j){var S=d(t,c,b||j,".css");h(c,S)}(s(p)&&p.length&&p||s(w)&&w.length&&w||[]).forEach((function(n){return e(t,n)})),h(c,O)}},b=function(e,t){t.forEach((function(t){return m(e,t)}))},g=function(){var e;return(e=console).warn.apply(e,arguments)},M={exports:{}},j={},w={},O={},S=function(){return{LoadedMap:M,LoadStatusMap:j,ResolveMap:w,RejectMap:O,LoadedObj:y}},A=function(e){y=e},L=function(e){M.exports={},A(void 0),delete w[e],delete O[e]},P=function(e){return document.head.querySelector('script[name="'.concat(e,'"]'))},E=function(e){return Object.defineProperty(document,"currentScript",{get:function(){return e},configurable:!0})},x=function(e,t,n){var r=S(),o=r.LoadStatusMap,a=r.RejectMap;o[e]="loadFailed",(a[e]||[]).forEach((function(e){return e(n)})),t(n),L(e)},C=function(e,t,n,a,i){var u=S(),d=u.LoadedMap,f=u.LoadedObj||{},p=f.deps,y=f.factory,h=null==t?void 0:t.registry,m=!(l.test(e)||h&&h!==c);try{var b=r("".concat(e).split(/(?!^@)+@/),2),M=b[0],j=b[1];v(y,"the library(".concat(e,") does not point to umd or amd resources by default, you can point to the correct resource by setting scriptAlias").concat(m?", you can go to the website(https://www.jsdelivr.com/package/npm/".concat(M,"?version=").concat(j||"",") to find the corresponding resources"):""))}catch(t){return void x(e,i,t)}var w=function(t){var n=document.currentScript;E(P(e));var r=y.apply(void 0,o(t))||d.exports;E(n),y.length>t.length&&g("the library that the library depends on may not be injected correctly, please check whether deps is correctly declared"),function(e,t,n){var r=S(),o=r.LoadedMap,a=r.LoadStatusMap,i=r.ResolveMap;o[e]=n,a[e]="loaded",(i[e]||[]).forEach((function(e){return e(n)})),t(n),L(e)}(e,a,r)};n.length>0||!s(p)||!p.length?w(n):T(t,p).then((function(e){return w(e)}))},k=function(e,t){var n=new Error("".concat(e," load failed"));x(e,t,n)},R=function(e){!function(e){var t,n=S(),r=n.LoadedMap,o=n.LoadStatusMap,a=P(e);null==a||null===(t=a.parentNode)||void 0===t||t.removeChild(a),delete r[e],delete o[e]}(e)},q=function e(t,n){var o=t.enableSuffix,a=t.crossOrigin,i=t.libAliasMap,c="string"==typeof n?{name:n}:n,u=c.name,l=c.style,f=void 0!==l&&l,p=c.deps,v=void 0===p?[]:p,y=c.scriptAlias,h=void 0===y?"":y,m=c.styleAlias,b=void 0===m?"":m,g=r((i||{})[u]||[],3),M=g[0],j=g[1],w=g[2],O=d(t,u,h||M,o?".js":"");(f||b||j)&&function(e,t){if(!document.head.querySelector('link[name="'.concat(t,'"]'))){var n=document.createElement("link");n.href=e,n.rel="stylesheet",n.type="text/css",n.setAttribute("name",t),document.head.appendChild(n)}}(d(t,u,b||j,".css"),u);var A=s(v)&&v.length&&v||s(w)&&w.length&&w||[];return Promise.all(A.map((function(n){return e(t,n)}))).then((function(e){return function(e,t,n,r,o){return new Promise((function(a,i){var c,u=S(),l=u.LoadedMap,d=u.LoadStatusMap,f=u.ResolveMap,s=u.RejectMap,p=null==t||null===(c=t.loadedMap)||void 0===c?void 0:c[e],v=l[e];if(p)a(p);else if(v)a(v);else if("loadFailed"!==d[e]){if("loading"===d[e]){var y=f[e]||[],h=s[e]||[];return y.push(a),h.push(i),f[e]=y,void(s[e]=h)}d[e]="loading";var m=document.createElement("script");void 0!==r&&(m.crossOrigin=r),m.src=n,m.async=!0,m.setAttribute("name",e),m.onload=function(){return C(e,t,o,a,i)},m.onerror=function(){return k(e,i)},document.head.appendChild(m)}else k(e,i)}))}(u,t,O,a,e)}))},I=function(e){R(e),function(e){var t,n=document.head.querySelector('link[name="'.concat(e,'"]'));null==n||null===(t=n.parentNode)||void 0===t||t.removeChild(n)}(e)},T=function(e,t){return Promise.all(t.map((function(t){return q(e,t)})))};function D(e,t){var n=S().LoadedMap,r=function(e){return t[e]||n[e]};return s(e)?e.map((function(e){return r(e)})):r(e)}function $(e,t){var n=f(t);return s(t)?T(e,t):{object:!0,string:!0}[n]?q(e,t):Promise.resolve()}function H(e){return s(e)?void e.forEach((function(e){return I(e)})):I(e)}function F(e){var n,r=e||{},o=r.registry,a=r.libAliasMap,i=!o||o===c,l=(n=null==e?void 0:e.LoadedMap,"object"===f(n)?t({},null==e?void 0:e.LoadedMap):{}),d=t(t(t({},u),{},{loadedMap:l,enableSuffix:!i,versionHandling:!i},null!=e?e:{}),{},{libAliasMap:t(t({},u.libAliasMap),a||{})});function p(e){return $(d,e)}function v(e){return s(e),D(e,d.loadedMap)}return function(e){var t=e.registry||c;if(!document.head.querySelector('[dns-prefetch="'.concat(t,'"]'))){var n=document.createElement("link");n.rel="dns-prefetch",n.href=t,n.setAttribute("dns-prefetch",t),document.head.appendChild(n)}}(d),function(e){var t=e.prefetch,n=e.libAliasMap;if(t){var r=Object.keys(n||{});b(e,r)}}(d),d.loadedMap.$loader||(d.loadedMap.$loader=p),p.options=d,p.install=function(e){S().LoadedMap.vue=e,e.mixin({beforeCreate:function(){this.$loader=p}})},p.add=function(e,t){v(e)?g("".concat(e," already exists")):d.loadedMap[e]=t},p.load=p,p.loaded=v,p.unload=H,p.vueComponentLoad=function(e){return function(e,n){return function(){return Promise.resolve($(t(t({},e),{},{registry:e.vueComponentRegistry||e.registry,vueComponentRegistry:void 0}),n))}}(d,e)},p}return function(){if("undefined"==typeof Promise)throw new Error("Promise is a dependency of Loader, but Promise does not exist")}(),function(){function e(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t.slice(-1)[0],o=[void 0].concat(t).slice(-2)[0];A({deps:o,factory:r})}e.amd={},window.define=e}(),F.create=function(e){return F(e)},F}));
