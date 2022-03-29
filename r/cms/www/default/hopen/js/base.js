window.onload = function () {
    /*750代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;100代表换算比例，这里写100是
      为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等*/
    //getRem(1920, 100);
  };
window.onresize = function () {
    //getRem(1920, 100);
};
function getRem(pwidth, prem) {
    var html = document.getElementsByTagName("html")[0];
    var oWidth =
    document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = (oWidth / pwidth) * prem + "px";
}
var screen_w=window.innerWidth;
	var screen_h=window.innerHeight;
	var center_dot={
		x:screen_w/2,
		y:screen_h/2
	}
	var MobileWidth=768;
	var IsMobile=false;

	if(screen_w<=MobileWidth){
		IsMobile=true;
	}else{
		IsMobile=false;
	}
	if(!IsMobile) { //  桌面菜单交互
		$(".menu_list").hover(function(){
			if(window.innerWidth >768){
				$(".wrap_head").addClass("submenu_show");
			}
		},function(){
			if(window.innerWidth >768){
				$(".wrap_head").addClass("submenu_hide");
				var timer=setTimeout(function(){
					$(".wrap_head").removeClass("submenu_show");
					$(".wrap_head").removeClass("submenu_hide");
				},150);
			}
		});
	}
	$(".menu_list .menu_item").hover(function(){
		if(!IsMobile){ //如果是PC
			if(!$(".wrap_head").hasClass("submenu_show")){
				$(".wrap_head").addClass("submenu_show");
			}
			$(this).addClass("sublist_show");
			$(this).children(".sub_list").show();
		}else{
			return false;
		}
	},function(){
		if(!IsMobile){ //如果是PC
			$(this).addClass("sublist_hide");
			var that=this;
			var timer=setTimeout(function(){
				$(that).removeClass("sublist_show");
				$(that).removeClass("sublist_hide");
				$(that).children(".sub_list").hide();
			},150);
		}else{
			return false;
		}
	});

	function setMenuHook(){
		if(!IsMobile){ //如果是PC
			$(".menu_item").append("<span class='menu_hook'></span>");
			var list=$(".menu_item .menu_hook");
			for(var i=0;i<list.length;i++){
				$(list[i]).css({
					"width":($(list[i]).width()+72)+"px"
				});
			}
		}else{
			return false;
		}
	}
	setMenuHook();


	//优化交互方案，用before伪类，横向平铺，让子菜单不用只触发到菜单项才展开 .menu_list .menu_item .txt:before

	//桌面连接模块

	$(".link_area .tab_list li").on("mouseenter",function(){
		if(!$(this).hasClass("current")){
			$(".link_area .tab_list li").removeClass("current");
			$(this).addClass("current");
			$(".link_area .con").hide();
			$(".link_area .con_"+$(this).data("num")).fadeIn();
		}

	});
	//setDevelopSize();
	var modHeight = $('.mod-tab').height();
	$(window).resize(function(){
		modHeight = $('.mod-tab').height();
		screen_w=window.innerWidth;
		screen_h=window.innerHeight;
		center_dot={
			x:screen_w/2,
			y:screen_h/2
		}

		if(screen_w<=MobileWidth){
			IsMobile=true;
		}else{
			IsMobile=false;
		}

		//setDevelopSize();
		if(screen_w >768){
			$(".menu_list").css({
				"transform":"translate(0px,0)",
				"opacity": 1
			});
		}else{
			$(".menu_list").css({
				"transform":"translate(-260px,0)",
				"opacity": 0.8
			});
		}
	});
	function MenuHide(){
		$(".menu_list").css({
			"transform":"translate(-260px,0)",
			"opacity":0.8
		});
		$(".icon_menu .i_close").hide();
		$(".icon_menu .i_menu").show();
		$(".wrap_head .bg_hover").hide();
		$(".search_area").show();
	}
	/* 二级页面导航栏 */
	function pageTab(){
		var deviceWidth = $(window).width() // 设备屏幕宽度
		if(deviceWidth<=768){
			$('.mod-tab .mc-right').hide();
			$('.mod-tab .mc-left').hide();
			$('.mod-tab .clearfix ul').css({'left':'16px','right': 'auto'});
		}else{
			var modTabUlW = $('.mod-tab .clearfix ul').width();
			var modTabW = $('.mod-tab .clearfix').width();
			if(modTabUlW >modTabW){
				$('.mod-tab .mc-right').show();
			}

			$('.mod-tab .mc-right').on('click',function(){
				$('.mod-tab .clearfix ul').css({'right':'0px','left': 'auto'});
				$('.mod-tab .mc-right').hide();
				$('.mod-tab .mc-left').show();
			})

			$('.mod-tab .mc-left').on('click',function(){
				$('.mod-tab .clearfix ul').css({'left':'16px','right': 'auto'});
				$('.mod-tab .mc-right').show();
				$('.mod-tab .mc-left').hide();
			})
		}
	}
	var brandTabOffTop = [];
	$(window).resize( function() { // 当pc端页面宽度缩小到移动端大小时
		$('.mod-tab .clearfix ul').css({'left':'16px','right': 'auto'});
		pageTab();
		brandTabOffTop = [];

		var sanWidth = $('.artice-box .san').width() - 1;
		$('.artice-box .san').css('right',-sanWidth+'px');

		if($(window).width() <=768){
			$('.mobile-tab-brand').each(function(){
				var that = $(this);
				setTimeout(function(){
					brandTabOffTop.push(that.offset().top);
				},100)
			})
		}else{
			$('.pc-tab-brand').each(function(){
				brandTabOffTop.push($(this).offset().top);
			})
		}
	})




	setTimeout(function(){
		pageTab();
		brandTabOffTop =[];
		var modTab;
		if($('.mod-tab').length>=1){
			modTab = $('.mod-tab').offset().top;
		}
		var p=0,t=0;
		// if($(document).scrollTop()>=$('.head_white').height()){
		// 	$('.head_white').addClass('fixed');
		// }
		// if($(document).scrollTop()>=modTab){
		// 	$('.mod-tab').addClass('fixed');
		// }else{
		// 	$('.mod-tab').removeClass('fixed');
		// }

		if($(window).width() <=768){
			$('.mobile-tab-brand').each(function(){
				var that = $(this);
				setTimeout(function(){
					brandTabOffTop.push(that.offset().top);
				},100)
			})

		}else{
			$('.pc-tab-brand').each(function(){
				brandTabOffTop.push($(this).offset().top);
			})
		}


		var showHeadState = true;
		$(window).scroll(function(event){
			p = $(this).scrollTop();
			if(t<=p){
				//向下滚
				if($(document).scrollTop()>=$('.head_white').height()+30){
					if($('.head_white').hasClass('hestate')){
						$('.head_white').css({'position':'fixed','top':'-72px'});
					}else{
						$('.head_white').hide();
						$('.head_white').css({'position':'fixed','top':'-72px'});
					}

					$(".wrap_head").removeClass("submenu_show");
					$(".wrap_head").removeClass("submenu_hide");
					$('.sub_list').hide();
				}
				$('.mod-tab').css('top','0px');
			}else{
				//向上滚
				if(showHeadState == true){
					//$('.head_white').removeClass('fixed');
					if($(document).scrollTop()<$('.head_white').height()){
						$('.head_white').css({'position':'fixed','top':'0px'});
						$('.head_white').removeClass('hestate')
						setTimeout(function(){
							$('.head_white').css({'position':'absolute','top':'0px'});
						},50)
					}else{
						$('.head_white').show();
						setTimeout(function(){
							$('.head_white').css({'position':'fixed','top':'0px'});
							$('.head_white').addClass('hestate')
						},20)
					}

				}
			}

			setTimeout(function(){t = p;},0);
			if($(document).scrollTop()>=modTab){
				$('.mod-tab').addClass('fixed');
			}else{
				$('.mod-tab').css('top','0px');
				$('.mod-tab').removeClass('fixed');
			}

			if($(window).width() <=768){
				if(showHeadState != false){
					scrollNav($('.mobile-tab-brand'));
				}
			}else{
				if(showHeadState != false){
					scrollNav($('.pc-tab-brand'));
				}
			}
		});

		$('.mod-tab li').on('click',function(){
			showHeadState = false;
			$('.mod-tab li').removeClass('active-tab');
			$(this).addClass('active-tab');
			$('.mod-tab .line').stop().animate({'left':$(this).position().left+'px','width': $(this).width()},200);
			var t = brandTabOffTop[$(this).index()];
			$("html,body").animate({scrollTop: t+"px"}, 200);
			setTimeout(function(){
				showHeadState = true;
			},300)
		})

		// 设置疫情页面斜边三角的初始高
		var sanWidth = $('.artice-box .san').width() - 1;
		$('.artice-box .san').css('right',-sanWidth+'px');

	},50)

	function scrollNav(dom){
		var sections = dom;
		sections.each(function(index,el){
			var _this = $(this);
			if( _this.offset().top <=  $(document).scrollTop()){
				$('.mod-tab .line').stop().animate({'left':$('.mod-tab li').eq(index).position().left+'px','width': $('.mod-tab li').eq(index).width()},200);
				$('.mod-tab li').removeClass('active-tab');
				$('.mod-tab li').eq(index).addClass('active-tab');
			}
		})
	}