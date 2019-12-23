// 获取地址栏的 categoryId
var categoryId = getUrlParams('categoryId');

$.ajax({
    type: 'GET',
    url: '/posts/category/' + categoryId,
    success: function (response) {
        console.log(response);
        var html = template('listTpl', {
            data: response
        });
        $('#listBox').html(html);
    }
});


// 根据分类ID获取分类信息，想使用分类名称
$.ajax({
    type: 'GET',
    url: '/categories/' + categoryId,
    success: function (response) {
        // 简单的数据可以直接操作DOM元素，没必要再拼接模板了
        $('#categoryTitle').html(response.title);
    }
});