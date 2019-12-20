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
        }
    });
});