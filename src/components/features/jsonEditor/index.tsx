import { setupMonacoEnvironment } from "../../monaco/monacoEnv"
// import * as monaco from 'monaco-editor';
// import { loader } from '@monaco-editor/react';
import Editor from '@monaco-editor/react'
// loader.config({ monaco });
setupMonacoEnvironment()

export default function JsonEditor() {
  return (
    <div>
      <Editor
        height="400px"
        defaultLanguage="json"
        defaultValue=""
        path="/monaco/vs"
        theme="vs-dark"
      />
    </div>
  )
}

