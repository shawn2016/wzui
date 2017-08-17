/*
 * Created with vs code.
 * github: https://github.com/tianxiangbing/calendar   记得加星星
 * demo地址: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2015-03-09
 * Time: 17:02:02
 * Contact: 55342775@qq.com
 * Desc: 确保代码最新及时修复bug，请去github上下载最新源码 https://github.com/tianxiangbing/calendar
 */
;(function(root, factory) {
  //amd
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') { //umd
    module.exports = factory();
  } else {
    root.Calendar = factory(window.Zepto || window.jQuery || $);
  }
})(this, function($) {
  $.fn.Calendar = function(settings) {
    var list = [];
    $(this).each(function() {
      var calendar = new Calendar();
      var options = $.extend({
        target: $(this)
      }, settings);
      calendar.init(options);
      list.push(calendar);
    });
    return list;
  };
  var Calendar = function() {
    // this.monthArr = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    this.monthArr = ["1 月", "2 月", "3 月", "4 月", "5月", "6 月", "7 月", "8 月", "9 月", "10月", "11月", "12月"];
    this.dayArr = ['日', '一', '二', '三', '四', '五', '六'];
    var rnd = Math.random().toString().replace('.', '');
    this.id = 'calendar_' + rnd;
    this.calendarContainer;
    this.settings = {};
    this.isShow = false;
    this.autohide = true;
    this.toolbarTpl = ' <div class="ui-calendar-toolbar"><a href="" class="rob-calendar-panel-footer-link ui-calendar-today">现在</a><a href="" class="rob-calendar-panel-footer-link js-clear">清空</a><a  class="rob-calendar-panel-footer-link js-calendar-submit">确定</a><a  class="rob-calendar-panel-footer-link ui-calendar-close">关闭</a></div>';
    this.sidebarTpl = '<div class="ui-calendar-sidebar">'

    + '<button type="button" class="rob-calendar-panel-sideba-btn ui-calendar-today">今天</button>' + '<button type="button" class="rob-calendar-panel-sideba-btn ui-calendar-yesterday">昨天</button>' + '<button type="button" class="rob-calendar-panel-sideba-btn ui-calendar-week">一周前</button>' + '<button type="button" class="rob-calendar-panel-sideba-btn ui-calendar-month">一月前</button>' + '<button type="button" class="rob-calendar-panel-sideba-btn ui-calendar-three-month">三月前</button></div>';

    this.timeTpl = '<div class="ui-calendar-time clearfix"><select class="js-calendar-hours">时</select>:<select class="js-calendar-minutes">分</select><s>:</s><select class="js-calendar-second">秒</select></div>';
    this.dateArr = [];
    this.maxDays = 9999;
  };
  Calendar.prototype = {
    separator: '-',
    defaultDate: new Date(),
    setRange: function(range) {
      this.range = $.extend([null, null], range);
    },
    getDefaultDate: function() {
      var _this = this;
      if (this.settings.target && $(this.settings.target).size()) {
        if ($(this.settings.target)[0].nodeType === 1) {
          this.settings.focusDate = $(this.settings.target).val() || this.settings.focusDate || '';
        } else {
          this.settings.focusDate = $(this.settings.target).prev().val() || this.settings.focusDate || '';
        }
        if (this.settings.onlyYM && $(this.settings.target).val()) {
          this.settings.focusDate = $(this.settings.target).val() + this.separator + "01";
        }
      }
      if (this.settings.focusDate && !this.settings.multiple) {
        var focusDateArr = this.settings.focusDate.split(' ')[0].split(this.separator);
        var t = this.settings.focusDate.split(' ')[1] || "00:00:00";
        this.defaultDate = new Date(focusDateArr[0], parseInt(focusDateArr[1]) - 1, focusDateArr[2], t.split(':')[0], t.split(':')[1], t.split(':')[2]);
      }
      if (this.settings.focusDate && this.settings.multiple) {
        var arr = this.settings.focusDate.split(',');
        for (var i = arr.length - 1; i >= 0; i--) {
          var item = arr[i];
          var focusDateArr = item.split(this.separator);
          this.dateArr.push(new Date(focusDateArr[0], parseInt(focusDateArr[1]) - 1, focusDateArr[2]));
        };
        this.defaultDate = this.dateArr[0];
        if (!_this._dateInArr(_this.defaultDate, _this.dateArr)) {
          _this.dateArr.push(_this.date);
        }
      }
    },
    init: function(settings) {
      $('body').append('<div class="rob-calendar-panel animated" id="'
                +this.id
                +'">'
                        +'<div class="rob-calendar-body-wrapper">'
                            +'<div class="rob-calendar-panel-sidebar">'
                
                            +'</div>'
                            +'<div class="rob-calendar-panel-body" data-role="pannel">'
                                +'<div class="rob-calendar-header">'
                                    +'<span class="ui-calendar-control rob-calendar-prev rob-calendar-icon" data-role="prev-year">&lt;&lt;</span>'
                                    +'<span class="ui-calendar-control rob-calendar-prev rob-calendar-icon" data-role="prev-month">&lt;</span>'
                                    +'<span class="ui-calendar-control rob-calendar-header-label" data-role="current-year"></span>'
                                    +'<span class="ui-calendar-control rob-calendar-header-label active"  data-role="current-month"></span>'
                                    +'<span class="ui-calendar-control rob-calendar-next rob-calendar-icon" data-role="next-year">&gt;&gt;</span>'
                                    +'<span class="ui-calendar-control rob-calendar-next rob-calendar-icon" data-role="next-month">&gt;</span>'
                                +'</div>'
                                +'<div class="rob-calendar-content">'
                                    +'<table class="rob-date-table date-table">'
                                        +'<tbody>'
                                            +'<tr class="calendar-header">'
                                            +'</tr>'
                                            +'<tbody class="c_days"></tbody>'
                                        +'</tbody>'
                                    +'</table>'
                                    +'<table class="month-table rob-month-table"></table>'
                                    +'<table class="year-table rob-year-table"></table>'
                                +'</div>'
                                +'<div class="rob-calendar-panel-footer"></div>'
                            +'</div>'
                        +'</div>'
                    +'</div>');

      this.calendarContainer = $('#' + this.id);
      var _this = this;
      this.settings = $.extend({}, this.settings, settings);
      this.maxDays = this.settings.maxdays || this.maxDays;
      this.mutilSeparator = this.settings.mutilSeparator || ",";
      $(this.settings.target).attr('readonly', 'readonly');
      this.getDefaultDate();
      if (this.settings.multiple) {
        this.settings.toolbar = true;
      }
      var zIndex = this.settings.zIndex || 1000;
      this.calendarContainer.css('zIndex', zIndex);
      this.date = this.defaultDate;
      this.setRange(this.settings.range);
      if (this.settings.time) {
        this.settings.toolbar = true;
        this.autohide = false;
        this.showTime();
        this.showToolbar();
      }
      if (this.settings.toolbar) {
        this.autohide = false;
        this.showToolbar();

      }
      if (this.settings.sidebar) {
        this.calendarContainer.find('.rob-calendar-panel-sidebar').removeClass('calendar-hide-sidebar');
        this.calendarContainer.addClass('has-sidebar');

        this.showSidebar();
      } else {
        this.calendarContainer.removeClass('has-sidebar');
        this.calendarContainer.find('.rob-calendar-panel-sidebar').addClass('calendar-hide-sidebar');
      }

      // this.formatDate();
      // this.renderHeader();
      this.bindEvent();
      if (this.settings.target) {
        this.hide();
      } else {
        this.autohide = false;
        this.show();
      }
    },
    showToolbar: function() {
      if (this.settings.toolbar && $('.ui-calendar-toolbar', this.calendarContainer).size() == 0) {
        this.calendarContainer.find('.rob-calendar-panel-footer').append(this.toolbarTpl);
      }
    },
    showSidebar: function() {
      if (this.settings.sidebar && $('.ui-calendar-sidebar', this.calendarContainer).size() == 0) {
        this.calendarContainer.find('.rob-calendar-panel-sidebar').append(this.sidebarTpl);
      }
    },
    showTime: function() {
      if (this.calendarContainer.find('.ui-calendar-time').size() == 0) {
        this.calendarContainer.append(this.timeTpl);
      }
      var _this = this;
      $('.js-calendar-minutes', this.calendarContainer).html('');
      $('.js-calendar-second', this.calendarContainer).html('');
      for (var i = 0, l = 60; i < l; i++) {
        if (i < 24) {
          $('.js-calendar-hours', this.calendarContainer).append('<option>' + _this._getTowNum(i) + '</option>');
        }
        $('.js-calendar-minutes', this.calendarContainer).append('<option>' + _this._getTowNum(i) + '</option>');
        $('.js-calendar-second', this.calendarContainer).append('<option>' + _this._getTowNum(i) + '</option>');
      }
      var value = this.date;
      var t = _this._getTowNum(value.getHours()) + ":" + _this._getTowNum(value.getMinutes()) + ":" + _this._getTowNum(value.getSeconds());
      $('.js-calendar-hours', this.calendarContainer).val(_this._getTowNum(value.getHours()));
      $('.js-calendar-minutes', this.calendarContainer).val(_this._getTowNum(value.getMinutes()));
      $('.js-calendar-second', this.calendarContainer).val(_this._getTowNum(value.getSeconds()));
      if (_this.settings.onlyHm) {
        $('.js-calendar-second', this.calendarContainer).hide().val('00').prev().hide();
      }
    },
    show: function() {
      this.getDefaultDate();
      this.calendarContainer.show();
      this.date = this.defaultDate;
      this.formatDate();
      this.renderHeader();
      this.isShow = true;
      this.setPosition();
      this.settings.show && this.settings.show(this.calendarContainer);
      var _this = this;
      this.timer = setInterval(function() {
        _this.setPosition.call(_this);
      }, 500);
      if (this.settings.time) {
        this.settings.toolbar = true;
        this.autohide = false;
        this.showTime();
      }
      if (this.settings.onlyYM) {
        this.settings.toolbar = false;
        //模拟触发月份
        $('[data-role="current-month"]', this.calendarContainer).trigger('click');
        $('.ui-month-list', this.calendarContainer).show();
        $('.c_days', this.calendarContainer).hide();
      }
    },
    hide: function() {
      this.calendarContainer.hide();
      this.isShow = false;
      this.settings.hide && this.settings.hide(this.calendarContainer);
      clearInterval(this.timer);
    },
    setPosition: function() {
      var x = 0,
        y = 0;
      if (this.settings.target && $(this.settings.target).size()) {
        if ($(this.settings.target)[0].nodeType === 1) {
          y = $(this.settings.target).offset().top + $(this.settings.target).outerHeight();
          x = $(this.settings.target).offset().left;
        } else {
          y = $(this.settings.target).prev().offset().top + $(this.settings.target).prev().outerHeight();
          x = $(this.settings.target).prev().offset().left;
        }
        var st = $(window).scrollTop();
        var winY = $(window).height();
        if (y + this.calendarContainer.outerHeight() > st + winY) {
          var tmp = y - this.calendarContainer.outerHeight() - $(this.settings.target).outerHeight();
          if (tmp > 0) {
            y = tmp;
          }
        }
        this.calendarContainer.css({
          top: y,
          left: x
        });
      }
    },
    setDate: function(value) {
      var _this = this,
        v;
      if (typeof value === "object") {
        _this.defaultDate = value;
        v = value.getFullYear() + _this.separator + _this._getTowNum((value.getMonth() + 1)) + _this.separator + _this._getTowNum(value.getDate());
        if (_this.settings.time) {
          v += " " + _this._getTowNum(value.getHours()) + ":" + _this._getTowNum(value.getMinutes()) + ":" + _this._getTowNum(value.getSeconds());
        }
      } else {
        var a = value.split(' ');
        var d = a[0];
        var t = a[1] || "00:00:00";
        var focusDateArr = d.split(_this.separator);
        _this.defaultDate = new Date(focusDateArr[0], parseInt(focusDateArr[1]) - 1, focusDateArr[2], t.split(':')[0], t.split(':')[1], t.split(':')[2]);
        v = value;
      }
      _this.date = _this.defaultDate;
      return v;
    },
    bindEvent: function() {
      var _this = this;
      $('.ui-calendar-control[data-role]', _this.calendarContainer).click(function() {
        _this.go[$(this).data('role')].call(_this);
        return false;
      })
      $(_this.calendarContainer).click(function() {
        return false;
      });
      $('.c_days', _this.calendarContainer).delegate('td', 'click', function() {
        _this.settings.beforeSelect && _this.settings.beforeSelect(_this.date, _this.calendarContainer);
        if ($(this).hasClass('disabled')) {
          return false;
        };
        var value = $(this).data('value');
        _this.setDate(value);
        if (_this.settings.multiple) {
          if (!$(this).hasClass('current')) {
            if (_this.maxDays <= _this.dateArr.length) {
              //alert('添加已达上限 ' + _this.maxDays + ' 天');
              _this.settings.overdays && _this.settings.overdays(_this.maxDays, _this.dateArr, _this.calendarContainer);
              return false;
            }
            _this.dateArr.push(_this.defaultDate);
          } else {
            _this._removeDate(_this.defaultDate, _this.dateArr);
          }
        } else {
          _this.dateArr = [_this.date];
        }
        _this.formatDate();
        _this.renderHeader();
        _this.settings.selected && _this.settings.selected.call(_this, _this.date, _this.calendarContainer);
        if (!_this.settings.toolbar) {
          $(_this.settings.target).val(value);
          _this.hide();
        }
        if (_this.settings.target && $(_this.settings.target).size() && $(_this.settings.target)[0].nodeType === 1 && _this.autohide) {
          $(_this.settings.target).val(value);
          _this.hide();
          _this.settings.afterSelected && _this.settings.afterSelected.call(_this, $(_this.settings.target), _this.date, _this.calendarContainer);
        }
        return false;
      });
      //toolbar 按钮
      $('.ui-calendar-toolbar', _this.calendarContainer).delegate('a', 'click', function() {
        if ($(this).hasClass('js-calendar-submit')) { //点确定
          _this.settings.selected && _this.settings.selected.call(_this, _this.dateArr, _this.calendarContainer);
          if (_this.dateArr.length === 0) {
            _this.dateArr.push($('.current', _this.calendarContainer).data('value'));
          }
          var arr = _this._toString(_this.dateArr);
          value = arr.join(_this.mutilSeparator);
          if (_this.settings.time) {
            value += " " + $('.js-calendar-hours', _this.calendarContainer).val() + ":" + $('.js-calendar-minutes', _this.calendarContainer).val() + ":" + $('.js-calendar-second', _this.calendarContainer).val()
          }
          $(_this.settings.target).val(value);
          _this.hide();
        }
        if ($(this).hasClass('ui-calendar-close')) {
          _this.hide();
        }
        if ($(this).hasClass('ui-calendar-today')) { //点现在
          var now = new Date();
          var value = _this.setDate(now);
          _this.date = now;
          _this.hide();
          $(_this.settings.target).val(value);
        }
        if ($(this).hasClass('js-clear')) {
          _this.dateArr = [];
          _this.date = null;
          $(_this.settings.target).val('');
          _this.formatDate();
        }
        var value = $(_this.settings.target).val();
        var currentValue = new Date(value)
        if (_this.settings.time && currentValue) {
          //时间时，判断
          var start = _this.range[0],
            startDate,
            end = _this.range[1],
            endDate;
          if (start) {
            start = +new Date(Date.parse(start));
          };
          if (end) {
            end = +new Date(Date.parse(end));
          }
          if ((currentValue < start && start) || (currentValue > end && end)) {
            _this.date = null;
            $(_this.settings.target).val('');
            alert('所选日期超出限定范围内');
          }
        }
        _this.settings.afterSelected && _this.settings.afterSelected.call(_this, $(_this.settings.target), _this.date, _this.calendarContainer);
      });
      //sidebar
      $('.ui-calendar-sidebar', _this.calendarContainer).delegate('button', 'click', function() {


        if ($(this).hasClass('ui-calendar-today')) { //今天
          var now = new Date();
          var value = _this.setDate(now);
          _this.date = now;
          _this.hide();
          $(_this.settings.target).val(value);
        }
        if ($(this).hasClass('ui-calendar-yesterday')) { //昨天
          var now = new Date();
          var value = _this.setDate(new Date(now.setDate(now.getDate() - 1)))
          _this.date = now;
          _this.hide();
          $(_this.settings.target).val(value);
        }
        if ($(this).hasClass('ui-calendar-week')) { //一周
          var now = new Date();
          var value = _this.setDate(new Date(now.setDate(now.getDate() - 7)))
          _this.date = now;
          _this.hide();
          $(_this.settings.target).val(value);
        }

        if ($(this).hasClass('ui-calendar-month')) { //前一月
          var now = new Date();
          var value = _this.setDate(new Date(now.setMonth(now.getMonth() - 1)))
          _this.date = now;
          _this.hide();
          $(_this.settings.target).val(value);
        }
        if ($(this).hasClass('ui-calendar-three-month')) { //前三月
          var now = new Date();
          var value = _this.setDate(new Date(now.setMonth(now.getMonth() - 3)))

          _this.date = now;
          _this.hide();
          $(_this.settings.target).val(value);
        }
      });

      if (_this.settings.target) {
        $(_this.settings.target).bind('click', function() {
          if ($(this).hasClass('disabled') || $(this).filter('[disabled="true"]').size() > 0) {
            return;
          }
          $(document).trigger('click');
          _this.show();
          return false;
        });
        $(document).click(function() {
          _this.isShow && _this.hide()
        })
      }
      $(document).keydown(function(e) {
        if (e.keyCode === 27) {
          _this.hide();
        }
      });
    },
    actionFlow: function(obj, action) {
      if (obj.siblings('.ui-calendar-flow').length) {
        obj.siblings('.ui-calendar-flow').hide(300, function() {
          obj[action](300);
        });
      } else {
        obj[action](300);
      }
    },
    go: {
      'next-month': function() {
        this.month += 1;
        this.day = 1;
        this._getDate();
        this.formatDate();
        this.renderHeader();
        this.settings.goCallback.call(this, 'next-month', this.date);
      },
      'prev-month': function() {
        this.month -= 1;
        this.day = 1;
        this.changeDate();
        this.settings.goCallback.call(this, 'prev-month', this.date);
      },
      'next-year': function() {
        this.day = 1;
        this.year += 1;
        this.changeDate();
        this.settings.goCallback.call(this, 'next-year', this.date);
      },
      'prev-year': function() {
        this.day = 1;
        this.year -= 1;
        this.changeDate();
        this.settings.goCallback.call(this, 'prev-year', this.date);
      },
      'current-year': function(show) {
        var _this = this;
        $("#" + this.id).find('.date-table').hide();
        $("#" + this.id).find('.month-table').hide();
        if (!this.yearContainer) {
          this.yearContainer = $("#" + this.id).find('.year-table');
          // this.calendarContainer.append(this.yearContainer);
          $('#' + this.id).find(".year-table").append(this.yearContainer);
          _this.actionFlow(_this.yearContainer, 'show');
          this.yearContainer.on('click', 'td', function() {
            var index = $(this).data('value');
            _this.year = index;
            $('[data-role="current-month"]', _this.calendarContainer).trigger('click');
            _this.actionFlow(_this.yearContainer, 'hide');
            if (_this.settings.onlyYM) {
              _this.actionFlow(_this.monthContainer, 'show');
            }
            _this.changeDate();


          });
        } else {
          _this.actionFlow(_this.yearContainer, 'show');
        }
        var yearTen = Math.floor(_this.year / 10);


        //获取年列表
        this.yearContainer.html('');
        var yearStr = '';
        for (var i = 0, l = 10; i < l; i++) {
          var y = yearTen.toString() + i;
          var cls = ' class="available"';

          if (_this.year == y) {
            cls = ' class="available current" ';
          }
          if (i % 4 == 0) {
            yearStr = yearStr + '<tr>'
          }
          yearStr = yearStr + '<td ' + cls + ' data-value="' + y + '"><a class="cell">' + y + '</a></td>'
          if ((i + 1) % 4 == 0) {
            yearStr = yearStr + '</tr>'
          }
        };
        console.log(yearStr);
        this.yearContainer.append(yearStr)
        console.log(this.id);
        this.settings.goCallback.call(this, 'current-year', this.date);
      },
      //获取月列表
      'current-month': function() {
        var _this = this;
        $('#' + this.id).find(".year-table").hide();
        $('#' + this.id).find(".date-table").hide();
        if (!this.monthContainer) {
          this.monthContainer = $("#" + this.id).find('.month-table');
          $('#' + this.id).find(".month-table").append(this.monthContainer);
          if (!_this.settings.onlyYM) {
            _this.actionFlow(_this.monthContainer, 'show');
          }
          this.monthContainer.on('click', 'td', function() {
            var index = $(this).data('value');
            _this.month = index;
            _this.changeDate();
            $('.date-table', this.calendarContainer).show();
            if (!_this.settings.onlyYM) {
              _this.monthContainer.hide();
            } else {
              $(_this.settings.target).val(_this.year.toString() + _this.separator + (_this.month + 1));
              _this.hide();
              _this.settings.selected && _this.settings.selected.call(_this, _this.date, _this.calendarContainer);
            }
          });
        } else if (!this.settings.onlyYM) {
          _this.actionFlow(_this.monthContainer, 'show');
        } else {
          _this.actionFlow(_this.monthContainer, 'show');
        }
        this.monthContainer.html('');
        var monthStr = '<tbody>';
        for (var i = 0, l = this.monthArr.length; i < l; i++) {
          var m = this.monthArr[i];
          var cls = '';
          if (_this.month == i) {
            cls = ' class="current" ';
          }
          if (i % 4 == 0) {
            monthStr = monthStr + '<tr>'
          }
          monthStr = monthStr + '<td ' + cls + ' data-value="' + i + '"><a class="cell">' + m + '</a></td>'
          if ((i + 1) % 4 == 0) {
            monthStr = monthStr + '</tr>'
          }
        };
        monthStr = monthStr + '</tbody>'
        this.monthContainer.append(monthStr);
        this.settings.goCallback && this.settings.goCallback.call(this, 'current-month', this.date);
      }
    },
    changeDate: function() {
      this._getDate();
      this.formatDate();
      this.renderHeader();
    },
    renderHeader: function() {
      $('[data-role="current-month"]', this.calendarContainer).html(this.monthArr[this.month])
      $('[data-role="current-year"]', this.calendarContainer).html(this.year + ' 年');
      var daylist = '';
      for (var i = 0, l = this.dayArr.length; i < l; i++) {
        daylist += '<th>' + this.dayArr[i] + '</th>';
      };
      if (!this.settings.onlyYM) {
        $('.calendar-header', this.calendarContainer).html(daylist);
      }
    },
    _getDate: function() {
      this.date = new Date(this.year, this.month, this.day);
    },
    //获取日期列表
    formatDate: function() {
      var date = this.date || this.defaultDate;
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.day = date.getDate();
      var now = new Date();
      var ndate = new Date(this.year, this.month + 1, 0);
      var dayNum = ndate.getDate();
      var list = '';
      var firstDay = (new Date(this.year, this.month, 1)).getDay();
      var preDate = new Date(this.year, this.month, 0);
      var preDateNum = preDate.getDate();
      var nextDate = new Date(this.year, this.month + 2, 0);
      if (firstDay > 0) {
        list += this._getDay(preDateNum - firstDay + 1, preDateNum, "prev-month", preDate);
      }

      list += this._getDay(1, dayNum, 'available', date);
      var lastDay = (new Date(this.year, this.month, dayNum)).getDay();
      list += this._getDay(1, 6 - lastDay, "next-month", nextDate);
      listArray = list.split('</td>');

      var listStr = '';
      for (var i = 0; i < listArray.length - 1; i++) {

        if (i % 7 == 0) {
          listStr = listStr + '<tr>'
        }
        listStr = listStr + listArray[i] + '</td>';
        if ((i + 1) % 7 == 0) {
          listStr = listStr + '</tr>'
        }
      }
      $('#' + this.id).find(".c_days").html(listStr);
    },
    _toString: function(dateArr) {
      var arr = [];
      var len = dateArr.length;
      for (var i = 0; i < len; i++) {
        var item = dateArr[i];
        if (typeof item === "string") {
          dateArr[i] = new Date(item);
        };
        for (var j = 0; j < i; j++) {
          if (item.getTime() < dateArr[j]) {
            var tmp = dateArr[i];
            dateArr[i] = dateArr[j];
            dateArr[j] = tmp;
          }
        }
      };
      for (var i = 0, l = dateArr.length; i < l; i++) {
        var d = dateArr[i];
        var year = d.getFullYear();
        var month = this._getTowNum(d.getMonth() + 1);
        var day = this._getTowNum(d.getDate());
        arr.push(year + this.separator + month + this.separator + day);
      }
      return arr;
    },

    _getDay: function(startNum, dayNum, cls, date) {
      var list = '';
      var start = this.range[0],
        startDate,
        now = new Date(),
        end = this.range[1],
        endDate;
      if (start) {
        start = new Date(Date.parse(start));
        startDate = +new Date(start.getFullYear(), start.getMonth(), start.getDate());
      };
      if (end) {
        end = new Date(Date.parse(end));
        endDate = +new Date(end.getFullYear(), end.getMonth(), end.getDate());
      }
      for (var i = startNum; i <= dayNum; i++) {
        var className = cls || "";
        var datavalue = date.getFullYear() + this.separator + this._getTowNum(date.getMonth() + 1) + this.separator;
        datavalue += this._getTowNum(i);
        var dataNowvalue = now.getFullYear() + this.separator + this._getTowNum(now.getMonth() + 1) + this.separator;
        dataNowvalue += this._getTowNum(now.getDate());
        var d = new Date(date.getFullYear(), date.getMonth(), i);
        var time = d.getTime();
        //多选
        //console.log(this.dateArr)
        if (this.settings.multiple) {
          if (this._dateInArr(d, this.dateArr)) {
            className += ' current';
          }
        } else
        if (time == +new Date(this.defaultDate.getFullYear(), this.defaultDate.getMonth(), this.defaultDate.getDate())) {
          className += ' current';
        }
        if ((startDate && time < startDate) || (endDate && time > endDate)) {
          className += " disabled";
        }
        if (this.settings.filter && !this.settings.filter(time)) {
          className += " disabled";
        }
        if (datavalue == dataNowvalue) {
          className += " today";
        }


        list += '<td class="' + className + '" data-value="' + datavalue + '">' + i + '</td>';
      };

      return list;
    },
    _dateInArr: function(date, arr) {
      for (var i = arr.length - 1; i >= 0; i--) {
        var item = arr[i];
        var idate = item;
        if (typeof item === "string") {
          var focusDateArr = item.split(this.separator);
          idate = new Date(focusDateArr[0], parseInt(focusDateArr[1]) - 1, focusDateArr[2]);
        }
        if (date.getTime() == idate.getTime()) {
          return true;
          break;
        }
      };
    },

    //清空列表
    _removeDate: function(date, arr) {
      var newArr = [];
      for (var i = arr.length - 1; i >= 0; i--) {
        var item = arr[i];
        var idate = item;
        if (typeof item === "string") {
          var focusDateArr = item.split(this.separator);
          idate = new Date(focusDateArr[0], parseInt(focusDateArr[1]) - 1, focusDateArr[2]);
        }
        if (date.getTime() == idate.getTime()) {
          continue;
        }
        newArr.push(idate);
      };
      this.dateArr = newArr;
    },
    _getTowNum: function(n) {
      return ('0' + n.toString()).substr(-2);
    }
  };
  return Calendar;
});
