import React, { useState, useEffect } from "react"
import { Tabs, Input, Button } from "@arco-design/web-react"
import { IconCopy } from "@arco-design/web-react/icon"
import { copyText } from "~/src/components/utils/copy"
import './index.scss'

const { TextArea } = Input

export default function Base64Encode() {
  const [tab, setTab] = useState("encode")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  useEffect(() => {
    try {
      if (tab === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch (e) {
      setOutput(tab === "encode" ? "" : "解码失败：" + e)
    }
  }, [input, tab])

  const handleCopy = () => {
    if (!output) return
    copyText(output)
  }

  return (
    <div className="Base64EncodeContainer">
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
        className="Base64EncodeTabs"
      >
        <Tabs.TabPane key="encode" title="编码" />
        <Tabs.TabPane key="decode" title="解码" />
      </Tabs>
      <div className="Base64EncodeContent">
        <TextArea
          className="Base64EncodeInput"
          value={input}
          onChange={setInput}
          autoSize={{ minRows: 4, maxRows: 8 }}
          placeholder={tab === "encode" ? "请输入要编码的内容" : "请输入要解码的内容"}
        />
        <div className="Base64EncodeOutput">
          <TextArea
            className="Base64EncodeOutputTextArea"
            value={output}
            readOnly
            placeholder="输出"
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
          <Button
            onClick={handleCopy}
            type="primary"
            className="Base64EncodeCopy"
            size="mini"
          >
            <IconCopy />复制
          </Button>
        </div>
      </div>
    </div>
  )
}