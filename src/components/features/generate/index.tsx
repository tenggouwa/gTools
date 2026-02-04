import React, { useState, useEffect, useCallback, useContext } from "react"
import { Input, Button, Checkbox, Select, Tabs, InputNumber } from "@arco-design/web-react"
import { IconRefresh } from "@arco-design/web-react/icon"
import { copyText } from "~/src/components/utils/copy"
import { TabContext } from "~/src/router"
import './index.scss'

const { TextArea } = Input

// 随机字符生成
function RandomStringPanel() {
  const [output, setOutput] = useState("")
  const [charset, setCharset] = useState("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
  const [length, setLength] = useState(32)
  const [count, setCount] = useState(10)
  const [addQuotes, setAddQuotes] = useState(false)
  const [separator, setSeparator] = useState("\\n")

  const generate = useCallback(() => {
    const results: string[] = []
    for (let i = 0; i < count; i++) {
      let str = ""
      for (let j = 0; j < length; j++) {
        str += charset[Math.floor(Math.random() * charset.length)]
      }
      results.push(addQuotes ? `"${str}"` : str)
    }
    const sep = separator.replace(/\\n/g, '\n').replace(/\\t/g, '\t')
    setOutput(results.join(sep))
  }, [charset, length, count, addQuotes, separator])

  useEffect(() => { generate() }, [])

  return (
    <div className="GeneratePanel">
      <div className="GenerateOutput">
        <TextArea value={output} readOnly className="GenerateArea" />
        <div className="GenerateOutputHeader">
          <Button type="text" size="mini" onClick={generate}>▶</Button>
          <Select size="mini" defaultValue="Text" style={{ width: 80 }}>
            <Select.Option value="Text">Text</Select.Option>
          </Select>
        </div>
        <div className="GenerateOutputFooter">
          <Button type="text" size="mini" onClick={generate}>▶</Button>
          <Checkbox checked={addQuotes} onChange={setAddQuotes}>添加引号</Checkbox>
          <span>分隔符</span>
          <Input size="mini" value={separator} onChange={setSeparator} style={{ width: 60 }} />
        </div>
      </div>
      <div className="GenerateConfig">
        <Input value={charset} onChange={setCharset} placeholder="字符集" />
        <Button type="text" size="mini" className="GenerateSettingBtn">⚙</Button>
        <span>长度</span>
        <InputNumber size="small" value={length} onChange={setLength} min={1} max={1000} style={{ width: 80 }} />
        <span>数量</span>
        <InputNumber size="small" value={count} onChange={setCount} min={1} max={1000} style={{ width: 80 }} />
        <Button type="text" icon={<IconRefresh />} onClick={generate} />
      </div>
    </div>
  )
}

// UUID生成
function UUIDPanel() {
  const [output, setOutput] = useState("")
  const [count, setCount] = useState(10)
  const [useULID, setUseULID] = useState(false)
  const [uppercase, setUppercase] = useState(false)
  const [useDash, setUseDash] = useState(true)
  const [useUint8Array, setUseUint8Array] = useState(false)
  const [addQuotes, setAddQuotes] = useState(false)
  const [separator, setSeparator] = useState("\\n")

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const generateULID = () => {
    const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
    const TIME_LEN = 10
    const RANDOM_LEN = 16

    let ulid = ''
    const now = Date.now()

    for (let i = TIME_LEN - 1; i >= 0; i--) {
      ulid = ENCODING[Math.floor(now / Math.pow(32, i)) % 32] + ulid
    }

    for (let i = 0; i < RANDOM_LEN; i++) {
      ulid += ENCODING[Math.floor(Math.random() * 32)]
    }

    return ulid
  }

  const generate = useCallback(() => {
    const results: string[] = []
    for (let i = 0; i < count; i++) {
      let id = useULID ? generateULID() : generateUUID()
      if (!useDash && !useULID) {
        id = id.replace(/-/g, '')
      }
      if (uppercase) {
        id = id.toUpperCase()
      } else if (!useULID) {
        id = id.toLowerCase()
      }
      if (useUint8Array) {
        const hex = id.replace(/-/g, '')
        const bytes = hex.match(/.{2}/g)?.map(h => parseInt(h, 16)) || []
        id = `[${bytes.join(', ')}]`
      }
      results.push(addQuotes ? `"${id}"` : id)
    }
    const sep = separator.replace(/\\n/g, '\n').replace(/\\t/g, '\t')
    setOutput(results.join(sep))
  }, [count, useULID, uppercase, useDash, useUint8Array, addQuotes, separator])

  useEffect(() => { generate() }, [])

  return (
    <div className="GeneratePanel">
      <div className="GenerateOutput">
        <TextArea value={output} readOnly className="GenerateArea" />
        <div className="GenerateOutputHeader">
          <Button type="text" size="mini" onClick={generate}>▶</Button>
          <Select size="mini" defaultValue="Text" style={{ width: 80 }}>
            <Select.Option value="Text">Text</Select.Option>
          </Select>
        </div>
        <div className="GenerateOutputFooter">
          <Button type="text" size="mini" onClick={generate}>▶</Button>
          <Checkbox checked={addQuotes} onChange={setAddQuotes}>添加引号</Checkbox>
          <span>分隔符</span>
          <Input size="mini" value={separator} onChange={setSeparator} style={{ width: 60 }} />
        </div>
      </div>
      <div className="GenerateConfig">
        <span>数量</span>
        <InputNumber size="small" value={count} onChange={setCount} min={1} max={1000} style={{ width: 80 }} />
        <Checkbox checked={useULID} onChange={setUseULID}>ULID</Checkbox>
        <Checkbox checked={uppercase} onChange={setUppercase}>大写</Checkbox>
        <Checkbox checked={useDash} onChange={setUseDash}>连接符(-)</Checkbox>
        <Checkbox checked={useUint8Array} onChange={setUseUint8Array}>Uint8 Array</Checkbox>
        <Button type="text" icon={<IconRefresh />} onClick={generate} />
      </div>
    </div>
  )
}

// 原码/反码/补码
function BinaryCodePanel() {
  const [input, setInput] = useState("")
  const [bits, setBits] = useState(8)
  const [original, setOriginal] = useState("")
  const [inverse, setInverse] = useState("")
  const [complement, setComplement] = useState("")

  const calculate = useCallback(() => {
    const num = parseInt(input)
    if (isNaN(num)) {
      setOriginal("")
      setInverse("")
      setComplement("")
      return
    }

    const isNegative = num < 0
    const absNum = Math.abs(num)
    const maxVal = Math.pow(2, bits - 1) - 1

    if (absNum > maxVal + (isNegative ? 1 : 0)) {
      setOriginal("溢出")
      setInverse("溢出")
      setComplement("溢出")
      return
    }

    // 原码
    let orig = absNum.toString(2).padStart(bits - 1, '0')
    orig = (isNegative ? '1' : '0') + orig

    // 反码
    let inv = orig
    if (isNegative) {
      inv = '1' + orig.slice(1).split('').map(b => b === '0' ? '1' : '0').join('')
    }

    // 补码
    let comp = inv
    if (isNegative) {
      let carry = 1
      const invArr = inv.split('').reverse()
      const compArr = invArr.map(b => {
        const sum = parseInt(b) + carry
        carry = sum > 1 ? 1 : 0
        return (sum % 2).toString()
      })
      comp = compArr.reverse().join('')
    }

    setOriginal(orig)
    setInverse(inv)
    setComplement(comp)
  }, [input, bits])

  useEffect(() => { calculate() }, [calculate])

  const BITS_OPTIONS = [
    { label: '8位', value: 8 },
    { label: '16位', value: 16 },
    { label: '32位', value: 32 },
    { label: '64位', value: 64 },
  ]

  return (
    <div className="BinaryPanel">
      <div className="BinaryLeft">
        <div className="BinaryInputHeader">
          <span>输入</span>
          <Select size="mini" value={bits} onChange={setBits} options={BITS_OPTIONS} style={{ width: 80 }} />
        </div>
        <TextArea value={input} onChange={setInput} placeholder="请输入整数（支持负数）" className="BinaryInputArea" />
      </div>
      <div className="BinaryRight">
        <div className="BinaryResultItem">
          <TextArea value={original} readOnly placeholder="原码" className="BinaryResultArea" />
          <Button onClick={() => copyText(original)} type="primary" className="BinaryCopyBtn" size="mini">原码</Button>
        </div>
        <div className="BinaryResultItem">
          <TextArea value={inverse} readOnly placeholder="反码" className="BinaryResultArea" />
          <Button onClick={() => copyText(inverse)} type="primary" className="BinaryCopyBtn" size="mini">反码</Button>
        </div>
        <div className="BinaryResultItem">
          <TextArea value={complement} readOnly placeholder="补码" className="BinaryResultArea" />
          <Button onClick={() => copyText(complement)} type="primary" className="BinaryCopyBtn" size="mini">补码</Button>
        </div>
      </div>
    </div>
  )
}

// IP网络计算器
function IPCalculatorPanel() {
  const [tab, setTab] = useState("IPv4")
  const [ipInput, setIpInput] = useState("")
  const [prefix, setPrefix] = useState(24)
  const [prefix6, setPrefix6] = useState(64)
  const [ipInfo, setIpInfo] = useState<any>({})

  const calculateIPv4 = useCallback(() => {
    if (!ipInput) {
      setIpInfo({})
      return
    }

    const parts = ipInput.split('.')
    if (parts.length !== 4) {
      setIpInfo({ error: 'IP格式错误' })
      return
    }

    const nums = parts.map(p => parseInt(p))
    if (nums.some(n => isNaN(n) || n < 0 || n > 255)) {
      setIpInfo({ error: 'IP格式错误' })
      return
    }

    const ipNum = (nums[0] << 24) + (nums[1] << 16) + (nums[2] << 8) + nums[3]
    const mask = ~((1 << (32 - prefix)) - 1) >>> 0
    const network = (ipNum & mask) >>> 0
    const broadcast = (network | (~mask >>> 0)) >>> 0

    const numToIP = (n: number) => [
      (n >>> 24) & 255,
      (n >>> 16) & 255,
      (n >>> 8) & 255,
      n & 255
    ].join('.')

    const maskStr = numToIP(mask)
    const networkStr = numToIP(network)
    const broadcastStr = numToIP(broadcast)
    const firstHost = numToIP(network + 1)
    const lastHost = numToIP(broadcast - 1)
    const totalHosts = Math.pow(2, 32 - prefix) - 2

    setIpInfo({
      ip: ipInput,
      mask: maskStr,
      network: networkStr,
      broadcast: broadcastStr,
      firstHost,
      lastHost,
      totalHosts: totalHosts > 0 ? totalHosts : 0,
      prefix
    })
  }, [ipInput, prefix])

  const calculateIPv6 = useCallback(() => {
    if (!ipInput) {
      setIpInfo({})
      return
    }

    // 简化的IPv6处理
    let expanded = ipInput
    if (ipInput.includes('::')) {
      const parts = ipInput.split('::')
      const left = parts[0] ? parts[0].split(':') : []
      const right = parts[1] ? parts[1].split(':') : []
      const missing = 8 - left.length - right.length
      const middle = Array(missing).fill('0000')
      expanded = [...left, ...middle, ...right].map(p => p.padStart(4, '0')).join(':')
    } else {
      expanded = ipInput.split(':').map(p => p.padStart(4, '0')).join(':')
    }

    // 缩短地址
    const shortened = expanded.replace(/\b0+/g, '').replace(/:{2,}/, '::')

    setIpInfo({
      expanded,
      shortened: ipInput,
      prefix: prefix6
    })
  }, [ipInput, prefix6])

  useEffect(() => {
    if (tab === 'IPv4') {
      calculateIPv4()
    } else {
      calculateIPv6()
    }
  }, [tab, calculateIPv4, calculateIPv6])

  return (
    <div className="IPPanel">
      <Tabs activeTab={tab} onChange={setTab} type="line" size="small">
        <Tabs.TabPane key="IPv4" title="IPv4" />
        <Tabs.TabPane key="IPv6" title="IPv6" />
      </Tabs>
      <div className="IPInputRow">
        <span>IP地址</span>
        <Input value={ipInput} onChange={setIpInput} placeholder={tab === 'IPv4' ? '如: 192.168.1.1' : '如: 2404:68::'} style={{ flex: 1 }} />
        {tab === 'IPv4' ? (
          <Select size="small" value={prefix} onChange={setPrefix} style={{ width: 80 }}>
            {Array.from({ length: 33 }, (_, i) => (
              <Select.Option key={i} value={i}>/{i}</Select.Option>
            ))}
          </Select>
        ) : (
          <Select size="small" value={prefix6} onChange={setPrefix6} style={{ width: 80 }}>
            {[32, 48, 56, 64, 128].map(p => (
              <Select.Option key={p} value={p}>/{p}</Select.Option>
            ))}
          </Select>
        )}
      </div>
      {tab === 'IPv4' && ipInfo.ip && (
        <div className="IPResults">
          <div className="IPResultSection">
            <div className="IPResultTitle">IP信息</div>
            <div className="IPResultRow">
              <span>IP地址: {ipInfo.ip}/{ipInfo.prefix}</span>
            </div>
            <div className="IPResultRow">
              <span>子网掩码: {ipInfo.mask}</span>
            </div>
          </div>
          <div className="IPResultSection">
            <div className="IPResultTitle">网络信息</div>
            <div className="IPResultRow">
              <span>网络地址: {ipInfo.network}</span>
            </div>
            <div className="IPResultRow">
              <span>广播地址: {ipInfo.broadcast}</span>
            </div>
            <div className="IPResultRow">
              <span>可用主机数: {ipInfo.totalHosts}</span>
            </div>
            <div className="IPResultRow">
              <span>第一个IP: {ipInfo.firstHost}</span>
            </div>
            <div className="IPResultRow">
              <span>最后一个IP: {ipInfo.lastHost}</span>
            </div>
          </div>
        </div>
      )}
      {tab === 'IPv6' && ipInfo.expanded && (
        <div className="IPResults">
          <div className="IPResultSection">
            <div className="IPResultTitle">IP信息</div>
            <div className="IPResultRow">
              <span>扩展地址: {ipInfo.expanded}</span>
            </div>
            <div className="IPResultRow">
              <span>缩短地址: {ipInfo.shortened}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// SQL参数填充
function SQLFillPanel() {
  const [sql, setSql] = useState("")
  const [params, setParams] = useState("")
  const [output, setOutput] = useState("")

  const fill = useCallback(() => {
    if (!sql || !params) {
      setOutput("")
      return
    }

    try {
      // 解析参数: 1(Integer),zhangshan(String)
      const paramList = params.split(',').map(p => {
        const match = p.trim().match(/^(.+?)\((\w+)\)$/)
        if (match) {
          const [, value, type] = match
          if (type.toLowerCase() === 'string') {
            return `'${value}'`
          }
          return value
        }
        return p.trim()
      })

      let result = sql
      let idx = 0
      result = result.replace(/\?/g, () => {
        return paramList[idx++] || '?'
      })

      setOutput(`输出:${result}`)
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }, [sql, params])

  useEffect(() => { fill() }, [fill])

  return (
    <div className="SQLPanel">
      <div className="SQLInputRow">
        <div className="SQLInputItem">
          <TextArea value={sql} onChange={setSql} placeholder="Sql:SELECT * FROM T WHERE id=? AND name = ?" className="SQLArea" />
          <Button type="primary" className="SQLCopyBtn" size="mini">Sql</Button>
        </div>
        <div className="SQLInputItem">
          <TextArea value={params} onChange={setParams} placeholder="参数:1(Integer),zhangshan(String)" className="SQLArea" />
          <Button type="primary" className="SQLCopyBtn" size="mini">参数</Button>
        </div>
      </div>
      <div className="SQLOutputRow">
        <TextArea value={output} readOnly placeholder="输出结果" className="SQLOutputArea" />
        <Button onClick={() => copyText(output)} type="primary" className="SQLCopyBtn" size="mini">复制</Button>
      </div>
    </div>
  )
}

// Http请求代码生成
function HttpCodePanel() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [inputFormat, setInputFormat] = useState("cURL")
  const [outputFormat, setOutputFormat] = useState("JavaScript - Axios")

  const INPUT_FORMATS = [
    { label: 'cURL', value: 'cURL' },
    { label: 'HTTP', value: 'HTTP' },
  ]

  const OUTPUT_FORMATS = [
    { label: 'JavaScript - Axios', value: 'JavaScript - Axios' },
    { label: 'JavaScript - Fetch', value: 'JavaScript - Fetch' },
    { label: 'Python - Requests', value: 'Python - Requests' },
    { label: 'Go - http', value: 'Go - http' },
    { label: 'Java - OkHttp', value: 'Java - OkHttp' },
  ]

  const convert = useCallback(() => {
    if (!input) {
      setOutput("")
      return
    }

    try {
      // 简单解析cURL
      let method = 'GET'
      let url = ''
      let headers: Record<string, string> = {}
      let body = ''

      if (inputFormat === 'cURL') {
        const urlMatch = input.match(/curl\s+['"]?([^'">\s]+)['"]?/)
        url = urlMatch ? urlMatch[1] : ''

        const methodMatch = input.match(/-X\s+(\w+)/)
        if (methodMatch) method = methodMatch[1]

        const headerMatches = input.matchAll(/-H\s+['"]([^:]+):\s*([^'"]+)['"]/g)
        for (const match of headerMatches) {
          headers[match[1]] = match[2]
        }

        const dataMatch = input.match(/-d\s+['"](.+)['"]/s)
        if (dataMatch) {
          body = dataMatch[1]
          if (!methodMatch) method = 'POST'
        }
      }

      // 生成代码
      let code = ''
      if (outputFormat === 'JavaScript - Axios') {
        code = `axios({
  method: '${method}',
  url: '${url}',${Object.keys(headers).length ? `
  headers: ${JSON.stringify(headers, null, 2)},` : ''}${body ? `
  data: ${body},` : ''}
})`
      } else if (outputFormat === 'JavaScript - Fetch') {
        code = `fetch('${url}', {
  method: '${method}',${Object.keys(headers).length ? `
  headers: ${JSON.stringify(headers, null, 2)},` : ''}${body ? `
  body: JSON.stringify(${body}),` : ''}
})`
      } else if (outputFormat === 'Python - Requests') {
        code = `import requests

response = requests.${method.toLowerCase()}(
    '${url}',${Object.keys(headers).length ? `
    headers=${JSON.stringify(headers)},` : ''}${body ? `
    json=${body},` : ''}
)`
      } else if (outputFormat === 'Go - http') {
        code = `req, _ := http.NewRequest("${method}", "${url}", ${body ? `strings.NewReader(\`${body}\`)` : 'nil'})
${Object.entries(headers).map(([k, v]) => `req.Header.Set("${k}", "${v}")`).join('\n')}
client := &http.Client{}
resp, _ := client.Do(req)`
      } else if (outputFormat === 'Java - OkHttp') {
        code = `OkHttpClient client = new OkHttpClient();
Request request = new Request.Builder()
    .url("${url}")
    .method("${method}", ${body ? `RequestBody.create(MediaType.parse("application/json"), "${body}")` : 'null'})
${Object.entries(headers).map(([k, v]) => `    .addHeader("${k}", "${v}")`).join('\n')}
    .build();
Response response = client.newCall(request).execute();`
      }

      setOutput(code)
    } catch (e) {
      setOutput("解析错误: " + (e as Error).message)
    }
  }, [input, inputFormat, outputFormat])

  useEffect(() => { convert() }, [convert])

  return (
    <div className="HttpPanel">
      <div className="HttpContent">
        <div className="HttpInputWrap">
          <div className="HttpEditor">
            <div className="HttpLineNumbers">1</div>
            <TextArea value={input} onChange={setInput} placeholder="输出" className="HttpArea" />
          </div>
          <div className="HttpFooter">
            <Button type="text" size="mini">?</Button>
            <Select size="mini" value={inputFormat} onChange={setInputFormat} options={INPUT_FORMATS} style={{ width: 100 }} />
          </div>
        </div>
        <div className="HttpOutputWrap">
          <div className="HttpEditor">
            <div className="HttpLineNumbers">1</div>
            <TextArea value={output} readOnly placeholder="输出" className="HttpArea" />
          </div>
          <div className="HttpFooter">
            <Button type="text" size="mini">?</Button>
            <Select size="mini" value={outputFormat} onChange={setOutputFormat} options={OUTPUT_FORMATS} style={{ width: 150 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// 主组件
export default function Generate() {
  const { activeRadio } = useContext(TabContext)

  const renderPanel = () => {
    switch (activeRadio) {
      case '随机字符生成':
        return <RandomStringPanel />
      case 'UUID生成':
        return <UUIDPanel />
      case '原码/反码/补码':
        return <BinaryCodePanel />
      case 'IP网络计算器':
        return <IPCalculatorPanel />
      case 'SQL参数填充':
        return <SQLFillPanel />
      case 'Http请求代码':
        return <HttpCodePanel />
      default:
        return <RandomStringPanel />
    }
  }

  return (
    <div className="GenerateContainer">
      {renderPanel()}
    </div>
  )
}
