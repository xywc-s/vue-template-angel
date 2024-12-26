FROM harbor-registry.angelyeast.com:443/base/nginx:1.21
COPY ./dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
