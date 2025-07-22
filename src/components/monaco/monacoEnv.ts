// src/components/monaco/monacoEnv.ts
import * as monaco from "monaco-editor"
import { loader } from "@monaco-editor/react"

loader.config({ monaco })
export function setupMonacoEnvironment() {
  if (typeof window !== "undefined" && !window.MonacoEnvironment) {
    // 关键：让 monaco-editor loader 走本地
    // @ts-ignore
    window.require = { paths: { vs: "/monaco/vs" } }
    window.MonacoEnvironment = {
      getWorkerUrl: function (moduleId: string, label: string) {
        switch (label) {
          case "json":
            return "/monaco/vs/language/json/json.worker.js"
          case "css":
          case "scss":
          case "less":
            return "/monaco/vs/language/css/css.worker.js"
          case "html":
          case "handlebars":
          case "razor":
            return "/monaco/vs/language/html/html.worker.js"
          case "typescript":
          case "javascript":
            return "/monaco/vs/language/typescript/ts.worker.js"
          default:
            return "/monaco/vs/base/worker/workerMain.js"
        }
      }
    }
  }
}