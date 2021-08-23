# vue-kstrack

该插件封装了`track`指令，实现了声明式埋点方案，便于解耦数据埋点和业务逻辑。

为了使该指令具有普适性，该插件只实现了控制埋点执行时机，具体的埋点逻辑需要作为参数传给该插件

# 使用步骤

**1. 安装**

```
npm install --save @ad/vue-track
```

**2. 在入口 js 中引入**

```
import Vue from 'vue';
import track from '@ad/vue-track'
// 需要业务方提供三个函数，分别用于PV统计、点击统计、展示统计
import { logPV, logClick, logShow } from './logHandler';
Vue.use(track, { logPV, logClick, logShow });

```

**3. 在 vue 组件中使用**

指令使用的参数，与业务自己定义的`logPV`、`logClick`、`logShow`三个函数的参数是对应的，
参数的定义、实现、使用，全部由业务方自己决定。

# 样例代码

**PV 统计：**

假设业务中定义 logPV 函数

```
export function logPV(params: {
    page: string;
    type: number;
}) {
    // 具体发送数据请求逻辑
}

// 组件使用时
<div class="app"
    v-track:pv="{page: "app", type: 1}">
</div>

```

**click 点击统计：**

```
// 业务中定义logShow函数
export async function logClick(params: {
    page: string;
    type: number;
    action: string;
}) {
    // 点击统计逻辑
}

// 组件使用时
<div class="card" v-track:click="{page: 'app', type: 1, action: 'join-btn'}"></div>
```

**元素展示统计：**

```
// 业务中定义logShow函数
export async function logShow(trackParams: {
    page: string;
    type: number;
    action: string;
}) {
    // 展示统计逻辑
}

// 组件使用时
<div class="card" v-track:show="{page: 'app', type: 1, action: 'main-card'}"></div>

// 支持元素展示只执行一次
<div class="card" v-track:show.once="{page: 'app', type: 1, action: 'main-card'}"></div>
```
