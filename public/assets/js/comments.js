// 获取评论列表
$.ajax({
    type: 'GET',
    url: '/comments',
    success: function (response) {
        // 评论列表
        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);
        // 页码
        var pageHtml = template('pageTpl', response);
        $('#pageBox').html(pageHtml);
    }
});


function changePage(page) {
    $.ajax({
        type: 'GET',
        url: '/comments',
        data: {
            page
        },
        success: function (response) {
            // 评论列表
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            // 页码
            var pageHtml = template('pageTpl', response);
            $('#pageBox').html(pageHtml);
        }
    });
}