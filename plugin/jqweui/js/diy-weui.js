
/**
 * @author helijun
 * @param $
 */
+ function($) {
  "use strict";

  var defaults;
  
  var show = function(params) {

    var mask = $("<div class='weui_mask weui_actions_mask'></div>").appendTo(document.body);

    var actions = params.actions || [];

    var actionsHtml = actions.map(function(d, i) {
      return '<div class="weui_actionsheet_cell ' + (d.className || "") + '">' + d.text + '</div>';
    }).join("");

    var titleHtml = "";
    
    if (params.title) {
      titleHtml = '<div class="weui_actionsheet_title">' + params.title + '</div>';
    }

    var tpl = '<div class="weui_actionsheet " id="weui_actionsheet">'+
                titleHtml +
                '<div class="weui_actionsheet_menu">'+
                actionsHtml +
                '</div>'+
                '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.find(".weui_actionsheet_menu .weui_actionsheet_cell, .weui_actionsheet_cell").each(function(i, e) {
      $(e).click(function() {
        //$.closeActions();
        params.onClose && params.onClose();
        if(actions[i] && actions[i].onClick) {
          actions[i].onClick();
        }
      })
    });

    mask.show();
    dialog.show();
    mask.addClass("weui_mask_visible");
    dialog.addClass("weui_actionsheet_toggle");
  };

  var hide = function() {
    $(".weui_mask").removeClass("weui_mask_visible").transitionEnd(function() {
      $(this).remove();
    });
    $(".weui_actionsheet").removeClass("weui_actionsheet_toggle").transitionEnd(function() {
      $(this).remove();
    });
  }

  $.actions2 = function(params) {
    params = $.extend({}, defaults, params);
    show(params);
  }

  $.closeActions2 = function() {
    hide();
  }

  $(document).on("click", ".weui_actions_mask", function() {
    $.closeActions2();
  });

  var defaults = $.actions2.prototype.defaults = {
    title: undefined,
    onClose: undefined,
  }

}($);