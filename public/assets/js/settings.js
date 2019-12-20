// 选择 logo
$('#logo').on('change', function() {
    var file = this.files[0];
    var formDate = new FormData();
    formDate.append('logo', file);

    $.ajax({
        type: 'POST',
        url: '/upload',
        data: formDate,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#hiddenLogo').val(response[0].logo);
            // 将 logo 图片显示在页面中
            $('#preview').attr('src', response[0].logo);
        }
    });
});

// 网站信息设置
$('#settingsForm').on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData)
    $.ajax({
        type: 'POST',
        url: '/settings',
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});

// 索要网站设置数据
$.ajax({
    type: 'GET',
    url: '/settings',
    success: function (response) {
        if(response) {
            // logo 地址存储在隐藏域中
            $('#hiddenLogo').val(response.logo);
            // 将 logo 显示在页面中
            $('#preview').attr('src', response.logo);
            // 网站标题
            $('input[name="title"]').val(response.title);
            // 网站描述
            $('#site_description').val(response.description);
            // 关键字
            $('#site_keywords').val(response.keywords);
            // 是否开启评论功能
            $('input[name="comment"]').prop('checked', response.comment);
            // 评论是否经过人工审核
            $('input[name="review"]').prop('checked', response.review);
        }
    }
});

