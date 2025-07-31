import React, { useState } from "react"
import { Input, Select, Space, Button } from '@arco-design/web-react'
import { copyText } from "~/src/components/utils/copy"
import { TIMEZONE_LIST } from "~/src/constants"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import "./timezone.scss"

dayjs.extend(utc)
dayjs.extend(timezone)

const DEFAULT_TIMEZONES = [
  "Asia/Shanghai",
  "Asia/Dubai",
  "Europe/Moscow",
  "America/Chicago",
  "Pacific/Midway",
  "Pacific/Noumea",
  "Pacific/Auckland",
  "Europe/London",
]

export default function Timezone() {
  // 统一用一个 utcMs 作为“绝对时间”
  const [utcMs, setUtcMs] = useState(dayjs().valueOf())
  const [timezones, setTimezones] = useState(DEFAULT_TIMEZONES)

  // 输入框 value
  const getInputValue = (tz: string) =>
    utcMs == null ? "" : dayjs(utcMs).tz(tz).format("YYYY-MM-DD HH:mm:ss")

  // 输入框 onChange
  const handleInputChange = (v: string, tz: string) => {
    const d = dayjs.tz(v, tz)
    if (d.isValid()) {
      setUtcMs(d.utc().valueOf())
    }
  }

  // select 切换时区
  const handleSelectChange = (value: string, idx: number) => {
    const newTimezones = [...timezones]
    newTimezones[idx] = value
    setTimezones(newTimezones)
    // 保持绝对时间不变，自动联动所有输入框
  }

  // “当前时间”按钮
  const handleNow = () => {
    setUtcMs(dayjs().valueOf())
  }

  // 清空
  const handleClear = () => {
    setUtcMs(null)
  }

  return (
    <div className="TimezoneContainer">
      {
        timezones.map((tz, idx) => (
          <div key={tz + idx} style={{ marginBottom: 6 }}>
            <Input
              value={getInputValue(tz)}
              placeholder="支持 YYYY-MM-DD HH:mm:ss 时间格式输入"
              onChange={v => handleInputChange(v, tz)}
              addAfter={
                <Space size={10}>
                  <Select
                    value={tz}
                    onChange={val => handleSelectChange(val, idx)}
                    showSearch
                  >
                    {
                      TIMEZONE_LIST.map(item => (
                        <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                      ))
                    }
                  </Select>
                  <Button
                    type="primary"
                    size="mini"
                    onClick={() => copyText(getInputValue(tz))}
                  >复制</Button>
                </Space>
              }
              allowClear
            />
          </div>
        ))
      }
      <Space>
        <Button type="primary" onClick={handleNow}>显示所有时区当前时间</Button>
        <Button type="primary" onClick={handleClear}>清空</Button>
      </Space>
    </div>
  )
}