/*
 *** Function That get all sibling elements
 */
function get_sibling(element, selector) {
  let parentElement = element.parentElement;
  if (!parentElement) return false;
  parentElement = parentElement.querySelector(selector);
  return parentElement;
}
/*
 *** Function That returns closest dedicated element
 */
function get_closest_element(element, selector) {
  let wrapper = element.closest(selector);
  if (!wrapper) return false;
  return wrapper;
}
