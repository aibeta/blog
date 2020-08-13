# Nginx

## 使用 acme.sh 自动生成证书步骤

```shell
// 1. 安装acme.sh
curl  https://get.acme.sh | sh

// 2. 为domin生成证书
acme.sh --issue  -d mydomain.com   --nginx

// 3. 把证书拷贝到指定路径
acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"

// 4. 在 nginx 里配置证书路径后重启
ssl_certificate "/path/to/fullchain/nginx/cert.pem";
ssl_certificate_key "/path/to/keyfile/in/nginx/key.pem";
```
