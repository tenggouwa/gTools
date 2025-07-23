const MENU_LIST = [
  {
    label: "常用",
    children: [
      {
        label: "JSON工具",
      },
      {
        label: "哈希(hash)",
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

export { MENU_LIST, INDENT_SIZE_LIST }