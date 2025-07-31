import { useEffect, useState } from "react"
import { setupMonacoEnvironment } from "../../monaco/monacoEnv"
import Editor from '@monaco-editor/react'
import {
  Space,
  Button,
  Popover,
  Menu,
  Message
} from '@arco-design/web-react'
import { IconDown, IconUp } from "@arco-design/web-react/icon"
import beautify from 'js-beautify'
import { jsonrepair } from 'jsonrepair'
import { INDENT_SIZE_LIST } from "~/src/constants"
import { copyText } from "~/src/components/utils/copy"

setupMonacoEnvironment()

export default function JsonEditor() {
  const [value, setValue] = useState(() => {
    // 只在组件首次挂载时执行
    return localStorage.getItem('jsonEditorValue') || ''
  })
  const [indentSize, setIndentSize] = useState(4)
  const [popupVisible, setPopupVisible] = useState({
    indentSize: false,
    escaped: false,
  })

  useEffect(() => {
    localStorage.setItem('jsonEditorValue', value)
  }, [value])

  // 格式化
  const onFormate = () => {
    const formatted = beautify.js(value, { indent_size: 4 })
    setValue(formatted)
    copyText(formatted)
  }

  // 缩进
  const onIndentSize = (size: number) => {
    setIndentSize(size)
    const compressed = beautify.js(value, { indent_size: size })
    setValue(compressed)
    copyText(compressed)
  }

  // 修复
  const onRepair = () => {
    const fixed = jsonrepair(value)
    const fixedData = beautify.js(fixed, { indent_size: indentSize })
    setValue(fixedData)
    copyText(fixedData)
  }

  // 转义
  const onEscaped = () => {
    try {
      // 1. 先把 value 解析成对象
      const obj = JSON.parse(value)
      // 2. 格式化输出
      const formatted = JSON.stringify(obj, null, indentSize)
      // 3. 只转义引号，保留换行和缩进
      const escaped = formatted.replace(/"/g, '\\"')
      setValue(escaped)
      copyText(escaped)
    } catch (e) {
      Message.error('转义失败：' + e)
    }
  }
  // 移除转义
  const onUnescape = () => {
    try {
      // 1. 还原所有转义的引号
      const unescaped = value.replace(/\\"/g, '"')
      // 2. 尝试解析为对象
      const obj = JSON.parse(unescaped)
      // 3. 格式化输出
      const formatted = JSON.stringify(obj, null, indentSize)
      setValue(formatted)
      copyText(formatted)
    } catch (e) {
      Message.error('移除转义失败：' + e)
    }
  }

  // 压缩
  const onCompressed = () => {
    try {
      // 先格式化为标准JSON字符串，再去掉所有换行和多余空格
      const compressed = JSON.stringify(JSON.parse(value))
      setValue(compressed)
      copyText(compressed)
    } catch (e) {
      Message.error('压缩失败：' + e)
    }
  }

  // Unicode
  const onUnicode = () => {
    const unicode = JSON.stringify(value)
    setValue(unicode)
    copyText(unicode)
  }

  return (
    <div style={{ marginTop: '6px' }}>
      <Editor
        height="400px"
        defaultLanguage="json"
        path="/monaco/vs"
        theme="vs-dark"
        value={value}
        onChange={setValue}
      />
      <Space size="mini" style={{ margin: 6 }}>
        <Button onClick={onRepair} size="small" type="outline">JSON修复</Button>
        <Button onClick={onFormate} size="small" type="outline">格式化</Button>
        <Popover
          trigger='click'
          content={
            <Menu>
              {
                INDENT_SIZE_LIST.map(item => (
                  <Menu.Item key={item.value.toString()} onClick={() => onIndentSize(item.value)}>{item.label}</Menu.Item>
                ))
              }
            </Menu>
          }
          onVisibleChange={(visible) => {
            setPopupVisible({
              ...popupVisible,
              indentSize: visible
            })
          }}
        >
          <Button size="small" type="outline">
            {INDENT_SIZE_LIST.find(item => item.value === indentSize)?.label}
            {popupVisible.indentSize ? <IconUp /> : <IconDown />}
          </Button>
        </Popover>
        
        <Button onClick={onCompressed} size="small" type="outline">压缩</Button>
        <Popover
          trigger='click'
          content={
            <Menu>
              <Menu.Item key="escaped" onClick={onEscaped}>转义</Menu.Item>
              <Menu.Item key="unescaped" onClick={onUnescape}>移除转义</Menu.Item>
            </Menu>
          }
          onVisibleChange={(visible) => {
            setPopupVisible({
              ...popupVisible,
              escaped: visible
            })
          }}
        >
          <Button size="small" type="outline">
            转义
            {popupVisible.escaped ? <IconUp /> : <IconDown />}
          </Button>
        </Popover>
      </Space>
    </div>
  )
}

