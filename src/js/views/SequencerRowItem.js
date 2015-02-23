import TemplateView from 'src/js/views/TemplateView.js';
import {
	CircullarSet
}
from 'src/js/Utils.js';

export default class SequencerRowItem extends TemplateView {

	constructor(parentElement, item, number) {
		this.name = 'sequencer-row-item';
		this.item = item;
		this.number = number;
		super(parentElement, {});

	}

	setupElement(fragment) {
		fragment.querySelector('.number').innerHTML = this.number;
		this.update(fragment.querySelector('.level'));

		fragment.addEventListener('click', () => {
			let levelValues = new CircullarSet(0, 0.5, 1);

			this.item.level = levelValues.next(this.item.level);
			this.update(this.element.querySelector('.level'));
		});
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

	update(element) {
		var names = {
			'0': 'off',
			'0.5': 'half',
			'1': 'on'
		};

		element.classList.remove('off');
		element.classList.remove('half');
		element.classList.remove('on');
		element.classList.add(names[this.item.level]);
	}

}