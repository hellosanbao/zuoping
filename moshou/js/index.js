 $(function() {
	$(".select-mn").click(function(){
		for(var i=0;i<$(".select-mn").length;i++){
			if($(".select-mn")[i]!=this){
				$($(".select-mn")[i]).find(".my-sel").hide();
			}
		}
	})
	var SELECT = function(obj) {
		var opts = $(obj).find("option");
		var selParent = $(obj).parent();
		var ind = 0;
		var defaultTxt;
		for(var j = 0; j < opts.length; j++) {
			if($(opts[j]).attr("selected")) {
				defaultTxt = $(opts[j]).text()
			} else {
				defaultTxt = $(opts[0]).text()
			}
		}

		selParent.append("<div class='my-sel-wrap'> <div class='seld-txt'>" + defaultTxt + "</div> <ul class='my-sel'></ul></div>");
		for(var i = 0; i < opts.length; i++) {
			selParent.find(".my-sel").append("<li class='mn-opts'>" + $(opts[i]).text() + "</li>")
		}
		selParent.find(".my-sel li").click(function() {
			ind = $(this).index();
			opts.eq(ind).attr("selected", "selected");
			opts.eq(ind).siblings().removeAttr("selected")
			selParent.find(".seld-txt").text($(this).text())
			$(this).parent().hide()
		})
		
		selParent.find(".seld-txt").click(function(){
			selParent.find(".my-sel").toggle();
		})
		$("body").click(function(event){
			event.stopPropagation();
			if(!$(event.target).hasClass("seld-txt") && !$(event.target).hasClass("mn-opts")){
				    selParent.find(".my-sel").hide();
			}
				
		})
	}
	new SELECT(".se-banben");
	new SELECT(".se-type");
	new SELECT(".tj-type");
	new SELECT(".tj-xianlu");
	new SELECT(".tj-banben");
	var listTy=$(".cont-list-ty");
	$(".cont-list-ty").eq(listTy.length-1).css("border","0")
	
	//首页tab
	
	var mTab=function (ls,dl){
		var ind=0,
		ls=$(ls),dl=$(dl);
		ls.find("li").click(function(){
			ind=$(this).index()
			$(this).addClass("current-pt").siblings("li").removeClass("current-pt");
			dl.find("ul").eq(ind).show().siblings("ul").hide();
		})
	}
	
	new mTab(".pt-tab",".hot-pt-list")
	
	$(".cat-mode-show").click(function(){
		$(".cat-model").fadeIn(150);
		return false;
	})
	$(".cat-model").click(function(event){
		if(event.target==this||event.target==$(".cat-exit")[0]){
			$(this).fadeOut(150);
		}
	})
	
	//评论展开
	$(".remes-item-alt").click(function(){
		$(this).parents(".user-pl-item").find(".remes-dow").toggle();
		return false;
	})
	
	/*弹窗登录tab*/
	var tabClass=function(item,curitem,block){
		var ind=0;
		$(item).find(".zj-tab-til-ty").click(function(){
			ind=$(this).index();
			$(this).addClass(curitem).siblings().removeClass(curitem);
			$(block).find(".zj-tab-nr-ty").eq(ind).show().siblings().hide();
		})
	}
	new tabClass(".dl-tab-item","current-item",".dl-tab-nr")
	new tabClass(".lt-tab-item","lt-tab-item-current",".lt-tab-nr")
	
	$(".dl-model-btn").click(function(){
		$(".dl-alt-model").fadeIn(150);
		return false;
	})
	
	$(".dl-alt-model").click(function(event){
		if(event.target==$(".dl-exit")[0]){
			$(this).fadeOut(150)
		}
	})
	
	new SELECT(".lt-type");
	
	var showAds=function(){
		var showpic=$(".lt-trg")
		$(".tj-bd-table input,.tj-bd-table .tj-select,.tj-select textarea").click(function(){showpic.css("display","block")})
		for(var i=1;i<9;i++){
			$(".zhishi-"+i).attr("data-num",i);
			$(".zhishi-"+i).click(function(){
				var srcNum=$(this).attr("data-num");
				sp("0"+srcNum+"right_biaoti.jpg");
			})
		}
		
		function sp(src){
			showpic.find("img").attr("src","images/"+src)
		}
	}
	new showAds();
})