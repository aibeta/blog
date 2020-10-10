# Acme

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

// 5. 如果是泛域名证书，配置完成后，要去dns增加子域名的域名解析
ssl_certificate          /etc/nginx/ssl_cert/fullchain.cer;
ssl_certificate_key      /etc/nginx/ssl_cert/xxx.key;
```