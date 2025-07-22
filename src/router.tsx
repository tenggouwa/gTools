import Layouts from "./components/layouts/index"
import JsonEditor from "./components/features/jsonEditor"
import { useState, createContext } from "react"

// 直接在这里创建 context
export const TabContext = createContext({
  activeTab: "常用",
  setActiveTab: (tab: string) => {},
  activeRadio: "哈希(hash)",
  setActiveRadio: (radio: string) => {}
})

export default function Router() {
  const [activeTab, setActiveTab] = useState('常用');
  const [activeRadio, setActiveRadio] = useState('哈希(hash)');
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, activeRadio, setActiveRadio }}>
      <Layouts>
        <JsonEditor />
      </Layouts>
    </TabContext.Provider>
  )
}