FROM nginx:stable-alpine

COPY .build/ /tmp/site/

RUN cat \
      /tmp/site/site.tar.gz.b64.part01 \
      /tmp/site/site.tar.gz.b64.part02 \
      /tmp/site/site.tar.gz.b64.part03 \
      /tmp/site/site.tar.gz.b64.part04 \
      /tmp/site/site.tar.gz.b64.part05 \
      /tmp/site/site.tar.gz.b64.part06 \
      /tmp/site/site.tar.gz.b64.part07a \
      /tmp/site/site.tar.gz.b64.part07b \
      /tmp/site/site.tar.gz.b64.part08a \
      /tmp/site/site.tar.gz.b64.part08b \
      /tmp/site/site.tar.gz.b64.part09 \
      /tmp/site/site.tar.gz.b64.part10 \
      /tmp/site/site.tar.gz.b64.part11 \
    | base64 -d > /tmp/site.tar.gz \
    && tar -xzf /tmp/site.tar.gz -C /usr/share/nginx/html \
    && rm -rf /tmp/site /tmp/site.tar.gz

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
