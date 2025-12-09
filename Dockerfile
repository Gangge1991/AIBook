FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
# Install dependencies (including devDependencies for build)
RUN npm ci --legacy-peer-deps
# RUN npm ci 
COPY docs ./docs
ENV NODE_ENV=production
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/docs/.vuepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



# npm run dev
# 运行 npm run build 生成 docs/.vuepress/dist
# docker build -t dgbooks .
# docker run -d --name dgbooks -p 8090:80 dgbooks
# - - 打开浏览器访问 http://ip:8080