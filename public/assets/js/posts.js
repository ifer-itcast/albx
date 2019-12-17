$.ajax({
    type: 'GET',
    url: '/posts',
    success: function (response) {
        let html = template('postsTpl', response);
        $('#postsBox').html(html);
    }
});

function formatDate(date) {
    // 将日期时间字符串转日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}