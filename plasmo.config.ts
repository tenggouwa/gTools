// plasmo.config.ts
import { defineConfig } from "plasmo"

export default defineConfig({
  watch: {
    // 忽略 public 目录的文件变动（不触发 HMR）
    ignored: ["**/public/**"]
  }
})