function qoom(options) {

  var option = {
    indexs: 0,
    w: $(".container").width(),
    h: $(".slider").height(),
    num: $(".content .slider").length,
    interval: '',
    left_press: false
  };

  var pager_burn = function() {
      for (var i = 0; i < option.num; i++) {
        $(".pager").html($(".pager").html() + "<span class='pager_btn'></span>")
      }
    }
  var slide_burn = function() {
      $(".content").append("<div class='slider'>" + $(".content .slider").eq(0).html() + "</div>");
      $(".content").prepend("<div class='slider'>" + $(".content .slider").eq(option.num - 1).html() + "</div>");
    }
  var init = function() {
      $(".pager_btn").eq(0).addClass('pager_btn_active').siblings().removeClass('pager_btn_active');
      $(".slider").width(option.w);
      $(".slider img").width(option.w)
      $(".content").width(option.w * (option.num + 2));
      $(".content").height(option.h);
      $(".container").height(option.h);
      $(".content").css("left", -option.w + "px");
    };
  var construct = function() {
      function _A() {
        $(".pager_btn").eq(option.indexs).addClass('pager_btn_active').siblings().removeClass('pager_btn_active');
        if (option.left_press == false) {
          $(".content").stop(true, true).animate({
            "left": "-=" + option.w + "px"
          }, options.speed || 300, GD);
        } else {
          $(".content").stop(true, true).animate({
            "left": "+=" + option.w + "px"
          }, options.speed || 300, GD);
        }
      }

      function GD() {
        if (parseInt($(".content").css("left")) <= -(option.num + 1) * option.w) {
          $(".content").css("left", "-" + option.w + "px");
        }
        if (parseInt($(".content").css("left")) >= 0) {
          $(".content").css("left", "-" + (option.num) * option.w + "px");
        }
      }

      function _S() {
        clearInterval(option.interval);
        option.indexs = $(this).index();
        $(".pager_btn").eq(option.indexs).addClass('pager_btn_active').siblings().removeClass('pager_btn_active');
        $(".content").animate({"left": "-"+(option.indexs+1)*option.w+"px"},options.speed || 300)
        console.log(option.indexs*option.w)
        //_A();
        _AUTO();
      }

      function _AUTO() {
        option.interval = setInterval(_RIGHT, options.tim ||3000)
      }
      function _RIGHT() {
        option.left_press = false;
        clearInterval(option.interval);
        option.indexs++;
        if (option.indexs > option.num - 1) {
          option.indexs = 0;
        }
        _A();
        _AUTO();
      }

      function _LEFT() {
        option.left_press = true;
        clearInterval(option.interval);
        option.indexs--;
        if (option.indexs < 0) {
          option.indexs = option.num - 1;
        }
        _A();
        _AUTO();
      }
      $(".pager_btn").click(_S);
      _AUTO();
      $(".ctrl_next").click(_LEFT);
      $(".ctrl_prev").click(_RIGHT);
    };

  pager_burn();
  construct();
  init();
  slide_burn();
}