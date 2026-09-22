FROM nginx:stable-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY friend_texas.jpg /usr/share/nginx/html/friend_texas.jpg
COPY fix.css /usr/share/nginx/html/fix.css
COPY fix-mobile.css /usr/share/nginx/html/fix-mobile.css
COPY fix.js /usr/share/nginx/html/fix.js

# Layer the UI/image fixes over the original static page without duplicating the HTML.
RUN sed -i \
  -e 's#</head>#  <link rel="stylesheet" href="fix.css">\n  <link rel="stylesheet" href="fix-mobile.css">\n</head>#' \
  -e 's#</body>#  <script src="fix.js"></script>\n</body>#' \
  /usr/share/nginx/html/index.html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
