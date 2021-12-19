FROM node:16

WORKDIR /root

# Install nginx
RUN echo 'deb http://nginx.org/packages/mainline/debian/ stretch nginx' >> /etc/apt/sources.list \
  && wget http://nginx.org/keys/nginx_signing.key \
  && apt-key add nginx_signing.key \
  && apt update \
  && apt install nginx

# Install certificates
COPY cert/openssl-25519.cnf .
RUN openssl genpkey -algorithm ED25519 > /etc/ssl/certs/localhost.key \
  && openssl req \
    -new \
    -out localhost.csr \
    -key /etc/ssl/certs/localhost.key \
    -config openssl-25519.cnf \
  && openssl x509 \
    -req \
    -days 365 \
    -in localhost.csr \
    -signkey /etc/ssl/certs/localhost.key \
    -out /etc/ssl/certs/localhost.crt

# Copy website files
COPY public/* /var/www/localhost/

# Configure nginx
COPY nginx/localhost.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80 443

# Start nginx
CMD ["sh", "-c", "service nginx start; tail -f /dev/null"]
