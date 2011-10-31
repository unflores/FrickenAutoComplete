//derp The plan for text search will be:
//wait for three characters, return list.
//use javascript to deal with narrowing results from there
(function( $, undefined ) {
  $.fn.auto_complete = function() {
    var $auto_complete  = this,
        tags = [],
        _key = { 
          'enter':              13,
          'tab':                9,
          'backspace':          8
         };
    
    var methods = {
        //builds the box that contains all of the chosen tags
        buildChosen : function() {
          tags = $auto_complete.attr('value').replace(/(, )/g,',').split(',');
          var $chosen = $(methods.chosen(tags));
          methods.set_keypress_handlers();
          $auto_complete.after($chosen);
        },
        set_keypress_handlers : function(){
          $('.auto_term').live('keydown', function(event) {
            var $auto_term = $(this);
            //if no text in input, then focus on previous term
            if (event.keyCode == _key.backspace && $auto_term.val().length == 0) {
              $auto_term.parent('.next').prev().find('.tag').focus();
            }
            
            // if (event.keyCode != _key.downarrow && event.keyCode != _key.uparrow && event.keyCode!= _key.leftarrow && event.keyCode!= _key.rightarrow && etext.length > options.input_min_size) {
            //   load_feed(etext);
            //   complete.children(".default").hide();
            //   feed.show();
            // }
          });
          
          $('.auto_complete .selector .tag').live('keydown', function(event) {
              if(event.keyCode == _key.backspace){
                methods.removeTag($(this).attr('data-tag'));
              }
          });
        },
        //template for the tags which have been chosen
        chosen : function(tags) {
          var li = "";
          for(var i=0; i < tags.length; i++) {
            li += "<li>"+
                  " <a class='tag' href='#' data-tag='" + tags[i] + "'>" + tags[i] + "</a>"+
                  " <a class='auto_select_remove' href='#'>x</a>"+
                  "</li>";
          }
          return ''                                                                      +
          '<div class="auto_complete">'                                                  +
          '  <ul class="selector">'                                                      +
              li                                                                         +
          '  <li class="next"><input class="auto_term" value="" autocomplete="off"/></li>'  +
          '  </ul>'                                                                      +
          '</div>';
        },
        removeTag : function(tag) {
          var remove_index = tags.indexOf(tag),
              removed;
          
          if(remove_index >= 0) { 
            removed = tags.splice(remove_index, 1);
            $selector_tag = $('.auto_complete .selector li [data-tag="' + tag + '"]');
            $selector_tag.parent().remove();
            $('.next').prev().find('.tag').focus();
          }
          
        },
        setupHandlers : function() {
          $('.auto_complete').bind('click', function(clickEvent){
            var $clicked = $(clickEvent.target);
            if($clicked.hasClass('auto_select_remove')) {
              methods.removeTag($clicked.parent().find('span').text());
            } else {
              $(".selector .next input").focus();
            }
            return false;
          });
        },
        init : function() {
          methods.buildChosen();
          methods.setupHandlers();
        }
        
        
      };
    
    return this.queue( function() {
      methods.init();
      
    });
  }
}
)(jQuery);