import React, { useState, useEffect, useContext } from "react"
import { Input, Button, Tabs } from "@arco-design/web-react"
import { copyText } from "~/src/components/utils/copy"
import { TabContext } from "~/src/router"
import pako from "pako"
import punycode from "punycode.js"
import './index.scss'

const { TextArea } = Input

// Unicode 编解码
function UnicodePanel() {
  const [tab, setTab] = useState("encode")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  useEffect(() => {
    try {
      if (tab === "encode") {
        // 转为 \uXXXX 格式
        setOutput(input.split('').map(char => {
          const code = char.charCodeAt(0)
          if (code > 127) {
            return '\\u' + code.toString(16).padStart(4, '0')
          }
          return char
        }).join(''))
      } else {
        // 解码 \uXXXX 格式
        setOutput(input.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
          String.fromCharCode(parseInt(hex, 16))
        ))
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }, [input, tab])

  return (
    <div className="EncodePanel">
      <Tabs activeTab={tab} onChange={(t) => { setTab(t); setInput(""); setOutput("") }} type="line" size="small">
        <Tabs.TabPane key="encode" title="编码" />
        <Tabs.TabPane key="decode" title="解码" />
      </Tabs>
      <div className="EncodeContent">
        <div className="EncodeInputWrap">
          <div className="EncodeLabel">输入</div>
          <TextArea value={input} onChange={setInput} placeholder={tab === 'encode' ? '请输入文本' : '请输入Unicode (如 \\u4e2d\\u6587)'} className="EncodeArea" />
        </div>
        <div className="EncodeOutputWrap">
          <TextArea value={output} readOnly placeholder="输出结果" className="EncodeArea" />
          <Button onClick={() => copyText(output)} type="primary" className="EncodeCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// JWT 解码
function JWTPanel() {
  const [input, setInput] = useState("")
  const [header, setHeader] = useState("")
  const [payload, setPayload] = useState("")
  const [signature, setSignature] = useState("")

  useEffect(() => {
    if (!input) {
      setHeader("")
      setPayload("")
      setSignature("")
      return
    }

    try {
      const parts = input.split('.')
      if (parts.length !== 3) {
        setHeader("JWT格式错误，应为三段式")
        setPayload("")
        setSignature("")
        return
      }

      const decodeBase64 = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
        return decodeURIComponent(escape(atob(base64)))
      }

      setHeader(JSON.stringify(JSON.parse(decodeBase64(parts[0])), null, 2))
      setPayload(JSON.stringify(JSON.parse(decodeBase64(parts[1])), null, 2))
      setSignature(parts[2])
    } catch (e) {
      setHeader("解码错误: " + (e as Error).message)
      setPayload("")
      setSignature("")
    }
  }, [input])

  return (
    <div className="EncodePanel">
      <div className="EncodeContent JWTContent">
        <div className="EncodeInputWrap">
          <div className="EncodeLabel">JWT Token</div>
          <TextArea value={input} onChange={setInput} placeholder="请输入JWT Token" className="EncodeArea" />
        </div>
        <div className="JWTResults">
          <div className="JWTResultItem">
            <div className="EncodeLabel">Header</div>
            <TextArea value={header} readOnly placeholder="Header" className="JWTArea" />
            <Button onClick={() => copyText(header)} type="primary" className="EncodeCopyBtn" size="mini">复制</Button>
          </div>
          <div className="JWTResultItem">
            <div className="EncodeLabel">Payload</div>
            <TextArea value={payload} readOnly placeholder="Payload" className="JWTArea" />
            <Button onClick={() => copyText(payload)} type="primary" className="EncodeCopyBtn" size="mini">复制</Button>
          </div>
          <div className="JWTResultItem">
            <div className="EncodeLabel">Signature</div>
            <TextArea value={signature} readOnly placeholder="Signature" className="JWTAreaSmall" />
            <Button onClick={() => copyText(signature)} type="primary" className="EncodeCopyBtn" size="mini">复制</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hex/String 转换
function HexStringPanel() {
  const [tab, setTab] = useState("toHex")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  useEffect(() => {
    try {
      if (tab === "toHex") {
        // String to Hex
        setOutput(input.split('').map(char =>
          char.charCodeAt(0).toString(16).padStart(2, '0')
        ).join(' '))
      } else {
        // Hex to String
        const hexStr = input.replace(/\s+/g, '')
        const bytes = hexStr.match(/.{1,2}/g) || []
        setOutput(bytes.map(byte => String.fromCharCode(parseInt(byte, 16))).join(''))
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }, [input, tab])

  return (
    <div className="EncodePanel">
      <Tabs activeTab={tab} onChange={(t) => { setTab(t); setInput(""); setOutput("") }} type="line" size="small">
        <Tabs.TabPane key="toHex" title="String → Hex" />
        <Tabs.TabPane key="toString" title="Hex → String" />
      </Tabs>
      <div className="EncodeContent">
        <div className="EncodeInputWrap">
          <div className="EncodeLabel">输入</div>
          <TextArea value={input} onChange={setInput} placeholder={tab === 'toHex' ? '请输入字符串' : '请输入十六进制 (如 48 65 6c 6c 6f)'} className="EncodeArea" />
        </div>
        <div className="EncodeOutputWrap">
          <TextArea value={output} readOnly placeholder="输出结果" className="EncodeArea" />
          <Button onClick={() => copyText(output)} type="primary" className="EncodeCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// Html 编解码
function HtmlPanel() {
  const [tab, setTab] = useState("encode")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  useEffect(() => {
    try {
      if (tab === "encode") {
        const div = document.createElement('div')
        div.innerText = input
        setOutput(div.innerHTML)
      } else {
        const div = document.createElement('div')
        div.innerHTML = input
        setOutput(div.innerText)
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }, [input, tab])

  return (
    <div className="EncodePanel">
      <Tabs activeTab={tab} onChange={(t) => { setTab(t); setInput(""); setOutput("") }} type="line" size="small">
        <Tabs.TabPane key="encode" title="编码" />
        <Tabs.TabPane key="decode" title="解码" />
      </Tabs>
      <div className="EncodeContent">
        <div className="EncodeInputWrap">
          <div className="EncodeLabel">输入</div>
          <TextArea value={input} onChange={setInput} placeholder={tab === 'encode' ? '请输入HTML文本' : '请输入HTML实体'} className="EncodeArea" />
        </div>
        <div className="EncodeOutputWrap">
          <TextArea value={output} readOnly placeholder="输出结果" className="EncodeArea" />
          <Button onClick={() => copyText(output)} type="primary" className="EncodeCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// GZIP 压缩/解压
function GZIPPanel() {
  const [tab, setTab] = useState("compress")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const execute = () => {
    if (!input) {
      setOutput("")
      return
    }

    try {
      if (tab === "compress") {
        const compressed = pako.gzip(input)
        const base64 = btoa(String.fromCharCode(...compressed))
        setOutput(base64)
      } else {
        const binaryStr = atob(input)
        const bytes = new Uint8Array(binaryStr.length)
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i)
        }
        const decompressed = pako.ungzip(bytes, { to: 'string' })
        setOutput(decompressed)
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }

  useEffect(() => { execute() }, [input, tab])

  return (
    <div className="EncodePanel">
      <Tabs activeTab={tab} onChange={(t) => { setTab(t); setInput(""); setOutput("") }} type="line" size="small">
        <Tabs.TabPane key="compress" title="压缩" />
        <Tabs.TabPane key="decompress" title="解压" />
      </Tabs>
      <div className="EncodeContent">
        <div className="EncodeInputWrap">
          <div className="EncodeLabel">输入</div>
          <TextArea value={input} onChange={setInput} placeholder={tab === 'compress' ? '请输入文本' : '请输入Base64编码的GZIP数据'} className="EncodeArea" />
        </div>
        <div className="EncodeOutputWrap">
          <TextArea value={output} readOnly placeholder="输出结果" className="EncodeArea" />
          <Button onClick={() => copyText(output)} type="primary" className="EncodeCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// ASN.1 解码 (简化版)
function ASN1Panel() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const parseASN1 = (hex: string, indent = 0): string => {
    const lines: string[] = []
    let pos = 0
    const prefix = '  '.repeat(indent)

    while (pos < hex.length) {
      if (pos + 4 > hex.length) break

      const tag = parseInt(hex.substr(pos, 2), 16)
      pos += 2

      let length = parseInt(hex.substr(pos, 2), 16)
      pos += 2

      if (length > 127) {
        const numBytes = length - 128
        length = parseInt(hex.substr(pos, numBytes * 2), 16)
        pos += numBytes * 2
      }

      const tagName = getTagName(tag)
      const value = hex.substr(pos, length * 2)

      if (tag === 0x30 || tag === 0x31) { // SEQUENCE or SET
        lines.push(`${prefix}${tagName} {`)
        lines.push(parseASN1(value, indent + 1))
        lines.push(`${prefix}}`)
      } else if (tag === 0x02) { // INTEGER
        lines.push(`${prefix}${tagName}: ${parseInt(value, 16)}`)
      } else if (tag === 0x04 || tag === 0x0C || tag === 0x13 || tag === 0x14 || tag === 0x16) { // OCTET STRING, UTF8String, PrintableString, etc.
        const str = value.match(/.{2}/g)?.map(h => String.fromCharCode(parseInt(h, 16))).join('') || value
        lines.push(`${prefix}${tagName}: "${str}"`)
      } else if (tag === 0x06) { // OID
        lines.push(`${prefix}${tagName}: ${value}`)
      } else if (tag === 0x01) { // BOOLEAN
        lines.push(`${prefix}${tagName}: ${value === '00' ? 'false' : 'true'}`)
      } else if (tag === 0x05) { // NULL
        lines.push(`${prefix}${tagName}`)
      } else {
        lines.push(`${prefix}${tagName}: ${value}`)
      }

      pos += length * 2
    }

    return lines.join('\n')
  }

  const getTagName = (tag: number): string => {
    const tags: { [key: number]: string } = {
      0x01: 'BOOLEAN',
      0x02: 'INTEGER',
      0x03: 'BIT STRING',
      0x04: 'OCTET STRING',
      0x05: 'NULL',
      0x06: 'OBJECT IDENTIFIER',
      0x0C: 'UTF8String',
      0x13: 'PrintableString',
      0x14: 'T61String',
      0x16: 'IA5String',
      0x17: 'UTCTime',
      0x18: 'GeneralizedTime',
      0x30: 'SEQUENCE',
      0x31: 'SET',
    }
    return tags[tag] || `TAG[${tag.toString(16)}]`
  }

  useEffect(() => {
    if (!input) {
      setOutput("")
      return
    }

    try {
      // 支持 Base64 或 Hex 输入
      let hex = input.replace(/\s+/g, '')
      if (/^[A-Za-z0-9+/=]+$/.test(hex) && hex.length % 4 === 0) {
        // Base64
        const binary = atob(hex)
        hex = Array.from(binary).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
      }
      setOutput(parseASN1(hex))
    } catch (e) {
      setOutput("解析错误: " + (e as Error).message)
    }
  }, [input])

  return (
    <div className="EncodePanel">
      <div className="EncodeContent">
        <div className="EncodeInputWrap">
          <div className="EncodeLabel">输入 (Base64 或 Hex)</div>
          <TextArea value={input} onChange={setInput} placeholder="请输入ASN.1数据 (Base64或十六进制)" className="EncodeArea" />
        </div>
        <div className="EncodeOutputWrap">
          <TextArea value={output} readOnly placeholder="解析结果" className="EncodeArea" />
          <Button onClick={() => copyText(output)} type="primary" className="EncodeCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// 域名编码 (Punycode)
function PunycodePanel() {
  const [tab, setTab] = useState("encode")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  useEffect(() => {
    if (!input) {
      setOutput("")
      return
    }

    try {
      if (tab === "encode") {
        setOutput(punycode.toASCII(input))
      } else {
        setOutput(punycode.toUnicode(input))
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }, [input, tab])

  return (
    <div className="EncodePanel">
      <Tabs activeTab={tab} onChange={(t) => { setTab(t); setInput(""); setOutput("") }} type="line" size="small">
        <Tabs.TabPane key="encode" title="编码 (Unicode → Punycode)" />
        <Tabs.TabPane key="decode" title="解码 (Punycode → Unicode)" />
      </Tabs>
      <div className="EncodeContent">
        <div className="EncodeInputWrap">
          <div className="EncodeLabel">输入</div>
          <TextArea value={input} onChange={setInput} placeholder={tab === 'encode' ? '请输入域名 (如 中文.com)' : '请输入Punycode (如 xn--fiq228c.com)'} className="EncodeArea" />
        </div>
        <div className="EncodeOutputWrap">
          <TextArea value={output} readOnly placeholder="输出结果" className="EncodeArea" />
          <Button onClick={() => copyText(output)} type="primary" className="EncodeCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// 主组件
export default function Encode() {
  const { activeRadio } = useContext(TabContext)

  const renderPanel = () => {
    switch (activeRadio) {
      case 'Unicode':
        return <UnicodePanel />
      case 'JWT解码':
        return <JWTPanel />
      case 'Hex/String':
        return <HexStringPanel />
      case 'Html编码':
        return <HtmlPanel />
      case 'GZIP':
        return <GZIPPanel />
      case 'ASN.1解码':
        return <ASN1Panel />
      case '域名编码':
        return <PunycodePanel />
      default:
        return <UnicodePanel />
    }
  }

  return (
    <div className="EncodeContainer">
      {renderPanel()}
    </div>
  )
}
