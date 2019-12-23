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