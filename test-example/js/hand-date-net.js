/**
 * Created by Administrator on 2018/5/9 0009.
 */
/**
 * Created by WZH on 2017/7/31.
 */
/**
 * 日历控件
 * v1.0
 */
(function ($) {
    var Calendar = function (elem, options) {
        this.$calendar = elem;
        var _date = new Date();
        this.defaults = {
            ifSwitch: true,
            hoverDate: false,
            backToday: false,
            year:_date.getFullYear(),
            month:_date.getMonth(),
            day:_date.getDate(),
            click:function () {

            }
        };

        this.opts = $.extend({}, this.defaults, options);
        dateObj.setDate(new Date(this.opts.year,this.opts.month,this.opts.day));

    };

    Calendar.prototype = {
        showHoverInfo: function (obj) { // hover 时显示当天信息
            // console.log(obj);
        },

        showCalendar: function () { // 输入数据并显示
            var self = this;
            var year = dateObj.getDate().getFullYear();
            var month = dateObj.getDate().getMonth() + 1;
            var dateStr = returnDateStr(dateObj.getDate());
            var firstDay = new Date(year, month - 1, 1); // 当前月的第一天


            this.$calendarTitle_year.text(year+"年");
            // this.$calendarTitle_month.text( dateStr.substr(4, 2)+"月");

            // console.log( this.$calendarDate_item);
            var month1 = ["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"];
            var select = this.$calendarTitle_select;
            select.html("");
            month1.forEach(function(item,i){
                var option = "<option value="+month1[i]+">"+month1[i]+"</option>";
                select.append(option);
            });
            select.val(dateStr.substr(4, 2)+"月");

            this.$calendarDate_item.each(function (i) {
                // allDay: 得到当前列表显示的所有天数
                var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
                var allDay_str = returnDateStr(allDay);
                console.log(allDay);
                $(this).html('<div class="data-contain"><span class="date" >'+allDay.getDate()+'</span></div>').attr('data', allDay_str);


                if (returnDateStr(new Date(self.opts.year,self.opts.month,self.opts.day)) === allDay_str) {
                    // $(this).attr('class', 'item');
                    $(this).find("span").addClass('active');
                }
                if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) { //本月日期
                    if($(this).hasClass("calendar_weekend")){
                        $(this).addClass('item bg');//周末
                        $(this).html('<div class="data-contain">' +
                            '<span class="date" >'+allDay.getDate()+'</span></div>').attr('data', allDay_str);
                    }else {
                        $(this).attr('class', 'item'); //普通日期
                    }
                } else {
                    $(this).attr('class', 'item bg-no disable');//非本月日期
                }


                var nl = GetCNDate(allDay.getFullYear(),allDay.getMonth()+1,allDay.getDate());
                if(nl == "腊月三十" && ($(this).attr("class").indexOf("bg-no") == -1) ){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">除夕</div></div>').attr('data', allDay_str);
                }
                if(nl == "正月初一" && ($(this).attr("class").indexOf("bg-no") == -1) ){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">春节</div></div>').attr('data', allDay_str);
                }
                if(nl == "一月十五"  && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">元宵</div></div>').attr('data', allDay_str);
                }
                if(nl == "五月初五"  && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">端午节</div></div>').attr('data', allDay_str);
                }
                if(nl == "七月初七"  && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">七夕</div></div>').attr('data', allDay_str);
                }
                if(nl == "八月十五"  && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">中秋节</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 4) && (allDay.getDate() == 1) && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">劳动节</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 0) && (allDay.getDate() == 1) && ($(this).attr("class").indexOf("bg-no") == -1)) {
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">元旦节</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 2) && (allDay.getDate() == 8) && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">妇女节</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 2) && (allDay.getDate() == 12) && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">植树节</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 3) && (allDay.getDate() == 1) && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">愚人节</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 3) && (allDay.getDate() == 5) && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">清明节</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 7) && (allDay.getDate() == 1) && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">建军节</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 9) && (allDay.getDate() == 1) && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">国庆节</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 11) && (allDay.getDate() == 24) && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">平安夜</div></div>').attr('data', allDay_str);
                }
                if ((allDay.getMonth() == 11) && (allDay.getDate() == 25) && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).html('<div class="data-contain"><span class="date">'+allDay.getDate()+'</span><div class="holiday-style">圣诞节</div></div>').attr('data', allDay_str);
                }

                var data= parseInt("0503");
                if($(this).attr("data").substr(4) ==data && ($(this).attr("class").indexOf("bg-no") == -1)){
                    $(this).find(".data-contain").append("<div class='rest'>班</div>")
                }

            });

            // getWR(); //获取工作日或者周末
            // 已选择的情况下，切换日期也不会改变
            if (self.selected_data) {
                var selected_elem = self.$calendar_body.find('[data='+self.selected_data+']');

                selected_elem.addClass('item-selected');
            }
        },

        renderDOM: function () { // 渲染DOM
            this.$calendar.children().remove();
            this.$calendar_title = $('<div class="m-card-head"></div>');
            this.$calendar_body = $('<div class="m-card-body" style="min-height:299px;">' +
                '<div class="pt20 pb20"><table class="aui-table-calendar"><tbody></tbody></table></div></div>');

            this.$calendar_week = $('<tr></tr>');


            var _titleStr = '<div class="m-card-head-title clearfix"><h3 class="title-font year-title"></h3><a href="#" class="fl width15 tc">'+
                '<img src="images/left-arrow.png" class="imgArrow arrow-prev" alt=""></a>'+
                '<select name="" class="fl width70 month-title tc fwn" id="select"></select><a href="#" class="fr width15 tc">'+
                '<img src="images/right-arrow.png" class="imgArrow arrow-next" alt=""></a></div>';
            var _weekStr = '<th width="14%" class="calendar_weekend">日</th>'+
                '<th width="14%" class="">一</th>'+
                '<th width="14%" class="">二</th>'+
                '<th width="14%" class="">三</th>'+
                '<th width="14%" class="">四</th>'+
                '<th width="14%" class="">五</th>'+
                '<th width="14%" class="calendar_weekend">六</th>';

            this.$calendar_week.html(_weekStr);
            this.$calendar_body.find("tbody").append(this.$calendar_week);
            for (var i = 0; i < 6; i++) {
                var _dateStr = '';
                _dateStr += '<tr>' +
                    '<td class="item bg-no calendar_weekend"><span></span></td>'+
                    '<td class="item bg-no "><span></span><span class="holiday"></span></td>'+
                    '<td class="item bg-no"><span></span></td>'+
                    '<td class="item bg-no"><span></span></td>'+
                    '<td class="item bg-no"><span></span></td>'+
                    '<td class="item bg-no"><span></span></td>'+
                    '<td class="item bg-no calendar_weekend"><span>55</span></td></tr>';
                this.$calendar_body.find("tbody").append($(_dateStr));
            }
            this.$calendar_title.html(_titleStr);

            this.$calendar.append(this.$calendar_title,this.$calendar_body);
            this.$calendar.show();
        },

        inital: function () { // 初始化
            var self = this;
            this.renderDOM();
            this.$calendarTitle_year = this.$calendar_title.find('.year-title');
            this.$calendarTitle_month = this.$calendar_title.find('.month-title');
            this.$calendarTitle_select = this.$calendar_title.find('#select');
            this.$backToday = $('#backToday');
            this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
            this.$arrow_next = this.$calendar_title.find('.arrow-next');
            this.$calendarDate_item = this.$calendar_body.find('.item');

            this.selected_data = 0;

            this.showCalendar();

            if (this.opts.ifSwitch) {
                this.$arrow_prev.bind('click', function () {
                    var _date = dateObj.getDate();
                    console.log(_date);
                    var dateMonth = _date.getMonth() - 1;
                    if(dateMonth == -1){
                        dateMonth = 11;
                    }
                    dateObj.setDate(new Date(_date.getFullYear(),dateMonth, 1));
                    self.showCalendar();
                });

                this.$arrow_next.bind('click', function () {
                    var _date = dateObj.getDate();
                    var dateMonth =  _date.getMonth() + 1;
                    if(dateMonth == 12){
                        dateMonth = 0;
                    }
                    var a = dateObj.setDate(new Date(_date.getFullYear(), dateMonth, 1));

                    self.showCalendar();
                });
                this.$calendarTitle_select.bind('change',function(){
                    var _date = dateObj.getDate();
                    var dateMonth = parseInt($(this).val().substr(0,2))-1;
                    dateObj.setDate(new Date(_date.getFullYear(),dateMonth, 1));
                    self.showCalendar();
                })
            }

            this.$calendarDate_item.hover(function () {
                self.showHoverInfo($(this));
            });

            this.$calendarDate_item.click(function () {

                var _dateStr = $(this).attr('data');
                var _date = changingStr(addMark(_dateStr));
                var $curClick = null;
                self.selected_data = $(this).attr('data');

                dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));
                self.opts.year = _date.getFullYear();
                self.opts.month = _date.getMonth();
                self.opts.day = _date.getDate();
                // console.log(self.opts.year,self.opts.month,self.opts.day);

                if ($(this).hasClass('bg-no')) {
                    // self.showCalendar();
                }

                $curClick = self.$calendar_body.find('[data='+_dateStr+']');
                if (!$curClick.find("span").hasClass('active')) {
                    self.$calendarDate_item.find("span").removeClass('active1');
                    if(!$(this).hasClass("disable")){
                        $curClick.find("span").addClass('active1');
                    }
                }else{
                    self.$calendarDate_item.find("span").removeClass('active1');
                }
                if(typeof self.opts.click == "function"){
                    self.opts.click(self.selected_data);
                }
            });
        },
        constructor: Calendar

    };

    $.fn.extend({
        defaultOptions:{

        },
        calendar:function (options) {
            var calendar = new Calendar(this, options);

            calendar.inital();
            this.defaultOptions = $.extend({},this.defaultOptions,options);
            return this.each(function () {
            });
        }
        // setDate:function (year,month,day) {
        //     this.defaultOptions.year = year;
        //     this.defaultOptions.month = month-1;
        //     this.defaultOptions.day = day;
        //     var calendar = new Calendar(this,this.defaultOptions);
        //     calendar.inital();
        //     return this.each(function () {
        //     });
        // }
    });


    // ========== 使用到的方法 ==========

    var dateObj = (function () {
        var _date = new Date();

        return {
            getDate: function () {
                return _date;
            },

            setDate: function (date) {
                _date = date;
            }
        }
    })();

    function returnDateStr(date) { // 日期转字符串
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        month = month <= 9 ? ('0' + month) : ('' + month);
        day = day <= 9 ? ('0' + day) : ('' + day);

        return year + month + day;
    };

    function changingStr(fDate) { // 字符串转日期
        var fullDate = fDate.split("-");

        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
    };

    function addMark(dateStr) { // 给传进来的日期字符串加-
        return dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6);
    };

    var getWR = new Promise(function (resolve, reject) {
        $.ajax({
            url:"js/rest.json",
            success:function(data){
                resolve(data)
            }
        });

    });
    Promise.all([getWR]).then(function (results) {
       return getWR; // 获得一个Array: ['P1', 'P2']
    });
    // 条件1：年份必须要能被4整除
    // 条件2：年份不能是整百数
    // 条件3：年份是400的倍数
    function isLeapYear(year) { // 判断闰年
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }
    document.oncontextmenu=function(e){
//取消默认的浏览器自带右键 很重要！！
        e.preventDefault();
    };




})(jQuery);