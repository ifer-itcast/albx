// 获取文字的数量
$.ajax({
    type: 'GET',
    url: '/posts/count',
    success: function (response) {
        $('#post').html('<strong>'+response.postCount+'</strong>篇文章（<strong>'+response.draftCount+'</strong>篇草稿）');
    }
});

// 分类
$.ajax({
    type: 'GET',
    url: '/categories/count',
    success: function (response) {
        $('#category').html('<strong>'+response.categoryCount+'</strong>个分类');
    }
});

// 评论
$.ajax({
    type: 'GET',
    url: '/comments/count',
    success: function (response) {
        $('#comment').html('<strong>'+response.commentCount+'</strong>条评论')
    }
});