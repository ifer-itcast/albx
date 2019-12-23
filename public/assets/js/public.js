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
function formatDate(date) {
    // 将日期时间字符串转日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
// 随机数据展示
$.ajax({
    type: 'GET',
    url: '/posts/random',
    success: function (response) {
        var randomTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
          {{/each}}
        `;
        var html = template.render(randomTpl, {
            data:response
        });
        $('#randomBox').html(html);
    }
});

// 最新评论数据
$.ajax({
    type: 'GET',
    url: '/comments/lasted',
    success: function (response) {
        var commentTpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$imports.formatDate($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
          {{/each}}
        `;
        var html = template.render(commentTpl, {
            data: response
        });
        $('#commentBox').html(html);
    }
});

// 导航数据展示
$.ajax({
    type: 'GET',
    url: '/categories',
    success: function (response) {
        var navTpl = `
        {{each data}}
        <li>
            <a href="list.html?categoryId={{$value._id}}">
                <i class="fa {{$value.className}}"></i>{{$value.title}}
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(navTpl, {
            data: response
        });
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
});