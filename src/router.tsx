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
  const Hash = React.lazy(() => import('./components/features/hash'))
  const Crypto = React.lazy(() => import('./components/features/crypto'))
  const Encode = React.lazy(() => import('./components/features/encode'))
  const Generate = React.lazy(() => import('./components/features/generate'))
  const UrlEncode = React.lazy(() => import('./components/features/urlEncode'))
  const Base64Encode = React.lazy(() => import('./components/features/base64Encode'))
  const TimeTransform = React.lazy(() => import('./components/features/timeTransform'))
  const ErCode = React.lazy(() => import('./components/features/erCode'))
  const TextToPin = React.lazy(() => import('./components/features/textToPin'))
  const IPSearch = React.lazy(() => import('./components/features/ipSearch'))
  const RegExp = React.lazy(() => import('./components/features/regExp'))
  const BarCode = React.lazy(() => import('./components/features/barCode'))
  const UnitTransform = React.lazy(() => import('./components/features/unitTransform'))

  const componentMap = {
    '常用-JSON工具': <JsonEditor />,
    '常用-哈希(hash)': <Hash />,
    '常用-URL编码': <UrlEncode />,
    '常用-Base64': <Base64Encode />,
    '常用-时间日期': <TimeTransform />,
    '常用-二维码': <ErCode />,
    '常用-汉字转拼音': <TextToPin />,
    '常用-IP查询': <IPSearch />,
    '常用-正则表达式': <RegExp />,
    '常用-条形码': <BarCode />,
    '转换-单位转换': <UnitTransform />,
    // 加解密
    '加解密-哈希(hash)': <Hash />,
    '加解密-HMAC': <Crypto />,
    '加解密-AES': <Crypto />,
    '加解密-DES': <Crypto />,
    '加解密-Triple DES': <Crypto />,
    '加解密-RC4': <Crypto />,
    '加解密-Rabbit': <Crypto />,
    '加解密-SM2': <Crypto />,
    '加解密-SM4': <Crypto />,
    '加解密-RSA': <Crypto />,
    '加解密-签名/验签': <Crypto />,
    '加解密-Base64': <Crypto />,
    '加解密-Bcrypt': <Crypto />,
    // 编解码
    '编解码-Base64': <Base64Encode />,
    '编解码-URL编码': <UrlEncode />,
    '编解码-Unicode': <Encode />,
    '编解码-JWT解码': <Encode />,
    '编解码-Hex/String': <Encode />,
    '编解码-Html编码': <Encode />,
    '编解码-GZIP': <Encode />,
    '编解码-ASN.1解码': <Encode />,
    '编解码-域名编码': <Encode />,
    // 生成
    '生成-二维码': <ErCode />,
    '生成-条形码': <BarCode />,
    '生成-随机字符生成': <Generate />,
    '生成-UUID生成': <Generate />,
    '生成-原码/反码/补码': <Generate />,
    '生成-IP网络计算器': <Generate />,
    '生成-SQL参数填充': <Generate />,
    '生成-Http请求代码': <Generate />,
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