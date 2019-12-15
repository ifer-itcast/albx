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

$('#avatar').on('change', function() {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        // 不要解析请求参数，即 data
        processData: false,
        // 不要设置请求参数的类型，因为 formData 对象会自动设置类型
        contentType: false,
        success: function(response) {
            // 头像预览功能
            $('#preview').attr('src', response[0].avatar);
            // 隐藏域的值就是上传图片的地址
            $('#hiddenAvatar').val(response[0].avatar);
        },
        error: function() {

        }
    });
});