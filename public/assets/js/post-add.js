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