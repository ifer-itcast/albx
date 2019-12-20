// 轮播图数据之添加图片
$('#file').on('change', function() {
    // 用户上传的文件
    var file = this.files[0];
    var formDate = new FormData();
    formDate.append('image', file);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formDate,
        processData: false, // 不要处理 formDate 的格式
        contentType: false,
        success: function (response) {
            $('#image').val(response[0].image);
        }
    });
});

// 轮播图其他数据添加
$('#slidesForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/slides',
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});

// 轮播数据展示
$.ajax({
    type: 'GET',
    url: '/slides',
    success: function (response) {
        var html = template('slidesTpl', {
            data: response
        });
        $('#slidesBox').html(html);
    }
});

// 删除
$('#slidesBox').on('click', '.delete', function() {
    if(confirm('您真的要删除数据吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/slides/' + id,
            success: function () {
                location.reload();
            }
        });
    }
});