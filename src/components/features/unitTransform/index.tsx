import React, { useState, useEffect } from "react"
import { Input, Select, Button, Table } from "@arco-design/web-react"
import { IconSwap } from "@arco-design/web-react/icon"
import { unitData } from "./unitData"
import "./index.scss"

const { Option } = Select

interface Unit {
  id: string
  name: string
  symbol: string
  category: string
  system: string
  conversionToBase: number
}

interface ConversionResult {
  value: number
  unit: Unit
}

export default function UnitTransform() {
  const [selectedCategory, setSelectedCategory] = useState("length")
  const [inputValue, setInputValue] = useState("1")
  const [sourceUnit, setSourceUnit] = useState<Unit | null>(null)
  const [targetUnit, setTargetUnit] = useState<Unit | null>(null)
  const [filter, setFilter] = useState("all")
  const [conversionResults, setConversionResults] = useState<ConversionResult[]>([])

  // 单位类别
  const categories = [
    { key: "length", label: "长度" },
    { key: "area", label: "面积" },
    { key: "volume", label: "体积" },
    { key: "mass", label: "质量" },
    { key: "temperature", label: "温度" },
    { key: "pressure", label: "压力" },
    { key: "power", label: "功率" },
    { key: "energy", label: "功/能/热" },
    { key: "density", label: "密度" },
    { key: "force", label: "力" },
    { key: "time", label: "时间" },
    { key: "speed", label: "速度" },
    { key: "data", label: "数据存储" },
    { key: "angle", label: "角度" }
  ]

  // 获取当前类别的单位
  const getCurrentUnits = () => {
    return unitData.filter(unit => unit.category === selectedCategory)
  }

  // 获取过滤后的单位
  const getFilteredUnits = () => {
    const units = getCurrentUnits()
    if (filter === "all") return units
    return units.filter(unit => unit.system === filter)
  }

  // 单位转换计算
  const convertUnit = (value: number, fromUnit: Unit, toUnit: Unit): number => {
    if (fromUnit.id === toUnit.id) return value

    // 特殊处理温度转换
    if (selectedCategory === "temperature") {
      return convertTemperature(value, fromUnit, toUnit)
    }

    // 其他单位转换
    const baseValue = value * fromUnit.conversionToBase
    return baseValue / toUnit.conversionToBase
  }

  // 温度转换（特殊处理）
  const convertTemperature = (value: number, fromUnit: Unit, toUnit: Unit): number => {
    // 先转换为摄氏度
    let celsius = 0
    switch (fromUnit.id) {
      case "celsius":
        celsius = value
        break
      case "fahrenheit":
        celsius = (value - 32) * 5 / 9
        break
      case "kelvin":
        celsius = value - 273.15
        break
      case "rankine":
        celsius = (value - 491.67) * 5 / 9
        break
      default:
        celsius = value
    }

    // 从摄氏度转换为目标单位
    switch (toUnit.id) {
      case "celsius":
        return celsius
      case "fahrenheit":
        return celsius * 9 / 5 + 32
      case "kelvin":
        return celsius + 273.15
      case "rankine":
        return (celsius + 273.15) * 9 / 5
      default:
        return celsius
    }
  }

  // 计算所有转换结果
  const calculateConversions = () => {
    if (!sourceUnit || !inputValue) {
      setConversionResults([])
      return
    }

    const value = parseFloat(inputValue)
    if (isNaN(value)) {
      setConversionResults([])
      return
    }

    const units = getFilteredUnits()
    const results: ConversionResult[] = units.map(unit => ({
      value: convertUnit(value, sourceUnit, unit),
      unit
    }))

    setConversionResults(results)
  }

  // 交换源单位和目标单位
  const swapUnits = () => {
    if (sourceUnit && targetUnit) {
      setSourceUnit(targetUnit)
      setTargetUnit(sourceUnit)
    }
  }

  // 格式化显示数值
  const formatValue = (value: number): string => {
    if (Math.abs(value) < 0.000001 || Math.abs(value) > 999999) {
      return value.toExponential(4)
    }
    return value.toFixed(6).replace(/\.?0+$/, '')
  }

  // 当类别改变时，设置默认源单位
  useEffect(() => {
    const units = getCurrentUnits()
    if (units.length > 0) {
      setSourceUnit(units[0])
      setTargetUnit(units[0])
    }
  }, [selectedCategory])

  // 当输入值或源单位改变时，重新计算
  useEffect(() => {
    calculateConversions()
  }, [inputValue, sourceUnit, filter])

  // 表格列定义
  const columns = [
    {
      title: "数值",
      dataIndex: "value",
      key: "value",
      width: 120,
      render: (value: number) => (
        <span className="conversion-value">{formatValue(value)}</span>
      )
    },
    {
      title: "单位",
      dataIndex: "unit",
      key: "unit",
      render: (unit: Unit) => (
        <span className="unit-name">
          {unit.system === "metric" ? "公制" : unit.system === "imperial" ? "英制" : "市制"} - {unit.name} ({unit.symbol})
        </span>
      )
    }
  ]

  return (
    <div className="unit-transform">
      {/* 单位类别导航 */}
      <div className="unit-categories">
        {categories.map(category => (
          <button
            key={category.key}
            className={`category-tab ${selectedCategory === category.key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* 输入控制区域 */}
      <div className="input-controls">
        <div className="input-group">
          <label>输入</label>
          <Input
            value={inputValue}
            onChange={setInputValue}
            placeholder="输入数值"
            style={{ width: 120 }}
          />
        </div>

        <div className="input-group">
          <Select
            value={sourceUnit?.id}
            onChange={(value) => {
              const unit = getCurrentUnits().find(u => u.id === value)
              setSourceUnit(unit || null)
            }}
            style={{ width: 200 }}
          >
            {getCurrentUnits().map(unit => (
              <Option key={unit.id} value={unit.id}>
                {unit.system === "metric" ? "公制" : unit.system === "imperial" ? "英制" : "市制"} - {unit.name} ({unit.symbol})
              </Option>
            ))}
          </Select>
        </div>

        <Button
          icon={<IconSwap />}
          onClick={swapUnits}
          className="swap-btn"
        />

        <div className="input-group">
          <Select
            value={filter}
            onChange={setFilter}
            style={{ width: 100 }}
          >
            <Option value="all">全部</Option>
            <Option value="metric">公制</Option>
            <Option value="imperial">英制</Option>
            <Option value="chinese">市制</Option>
          </Select>
        </div>
      </div>

      {/* 转换结果显示 */}
      <div className="conversion-results">
        <Table
          columns={columns}
          data={conversionResults}
          pagination={false}
          size="small"
          className="conversion-table"
        />
      </div>
    </div>
  )
}
