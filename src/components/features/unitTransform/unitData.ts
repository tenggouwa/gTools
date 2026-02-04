export interface Unit {
  id: string
  name: string
  symbol: string
  category: string
  system: string
  conversionToBase: number
}

export const unitData: Unit[] = [
  // 长度单位
  { id: "kilometer", name: "千米", symbol: "km", category: "length", system: "metric", conversionToBase: 1000 },
  { id: "meter", name: "米", symbol: "m", category: "length", system: "metric", conversionToBase: 1 },
  { id: "decimeter", name: "分米", symbol: "dm", category: "length", system: "metric", conversionToBase: 0.1 },
  { id: "centimeter", name: "厘米", symbol: "cm", category: "length", system: "metric", conversionToBase: 0.01 },
  { id: "millimeter", name: "毫米", symbol: "mm", category: "length", system: "metric", conversionToBase: 0.001 },
  { id: "micrometer", name: "微米", symbol: "um", category: "length", system: "metric", conversionToBase: 0.000001 },
  { id: "nanometer", name: "纳米", symbol: "nm", category: "length", system: "metric", conversionToBase: 0.000000001 },
  { id: "picometer", name: "皮米", symbol: "pm", category: "length", system: "metric", conversionToBase: 0.000000000001 },
  { id: "lightyear", name: "光年", symbol: "ly", category: "length", system: "metric", conversionToBase: 9460730472580800 },
  { id: "astronomical_unit", name: "天文单位", symbol: "AU", category: "length", system: "metric", conversionToBase: 149597870700 },
  { id: "inch", name: "英寸", symbol: "in", category: "length", system: "imperial", conversionToBase: 0.0254 },
  { id: "foot", name: "英尺", symbol: "ft", category: "length", system: "imperial", conversionToBase: 0.3048 },
  { id: "yard", name: "码", symbol: "yd", category: "length", system: "imperial", conversionToBase: 0.9144 },
  { id: "mile", name: "英里", symbol: "mi", category: "length", system: "imperial", conversionToBase: 1609.344 },
  { id: "nautical_mile", name: "海里", symbol: "nmi", category: "length", system: "imperial", conversionToBase: 1852 },
  { id: "furlong", name: "弗隆", symbol: "fur", category: "length", system: "imperial", conversionToBase: 201.168 },
  { id: "fathom", name: "英寻", symbol: "fm", category: "length", system: "imperial", conversionToBase: 1.8288 },
  { id: "zhang", name: "丈", symbol: "zhang", category: "length", system: "chinese", conversionToBase: 3.333333 },
  { id: "li", name: "里", symbol: "li", category: "length", system: "chinese", conversionToBase: 500 },
  { id: "chi", name: "尺", symbol: "chi", category: "length", system: "chinese", conversionToBase: 0.333333 },

  // 面积单位
  { id: "square_kilometer", name: "平方千米", symbol: "km²", category: "area", system: "metric", conversionToBase: 1000000 },
  { id: "square_meter", name: "平方米", symbol: "m²", category: "area", system: "metric", conversionToBase: 1 },
  { id: "square_centimeter", name: "平方厘米", symbol: "cm²", category: "area", system: "metric", conversionToBase: 0.0001 },
  { id: "square_millimeter", name: "平方毫米", symbol: "mm²", category: "area", system: "metric", conversionToBase: 0.000001 },
  { id: "hectare", name: "公顷", symbol: "ha", category: "area", system: "metric", conversionToBase: 10000 },
  { id: "acre", name: "英亩", symbol: "acre", category: "area", system: "imperial", conversionToBase: 4046.8564224 },
  { id: "square_foot", name: "平方英尺", symbol: "ft²", category: "area", system: "imperial", conversionToBase: 0.09290304 },
  { id: "square_yard", name: "平方码", symbol: "yd²", category: "area", system: "imperial", conversionToBase: 0.83612736 },
  { id: "square_mile", name: "平方英里", symbol: "mi²", category: "area", system: "imperial", conversionToBase: 2589988.110336 },
  { id: "mu", name: "亩", symbol: "mu", category: "area", system: "chinese", conversionToBase: 666.666667 },

  // 体积单位
  { id: "cubic_meter", name: "立方米", symbol: "m³", category: "volume", system: "metric", conversionToBase: 1 },
  { id: "cubic_centimeter", name: "立方厘米", symbol: "cm³", category: "volume", system: "metric", conversionToBase: 0.000001 },
  { id: "cubic_millimeter", name: "立方毫米", symbol: "mm³", category: "volume", system: "metric", conversionToBase: 0.000000001 },
  { id: "liter", name: "升", symbol: "L", category: "volume", system: "metric", conversionToBase: 0.001 },
  { id: "milliliter", name: "毫升", symbol: "mL", category: "volume", system: "metric", conversionToBase: 0.000001 },
  { id: "gallon", name: "加仑", symbol: "gal", category: "volume", system: "imperial", conversionToBase: 0.003785411784 },
  { id: "quart", name: "夸脱", symbol: "qt", category: "volume", system: "imperial", conversionToBase: 0.000946352946 },
  { id: "pint", name: "品脱", symbol: "pt", category: "volume", system: "imperial", conversionToBase: 0.000473176473 },
  { id: "cubic_foot", name: "立方英尺", symbol: "ft³", category: "volume", system: "imperial", conversionToBase: 0.028316846592 },
  { id: "cubic_yard", name: "立方码", symbol: "yd³", category: "volume", system: "imperial", conversionToBase: 0.764554857984 },

  // 质量单位
  { id: "tonne", name: "吨", symbol: "t", category: "mass", system: "metric", conversionToBase: 1000 },
  { id: "kilogram", name: "千克", symbol: "kg", category: "mass", system: "metric", conversionToBase: 1 },
  { id: "gram", name: "克", symbol: "g", category: "mass", system: "metric", conversionToBase: 0.001 },
  { id: "milligram", name: "毫克", symbol: "mg", category: "mass", system: "metric", conversionToBase: 0.000001 },
  { id: "microgram", name: "微克", symbol: "µg", category: "mass", system: "metric", conversionToBase: 0.000000001 },
  { id: "quintal", name: "公担", symbol: "q", category: "mass", system: "metric", conversionToBase: 100 },
  { id: "carat", name: "克拉", symbol: "ct", category: "mass", system: "metric", conversionToBase: 0.0002 },
  { id: "pound", name: "磅", symbol: "lb", category: "mass", system: "imperial", conversionToBase: 0.45359237 },
  { id: "ounce", name: "盎司", symbol: "oz", category: "mass", system: "imperial", conversionToBase: 0.028349523125 },
  { id: "grain", name: "格令", symbol: "gr", category: "mass", system: "imperial", conversionToBase: 0.00006479891 },
  { id: "long_ton", name: "长吨", symbol: "lt", category: "mass", system: "imperial", conversionToBase: 1016.0469088 },
  { id: "short_ton", name: "短吨", symbol: "st", category: "mass", system: "imperial", conversionToBase: 907.18474 },
  { id: "uk_hundredweight", name: "英担", symbol: "uk cwt", category: "mass", system: "imperial", conversionToBase: 50.80234544 },
  { id: "us_hundredweight", name: "美担", symbol: "us cwt", category: "mass", system: "imperial", conversionToBase: 45.359237 },
  { id: "stone", name: "英石", symbol: "st", category: "mass", system: "imperial", conversionToBase: 6.35029318 },
  { id: "dram", name: "打兰", symbol: "dr", category: "mass", system: "imperial", conversionToBase: 0.0017718451953125 },
  { id: "dan", name: "担", symbol: "dan", category: "mass", system: "chinese", conversionToBase: 50 },
  { id: "jin", name: "斤", symbol: "jin", category: "mass", system: "chinese", conversionToBase: 0.5 },
  { id: "liang", name: "两", symbol: "liang", category: "mass", system: "chinese", conversionToBase: 0.05 },
  { id: "qian", name: "钱", symbol: "qian", category: "mass", system: "chinese", conversionToBase: 0.005 },

  // 温度单位（特殊处理，conversionToBase 不用于计算）
  { id: "celsius", name: "摄氏度", symbol: "°C", category: "temperature", system: "metric", conversionToBase: 1 },
  { id: "fahrenheit", name: "华氏度", symbol: "°F", category: "temperature", system: "imperial", conversionToBase: 1 },
  { id: "kelvin", name: "开尔文", symbol: "K", category: "temperature", system: "metric", conversionToBase: 1 },
  { id: "rankine", name: "兰氏度", symbol: "°R", category: "temperature", system: "imperial", conversionToBase: 1 },

  // 压力单位
  { id: "pascal", name: "帕斯卡", symbol: "Pa", category: "pressure", system: "metric", conversionToBase: 1 },
  { id: "kilopascal", name: "千帕", symbol: "kPa", category: "pressure", system: "metric", conversionToBase: 1000 },
  { id: "megapascal", name: "兆帕", symbol: "MPa", category: "pressure", system: "metric", conversionToBase: 1000000 },
  { id: "bar", name: "巴", symbol: "bar", category: "pressure", system: "metric", conversionToBase: 100000 },
  { id: "atmosphere", name: "标准大气压", symbol: "atm", category: "pressure", system: "metric", conversionToBase: 101325 },
  { id: "psi", name: "磅/平方英寸", symbol: "psi", category: "pressure", system: "imperial", conversionToBase: 6894.757293168 },
  { id: "psf", name: "磅/平方英尺", symbol: "psf", category: "pressure", system: "imperial", conversionToBase: 47.880258980336 },

  // 功率单位
  { id: "watt", name: "瓦特", symbol: "W", category: "power", system: "metric", conversionToBase: 1 },
  { id: "kilowatt", name: "千瓦", symbol: "kW", category: "power", system: "metric", conversionToBase: 1000 },
  { id: "megawatt", name: "兆瓦", symbol: "MW", category: "power", system: "metric", conversionToBase: 1000000 },
  { id: "horsepower", name: "马力", symbol: "hp", category: "power", system: "imperial", conversionToBase: 745.69987158227022 },
  { id: "btu_per_hour", name: "英热单位/小时", symbol: "BTU/h", category: "power", system: "imperial", conversionToBase: 0.29307107 },

  // 能量单位
  { id: "joule", name: "焦耳", symbol: "J", category: "energy", system: "metric", conversionToBase: 1 },
  { id: "kilojoule", name: "千焦", symbol: "kJ", category: "energy", system: "metric", conversionToBase: 1000 },
  { id: "megajoule", name: "兆焦", symbol: "MJ", category: "energy", system: "metric", conversionToBase: 1000000 },
  { id: "calorie", name: "卡路里", symbol: "cal", category: "energy", system: "metric", conversionToBase: 4.184 },
  { id: "kilocalorie", name: "千卡", symbol: "kcal", category: "energy", system: "metric", conversionToBase: 4184 },
  { id: "btu", name: "英热单位", symbol: "BTU", category: "energy", system: "imperial", conversionToBase: 1055.05585262 },
  { id: "electronvolt", name: "电子伏特", symbol: "eV", category: "energy", system: "metric", conversionToBase: 0.0000000000000000001602176634 },

  // 密度单位
  { id: "kg_per_m3", name: "千克/立方米", symbol: "kg/m³", category: "density", system: "metric", conversionToBase: 1 },
  { id: "g_per_cm3", name: "克/立方厘米", symbol: "g/cm³", category: "density", system: "metric", conversionToBase: 1000 },
  { id: "lb_per_ft3", name: "磅/立方英尺", symbol: "lb/ft³", category: "density", system: "imperial", conversionToBase: 16.01846337396 },
  { id: "lb_per_gal", name: "磅/加仑", symbol: "lb/gal", category: "density", system: "imperial", conversionToBase: 119.826427316897 },

  // 力单位
  { id: "newton", name: "牛顿", symbol: "N", category: "force", system: "metric", conversionToBase: 1 },
  { id: "kilonewton", name: "千牛", symbol: "kN", category: "force", system: "metric", conversionToBase: 1000 },
  { id: "pound_force", name: "磅力", symbol: "lbf", category: "force", system: "imperial", conversionToBase: 4.4482216152605 },
  { id: "dyne", name: "达因", symbol: "dyn", category: "force", system: "metric", conversionToBase: 0.00001 },

  // 时间单位
  { id: "year", name: "年", symbol: "yr", category: "time", system: "metric", conversionToBase: 31536000 },
  { id: "month", name: "月", symbol: "mo", category: "time", system: "metric", conversionToBase: 2592000 },
  { id: "week", name: "周", symbol: "wk", category: "time", system: "metric", conversionToBase: 604800 },
  { id: "day", name: "天", symbol: "d", category: "time", system: "metric", conversionToBase: 86400 },
  { id: "hour", name: "小时", symbol: "h", category: "time", system: "metric", conversionToBase: 3600 },
  { id: "minute", name: "分钟", symbol: "min", category: "time", system: "metric", conversionToBase: 60 },
  { id: "second", name: "秒", symbol: "s", category: "time", system: "metric", conversionToBase: 1 },
  { id: "millisecond", name: "毫秒", symbol: "ms", category: "time", system: "metric", conversionToBase: 0.001 },
  { id: "microsecond", name: "微秒", symbol: "µs", category: "time", system: "metric", conversionToBase: 0.000001 },
  { id: "nanosecond", name: "纳秒", symbol: "ns", category: "time", system: "metric", conversionToBase: 0.000000001 },

  // 速度单位
  { id: "mps", name: "米/秒", symbol: "m/s", category: "speed", system: "metric", conversionToBase: 1 },
  { id: "kmph", name: "千米/小时", symbol: "km/h", category: "speed", system: "metric", conversionToBase: 0.27777777777778 },
  { id: "mph", name: "英里/小时", symbol: "mph", category: "speed", system: "imperial", conversionToBase: 0.44704 },
  { id: "knot", name: "节", symbol: "kn", category: "speed", system: "imperial", conversionToBase: 0.51444444444444 },
  { id: "fps", name: "英尺/秒", symbol: "ft/s", category: "speed", system: "imperial", conversionToBase: 0.3048 },

  // 数据存储单位
  { id: "byte", name: "字节", symbol: "B", category: "data", system: "metric", conversionToBase: 1 },
  { id: "kilobyte", name: "千字节", symbol: "KB", category: "data", system: "metric", conversionToBase: 1024 },
  { id: "megabyte", name: "兆字节", symbol: "MB", category: "data", system: "metric", conversionToBase: 1048576 },
  { id: "gigabyte", name: "吉字节", symbol: "GB", category: "data", system: "metric", conversionToBase: 1073741824 },
  { id: "terabyte", name: "太字节", symbol: "TB", category: "data", system: "metric", conversionToBase: 1099511627776 },
  { id: "petabyte", name: "拍字节", symbol: "PB", category: "data", system: "metric", conversionToBase: 1125899906842624 },
  { id: "bit", name: "位", symbol: "bit", category: "data", system: "metric", conversionToBase: 0.125 },
  { id: "kilobit", name: "千位", symbol: "Kb", category: "data", system: "metric", conversionToBase: 128 },
  { id: "megabit", name: "兆位", symbol: "Mb", category: "data", system: "metric", conversionToBase: 131072 },
  { id: "gigabit", name: "吉位", symbol: "Gb", category: "data", system: "metric", conversionToBase: 134217728 },

  // 角度单位
  { id: "degree", name: "度", symbol: "°", category: "angle", system: "metric", conversionToBase: 1 },
  { id: "radian", name: "弧度", symbol: "rad", category: "angle", system: "metric", conversionToBase: 57.295779513082 },
  { id: "gradian", name: "百分度", symbol: "grad", category: "angle", system: "metric", conversionToBase: 0.9 },
  { id: "arcminute", name: "角分", symbol: "′", category: "angle", system: "metric", conversionToBase: 0.016666666666667 },
  { id: "arcsecond", name: "角秒", symbol: "″", category: "angle", system: "metric", conversionToBase: 0.00027777777777778 }
]
