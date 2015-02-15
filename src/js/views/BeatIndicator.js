import View from 'src/js/views/TemplateView.js';

export default class BeatIndicator extends View {

	constructor(parentElement, model) {
		this.name = 'beat-indicator';
		super(parentElement, model);
	}

	setupElement(element) {
		element.classList.add('on');
	}

	modelChanged(changes) {
		var element = this.getElement();
		element.classList.toggle('on');
		element.innerHTML = changes[0].object.counter + 1;
	}
}