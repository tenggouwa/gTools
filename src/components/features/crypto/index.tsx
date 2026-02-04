import React, { useState, useEffect, useCallback, useContext } from "react"
import { Input, Button, Checkbox, Select, Tabs } from "@arco-design/web-react"
import { copyText } from "~/src/components/utils/copy"
import CryptoJS from "crypto-js"
import { sm2, sm4 } from "sm-crypto"
import { TabContext } from "~/src/router"
import './index.scss'

const { TextArea } = Input

// 通用加密配置
const MODE_OPTIONS = [
  { label: 'CBC', value: 'CBC' },
  { label: 'ECB', value: 'ECB' },
  { label: 'CFB', value: 'CFB' },
  { label: 'OFB', value: 'OFB' },
  { label: 'CTR', value: 'CTR' },
]

const PADDING_OPTIONS = [
  { label: 'Pkcs7', value: 'Pkcs7' },
  { label: 'ZeroPadding', value: 'ZeroPadding' },
  { label: 'NoPadding', value: 'NoPadding' },
  { label: 'Iso10126', value: 'Iso10126' },
  { label: 'Iso97971', value: 'Iso97971' },
  { label: 'AnsiX923', value: 'AnsiX923' },
]

const OUTPUT_OPTIONS = [
  { label: 'Base64', value: 'base64' },
  { label: 'Hex', value: 'hex' },
]

// HMAC组件
function HMACPanel() {
  const [input, setInput] = useState("")
  const [key, setKey] = useState("")
  const [uppercase, setUppercase] = useState(false)
  const [results, setResults] = useState([
    { name: 'HMAC-MD5', value: '' },
    { name: 'HMAC-SHA1', value: '' },
    { name: 'HMAC-SHA256', value: '' },
    { name: 'HMAC-SHA512', value: '' },
  ])

  const calculate = useCallback(() => {
    if (!input || !key) {
      setResults([
        { name: 'HMAC-MD5', value: '' },
        { name: 'HMAC-SHA1', value: '' },
        { name: 'HMAC-SHA256', value: '' },
        { name: 'HMAC-SHA512', value: '' },
      ])
      return
    }

    const newResults = [
      { name: 'HMAC-MD5', value: CryptoJS.HmacMD5(input, key).toString() },
      { name: 'HMAC-SHA1', value: CryptoJS.HmacSHA1(input, key).toString() },
      { name: 'HMAC-SHA256', value: CryptoJS.HmacSHA256(input, key).toString() },
      { name: 'HMAC-SHA512', value: CryptoJS.HmacSHA512(input, key).toString() },
    ]

    if (uppercase) {
      newResults.forEach(r => r.value = r.value.toUpperCase())
    }

    setResults(newResults)
  }, [input, key, uppercase])

  useEffect(() => { calculate() }, [calculate])

  return (
    <div className="CryptoPanel">
      <div className="CryptoLeft">
        <div className="CryptoInputHeader"><span>输入</span></div>
        <TextArea className="CryptoInputArea" value={input} onChange={setInput} placeholder="请输入内容" />
        <Input className="CryptoKeyInput" value={key} onChange={setKey} placeholder="密钥 (Key)" />
        <div className="CryptoOptions">
          <Checkbox checked={uppercase} onChange={setUppercase}>大写</Checkbox>
        </div>
      </div>
      <div className="CryptoRight">
        {results.map((result) => (
          <div key={result.name} className="CryptoResultItem">
            <TextArea className="CryptoResultArea" value={result.value} readOnly placeholder={result.name} />
            <Button onClick={() => copyText(result.value)} type="primary" className="CryptoCopyBtn" size="mini">{result.name}</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

// 对称加密组件 (AES/DES/TripleDES/RC4/Rabbit)
function SymmetricCryptoPanel({ algorithm }: { algorithm: string }) {
  const [tab, setTab] = useState("encrypt")
  const [input, setInput] = useState("")
  const [key, setKey] = useState("")
  const [iv, setIv] = useState("")
  const [mode, setMode] = useState("CBC")
  const [padding, setPadding] = useState("Pkcs7")
  const [outputFormat, setOutputFormat] = useState("base64")
  const [output, setOutput] = useState("")

  const getCryptoModule = () => {
    switch (algorithm) {
      case 'AES': return CryptoJS.AES
      case 'DES': return CryptoJS.DES
      case 'Triple DES': return CryptoJS.TripleDES
      case 'RC4': return CryptoJS.RC4
      case 'Rabbit': return CryptoJS.Rabbit
      default: return CryptoJS.AES
    }
  }

  const needsIV = ['AES', 'DES', 'Triple DES'].includes(algorithm) && mode !== 'ECB'
  const needsMode = ['AES', 'DES', 'Triple DES'].includes(algorithm)

  const execute = useCallback(() => {
    if (!input || !key) {
      setOutput("")
      return
    }

    try {
      const cryptoModule = getCryptoModule()
      const keyParsed = CryptoJS.enc.Utf8.parse(key)
      const ivParsed = iv ? CryptoJS.enc.Utf8.parse(iv) : undefined

      const options: any = {}
      if (needsMode) {
        options.mode = CryptoJS.mode[mode]
        options.padding = CryptoJS.pad[padding]
      }
      if (needsIV && ivParsed) {
        options.iv = ivParsed
      }

      if (tab === 'encrypt') {
        const encrypted = cryptoModule.encrypt(input, keyParsed, options)
        setOutput(outputFormat === 'base64' ? encrypted.toString() : encrypted.ciphertext.toString())
      } else {
        let decrypted
        if (outputFormat === 'hex') {
          const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Hex.parse(input)
          })
          decrypted = cryptoModule.decrypt(cipherParams, keyParsed, options)
        } else {
          decrypted = cryptoModule.decrypt(input, keyParsed, options)
        }
        setOutput(decrypted.toString(CryptoJS.enc.Utf8))
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }, [input, key, iv, mode, padding, outputFormat, tab, algorithm])

  useEffect(() => { execute() }, [execute])

  return (
    <div className="CryptoPanelVertical">
      <Tabs activeTab={tab} onChange={setTab} type="line" size="small">
        <Tabs.TabPane key="encrypt" title="加密" />
        <Tabs.TabPane key="decrypt" title="解密" />
      </Tabs>
      <div className="CryptoConfigRow">
        <Input value={key} onChange={setKey} placeholder="密钥 (Key)" className="CryptoConfigInput" />
        {needsIV && <Input value={iv} onChange={setIv} placeholder="IV向量" className="CryptoConfigInput" />}
        {needsMode && (
          <>
            <Select size="small" value={mode} onChange={setMode} options={MODE_OPTIONS} className="CryptoConfigSelect" />
            <Select size="small" value={padding} onChange={setPadding} options={PADDING_OPTIONS} className="CryptoConfigSelect" />
          </>
        )}
        <Select size="small" value={outputFormat} onChange={setOutputFormat} options={OUTPUT_OPTIONS} className="CryptoConfigSelect" />
      </div>
      <div className="CryptoIORow">
        <div className="CryptoIOItem">
          <TextArea value={input} onChange={setInput} placeholder={tab === 'encrypt' ? '请输入明文' : '请输入密文'} className="CryptoIOArea" />
        </div>
        <div className="CryptoIOItem">
          <TextArea value={output} readOnly placeholder="输出结果" className="CryptoIOArea" />
          <Button onClick={() => copyText(output)} type="primary" className="CryptoCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// SM4组件
function SM4Panel() {
  const [tab, setTab] = useState("encrypt")
  const [input, setInput] = useState("")
  const [key, setKey] = useState("")
  const [output, setOutput] = useState("")

  const execute = useCallback(() => {
    if (!input || !key || key.length !== 32) {
      if (key && key.length !== 32) {
        setOutput("SM4密钥必须是32位十六进制字符")
      } else {
        setOutput("")
      }
      return
    }

    try {
      if (tab === 'encrypt') {
        const encrypted = sm4.encrypt(input, key)
        setOutput(encrypted)
      } else {
        const decrypted = sm4.decrypt(input, key)
        setOutput(decrypted)
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }, [input, key, tab])

  useEffect(() => { execute() }, [execute])

  return (
    <div className="CryptoPanelVertical">
      <Tabs activeTab={tab} onChange={setTab} type="line" size="small">
        <Tabs.TabPane key="encrypt" title="加密" />
        <Tabs.TabPane key="decrypt" title="解密" />
      </Tabs>
      <div className="CryptoConfigRow">
        <Input value={key} onChange={setKey} placeholder="密钥 (32位十六进制)" className="CryptoConfigInputFull" />
      </div>
      <div className="CryptoIORow">
        <div className="CryptoIOItem">
          <TextArea value={input} onChange={setInput} placeholder={tab === 'encrypt' ? '请输入明文' : '请输入密文(十六进制)'} className="CryptoIOArea" />
        </div>
        <div className="CryptoIOItem">
          <TextArea value={output} readOnly placeholder="输出结果" className="CryptoIOArea" />
          <Button onClick={() => copyText(output)} type="primary" className="CryptoCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// SM2组件
function SM2Panel() {
  const [tab, setTab] = useState("encrypt")
  const [input, setInput] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [output, setOutput] = useState("")

  const generateKeyPair = () => {
    const keypair = sm2.generateKeyPairHex()
    setPublicKey(keypair.publicKey)
    setPrivateKey(keypair.privateKey)
  }

  const execute = useCallback(() => {
    if (!input) {
      setOutput("")
      return
    }

    try {
      if (tab === 'encrypt') {
        if (!publicKey) {
          setOutput("请输入公钥")
          return
        }
        const encrypted = sm2.doEncrypt(input, publicKey, 1)
        setOutput(encrypted)
      } else {
        if (!privateKey) {
          setOutput("请输入私钥")
          return
        }
        const decrypted = sm2.doDecrypt(input, privateKey, 1)
        setOutput(decrypted)
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }, [input, publicKey, privateKey, tab])

  useEffect(() => { execute() }, [execute])

  return (
    <div className="CryptoPanelVertical">
      <Tabs activeTab={tab} onChange={setTab} type="line" size="small">
        <Tabs.TabPane key="encrypt" title="加密" />
        <Tabs.TabPane key="decrypt" title="解密" />
      </Tabs>
      <div className="CryptoConfigRow">
        <Button size="small" onClick={generateKeyPair}>生成密钥对</Button>
      </div>
      <div className="CryptoConfigRow">
        <TextArea value={publicKey} onChange={setPublicKey} placeholder="公钥" className="CryptoKeyArea" />
        <TextArea value={privateKey} onChange={setPrivateKey} placeholder="私钥" className="CryptoKeyArea" />
      </div>
      <div className="CryptoIORow">
        <div className="CryptoIOItem">
          <TextArea value={input} onChange={setInput} placeholder={tab === 'encrypt' ? '请输入明文' : '请输入密文'} className="CryptoIOArea" />
        </div>
        <div className="CryptoIOItem">
          <TextArea value={output} readOnly placeholder="输出结果" className="CryptoIOArea" />
          <Button onClick={() => copyText(output)} type="primary" className="CryptoCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// RSA组件 (使用Web Crypto API)
function RSAPanel() {
  const [tab, setTab] = useState("encrypt")
  const [input, setInput] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [output, setOutput] = useState("")

  const generateKeyPair = async () => {
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true,
        ["encrypt", "decrypt"]
      )
      const pubKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey)
      const privKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey)
      setPublicKey(btoa(String.fromCharCode(...new Uint8Array(pubKey))))
      setPrivateKey(btoa(String.fromCharCode(...new Uint8Array(privKey))))
    } catch (e) {
      setOutput("生成密钥对失败: " + (e as Error).message)
    }
  }

  const execute = async () => {
    if (!input) {
      setOutput("")
      return
    }

    try {
      if (tab === 'encrypt') {
        if (!publicKey) {
          setOutput("请输入公钥")
          return
        }
        const keyData = Uint8Array.from(atob(publicKey), c => c.charCodeAt(0))
        const key = await window.crypto.subtle.importKey("spki", keyData, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"])
        const encrypted = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, new TextEncoder().encode(input))
        setOutput(btoa(String.fromCharCode(...new Uint8Array(encrypted))))
      } else {
        if (!privateKey) {
          setOutput("请输入私钥")
          return
        }
        const keyData = Uint8Array.from(atob(privateKey), c => c.charCodeAt(0))
        const key = await window.crypto.subtle.importKey("pkcs8", keyData, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"])
        const decrypted = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, Uint8Array.from(atob(input), c => c.charCodeAt(0)))
        setOutput(new TextDecoder().decode(decrypted))
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }

  useEffect(() => { execute() }, [input, publicKey, privateKey, tab])

  return (
    <div className="CryptoPanelVertical">
      <Tabs activeTab={tab} onChange={setTab} type="line" size="small">
        <Tabs.TabPane key="encrypt" title="加密" />
        <Tabs.TabPane key="decrypt" title="解密" />
      </Tabs>
      <div className="CryptoConfigRow">
        <Button size="small" onClick={generateKeyPair}>生成密钥对</Button>
      </div>
      <div className="CryptoConfigRow">
        <TextArea value={publicKey} onChange={setPublicKey} placeholder="公钥 (Base64)" className="CryptoKeyArea" />
        <TextArea value={privateKey} onChange={setPrivateKey} placeholder="私钥 (Base64)" className="CryptoKeyArea" />
      </div>
      <div className="CryptoIORow">
        <div className="CryptoIOItem">
          <TextArea value={input} onChange={setInput} placeholder={tab === 'encrypt' ? '请输入明文' : '请输入密文(Base64)'} className="CryptoIOArea" />
        </div>
        <div className="CryptoIOItem">
          <TextArea value={output} readOnly placeholder="输出结果" className="CryptoIOArea" />
          <Button onClick={() => copyText(output)} type="primary" className="CryptoCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// 签名/验签组件
function SignPanel() {
  const [tab, setTab] = useState("sign")
  const [input, setInput] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [signature, setSignature] = useState("")
  const [output, setOutput] = useState("")

  const generateKeyPair = () => {
    const keypair = sm2.generateKeyPairHex()
    setPublicKey(keypair.publicKey)
    setPrivateKey(keypair.privateKey)
  }

  const execute = useCallback(() => {
    if (!input) {
      setOutput("")
      return
    }

    try {
      if (tab === 'sign') {
        if (!privateKey) {
          setOutput("请输入私钥")
          return
        }
        const sig = sm2.doSignature(input, privateKey)
        setOutput(sig)
      } else {
        if (!publicKey || !signature) {
          setOutput("请输入公钥和签名")
          return
        }
        const verified = sm2.doVerifySignature(input, signature, publicKey)
        setOutput(verified ? "验签成功 ✓" : "验签失败 ✗")
      }
    } catch (e) {
      setOutput("错误: " + (e as Error).message)
    }
  }, [input, privateKey, publicKey, signature, tab])

  useEffect(() => { execute() }, [execute])

  return (
    <div className="CryptoPanelVertical">
      <Tabs activeTab={tab} onChange={setTab} type="line" size="small">
        <Tabs.TabPane key="sign" title="签名" />
        <Tabs.TabPane key="verify" title="验签" />
      </Tabs>
      <div className="CryptoConfigRow">
        <Button size="small" onClick={generateKeyPair}>生成SM2密钥对</Button>
      </div>
      <div className="CryptoConfigRow">
        {tab === 'sign' ? (
          <TextArea value={privateKey} onChange={setPrivateKey} placeholder="私钥" className="CryptoKeyAreaFull" />
        ) : (
          <>
            <TextArea value={publicKey} onChange={setPublicKey} placeholder="公钥" className="CryptoKeyArea" />
            <TextArea value={signature} onChange={setSignature} placeholder="签名" className="CryptoKeyArea" />
          </>
        )}
      </div>
      <div className="CryptoIORow">
        <div className="CryptoIOItem">
          <TextArea value={input} onChange={setInput} placeholder="请输入原文" className="CryptoIOArea" />
        </div>
        <div className="CryptoIOItem">
          <TextArea value={output} readOnly placeholder="输出结果" className="CryptoIOArea" />
          <Button onClick={() => copyText(output)} type="primary" className="CryptoCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// Base64组件
function Base64Panel() {
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

  return (
    <div className="CryptoPanelVertical">
      <Tabs activeTab={tab} onChange={(t) => { setTab(t); setInput(""); setOutput("") }} type="line" size="small">
        <Tabs.TabPane key="encode" title="编码" />
        <Tabs.TabPane key="decode" title="解码" />
      </Tabs>
      <div className="CryptoIORow">
        <div className="CryptoIOItem">
          <TextArea value={input} onChange={setInput} placeholder={tab === 'encode' ? '请输入明文' : '请输入Base64'} className="CryptoIOArea" />
        </div>
        <div className="CryptoIOItem">
          <TextArea value={output} readOnly placeholder="输出结果" className="CryptoIOArea" />
          <Button onClick={() => copyText(output)} type="primary" className="CryptoCopyBtn" size="mini">复制</Button>
        </div>
      </div>
    </div>
  )
}

// Bcrypt组件 (简化版，浏览器端使用)
function BcryptPanel() {
  const [input, setInput] = useState("")
  const [hash, setHash] = useState("")
  const [output, setOutput] = useState("")

  // 注意：浏览器端没有原生bcrypt支持，这里使用SHA256模拟
  const generateHash = () => {
    if (!input) return
    const salt = CryptoJS.lib.WordArray.random(16).toString()
    const hashed = CryptoJS.SHA256(salt + input).toString()
    setOutput(`$sha256$${salt}$${hashed}`)
  }

  const verifyHash = () => {
    if (!input || !hash) {
      setOutput("请输入密码和哈希值")
      return
    }
    const parts = hash.split('$')
    if (parts.length !== 4) {
      setOutput("哈希格式不正确")
      return
    }
    const salt = parts[2]
    const expectedHash = parts[3]
    const computed = CryptoJS.SHA256(salt + input).toString()
    setOutput(computed === expectedHash ? "验证成功 ✓" : "验证失败 ✗")
  }

  return (
    <div className="CryptoPanelVertical">
      <div className="CryptoIORow">
        <div className="CryptoIOItem">
          <TextArea value={input} onChange={setInput} placeholder="请输入密码" className="CryptoIOArea" />
          <div className="CryptoBtnRow">
            <Button onClick={generateHash} type="primary" size="small">生成哈希</Button>
          </div>
        </div>
        <div className="CryptoIOItem">
          <TextArea value={hash} onChange={setHash} placeholder="输入哈希值(用于验证)" className="CryptoIOAreaSmall" />
          <TextArea value={output} readOnly placeholder="输出结果" className="CryptoIOAreaSmall" />
          <div className="CryptoBtnRow">
            <Button onClick={verifyHash} size="small">验证</Button>
            <Button onClick={() => copyText(output)} type="primary" size="mini">复制</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 主组件
export default function Crypto() {
  const { activeRadio } = useContext(TabContext)

  const renderPanel = () => {
    switch (activeRadio) {
      case 'HMAC':
        return <HMACPanel />
      case 'AES':
      case 'DES':
      case 'Triple DES':
      case 'RC4':
      case 'Rabbit':
        return <SymmetricCryptoPanel algorithm={activeRadio} />
      case 'SM2':
        return <SM2Panel />
      case 'SM4':
        return <SM4Panel />
      case 'RSA':
        return <RSAPanel />
      case '签名/验签':
        return <SignPanel />
      case 'Base64':
        return <Base64Panel />
      case 'Bcrypt':
        return <BcryptPanel />
      default:
        return <HMACPanel />
    }
  }

  return (
    <div className="CryptoContainer">
      {renderPanel()}
    </div>
  )
}
