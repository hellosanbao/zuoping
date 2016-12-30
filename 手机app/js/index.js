$(function(){
	/*字体自适应*/
		var wrapWidth = document.getElementById("wrap").clientWidth;
		var body=document.getElementsByTagName("body")[0];
		body.style.fontSize=14*wrapWidth/320+"px";
		window.onresize=function() {
             wrapWidth = document.getElementById("wrap").clientWidth;
		body.style.fontSize=14*wrapWidth/320+"px";
	};
	
	var ALTMODEL=function(){
		$(".buy_btn").click(function(){SHOWMODEL(this)});
		$(".person_mes_edit").click(function(){SHOWMODEL(this)})
		$(".bd_btn").click(function(){SHOWMODEL(this)})
		$(".sh_ads_edit").click(function(){SHOWMODEL(this)})
		$(".ind-ads-ico,.ind-mes-ico").click(function(){SHOWMODEL(this)})
		$(".ind-mes-ico").click(function(){SHOWMODEL(this)})
		$(".exit,.sure").click(function(){HIDEMODEL(event)});
		function SHOWMODEL(obj){
			var charm=$(obj).find(".alt_model").length;
			if(charm){
				$(obj).find(".alt_model").show();
			}
		}
		function HIDEMODEL(event){
			event.stopPropagation();
			$(".alt_model").css("display","none");
		}
	}
	var COMM=function(){
		$(".ui-page").attr("tabindex","");
		$(".txfh").click(function(){
			$(this).removeClass("txfh").addClass("seld");
			$(this).html("已提醒");
		})
		$(".sex_btn").click(function(){RADIO(this)})
		$(".ads_btn").click(function(){CHECKBOX(this)})
		//顶部固定
		$(".fix").wrap("<div class='fix_top'></div>")
		$(".fix_top").after("<div class='clear_fix'></div>");
		
		//底部固定
		$(".fix_b").wrap("<div class='fix_bottom'></div>")
		$(".fix_bottom").before("<div class='clear_bot_fix'></div>");
		
		//raido模拟
		function RADIO(obj){
			$(obj).find(".ck_ico").addClass("xz").end().siblings("label").find(".ck_ico").removeClass("xz");
		}
		//checkbox模拟
		var clicked=true;
		function CHECKBOX(obj){
			if(clicked){
				$(obj).find(".ck_ico").addClass("xz")
			}else{
				$(obj).find(".ck_ico").removeClass("xz")
			}
			clicked=!clicked;
		}
		
		//收货地址编辑ads_bj_btn
		$(".ads_bj_btn").click(function(){ADSEDIT(this,event)})
		function ADSEDIT(obj,event){
			if(event.target==obj){
			  $(obj).find(".shdz_edt").toggle();
			  for(var i=0;i<$(".shdz_edt").length;i++){
			  	if($(".shdz_edt")[i].parentNode!=obj){
			  	   $($(".shdz_edt")[i]).hide();
			  }
			  }
			}
		}
		
		//下拉列表
		$(".q_list li").click(function(){MENUDOW(this)})
		$(".dow_list").click(function(event){event.stopPropagation()})
		function MENUDOW(obj){
			if($(obj).find(".dow_list").css("display")=="none"){
			   $(obj).find(".par_jt").addClass("par_jt_active")
			   $(obj).addClass("q_list_br")
			}else{
				$(obj).find(".par_jt").removeClass("par_jt_active")
				$(obj).removeClass("q_list_br")
			}
			$(obj).find(".dow_list").toggle(100);
		}
		
		//音量
		$(".vio_btn").click(function(){VIOSELECT(this)})
		function VIOSELECT(obj){
			$(obj).removeClass("cur_btn_zt").siblings("label").addClass("cur_btn_zt")
		}
	   
	   //登录输入选择
	   $("._dl1,._dl2").keyup(function(){LOGINCHECK(this)})
	   function LOGINCHECK(obj){
	   		if($("._dl1").val().length!=0 && $("._dl2").val().length!=0){
	   			$(".ctn_cont").addClass("suc_dl");
	   		}else{
	   			$(".ctn_cont").removeClass("suc_dl");
	   		}
	   }
	   
	   //公共首页下拉
	   $(".show-link-pic").click(function(){SHOWPICDOWN(this)})
	   for(var i=0;i<$(".tp-list-pic").length;i++){
	   	 $($(".tp-list-ty")[i]).find(".tp-list-pic").find(".tp-list-link").eq(2).nextAll().hide();
	   }
	   function SHOWPICDOWN(obj){
	   	if($(obj).parent().find(".tp-list-pic").find(".tp-list-link").eq(2).next().css("display")=="none"){
	   		$(obj).find(".jt-xia-ico").addClass("jt-s-ico").end().find(".zk-wz").text("收起");
	   	}else{
	   		$(obj).find(".jt-xia-ico").removeClass("jt-s-ico").end().find(".zk-wz").text("展开");
	   	}
	   	$(obj).parent().find(".tp-list-pic").find(".tp-list-link").eq(2).nextAll().toggle();
	   }
	   
	   //删除对话
	   
	   $(".se-tz-nr-wrap").on("swipeleft",function(){
	   	   $(this).parent().addClass("se-slide-list-active");
	   	   $(this).parent().siblings().removeClass("se-slide-list-active");
	   }).on("swiperight",function(){
	   	   $(this).parent().removeClass("se-slide-list-active");
	   	   $(this).parent().siblings().removeClass("se-slide-list-active");
	   })
	   
	   //消息管理选项卡
	   $(".se-tab_btn").click(function(){MESSTAB(this)})
	   var mess_index;
	   function MESSTAB(obj){
	   	mess_index=$(obj).index();
	   	 $(obj).addClass("this_tab").siblings().removeClass("this_tab");
	   	 $(".se-mes-gl-slide .se-slide-lf").eq(mess_index).addClass("dp_block").siblings().removeClass("dp_block");
	   }
	   
	   //文本展开
	   $(".show-city-tx").click(function(){SHOWCITYTX(this,"展开")})
	   function SHOWCITYTX(obj,str){
	   	if($(obj).parent().find(".se-city-js").hasClass("se-city-js-up")){
	   		$(obj).parent().find(".se-city-js").removeClass("se-city-js-up");
	   	    $(obj).find(".zk-wz").text("收起").end().find(".jt-xia-ico").addClass("jt-s-ico");
	   	}else{
	   		$(obj).parent().find(".se-city-js").addClass("se-city-js-up");
	   	    $(obj).find(".zk-wz").text(str).end().find(".jt-xia-ico").removeClass("jt-s-ico");
	   	}
	   }
	   
	   //超出字数隐藏
	   var js_str = $(".se-lx-js-wz").text();
	    if(js_str.length>38){
	    	$(".se-lx-js-wz").text(js_str.substr(0,35)+"...");
	    }
	   
	   //客户服务弹窗
	   $(".se-khfw").click(function(event){
	   	event.stopPropagation();
	   	 $(this).find(".se-khfw-alt").toggle();
	   })
	   $("body").click(function(){
	   	 $(".se-khfw-alt").hide();
	   })
	   //收藏
	   $(".se-khsc").click(function(){
	   	if($(this).hasClass("se-khsc_active")){
	   		$(this).removeClass("se-khsc_active");
	   	}else{
	   		$(this).addClass("se-khsc_active");
	   	}
	   })
	   
	   //商品规格选择
	   $(".se-check-typ").click(function(){PROTYPECHECKED(this)});
	   
	   function PROTYPECHECKED(obj){
	   	  $(obj).addClass("kw-checked").siblings("label").removeClass("kw-checked");
	   }
	   
	   //商品数量选择
	   $(".btnad").click(function(){PRONUMADD()});
	   $(".btnsub").click(function(){PRONUMSUB()});
	   var PRONUM=1;
	   function PRONUMADD(){
	   	   PRONUM++;
	   	   $(".gmsl").val(PRONUM);
	   }
	   function PRONUMSUB(){
	   	   PRONUM--;
	   	   PRONUM=PRONUM<=1?1:PRONUM;
	   	   $(".gmsl").val(PRONUM);
	   }
	   
	   //商品购买底部弹窗
	   $(".se-fot-gw .se-fot-gw-ri").click(function(){PROALTBOT()})
	   $(".se-exit").click(function(){PROHIDEBOT()})
	   function PROALTBOT(){
	   	$(".se-bot-alt .alt_model_bg").show();
	   	 $(".alt-gm-com").addClass("alt-gm-com-active");
	   }
	   function PROHIDEBOT(){
	   	$(".se-bot-alt .alt_model_bg").hide();
	   	 $(".alt-gm-com").removeClass("alt-gm-com-active");
	   }
	   
	   //14-分类下拉
	   $(".se-sp-zk-wrap .show-city-tx").click(function(){
	   	if($(this).parent().find(".se-sp-zk").hasClass("se-sp-zk-up")){
	   		$(this).parent().find(".se-sp-zk").removeClass("se-sp-zk-up");
	   		$(this).find(".zk-wz").text("收起").end().find(".jt-xia-ico").addClass("jt-s-ico");
	   	}else{
	   		$(this).parent().find(".se-sp-zk").addClass("se-sp-zk-up");
	   	}
	   })
	   
	   $(".se-px-wrap .show-city-tx").click(function(){
	   	if(!$(this).find(".jt-xia-ico").hasClass("jt-xia-ico-up")){
	   		$(this).find(".jt-xia-ico").addClass("jt-xia-ico-up")
	   	}else{
	   		$(this).find(".jt-xia-ico").removeClass("jt-xia-ico-up")
	   	}
	   	
	   })
	   $("a").removeClass("ui-link");
	}
	new COMM();
	new ALTMODEL();
	
	
	
})
