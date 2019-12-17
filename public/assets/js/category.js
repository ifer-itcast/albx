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