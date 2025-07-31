import React, { useState, useEffect } from 'react'
import { Input, Button, Checkbox, Select, Message } from '@arco-design/web-react'

const { TextArea } = Input
import { IconDelete, IconBook } from '@arco-design/web-react/icon'
import './index.scss'

const { Option } = Select

interface CommonRegex {
  label: string
  value: string
  description: string
}

const commonRegexList: CommonRegex[] = [
  { label: '空白字符', value: '\\s+', description: '匹配一个或多个空白字符' },
  { label: '数字', value: '\\d+', description: '匹配一个或多个数字' },
  { label: '字母', value: '[a-zA-Z]+', description: '匹配一个或多个字母' },
  { label: '中文', value: '[\\u4e00-\\u9fa5]+', description: '匹配中文字符' },
  { label: '邮箱', value: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', description: '匹配邮箱地址' },
  { label: '手机号', value: '1[3-9]\\d{9}', description: '匹配中国大陆手机号' },
  { label: 'URL', value: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-.,@?^=%&:/~+#]*[\\w\\-@?^=%&/~+#])?', description: '匹配URL地址' },
  { label: 'IP地址', value: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', description: '匹配IP地址' },
  { label: '日期', value: '\\d{4}-\\d{2}-\\d{2}', description: '匹配YYYY-MM-DD格式日期' },
  { label: '时间', value: '\\d{2}:\\d{2}:\\d{2}', description: '匹配HH:MM:SS格式时间' }
]

const RegexTool: React.FC = () => {
  const [regex, setRegex] = useState('\\s+')
  const [replaceText, setReplaceText] = useState('')
  const [testText, setTestText] = useState('2025 hello WORLD 你好世界')
  const [resultText, setResultText] = useState('')
  const [globalFlag, setGlobalFlag] = useState(true)
  const [ignoreCaseFlag, setIgnoreCaseFlag] = useState(true)

  // 执行正则替换
  const executeRegex = () => {
    try {
      if (!regex.trim()) {
        setResultText(testText)
        return
      }

      let flags = ''
      if (globalFlag) flags += 'g'
      if (ignoreCaseFlag) flags += 'i'

      const result = testText.replace(new RegExp(regex, flags), replaceText)
      setResultText(result)
    } catch (error) {
      Message.error('正则表达式格式错误')
      setResultText(testText)
    }
  }

  // 选择常用正则表达式
  const handleCommonRegexChange = (value: string) => {
    setRegex(value)
  }

  // 显示正则表达式参考
  const showReference = () => {
    const referenceText = `
正则表达式参考：

基础字符：
. - 匹配任意字符（除换行符）
\\w - 匹配字母、数字、下划线
\\W - 匹配非字母、数字、下划线
\\d - 匹配数字
\\D - 匹配非数字
\\s - 匹配空白字符
\\S - 匹配非空白字符

量词：
* - 匹配0次或多次
+ - 匹配1次或多次
? - 匹配0次或1次
{n} - 匹配n次
{n,} - 匹配n次或更多
{n,m} - 匹配n到m次

位置：
^ - 字符串开始
$ - 字符串结束
\\b - 单词边界
\\B - 非单词边界

分组：
() - 捕获组
(?:) - 非捕获组
(?=) - 正向预查
(?!) - 负向预查

转义：
\\ - 转义字符
    `.trim()

    setTestText(referenceText)
    setResultText('')
  }

  // 清空测试文本
  const clearTestText = () => {
    setTestText('')
    setResultText('')
  }

  // 监听输入变化，实时执行正则替换
  useEffect(() => {
    executeRegex()
  }, [regex, replaceText, testText, globalFlag, ignoreCaseFlag])

  return (
    <div className="regex-tool">
      <div className="regex-tool__header">
        <div className="regex-tool__regex-section">
          <div className="regex-tool__input-group">
            <Input
              className="regex-tool__regex-input"
              placeholder="请输入正则表达式"
              value={regex}
              onChange={setRegex}
            />
            <Select
              className="regex-tool__common-select"
              placeholder="常用正则"
              onChange={handleCommonRegexChange}
              style={{ width: 120 }}
            >
              {commonRegexList.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
            <Button
              className="regex-tool__reference-btn"
              icon={<IconBook />}
              onClick={showReference}
            >
              参考
            </Button>
          </div>
        </div>

        <div className="regex-tool__replace-section">
          <div className="regex-tool__input-group">
            <Input
              className="regex-tool__replace-input"
              placeholder="替换文本"
              value={replaceText}
              onChange={setReplaceText}
            />
            <Checkbox
              className="regex-tool__clear-checkbox"
              onChange={clearTestText}
            />
            <Button
              className="regex-tool__delete-btn"
              icon={<IconDelete />}
              onClick={clearTestText}
            >
              删除
            </Button>
          </div>
        </div>
      </div>

      <div className="regex-tool__content">
        <div className="regex-tool__text-area">
          <div className="regex-tool__label">测试文本</div>
          <TextArea
            className="regex-tool__textarea"
            placeholder="请输入要测试的文本"
            value={testText}
            onChange={setTestText}
            autoSize={{ minRows: 8, maxRows: 12 }}
          />
        </div>

        <div className="regex-tool__text-area">
          <div className="regex-tool__label">替换结果</div>
          <TextArea
            className="regex-tool__textarea"
            placeholder="替换结果将在这里显示"
            value={resultText}
            readOnly
            autoSize={{ minRows: 8, maxRows: 12 }}
          />
        </div>
      </div>

      <div className="regex-tool__footer">
        <div className="regex-tool__flags">
          <Checkbox
            checked={globalFlag}
            onChange={setGlobalFlag}
          >
            全局搜索 (g)
          </Checkbox>
          <Checkbox
            checked={ignoreCaseFlag}
            onChange={setIgnoreCaseFlag}
          >
            忽略大小写 (i)
          </Checkbox>
        </div>
      </div>
    </div>
  )
}

export default RegexTool 