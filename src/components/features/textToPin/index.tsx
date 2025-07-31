import React, { useState, useMemo } from "react"
import { Input, Button, Select, Checkbox, Space, Typography } from "@arco-design/web-react"
import pinyin from "pinyin"
import { copyText } from "~/src/components/utils/copy"
import "./index.scss"

const { TextArea } = Input
const { Text } = Typography

// 拼音格式选项
const toneOptions = [
  { label: "无声调", value: "none" },
  { label: "有声调", value: "tone" },
  { label: "首字母", value: "first" }
]

// 分隔符选项
const separatorOptions = [
  { label: "无分隔符", value: "" },
  { label: "空格分隔", value: " " },
  { label: "'-'中划线分隔", value: "-" },
  { label: "'_'下划线分隔", value: "_" },
  { label: "'.'点分隔", value: "." }
]

export default function TextToPin() {
  const [inputText, setInputText] = useState("")
  const [toneType, setToneType] = useState("none")
  const [separator, setSeparator] = useState(" ")
  const [showPolyphonic, setShowPolyphonic] = useState(false)
  const [convertUv, setConvertUv] = useState(false)
  const [uppercase, setUppercase] = useState(true)

  // 转换拼音的核心函数
  const convertToPinyin = (text: string) => {
    if (!text.trim()) return ""

    const options: any = {
      style: toneType === "tone" ? pinyin.STYLE_TONE : toneType === "first" ? pinyin.STYLE_FIRST_LETTER : pinyin.STYLE_NORMAL,
      heteronym: showPolyphonic,
      segment: true
    }

    const result = pinyin(text, options)
    
    let pinyinText = result
      .map(item => {
        if (Array.isArray(item)) {
          // 如果启用多音字显示，则显示所有读音，用斜杠分隔并用括号包围
          if (showPolyphonic && item.length > 1) {
            return `(${item.join('/')})`
          }
          return item[0] || ""
        }
        return item || ""
      })
      .join(separator)

    // 处理 ü => v 转换
    if (convertUv) {
      pinyinText = pinyinText.replace(/ü/g, "v").replace(/Ü/g, "V")
    }

    // 转换为大写
    if (uppercase) {
      pinyinText = pinyinText.toUpperCase()
    }

    return pinyinText
  }

  // 使用 useMemo 优化性能
  const pinyinResult = useMemo(() => {
    return convertToPinyin(inputText)
  }, [inputText, toneType, separator, showPolyphonic, convertUv, uppercase])

  // 复制到剪贴板
  const handleCopy = () => {
    copyText(pinyinResult)
  }

  return (
    <div className="TextToPinContainer">
      <div className="TextToPinInput">
        <TextArea
          className="TextToPinInputTextArea"
          value={inputText}
          onChange={setInputText}
          placeholder="请输入要转换的中文文本"
          autoSize={{ minRows: 4, maxRows: 8 }}
        />
        <div className="TextToPinInputOptions">
          <Space wrap>
            <span className="TextToPinInputOptionsLabel">拼音格式：</span>
            <Button.Group>
              {toneOptions.map(option => (
                <Button
                  key={option.value}
                  type={toneType === option.value ? "primary" : "outline"}
                  onClick={() => setToneType(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </Button.Group>
          </Space>
          
          <Space wrap>
            <span className="TextToPinInputOptionsLabel">分隔符：</span>
            <Select
              value={separator}
              onChange={setSeparator}
              style={{ width: 120 }}
              options={separatorOptions}
            />
          </Space>
          
          <Space wrap>
            <Checkbox
              checked={showPolyphonic}
              onChange={setShowPolyphonic}
            >
              显示多音字
            </Checkbox>
            <Checkbox
              checked={convertUv}
              onChange={setConvertUv}
            >
              ü=&gt;v
            </Checkbox>
            <Checkbox
              checked={uppercase}
              onChange={setUppercase}
            >
              大写
            </Checkbox>
          </Space>
        </div>
      </div>
      
      <div className="TextToPinOutput">
        <div className="TextToPinOutputHeader">
          <Text style={{ fontWeight: 'bold' }}>转换结果：</Text>
          <Button type="primary" size="small" onClick={handleCopy}>
            复制
          </Button>
        </div>
        <div className="TextToPinOutputContent">
          <Text>{pinyinResult || "请输入中文文本进行转换"}</Text>
        </div>
      </div>
    </div>
  )
}
