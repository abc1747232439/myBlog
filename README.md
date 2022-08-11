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

## 前端方面

## 一、建议

#### 1.配置相关

关于Vue.config.js中相关配置，不懂的直接复制就好，先写业务代码，写完后再对照官方文档查

[配置参考 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/config/)

.env后缀文件必须先行创建，在写代码

因为其定义了我们之后要用于发送的服务器域名

从难易度以及业务逻辑而言，前端应该先写后台，写好后才能发文章，才能在写前台时设置好样式

#### 2.axios

本站发送请求使用的是axios库

不论在写前台还是后台，都应该先写好src/api以及utils/request

两个文件的作用分别是写好页面要调用的API，以及axios拦截器

拦截器是为了再请求发送前，响应接收前进行相关处理

比如加入Token，比如调用Element-ui显示服务器返回的msg

## 打包与部署

### 1.Nginx配置

为什么是5008，因为我koa监听的是5008端口

> 这里给出我的nginx配置
>

```
user  root root;
worker_processes auto;
error_log  /www/logs/nginx_error.log  crit;
pid        /www/server/nginx/logs/nginx.pid;
worker_rlimit_nofile 51200;
events
    {
        use epoll;
        worker_connections 51200;
        multi_accept on;
    }

http
    {
        include       mime.types;
        #include luawaf.conf;

    # 设置缓存路径并且使用一块最大100M的共享内存，用于硬盘上的文件索引，包括文件名和请求次数，每个文件在1天内若不活跃（无请求）则从硬盘上淘汰，硬盘缓存最大10G，满了则根据LRU算法自动清除缓存。
    proxy_cache_path /var/cache/nginx/cache levels=1:2 keys_zone=imgcache:100m inactive=1d max_size=10g;

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

    # 是否启用在on-the-fly方式压缩文件，启用后，将会在响应时对文件进行压缩并返回。
    brotli on;
    # 启用后将会检查是否存在带有br扩展的预先压缩过的文件。如果值为always，则总是使用压缩过的文件，而不判断浏览器是否支持。
    brotli_static always;
    # 设置压缩质量等级。取值范围是0到11.
    brotli_comp_level 6;
    # 设置缓冲的数量和大小。大小默认为一个内存页的大小，也就是4k或者8k。
    brotli_buffers 16 8k;
    # 设置需要进行压缩的最小响应大小。
    brotli_min_length 20;
    # 指定对哪些内容编码类型进行压缩。text/html内容总是会被进行压缩
    brotli_types text/plain application/json application/javascript application/x-javascript text/javascript text/css application/xml image/jpeg image/gif image/png video/mpeg audio/x-pn-realaudio audio/x-midi audio/basic audio/mpeg audio/ogg audio/* video/mp4;
server {
    listen    80;
    # 您的域名
    server_name xxxxxx.xxx; 
    location ^~ / {
        proxy_cache imgcache;
        proxy_cache_key $scheme$proxy_host$uri$is_args$args;
        proxy_cache_valid  200 304 302 24h;   
        proxy_pass http://www.域名:5008;
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
    location ^~ /pc {
        proxy_pass http://www.域名:5008/back;
        index index.htm index.html;
    }
}
include /www/server/panel/vhost/nginx/*.conf;
}

```

一切准备工作已就绪，可以把项目部署到服务器上了

**执行 npm run build 命令分别打包前台和后台**

## 最后

编写本项目顺序建议参考本md文件目录

项目简单，看到这里麻烦点个star
