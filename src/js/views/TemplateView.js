import View from 'src/js/views/View.js';

export default class TemplateView extends View {

    constructor(parentElement, model) {
        super(parentElement, model);
    }

    get element() {
        return this._element;
    }

    set name(name) {
        this._name = name;
    }

    setupElement(fragment) {

    }

    render(parent) {
        let templateFile = document.querySelector('link[rel="import"]').import,
            template = templateFile.querySelector('template#' + this._name).content,
            node = document.importNode(template, true);

        this._element = node.firstElementChild;
        this.setupElement(node.firstElementChild);
        this.parentElement.appendChild(node);
        this.element.classList.add(this.name);
    }

}