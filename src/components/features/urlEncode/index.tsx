import React, { useState, useEffect } from "react"
import { Tabs, Input, Button } from "@arco-design/web-react"
import { IconCopy } from "@arco-design/web-react/icon"
import { copyText } from "~/src/components/utils/copy"
import './index.scss'

const { TextArea } = Input

export default function UrlEncode() {
  const [tab, setTab] = useState("encode")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  useEffect(() => {
    try {
      if (tab === "encode") {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch (e) {
      setOutput("解码失败：" + e)
    }
  }, [input, tab])

  const handleCopy = () => {
    if (!output) return
    copyText(output)
  }

  return (
    <div className="UrlEncodeContainer">
      <Tabs
        activeTab={tab}
        onChange={(tab) => {
          setTab(tab)
          setInput("")
          setOutput("")
        }}
        type="line"
        size="small"
        tabPosition="top"
        className="UrlEncodeTabs"
      >
        <Tabs.TabPane key="encode" title="编码" />
        <Tabs.TabPane key="decode" title="解码" />
      </Tabs>
      <div className="UrlEncodeContent">
        <TextArea
          className="UrlEncodeInput"
          value={input}
          onChange={setInput}
          autoSize={{ minRows: 4, maxRows: 8 }}
          placeholder={tab === "encode" ? "请输入要编码的内容" : "请输入要解码的内容"}
        />
        <div className="UrlEncodeOutput">
          <TextArea
            className="UrlEncodeOutputTextArea"
            value={output}
            readOnly
            placeholder="输出"
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
          <Button
            onClick={handleCopy}
            type="primary"
            className="UrlEncodeCopy"
            size="mini"
          >
            <IconCopy />复制
          </Button>
        </div>
      </div>
    </div>
  )
}
