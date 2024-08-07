# 使用 Node.js v21.6.1 作为基础镜像
FROM node:21.6.1-alpine AS builder

# 安装 pnpm
RUN npm install -g pnpm@9

# 设置工作目录
WORKDIR /workspace

# 复制 package.json 和 pnpm-lock.yaml 以及上级目录的 pnpm-workspace.yaml
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# 分别复制各子项目的 package.json 文件
COPY admin/package.json admin/
COPY common/package.json common/

# 环境变量以避免安装cypress相关的依赖
ARG INSTALL_CYPRESS=false

# 安装依赖
RUN if [ "$INSTALL_CYPRESS" = "false" ]; then \
      echo "exclude cypress from install"; \
      export CYPRESS_INSTALL_BINARY=0; \
    fi && \
    pnpm install --frozen-lockfile

# 复制所有文件到工作目录
COPY admin/ admin/
COPY common/ common/

# 构建 Vite 项目
RUN pnpm build:admin

# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:1.27.0-alpine

# 复制 Nginx 配置文件到镜像中
COPY admin/nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建后的文件到 Nginx 静态文件目录
COPY --from=builder /workspace/admin/dist /usr/share/nginx/html

# 暴露 Nginx 默认的 HTTP 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
