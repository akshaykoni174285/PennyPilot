FROM nginx:latest

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom config
COPY nginx.conf /etc/nginx/nginx.conf
