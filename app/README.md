### robotUI

```scss
scss //scss 文件 
│   ├── base // 基础文件夹
│   ├── _base.scss // 导入 mixin + variables 
│   ├── _common.scss //公用样式
│   ├── _fontsIcon.scss //字体图标样式
│   ├── _normalize.scss //重置浏览器样式
│   ├── _variables.scss // 所有组件变量
│   ├── fn.scss  // 导入 normalize + fontsIcon + common
│   └── mixin // 公用方法库
│       ├── _alerts.scss
│       ├── _mixins.scss
│       ├── _border-radius.scss
│       ├── _breakpoints.scss
│       ├── _buttons.scss
│       ├── _clearfix.scss
│       ├── _common.scss
│       ├── _form.scss
│       ├── _grid-framework.scss
│       ├── _grid.scss
│       ├── _image.scss
│       ├── _labels.scss
│       ├── _nav-divider.scss
│       ├── _opacity.scss
│       ├── _pagination.scss
│       ├── _reset-filter.scss
│       ├── _reset-text.scss
│       ├── _size.scss
│       ├── _tab-focus.scss
│       ├── _table-row.scss
│       ├── _text-overflow.scss
│       └── _vendor-prefixes.scss
├── components //所有组件
│   ├── alert // 弹窗
│   │   ├── alert-cover.scss
│   │   ├── alert-dismissable.scss
│   │   ├── alert-sm.scss
│   │   ├── alert-title-color.scss
│   │   └── alert.scss
│   ├── badge // 徽章
│   │   ├── badge-Warning.scss
│   │   ├── badge-bell.scss
│   │   ├── badge-bell1.scss
│   │   ├── badge-green.scss
│   │   ├── badge-normal.scss
│   │   ├── badge-red.scss
│   │   ├── badge-remind.scss
│   │   ├── badge-success.scss
│   │   ├── badge-unavailable.scss
│   │   └── badge-white.scss
│   ├── breadcrumb // 面包屑
│   │   ├── breadcrumb.scss
│   │   ├── breadcrumbs-custom-made.json
│   │   └── breadcrumbs.json
│   ├── button // 按钮
│   │   ├── btn-block.scss
│   │   ├── btn-circle.scss
│   │   ├── btn-danger.scss
│   │   ├── btn-default.scss
│   │   ├── btn-icon-only.scss
│   │   ├── btn-lg.scss
│   │   ├── btn-link.scss
│   │   ├── btn-main.scss
│   │   ├── btn-minor.scss
│   │   ├── btn-minor2.scss
│   │   ├── btn-sm.scss
│   │   ├── btn-success.scss
│   │   ├── btn-warning.scss
│   │   ├── btn-xs.scss
│   │   ├── btn.scss
│   │   ├── button.json
│   │   ├── danger
│   │   │   ├── btn-dashed.scss
│   │   │   └── btn-line.scss
│   │   ├── default
│   │   │   ├── btn-dashed.scss
│   │   │   └── btn-line.scss
│   │   ├── success
│   │   │   ├── btn-dashed.scss
│   │   │   └── btn-line.scss
│   │   └── warning
│   │       ├── btn-dashed.scss
│   │       └── btn-line.scss
│   ├── calendar // 日历
│   │   └── calendar.scss
│   ├── collapse// 折叠版
│   │   ├── collapse-multiple.scss
│   │   ├── collapse-single.scss
│   │   ├── collapse-two-multiple.scss
│   │   └── collapse-two-single.scss
│   ├── form // 表单
│   │   ├── checkbox-bordered.scss
│   │   ├── checkbox-filled-in.scss
│   │   ├── checkbox.scss
│   │   ├── input-date.scss
│   │   ├── input-has-error.scss
│   │   ├── input-label.scss
│   │   ├── input-line.scss
│   │   ├── input-require.scss
│   │   ├── input-select-group.scss
│   │   ├── input-textarea.scss
│   │   ├── input.scss
│   │   ├── radio-filled-in.scss
│   │   ├── radio-with-gap.scss
│   │   ├── radio.scss
│   │   ├── select.scss
│   │   ├── switch-two.scss
│   │   ├── switch.scss
│   │   ├── upload-btn.scss
│   │   └── upload-card.scss
│   ├── grid // 网格
│   │   └── grid.scss
│   ├── horizenmenu
│   │   ├── navbar-horizen1.scss
│   │   └── navbar-horizen2.scss
│   ├── image // 图片
│   │   ├── image.scss
│   │   ├── images-box.scss
│   │   ├── img-border.scss
│   │   ├── img-circle.scss
│   │   ├── img-darken.scss
│   │   ├── img-div-border.scss
│   │   ├── img-div-position.scss
│   │   ├── img-highlight.scss
│   │   ├── img-hover-text.scss
│   │   ├── img-responsive.scss
│   │   ├── img-rounded.scss
│   │   ├── img-shoal.scss
│   │   └── img-superscript.scss
│   ├── labels // 标签
│   │   ├── label-five.scss
│   │   ├── label-four.scss
│   │   ├── label-hover-underline.scss
│   │   ├── label-one.scss
│   │   ├── label-six.scss
│   │   ├── label-three.scss
│   │   └── label-two.scss
│   ├── loading // 加载
│   │   ├── loading-four-blue.scss
│   │   ├── loading-four-white.scss
│   │   ├── loading-img.scss
│   │   ├── loading-ring.scss
│   │   ├── loading-smile.scss
│   │   └── loading.scss
│   ├── menu // 菜单
│   │   ├── sidebar-menu-1.scss
│   │   ├── sidebar-menu-2.scss
│   │   └── sidebar-menu-3.scss
│   ├── modals // 模态框
│   │   └── modals.scss
│   ├── notification // 通知
│   │   └── notification.scss
│   ├── pagination // 分页
│   │   ├── pagination-border-radius-circle.scss
│   │   ├── pagination-border-radius.scss
│   │   ├── pagination-jump.scss
│   │   ├── pagination-simple-input.scss
│   │   ├── pagination-simple.scss
│   │   └── pagination.scss
│   ├── popover // 悬浮框
│   │   └── popover.scss
│   ├── progress // 进度条
│   │   └── progress.scss
│   ├── rate // 评分
│   │   └── rate.scss
│   ├── scrollbar // 滚动条
│   │   └── scrollbar.scss
│   ├── slider // 侧边栏
│   │   └── slider.scss
│   ├── steps // 步骤条
│   │   ├── is-horizontal.scss
│   │   ├── is-img.scss
│   │   ├── is-vertical.scss
│   │   └── steps.scss
│   ├── tab // 标签页
│   │   ├── nav-tabs-toggle.scss
│   │   ├── nav-tabs.scss
│   │   ├── nav-tabs1.scss
│   │   ├── nav-tabs2.scss
│   │   ├── nav-tabs3.scss
│   │   └── nav.scss
│   ├── table // 表格 
│   │   ├── table-bordered-erect.scss
│   │   ├── table-bordered.scss
│   │   ├── table-condensed.scss
│   │   ├── table-hover.scss
│   │   ├── table-responsive.scss
│   │   ├── table-striped.scss
│   │   └── table.scss
│   ├── timeline // 时间轴 
│   │   └── ant-timeline.scss
│   └── tooltip // 提示
│       ├── tooltip-custom-made.json
│       ├── tooltip.json
│       └── tooltip1.scss
├── layout // robotUI 页面布局
│   ├── _app.scss
│   ├── _common.scss
│   ├── _footer.scss
│   ├── _g.scss
│   ├── _gt.scss
│   ├── _header.scss
│   ├── _layout.scss
│   ├── _menu.scss
│   ├── _prism.scss
│   └── demo.scss
└── robotUI.scss // 总的scss文件
```