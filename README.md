## 简介

Chakki 基于 Lin-CMS 开发，详细内容请参阅 Lin-CMS 的文档 [https://doc.cms.talelin.com/](https://doc.cms.talelin.com/)

本项目为 Vue 前端，后端请移步 [chakki-spring](https://github.com/gadfly3173/chakki-spring)

Lin-CMS 是林间有风团队经过大量项目实践所提炼出的一套**内容管理系统框架**。

Lin-CMS 可以有效的帮助开发者提高 CMS 的开发效率。

## 依赖
* NodeJs 10+
* Yarn

## 快速上手

```bash
# clone the project
git clone https://github.com/gadfly3173/chakki-vue.git

# install dependency
yarn
# 如果使用npm的话会因为没有lock文件，可能自动获取高于element-ui-2.13.x和tinymce-5.1.x的依赖，导致富文本编辑器和element部分组件异常，请手动降版本

# develop
yarn (run) serve

# build
yarn (run) build
```
