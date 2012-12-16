jquery.onepageView()
====================

(not yet documented... coming soon!)

This jQuery plugin relates two Drupal Views together, one as the menu, the other as a long list of content.  Clicking on a menu item will scroll the browser to the DOM element with a corresponding numbered class.

### Requirements

- jQuery.ScrollTo
- jQuery.wayPoints
- jQuery.easing.js

### Sample usage

	$().onepageViews({
		menu: ".view-id-navigation",
		content: ".view-id-maincontent"
	});

### Options

- rowClass
- rowItemPrefix
- menu
- content
- wayPointOptions
- scrollToOptions
