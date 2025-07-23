import copy from 'copy-to-clipboard'
import { Message } from '@arco-design/web-react'

/**
 * 复制文本到剪贴板
 * @param text 要复制的内容
 * @returns 是否复制成功
 */
export function copyText(text: string): boolean {
  const success = copy(text)
  if (success) {
    Message.success('复制成功！')
  } else {
    Message.error('复制失败，请手动复制')
  }
  return success
}