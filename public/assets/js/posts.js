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

function formatDate(date) {
    // 将日期时间字符串转日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

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
    console.log(1);
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