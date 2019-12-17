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