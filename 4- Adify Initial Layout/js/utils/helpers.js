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
/*
 *** Function That returns month
 */
function subtractMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);

    return date;
}
function addMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() + numOfMonths);

    return date;
}
/*
 *** Function That returns days
 */
function subtractDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);

    return date;
}
function addDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() + numOfDays);

    return date;
}
/*
 *** Function That returns item from localStorage
 */
function getItemFromLocalStorage(key) {
    let itemName = localStorage.getItem(key);
    return itemName || null;
}
function setItemInLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
/*
 *** Function That returns serialized form
 *** https://gomakethings.com/serializing-form-data-with-the-vanilla-js-formdata-object
 */
var serializeForm = function (form) {
    var obj = {};
    var formData = new FormData(form);
    for (var key of formData.keys()) {
        obj[key] = formData.get(key);
    }
    return obj;
};
