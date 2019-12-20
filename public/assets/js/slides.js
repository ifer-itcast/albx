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