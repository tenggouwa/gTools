const MENU_LIST = [
  {
    label: "常用",
    children: [
      {
        label: "JSON工具",
      },
      {
        label: "哈希(hash)",
      },
      {
        label: "Base64",
      },
      {
        label: "URL编码",
      },
      {
        label: "时间日期",
      },
      {
        label: "二维码",
      },
      {
        label: "汉字转拼音",
      },
      {
        label: "IP查询",
      },
      {
        label: "正则表达式",
      },
      {
        label: "条形码",
      }
    ],
  },
  {
    label: "加解密",
  },
  {
    label: "校验",
  },
  {
    label: "编解码",
  },
  {
    label: "转换",
  },
  {
    label: "生成",
  },
  {
    label: "其他",
  },
]

const INDENT_SIZE_LIST = [
  {
    label: "无缩进",
    value: 0,
  },
  {
    label: "缩进空格 2",
    value: 2,
  },
  {
    label: "缩进空格 4",
    value: 4,
  },
  {
    label: "缩进空格 6",
    value: 6,
  },
  {
    label: "缩进空格 8",
    value: 8,
  }
]

const TIMEZONE_LIST = [
  { label: "UTC-12:00 Etc/GMT+12 - 国际日期变更线西", value: "Etc/GMT+12" },
  { label: "UTC-11:00 Pacific/Midway - 中途岛", value: "Pacific/Midway" },
  { label: "UTC-10:00 Pacific/Honolulu - 檀香山", value: "Pacific/Honolulu" },
  { label: "UTC-09:00 America/Anchorage - 安克雷奇", value: "America/Anchorage" },
  { label: "UTC-08:00 America/Los_Angeles - 洛杉矶", value: "America/Los_Angeles" },
  { label: "UTC-07:00 America/Denver - 丹佛", value: "America/Denver" },
  { label: "UTC-06:00 America/Chicago - 芝加哥", value: "America/Chicago" },
  { label: "UTC-05:00 America/New_York - 纽约", value: "America/New_York" },
  { label: "UTC-04:00 America/Halifax - 哈利法克斯", value: "America/Halifax" },
  { label: "UTC-03:00 America/Argentina/Buenos_Aires - 布宜诺斯艾利斯", value: "America/Argentina/Buenos_Aires" },
  { label: "UTC-02:00 America/Noronha - 费尔南多-迪诺罗尼亚", value: "America/Noronha" },
  { label: "UTC-01:00 Atlantic/Azores - 亚速尔群岛", value: "Atlantic/Azores" },
  { label: "UTC+00:00 Europe/London - 伦敦", value: "Europe/London" },
  { label: "UTC+01:00 Europe/Berlin - 柏林", value: "Europe/Berlin" },
  { label: "UTC+02:00 Europe/Athens - 雅典", value: "Europe/Athens" },
  { label: "UTC+03:00 Europe/Moscow - 莫斯科", value: "Europe/Moscow" },
  { label: "UTC+03:30 Asia/Tehran - 德黑兰", value: "Asia/Tehran" },
  { label: "UTC+04:00 Asia/Dubai - 迪拜", value: "Asia/Dubai" },
  { label: "UTC+04:30 Asia/Kabul - 喀布尔", value: "Asia/Kabul" },
  { label: "UTC+05:00 Asia/Karachi - 卡拉奇", value: "Asia/Karachi" },
  { label: "UTC+05:30 Asia/Kolkata - 新德里", value: "Asia/Kolkata" },
  { label: "UTC+05:45 Asia/Kathmandu - 加德满都", value: "Asia/Kathmandu" },
  { label: "UTC+06:00 Asia/Dhaka - 达卡", value: "Asia/Dhaka" },
  { label: "UTC+06:30 Asia/Yangon - 仰光", value: "Asia/Yangon" },
  { label: "UTC+07:00 Asia/Bangkok - 曼谷", value: "Asia/Bangkok" },
  { label: "UTC+08:00 Asia/Shanghai - 上海", value: "Asia/Shanghai" },
  { label: "UTC+09:00 Asia/Tokyo - 东京", value: "Asia/Tokyo" },
  { label: "UTC+09:30 Australia/Adelaide - 阿德莱德", value: "Australia/Adelaide" },
  { label: "UTC+10:00 Australia/Sydney - 悉尼", value: "Australia/Sydney" },
  { label: "UTC+11:00 Pacific/Noumea - 努美阿", value: "Pacific/Noumea" },
  { label: "UTC+12:00 Pacific/Auckland - 奥克兰", value: "Pacific/Auckland" }
]

export { MENU_LIST, INDENT_SIZE_LIST, TIMEZONE_LIST }