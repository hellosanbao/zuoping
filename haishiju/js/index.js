$(function() {
	function tab(id) {
		var index;
		$("#" + id + " .ty_tab_list .t_list").mouseover(function() {
			index = $(this).index();
			$(this).addClass("l_act").siblings("a").removeClass("l_act");
			$("#" + id + " .ty_t_son").eq(index).addClass("t_act").siblings("div").removeClass("t_act");
		});
		$("#" + id + " .ty_tab_area .ty_t_son").mouseover(function() {
			index = $(this).index();
			$(this).addClass("t_act").siblings("div").removeClass("t_act");
			$("#" + id + " .main_ty_tab_list .t_list").eq(index).addClass("l_act").siblings("span").removeClass("l_act").end().css("background-image","none").prev().css("background-image","none");
		});
		$(".tab_box").mouseleave(function() {
			$(this).find(".ty_t_son").removeClass("t_act");
			$(this).find(".t_list").removeClass("l_act");
		});
		$(".tab_box").find(".ty_t_son").eq(0).removeClass("t_act");
		$(".tab_box").find(".t_list").eq(0).removeClass("l_act");
	}


	//banner图
	$(".slide").eq(0).css({
		"z-index": 10,
		"opacity": 1
	})
	$(".page_nav span").eq(0).css("background", "#1275c1")
	var indexs = 0;
	var inter;

	function autoPlay() {
		inter = setInterval(right, 2500)
	}
	autoPlay();
	$(".page_nav span").click(Selects);
	$(".container").on({
		mouseover: function() {
			clearInterval(inter);
		},
		mouseout: function() {
			autoPlay();
		}
	})

	function act() {
		$(".slide:animated").stop();
		$(".slide").eq(indexs).css("z-index", 20).animate({
			"opacity": 1
		}, 1000).siblings('.slide').css("z-index", 2).animate({
			"opacity": 0
		}, 1000);
		$(".page_nav span").eq(indexs).css("background", "#1275c1").siblings().css("background", "#fff")
	}

	function left() {
		indexs--;
		if (indexs < 0) {
			indexs = $(".page_nav span").length - 1;
		}
		act();
	}

	function right() {
		indexs++;
		if (indexs >= $(".page_nav span").length) {
			indexs = 0;
		}
		act();
	}

	function Selects() {
		clearInterval(inter);
		indexs = $(this).index();
		act();

	}

	function mainTab(pare) {
		var index2;
		$("." + pare + " .c2_tab").mouseover(function() {
			index2 = $(this).index();
			$(this).addClass("on").siblings("span").removeClass("on");
			$("." + pare + " .ty_t_son").eq(index2).addClass("ons").siblings("div").removeClass("ons");
		});
		var index3;
		$("." + pare + " .mid_tab span").mouseover(function() {
			index3 = $(this).index();
			$(this).addClass("sp_ce").siblings("span").removeClass("sp_ce");
			$("." + pare + " .mid_cxt_2").eq(index3).addClass("ons").siblings("div").removeClass("ons");
		});
		$("." + pare + " .ri_tab span").mouseover(function() {
			index3 = $(this).index();
			$(this).addClass("sp_ce").siblings("span").removeClass("sp_ce");
			$("." + pare + " .right_cxt_2").eq(index3).addClass("ons").siblings("div").removeClass("ons");
		});
		$("." + pare + " .t_list").mouseover(function() {

			index3 = $(this).index();
			$(this).addClass("l_act").siblings("a").removeClass("l_act");
			$("." + pare + " .ty_t_son").eq(index3).addClass("ons").siblings("div").removeClass("ons");
		});
	}
	mainTab("t2");
	mainTab("t3");
	mainTab("ban_right");
	function ty_tab(className,addBtnClassName,addCardClassName){
		var index4;
		$("." + className + " .zws_tab").mouseover(function() {
			index4 = $(this).index();
			$(this).addClass(addBtnClassName).siblings("a").removeClass(addBtnClassName);
			$("." + className + " .ty_t_son").eq(index4).addClass(addCardClassName).siblings("div").removeClass(addCardClassName);
		});
	}
	ty_tab("zw_news_list","zw_on","zw_ons");
	ty_tab("bmcx_tab","bm_on","bm_ons")

	/*内页下拉菜单*/
	$(".ez_a").toggle(function() {
		$(this).css("background-image", "url(./images/dow.gif)");
		$(this).parent().find(".ez_ul").slideDown(200);
		if (!$(this).parent().has("li").length) {
			$(this).parent().find(".ez_a").css("background-color", "#1b5dba");
		}
	}, function() {
		if (!$(this).parent().has("li").length) {
		$(this).css("background-color", "#498fe5");
		}else{
		  $(this).parent().find(".ez_a").css("background-image", "url(./images/up.gif)");
		  $(this).parent().find(".ez_ul").slideUp(200);
		}
		
	})
	for (var i=0;i<$(".ez_a").length;i++) {
		if (!$($(".ez_a")[i]).parent().has("li").length) {
			$($(".ez_a")[i]).css("background-image", "url(./images/dow.gif)");
		}
	}
    
	/*内页轮播*/
	function nylb() {
		var index = 0;
		var num =$(".show_list li").length;
		var nums = 5 * (Math.ceil(num / 5));
		$(".show_list").css("width", num * 112 + "px");
		function show() {
			if (num <= 5) {
				if (index > 4){index = 4};
			    if (index < 0){index = 0};
			} else {
				if (index > num - 1) {index = num - 1}
				if (index < 0){index = 0};
			}
			$(".son_img").eq(index).animate({"opacity": 1,"z-index": 2}, 400).siblings("a").animate({"opacity": 0,"z-index": 0}, 400);
			$(".show_list li").eq(index).addClass("onfunc").siblings("li").removeClass("onfunc");
		}
		function left() {
			$(".son_img:animated").stop();
			index -= 1;
			show();
			if (index <num-3) {
				$(".show_list_box").animate({"scrollLeft": "-=112px"}, 300)
			}
		}
		function right() {
			$(".son_img:animated").stop();
			index += 1;
			show();
			if (index>3) {
				$(".show_list_box").animate({"scrollLeft": "+=112px"}, 300)
			}
		}
		$(".left_btn").click(left);
		$(".right_btn").click(right)
		$(".show_list li").click(function() {
			index = $(this).index();
			show();
		})
	}
   nylb();
   
   $(".main_ty_tab_list .t_list").mouseover(function(){
   	$(this).prev().css("background-image","none").prev().css({"background-image":"url(images/top_list_border.gif)","background-position":"right center","background-repeat":"no-repeat"})
     .end().end().css("background-image","none")})
   $(".main_ty_tab_list .t_list").mouseleave(function(){
   	$(this).css({"background-image":"url(images/top_list_border.gif)","background-position":"right center","background-repeat":"no-repeat"})})
   $(".main_tab").mouseout(function(){
   	$(".main_ty_tab_list .t_list").css({"background-image":"url(images/top_list_border.gif)","background-position":"right","background-repeat":"no-repeat"})
   })
	tab("tab1");
	
   $(".tr_nr:even").addClass("trbk");
       /*增加的js 2016-06-16*/
		$(".exit").click(function(){
   	        $(".right_fix").fadeOut(300);
        })
		/*增加的js 2016-06-16*/
})






