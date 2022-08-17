## 前言

页面详情漆黑之牙 (llongjie.top)

技术栈:Vue2.0+Vue-router++VueX+Koa2+Sequelize
本项目覆盖前后端相关配置及库的使用
而且代码也都不难，作为新人练手项目是完全可以

## 后端方面

### 一、数据库

#### 1.实体及其关系

一个文章多条留言(一对多)

一个分类多个文章(一对多)

一个用户多条留言(一对多)

一个文章多条评论(一对多)

一个用户喜欢多篇文章，一篇文章被多个用户喜欢(多对多)

#### 2.数据表结构(实体及其属性)

* 用户表 ID 用户名 用户账号 用户密码 生日  头像  创建时间
* 文章表 ID 用户ID 文章标题 文章图片 文章music 文章内容 分类ID(外键) 文章摘要 发布时间  浏览人数 喜欢人数 评论数(通过文章留言板去查) 分类ID
* 文章留言表  ID 留言文章ID 留言用户ID  留言内容 留言时间
* 分类表 ID 分类名称
* 留言表 ID 留言用户ID 留言内容
* 用户是否喜欢文章表 ID 用户ID 文章ID (通过多对多关系生产)

### 二、API及相关Services

#### 1.API

以下链接为**本站API文档**，编写相关代码时，打开此网站参考

可以明确前后端交互需要发送怎样的数据，接收怎样的数据

[API (apipost.cn)](https://console-docs.apipost.cn/preview/967aa32f7937e061/b556a5b441d2d0ec?target_id=24f2918f-fb91-46b2-951a-96acac0a4756#2e160926-bb90-4a74-df3a-6df8003f405c)

#### 2.Services相关

本站采用jwt进行鉴权，使用额外的库来实现验证码功能，koa-log4进行应用以及API相关信息日志记录

本站的upload接口接收用户的个人头像，也接收文章图片，保存后返回url路径

本站使用Session实现了验证码以及评论留言限制功能能

#### 3、日志相关

本站所用日志库为koa-log4 以下为官方文档

[log4js-node by log4js-node](https://log4js-node.github.io/log4js-node/layouts.html)

#### 4.用户登录与鉴权

使用JWT鉴权

[(55条消息) JsonWebToken是什么？_liyinchi1988的博客-CSDN博客_jsonwebtoken](https://blog.csdn.net/u013302168/article/details/119490363)

## 前端方面

## 一、建议

#### 1.配置相关

关于Vue.config.js中相关配置，不懂的直接复制就好，先写业务代码，写完后再对照官方文档查

[配置参考 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/config/)

.env后缀文件必须先行创建，在写代码

创建不同的.env环境文件，在其中设置相应的环境变量

打包后会加载对应的env文件，将其中的环境变量载入

可通过process.env.变量获取

因为其定义了我们之后要用于发送的服务器域名

写配置经常要用到path.resolve()

[(55条消息) path.resolve()理解_kikyou`的博客-CSDN博客_path.resolve()](https://blog.csdn.net/kikyou_csdn/article/details/83150538)

从难易度以及业务逻辑而言，前端应该先写后台，写好后才能发文章，才能在写前台时设置好样式

#### 2.axios

本站发送请求使用的是axios库

不论在写前台还是后台，都应该先写好src/api以及utils/request

两个文件的作用分别是写好页面要调用的API，以及axios拦截器

拦截器是为了再请求发送前，响应接收前进行相关处理

比如加入Token，比如调用Element-ui显示服务器返回的msg

#### 3.背景图片不显示问题

若对webpack配置不熟悉，打包到服务器后无法显示

可以使用Nginx部署静态资源服务器

```
location ^~ /Bg {
    	root /front;
        index  index.html;
    }
```

对应请求发送并匹配到该Location后

Nginx就会从Nginx所在磁盘寻找匹配后的urI映射的文件夹

#### 4.CSS动画相关

本站CSS特效分为两类

1.Element-ui自带动画

2.自己制作

自己制作的动画，如登陆界面，先在CSS中定义好动画前与动画后盒子的状态

不论是opacity还是translate

然后再利用vue为需要进行动画效果的盒子添加删除一个辅助作用的CSS类

即可完成动画效果

#### 5.前台使用包介绍

|  |                   |  |                         |  |  |                            |           |
| - | ----------------- | - | ----------------------- | - | - | -------------------------- | --------- |
|  |                   |  |                         |  |  |                            | 如-webkit |
|  | 一、auto-prefixer |  | 为了考虑css属性的兼容性 |  |  | 通常要加上不同浏览器的前缀 |           |
|  |                   |  |                         |  |  |                            |           |

这个包放到项目里自动为你加

|  |                  |  |              |  |                                      |  |                            |
| - | ---------------- | - | ------------ | - | ------------------------------------ | - | -------------------------- |
|  | 二、highlight.js |  | 代码高亮插件 |  | 网站发布的文章里有代码会让其高亮显示 |  | 就像是在vscode里的代码一样 |

|  |               |  |                    |  |                                  |
| - | ------------- | - | ------------------ | - | -------------------------------- |
|  | 三、marked.js |  | MarkDown解析编译器 |  | 将markdown代码转为html代码并显示 |

|  |                                                           |  |                    |  |            |
| - | --------------------------------------------------------- | - | ------------------ | - | ---------- |
|  | 四、Parallax.js是一个**简单的，轻量级的**视差引擎。 |  | 五、postcss-px2rem |  | 移动端适配 |
|  |                                                           |  |                    |  |            |

六、wowjs   动画库

## 打包与部署

### 1.Nginx配置

为什么是5008，因为我koa监听的是5008端口

> 这里给出我的nginx配置

```
worker_processes auto;
worker_rlimit_nofile 51200;
events
{
	worker_connections 51200;
	multi_accept on;
}
http
    {
        include       mime.types;
        #include luawaf.conf;

   

	include proxy.conf;

    default_type  application/octet-stream;

    server_names_hash_bucket_size 512;
    client_header_buffer_size 32k;
    large_client_header_buffers 4 32k;
    client_max_body_size 100m;

    sendfile   on;
    tcp_nopush on;

    keepalive_timeout 60;

    tcp_nodelay on;

    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 256k;
	fastcgi_intercept_errors on;

    #开启和关闭gzip模式
    gzip on;
    #gizp压缩起点，文件大于1k才进行压缩
    gzip_min_length  1k;
    # 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区 
    gzip_buffers     4 16k;
    #nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩，如果找不到则不进行压缩
    gzip_static on;
    # 识别http协议的版本,早起浏览器可能不支持gzip自解压,用户会看到乱码
    gzip_http_version 1.1;
    # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
    gzip_comp_level 1;
    # 进行压缩的文件类型。
    gzip_types     text/plain application/json application/javascript application/x-javascript text/javascript text/css application/xml image/jpeg image/gif image/png video/mpeg audio/x-pn-realaudio audio/x-midi audio/basic audio/mpeg audio/ogg audio/* video/mp4;
    # 启用应答头"Vary: Accept-Encoding"
    gzip_vary on;
    # nginx做为反向代理时启用,off(关闭所有代理结果的数据的压缩),expired(启用压缩,如果header头中包括"Expires"头信息),no-cache(启用压缩,header头中包含"Cache-Control:no-cache"),no-store(启用压缩,header头中包含"Cache-Control:no-store"),private(启用压缩,header头中包含"Cache-Control:private"),no_last_modefied(启用压缩,header头中不包含"Last-Modified"),no_etag(启用压缩,如果header头中不包含"Etag"头信息),auth(启用压缩,如果header头中包含"Authorization"头信息)
    gzip_proxied   expired no-cache no-store private auth;
    # (IE5.5和IE6 SP1使用msie6参数来禁止gzip压缩 )指定哪些不需要gzip压缩的浏览器(将和User-Agents进行匹配),依赖于PCRE库
    gzip_disable   "MSIE [1-6]\.";

    limit_conn_zone $binary_remote_addr zone=perip:10m;
	limit_conn_zone $server_name zone=perserver:10m;

    server_tokens off;
    access_log off;

server {
    listen    80;
    # 您的域名
    server_name appself.top; 
    location ^~ / {
        proxy_cache_key $scheme$proxy_host$uri$is_args$args;
        proxy_cache_valid  200 304 302 24h;   
        proxy_pass http://www.appself.top:5008;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        proxy_set_header Host $http_host; 
        proxy_set_header X-Nginx-Proxy true;
        proxy_redirect off;
        rewrite ^.+(?<!js|css|png|map)$ /index.html break;
        autoindex on;
        index index.htm index.html;
        set $fallback_uri /index.html;
        if ($http_accept !~ text/html) {
            set $fallback_uri /null;
        }
        try_files $uri $uri/ $fallback_uri = 404;
    }
    location ^~ /back {
        proxy_pass http://www.appself.top:5008/back;
        index index.htm index.html;
    }
}
include /www/server/panel/vhost/nginx/*.conf;
}

```

### 2.前端配置

client/public/html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="XXX，一名前端工程师，这是我的个人博客，网站文章随便写，想写啥写啥">
    <meta name="keywords" content="个人博客,XXX,前端,技术,WEB,blog,BLOG,搭建博客,前端技术,VUE博客,XXX的博客">
    <meta name="anthor" content="XXX，123456789@qq.com">
    <meta name="robots" content="博客, 前端, blog, 个人博客, XXX, Yong,XXX的博客,web,VUE,React">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <!-- 使用CDN的CSS文件 -->
    <% for (var i in htmlWebpackPlugin.options.cdn &&
    htmlWebpackPlugin.options.cdn.css) { %>
    <link
            href="<%= htmlWebpackPlugin.options.cdn.css[i] %>"
            rel="stylesheet"
    />
    <% } %>
    <title>漆黑月牙</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->

    <!-- 使用CDN的JS文件 -->
    <% for (var i in htmlWebpackPlugin.options.cdn &&
    htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
    <!-- 使用CDN的JS文件 -->
  </body>
</html>

```

一切准备工作已就绪，可以把项目部署到服务器上了

**执行 npm run build 命令分别打包前台和后台**

### 3.本地部署

先执行npm run sync

再npm run start

注意run start使用的是nodemon，需要提前安装

## 最后

编写本项目顺序建议参考本md文件目录

项目简单，看到这里麻烦点个star
