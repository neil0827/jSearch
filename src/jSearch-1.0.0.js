/*!
 * jSearch v1.0.0
 * Copyright 2015 li rui
 * Released under the MIT license
 */

;(function($){
	var Search = function(ele,opt){
		this.$element = ele;
		this.defaults = {
			items:[{text:"first",value:"1"},{text:"second",value:"2"},{text:"third",value:"3"}],
			autoClear:true,
			onsearch:function(name,value){
				
			}
		};
		this.options = $.extend({},this.defaults,opt);
	};
	
	Search.prototype = {
		execute:function(){
			return this.createHtmlContent().appendTo(this.$element);
		},
		createHtmlContent:function(){
			var that,content,select,search,node;
			that = this;
			content = $("<div id='jSearch-container' class='jSearch-container'></div>");
			select = $("<select id='jSearch_name'></select>");
			for(var i=0;i<this.options.items.length;i++){
				select.append("<option value='"+this.options.items[i].value+"'>"+this.options.items[i].text+"</option>");
			}
			content.append(select);
			search = $("<input id='jSearch_value' type='text' />");
			content.append(search);
			if(this.options.autoClear){
				select.on("change",function(){
					search.val("");
				})
			}
			node = $("<button id='jSearch-button'>search</button>").on("click",function(){that.options.onsearch($("#jSearch_name").val(),$("#jSearch_value").val());});
			content.append(node);
			return content;
		},
	};
	
	$.extend($.fn,{
		jSearch: function(options){
			var plugin = new Search(this,options);
			return plugin.execute();
		}
	});
})(jQuery);