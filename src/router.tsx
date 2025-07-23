import Layouts from "./components/layouts/index"
import JsonEditor from "./components/features/jsonEditor"
import { useState, createContext } from "react"
import { Empty } from '@arco-design/web-react';

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
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, activeRadio, setActiveRadio }}>
      <Layouts>
        {
          activeTab === '常用' && activeRadio === 'JSON工具' ? (
            <JsonEditor />
          ) : (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px'
            }}>
              <Empty description="敬请期待" />
            </div>
          )
        }

      </Layouts>
    </TabContext.Provider>
  )
}