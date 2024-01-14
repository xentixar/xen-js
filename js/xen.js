import { checkVariable, drag, fetchData } from "./functions.js";

const draggableElements = document.querySelectorAll('[xen-drag]');
const fetchElements = document.querySelectorAll('[xen-fetch]');
const conditionalElements = document.querySelectorAll('[xen-if]');

draggableElements.forEach(element => {
    drag(element);
})

fetchElements.forEach(element => {
    fetchData(element);
})

conditionalElements.forEach(element => {
    checkVariable(element);
})