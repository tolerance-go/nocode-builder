import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";

import { exampleNodeData } from "@/configs/design";
import { useEventBus } from "@/hooks/useEventBus";
import stores from "@/stores";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const Editor = () => {
  const eventBus = useEventBus();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  const initialValue = JSON.stringify(exampleNodeData, null, 2);

  useEffect(() => {
    return eventBus.on("editTextChange", (text) => {
      stores.designs.actions.replaceNodeData(JSON.parse(text));
    });
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: initialValue,
        language: "json", // 使用自定义DSL语言
        theme: "vs-dark",
      });

      // 添加内容变化监听器
      editorInstance.current.onDidChangeModelContent(() => {
        const value = editorInstance.current?.getValue() || "";
        eventBus.emit("editTextChange", value);
      });

      // 手动触发一次
      eventBus.emit("editTextChange", initialValue);

      // 添加撤销快捷键监听器
      editorInstance.current.addCommand(
        monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyZ,
        () => {
          if (editorInstance.current) {
            console.log("撤销操作");
            editorInstance.current.trigger("keyboard", "undo", null);
          }
        }
      );
    }

    // 组件卸载时销毁编辑器实例
    return () => {
      editorInstance.current?.dispose();
    };
  }, []);

  return <div ref={editorRef} style={{ height: "100%", width: "100%" }}></div>;
};

export default Editor;
