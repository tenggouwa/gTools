import React, { useEffect } from "react"
import { ConfigProvider } from "@arco-design/web-react"
import "@arco-design/web-react/dist/css/arco.css"
import zhCN from "@arco-design/web-react/es/locale/zh-CN"
import enUS from "@arco-design/web-react/es/locale/en-US"
import "./index.scss"

import Router from "./router"

const App = () => {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'dark');
  })
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        primaryColor: "#9FD4FD", // 这里可以自定义主题色
        // 其他主题变量
      }}
    >
      <Router />
    </ConfigProvider>
  )
}

export default App