import express from "express";
import childProcess from "child_process";
import path from 'path';
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom/server';
// import Home from '@/pages/Home'
import { Route, RouteObject, matchRoutes, Routes } from "react-router-dom";
import routes from "@/router";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { serverStore } from "@/store";
const bodyParser = require("body-parser");

const app = express();
// const content = renderToString(<Home />);

app.use(express.static(path.resolve(process.cwd(), "client_build")))

// 请求body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 启动一个 post 服务
app.post("/api/getDemoData", (req, res) => {
  res.send({
    data: req.body,
    status_code: 0,
  })
})

app.get("*", (req, res) => {
  const routeMap = new Map<string, () => Promise<unknown>>(); // path - loaddata 的map
  // 初始化所有路由的数据
  routes.forEach((item) => {
    if (item.path && item.loadData) {
      routeMap.set(item.path, item.loadData(serverStore));
    }
  });
  // 匹配当前路由
  const matchedRoutes = matchRoutes(routes as RouteObject[], req.path);
  const promises: Array<() => Promise<unknown>> = [];
  matchedRoutes?.forEach(item => {
    if (routeMap.has(item.pathname)) {
      promises.push(routeMap.get(item.pathname) as () => Promise<unknown>);
    }
  })
  // 执行所有的异步请求
  Promise.all(promises).then(() => {
    // 统一放到 state 里面
    // 编译需要渲染的 JS，转成对应的 HTML STRING
    const content = renderToString(
      // 不同路径，返回不同的路由页面
      <Provider store={serverStore}>
        <StaticRouter location={req.path}>
          <Routes>
            {
              routes?.map((item, index) => {
                return <Route {...item} key={index} />
              })
            }
          </Routes>
        </StaticRouter>
      </Provider>
    );
    const helmet = Helmet.renderStatic();
    res.send(`
      <html
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.context = {
              state: ${JSON.stringify(serverStore.getState())}
            }
          </script>
          <script src="/index.js"></script>
        </body>
      </html>
    `);
  })
});
app.listen(3000, () => {
  console.log("ssr-server listen on http://127.0.0.1:3000");
});
childProcess.exec("start http://127.0.0.1:3000");