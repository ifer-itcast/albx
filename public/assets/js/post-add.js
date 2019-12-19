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

// 从浏览器地址栏获取参数
function getUrlParams(name) {
    // ?name=ifer&age=18
    let paramsAry = location.search.substr(1).split('&');
    for(let i = 0; i < paramsAry.length; i ++) {
        let tmp = paramsAry[i].split('=');
        if(tmp[0] === name) {
            return tmp[1];
        }
    }
    return -1;
}

let id = getUrlParams('id');

if(id != -1) {
    // 修改
    $.ajax({
        type: 'GET',
        url: '/posts/' + id,
        success: function (response) {
            // 再次获取文章分类
            $.ajax({
                url: '/categories',
                type: 'GET',
                success: function (categories) {
                    response.categories = categories;
                    let html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                }
            });
        }
    });
}

// 修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function() {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/posts.html';
        }
    });
    return false;
});