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

// 删除用户
$('#userBox').on('click', '.delete', function() {
    if(confirm('您真的要删除用户吗')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload();
            }
        });
    }
});

// 批量删除用户
let selectAll = $('#selectAll');
let deleteMany = $('#deleteMany');

selectAll.on('change', function() {
    let status = $(this).prop('checked');
    if(status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    // 全选控制单选
    $('#userBox').find('input').prop('checked', status);
});
// 用户前的复选框状态发生改变
$('#userBox').on('change', '.userStatus', function() {
    let inputs = $('#userBox').find('input');
    console.log(inputs.length, inputs.filter(':checked').length)
    if (inputs.length === inputs.filter(':checked').length) {
        // 所有用户都是选中的
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    }

    // 如果选中的单选框的数量大于0，说明有
    if(inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

// 为批量删除按钮添加点击事件
deleteMany.on('click', function() {
    let ids = [];
    // 选中的用户
    let checkedUser = $('#userBox').find('input').filter(':checked');
    // 循环选中的用户并把 id 装到 ids 里面
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });
    
    if(confirm('您确定批量删除吗')) {
        $.ajax({
            type: 'DELETE',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        });
    }
});