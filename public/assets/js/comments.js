// 获取评论列表
$.ajax({
    type: 'GET',
    url: '/comments',
    success: function (response) {
        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);
    }
});