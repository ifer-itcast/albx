$('#userForm').on('submit', function() {
    // name=ifer&age=18
    let formData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/users',
        data: formData,
        success: function(response) {
            location.reload();
        },
        error: function() {
            alert('用户添加失败');
        }
    });
    // 阻止表单默认行为
    return false;
});