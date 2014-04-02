Accessible implementation of TodoMVC using EmberJs
==================================================

This is an attempt at making a TodoMVC version with more complete keyboard accessibility and screen reader context.

The main enhancements are:
  - labels correctly associated with input fields
  - edit and remove buttons are focusable
  - editing and removing an item set focus appropriately
  - changing routes sets focus to the first item in the list
  - links and buttons have more context available to screen readers


Known issues:
 - sometimes focusing an item doesn't work (in all cases; switching routes, editing an item, deleting an item)
 - crossbrowser issues with focus styling
 - focus and hover states should match up better, or focus state should be less obtrustive
 - maybe some aria to notify the user when some actions occur, such as clearing the list
 - code cleanup to be more idiomatic 
