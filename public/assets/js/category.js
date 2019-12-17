// 添加分类
$('#addCategory').on('submit', function() {
    let formData = $(this).serialize();
    $.ajax({
        type: "POST",
        url: '/categories',
        data: formData,
        success: function() {
            location.reload();
        }
    });
    return false;
});

// 分类列表
$.ajax({
    type: 'GET',
    url: '/categories',
    success: function (response) {
        let html = template('categoryListTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    }
});


// 分类修改页面
$('#categoryBox').on('click', '.edit', function() {
    let id = $(this).attr('data-id');
    // 根据 id 获取分类数据的详细信息
    $.ajax({
        type: 'GET',
        url: '/categories/'+id,
        success: function (response) {
            let html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);
        }
    });
});

// 分类修改功能
$('#formBox').on('submit', '#modifyCategory', function() {
    let formData = $(this).serialize();
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'PUT',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload();
        }
    });
    return false;
});