// 获取浏览器地址栏的搜索关键字
var key = getUrlParams('key');
// 根据关键字调用搜索接口
$.ajax({
    type: 'GET',
    url: '/posts/search/' + key,
    success: function (response) {
        var html = template('searchTpl', {
            data: response
        });
        $('#listBox').html(html);
    }
});