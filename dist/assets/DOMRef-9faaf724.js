import{d as a,m as l,o as r,a as s,b as u,c,e as o}from"./index-2ce64806.js";const p=a({__name:"DOMRef",setup(f){let n;const e=l(null);return r(()=>{n=setInterval(()=>{e.value.style.background=`#00${Math.floor(Math.random()*10)}0006e`},500)}),s(()=>{console.log("unmounted"),clearInterval(n)}),(m,t)=>(u(),c("div",null,[o("button",{onClick:t[0]||(t[0]=i=>e.value.focus())},"点击聚焦"),o("input",{style:{transition:"all ease-in-out 0.5s"},autofocus:!1,type:"text",ref_key:"refnameinput",ref:e},null,512)]))}});export{p as default};
