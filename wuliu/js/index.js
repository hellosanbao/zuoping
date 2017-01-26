;
(function() {
    $(function() {
        $(".tr-cont .menu-btn").click(function() {
            $(".header-warp nav").addClass("active");
        })
        $(".head-nav .close-btn,.head-nav a").click(function() {
            $(".header-warp nav").removeClass("active");
        })

        var fxCenter = function() {
            $(".fix-center").each(function(ind, ele) {
                $(ele).css("margin-top", -($(ele).height() / 2) + "px");
            })
        };
        fxCenter();
        $(window).resize(function() {
            fxCenter()
        })

        // 悬浮窗口
        $(".yb_conct").hover(function() {
            $(".yb_conct").css("right", "5px");
            $(".yb_bar .yb_ercode").css('height', '200px');
        }, function() {
            $(".yb_conct").css("right", "-127px");
            $(".yb_bar .yb_ercode").css('height', '53px');
        });
        // 返回顶部
        $(".yb_top").click(function() {
            $("html,body").animate({
                'scrollTop': '0px'
            }, 300)
        });

        $(".slide-dowm-btn").click(function() {
            $(".slide-menu").addClass("slide-menu-show")
        })
        $(".cur-check").click(function() {
            $(".top-menu-link").toggle()
        })
        $(".top-menu-link a").click(function() {
            $(this).addClass("current").parents('li').siblings("li").find("a").removeClass("current")
            $(".cur-check").text($(this).text())
            $(".top-menu-link").hide();
        })
        $(".slide-menu-warp .close,.slide-menu li a").click(function() {
            $(".slide-menu").removeClass("slide-menu-show")
        })
    })
})()
