// 轮播图数据
$.ajax({
	type: 'GET',
	url: '/slides',
	success: function(response) {
		var html = template('slidesTpl', {
			data: response
		});
		$('#slidesBox').html(html);
		var str = '<span></span>'.repeat(response.length-1);
		$('.cursor').html('<span class="active"></span>' + str);

		var swiper = Swipe(document.querySelector('.swipe'), {
			auto: 3000,
			transitionEnd: function(index) {
				// index++;
				$('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
			}
		});
		// 上/下一张
		$('.swipe .arrow').on('click', function() {
			var _this = $(this);
			if (_this.is('.prev')) {
				swiper.prev();
			} else if (_this.is('.next')) {
				swiper.next();
			}
		});
	}
});

// 最新发布数据
$.ajax({
	type: 'GET',
	url: '/posts/lasted',
	success: function (response) {
		var html = template('lastedTpl', {
			data: response
		});
		$('#lastedBox').html(html);
	}
});
