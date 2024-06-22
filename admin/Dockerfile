# 使用 Node.js v21.6.1 作为基础镜像
FROM node:21.6.1-alpine AS builder

# 安装 pnpm
RUN npm install -g pnpm@9

WORKDIR /

# 复制 package.json 和 pnpm-lock.yaml 以及上级目录的 pnpm-workspace.yaml
COPY ./temp/pnpm-lock.yaml ./temp/pnpm-workspace.yaml ../.npmrc ./

# 设置工作目录
WORKDIR /admin

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json ./

# 安装依赖
RUN pnpm install

# 复制所有文件到工作目录
COPY . .

# 构建 Vite 项目
RUN pnpm run build

# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 复制 Nginx 配置文件到镜像中
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建后的文件到 Nginx 静态文件目录
COPY --from=builder /admin/dist /usr/share/nginx/html

# 暴露 Nginx 默认的 HTTP 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
