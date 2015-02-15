import View from 'src/js/views/View.js';

export default class TemplateView extends View {

	constructor(parentElement, model) {
		super(parentElement, model);
	}
	
	getElement() {
		return this.element;
	}

	setupElement(fragment) {

	}

	render(parent) {
		var templateFile = document.querySelector('link[rel="import"]').import,
			template = templateFile.querySelector('template#' + this.name).content,
			node = document.importNode(template, true);

		this.element = node.firstElementChild;
		this.setupElement(node.firstElementChild);
		this.parentElement.appendChild(node);
		this.element.classList.add(this.name);
	}

}