function formatDate(date) {
    // 将日期时间字符串转日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

$('#logout').on('click', function () {
    let isConfirm = confirm('你真的要退出吗？');
    if (isConfirm) {
        $.ajax({
            type: 'POST',
            url: '/logout',
            success: function (response) {
                location.href = 'login.html';
            },
            error: function () {
                alert('退出失败');
            }
        })
    }
});

// 登录信息展示
$.ajax({
    type: 'GET',
    url: '/users/' + userId,
    success: function (response) {
        $('.avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName);
    }
});