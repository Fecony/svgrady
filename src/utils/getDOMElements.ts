/**
 * Search for elements with provided selector as data attribute
 *
 * @param {string} selector
 * @returns {NodeListOf<HTMLElement>} Array of Node HTMLElements
 */
export default function getDOMElements(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(`[data-${selector}]`)
}
