const fs = require('fs')
const path = require('path')

const scssVarsConfig = './app/assets/css/scss/base/_variables.scss'
const configJSONPath = './app/config.json'

const configJson = require(configJSONPath)
let annotations = [] // 注释
let variates = [] // 变量
let varsCopy = []
let _varsCopy = {}
    // $tableFrob-table-tdEtdPEWhoverspanFbackground-color: orange;
const commonVar = {
    commonVars: {
        type: '公用变量',
    },
    gridVars: {
        type: 'grid 网格',
    },
    inputVars: {
        type: 'input 输入框',
    },
    checkboxVars: {
        type: 'checkbox 复选框',
    },
    switchVars: {
        type: 'switch 切换开关',
    },
    sliderVars: {
        type: 'slider 滑块',
    },
    stepsVars: {
        type: 'step 步骤条',
    },
    scrollbarVars: {
        type: 'scrollbar 滚动条',
    },
    calendarVars: {
        type: 'calendar 日历',
    },
    selectVars: {
        type: 'select 下拉框',
    },
    radioVars: {
        type: 'radio 单选',
    },
    paginationVars: {
        type: 'pagination 分页',
    },
    badgeVars: {
        type: 'badge 徽标数',
    },
    collapseVars: {
        type: 'collapse 折叠板',
    },
    progressVars: {
        type: 'progress 进度条',
    },
    tabVars: {
        type: 'tab 标签页',
    },
    buttonVars: {
        type: 'button 按钮',
    },
    tableVars: {
        type: 'table 表格',
    },
    uploadVars: {
        type: 'upload 上传文件',
    },
    labelVars: {
        type: 'label 标签',
    },
    stepsVars: {
        type: 'steps 步骤条',
    },
    imgVars: {
        type: 'image 图片',
    },
    breadcrumbVars: {
        type: 'breadcrumb 面包屑',
    },
    alertVars: {
        type: 'alert 弹窗',
    },
    loadingVars: {
        type: 'loading 加载',
    },
    notificationVars: {
        type: 'notification 通知',
    },
    timelineVars: {
        type: 'timeline 弹窗',
    },
    tooltipVars: {
        type: 'tooltip 文字提示',
    },
    menuVars: {
        type: 'menu 菜单',
    },
    horizenmenuVars: {
        type: 'horizenmenu 横向菜单',
    },
     popoverVars: {
        type: 'popover 悬浮弹窗',
    }
}
fs.readFile(scssVarsConfig, 'utf-8', (err, data) => {
    if (err) throw err;
    let datas = data.split('\n')

    datas.forEach((item) => {
        if (item.startsWith('//')) {
            item = item.replace(';', '');
            annotations.push(item)
            return
        }

        let items = item.split('F')
        let vId = items[0].substr(1)
        item = item.replace(';', '');
        variates.push(item)
        if (!vId) {
            return;
        }
        if (_varsCopy[`${vId}Vars`]) {
            return;
        }
        _varsCopy[`${vId}Vars`] = Object.assign({
            id: `${vId}Vars`,
            vars: [],
            type:`${vId}Vars`
        }, commonVar[`${vId}Vars`])
    })

    variates.forEach((item) => {
        let items = item.split('F')
        let vId = items[0].substr(1)
        let values = item.split(':')
        if (!vId || !_varsCopy[`${vId}Vars`]) {
            return
        }
        _varsCopy[`${vId}Vars`].vars.push({
            key: values[0],
            value: values[1],
            desc: (annotations.filter(i => (i.split(':')[0].replace(/\s/g, '') === `//${values[0]}`) && i.split(':')[1])[0] || '').split(':')[1] || ''
        })
    })

    Object.keys(_varsCopy).map((item) => {
        varsCopy.push(_varsCopy[item]);
    })
    configJson.varsCopy = varsCopy;
    fs.writeFile(configJSONPath, JSON.stringify(configJson, null, 2), (err) => {
        if (err) {
            console.log(err, '出错')
            return
        }
        console.log('Generator Success~')

    })
})