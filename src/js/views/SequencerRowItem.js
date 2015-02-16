import TemplateView from 'src/js/views/TemplateView.js';

export default class SequencerRowItem extends TemplateView {

	constructor(parentElement, number) {
		this.name = 'sequencer-row-item';
		this.number = number;
		super(parentElement, {});
	}

	setupElement(fragment) {
		fragment.querySelector('.number').innerHTML = this.number;
	}

	set active(active) {
		this._active = active;
		this.element.classList[this._active ? 'add' : 'remove']('active');
	}

	get active() {
		return this._active;
	}

	destroy() {
		this.element.parentElement.removeChild(this.element);
	}
}