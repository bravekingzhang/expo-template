# 一个 Expo 开发模板


## 特性

- nativewind，支持 tailwindcss方式写精美的统一样式
- expo-auth-session，支持 oauth 登陆
- expo-localization+i18n,国际化开箱即用
- 轻松暗黑/亮白模式切换，支持动态切换
- 基于文件的路由，省心，不需要配置

## 安装依赖

```shell
npm install
```

## 运行

```shell
npm run start
```

## 生成打包文件

```shell
npm run build:android
```

### 打开原生开发模式

```shell
npx expo prebuild
```

这个操作会生成一个 `ios` 和 `android` 的工程文件，然后执行

```shell
npx pod-install
```

### oauth登陆配置

- [配置 oauth](https://docs.expo.dev/guides/authentication/)
- .env 中配置相应的 key,然后在 `app.config.js` 去增加相应的配置，已经有 github 的配置示例，可以参考。