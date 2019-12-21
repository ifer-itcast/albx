// 热门推荐数据
$.ajax({
    type: 'GET',
    url: '/posts/recommend',
    success: function (response) {
        // 为了将模板变成公共的，所以将模板写在了 JS 文件中
        var recommendTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
            <img src="{{$value.thumbnail}}" alt="">
            <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(recommendTpl, {
            data: response
        });
        $('#recommendBox').html(html);
    }
});