import TemplateView from 'src/js/views/TemplateView.js';

export default class BeatIndicator extends TemplateView {

	constructor(parentElement, model) {
		this.name = 'beat-indicator';
		super(parentElement, model);
		this.updateView();
	}

	setupElement(element) {
		element.classList.add('on');
	}

	modelChanged(changes) {
		this.updateView();
	}

	updateView() {
		var element = this.getElement();
		element.classList.toggle('on');
		element.innerHTML = this.model.counter + 1;
	}
}