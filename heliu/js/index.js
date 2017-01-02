$(function(){
	var bodyHeight=window.innerHeight;
	 $(".meun-btn").click(function(){
	 	if($(".top-menu-mob").hasClass("top-menu-mob-show")){
	 		$(".top-menu-mob").removeClass("top-menu-mob-show")
	 		$(this).removeClass("exit-btn")
	 		document.removeEventListener('touchmove', function () {})
	 	}else{
	 		$(".top-menu-mob").addClass("top-menu-mob-show")
	 		$(this).addClass("exit-btn")
	 		$(".top-box")[0].addEventListener('touchmove', function (e) {
    			e.preventDefault()
			})
	 	}
	 	
	 })
	 var menudow=function (){
	 	var ind=0;
	 	$(".top-menu-wrap li").mouseover(function(){
	 		ind=$(this).index();
	 			if(ind!=4){
	 				$(".top-menu-down").slideDown();
	 				$(".top-menu-down>li").eq(ind).show().siblings("li").hide()
	 			}else{
	 				$(".top-menu-down").slideUp();
	 			}
	 			$(".top-menu-wrap li").eq(ind).find("a").addClass("cur-active")
	 			$(".top-menu-wrap li").eq(ind).siblings().find("a").removeClass("cur-active")
	 		
	    })
	 	$(".top-menu-down").mouseleave(function(e){
	 		if((!$(e.relatedTarget).hasClass("top-menu-wrap") ) && (!$(e.relatedTarget).hasClass("menu-link")))
	 		$(".top-menu-down").slideUp();
	 	})
	 	$(".top-menu-wrap").mouseleave(function(e){
	 		if(!$(e.relatedTarget).hasClass("top-menu-ty")){
	 			$(".top-menu-down").slideUp();
	 		}
	 		
	 	})
	 	
	 }
	 new menudow();
	 
	 $(".top-banner .ban-vid-btn").click(function(){
	 	$(".top-banner .ban-vid-wrap").fadeIn(300);
	 })
	 $(".top-banner .ban-vid-wrap").click(function(event){
	 	if(event.target==this||event.target==$(".top-ban-exit")[0]){
	 		$(this).fadeOut(300);
	 	}
	 })

	    function thump(){
	    	var w=$("#wrap").width();
	 		if(w>640){
	 			$(".banner3").addClass("swiper-container3");
	 			$(".banner3").addClass("swiper-container");
	 			$(".banner3-warp").addClass("swiper-wrapper");
	 			$(".banner3-slide").addClass("swiper-slide");
	 			var mySwiper3 = new Swiper('.swiper-container3', opts)
	 		}else{
	 			$(".banner3").removeClass("swiper-container3");
	 			$(".banner3").removeClass("swiper-container");
	 			$(".banner3-warp").removeClass("swiper-wrapper");
	 			$(".banner3-slide").removeClass("swiper-slide")
	 		}
	   }
	    thump()
	    $(window).resize(thump);

	 	
})
