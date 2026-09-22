FROM nginx:stable-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY friend_texas.jpg /usr/share/nginx/html/friend_texas.jpg

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
