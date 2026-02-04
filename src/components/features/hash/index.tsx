import React, { useState, useEffect, useCallback } from "react"
import { Input, Button, Checkbox, Select } from "@arco-design/web-react"
import { IconCopy } from "@arco-design/web-react/icon"
import { copyText } from "~/src/components/utils/copy"
import CryptoJS from "crypto-js"
import { sm3 } from "sm-crypto"
import './index.scss'

const { TextArea } = Input

interface HashResult {
  name: string
  value: string
}

const ENCODING_OPTIONS = [
  { label: 'utf-8', value: 'utf-8' },
  { label: 'gbk', value: 'gbk' },
  { label: 'gb2312', value: 'gb2312' },
]

const INPUT_TYPE_OPTIONS = [
  { label: '文本', value: 'text' },
  { label: '十六进制', value: 'hex' },
]

export default function Hash() {
  const [input, setInput] = useState("")
  const [encoding, setEncoding] = useState("utf-8")
  const [inputType, setInputType] = useState("text")
  const [salt, setSalt] = useState("")
  const [useSalt, setUseSalt] = useState(false)
  const [uppercase, setUppercase] = useState(false)
  const [hashResults, setHashResults] = useState<HashResult[]>([
    { name: 'md5', value: '' },
    { name: 'sha1', value: '' },
    { name: 'sha256', value: '' },
    { name: 'sha512', value: '' },
    { name: 'sm3', value: '' },
  ])

  const calculateHash = useCallback(() => {
    if (!input) {
      setHashResults([
        { name: 'md5', value: '' },
        { name: 'sha1', value: '' },
        { name: 'sha256', value: '' },
        { name: 'sha512', value: '' },
        { name: 'sm3', value: '' },
      ])
      return
    }

    let data = input
    if (useSalt && salt) {
      data = input + salt
    }

    let wordArray: CryptoJS.lib.WordArray
    if (inputType === 'hex') {
      wordArray = CryptoJS.enc.Hex.parse(data)
    } else {
      wordArray = CryptoJS.enc.Utf8.parse(data)
    }

    const results: HashResult[] = [
      { name: 'md5', value: CryptoJS.MD5(wordArray).toString() },
      { name: 'sha1', value: CryptoJS.SHA1(wordArray).toString() },
      { name: 'sha256', value: CryptoJS.SHA256(wordArray).toString() },
      { name: 'sha512', value: CryptoJS.SHA512(wordArray).toString() },
      { name: 'sm3', value: sm3(inputType === 'hex' ? data : data) },
    ]

    if (uppercase) {
      results.forEach(r => r.value = r.value.toUpperCase())
    }

    setHashResults(results)
  }, [input, useSalt, salt, uppercase, inputType])

  useEffect(() => {
    calculateHash()
  }, [calculateHash])

  const handleCopy = (value: string) => {
    if (!value) return
    copyText(value)
  }

  return (
    <div className="HashContainer">
      <div className="HashContent">
        <div className="HashLeft">
          <div className="HashInputHeader">
            <span className="HashInputTitle">输入</span>
            <Button
              type="text"
              size="mini"
              onClick={calculateHash}
              className="HashCalcBtn"
            >
              ▶
            </Button>
            <Select
              size="mini"
              value={encoding}
              onChange={setEncoding}
              options={ENCODING_OPTIONS}
              className="HashSelect"
            />
            <Select
              size="mini"
              value={inputType}
              onChange={setInputType}
              options={INPUT_TYPE_OPTIONS}
              className="HashSelect"
            />
          </div>
          <TextArea
            className="HashInputArea"
            value={input}
            onChange={setInput}
            placeholder="请输入要计算哈希的内容"
          />
          <div className="HashOptions">
            <Checkbox checked={useSalt} onChange={setUseSalt}>
              加盐
            </Checkbox>
            <Checkbox checked={uppercase} onChange={setUppercase}>
              大写
            </Checkbox>
          </div>
          {useSalt && (
            <Input
              className="HashSaltInput"
              value={salt}
              onChange={setSalt}
              placeholder="请输入盐值"
              size="small"
            />
          )}
        </div>
        <div className="HashRight">
          {hashResults.map((result) => (
            <div key={result.name} className="HashResultItem">
              <TextArea
                className="HashResultArea"
                value={result.value}
                readOnly
                placeholder={result.name}
              />
              <Button
                onClick={() => handleCopy(result.value)}
                type="primary"
                className="HashCopyBtn"
                size="mini"
              >
                {result.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
