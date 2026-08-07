FROM harbor-registry.angelyeast.com:443/base/nginx:1.31.3
COPY ./dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
