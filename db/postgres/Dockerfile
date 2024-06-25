# 使用官方的 PostgreSQL 14 镜像
FROM postgres:14

# 设置环境变量
ENV POSTGRES_DB=local
ENV POSTGRES_USER=yarnb
ENV POSTGRES_PASSWORD=123456a.

# 复制初始化脚本到 Docker 容器的初始化目录
COPY ./db/postgres/init.sql /docker-entrypoint-initdb.d/

# 暴露 PostgreSQL 默认端口
EXPOSE 5432
