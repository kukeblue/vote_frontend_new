import React, { useEffect } from 'react'

const myConfig = {
    UEDITOR_HOME_URL: "/ueditor/", // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
    // 编辑器不自动被内容撑高
    autoHeightEnabled: false,
    // 初始容器高度
    initialFrameHeight: 500,
    // 初始容器宽度
    // initialFrameWidth: this.width,
    // 关闭自动保存
    enableAutoSave: false,
    // 字数统计
    wordCount: false,
    // 元素路径
    elementPathEnabled: false,
    toolbars: [
        [
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "forecolor",
        "indent",
        "lineheight",
        "insertorderedlist",
        "insertunorderedlist",
        "|",
        "justifyleft",
        "justifycenter",
        "justifyright",
        "justifyjustify",
        "paragraph",
        "fontsize",
        "|",
        "inserttable", //插入表格
        "deletetable", //删除表格
        "|",
        "unlink",
        "|",
        "removeformat",
        "pasteplain",
        "|",
        "cleardoc",
        "custom-link",
        "custom-img",
        "custom-video",
        ],
    ],
}

function Ueitor() {
    let editorId = 'ueitor-container'
    let toorLenght = myConfig.toolbars[0].length
    useEffect(()=> {
        setTimeout(()=>{
            window.UE.registerUI(
                "custom-link",
                function (editor, uiName) {
                  // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
                  editor.registerCommand(uiName, {
                    execCommand: function () {
                      //custom-link命令
                    },
                  });
                  // 创建一个 button
                  var btn = new window.UE.ui.Button({
                    // 按钮的名字
                    name: uiName,
                    // 提示
                    title: "插入链接",
                    // 点击时执行的命令
                    onclick: function () {
                      // 这里可以不用执行registerCommand的命令，做你自己的操作也可
                      // editor.execCommand(uiName);
                      //   that.linkDialogVisible = true;
                    },
                  });
                  // 当点到编辑内容上时，按钮要做的状态反射
                  editor.addListener("selectionchange", function () {
                    var state = editor.queryCommandState(uiName);
                    if (state === -1) {
                      btn.setDisabled(true);
                      btn.setChecked(false);
                    } else {
                      btn.setDisabled(false);
                      btn.setChecked(state);
                    }
                  });
                  // 因为你是添加 button，所以需要返回这个 button
                  return btn;
                },
                23 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */,
                'ueitor-container' /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
            );
            window.UE.getEditor('ueitor-container', myConfig);
            window.UE.registerUI(
                "custom-img",
                function (editor, uiName) {
                  var btn = new window.UE.ui.Button({
                    name: uiName,
                    title: "插入图片",
                    onclick: function () {
                    //   document.querySelector(".uploadImage input").click();
                    },
                  });
                  editor.addListener("selectionchange", function () {
                    var state = editor.queryCommandState(uiName);
                    if (state === -1) {
                      btn.setDisabled(true);
                      btn.setChecked(false);
                    } else {
                      btn.setDisabled(false);
                      btn.setChecked(state);
                    }
                  });
                  return btn;
                },
                toorLenght - 4 ,
                editorId
              );
              window.UE.registerUI(
                "custom-video",
                function (editor, uiName) {
                  editor.registerCommand(uiName, {
                    execCommand: function () {},
                  });
                  var btn = new window.UE.ui.Button({
                    name: uiName,
                    title: "插入视频",
                    onclick: function () {
                      // editor.execCommand(uiName);
                      // that.videoDialogVisible = true;
                    },
                  });
        
                  editor.addListener("selectionchange", function () {
                    var state = editor.queryCommandState(uiName);
                    if (state === -1) {
                      btn.setDisabled(true);
                      btn.setChecked(false);
                    } else {
                      btn.setDisabled(false);
                      btn.setChecked(state);
                    }
                  });
                  return btn;
                },
                toorLenght - 3,
                editorId
            );
        }, 100)
    }, [])
    return <script className={{height: '500px'}} id='ueitor-container' name="content" type="text/plain">
    </script>
}

export default Ueitor