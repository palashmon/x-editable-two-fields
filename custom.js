/**
  Custom editable with two input fields, Years & Days
  Internally value stored as { year: "1", days: "35" }
**/
(function ($) {
    "use strict";

    var Custom = function (options) {
        this.init('address', options, Custom.defaults);
    };
  
    // Inherit from Abstract input
    $.fn.editableutils.inherit(Custom, $.fn.editabletypes.abstractinput);

    $.extend(Custom.prototype, {
        
        /**
          Renders input from tpl
          @method render() 
        **/
        render: function () {
            this.$input = this.$tpl.find('input');
        },
        
        /**
          Default method to show value in element. Can be overwritten by display option.        
          @method value2html(value, element) 
        **/
        value2html: function (value, element) {
            if (!value) {
                $(element).empty();
                return;
            }
            var html = $('<div>').text(value.years).html() + 'y ' + $('<div>').text(value.days).html() + 'd';
            $(element).html(html);
        },
        
        /**
          Gets value from element's html        
          @method html2value(html) 
        **/
        html2value: function () {
            return null;
        },
        
        /**
          Converts value to string. 
          It is used in internal comparing (not for sending to server).        
          @method value2str(value)  
        **/
        value2str: function (value) {
            var str = '';
            if (value) {
                for (var k in value) {
                    str = str + k + ':' + value[k] + ';';
                }
            }
            return str;
        },
        
        /**
          Converts string to value. Used for reading value from 'data-value' attribute.        
          @method str2value(str)  
        **/
        str2value: function (str) {
            return str;
        },
        
        /**
          Sets value of input.        
          @method value2input(value) 
          @param {mixed} value
        **/ 
        value2input: function (value) {
            if (!value) {
                return;
            }
            this.$input.filter('[name="years"]').val(value.years);
            this.$input.filter('[name="days"]').val(value.days);
        },
        
        /**
          Returns value of input.        
          @method input2value() 
        **/ 
        input2value: function () {
            return {
                years: this.$input.filter('[name="years"]').val(),
                days: this.$input.filter('[name="days"]').val()
            };
        },
        
        /**
          Activates input: sets focus on the first field.        
          @method activate() 
        **/
        activate: function () {
            this.$input.filter('[name="years"]').focus();
        },
        
        /**
          Attaches handler to submit form in case of 'showbuttons=false' mode        
          @method autosubmit() 
        **/ 
        autosubmit: function () {
            this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        }
    });

    Custom.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: `<div class="editable-custom">
                <label>
                  <span>Years: </span>
                  <input type="text" name="years" class="input-medium">
                </label>
              </div>
              <div class="editable-custom">
                <label>
                  <span>Days: </span>
                  <input type="text" name="days" class="input-medium">
                </label>
              </div>`,
        inputclass: ''
    });

    $.fn.editabletypes.custom = Custom;

}(window.jQuery));
