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