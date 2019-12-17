// 获取文章分类
$.ajax({
    url: '/categories',
    type: 'GET',
    success: function (response) {
        let html = template('categoryTpl', {
            data: response
        });
        $('#category').html(html);
    }
});

// 上传图片
$('#feature').on('change', function() {
    let file = this.files[0];
    let formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        // 不要处理 data 参数
        processData: false,
        // 不要设置参数类型，formData 里面已经设置好了
        contentType: false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover);
        }
    });
});

// 添加文章
$('#addForm').on('submit', function() {
    let formData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/posts',
        data: formData,
        success: function () {
            // 添加成功跳转到文章列表
            location.href = '/admin/posts.html';
        }
    });
    return false;
});