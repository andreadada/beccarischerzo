FROM nginx:stable-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY friend_texas.jpg /usr/share/nginx/html/friend_texas.jpg

# Replace two dead Unsplash photo IDs with currently valid Texas photos.
# This fixes the San Antonio River Walk image (gallery + activity card)
# and the Dallas Downtown image (gallery + modal) during the image build.
RUN sed -i \
  -e 's/photo-1582650625119-3a31f8418b7d/photo-1692193483739-0e378f2eec45/g' \
  -e 's/photo-1545232979-fbf68fe9b10d/photo-1775717677666-cb0e14a904fe/g' \
  /usr/share/nginx/html/index.html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
