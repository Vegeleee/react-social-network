(this["webpackJsonpreact-social-network"]=this["webpackJsonpreact-social-network"]||[]).push([[3],{296:function(e,a,s){e.exports={dialogs:"Dialogs_dialogs__2Gkkf",dialogsItems:"Dialogs_dialogsItems__2PZ9i",dialogsMessages:"Dialogs_dialogsMessages__1vjY3"}},297:function(e,a,s){e.exports={dialog:"DialogItem_dialog__3yh_M",active:"DialogItem_active__JdILs"}},298:function(e,a,s){e.exports={message:"Message_message__27Afv",messageText:"Message_messageText__Zx3yU"}},299:function(e,a,s){e.exports={form:"AddMessageForm_form__1Sv6M",formField:"AddMessageForm_formField__10FeY"}},300:function(e,a,s){"use strict";s.r(a);var t=s(131),n=s(0),i=s.n(n),l=s(296),o=s.n(l),m=s(297),r=s.n(m),c=s(13),d=function(e){var a="/dialogs/".concat(e.id);return i.a.createElement("div",{className:r.a.dialog},i.a.createElement(c.b,{to:a,activeClassName:r.a.active},e.name))},g=s(298),u=s.n(g),_=function(e){return i.a.createElement("div",{className:u.a.message},i.a.createElement("span",{className:u.a.messageText},e.message))},f=s(93),v=s(132),E=s(10),b=s(50),p=s(299),M=s.n(p),N=Object(b.a)(50),k=Object(v.a)({form:"dialogAddMessageForm"})((function(e){return i.a.createElement("form",{onSubmit:e.handleSubmit,className:M.a.form},i.a.createElement("div",{className:M.a.formField},i.a.createElement(f.a,{component:E.b,name:"newMessage",placeholder:"Enter your message",validate:[N]})),i.a.createElement("div",null,i.a.createElement("button",null,"Send")))})),x=function(e){var a=e.dialogsPage,s=e.sendMessage,t=a.dialogs.map((function(e){return i.a.createElement(d,{name:e.name,key:e.id,id:e.id})})),n=a.messages.map((function(e){return i.a.createElement(_,{message:e.message,key:e.id,id:e.id})}));return i.a.createElement("div",{className:o.a.dialogs},i.a.createElement("div",{className:o.a.dialogsItems},t),i.a.createElement("div",{className:o.a.dialogsMessages},i.a.createElement("div",null,n),i.a.createElement("div",null,i.a.createElement(k,{onSubmit:function(e){s(e.newMessage)}}))))},F=s(12),h=s(70),w=s(6);a.default=Object(w.d)(Object(F.b)((function(e){return{dialogsPage:e.dialogsPage}}),{sendMessage:t.b}),h.a)(x)}}]);
//# sourceMappingURL=3.971a9a97.chunk.js.map