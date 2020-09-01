# metaphysics

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 总体概述

metaphysics是在projectify editor基础上实现的编辑器

目录结构

- | public
    - index.js electron入口
- | src 编辑器所在文件夹, 编辑器中的文件只能引用各个文件夹的index.js, 或者根目录中的文件
    - | workbrench 编辑器主体结构
        - Workbrench.vue 编辑器主框架
        - StatusItem.vue 底部状态栏
    - | mt-ui UI库
    - | editor 编辑器核心
        - model.ts 接口模型 
    - | codegen 代码输出模块
    - store.ts vuex模块 
    - main.ts 编辑器入口
    - utils.ts 工具类
    - fs.ts 文件读写的封装类
    - config.ts 配置的封装类
    - project.ts 工程的静态类