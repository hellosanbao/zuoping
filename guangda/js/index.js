$(function(){
	$(".t-nav-list li").mouseenter(function(){
		$(this).find(".drop-dow").slideDown(300)
	}).mouseleave(function(){
		$(this).find(".drop-dow").stop(true,true).hide();
	})	
	
	$(".comp-item").mouseenter(function(){
		$(this).find(".alt-mode").show().animate({"bottom":0,"opacity":1},200)
	}).mouseleave(function(){
		var _this_=this;
		$(this).find(".alt-mode").stop(true,true).fadeOut(200,function(){
			$(_this_).find(".alt-mode").css({"bottom":"40px","opacity":0})
		})
	})
	$(".fl_right .close").click(function(){
		$(".fl_right").hide();
	})
	
	// $(".first-floor .item").each(function(n,el){
	// 	var s=$(el).children(".se-floor").length;
	// 	if(s>0){
	// 		$(el).addClass('down-act');
	// 	    $(el).mouseenter(function(){
	// 			$(this).toggleClass('down-act')
	// 			if($(this).hasClass('down-act')){
	// 				$(this).find('.se-floor').slideUp(250);
	// 			}else{
	// 				$(this).find('.se-floor').slideDown(250);
	// 			}
	// 		})
	// 	}
	// })
	//左侧下拉菜单
	$(".first-floor .item").mouseenter(function() {
		$(this).find('.se-floor').stop(true,true).slideDown(250);
	}).mouseleave(function() {
		$(this).find('.se-floor').slideUp(250);
	});;
	
//右侧悬浮
var flag=1;
$('#rightArrow').click(function(){
	if(flag==1){
		$("#floatDivBoxs").animate({right: '-175px'},300);
		$(this).animate({right: '-5px'},300);
		$(this).css('background-position','-50px 0');
		flag=0;
	}else{
		$("#floatDivBoxs").animate({right: '0'},300);
		$(this).animate({right: '170px'},300);
		$(this).css('background-position','0px 0');
		flag=1;
	}
});
})

	function b(){	
	t = parseInt(x.css('top'));
	y.css('top','19px');	
	x.animate({top: t - 19 + 'px'},'slow');	//19为每个li的高度
	if(Math.abs(t) == h-19){ //19为每个li的高度
		y.animate({top:'0px'},'slow');
		z=x;
		x=y;
		y=z;
	}
	setTimeout(b,3000);//滚动间隔时间 现在是3秒
}
$(document).ready(function(){
	$('.swap').html($('.news_li').html());
	x = $('.news_li');
	y = $('.swap');
	h = $('.news_li li').length * 19; //19为每个li的高度
	setTimeout(b,3000);//滚动间隔时间 现在是3秒
	
})


//轮播
var slide=function(){
    	$(".slide").eq(0).css({"z-index":10,"opacity":1})
	$(".page_nav span").eq(0).css("background","#ff6c00")
	var indexs=0;var inter;

    function autoPlay(){
       inter=setInterval(right,3000)
    }
	autoPlay();
	$(".page_nav span").click(Selects);
	$(".prev").click(left);
	$(".next").click(right);
		function act(){
		$(".slide:animated").stop();
		$(".slide").eq(indexs).css("z-index",20).animate({"opacity": 1}, 1000).siblings('.slide').css("z-index",2).animate({"opacity": 0}, 1000);
	    $(".page_nav span").eq(indexs).css("background","#ff6c00").siblings().css("background","none")
	}
	function left(){
       indexs--;
       if(indexs<0){
       	indexs=$(".slide").length-1;
       }
       act();
	}
	function right(){
       indexs++;
       if(indexs>=$(".slide").length){
       	indexs=0;
       }
       act();
	}
	function Selects(){
		clearInterval(inter);
       indexs=$(this).index();
       act();
	   autoPlay()
	}
    }
