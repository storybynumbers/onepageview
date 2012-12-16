/**
 * Relates two views together for one page scrolling pattern.
 */
(function($, Drupal, window, document, undefined) {

  var methods = {
    init : function( options ) {

      var settings = $.extend( {
        rowClass: '.views-row',
        rowItemPrefix: '.views-row-',
        menu: '#sidebar-first',
        content: '#block-system-main',
        wayPointOptions: {
          offset: '25%',
        },
        scrollToOptions: {
          duration: 500,
          easing: 'easeInCubic',
          // should be the negative value of wayPointOptions offset:
          offset: $(window).height() * .25 * -1,
        },
      }, options);

      var $menu = $(settings.menu);
      var $content = $(settings.content);

      // Regex will search for prefix + number.  This is standard Drupal Views output.
      var rowItemPrefixRegex = new RegExp(settings.rowItemPrefix.substr(1) + "\\d");

      // scrollTo correct position in $content when a link in $menu is clicked.
      $menu.on("click", "a", function(event) {
        event.preventDefault();
        event.stopPropagation()
        var $selectedRow = ($(this).parentsUntil($menu).filter(settings.rowClass));
        var targetClass = getIndexedClass($selectedRow);
        var $target = $(settings.content + ' .' + targetClass);
        $.scrollTo($target, settings.scrollToOptions);
      })

      // Add/remove classes to mark current menu item.
      var makeMenuActive = function(element) {
        if (!element instanceof jQuery) {
          element = $(element);
        }
        $menu.find(settings.rowClass).removeClass('active');
        $(element).addClass('active');
      }

      // Given DOM element, will return the class that matches rowItem regex
      var getIndexedClass = function($target) {
        var classes = $target.attr('class').split(/\s+/);
        classes = classes.filter(function(element) {
          return rowItemPrefixRegex.test(element);
        });
        return classes.pop();
      }

      // Waypoint registration.
      $content.find(settings.rowClass).waypoint(function(event, direction) {

        // If direction is up, we want the previous element,
        // not the one returned by waypoint.
        if (direction == 'up') {
          var $target = $(this).prev().length == 0 ? $(this) : $(this).prev();
        }
        else {
          var $target = $(this);
        }
        var targetClass = getIndexedClass($target);
        //console.log(targetClass + ' (' + direction + ')');
        $menu.find('.' + targetClass).each(function(i, e) {
           makeMenuActive(e);
        });

      }, settings.wayPointOptions);

    },
  };

  $.fn.onepageViews = function( method ) {

    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.onepageViews' );
    }

  };

})(jQuery, Drupal, this, this.document);
