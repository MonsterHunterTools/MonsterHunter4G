import{d,m as i,o as _,a as f,b as g,c as v,e as a,t as p,s as N,F as C,g as x,h as r,_ as M}from"./index-2ce64806.js";const U=a("span",null,"自定义数据修饰符：",-1),y=a("input",{type:"text"},null,-1),$=[U,y],w=d({__name:"Cp1",props:{msg:{default:"withDefaults解构赋默认值"},name:{default:"name"},num:{default:0}},emits:["getchangename","update"],setup(u,{emit:o}){const e=u,c=o,m=i(0),s=function(){c("getchangename",m.value++)};return _(()=>{}),f(()=>{}),(t,n)=>(g(),v(C,null,[a("div",null,p(e.name)+" "+p(e.msg),1),a("button",{onClick:s},"改变名字"),a("div",{class:N(t.$attrs.class)},$,2)],64))}}),b=["value"],h=d({__name:"Cp2",props:{msg:{default:"默认值"},num:{default:0},testName:{},testNameModifiers:{},tips:{default:"将输入框的大写转为小写"}},emits:["changename"],setup(u,{emit:o}){const e=u,c=o,m=function(s){var n,l;let t=s.target.value;(n=e.testNameModifiers)!=null&&n.setlowcase&&(t=t.toLowerCase()),(l=e.testNameModifiers)!=null&&l.setupcase&&(t=t.toUpperCase()),console.log(t),c("changename",t)};return console.log(e.testNameModifiers,e.testName),_(()=>{}),f(()=>{}),(s,t)=>(g(),v("div",null,[x(p(e.testName)+" ",1),a("p",null,p(e.tips),1),a("input",{value:e.testName,onInput:m,type:"text",name:"",id:""},null,40,b)]))}}),k=d({__name:"UseComponents",setup(u){const o=i("测试传值"),e=i("v-model带修饰符 使用：v-model: 不能简写："),c=i("将输入框的小写转为大写"),m=function(t){o.value=`测试传值 ++ ${t}`,console.log(t)},s=function(t){e.value=t};return _(()=>{}),f(()=>{}),(t,n)=>(g(),v("div",null,[r(w,{name:o.value,onGetchangename:m,class:"classtextcolor"},null,8,["name"]),r(h,{"test-name":e.value,"onUpdate:testName":n[0]||(n[0]=l=>e.value=l),"test-nameModifiers":{setlowcase:!0},onChangename:s},null,8,["test-name"]),r(h,{"test-name":e.value,"onUpdate:testName":n[1]||(n[1]=l=>e.value=l),"test-nameModifiers":{setupcase:!0},tips:c.value,onChangename:s},null,8,["test-name","tips"])]))}});const V=M(k,[["__scopeId","data-v-1d67c990"]]);export{V as default};
