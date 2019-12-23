// 从地址栏中获取文章 ID
var postId = getUrlParams('id');
// 是否审核
var review;

$.ajax({
    type: 'GET',
    url: '/posts/' + postId,
    success: function (response) {
        var html = template('postTpl', response);
        $('#article').html(html);
    }
});
// 点赞
$('#article').on('click', '#like', function() {
    $.ajax({
        type: 'POST',
        url: '/posts/fabulous/' + postId,
        success: function () {
            alert('点赞成功，感谢您的支持')
        }
    });
});

// 登录了才对评论进行处理
if(isLogin) {
    // 获取网站配置信息
    $.ajax({
        type: 'GET',
        url: '/settings',
        success: function (response) {
            review = response.review;
            // 判断管理员是否开启了评论功能
            if(response.comment) {
                // 渲染评论
                var html = template('commentTpl');
                $('#comment').html(html);
            }
        }
    });
}

// 评论功能
$('#comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val();
    var userId = JSON.parse(localStorage.getItem('userInfo'))._id;
    $.ajax({
        type: 'POST',
        url: '/comments',
        data: {
            author: userId,
            post: postId,
            content
        },
        success: function (response) {
            alert('评论成功');
            location.reload();
        }
    });
    return false;
});