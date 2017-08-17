(function() {
  var $;

  $ = jQuery;

  $.bootstrapGrowl = function( message, options, title, icon) {
    var $alert, css, offsetAmount;
    options = $.extend({}, $.bootstrapGrowl.default_options, options);
    $alert = $("<div>");
    $alert.attr("class", "rob-alert-growl");
    if (options.type) {
      $alert.addClass("rob-alert-" + options.type);
    }
    if (options.allow_dismiss) {
      $alert.addClass("rob-alert-dismissible-growl");
      $alert.append("<button  class=\"close\" data-dismiss=\"alert\" type=\"button\"><span aria-hidden=\"true\">&times;</span></button>");
    }



    if(icon && title){
      $alert.append("<div class=\"rob-alert-content-growl\"><div class=\"content-left\"><i class=\"rob-icon-home\"></i></div><div class=\"content-right\"><div class=\"rob-alert-content-title\">"+title+"</div>"+message+"</div></div>");
    }else if(title) {
       $alert.append("<div class=\"rob-alert-content-growl\"><div class=\"rob-alert-content-title\">"+title+"</div>"+message+"</div>");
    }else {
    $alert.append("<div class=\"rob-alert-content-growl\">"+message+"</div>");

    }
    


    if (options.top_offset) {
      options.offset = {
        from: "top",
        amount: options.top_offset
      };
    }
    offsetAmount = options.offset.amount;
    $(".bootstrap-growl").each(function() {
      return offsetAmount = Math.max(offsetAmount, parseInt($(this).css(options.offset.from)) + $(this).outerHeight() + options.stackup_spacing);
    });
    css = {
      "position": (options.ele === "body" ? "fixed" : "absolute"),
      "margin": 0,
      "z-index": "9999",
      "display": "none"
    };
    css[options.offset.from] = offsetAmount + "px";
    $alert.css(css);
    if (options.width !== "auto") {
      $alert.css("width", options.width);
    }
     if (options.minWidth !== "auto") {
      $alert.css("min-width", options.minWidth + "px");
    }
    $(options.ele).append($alert);
    switch (options.align) {
      case "center":
        $alert.css({
          "left": "50%",
          "margin-left": "-" + ($alert.outerWidth() / 2) + "px"
        });
        break;
      case "left":
        $alert.css("left", "20px");
        break;
      default:
        $alert.css("right", "20px");
    }
    $alert.fadeIn();
    if (options.delay > 0) {
      $alert.delay(options.delay).fadeOut(function() {
        //return $(this).alert("close");

        return $(this).remove();
      });
    }
    return $alert;
  };

  $.bootstrapGrowl.default_options = {
    ele: "body",
    //type: "info",
    offset: {
      from: "top",
      amount: 20
    },
    align: "right",
    width: '20%',
    minWidth:280,
    delay: 4000,
    allow_dismiss: true,
    stackup_spacing: 10
  };

}).call(this);