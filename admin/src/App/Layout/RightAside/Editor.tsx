import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";

import { exampleNodeData } from "@/configs/design";
import { globalEventBus } from "@/globals/eventBus";
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
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  const isSyncingNodeTree = useRef(false);

  useEffect(() => {
    return globalEventBus.on("editTextChange", ({ text, reason }) => {
      if (reason === "userEdit") {
        stores.designs.actions.replaceNodeData(JSON.parse(text));
      }
    });
  }, []);

  useEffect(() => {
    return globalEventBus.on("nodeTreeChange", (nodeTree) => {
      if (editorInstance.current) {
        /**
         * 刚刚编辑完，会马上触发 treeNode 更新，此时不需要同步 treeNode 到编辑文本
         * 所以做一次文本比较，过滤掉这种情况
         */
        const newValue = JSON.stringify(nodeTree, null, 2);
        const currentValue = editorInstance.current.getValue();

        if (newValue === currentValue) {
          console.log("Skip update if content is the same.");
          return;
        }

        isSyncingNodeTree.current = true;
        const position = editorInstance.current.getPosition();
        editorInstance.current.setValue(newValue);
        if (position) {
          editorInstance.current.setPosition(position);
        }
      }
    });
  }, []);

  useEffect(() => {
    stores.designs.actions.initTreeData(exampleNodeData);
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: "",
        language: "json", // 使用自定义DSL语言
        theme: "vs-dark",
      });

      // 添加内容变化监听器
      editorInstance.current.onDidChangeModelContent(() => {
        if (isSyncingNodeTree.current) {
          isSyncingNodeTree.current = false;
          const value = editorInstance.current?.getValue() || "";
          globalEventBus.emit("editTextChange", {
            text: value,
            reason: "syncNodeTree",
          });
          return;
        }

        const value = editorInstance.current?.getValue() || "";
        globalEventBus.emit("editTextChange", {
          text: value,
          reason: "userEdit",
        });
      });

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
