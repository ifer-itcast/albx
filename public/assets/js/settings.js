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