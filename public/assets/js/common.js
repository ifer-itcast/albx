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