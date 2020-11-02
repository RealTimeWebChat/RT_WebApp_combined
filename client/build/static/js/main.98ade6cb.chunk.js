(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{115:function(e,t){},118:function(e,t,a){},119:function(e,t,a){},120:function(e,t,a){},121:function(e,t,a){},122:function(e,t,a){},123:function(e,t,a){},144:function(e,t,a){"use strict";a.r(t);var n,c=a(0),r=a.n(c),s=a(63),l=a.n(s),o=(a(40),a(9)),m=a(1),u=a(7),i=(a(75),function(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),a=t[0],n=t[1],s=Object(c.useState)(""),l=Object(u.a)(s,2),m=l[0],i=l[1];return r.a.createElement("div",{className:"joinOuterContainer"},r.a.createElement("div",{className:"joinInnerContainer"},r.a.createElement("h1",{className:"heading"},"Join"),r.a.createElement("div",null,r.a.createElement("input",{placeholder:"Name",className:"joinInput",type:"text",onChange:function(e){return n(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("input",{placeholder:"Room",className:"joinInput mt-20",type:"text",onChange:function(e){return i(e.target.value)}})),r.a.createElement(o.b,{onClick:function(e){return a&&m?null:e.preventDefault()},to:"/chat?name=".concat(a,"&room=").concat(m)},r.a.createElement("button",{className:"button mt-20",type:"submit"},"Sign In"))))}),A=a(69),E=a(65),g=a.n(E),f=a(66),p=a.n(f),d=(a(118),a(19)),N=a.n(d),b=(a(119),a(120),a(67)),h=a.n(b),v=function(e){var t=e.room;return r.a.createElement("div",{className:"infoBar"},r.a.createElement("div",{className:"leftInnerContainer"},r.a.createElement("img",{className:"onlineIcon",src:N.a,alt:"online"}),r.a.createElement("h3",null,t)),r.a.createElement("div",{className:"rightInnerContainer"},r.a.createElement("a",{href:"/"},r.a.createElement("img",{src:h.a,alt:"close"}))))},j=(a(121),function(e){var t=e.message,a=e.setMessage,n=e.sendMessage;return r.a.createElement("form",{className:"form"},r.a.createElement("input",{className:"input",type:"text",placeholder:"Type a message...",value:t,onChange:function(e){return a(e.target.value)},onKeyPress:function(e){return"Enter"===e.key?n(e):null}}),r.a.createElement("button",{className:"sendButton",onClick:function(e){return n(e)}},"Send"))}),C=(a(122),a(123),a(38)),O=a.n(C),S=function(e){var t=e.message,a=t.user,n=t.text,c=e.name,s=!1;console.log("message name",c);var l=c.trim().toLowerCase();return a===l&&(s=!0),s?r.a.createElement("div",{className:"messageContainer justifyEnd"},r.a.createElement("p",{className:"sentText pr-10"},l),r.a.createElement("div",{className:"messageBox backgroundBlue"},r.a.createElement("p",{className:"messageText colorWhite"},O.a.emojify(n)))):r.a.createElement("div",{className:"messageContainer justifyStart"},r.a.createElement("div",{className:"messageBox backgroundLight"},r.a.createElement("p",{className:"messageText colorDark"},O.a.emojify(n))),r.a.createElement("p",{className:"sentText pl-10"},a))},I=a(68),x=a.n(I),y=function(e){var t=e.messages,a=e.name;return r.a.createElement(x.a,{className:"messages"},t.map((function(e,t){return r.a.createElement("div",{key:t},r.a.createElement(S,{message:e,name:a}))})))},R=function(e){var t=e.location,a=Object(c.useState)(""),s=Object(u.a)(a,2),l=s[0],o=s[1],m=Object(c.useState)(""),i=Object(u.a)(m,2),E=i[0],f=i[1],d=Object(c.useState)(""),N=Object(u.a)(d,2),b=(N[0],N[1]),h=Object(c.useState)([]),C=Object(u.a)(h,2),O=C[0],S=C[1],I=Object(c.useState)([]),x=Object(u.a)(I,2),R=x[0],w=x[1],k="https://rt-chatwebapp.herokuapp.com/";Object(c.useEffect)((function(){var e=g.a.parse(t.search),a=e.room,c=e.name;n=p()(k),o(c),f(a),n.emit("join",{name:c,room:a},(function(e){e&&alert(e)}))}),[k,t.search]),Object(c.useEffect)((function(){n.on("message",(function(e){w((function(t){return[].concat(Object(A.a)(t),[e])}))})),n.on("roomData",(function(e){var t=e.users;b(t)}))}),[]);return console.log(O,R),r.a.createElement("div",{className:"outerContainer"},r.a.createElement("div",{className:"container"},r.a.createElement(v,{room:E}),r.a.createElement(y,{messages:R,name:l}),r.a.createElement(j,{message:O,setMessage:S,sendMessage:function(e){e.preventDefault(),O&&n.emit("sendMessage",O,(function(){return S("")}))}})))},w=function(){return r.a.createElement("nav",null,r.a.createElement("div",{className:"nav-wrapper blue-grey"},r.a.createElement("a",{href:"#",className:"brand-logo"},"Real-Time HRI Chat"),r.a.createElement("ul",{id:"nav-mobile",className:"right hide-on-med-and-down"},r.a.createElement("li",null,r.a.createElement(o.b,{to:"/Setup"},"Setup")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/"},"Login")))))},k=function(){return r.a.createElement(o.a,null,r.a.createElement(w,null),r.a.createElement(m.a,{path:"/",exact:!0,component:i}),r.a.createElement(m.a,{path:"/chat",component:R}))};l.a.render(r.a.createElement(k,null),document.querySelector("#root"))},19:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAExJREFUCB1jbPh/le3lx5tNDIwMcQwg8J9hkTi/eh0LWJCBoRwoAAPlQDEGJrhKmDCIBupmQuYjs5lAZiILgNlAMRaQRSAz4UZCLQcAIwYaiAejKoYAAAAASUVORK5CYII="},67:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHBJREFUGBmNkAEKwCAMA2VfGP2mrx3sOV2us6IymIXQGlNTW9zdhCqcZQm4dmelFUp+CZZa6sYpeUVIFyIixMqjCO51Wy5unQExuYSbSF5JASLqPsqRM21lOoWc89tagr3PSMgOiWlwnUeXWA/E78IfuAX270S3ydAAAAAASUVORK5CYII="},70:function(e,t,a){e.exports=a(144)},75:function(e,t,a){}},[[70,1,2]]]);
//# sourceMappingURL=main.98ade6cb.chunk.js.map