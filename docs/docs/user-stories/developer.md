[[toc]]

<br />

👨‍💻 开发中
✔️ 已实现
☑️ 已完成

<br />

# 开发者故事集

## 👨‍💻 我希望部件组件管理模块的方法可以根据部件返回不同具体的类型

::: details

**描述**

作为，一名开发者

我希望，我希望部件组件管理模块的方法可以根据部件返回不同具体的类型

以便于，在使用的时候不需要强制转换类型

:::

## 👨‍💻 我希望 widget 的默认值在数据库中不记录，转而使用代码内注册好的数据

::: details

**描述**

作为，一名开发者

我希望，widget 的默认值在数据库中不记录，转而使用代码内注册好的数据

以便于，更新字段的时候，只更新代码，和只升级 widget 实例的 props，而不用更新 widget 的默认值数据，减少冗余重复数据源

:::

## ✔️ 我希望拖动组件 hover 在部件上的组件区域时，可以触发相应的事件

::: details

**描述**

作为，一名开发者

我希望，拖动组件 hover 在部件上的组件区域时，可以触发相应的事件

以便于，我可以做出相应的处理

**验收标准**

- [Widget 组件需要提供一组回调函数，当 hover 在部件上时或者离开时，可以触发它](../system-apis.md#widget-drag-enter-and-leave-api)

:::

## ✔️ 我希望部件的 display 和其内部的组件的 display 可以保持一致

::: details

**描述**

作为，一名开发者

我希望，部件的 display 和其内部的组件的 display 可以保持一致

以便于，父组件可以控制子组件的布局

**验收标准**

- 子组件的 display 和父组件的 display 保持一致

:::

## ✔️ 我希望组件可以跨层级控制子插槽的尺寸样式

::: details

**描述**

作为，一名开发者

我希望，组件可以跨层级控制子插槽的尺寸样式

以便于，我可以控制子插槽的尺寸样式而不需要知道插槽元素结构

**验收标准**

- 可以通过动态样式表控制子插槽的尺寸样式

:::

## ✔️ 我希望插槽可以有一个公共插槽区域父组件进行管理

::: details

**描述**

作为，一名开发者

我希望，插槽可以有一个公共插槽区域父组件进行管理

以便于，我可以统一管理插槽

**验收标准**

- 存在对应插槽区域组件，可以管理子插槽

:::

## 我希望组件拖放到舞台插槽上后，应该触发相应的事件

::: details

**描述**

作为，一名开发者

我希望，组件拖放到舞台插槽上后，应该触发相应的事件

以便于，我可以监听事件，并做相应的处理

**验收标准**

- 事件模块触发相应事件

:::

## 我希望可以把数据保护到控制器中，他可以帮我自动保存到外部

::: details

**描述**

作为，一名开发者

我希望，可以把数据保护到控制器中，他可以帮我自动保存到外部

以便于，我可以持久化数据

:::

## 我希望可以把数据异步保存到本地

::: details

**描述**

作为，一名开发者

我希望，可以把数据异步保存到本地

以便于，我可以持久化数据

:::

## 我希望可以把数据异步保存到服务器

::: details

**描述**

作为，一名开发者

我希望，可以把数据异步保存到服务器

以便于，我可以持久化数据

:::

## 我希望可以通过接口，向舞台上添加部件

::: details

**描述**

作为，一名开发者

我希望，可以通过接口，向舞台上添加部件

以便于，我可以准备测试环境数据

**验收标准**

- cypress 提供相应的指令方法。

:::
