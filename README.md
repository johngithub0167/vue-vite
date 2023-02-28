# vue3 + vite + ts

主要使用 vue3 + vite + ts + less + pinia + element—Plus

## 一个简单的vue3架子

里面包含 ts校验和vite的一些常用配置，用node.js来mock的几个简单接口，架子里面内容有：权限动态路由的公共封装 axios请求的封装 登录 退出是全局的封装

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.




## 安装依赖

```sh
yarn
```
## 进入到mock的终端 下载依赖

```sh
yarn

```

## 进入到mock的终端 输入命令启动node服务

```sh
node .\index.js

```


### 再回到根目录启动~~

```sh
yarn run dev
```

### 打包

```sh
yarn run build
```

