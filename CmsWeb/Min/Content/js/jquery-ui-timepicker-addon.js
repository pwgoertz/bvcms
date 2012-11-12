(function(n){function i(){this.regional=[],this.regional[""]={currentText:"Now",closeText:"Done",ampm:!1,amNames:["AM","A"],pmNames:["PM","P"],timeFormat:"hh:mm tt",timeSuffix:"",timeOnlyTitle:"Choose Time",timeText:"Time",hourText:"Hour",minuteText:"Minute",secondText:"Second",millisecText:"Millisecond",timezoneText:"Time Zone"},this._defaults={showButtonPanel:!0,timeOnly:!1,showHour:!0,showMinute:!0,showSecond:!1,showMillisec:!1,showTimezone:!1,showTime:!0,stepHour:1,stepMinute:1,stepSecond:1,stepMillisec:1,hour:0,minute:0,second:0,millisec:0,timezone:null,useLocalTimezone:!1,defaultTimezone:"+0000",hourMin:0,minuteMin:0,secondMin:0,millisecMin:0,hourMax:23,minuteMax:59,secondMax:59,millisecMax:999,minDateTime:null,maxDateTime:null,onSelect:null,hourGrid:0,minuteGrid:0,secondGrid:0,millisecGrid:0,alwaysSetTime:!0,separator:" ",altFieldTimeOnly:!0,showTimepicker:!0,timezoneIso8601:!1,timezoneList:null,addSliderAccess:!1,sliderAccessArgs:null},n.extend(this._defaults,this.regional[""])}function r(t,i){n.extend(t,i);for(var r in i)(i[r]===null||i[r]===undefined)&&(t[r]=i[r]);return t}if(n.ui.timepicker=n.ui.timepicker||{},!n.ui.timepicker.version){n.extend(n.ui,{timepicker:{version:"1.0.1"}}),n.extend(i.prototype,{$input:null,$altInput:null,$timeObj:null,inst:null,hour_slider:null,minute_slider:null,second_slider:null,millisec_slider:null,timezone_select:null,hour:0,minute:0,second:0,millisec:0,timezone:null,defaultTimezone:"+0000",hourMinOriginal:null,minuteMinOriginal:null,secondMinOriginal:null,millisecMinOriginal:null,hourMaxOriginal:null,minuteMaxOriginal:null,secondMaxOriginal:null,millisecMaxOriginal:null,ampm:"",formattedDate:"",formattedTime:"",formattedDateTime:"",timezoneList:null,setDefaults:function(n){return r(this._defaults,n||{}),this},_newInst:function(t,r){var u=new i,h={},o,s,f,e;for(o in this._defaults)if(s=t.attr("time:"+o),s)try{h[o]=eval(s)}catch(c){h[o]=s}if(u._defaults=n.extend({},this._defaults,h,r,{beforeShow:function(t,i){if(n.isFunction(r.beforeShow))return r.beforeShow(t,i,u)},onChangeMonthYear:function(i,f,e){u._updateDateTime(e),n.isFunction(r.onChangeMonthYear)&&r.onChangeMonthYear.call(t[0],i,f,e,u)},onClose:function(i,f){u.timeDefined===!0&&t.val()!==""&&u._updateDateTime(f),n.isFunction(r.onClose)&&r.onClose.call(t[0],i,f,u)},timepicker:u}),u.amNames=n.map(u._defaults.amNames,function(n){return n.toUpperCase()}),u.pmNames=n.map(u._defaults.pmNames,function(n){return n.toUpperCase()}),u._defaults.timezoneList===null){for(f=[],e=-11;e<=12;e++)f.push((e>=0?"+":"-")+("0"+Math.abs(e).toString()).slice(-2)+"00");u._defaults.timezoneIso8601&&(f=n.map(f,function(n){return n=="+0000"?"Z":n.substring(0,3)+":"+n.substring(3)})),u._defaults.timezoneList=f}return u.timezone=u._defaults.timezone,u.hour=u._defaults.hour,u.minute=u._defaults.minute,u.second=u._defaults.second,u.millisec=u._defaults.millisec,u.ampm="",u.$input=t,r.altField&&(u.$altInput=n(r.altField).css({cursor:"pointer"}).focus(function(){t.trigger("focus")})),(u._defaults.minDate===0||u._defaults.minDateTime===0)&&(u._defaults.minDate=new Date),(u._defaults.maxDate===0||u._defaults.maxDateTime===0)&&(u._defaults.maxDate=new Date),u._defaults.minDate!==undefined&&u._defaults.minDate instanceof Date&&(u._defaults.minDateTime=new Date(u._defaults.minDate.getTime())),u._defaults.minDateTime!==undefined&&u._defaults.minDateTime instanceof Date&&(u._defaults.minDate=new Date(u._defaults.minDateTime.getTime())),u._defaults.maxDate!==undefined&&u._defaults.maxDate instanceof Date&&(u._defaults.maxDateTime=new Date(u._defaults.maxDate.getTime())),u._defaults.maxDateTime!==undefined&&u._defaults.maxDateTime instanceof Date&&(u._defaults.maxDate=new Date(u._defaults.maxDateTime.getTime())),u},_addTimePicker:function(n){var t=this.$altInput&&this._defaults.altFieldTimeOnly?this.$input.val()+" "+this.$altInput.val():this.$input.val();this.timeDefined=this._parseTime(t),this._limitMinMaxDateTime(n,!1),this._injectTimePicker()},_parseTime:function(t,i){var e,r,u;if(this.inst||(this.inst=n.datepicker._getInst(this.$input[0])),i||!this._defaults.timeOnly){e=n.datepicker._get(this.inst,"dateFormat");try{if(r=f(e,this._defaults.timeFormat,t,n.datepicker._getFormatConfig(this.inst),this._defaults),!r.timeObj)return!1;n.extend(this,r.timeObj)}catch(o){return!1}return!0}return(u=n.datepicker.parseTime(this._defaults.timeFormat,t,this._defaults),!u)?!1:(n.extend(this,u),!0)},_injectTimePicker:function(){var w=this.inst.dpDiv,i=this._defaults,r=this,d=parseInt(i.hourMax-(i.hourMax-i.hourMin)%i.stepHour,10),g=parseInt(i.minuteMax-(i.minuteMax-i.minuteMin)%i.stepMinute,10),rt=parseInt(i.secondMax-(i.secondMax-i.secondMin)%i.stepSecond,10),ut=parseInt(i.millisecMax-(i.millisecMax-i.millisecMin)%i.stepMillisec,10),f=this.inst.id.toString().replace(/([^A-Za-z0-9_])/g,""),c,l,a,v,y,o,ft,et,it,ot,p,st;if(w.find("div#ui-timepicker-div-"+f).length===0&&i.showTimepicker){var s=' style="display:none;"',u='<div class="ui-timepicker-div" id="ui-timepicker-div-'+f+'"><dl><dt class="ui_tpicker_time_label" id="ui_tpicker_time_label_'+f+'"'+(i.showTime?"":s)+">"+i.timeText+'<\/dt><dd class="ui_tpicker_time" id="ui_tpicker_time_'+f+'"'+(i.showTime?"":s)+'><\/dd><dt class="ui_tpicker_hour_label" id="ui_tpicker_hour_label_'+f+'"'+(i.showHour?"":s)+">"+i.hourText+"<\/dt>",b=0,k=0,nt=0,tt=0,h=null;if(u+='<dd class="ui_tpicker_hour"><div id="ui_tpicker_hour_'+f+'"'+(i.showHour?"":s)+"><\/div>",i.showHour&&i.hourGrid>0){for(u+='<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>',c=i.hourMin;c<=d;c+=parseInt(i.hourGrid,10))b++,l=i.ampm&&c>12?c-12:c,l<10&&(l="0"+l),i.ampm&&(c===0?l="12a":l+=c<12?"a":"p"),u+="<td>"+l+"<\/td>";u+="<\/tr><\/table><\/div>"}if(u+="<\/dd>",u+='<dt class="ui_tpicker_minute_label" id="ui_tpicker_minute_label_'+f+'"'+(i.showMinute?"":s)+">"+i.minuteText+'<\/dt><dd class="ui_tpicker_minute"><div id="ui_tpicker_minute_'+f+'"'+(i.showMinute?"":s)+"><\/div>",i.showMinute&&i.minuteGrid>0){for(u+='<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>',a=i.minuteMin;a<=g;a+=parseInt(i.minuteGrid,10))k++,u+="<td>"+(a<10?"0":"")+a+"<\/td>";u+="<\/tr><\/table><\/div>"}if(u+="<\/dd>",u+='<dt class="ui_tpicker_second_label" id="ui_tpicker_second_label_'+f+'"'+(i.showSecond?"":s)+">"+i.secondText+'<\/dt><dd class="ui_tpicker_second"><div id="ui_tpicker_second_'+f+'"'+(i.showSecond?"":s)+"><\/div>",i.showSecond&&i.secondGrid>0){for(u+='<div style="padding-left: 1px"><table><tr>',v=i.secondMin;v<=rt;v+=parseInt(i.secondGrid,10))nt++,u+="<td>"+(v<10?"0":"")+v+"<\/td>";u+="<\/tr><\/table><\/div>"}if(u+="<\/dd>",u+='<dt class="ui_tpicker_millisec_label" id="ui_tpicker_millisec_label_'+f+'"'+(i.showMillisec?"":s)+">"+i.millisecText+'<\/dt><dd class="ui_tpicker_millisec"><div id="ui_tpicker_millisec_'+f+'"'+(i.showMillisec?"":s)+"><\/div>",i.showMillisec&&i.millisecGrid>0){for(u+='<div style="padding-left: 1px"><table><tr>',y=i.millisecMin;y<=ut;y+=parseInt(i.millisecGrid,10))tt++,u+="<td>"+(y<10?"0":"")+y+"<\/td>";u+="<\/tr><\/table><\/div>"}u+="<\/dd>",u+='<dt class="ui_tpicker_timezone_label" id="ui_tpicker_timezone_label_'+f+'"'+(i.showTimezone?"":s)+">"+i.timezoneText+"<\/dt>",u+='<dd class="ui_tpicker_timezone" id="ui_tpicker_timezone_'+f+'"'+(i.showTimezone?"":s)+"><\/dd>",u+="<\/dl><\/div>",o=n(u),i.timeOnly===!0&&(o.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">'+i.timeOnlyTitle+"<\/div><\/div>"),w.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()),this.hour_slider=o.find("#ui_tpicker_hour_"+f).slider({orientation:"horizontal",value:this.hour,min:i.hourMin,max:d,step:i.stepHour,slide:function(n,t){r.hour_slider.slider("option","value",t.value),r._onTimeChange()}}),this.minute_slider=o.find("#ui_tpicker_minute_"+f).slider({orientation:"horizontal",value:this.minute,min:i.minuteMin,max:g,step:i.stepMinute,slide:function(n,t){r.minute_slider.slider("option","value",t.value),r._onTimeChange()}}),this.second_slider=o.find("#ui_tpicker_second_"+f).slider({orientation:"horizontal",value:this.second,min:i.secondMin,max:rt,step:i.stepSecond,slide:function(n,t){r.second_slider.slider("option","value",t.value),r._onTimeChange()}}),this.millisec_slider=o.find("#ui_tpicker_millisec_"+f).slider({orientation:"horizontal",value:this.millisec,min:i.millisecMin,max:ut,step:i.stepMillisec,slide:function(n,t){r.millisec_slider.slider("option","value",t.value),r._onTimeChange()}}),this.timezone_select=o.find("#ui_tpicker_timezone_"+f).append("<select><\/select>").find("select"),n.fn.append.apply(this.timezone_select,n.map(i.timezoneList,function(t){return n("<option />").val(typeof t=="object"?t.value:t).text(typeof t=="object"?t.label:t)})),typeof this.timezone!="undefined"&&this.timezone!==null&&this.timezone!==""?(ft=new Date(this.inst.selectedYear,this.inst.selectedMonth,this.inst.selectedDay,12),et=e(ft),et==this.timezone?t(r):this.timezone_select.val(this.timezone)):typeof this.hour!="undefined"&&this.hour!==null&&this.hour!==""?this.timezone_select.val(i.defaultTimezone):t(r),this.timezone_select.change(function(){r._defaults.useLocalTimezone=!1,r._onTimeChange()}),i.showHour&&i.hourGrid>0&&(h=100*b*i.hourGrid/(d-i.hourMin),o.find(".ui_tpicker_hour table").css({width:h+"%",marginLeft:h/(-2*b)+"%",borderCollapse:"collapse"}).find("td").each(function(){n(this).click(function(){var u=n(this).html(),f,t;i.ampm&&(f=u.substring(2).toLowerCase(),t=parseInt(u.substring(0,2),10),u=f=="a"?t==12?0:t:t==12?12:t+12),r.hour_slider.slider("option","value",u),r._onTimeChange(),r._onSelectHandler()}).css({cursor:"pointer",width:100/b+"%",textAlign:"center",overflow:"hidden"})})),i.showMinute&&i.minuteGrid>0&&(h=100*k*i.minuteGrid/(g-i.minuteMin),o.find(".ui_tpicker_minute table").css({width:h+"%",marginLeft:h/(-2*k)+"%",borderCollapse:"collapse"}).find("td").each(function(){n(this).click(function(){r.minute_slider.slider("option","value",n(this).html()),r._onTimeChange(),r._onSelectHandler()}).css({cursor:"pointer",width:100/k+"%",textAlign:"center",overflow:"hidden"})})),i.showSecond&&i.secondGrid>0&&o.find(".ui_tpicker_second table").css({width:h+"%",marginLeft:h/(-2*nt)+"%",borderCollapse:"collapse"}).find("td").each(function(){n(this).click(function(){r.second_slider.slider("option","value",n(this).html()),r._onTimeChange(),r._onSelectHandler()}).css({cursor:"pointer",width:100/nt+"%",textAlign:"center",overflow:"hidden"})}),i.showMillisec&&i.millisecGrid>0&&o.find(".ui_tpicker_millisec table").css({width:h+"%",marginLeft:h/(-2*tt)+"%",borderCollapse:"collapse"}).find("td").each(function(){n(this).click(function(){r.millisec_slider.slider("option","value",n(this).html()),r._onTimeChange(),r._onSelectHandler()}).css({cursor:"pointer",width:100/tt+"%",textAlign:"center",overflow:"hidden"})}),it=w.find(".ui-datepicker-buttonpane"),it.length?it.before(o):w.append(o),this.$timeObj=o.find("#ui_tpicker_time_"+f),this.inst!==null&&(ot=this.timeDefined,this._onTimeChange(),this.timeDefined=ot),p=function(){r._onSelectHandler()},this.hour_slider.bind("slidestop",p),this.minute_slider.bind("slidestop",p),this.second_slider.bind("slidestop",p),this.millisec_slider.bind("slidestop",p),this._defaults.addSliderAccess&&(st=this._defaults.sliderAccessArgs,setTimeout(function(){if(o.find(".ui-slider-access").length===0){o.find(".ui-slider:visible").sliderAccess(st);var t=o.find(".ui-slider-access:eq(0)").outerWidth(!0);t&&o.find("table:visible").each(function(){var i=n(this),r=i.outerWidth(),f=i.css("marginLeft").toString().replace("%",""),u=r-t,e=f*u/r+"%";i.css({width:u,marginLeft:e})})}},0))}},_limitMinMaxDateTime:function(t,i){var r=this._defaults,e=new Date(t.selectedYear,t.selectedMonth,t.selectedDay),u,o,f,s;if(this._defaults.showTimepicker&&(n.datepicker._get(t,"minDateTime")!==null&&n.datepicker._get(t,"minDateTime")!==undefined&&e&&(u=n.datepicker._get(t,"minDateTime"),o=new Date(u.getFullYear(),u.getMonth(),u.getDate(),0,0,0,0),(this.hourMinOriginal===null||this.minuteMinOriginal===null||this.secondMinOriginal===null||this.millisecMinOriginal===null)&&(this.hourMinOriginal=r.hourMin,this.minuteMinOriginal=r.minuteMin,this.secondMinOriginal=r.secondMin,this.millisecMinOriginal=r.millisecMin),t.settings.timeOnly||o.getTime()==e.getTime()?(this._defaults.hourMin=u.getHours(),this.hour<=this._defaults.hourMin?(this.hour=this._defaults.hourMin,this._defaults.minuteMin=u.getMinutes(),this.minute<=this._defaults.minuteMin?(this.minute=this._defaults.minuteMin,this._defaults.secondMin=u.getSeconds()):this.second<=this._defaults.secondMin?(this.second=this._defaults.secondMin,this._defaults.millisecMin=u.getMilliseconds()):(this.millisec<this._defaults.millisecMin&&(this.millisec=this._defaults.millisecMin),this._defaults.millisecMin=this.millisecMinOriginal)):(this._defaults.minuteMin=this.minuteMinOriginal,this._defaults.secondMin=this.secondMinOriginal,this._defaults.millisecMin=this.millisecMinOriginal)):(this._defaults.hourMin=this.hourMinOriginal,this._defaults.minuteMin=this.minuteMinOriginal,this._defaults.secondMin=this.secondMinOriginal,this._defaults.millisecMin=this.millisecMinOriginal)),n.datepicker._get(t,"maxDateTime")!==null&&n.datepicker._get(t,"maxDateTime")!==undefined&&e&&(f=n.datepicker._get(t,"maxDateTime"),s=new Date(f.getFullYear(),f.getMonth(),f.getDate(),0,0,0,0),(this.hourMaxOriginal===null||this.minuteMaxOriginal===null||this.secondMaxOriginal===null)&&(this.hourMaxOriginal=r.hourMax,this.minuteMaxOriginal=r.minuteMax,this.secondMaxOriginal=r.secondMax,this.millisecMaxOriginal=r.millisecMax),t.settings.timeOnly||s.getTime()==e.getTime()?(this._defaults.hourMax=f.getHours(),this.hour>=this._defaults.hourMax?(this.hour=this._defaults.hourMax,this._defaults.minuteMax=f.getMinutes(),this.minute>=this._defaults.minuteMax?(this.minute=this._defaults.minuteMax,this._defaults.secondMax=f.getSeconds()):this.second>=this._defaults.secondMax?(this.second=this._defaults.secondMax,this._defaults.millisecMax=f.getMilliseconds()):(this.millisec>this._defaults.millisecMax&&(this.millisec=this._defaults.millisecMax),this._defaults.millisecMax=this.millisecMaxOriginal)):(this._defaults.minuteMax=this.minuteMaxOriginal,this._defaults.secondMax=this.secondMaxOriginal,this._defaults.millisecMax=this.millisecMaxOriginal)):(this._defaults.hourMax=this.hourMaxOriginal,this._defaults.minuteMax=this.minuteMaxOriginal,this._defaults.secondMax=this.secondMaxOriginal,this._defaults.millisecMax=this.millisecMaxOriginal)),i!==undefined&&i===!0)){var h=parseInt(this._defaults.hourMax-(this._defaults.hourMax-this._defaults.hourMin)%this._defaults.stepHour,10),c=parseInt(this._defaults.minuteMax-(this._defaults.minuteMax-this._defaults.minuteMin)%this._defaults.stepMinute,10),l=parseInt(this._defaults.secondMax-(this._defaults.secondMax-this._defaults.secondMin)%this._defaults.stepSecond,10),a=parseInt(this._defaults.millisecMax-(this._defaults.millisecMax-this._defaults.millisecMin)%this._defaults.stepMillisec,10);this.hour_slider&&this.hour_slider.slider("option",{min:this._defaults.hourMin,max:h}).slider("value",this.hour),this.minute_slider&&this.minute_slider.slider("option",{min:this._defaults.minuteMin,max:c}).slider("value",this.minute),this.second_slider&&this.second_slider.slider("option",{min:this._defaults.secondMin,max:l}).slider("value",this.second),this.millisec_slider&&this.millisec_slider.slider("option",{min:this._defaults.millisecMin,max:a}).slider("value",this.millisec)}},_onTimeChange:function(){var t=this.hour_slider?this.hour_slider.slider("value"):!1,i=this.minute_slider?this.minute_slider.slider("value"):!1,r=this.second_slider?this.second_slider.slider("value"):!1,u=this.millisec_slider?this.millisec_slider.slider("value"):!1,f=this.timezone_select?this.timezone_select.val():!1,e=this._defaults,s,o;typeof t=="object"&&(t=!1),typeof i=="object"&&(i=!1),typeof r=="object"&&(r=!1),typeof u=="object"&&(u=!1),typeof f=="object"&&(f=!1),t!==!1&&(t=parseInt(t,10)),i!==!1&&(i=parseInt(i,10)),r!==!1&&(r=parseInt(r,10)),u!==!1&&(u=parseInt(u,10)),s=e[t<12?"amNames":"pmNames"][0],o=t!=this.hour||i!=this.minute||r!=this.second||u!=this.millisec||this.ampm.length>0&&t<12!=(n.inArray(this.ampm.toUpperCase(),this.amNames)!==-1)||f!=this.timezone,o&&(t!==!1&&(this.hour=t),i!==!1&&(this.minute=i),r!==!1&&(this.second=r),u!==!1&&(this.millisec=u),f!==!1&&(this.timezone=f),this.inst||(this.inst=n.datepicker._getInst(this.$input[0])),this._limitMinMaxDateTime(this.inst,!0)),e.ampm&&(this.ampm=s),this.formattedTime=n.datepicker.formatTime(this._defaults.timeFormat,this,this._defaults),this.$timeObj&&this.$timeObj.text(this.formattedTime+e.timeSuffix),this.timeDefined=!0,o&&this._updateDateTime()},_onSelectHandler:function(){var n=this._defaults.onSelect,t=this.$input?this.$input[0]:null;n&&t&&n.apply(t,[this.formattedDateTime,this])},_formatTime:function(t,i){t=t||{hour:this.hour,minute:this.minute,second:this.second,millisec:this.millisec,ampm:this.ampm,timezone:this.timezone};var r=(i||this._defaults.timeFormat).toString();if(r=n.datepicker.formatTime(r,t,this._defaults),arguments.length)return r;this.formattedTime=r},_updateDateTime:function(t){var i;t=this.inst||t;var r=n.datepicker._daylightSavingAdjust(new Date(t.selectedYear,t.selectedMonth,t.selectedDay)),u=n.datepicker._get(t,"dateFormat"),f=n.datepicker._getFormatConfig(t),e=r!==null&&this.timeDefined;this.formattedDate=n.datepicker.formatDate(u,r===null?new Date:r,f),i=this.formattedDate,this._defaults.timeOnly===!0?i=this.formattedTime:this._defaults.timeOnly!==!0&&(this._defaults.alwaysSetTime||e)&&(i+=this._defaults.separator+this.formattedTime+this._defaults.timeSuffix),this.formattedDateTime=i,this._defaults.showTimepicker?this.$altInput&&this._defaults.altFieldTimeOnly===!0?(this.$altInput.val(this.formattedTime),this.$input.val(this.formattedDate)):this.$altInput?(this.$altInput.val(i),this.$input.val(i)):this.$input.val(i):this.$input.val(this.formattedDate),this.$input.trigger("change")}}),n.fn.extend({timepicker:function(t){t=t||{};var i=arguments;return typeof t=="object"&&(i[0]=n.extend(t,{timeOnly:!0})),n(this).each(function(){n.fn.datetimepicker.apply(n(this),i)})},datetimepicker:function(t){t=t||{};var i=arguments;return typeof t=="string"?t=="getDate"?n.fn.datepicker.apply(n(this[0]),i):this.each(function(){var t=n(this);t.datepicker.apply(t,i)}):this.each(function(){var i=n(this);i.datepicker(n.timepicker._newInst(i,t)._defaults)})}}),n.datepicker.parseDateTime=function(n,t,i,r,u){var o=f(n,t,i,r,u),e;return o.timeObj&&(e=o.timeObj,o.date.setHours(e.hour,e.minute,e.second,e.millisec)),o.date},n.datepicker.parseTime=function(t,i,u){var l=function(t,i){var r=[];return t&&n.merge(r,t),i&&n.merge(r,i),r=n.map(r,function(n){return n.replace(/[.*+?|()\[\]{}\\]/g,"\\$&")}),"("+r.join("|")+")?"},a=function(n){var i=n.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z)/g),r={h:-1,m:-1,s:-1,l:-1,t:-1,z:-1},t;if(i)for(t=0;t<i.length;t++)r[i[t].toString().charAt(0)]==-1&&(r[i[t].toString().charAt(0)]=t+1);return r},h=r(r({},n.timepicker._defaults),u||{}),v="^"+t.toString().replace(/h{1,2}/ig,"(\\d?\\d)").replace(/m{1,2}/ig,"(\\d?\\d)").replace(/s{1,2}/ig,"(\\d?\\d)").replace(/l{1}/ig,"(\\d?\\d?\\d)").replace(/t{1,2}/ig,l(h.amNames,h.pmNames)).replace(/z{1}/ig,"(z|[-+]\\d\\d:?\\d\\d)?").replace(/\s/g,"\\s?")+h.timeSuffix+"$",f=a(t),c="",e,s,o;if(e=i.match(new RegExp(v,"i")),s={hour:0,minute:0,second:0,millisec:0},e){if(f.t!==-1&&(e[f.t]===undefined||e[f.t].length===0?(c="",s.ampm=""):(c=n.inArray(e[f.t],h.amNames)!==-1?"AM":"PM",s.ampm=h[c=="AM"?"amNames":"pmNames"][0])),f.h!==-1&&(s.hour=c=="AM"&&e[f.h]=="12"?0:c=="PM"&&e[f.h]!="12"?parseInt(e[f.h],10)+12:Number(e[f.h])),f.m!==-1&&(s.minute=Number(e[f.m])),f.s!==-1&&(s.second=Number(e[f.s])),f.l!==-1&&(s.millisec=Number(e[f.l])),f.z!==-1&&e[f.z]!==undefined){o=e[f.z].toUpperCase();switch(o.length){case 1:o=h.timezoneIso8601?"Z":"+0000";break;case 5:h.timezoneIso8601&&(o=o.substring(1)=="0000"?"Z":o.substring(0,3)+":"+o.substring(3));break;case 6:h.timezoneIso8601?o.substring(1)=="00:00"&&(o="Z"):o=o=="Z"||o.substring(1)=="00:00"?"+0000":o.replace(/:/,"")}s.timezone=o}return s}return!1},n.datepicker.formatTime=function(t,i,r){r=r||{},r=n.extend(n.timepicker._defaults,r),i=n.extend({hour:0,minute:0,second:0,millisec:0,timezone:"+0000"},i);var e=t,f=r.amNames[0],u=parseInt(i.hour,10);return r.ampm&&(u>11&&(f=r.pmNames[0],u>12&&(u=u%12)),u===0&&(u=12)),e=e.replace(/(?:hh?|mm?|ss?|[tT]{1,2}|[lz])/g,function(n){switch(n.toLowerCase()){case"hh":return("0"+u).slice(-2);case"h":return u;case"mm":return("0"+i.minute).slice(-2);case"m":return i.minute;case"ss":return("0"+i.second).slice(-2);case"s":return i.second;case"l":return("00"+i.millisec).slice(-3);case"z":return i.timezone;case"t":case"tt":return r.ampm?(n.length==1&&(f=f.charAt(0)),n.charAt(0)=="T"?f.toUpperCase():f.toLowerCase()):""}}),n.trim(e)},n.datepicker._base_selectDate=n.datepicker._selectDate,n.datepicker._selectDate=function(t,i){var r=this._getInst(n(t)[0]),u=this._get(r,"timepicker");u?(u._limitMinMaxDateTime(r,!0),r.inline=r.stay_open=!0,this._base_selectDate(t,i),r.inline=r.stay_open=!1,this._notifyChange(r),this._updateDatepicker(r)):this._base_selectDate(t,i)},n.datepicker._base_updateDatepicker=n.datepicker._updateDatepicker,n.datepicker._updateDatepicker=function(i){var f=i.input[0],r,u;n.datepicker._curInst&&n.datepicker._curInst!=i&&n.datepicker._datepickerShowing&&n.datepicker._lastInput!=f||(typeof i.stay_open!="boolean"||i.stay_open===!1)&&(this._base_updateDatepicker(i),r=this._get(i,"timepicker"),r&&(r._addTimePicker(i),r._defaults.useLocalTimezone&&(u=new Date(i.selectedYear,i.selectedMonth,i.selectedDay,12),t(r,u),r._onTimeChange())))},n.datepicker._base_doKeyPress=n.datepicker._doKeyPress,n.datepicker._doKeyPress=function(t){var u=n.datepicker._getInst(t.target),i=n.datepicker._get(u,"timepicker");if(i&&n.datepicker._get(u,"constrainInput")){var r=i._defaults.ampm,f=n.datepicker._possibleChars(n.datepicker._get(u,"dateFormat")),o=i._defaults.timeFormat.toString().replace(/[hms]/g,"").replace(/TT/g,r?"APM":"").replace(/Tt/g,r?"AaPpMm":"").replace(/tT/g,r?"AaPpMm":"").replace(/T/g,r?"AP":"").replace(/tt/g,r?"apm":"").replace(/t/g,r?"ap":"")+" "+i._defaults.separator+i._defaults.timeSuffix+(i._defaults.showTimezone?i._defaults.timezoneList.join(""):"")+i._defaults.amNames.join("")+i._defaults.pmNames.join("")+f,e=String.fromCharCode(t.charCode===undefined?t.keyCode:t.charCode);return t.ctrlKey||e<" "||!f||o.indexOf(e)>-1}return n.datepicker._base_doKeyPress(t)},n.datepicker._base_doKeyUp=n.datepicker._doKeyUp,n.datepicker._doKeyUp=function(t){var i=n.datepicker._getInst(t.target),r=n.datepicker._get(i,"timepicker");if(r&&r._defaults.timeOnly&&i.input.val()!=i.lastVal)try{n.datepicker._updateDatepicker(i)}catch(u){n.datepicker.log(u)}return n.datepicker._base_doKeyUp(t)},n.datepicker._base_gotoToday=n.datepicker._gotoToday,n.datepicker._gotoToday=function(i){var r=this._getInst(n(i)[0]),e=r.dpDiv,u,f;this._base_gotoToday(i),u=this._get(r,"timepicker"),t(u),f=new Date,this._setTime(r,f),n(".ui-datepicker-today",e).click()},n.datepicker._disableTimepickerDatepicker=function(t){var r=this._getInst(t),i;r&&(i=this._get(r,"timepicker"),n(t).datepicker("getDate"),i&&(i._defaults.showTimepicker=!1,i._updateDateTime(r)))},n.datepicker._enableTimepickerDatepicker=function(t){var r=this._getInst(t),i;r&&(i=this._get(r,"timepicker"),n(t).datepicker("getDate"),i&&(i._defaults.showTimepicker=!0,i._addTimePicker(r),i._updateDateTime(r)))},n.datepicker._setTime=function(n,t){var r=this._get(n,"timepicker");if(r){var i=r._defaults,u=t?t.getHours():i.hour,f=t?t.getMinutes():i.minute,e=t?t.getSeconds():i.second,o=t?t.getMilliseconds():i.millisec,h=u===i.hourMin,c=f===i.minuteMin,l=e===i.secondMin,s=!1;u<i.hourMin||u>i.hourMax?s=!0:(f<i.minuteMin||f>i.minuteMax)&&h?s=!0:(e<i.secondMin||e>i.secondMax)&&h&&c?s=!0:(o<i.millisecMin||o>i.millisecMax)&&h&&c&&l&&(s=!0),s&&(u=i.hourMin,f=i.minuteMin,e=i.secondMin,o=i.millisecMin),r.hour=u,r.minute=f,r.second=e,r.millisec=o,r.hour_slider&&r.hour_slider.slider("value",u),r.minute_slider&&r.minute_slider.slider("value",f),r.second_slider&&r.second_slider.slider("value",e),r.millisec_slider&&r.millisec_slider.slider("value",o),r._onTimeChange(),r._updateDateTime(n)}},n.datepicker._setTimeDatepicker=function(n,t,i){var f=this._getInst(n),r,u;f&&(r=this._get(f,"timepicker"),r&&(this._setDateFromField(f),t&&(typeof t=="string"?(r._parseTime(t,i),u=new Date,u.setHours(r.hour,r.minute,r.second,r.millisec)):u=new Date(t.getTime()),u.toString()=="Invalid Date"&&(u=undefined),this._setTime(f,u))))},n.datepicker._base_setDateDatepicker=n.datepicker._setDateDatepicker,n.datepicker._setDateDatepicker=function(n,t){var i=this._getInst(n),r;i&&(r=t instanceof Date?new Date(t.getTime()):t,this._updateDatepicker(i),this._base_setDateDatepicker.apply(this,arguments),this._setTimeDatepicker(n,r,!0))},n.datepicker._base_getDateDatepicker=n.datepicker._getDateDatepicker,n.datepicker._getDateDatepicker=function(t,i){var u=this._getInst(t),r,f;if(u)return(r=this._get(u,"timepicker"),r)?(this._setDateFromField(u,i),(f=this._getDate(u))&&r._parseTime(n(t).val(),r.timeOnly)&&f.setHours(r.hour,r.minute,r.second,r.millisec),f):this._base_getDateDatepicker(t,i)},n.datepicker._base_parseDate=n.datepicker.parseDate,n.datepicker.parseDate=function(t,i,r){var f=u(t,i,r);return n.datepicker._base_parseDate(t,f[0],r)},n.datepicker._base_formatDate=n.datepicker._formatDate,n.datepicker._formatDate=function(n){var t=this._get(n,"timepicker");return t?(t._updateDateTime(n),t.$input.val()):this._base_formatDate(n)},n.datepicker._base_optionDatepicker=n.datepicker._optionDatepicker,n.datepicker._optionDatepicker=function(n,t,i){var o=this._getInst(n),f;if(!o)return null;if(f=this._get(o,"timepicker"),f){var r=null,u=null,e=null;typeof t=="string"?t==="minDate"||t==="minDateTime"?r=i:t==="maxDate"||t==="maxDateTime"?u=i:t==="onSelect"&&(e=i):typeof t=="object"&&(t.minDate?r=t.minDate:t.minDateTime?r=t.minDateTime:t.maxDate?u=t.maxDate:t.maxDateTime&&(u=t.maxDateTime)),r?(r=r===0?new Date:new Date(r),f._defaults.minDate=r,f._defaults.minDateTime=r):u?(u=u===0?new Date:new Date(u),f._defaults.maxDate=u,f._defaults.maxDateTime=u):e&&(f._defaults.onSelect=e)}return i===undefined?this._base_optionDatepicker(n,t):this._base_optionDatepicker(n,t,i)};var u=function(t,i,r){var e,f,o;try{e=n.datepicker._base_parseDate(t,i,r)}catch(u){if(u.indexOf(":")>=0)return f=i.length-(u.length-u.indexOf(":")-2),o=i.substring(f),[i.substring(0,f),i.substring(f)];throw u;}return[i,""]},f=function(t,i,r,f,e){var s,h=u(t,r,f),o,c,l;if(s=n.datepicker._base_parseDate(t,h[0],f),h[1]!==""){if(o=h[1],c=e&&e.separator?e.separator:n.timepicker._defaults.separator,o.indexOf(c)!==0)throw"Missing time separator";if(o=o.substring(c.length),l=n.datepicker.parseTime(i,o,e),l===null)throw"Wrong time format";return{date:s,timeObj:l}}return{date:s}},t=function(n,t){if(n&&n.timezone_select){n._defaults.useLocalTimezone=!0;var r=typeof t!="undefined"?t:new Date,i=e(r);n._defaults.timezoneIso8601&&(i=i.substring(0,3)+":"+i.substring(3)),n.timezone_select.val(i)}},e=function(n){var t=n.getTimezoneOffset()*-10100/60;return(t>=0?"+":"-")+Math.abs(t).toString().substr(1)};n.timepicker=new i,n.timepicker.version="1.0.1"}})(jQuery)