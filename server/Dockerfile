# 使用 Node.js v21.6.1 作为基础镜像
FROM node:21.6.1-alpine AS builder

# 安装 pnpm
RUN npm install -g pnpm@9

WORKDIR /workspace

# 复制 package.json 和 pnpm-lock.yaml 以及上级目录的 pnpm-workspace.yaml
COPY ../pnpm-lock.yaml ../pnpm-workspace.yaml ../.npmrc ./

# 设置工作目录
WORKDIR /workspace/server

COPY ./server/package.json ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制所有文件到工作目录
COPY ./server .

RUN pnpm prisma:generate

# 安装依赖
RUN pnpm build

# 暴露应用运行的端口（假设你的应用运行在3000端口）
EXPOSE 3000

# 启动应用
CMD ["node", "dist/main"]
