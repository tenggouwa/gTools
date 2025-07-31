import Layouts from "./components/layouts/index"
import React, { Suspense, createContext, useState } from "react"
import { Empty, Spin } from '@arco-design/web-react';

// 直接在这里创建 context
export const TabContext = createContext({
  activeTab: "常用",
  setActiveTab: (tab: string) => {},
  activeRadio: "JSON工具",
  setActiveRadio: (radio: string) => {}
})

export default function Router() {
  const [activeTab, setActiveTab] = useState('常用');
  const [activeRadio, setActiveRadio] = useState('JSON工具');

  const JsonEditor = React.lazy(() => import('./components/features/jsonEditor'))
  const UrlEncode = React.lazy(() => import('./components/features/urlEncode'))
  const Base64Encode = React.lazy(() => import('./components/features/base64Encode'))
  const TimeTransform = React.lazy(() => import('./components/features/timeTransform'))
  const ErCode = React.lazy(() => import('./components/features/erCode'))
  const TextToPin = React.lazy(() => import('./components/features/textToPin'))
  const IPSearch = React.lazy(() => import('./components/features/ipSearch'))
  const RegExp = React.lazy(() => import('./components/features/regExp'))
  const BarCode = React.lazy(() => import('./components/features/barCode'))
  // 其他组件同理

  const componentMap = {
    '常用-JSON工具': <JsonEditor />,
    '常用-URL编码': <UrlEncode />,
    '常用-Base64': <Base64Encode />,
    '常用-时间日期': <TimeTransform />,
    '常用-二维码': <ErCode />,
    '常用-汉字转拼音': <TextToPin />,
    '常用-IP查询': <IPSearch />,
    '常用-正则表达式': <RegExp />,
    '常用-条形码': <BarCode />,
    // 以后可以继续加
  }

  const key = `${activeTab}-${activeRadio}`
  const RenderComponent = componentMap?.[key] || (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px'
    }}>
      <Empty description="敬请期待" />
    </div>
  )

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, activeRadio, setActiveRadio }}>
      <Layouts>
        <Suspense fallback={<div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px'
        }}><Spin dot /></div>}>
          {RenderComponent}
        </Suspense>
      </Layouts>
    </TabContext.Provider>
  )
}