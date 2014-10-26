function checkValidMediaWikiPage(){
  if(document.getElementsByName("generator")[0]){
    if(document.getElementsByName("generator")[0].attributes["content"].value.indexOf("MediaWiki") > -1){
      return true;
    }
  }
  return false;
}

// For rotating the bullet pointer for Sections
$.fn.animateRotate = function(curAngle, angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg: curAngle}).animate({deg: angle}, args);
    });
};

// For QuickSelect
function selectText(element) {
    var doc = document
        , text = element
        , range, selection
    ;    
    if (doc.body.createTextRange) { //ms
        range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { //all others
        selection = window.getSelection();        
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function insertToolbox(){
  var toolbox_html = "\
    <div id='tools' class='navbar navbar-fixed-top navbar-inverse'>\
      <div class='navbar-header'>\
        <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-ex1-collapse'>\
          <span class='sr-only'>Toggle navigation</span>\
          <span class='icon-bar'></span>\
          <span class='icon-bar'></span>\
          <span class='icon-bar'></span>\
        </button>\
        <span id='wiki-it-brand' class='navbar-brand' href='http://wiki-it.thewebopsclub.org/'>Wiki-It</span>\
      </div>\
      <div class='collapse navbar-collapse navbar-ex1-collapse'>\
        <form id='tools-form' class='navbar-form center'>\
          <div class='form-group'>\
            <p class='navbar-text' style='margin:auto;'>\
            <label class='checkbox-inline' title='Remove Table of Contents'>\
              <input type='checkbox' name='toc' id='cb_toc'> Table of Contents\
            </label>\
            <label class='checkbox-inline' title='Remove hyperlinks'>\
              <input type='checkbox' name='hl' id='cb_hl'> Hyperlinks\
            </label>\
            <label class='checkbox-inline' title='Remove citations'>\
              <input type='checkbox' name='ct' id='cb_ct'> Citations\
            </label>\
            <label class='checkbox-inline' title='Remove link to related articles'>\
              <input type='checkbox' name='rl' id='cb_rl'> Links to related articles\
            </label>\
            <label class='checkbox-inline' title='Remove images'>\
              <input type='checkbox' name='img' id='cb_img'> Images\
            </label>\
            <label class='checkbox-inline' title='Remove Mathematical Equations'>\
              <input type='checkbox' name='img' id='cb_eqn'> Equations\
            </label>\
            <label class='checkbox-inline' title='Remove side information box'>\
              <input type='checkbox' name='vn' id='cb_vn'> Side Box\
            </label>\
            <label class='checkbox-inline' title='Remove tables'>\
              <input type='checkbox' name='tb' id='cb_tb'> Tables\
            </label>\
            </p>\
          </div>\
          <button class='btn btn-default pull-right' type='button' id='finish'> Generate Final View </button>\
        </form>\
      </div>\
    </div>\
    <form id='upload-form' target='_blank' action=\"http://wiki-it.thewebopsclub.org/upload_new/\" method=\"POST\" style='opacity:0;height:0px;'>\
      <textarea id='htmlcode' name='html' rows='1' cols='1'>\
      </textarea>\
      <input type='text' id='filename' name='filename' />\
    </form>\
    <div id='spacer' style='height:40px;'></div>";
    $("#content").prepend(toolbox_html);
    $("#content").css({"margin-left":"0px"});
}

function wiki_it_tour(){
  window.scrollTo(0,0);
  tour = new Tour({
          name: "tour",
          container: "body",
          keyboard: true,
          storage: window.localStorage,
          debug: true,
          backdrop: true,
          redirect: true,
          orphan: true,
          basePath: "",
          template: "<div class='popover tour'>\
                       <div class='arrow'></div>\
                       <h3 class='popover-title'></h3>\
                       <div class='popover-content'></div>\
                       <nav class='popover-navigation'>\
                         <div class='btn-group'>\
                           <button class='btn btn-default' data-role='prev'>« Prev</button>\
                           <button class='btn btn-default' data-role='next'>Next »</button>\
                       </div>\
                       <button class='btn btn-default' data-role='end'>End tour</button>\
                       </nav>\
                     </div>"
  });
  $(".thumb")[0].id = 'firstImg';
  $(".section-icon")[0].id = 'firstSec';
  tour.addSteps([
    {
      element: "#wiki-it-brand",
      placement: "bottom",
      title:   "Wiki-It 2.0",
      content: "A short tour of Wiki-It to get you upto speed with the latest features of this powerful chrome extension"
    },
    {
      element: "#tools-form",
      placement: "bottom",
      title:   "Upgraded Toolbox",
      content: "Tick the types of elements you want to remove. Uncheck the boxes to revert. Give it a try."
    },
    {
      element: "#firstImg",
      placement: "left",
      title:   "Selectively remove specific images",
      content: "Move your mouse over an image to see a '&bull;' button appear on the top-left corner. Click this to toggle between removing or retaining this specific image."
    },
    {
      element: "#firstSec",
      placement: "top",
      title: "Intuitive Section chooser",
      content: "The new intuitive triangular bullet pointer lets you keep or remove sections with ease."
    },
    {
      placement: "bottom",
      title: "Auto Hidden Sections",
      content: "'See Also', 'References', 'External Links' and 'Further Reading' sections are automatically hidden at the beginning since they are least likely to be retained. But you can choose to retain them."
    },
    {
      element: "#para0",
      placement: "bottom",
      title: "Introducing QuickSelect",
      content: "Want to select a specific paragraph to the clipboard? Lazy to click and drag? With Wiki-it, it becomes simpler! Just click on it."
    },
    {
      element: "#finish",
      placement: "bottom",
      title: "Create PDF",
      content: "Satified with how the customized page looks? Click here to get your PDF"
    }
  ]);
  tour.start();
}

function initialise_wiki_it(){

  if(!checkValidMediaWikiPage()){
    alert("This page does not seem to use MediaWiki formatting. Wiki-It is for wikis that use MediaWiki formatting like Wikipedia.");
    location.reload();
    return false;
  }
  $("body").find(":not(#content)").hide();
  $("#content").parents().show();
  $("#content").find("*").show();
  $("#siteSub").hide();
  $(".mw-editsection").hide();
  $(".dablink").hide();
  $(".metadata").hide();
  $(".catlinks").hide();
  $(".messagebox").hide();
  $(".navbox").hide();
  $("#siteNotice").hide();
  $(".articleFeedbackv5").hide();
  $(".portal").hide();
  if($("#tools").length == 0){
    insertToolbox();
  }
  
  // For wrapping the different sections/sub-sections using DIV elements for easier handling
  $(".mw-headline").each(function(index){
    var _this = $(this).parent();
    var tag = _this.prop("tagName");
    var next = _this.nextUntil(tag);
    var name = $(this).attr('id');
    if(name == 'See_also' || name == 'References' || name == 'Notes' || name == 'External_links' || name == 'Further_reading'){
      _this.prepend("<button class='btn btn-link show-hide' title='Show/Hide this section'><p class='section-icon'>▼</p></button>");
      _this.find(".section-icon").animateRotate(0,-90);
      next.wrapAll("<div class='sections' style='display:none;' id='section_"+$(this).attr('id')+"' />");
    }else{
      _this.prepend("<button class='btn btn-link show-hide' title='Show/Hide this section'><p class='section-icon'>▼</p></button>");
      next.wrapAll("<div class='sections' id='section_"+$(this).attr('id')+"' />");
    }
  });
  
  // a Span tag containing the same text as the hyperlink is created so that it can replace the A tag.
  $("a:not(.image)").each(function(){
    var text = $(this).html();
    $("<span class='linkText' style='display:none;'>"+text+"</span>").insertAfter(this);
  });
  
  // For Images
  $(".image").each(function(){
    $(this).prepend("<button class='btn btn-link img-close' title='Remove this picture'>&bull;</button>");
  });
  
  // For indexing Paragraphs
  $("p:not(.section-icon,.navbar-text)").each(function(index,e){
    e.id = "para"+index;
  });

  $(document).ready(function(){

    if(window.location.href.indexOf('wikipedia.org/wiki')>-1){
    
      wiki_it_tour();
    }

    /* UI related scripts */
    // Include on hover close button for images
    $(".thumb").hover(function(){
      $(this).find(".img-close").show();
    },function(){
      $(this).find(".img-close").hide();
    });
    
    // Remove specific Images
    $(".img-close").click(function(){
      var _img = $(this).next();
      if(_img.hasClass("disabledImg")){
        _img.animate({opacity:'1.0'});
        _img.removeClass("disabledImg");
      }else{
        _img.animate({opacity:'0.1'});
        _img.addClass("disabledImg");
      }
      return false;
    });
    
    // Remove Table of Contents Checkbox
    $("#cb_toc").click(function(){
      $("#toc").toggle(!$(this).is(":checked"));
    });
    
    // Remove Citations checkbox
    $("#cb_ct").click(function(){
      $(".reference").toggle(!$(this).is(":checked"));
    });
    
    // Remove Links to related articles
    $("#cb_rl").click(function(){
      $(".rellink").toggle(!$(this).is(":checked"));
    });

    // Remove Hyperlinks
    $("#cb_hl").click(function(){
      if($(this).is(":checked")){
        $("a:not(.image)").hide();
        $(".linkText").show();
      }else{
        $("a:not(.image)").show();
        $(".linkText").hide();
      }
    });
    
    // Remove Tables
    $("#cb_tb").click(function(){
      $(".wikitable").toggle(!$(this).is(":checked"));
    });
      
    // Remove All Images
    $("#cb_img").click(function(){
      $(".thumb").slideToggle("slow");
    });
    
    // Remove Equations
    $("#cb_eqn").click(function(){
      $(".tex").slideToggle("slow");
    });
    
    // Remove Side boxes
    $("#cb_vn").click(function(){
      $(".vertical-navbox,.infobox").toggle(!$(this).is(":checked"));
    });

    // For accordion like sections
    $(".show-hide").click(function(){
      var _icon = $(this).children('.section-icon'); 
      var _state = $(this).parent().next().is(':hidden');
      $(this).parent().next().slideToggle("slow");
      if(!_state){
        _icon.animateRotate(0,-90);
      }else{
        _icon.animateRotate(-90,0);
      }
    });
    
    $("p,li").click(function(e){
      selectText(e.target);
    });
      
    // For generating the final view
    $("#finish").click(function(){
      try{
        tour.end();
      }catch(err){}
      $(".disabledImg").each(function(){
        if($(this).parents(".thumbimage").length){
          if($(this).parents(".thumbinner").children().length == 1){
            $(this).parents(".thumb").remove();
          }else{
            $(this).parents(".thumbimage").parent().remove();
          }
        }else{
          $(this).parents(".thumb").remove();
        }
      });
      $("#spacer").hide();
      $("#tools").hide();
      $(".printfooter").hide();
      $(".sections:hidden").prev().hide();
      $(".show-hide").hide();
      $("body").find(":hidden").remove();
      $("#htmlcode").text($("html").html());
      $("#filename").attr('value',document.title);
      $("#upload-form").hide();
      $("#upload-form").submit();
    });
  });
}
if(!$("#wiki-it-brand").length){
  initialise_wiki_it();
}
