import React, { useState } from "react"
import { Tabs } from "@arco-design/web-react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import Timestamp from "./timestamp"
import Timezone from "./timezone"

import "./index.scss"

dayjs.extend(utc)
dayjs.extend(timezone)

export default function TimeTransform() {
  const [tab, setTab] = useState("timestamp")

  return (
    <div className="TimeTransform">
      <Tabs
        activeTab={tab}
        onChange={(tab) => {
          setTab(tab)
        }}
        type="line"
        size="small"
        tabPosition="top"
        className="Base64EncodeTabs"
      >
        <Tabs.TabPane key="timestamp" title="时间戳" />
        <Tabs.TabPane key="tz" title="时区" />
      </Tabs>
      {
        tab === "timestamp" && <Timestamp />
      }
      {
        tab === "tz" && <Timezone />
      }
    </div>
  )
}
