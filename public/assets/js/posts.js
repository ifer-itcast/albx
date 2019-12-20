$.ajax({
    type: 'GET',
    url: '/posts',
    success: function (response) {
        let html = template('postsTpl', response);
        $('#postsBox').html(html);
        
        let page = template('pageTpl', response);
        $('#page').html(page);
    }
});

// 分页
function changePage (page) {
    $.ajax({
        type: 'GET',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html);
            
            let page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
}

// 文章筛选标题展示
$.ajax({
    type: 'GET',
    url: '/categories',
    success: function (response) {
        let html = template('categoryTpl', {data: response});
        $('#categoryBox').html(html);
    }
});

// 筛选功能
$('#filterForm').on('submit', function() {
    let formDate = $(this).serialize();
    // 根据条件所要文章列表数据
    $.ajax({
        type: 'GET',
        url: '/posts',
        data: formDate,
        success: function (response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html);
            
            let page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
    return false;
});

// 删除文章
// 删除文章
$('#postsBox').on('click', '.delete', function() {
    if(confirm('您真的要删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        });
    }
});

// 评论功能
$('#postsBox').on('click', '.sen-com', function() {
    $('#articleId').val($(this).data('id'));
    $('#myModel').modal('show')
});

$('#sendBtn').on('click', function() {
    // 获取后端需要的参数：author, content, post
    var articleId = $('#articleId').val();
    var content = $('#commentCon').val();
    var userId = JSON.parse(localStorage.getItem('userInfo'))._id;
    console.log(articleId, content, userId, 233);
    $.ajax({
        type: 'POST',
        url: '/comments',
        data: {
            author: userId,
            content: content,
            post: articleId
        },
        success: function (res) {
            location.href='comments.html';
        }
    });
    // 发送请求
    // 跳转
});