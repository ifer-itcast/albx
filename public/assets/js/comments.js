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

// 点击审核按钮
$('#commentsBox').on('click', '.status', function() {
    // 获取当前评论的状态
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'PUT',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload();
        }
    });
});

// 删除
$('#commentsBox').on('click', '.delete', function() {
    if(confirm('您真的要删除啊')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload();
            }
        });
    }
});