import{d as x,r as v,b,c as h,e as p,f as o,w as n,u as r,g as y,h as V,i as u,o as B,j as F,k as N}from"./index.bc6e1629.js";const k={class:"login-wrapper"},C={class:"modal"},P=p("div",{class:"title"},"\u706B\u661F",-1),U=F("\u767B\u5F55"),L=x({__name:"Login",setup(j){let t=v({userName:"admin",userPwd:"123456"}),m={userName:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],userPwd:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}]};const d=b(),c=y(),_=V();function f(a){!a||a.validate(e=>{if(e)N.login(t).then(async s=>{c.commit("saveUserInfo",s),_.push("/welcome")});else return!1})}return(a,e)=>{const s=u("el-input"),i=u("el-form-item"),g=u("el-button"),w=u("el-form");return B(),h("div",k,[p("div",C,[o(w,{ref_key:"userFormRef",ref:d,model:r(t),"status-icon":"",rules:r(m)},{default:n(()=>[P,o(i,{prop:"userName"},{default:n(()=>[o(s,{type:"text","prefix-icon":"el-icon-user",modelValue:r(t).userName,"onUpdate:modelValue":e[0]||(e[0]=l=>r(t).userName=l)},null,8,["modelValue"])]),_:1}),o(i,{prop:"userPwd"},{default:n(()=>[o(s,{type:"password","prefix-icon":"el-icon-view",modelValue:r(t).userPwd,"onUpdate:modelValue":e[1]||(e[1]=l=>r(t).userPwd=l)},null,8,["modelValue"])]),_:1}),o(i,null,{default:n(()=>[o(g,{type:"primary",class:"btn-login",onClick:e[2]||(e[2]=l=>f(d.value))},{default:n(()=>[U]),_:1})]),_:1})]),_:1},8,["model","rules"])])])}}});export{L as default};
