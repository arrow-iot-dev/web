(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var i=n(1),c=n.n(i),a=n(9),o=n.n(a),r=(n(14),n(3)),s=n(2),l=(n(15),n(0)),d=function(e){var t=e.distance,n=void 0===t?0:t,c=e.time,a=void 0===c?0:c,o=e.state,r=void 0===o?0:o,s=Object(i.useMemo)((function(){return"".concat(a/1e3)}),[a]);return Object(l.jsx)("div",{style:u.container,children:Object(l.jsxs)("div",{style:u.distanceWrap,children:[Object(l.jsx)("div",{style:u.label,children:"Distance"}),Object(l.jsx)("div",{style:u.distance,children:(n||0).toFixed(2)}),Object(l.jsx)("div",{style:u.unit,children:"Inches"}),r>0&&Object(l.jsxs)("div",{style:u.timer,children:["Timer: ",s,"s"]})]})})},u={container:{display:"flex",flexDirection:"column",flex:1,padding:15},title:{fontSize:24},distanceWrap:{display:"flex",flexDirection:"column",flex:1,alignItems:"center",justifyContent:"center"},label:{fontSize:30},distance:{fontSize:100},unit:{fontSize:30},timer:{marginTop:30,fontSize:35,marginBottom:30}},b=n(5),j=n(7),f=n.n(j),m=function(e){var t=e.data,n=e.keyExtractor,i=e.renderItem;return Object(l.jsx)("div",{children:t.map((function(e,t){var c=n(e,t);return Object(l.jsx)("div",{children:i({item:e,index:t})},c)}))})},g=function(e){var t=e.data,n=void 0===t?[]:t,c=e.clearLogs,a=e.names,o=e.setNames,d=e.selectedName,u=(e.setSelectedName,e.onChangeName),j=e.setLogs,g=Object(i.useState)(""),x=Object(s.a)(g,2),O=x[0],h=x[1],p=Object(i.useState)(f()().format("YYYY-MM-DD")),y=Object(s.a)(p,2),S=y[0],C=y[1],T=n.filter((function(e){return e.name===d&&f()(e.dateTime).isSame(S,"date")}));return Object(l.jsxs)("div",{style:v.container,children:[Object(l.jsx)("div",{style:{marginBottom:10},children:Object(l.jsx)("input",{type:"date",value:S,onChange:function(e){return C(e.target.value)}})}),Object(l.jsxs)("div",{style:{marginBottom:10},children:[Object(l.jsx)("input",{value:O,onChange:function(e){return h(e.target.value)}}),Object(l.jsx)("button",{onClick:function(){""!==O&&(void 0===a.find((function(e){return e===O}))?(o((function(e){var t=[].concat(Object(b.a)(e),[O]);return localStorage.setItem("names",JSON.stringify(t)),t})),h("")):alert("User '"+O+"' already exists."))},children:"+ Add"})]}),Object(l.jsx)("div",{style:v.nameRow,children:a.map((function(e){return Object(l.jsxs)("div",{style:e===d?v.activeTag:v.tag,children:[Object(l.jsx)("span",{onClick:function(){return u(e)},children:e}),Object(l.jsx)("span",{style:{cursor:"pointer"},onClick:function(){"NoName"!==e?window.confirm("Are you sure to delete user '"+e+"'?")&&(j((function(t){var n=t.filter((function(t){return t.name!==e}));return localStorage.setItem("logs",JSON.stringify(n)),n})),o((function(t){var n=t.filter((function(t){return t!==e}));return localStorage.setItem("names",JSON.stringify(n)),n}))):alert("User '"+e+"' can not be deleted.")},children:"X"})]})}))}),Object(l.jsx)("hr",{}),Object(l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(l.jsx)("button",{onClick:function(){window.confirm("Are you sure to clear all logs?")&&c()},children:"Clear"}),Object(l.jsx)("button",{onClick:function(){var e=n.filter((function(e){return f()(e.dateTime).isSame(S,"date")})),t=["No.,Distance(in.),Time(sec.),Name,Date Time"].concat(Object(b.a)(e.map((function(e,t){return"".concat(t+1,",").concat((e.distance||0).toFixed(2),",").concat(e.time/1e3,",").concat(e.name,",").concat(e.dateTime)})))).join("\n"),i="data:text/csv;charset=utf-8,".concat(t),c=encodeURI(i);window.open(c)},children:"Export"})]}),Object(l.jsxs)("div",{style:v.listItem,children:[Object(l.jsx)("div",{style:Object(r.a)(Object(r.a)({},v.th),v.number),children:"No."}),Object(l.jsx)("div",{style:Object(r.a)(Object(r.a)({},v.th),v.distance),children:"Distance (in.)"}),Object(l.jsx)("div",{style:Object(r.a)(Object(r.a)({},v.th),v.time),children:"Time (sec.)"})]}),Object(l.jsx)(m,{data:T,keyExtractor:function(e,t){return t.toString()},renderItem:function(e){var t=e.item,n=e.index,i=t.time/1e3,c="".concat(i);return Object(l.jsxs)("div",{style:v.listItem,children:[Object(l.jsxs)("div",{style:v.number,children:["#",n+1]}),Object(l.jsx)("div",{style:v.distance,children:(t.distance||0).toFixed(2)}),Object(l.jsx)("div",{style:v.time,children:c})]})}})]})},v={container:{flex:1,padding:15,paddingBottom:100},title:{fontSize:24},listItem:{display:"flex",flexDirection:"row",paddingTop:5,paddingBottom:5},th:{fontWeight:"bold"},number:{flex:1,fontSize:20},distance:{flex:3,divAlign:"right",fontSize:20},time:{flex:3,divAlign:"right",fontSize:20},tag:{border:"1px solid #d0d0d0",backgroundColor:"#fff",padding:5,width:"fit-content",display:"flex",gap:3},activeTag:{border:"3px solid lime",backgroundColor:"#d0d0d0",padding:5,width:"fit-content",display:"flex",gap:3},nameRow:{display:"flex",gap:5}},x=function(e){var t=e.alarmTime,n=e.setAlarmTime,c=e.onSaveAlarmTime,a=Object(i.useMemo)((function(){return t/1e3}),[t]);return Object(l.jsx)("div",{style:O.container,children:Object(l.jsxs)("div",{style:O.distanceWrap,children:[Object(l.jsx)("div",{style:O.label,children:"Set Alarm Time (sec)"}),Object(l.jsx)("input",{type:"number",style:O.input,value:a,onChange:function(e){var t=1e3*+e.target.value;n(t)}}),Object(l.jsx)("button",{style:O.button,onClick:c,children:"Save"})]})})},O={container:{display:"flex",flexDirection:"column",flex:1,padding:15},title:{fontSize:24},distanceWrap:{display:"flex",flexDirection:"column",flex:1,alignItems:"center",justifyContent:"center"},input:{fontSize:30,padding:10,margin:20,textAlign:"center",width:100},label:{fontSize:30},button:{fontSize:20},distance:{fontSize:100},unit:{fontSize:30},timer:{marginTop:30,fontSize:35,marginBottom:30}},h="52cf0b2c-28f2-4328-aaac-6badc36777d4",p=function(){var e=Object(i.useState)(!1),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(0),o=Object(s.a)(a,2),r=o[0],l=o[1],d=Object(i.useState)(0),u=Object(s.a)(d,2),j=u[0],f=u[1],m=Object(i.useState)([]),g=Object(s.a)(m,2),v=g[0],x=g[1],O=Object(i.useState)(0),p=Object(s.a)(O,2),y=p[0],S=p[1],C=Object(i.useState)(0),T=Object(s.a)(C,2),N=T[0],w=T[1],k=Object(i.useState)([]),D=Object(s.a)(k,2),L=D[0],A=D[1],I=Object(i.useState)(),z=Object(s.a)(I,2),E=z[0],F=z[1],B=Object(i.useState)(null),J=Object(s.a)(B,2),W=J[0],M=J[1],P=Object(i.useState)(null),R=Object(s.a)(P,2),Y=R[0],U=R[1];Object(i.useEffect)((function(){var e=localStorage.getItem("logs"),t=e?JSON.parse(e):[];x(t);var n=localStorage.getItem("names"),i=n?JSON.parse(n):["NoName"];A(i),F(null===i||void 0===i?void 0:i[0])}),[]);var H=Object(i.useCallback)((function(){x([]),localStorage.removeItem("logs")}),[]),q=Object(i.useCallback)((function(){n?alert("Already connected."):navigator.bluetooth.requestDevice({filters:[{name:"Arrow_ESP32"}],optionalServices:[h]}).then((function(e){return console.log({device:e}),e.addEventListener("gattserverdisconnected",(function(e){var t=e.target;c(!1),M(null),alert("Device disconnected."),console.log("Device ".concat(t.name," is disconnected."))}),{once:!0}),e.gatt.connect()})).then((function(e){return console.log({server:e}),c(e.connected),e.getPrimaryService(h)})).then((function(e){return console.log({service:e}),e.getCharacteristic("051f540c-9a37-4284-9f98-2073e9f5bdfe")})).then((function(e){console.log({characteristic:e}),M(e)})).catch((function(e){console.error(e),window.location.reload()}))}),[n]);Object(i.useEffect)((function(){E&&W&&W.startNotifications().then((function(e){var t=new AbortController;U(t),e.addEventListener("characteristicvaluechanged",(function(e){var t=e.target.value,n=new TextDecoder("utf-8").decode(t).split(","),i=Object(s.a)(n,3),c=i[0],a=i[1],o=i[2],r=+a,d=+o,u=+c;l(r),f(d),S(u),2===u&&x((function(e){var t=[].concat(Object(b.a)(e),[{distance:r,time:d,dateTime:new Date,name:E}]);return localStorage.setItem("logs",JSON.stringify(t)),t}))}),{signal:t.signal})}))}),[E,W]);var V=Object(i.useCallback)((function(e){F(e),Y&&Y.abort()}),[Y]);return{distance:r,time:j,logs:v,isConnected:n,scanAndConnect:q,clearLogs:H,state:y,alarmTime:N,setAlarmTime:w,onSaveAlarmTime:function(){if(n)if(N>=0){var e=N.toString(),t=new TextEncoder("utf-8");W.writeValue(t.encode(e)),alert("Saved !!!")}else alert("Time is not valid !!!");else alert("Please connect to the device.")},names:L,selectedName:E,setNames:A,setSelectedName:F,onChangeName:V,setLogs:x}};var y=function(){var e=p(),t=e.distance,n=e.time,c=e.logs,a=e.isConnected,o=e.scanAndConnect,u=e.clearLogs,b=e.state,j=e.alarmTime,f=e.setAlarmTime,m=e.onSaveAlarmTime,v=e.names,O=e.selectedName,h=e.setNames,y=e.setSelectedName,C=e.onChangeName,T=e.setLogs,N=Object(i.useState)("home"),w=Object(s.a)(N,2),k=w[0],D=w[1],L=Object(i.useMemo)((function(){return{home:{component:d,props:{distance:t,time:n,state:b}},logs:{component:g,props:{data:c,clearLogs:u,names:v,setNames:h,selectedName:O,setSelectedName:y,onChangeName:C,setLogs:T}},setting:{component:x,props:{alarmTime:j,setAlarmTime:f,onSaveAlarmTime:m}}}}),[c,t,n,u,b,j,f,m,v,h,O,y,C,T]),A=L[k].component,I=L[k].props;return Object(l.jsxs)("div",{style:S.container,children:[Object(l.jsxs)("div",{style:S.status,children:[Object(l.jsx)("div",{style:S.scanningdiv,children:a?"Connected":"Disconnected"}),Object(l.jsx)("button",{style:S.button,onClick:o,children:"Scan and Connect"})]}),Object(l.jsx)("div",{style:S.content,children:Object(l.jsx)(A,Object(r.a)({},I))}),Object(l.jsxs)("div",{style:S.tabs,children:[Object(l.jsx)("div",{style:Object(r.a)(Object(r.a)({},S.tab),{borderRightWidth:1,borderRightColor:"#d0d0d0"}),onClick:function(){return D("home")},children:Object(l.jsx)("div",{style:"home"===k?S.activeLabel:S.inactiveLabel,children:"Home"})}),Object(l.jsx)("div",{style:S.tab,onClick:function(){return D("logs")},children:Object(l.jsx)("div",{style:"logs"===k?S.activeLabel:S.inactiveLabel,children:"Logs"})}),Object(l.jsx)("div",{style:S.tab,onClick:function(){return D("setting")},children:Object(l.jsx)("div",{style:"setting"===k?S.activeLabel:S.inactiveLabel,children:"Setting"})})]})]})},S={container:{display:"flex",flexDirection:"column",flex:1,minHeight:"100vh"},content:{display:"flex",flex:1,backgroundColor:"#F5F5DC",height:"100%"},tabs:{display:"flex",flexDirection:"row",position:"fixed",letf:0,right:0,width:"100%",bottom:0,borderTop:"1px solid #d0d0d0"},tab:{display:"flex",flex:1,justifyContent:"center",padding:20,backgroundColor:"#f1f1f1"},activeLabel:{display:"flex",color:"green",fontWeight:"bold"},inactiveLabel:{display:"flex",color:"#444444"},scanningText:{display:"flex",fontSize:30},status:{backgroundColor:"black",color:"white",display:"flex",justifyContent:"space-between",padding:20},button:{}},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),i(e),c(e),a(e),o(e)}))};o.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(y,{})}),document.getElementById("root")),C()}},[[17,1,2]]]);
//# sourceMappingURL=main.037431dc.chunk.js.map