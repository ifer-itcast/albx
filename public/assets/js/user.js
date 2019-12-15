// 新增用户
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

// 上传头像
// $('#avatar').on('change', function() {
// 以上的问题是，修改用户信息时，上传图片的效果不起效了
$('#modifyBox').on('change', '#avatar', function() {
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

// 用户列表
$.ajax({
    type: 'GET',
    url: '/users',
    success: function(response) {
        let html = template('userTpl', {
            data: response
        });
        $('#userBox').html(html);
    }
});

// 用户编辑
$('#userBox').on('click', '.edit', function() {
    // 获取被点击用户的 ID
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'GET',
        url: '/users/'+id,
        success: function(response) {
            let html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    });
});

// 为修改表单添加表单提交功能
$('#modifyBox').on('submit', '#modifyForm', function() {
    let formData = $(this).serialize();
    // 要修改的用户的 id
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'PUT',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            location.reload();
        }
    });
    return false;
});