FROM nginx:stable-alpine

COPY .build/site.tar.gz.b64.part* /tmp/site/

RUN cat /tmp/site/site.tar.gz.b64.part* | base64 -d > /tmp/site.tar.gz \
    && tar -xzf /tmp/site.tar.gz -C /usr/share/nginx/html \
    && rm -rf /tmp/site /tmp/site.tar.gz

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
