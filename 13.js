import{d as v,g as t,i as f,e as m,o as p,w as o,h as a,j as _,k as n,b as w,l as V,t as x,m as C,V as T,p as g,q as h,_ as k}from"./d.js";const y=v({__name:"CTF",setup(b){const u=["Enter password...","Password is incorrect!","Try again.","Try again later.....","Correct!"],e=t(0),l=t(""),r=t(),s=t(!1);f(e,()=>s.value=!1);function c(){clearTimeout(r.value),e.value>3?e.value=0:e.value<3?l.value===u[e.value].split(" ").at(-1).replace(/[^a-z]+$/,"")?(++e.value,e.value===3&&(r.value=window.setTimeout(()=>s.value=!0,9999+Date.now()%1e4))):e.value=0:e.value===3&&(s.value&&l.value===u[2+Math.round(Math.random())].slice(4,9)?++e.value:e.value=0)}return(B,i)=>(p(),m(h,{onSubmit:g(c,["prevent"])},{default:o(()=>[a(_,{"no-gutters":""},{default:o(()=>[a(n,{class:"d-flex flex-column ga-2"},{default:o(()=>[w("span",{class:V(["align-self-center",e.value===4&&"text-success"])},x(u[e.value].slice(0,9999-1e4*s.value)),3),a(C,{modelValue:l.value,"onUpdate:modelValue":i[0]||(i[0]=d=>l.value=d),autocomplete:"off",variant:"outlined","prepend-inner-icon":"mdi-lock-outline",color:e.value===4?"success":void 0},null,8,["modelValue","color"])]),_:1}),a(n,{cols:"auto"},{default:o(()=>[a(T,{type:"submit",icon:"mdi-send",variant:"text",color:e.value===4?"success":"primary",class:"mt-9"},null,8,["color"])]),_:1})]),_:1})]),_:1}))}}),M=k(y,[["__scopeId","data-v-18447cbc"]]);export{M as default};
