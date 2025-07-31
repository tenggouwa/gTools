import React, { useState } from 'react'
import { Button, Input, Message } from '@arco-design/web-react'
import { IconSearch, IconCopy } from '@arco-design/web-react/icon'
import './index.scss'
import { copyText } from '~src/components/utils/copy'

interface IPInfo {
  ip: string
  country: string
  country_code: string
  country_code3: string
  continent_code: string
  region: string
  city?: string
  latitude: string
  longitude: string
  timezone: string
  organization: string
  organization_name: string
  asn: number
  accuracy: number
  area_code: string
}

const IPSearch: React.FC = () => {
  const [ip, setIp] = useState('')
  const [loading, setLoading] = useState(false)
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null)
  const [error, setError] = useState('')

  // 获取本地IP
  const getLocalIP = async () => {
    try {
      setLoading(true)
      setError('')
      
      // 使用 ipify API 获取本地IP
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      setIp(data.ip)
    } catch (err) {
      setError('获取本地IP失败')
      Message.error('获取本地IP失败')
    } finally {
      setLoading(false)
    }
  }

  // 查询IP信息
  const searchIP = async () => {
    if (!ip.trim()) {
      Message.warning('请输入IP地址')
      return
    }

    try {
      setLoading(true)
      setError('')
      setIpInfo(null)

      // 使用 geojs.io API 查询IP信息
      const response = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`)
      
      if (!response.ok) {
        throw new Error('查询失败')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setIpInfo(data)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '查询失败'
      setError(errorMsg)
      Message.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  // 复制JSON数据
  const copyJSON = () => {
    if (ipInfo) {
      copyText(JSON.stringify(ipInfo, null, 2))
    }
  }

  // 处理回车键
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchIP()
    }
  }

  return (
    <div className="ip-search">
      <div className="ip-search__header">
        <div className="ip-search__input-group">
          <Input
            className="ip-search__input"
            placeholder="请输入IP地址 (IPv4/IPv6)"
            value={ip}
            onChange={setIp}
            onKeyPress={handleKeyPress}
            allowClear
          />
          <div className="ip-search__buttons">
            <Button
              className="ip-search__local-btn"
              onClick={getLocalIP}
              loading={loading}
              disabled={loading}
            >
              本地IP
            </Button>
            <Button
              type="primary"
              className="ip-search__query-btn"
              onClick={searchIP}
              loading={loading}
              disabled={loading}
              icon={<IconSearch />}
            >
              查询
            </Button>
          </div>
        </div>
        <div className="ip-search__source">
          IP 信息来源: <a href="https://geojs.io/" target="_blank" rel="noopener noreferrer">https://geojs.io/</a>
        </div>
      </div>

      {error && (
        <div className="ip-search__error">
          {error}
        </div>
      )}

      {ipInfo && (
        <div className="ip-search__result">
          <div className="ip-search__result-header">
            <span className="ip-search__result-title">查询结果</span>
            <Button
              size="small"
              icon={<IconCopy />}
              onClick={copyJSON}
            >
              JSON
            </Button>
          </div>
          <div className="ip-search__result-content">
            <pre className="ip-search__json">
              {JSON.stringify(ipInfo, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default IPSearch