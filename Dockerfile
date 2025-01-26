# 使用 Node.js 作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package.json ./
COPY package-lock.json ./

# 安装依赖
RUN npm install



# 复制前端项目文件
COPY . .

# 构建前端项目
RUN npm run build

# 暴露端口
EXPOSE 3000

# 运行前端项目
CMD ["npm", "start"]
