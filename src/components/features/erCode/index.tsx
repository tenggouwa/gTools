import React, { useRef, useEffect, useState } from "react"
import { Input, Button, Select, Slider, Space } from "@arco-design/web-react"
import QRCodeStyling from "qr-code-styling"
import "./index.scss"

const dotTypes = [
  { label: "方形", value: "square" },
  { label: "圆形", value: "dots" },
  { label: "圆角", value: "rounded" },
  { label: "平滑", value: "extra-rounded" }
]
const eyeTypes = [
  { label: "方形", value: "square" },
  { label: "圆形", value: "circle" },
  { label: "圆角", value: "rounded" }
]
const errorLevels = [
  { label: "L", value: "L" },
  { label: "M", value: "M" },
  { label: "Q", value: "Q" },
  { label: "H", value: "H" }
]

export default function ErCode() {
  const [text, setText] = useState("1233sq12")
  const [size, setSize] = useState(300)
  const [margin, setMargin] = useState(10)
  const [dotType, setDotType] = useState("square")
  const [eyeType, setEyeType] = useState("square")
  const [bgColor, setBgColor] = useState("#fff")
  const [fgColor, setFgColor] = useState("#000")
  const [errorLevel, setErrorLevel] = useState("Q")
  const qrRef = useRef<HTMLDivElement>(null)
  const qrInstance = useRef<any>(null)

  useEffect(() => {
    qrInstance.current = new QRCodeStyling({
      width: size,
      height: size,
      data: text,
      margin,
      qrOptions: { errorCorrectionLevel: errorLevel },
      dotsOptions: { type: dotType, color: fgColor },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: { type: eyeType, color: fgColor },
      cornersDotOptions: { type: eyeType, color: fgColor }
    })
    qrRef.current.innerHTML = ""
    qrInstance.current.append(qrRef.current)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    qrInstance.current.update({
      width: size,
      height: size,
      data: text,
      margin,
      qrOptions: { errorCorrectionLevel: errorLevel },
      dotsOptions: { type: dotType, color: fgColor },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: { type: eyeType, color: fgColor },
      cornersDotOptions: { type: eyeType, color: fgColor }
    })
  }, [text, size, margin, dotType, eyeType, bgColor, fgColor, errorLevel])

  const handleDownload = () => {
    qrInstance.current.download({ extension: "png" })
  }

  return (
    <div className="ErCodeContainer">
      <div className="ErCodeInput">
        <Input.TextArea
          className="ErCodeInputTextArea"
          value={text}
          onChange={setText}
          placeholder="请输入二维码内容"
        />
        <div className="ErCodeInputOptions">
          <Space>
            <span className="ErCodeInputOptionsLabel">外边距：</span>
            <Slider min={0} max={40} value={margin} onChange={setMargin} style={{ width: 80 }} />
          </Space>
          <Space>
            <span className="ErCodeInputOptionsLabel">纠错等级：</span>
            <Select value={errorLevel} onChange={setErrorLevel} style={{ width: 80 }} options={errorLevels} />
          </Space>
          <Space>
            <span className="ErCodeInputOptionsLabel">点样式：</span>
            <Select value={dotType} onChange={setDotType} style={{ width: 80 }} options={dotTypes} />
          </Space>
          <Space>
            <span className="ErCodeInputOptionsLabel">定位符样式：</span>
            <Select value={eyeType} onChange={setEyeType} style={{ width: 80 }} options={eyeTypes} />
          </Space>
          <Space>
            <span className="ErCodeInputOptionsLabel">前景色：</span>
            <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} />
            <span className="ErCodeInputOptionsLabel" style={{ marginLeft: 16 }}>背景色：</span>
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
          </Space>
        </div>
      </div>
      <div
        className="ErCodeImage"
      >
        <div className="ErCodeImageInner" ref={qrRef} />
        <div>
          <Button className="ErCodeImageDownload" type="primary" onClick={handleDownload}>下载</Button>
        </div>
      </div>
    </div>
  )
}