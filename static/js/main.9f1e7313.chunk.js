(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),o=n(8),r=n.n(o),a=(n(13),n(3)),s=n(2),l=(n(14),n(0)),d=function(e){var t=e.distance,n=void 0===t?0:t,i=e.time,o=void 0===i?0:i,r=e.isStarting,a=e.setToggleTimer,s=Object(c.useMemo)((function(){var e=(o%60).toString().padStart(2,"0"),t=Math.floor(o/60).toString().padStart(2,"0");return"".concat(t,":").concat(e)}),[o]);return Object(l.jsx)("div",{style:u.container,children:Object(l.jsxs)("div",{style:u.distanceWrap,children:[Object(l.jsx)("div",{style:u.label,children:"Distance"}),Object(l.jsx)("div",{style:u.distance,children:(n||0).toFixed(2)}),Object(l.jsx)("div",{style:u.unit,children:"centimeters"}),Object(l.jsxs)("div",{style:u.timer,children:["Timer: ",s,"s"]}),Object(l.jsx)("button",{style:{fontSize:30,backgroundColor:r?"#DC143C":"#7FFF00"},onClick:a,children:r?"Stop":"Start"})]})})},u={container:{display:"flex",flexDirection:"column",flex:1,padding:15},title:{fontSize:24},distanceWrap:{display:"flex",flexDirection:"column",flex:1,alignItems:"center",justifyContent:"center"},label:{fontSize:30},distance:{fontSize:100},unit:{fontSize:30},timer:{marginTop:30,fontSize:35,marginBottom:30}},b=function(e){var t=e.data,n=e.keyExtractor,c=e.renderItem;return Object(l.jsx)("div",{children:t.map((function(e,t){var i=n(e,t);return Object(l.jsx)("div",{children:c({item:e,index:t})},i)}))})},f=function(e){var t=e.data,n=void 0===t?[]:t,c=e.clearLogs;return Object(l.jsxs)("div",{style:j.container,children:[Object(l.jsx)("div",{style:{display:"flex",justifyContent:"flex-end"},children:Object(l.jsx)("button",{onClick:function(){window.confirm("Are you sure to clear all logs")&&c()},children:"clear"})}),Object(l.jsxs)("div",{style:j.listItem,children:[Object(l.jsx)("div",{style:Object(a.a)(Object(a.a)({},j.th),j.number),children:"No."}),Object(l.jsx)("div",{style:Object(a.a)(Object(a.a)({},j.th),j.distance),children:"Distance (cm.)"}),Object(l.jsx)("div",{style:Object(a.a)(Object(a.a)({},j.th),j.time),children:"Time (mm:ss)"})]}),Object(l.jsx)(b,{data:n,keyExtractor:function(e,t){return t.toString()},renderItem:function(e){var t=e.item,n=e.index,c=(t.time%60).toString().padStart(2,"0"),i=Math.floor(t.time/60).toString().padStart(2,"0"),o="".concat(i,":").concat(c);return Object(l.jsxs)("div",{style:j.listItem,children:[Object(l.jsxs)("div",{style:j.number,children:["#",n]}),Object(l.jsx)("div",{style:j.distance,children:(t.distance||0).toFixed(2)}),Object(l.jsx)("div",{style:j.time,children:o})]})}})]})},j={container:{flex:1,padding:15},title:{fontSize:24},listItem:{display:"flex",flexDirection:"row",paddingTop:5,paddingBottom:5},th:{fontWeight:"bold"},number:{flex:1,fontSize:20},distance:{flex:3,divAlign:"right",fontSize:20},time:{flex:3,divAlign:"right",fontSize:20}},g=n(7),O="52cf0b2c-28f2-4328-aaac-6badc36777d4",v=function(){var e=Object(c.useRef)(null),t=Object(c.useState)(!1),n=Object(s.a)(t,2),i=n[0],o=n[1],r=Object(c.useState)(0),a=Object(s.a)(r,2),l=a[0],d=a[1],u=Object(c.useState)(0),b=Object(s.a)(u,2),f=b[0],j=b[1],v=Object(c.useState)(0),h=Object(s.a)(v,2),x=h[0],m=h[1],p=Object(c.useState)(!1),y=Object(s.a)(p,2),S=y[0],C=y[1],k=Object(c.useState)([]),T=Object(s.a)(k,2),L=T[0],D=T[1],I=Object(c.useState)(!1),w=Object(s.a)(I,2),z=w[0],F=w[1];Object(c.useEffect)((function(){var e=localStorage.getItem("logs"),t=e?JSON.parse(e):[];D(t)}),[]);var E=Object(c.useCallback)((function(){F((function(e){return e?(D((function(e){var t=[].concat(Object(g.a)(e),[{distance:f,time:x}]);return localStorage.setItem("logs",JSON.stringify(t)),t})),C(!1),j(0),m(0)):C(!0),!e}))}),[f,x]),A=Object(c.useCallback)((function(){D([]),localStorage.removeItem("logs")}),[]),N=Object(c.useCallback)((function(){D((function(e){var t=[].concat(Object(g.a)(e),[{distance:f,time:x}]);return localStorage.setItem("logs",JSON.stringify(t)),t})),C(!1),C(!0),j(0),m(0)}),[x,f]),J=Object(c.useCallback)((function(){navigator.bluetooth.requestDevice({filters:[{name:"Arrow_ESP32"}],optionalServices:[O]}).then((function(e){return console.log({device:e}),e.addEventListener("gattserverdisconnected",(function(e){var t=e.target;o(!1),console.log("Device ".concat(t.name," is disconnected."))})),e.gatt.connect()})).then((function(e){return console.log({server:e}),o(e.connected),e.getPrimaryService(O)})).then((function(e){return console.log({service:e}),e.getCharacteristic("051f540c-9a37-4284-9f98-2073e9f5bdfe")})).then((function(e){return console.log({characteristic:e}),e.startNotifications()})).then((function(e){e.addEventListener("characteristicvaluechanged",(function(e){var t=e.target.value,n=new TextDecoder("utf-8").decode(t).split(","),c=Object(s.a)(n,2),i=c[0],o=c[1];console.log({distance:i,isReset:o}),d(+i),"true"===o&&(alert("reset"),N())})),console.log("Notifications have been started.")})).catch((function(e){console.error(e)}))}),[N]);return Object(c.useEffect)((function(){return S&&(e.current=setInterval((function(){m((function(e){return e+1}))}),1e3)),function(){return clearInterval(e.current)}}),[S]),Object(c.useEffect)((function(){j((function(e){return l>e?l:e}))}),[l]),{distance:l,time:x,logs:L,isConnected:i,scanAndConnect:J,reset:N,clearLogs:A,setToggleTimer:E,isStarting:z}};var h=function(){var e=v(),t=e.distance,n=e.time,i=e.logs,o=e.isConnected,r=e.scanAndConnect,u=e.clearLogs,b=e.isStarting,j=e.setToggleTimer,g=Object(c.useState)("home"),O=Object(s.a)(g,2),h=O[0],m=O[1],p=Object(c.useMemo)((function(){return{home:{component:d,props:{distance:t,time:n,isStarting:b,setToggleTimer:j}},logs:{component:f,props:{data:i,clearLogs:u}}}}),[i,t,n,u,j,b]),y=p[h].component,S=p[h].props;return Object(l.jsxs)("div",{style:x.container,children:[Object(l.jsxs)("div",{style:x.status,children:[Object(l.jsx)("div",{style:x.scanningdiv,children:o?"Connected":"Disconnected"}),Object(l.jsx)("button",{style:x.button,onClick:r,children:"Scan and Connect"})]}),Object(l.jsx)("div",{style:x.content,children:Object(l.jsx)(y,Object(a.a)({},S))}),Object(l.jsxs)("div",{style:x.tabs,children:[Object(l.jsx)("div",{style:Object(a.a)(Object(a.a)({},x.tab),{borderRightWidth:1,borderRightColor:"#d0d0d0"}),onClick:function(){return m("home")},children:Object(l.jsx)("div",{style:"home"===h?x.activeLabel:x.inactiveLabel,children:"Home"})}),Object(l.jsx)("div",{style:x.tab,onClick:function(){return m("logs")},children:Object(l.jsx)("div",{style:"logs"===h?x.activeLabel:x.inactiveLabel,children:"Logs"})})]})]})},x={container:{display:"flex",flexDirection:"column",flex:1,height:"100vh"},content:{display:"flex",flex:1,paddingTop:50,backgroundColor:"#F5F5DC",height:"100%"},tabs:{display:"flex",flexDirection:"row",position:"absolute",letf:0,right:0,width:"100%",bottom:0,borderTop:"1px solid #d0d0d0"},tab:{display:"flex",flex:1,justifyContent:"center",padding:20,backgroundColor:"#f1f1f1"},activeLabel:{display:"flex",color:"green",fontWeight:"bold"},inactiveLabel:{display:"flex",color:"#444444"},scanningText:{display:"flex",fontSize:30},status:{backgroundColor:"black",color:"white",display:"flex",justifyContent:"space-between",padding:20},button:{}},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),c(e),i(e),o(e),r(e)}))};r.a.render(Object(l.jsx)(i.a.StrictMode,{children:Object(l.jsx)(h,{})}),document.getElementById("root")),m()}},[[16,1,2]]]);
//# sourceMappingURL=main.9f1e7313.chunk.js.map