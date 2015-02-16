import TemplateView from 'src/js/views/TemplateView.js';

export default class SequencerRowItem extends TemplateView {

	constructor(parentElement) {
		this.name = 'sequencer-row-item';
		super(parentElement, {});
	}

	set active(active) {
		this._active = active;
		this.element.checked = this._active;
	}

	get active() {
		return this._active;
	}

	destroy() {
		this.element.parentElement.removeChild(this.element);
	}
}