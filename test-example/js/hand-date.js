/**
 * 照着网上的时间控件写的
 */
(function($){
    var Calendar = function (elem,options) {
        this.$calendar = elem;
        var _date = new Date();
        this.defaults = {
            year:_date.getFullYear(),
            month:_date.getMonth(),
            date:_date.getDate()
        };
        this.opts = $.extend({},this.defaults,options);
        dateObj.setDate(new Date(this.opts.year,this.opts.month,this.opts.date))
    };
    Calendar.prototype = {
        renderDom:function(){
            this.$calendar.html('');
            this.$contain = $("<div class='calendarContain'></div>");
            this.$calendar.append(this.$contain);
            this.$calendarTitle = $("<div class='calendarTitle'>" +
                "<select class='calendarYear'></select>" +
                "<img src='./images/left-arrow.png' alt='' class='arrow-prev'>" +
                "<select class='calendarMonth'></select>" +
                "<img src='./images/right-arrow.png' alt='' class='arrow-next'>" +
                "<button class='backDay'>返回今天</button></div>");

            this.$calendarBody = $("<div class='calendarBody'>" +
                "<table cellpadding='0' cellspacing='0'><thead></thead><tbody></tbody></table></div>");
            var thead  = "<tr>" +
                "<th>天</th>" +
                "<th>一</th>" +
                "<th>二</th>" +
                "<th>三</th>" +
                "<th>四</th>" +
                "<th>五</th>"+
                "<th>六</th>"+
                "</tr>";
            for(var i=0;i<6;i++){
                var tbody = '';
                tbody += "<tr>" +
                    "<td class='item weekend'></td>" +
                    "<td class='item'></td>" +
                    "<td class='item'></td>" +
                    "<td class='item'></td>" +
                    "<td class='item'></td>" +
                    "<td class='item'></td>" +
                    "<td class='item weekend'></td>" +
                    "</tr>";
                this.$calendarBody.find("tbody").append(tbody);
            }
            this.$contain.append(this.$calendarTitle,this.$calendarBody);
            this.$calendarBody.find("thead").append(thead);
            this.$calendar.show();

        },
        showNum:function(){
            var self = this;
            var year = dateObj.getDate().getFullYear();
            var month =dateObj.getDate().getMonth() + 1;

            var firstDay = new Date(year,month-1,1); //当前月的第一天
            getOption(1,12,'月',this.$month); //获取月份
            getOption(1990,2100,'年',this.$year); //获取年份
            self.$month.val(month+"月");
            self.$year.val(year+"年");


        //    获取日历的日期数字

            self.$item.html("");
            self.$item.each(function(i){
                var allDay = new Date(year,month-1,i + 1  - firstDay.getDay());
                var allDayString = returnDateStr(allDay);
                $(this).attr("data",allDayString);
                if(returnDateStr(new Date(self.opts.year,self.opts.month,self.opts.day)) === allDayString){
                    $(this).addClass("today");
                }
                if(returnDateStr(firstDay).substr(0,6) === allDayString.substr(0,6)){
                    $(this).addClass("currentMonth");
                }else{
                    $(this).addClass("otherMonth");
                }
                var nl = GetCNDate(allDay.getFullYear(),allDay.getMonth(),allDay.getDate());

                var div = "<div class='item-contain'></div>";
                $(this).append(div).find(".item-contain").append("" +
                    "<div>"+allDay.getDate()+"</div><div class='nl'></div><div class='holiday'></div>");


                if(allDay.getMonth() == 0 && allDay.getDate() == 1 && !($(this).hasClass("otherMonth"))){
                    $(this).find(".nl").html("元旦")
                }
                if(allDay.getMonth() == 1 && allDay.getDate() == 14){
                    $(this).find(".nl").html("情人节")
                }
                if(allDay.getMonth() == 4 && allDay.getDate() == 1){
                    $(this).find(".nl").html("劳动节")
                }

            })
        },
        inital:function(){
            var self = this;
            this.renderDom();
            this.$item = this.$calendarBody.find(".item");
            this.$year = this.$calendarTitle.find(".calendarYear");
            this.$month = this.$calendarTitle.find(".calendarMonth");
            this.$arrpw_prev = this.$calendarTitle.find('.arrow-prev');
            this.$arrow_next = this.$calendarTitle.find('.arrow-next');
            this.showNum();


            this.$arrpw_prev.bind("click",function(){
                var _date = dateObj.getDate();
                var dateMonth =  _date.getMonth() - 1;
                dateObj.setDate(new Date(_date.getFullYear(), dateMonth, 1));
                self.showNum();
            });

            this.$arrow_next.bind("click",function(){
                var _date = dateObj.getDate();
                var dateMonth =  _date.getMonth() + 1;
                dateObj.setDate(new Date(_date.getFullYear(), dateMonth, 1));
                self.showNum();
            });

            this.$item.click(function(){
                // var _dateStr = $(this).attr('data');
                // var _date = changingStr(addMark(_dateStr));
                // self.selected_data = $(this).attr('data');
                // dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));
                // self.opts.year = _date.getFullYear();
                // self.opts.month = _date.getMonth();
                // self.opts.day = _date.getDate();
            })
        }
    };
    $.fn.extend({
        calendar:function(options){
            var calendar = new Calendar(this,options);
            calendar.inital()
        }
    });

    var dateObj = (function(){
        var _date = new Date();
        return {
            getDate :function(){
                return _date;
            },
            setDate : function(date){
                _date = date;
            }
        }
    })();

    var getOption = function(min,max,text,ele){
        ele.html("");
        for(var i = min; i <= max; i++){
            var option = "<option value = "+i+""+text+">"+i+""+text+"</option>";
            ele.append(option);
        }
    };
    var returnDateStr = function(date){ //日期转化为字符串
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var getMonth = month < 10 ? "0"+month: ''+month;
        var getDay = day < 10 ? "0"+day:''+day;
        return year+getMonth+getDay;
    };
    function changingStr(fDate) { // 字符串转日期
        var fullDate = fDate.split("-");
        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
    }
    function addMark(dateStr) { // 给传进来的日期字符串加-
        return dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6);
    }
    document.oncontextmenu=function(e){
//取消默认的浏览器自带右键 很重要！！
        e.preventDefault();
    };
})(jQuery);