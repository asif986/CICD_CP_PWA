(window.webpackJsonp=window.webpackJsonp||[]).push([[142],{dZCO:function(n,o,e){"use strict";e.r(o),e.d(o,"mdTransitionAnimation",(function(){return a}));var i=e("uSLK");const a=(n,o)=>{const e="back"===o.direction,a=o.leavingEl,r=t(o.enteringEl),s=r.querySelector("ion-toolbar"),c=Object(i.a)();if(c.addElement(r).fill("both").beforeRemoveClass("ion-page-invisible"),e?c.duration(o.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):c.duration(o.duration||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(40px)","translateY(0px)").fromTo("opacity",.01,1),s){const n=Object(i.a)();n.addElement(s),c.addAnimation(n)}if(a&&e){c.duration(o.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)");const n=Object(i.a)();n.addElement(t(a)).fromTo("transform","translateY(0px)","translateY(40px)").fromTo("opacity",1,0),c.addAnimation(n)}return c},t=n=>n.classList.contains("ion-page")?n:n.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")||n}}]);