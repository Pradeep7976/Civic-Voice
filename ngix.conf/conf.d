# worker_processes 1;

# events {
#     worker_connections 1024;
# }
# http {
    # include       mime.types;
    # default_type  application/octet-stream;

    # sendfile        on;
    # keepalive_timeout  65;

    # upstream frontend {
    #     server react-frontend:3000;
    # }

    # upstream backend {
    #     server spring-backend:7000;
    # }

    server {
        listen 80;
        server_name yourdomain.com;

        location /api {
            proxy_pass http://api:7000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location / {
            proxy_pass http://web:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
# }