import { useContext, useEffect } from "react"
import { MENU_LIST } from "../../../constants"
import { Tabs, Radio } from '@arco-design/web-react'
import { TabContext } from "../../../router"

const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group

export default function Menu() {
  const { activeTab, setActiveTab, activeRadio, setActiveRadio } = useContext(TabContext)
  const currentTab = MENU_LIST.find(item => item.label === activeTab)

  // 监听 activeTab 变化，自动设置 activeRadio
  useEffect(() => {
    if (currentTab && currentTab.children && currentTab.children.length > 0) {
      setActiveRadio(currentTab.children[0].label)
    }
  }, [activeTab])

  return (
    <>
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        {MENU_LIST.map((item) => (
          <TabPane key={item.label} title={item.label} />
        ))}
      </Tabs>
      {currentTab && currentTab.children && (
        <RadioGroup
          value={activeRadio}
          onChange={setActiveRadio}
          style={{ margin: '6px 6px 0 6px' }}
        >
          {currentTab.children.map(child => (
            <Radio style={{ marginRight: 4 }} key={child.label} value={child.label}>
              {child.label}
            </Radio>
          ))}
        </RadioGroup>
      )}
    </>
  )
}