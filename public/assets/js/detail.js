// 从地址栏中获取文章 ID
var postId = getUrlParams('id');

$.ajax({
    type: 'GET',
    url: '/posts/' + postId,
    success: function (response) {
        var html = template('postTpl', response);
        $('#article').html(html);
    }
});

