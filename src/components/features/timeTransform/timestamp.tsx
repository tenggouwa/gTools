import React, { useState, useEffect } from "react"
import { Input, Button, Select, Table } from "@arco-design/web-react"
import { copyText } from "~/src/components/utils/copy"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { TIMEZONE_LIST } from "~/src/constants"
import "./timestamp.scss"

dayjs.extend(utc)
dayjs.extend(timezone)

export default function Timestamp() {
  const [tz, setTz] = useState("Asia/Shanghai")
  const [input, setInput] = useState("")
  const [now, setNow] = useState(dayjs())
  const [currentMs, setCurrentMs] = useState("")

  // 定时刷新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs())
    }, 100)
    return () => clearInterval(timer)
  }, [])

  // 监听时区变化，自动刷新 currentMs
  useEffect(() => {
    setCurrentMs(dayjs().tz(tz).valueOf().toString())
  }, [tz])


  // 输入框 onChange
  const handleInputChange = (v) => {
    setInput(v)
    const d = dayjs.tz(v, tz)
    if (d.isValid()) {
      setCurrentMs(d.valueOf().toString())
    }
  }

  // 秒输入框 onChange
  const handleSecChange = (v) => {
    if (!/^[0-9]+$/.test(v)) return
    setCurrentMs((Number(v) * 1000).toString())
    setInput(dayjs(Number(v) * 1000).tz(tz).format("YYYY-MM-DD HH:mm:ss"))
  }

  // 毫秒输入框 onChange
  const handleMsChange = (v) => {
    if (!/^[0-9]+$/.test(v)) return
    setCurrentMs(Number(v).toString())
    setInput(dayjs(Number(v)).tz(tz).format("YYYY-MM-DD HH:mm:ss"))
  }

  // 纳秒输入框 onChange
  const handleNsChange = (v) => {
    if (!/^[0-9]+$/.test(v)) return
    const ms = Math.floor(Number(v) / 1e6)
    setCurrentMs(ms.toString())
    setInput(dayjs(ms).tz(tz).format("YYYY-MM-DD HH:mm:ss"))
  }

  return (
    <div className="TimeTransformContainer">
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <Select
          value={tz}
          onChange={setTz}
          style={{ width: '100%' }}
          showSearch
          options={TIMEZONE_LIST}
          addBefore='时区'
        />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="YYYY-MM-DD HH:mm:ss"
          style={{ width: '100%' }}
          addBefore='输入'
          addAfter={<Button onClick={() => {
            setInput("")
            setCurrentMs("")
          }} size="mini">清空</Button>}
        />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <Input
          value={currentMs ? Math.floor(Number(currentMs) / 1000).toString() : ""}
          onChange={handleSecChange}
          style={{ width: '100%' }}
          addBefore='秒'
          addAfter={<Button onClick={() => copyText(currentMs ? Math.floor(Number(currentMs) / 1000).toString() : "")} type="primary" size="mini">复制</Button>}
        />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <Input
          value={currentMs ? currentMs.toString() : ""}
          onChange={handleMsChange}
          style={{ width: '100%' }}
          addBefore='毫秒'
          addAfter={<Button onClick={() => copyText(currentMs ? currentMs.toString() : "")} type="primary" size="mini">复制</Button>}
        />
        <Input
          value={currentMs ? (Number(currentMs) * 1e6).toString() : ""}
          onChange={handleNsChange}
          style={{ width: '100%' }}
          addBefore='纳秒'
          addAfter={<Button onClick={() => copyText(currentMs ? (Number(currentMs) * 1e6).toString() : "")} type="primary" size="mini">复制</Button>}
        />
      </div>
      <Table
        columns={[
          { title: "格式", dataIndex: "label", width: 250 },
          { title: "值", dataIndex: "value" },
          {
            title: "操作",
            align: "right",
            render: (_, record) => (
              <Button size="mini" type="primary" onClick={record.op}>加载</Button>
            )
          }
        ]}

        data={[
          {
            label: "标准时间(秒)",
            value: dayjs().tz(tz).format("YYYY-MM-DD HH:mm:ss"),
            op: () => handleInputChange(dayjs().tz(tz).format("YYYY-MM-DD HH:mm:ss"))
          },
          {
            label: "Unix时间戳(秒)",
            value: Math.floor(dayjs().tz(tz).valueOf() / 1000).toString(),
            op: () => handleInputChange(dayjs().tz(tz).format("YYYY-MM-DD HH:mm:ss"))
          },
          {
            label: "标准时间(毫秒)",
            value: dayjs().tz(tz).format("YYYY-MM-DD HH:mm:ss.SSS"),
            op: () => handleInputChange(dayjs().tz(tz).format("YYYY-MM-DD HH:mm:ss"))
          },
          {
            label: "Unix时间戳(毫秒)",
            value: dayjs().tz(tz).valueOf().toString(),
            op: () => handleInputChange(dayjs().tz(tz).format("YYYY-MM-DD HH:mm:ss"))
          }
        ]}
        pagination={false}
        style={{ marginTop: 16, width: '100%' }}
      />
    </div>
  )
}
