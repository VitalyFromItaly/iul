(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{550:function(t,e,n){var content=n(575);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(111).default)("2f4fd5fc",content,!0,{sourceMap:!1})},574:function(t,e,n){"use strict";n(550)},575:function(t,e,n){var r=n(110)((function(i){return i[1]}));r.push([t.i,"/*purgecss start ignore*/\n.image[data-v-5e5a34e3]{\n  min-height:300px;\n  max-height:500px;\n  overflow-y:auto\n}\n\n/*purgecss end ignore*/",""]),r.locals={},t.exports=r},592:function(t,e,n){"use strict";n.r(e);n(44);var r=n(8),o=n(9),c=n(21),l=n(22),f=n(13),d=n(12),y=(n(4),n(1),n(60),n(19),n(32)),v=n(541);function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var m=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},_=function(t,e){if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},w=function(t){Object(c.a)(n,t);var e=h(n);function n(){var t;return Object(r.a)(this,n),(t=e.apply(this,arguments)).imgAttrType=-1,t}return Object(o.a)(n,[{key:"imgUrl",get:function(){var t=this.$config,e=t.baseUrl,n=t.port;return"".concat(e,":").concat(n,"/res_png/")}}]),n}(y.Vue);m([Object(y.Prop)({required:!0}),_("design:type",Array)],w.prototype,"attributes",void 0);var x=w=m([Object(y.Component)({components:{DxDataGrid:v.DxDataGrid,DxColumn:v.DxColumn}})],w),j=(n(574),n(49)),component=Object(j.a)(x,(function(){var t=this,e=t._self._c;t._self._setupProxy;return t.attributes?e("dx-data-grid",{attrs:{id:"gridID","show-column-lines":!0,"show-row-lines":!0,"allow-column-resizing":!0,"allow-column-reordering":!0,"data-source":t.attributes,"show-borders":!0,"repaint-changes-only":!0,"two-way-binding-enabled":!0,"focused-row-enabled":!0,"key-expr":"attr_type_id"},scopedSlots:t._u([{key:"attr_value",fn:function(n){var r=n.data.data,o=r.attr_value,c=r.attr_type_id,l=r.png,f=r.res_id;return[c===t.imgAttrType&&l?e("div",{staticClass:"image"},[e("img",{attrs:{src:t.imgUrl+f}})]):e("p",[t._v("\n      "+t._s(o)+"\n    ")])]}}],null,!1,2707422745)},[e("dx-column",{attrs:{"data-field":"attr_type_name",caption:"Атрибут",width:"33%"}}),t._v(" "),e("dx-column",{attrs:{caption:"Значение","data-field":"attr_value",width:"66%","cell-template":"attr_value"}})],1):t._e()}),[],!1,null,"5e5a34e3",null);e.default=component.exports}}]);