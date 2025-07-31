import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, Select, Checkbox } from '@arco-design/web-react'
import { IconDownload } from '@arco-design/web-react/icon'
import bwipjs from '@bwip-js/browser'
import './index.scss'

const { Option } = Select

interface BarcodeConfig {
  text: string
  type: string
  backgroundColor: string
  lineColor: string
  width: number
  height: number
  margin: number
  textPosition: string
  textMargin: number
  textAlign: string
  fontFamily: string
  fontSize: number
  bold: boolean
  italic: boolean
}

const BarCode: React.FC = () => {
  const [config, setConfig] = useState<BarcodeConfig>({
    text: 'Example 1234',
    type: 'code128',
    backgroundColor: '#FFFFFF',
    lineColor: '#000000',
    width: 2,
    height: 50,
    margin: 10,
    textPosition: 'below',
    textMargin: 0,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 20,
    bold: false,
    italic: false
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 条形码类型选项
  const barcodeTypes = [
    { label: 'CODE128', value: 'code128' },
    { label: 'CODE39', value: 'code39' },
    { label: 'EAN13', value: 'ean13' },
    { label: 'EAN8', value: 'ean8' },
    { label: 'UPC', value: 'upc' },
    { label: 'QR Code', value: 'qrcode' }
  ]

  // 文本位置选项
  const textPositions = [
    { label: '上方', value: 'above' },
    { label: '下方', value: 'below' },
    { label: '隐藏', value: 'none' }
  ]

  // 对齐方式选项
  const alignOptions = [
    { label: '左对齐', value: 'left' },
    { label: '居中', value: 'center' },
    { label: '右对齐', value: 'right' }
  ]

  // 字体选项
  const fontOptions = [
    { label: '等宽字体', value: 'monospace' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Helvetica', value: 'Helvetica' }
  ]

  // 生成条形码
  const generateBarcode = () => {
    const canvas = canvasRef.current
    if (!canvas || !config.text.trim()) return

    try {
      // 配置 bwip-js 选项
      const options = {
        bcid: config.type,
        text: config.text,
        scale: config.width,
        height: config.height,
        includetext: config.textPosition !== 'none',
        textxalign: config.textAlign as 'left' | 'center' | 'right',
        backgroundcolor: config.backgroundColor,
        barcolor: config.lineColor,
        padding: config.margin,
      }

      // 生成条形码
      bwipjs.toCanvas(canvas, options)
    } catch (error) {
      console.error('条形码生成失败:', error)
    }
  }

  // 下载条形码
  const downloadBarcode = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `barcode_${config.text}.png`
    link.click()
  }

  // 更新配置
  const updateConfig = (key: keyof BarcodeConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  // 自动生成条形码
  useEffect(() => {
    if (config.text.trim()) {
      generateBarcode()
    }
  }, [config])

  return (
    <div className="barcode-tool">
      {/* 条形码显示区域 */}
      <div className="barcode-tool__display">
        {config.text.trim() ? (
          <div className="barcode-tool__image-container">
            <canvas ref={canvasRef} className="barcode-tool__canvas" />
            <Button
              className="barcode-tool__download-btn"
              icon={<IconDownload />}
              onClick={downloadBarcode}
            >
              下载
            </Button>
          </div>
        ) : (
          <div className="barcode-tool__placeholder">
            请输入内容生成条形码
          </div>
        )}
      </div>

      {/* 控制面板 */}
      <div className="barcode-tool__controls">
        <div className="barcode-tool__control-group">
          <label>输入</label>
          <Input
            value={config.text}
            onChange={(value) => updateConfig('text', value)}
            placeholder="输入条形码内容"
          />
        </div>
        
        <div className="barcode-tool__control-group">
          <label>类型</label>
          <Select
            value={config.type}
            onChange={(value) => updateConfig('type', value)}
          >
            {barcodeTypes.map(type => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="barcode-tool__control-group">
          <label>背景</label>
          <Input
            type="color"
            value={config.backgroundColor}
            onChange={(value) => updateConfig('backgroundColor', value)}
          />
        </div>

        <div className="barcode-tool__control-group">
          <label>线条颜色</label>
          <Input
            type="color"
            value={config.lineColor}
            onChange={(value) => updateConfig('lineColor', value)}
          />
        </div>

        <div className="barcode-tool__control-group">
          <label>宽</label>
          <Input
            type="number"
            value={config.width.toString()}
            onChange={(value) => updateConfig('width', parseInt(value) || 2)}
            min={1}
            max={10}
          />
        </div>

        <div className="barcode-tool__control-group">
          <label>高</label>
          <Input
            type="number"
            value={config.height.toString()}
            onChange={(value) => updateConfig('height', parseInt(value) || 50)}
            min={20}
            max={200}
          />
        </div>

        <div className="barcode-tool__control-group">
          <label>边距</label>
          <Input
            type="number"
            value={config.margin.toString()}
            onChange={(value) => updateConfig('margin', parseInt(value) || 10)}
            min={0}
            max={50}
          />
        </div>

        <div className="barcode-tool__control-group">
          <label>文本</label>
          <Select
            value={config.textPosition}
            onChange={(value) => updateConfig('textPosition', value)}
          >
            {textPositions.map(pos => (
              <Option key={pos.value} value={pos.value}>
                {pos.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="barcode-tool__control-group">
          <label>边距</label>
          <Input
            type="number"
            value={config.textMargin.toString()}
            onChange={(value) => updateConfig('textMargin', parseInt(value) || 0)}
            min={0}
            max={50}
          />
        </div>

        <div className="barcode-tool__control-group">
          <label>对齐</label>
          <Select
            value={config.textAlign}
            onChange={(value) => updateConfig('textAlign', value)}
          >
            {alignOptions.map(align => (
              <Option key={align.value} value={align.value}>
                {align.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="barcode-tool__control-group">
          <label>字体</label>
          <Select
            value={config.fontFamily}
            onChange={(value) => updateConfig('fontFamily', value)}
          >
            {fontOptions.map(font => (
              <Option key={font.value} value={font.value}>
                {font.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="barcode-tool__control-group">
          <label>大小</label>
          <Input
            type="number"
            value={config.fontSize.toString()}
            onChange={(value) => updateConfig('fontSize', parseInt(value) || 20)}
            min={8}
            max={72}
          />
        </div>

        <div className="barcode-tool__control-group">
          <label>样式</label>
          <div className="barcode-tool__style-controls">
            <Checkbox
              checked={config.bold}
              onChange={(checked) => updateConfig('bold', checked)}
            >
              粗体
            </Checkbox>
            <Checkbox
              checked={config.italic}
              onChange={(checked) => updateConfig('italic', checked)}
            >
              斜体
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarCode