(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var i=n(1),c=n.n(i),o=n(7),a=n.n(o),r=(n(13),n(2)),l=n(3),s=(n(14),n(0)),d=function(e){var t=e.distance,n=void 0===t?0:t,c=e.time,o=void 0===c?0:c,a=e.state,r=void 0===a?0:a,l=Object(i.useMemo)((function(){return"".concat(o/1e3)}),[o]);return Object(s.jsx)("div",{style:u.container,children:Object(s.jsxs)("div",{style:u.distanceWrap,children:[Object(s.jsx)("div",{style:u.label,children:"Distance"}),Object(s.jsx)("div",{style:u.distance,children:(n||0).toFixed(2)}),Object(s.jsx)("div",{style:u.unit,children:"Inches"}),r>0&&Object(s.jsxs)("div",{style:u.timer,children:["Timer: ",l,"s"]})]})})},u={container:{display:"flex",flexDirection:"column",flex:1,padding:15},title:{fontSize:24},distanceWrap:{display:"flex",flexDirection:"column",flex:1,alignItems:"center",justifyContent:"center"},label:{fontSize:30},distance:{fontSize:100},unit:{fontSize:30},timer:{marginTop:30,fontSize:35,marginBottom:30}},b=function(e){var t=e.data,n=e.keyExtractor,i=e.renderItem;return Object(s.jsx)("div",{children:t.map((function(e,t){var c=n(e,t);return Object(s.jsx)("div",{children:i({item:e,index:t})},c)}))})},f=function(e){var t=e.data,n=void 0===t?[]:t,i=e.clearLogs;return Object(s.jsxs)("div",{style:j.container,children:[Object(s.jsx)("div",{style:{display:"flex",justifyContent:"flex-end"},children:Object(s.jsx)("button",{onClick:function(){window.confirm("Are you sure to clear all logs")&&i()},children:"clear"})}),Object(s.jsxs)("div",{style:j.listItem,children:[Object(s.jsx)("div",{style:Object(r.a)(Object(r.a)({},j.th),j.number),children:"No."}),Object(s.jsx)("div",{style:Object(r.a)(Object(r.a)({},j.th),j.distance),children:"Distance (in.)"}),Object(s.jsx)("div",{style:Object(r.a)(Object(r.a)({},j.th),j.time),children:"Time (sec.)"})]}),Object(s.jsx)(b,{data:n,keyExtractor:function(e,t){return t.toString()},renderItem:function(e){var t=e.item,n=e.index,i=t.time/1e3,c="".concat(i);return Object(s.jsxs)("div",{style:j.listItem,children:[Object(s.jsxs)("div",{style:j.number,children:["#",n]}),Object(s.jsx)("div",{style:j.distance,children:(t.distance||0).toFixed(2)}),Object(s.jsx)("div",{style:j.time,children:c})]})}})]})},j={container:{flex:1,padding:15,paddingBottom:100},title:{fontSize:24},listItem:{display:"flex",flexDirection:"row",paddingTop:5,paddingBottom:5},th:{fontWeight:"bold"},number:{flex:1,fontSize:20},distance:{flex:3,divAlign:"right",fontSize:20},time:{flex:3,divAlign:"right",fontSize:20}},v=function(e){var t=e.alarmTime,n=e.setAlarmTime,c=e.onSaveAlarmTime,o=Object(i.useMemo)((function(){return t/1e3}),[t]);return Object(s.jsx)("div",{style:m.container,children:Object(s.jsxs)("div",{style:m.distanceWrap,children:[Object(s.jsx)("div",{style:m.label,children:"Set Alarm Time (sec)"}),Object(s.jsx)("input",{type:"number",style:m.input,value:o,onChange:function(e){var t=1e3*+e.target.value;n(t)}}),Object(s.jsx)("button",{style:m.button,onClick:c,children:"Save"})]})})},m={container:{display:"flex",flexDirection:"column",flex:1,padding:15},title:{fontSize:24},distanceWrap:{display:"flex",flexDirection:"column",flex:1,alignItems:"center",justifyContent:"center"},input:{fontSize:30,padding:10,margin:20,textAlign:"center",width:100},label:{fontSize:30},button:{fontSize:20},distance:{fontSize:100},unit:{fontSize:30},timer:{marginTop:30,fontSize:35,marginBottom:30}},g=n(8),h="52cf0b2c-28f2-4328-aaac-6badc36777d4",x="051f540c-9a37-4284-9f98-2073e9f5bdfe",O="Arrow_ESP32",p=function(){var e=Object(i.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(i.useState)(0),a=Object(l.a)(o,2),r=a[0],s=a[1],d=Object(i.useState)(0),u=Object(l.a)(d,2),b=u[0],f=u[1],j=Object(i.useState)([]),v=Object(l.a)(j,2),m=v[0],p=v[1],y=Object(i.useState)(0),S=Object(l.a)(y,2),C=S[0],T=S[1],L=Object(i.useState)(0),z=Object(l.a)(L,2),D=z[0],k=z[1];Object(i.useEffect)((function(){var e=localStorage.getItem("logs"),t=e?JSON.parse(e):[];p(t)}),[]);var w=Object(i.useCallback)((function(){p([]),localStorage.removeItem("logs")}),[]);return{distance:r,time:b,logs:m,isConnected:n,scanAndConnect:Object(i.useCallback)((function(){navigator.bluetooth.requestDevice({filters:[{name:O}],optionalServices:[h]}).then((function(e){return console.log({device:e}),e.addEventListener("gattserverdisconnected",(function(e){var t=e.target;c(!1),console.log("Device ".concat(t.name," is disconnected."))})),e.gatt.connect()})).then((function(e){return console.log({server:e}),c(e.connected),e.getPrimaryService(h)})).then((function(e){return console.log({service:e}),e.getCharacteristic(x)})).then((function(e){return console.log({characteristic:e}),e.startNotifications()})).then((function(e){e.addEventListener("characteristicvaluechanged",(function(e){var t=e.target.value,n=new TextDecoder("utf-8").decode(t).split(","),i=Object(l.a)(n,3),c=i[0],o=i[1],a=i[2],r=+o,d=+a,u=+c;s(r),f(d),T(u),2===u&&p((function(e){var t=[].concat(Object(g.a)(e),[{distance:r,time:d}]);return localStorage.setItem("logs",JSON.stringify(t)),t}))})),console.log("Notifications have been started.")})).catch((function(e){console.error(e)}))}),[]),clearLogs:w,state:C,alarmTime:D,setAlarmTime:k,onSaveAlarmTime:function(){navigator.bluetooth.requestDevice({filters:[{name:O}],optionalServices:[h]}).then((function(e){return console.log({device:e}),e.addEventListener("gattserverdisconnected",(function(e){var t=e.target;c(!1),console.log("Device ".concat(t.name," is disconnected."))})),e.gatt.connect()})).then((function(e){return console.log({server:e}),c(e.connected),e.getPrimaryService(h)})).then((function(e){return console.log({service:e}),e.getCharacteristic(x)})).then((function(e){if(D>=0){var t=D.toString(),n=new TextEncoder("utf-8");e.writeValue(n.encode(t)),alert("Saved !!!")}else alert("Time is not valid !!!")})).catch((function(e){console.error(e)}))}}};var y=function(){var e=p(),t=e.distance,n=e.time,c=e.logs,o=e.isConnected,a=e.scanAndConnect,u=e.clearLogs,b=e.state,j=e.alarmTime,m=e.setAlarmTime,g=e.onSaveAlarmTime,h=Object(i.useState)("home"),x=Object(l.a)(h,2),O=x[0],y=x[1],C=Object(i.useMemo)((function(){return{home:{component:d,props:{distance:t,time:n,state:b}},logs:{component:f,props:{data:c,clearLogs:u}},setting:{component:v,props:{alarmTime:j,setAlarmTime:m,onSaveAlarmTime:g}}}}),[c,t,n,u,b,j,m,g]),T=C[O].component,L=C[O].props;return Object(s.jsxs)("div",{style:S.container,children:[Object(s.jsxs)("div",{style:S.status,children:[Object(s.jsx)("div",{style:S.scanningdiv,children:o?"Connected":"Disconnected"}),Object(s.jsx)("button",{style:S.button,onClick:a,children:"Scan and Connect"})]}),Object(s.jsx)("div",{style:S.content,children:Object(s.jsx)(T,Object(r.a)({},L))}),Object(s.jsxs)("div",{style:S.tabs,children:[Object(s.jsx)("div",{style:Object(r.a)(Object(r.a)({},S.tab),{borderRightWidth:1,borderRightColor:"#d0d0d0"}),onClick:function(){return y("home")},children:Object(s.jsx)("div",{style:"home"===O?S.activeLabel:S.inactiveLabel,children:"Home"})}),Object(s.jsx)("div",{style:S.tab,onClick:function(){return y("logs")},children:Object(s.jsx)("div",{style:"logs"===O?S.activeLabel:S.inactiveLabel,children:"Logs"})}),Object(s.jsx)("div",{style:S.tab,onClick:function(){return y("setting")},children:Object(s.jsx)("div",{style:"setting"===O?S.activeLabel:S.inactiveLabel,children:"Setting"})})]})]})},S={container:{display:"flex",flexDirection:"column",flex:1,minHeight:"100vh"},content:{display:"flex",flex:1,paddingTop:50,backgroundColor:"#F5F5DC",height:"100%"},tabs:{display:"flex",flexDirection:"row",position:"fixed",letf:0,right:0,width:"100%",bottom:0,borderTop:"1px solid #d0d0d0"},tab:{display:"flex",flex:1,justifyContent:"center",padding:20,backgroundColor:"#f1f1f1"},activeLabel:{display:"flex",color:"green",fontWeight:"bold"},inactiveLabel:{display:"flex",color:"#444444"},scanningText:{display:"flex",fontSize:30},status:{backgroundColor:"black",color:"white",display:"flex",justifyContent:"space-between",padding:20},button:{}},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),i(e),c(e),o(e),a(e)}))};a.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(y,{})}),document.getElementById("root")),C()}},[[16,1,2]]]);
//# sourceMappingURL=main.20e2a757.chunk.js.map