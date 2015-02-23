import View from 'src/js/views/View.js';
import SequencerRowItem from 'src/js/views/SequencerRowItem.js';

export default class SequencerRow extends View {

	constructor(parentElement, model) {
		this.items = [];
		super(parentElement, model);
	}

	render(el) {
		this.element = document.createElement('div');
		this.element.classList.add('row');
		el.appendChild(this.element);

		this.stepCount = this.model.items.length;
		this.model.items.forEach(function(item, index) {
			this.items.push(new SequencerRowItem(this.element, item, index + 1));
		}, this);
	}

	modelChanged(changes) {
		changes.forEach(function(item) {
			switch (item.name) {
				case 'counter':
					if (this.items) {
						this.items.forEach(function(viewItem, index) {
							viewItem.active = this.model.items[index].active;
						}, this);
					}
					break;

				case 'beatCount':
					let diff = item.oldValue - item.object.beatCount;

					if (diff < 0) { //add
						for (let i = item.oldValue; i < item.object.beatCount; i++) {
							this.items.push(new SequencerRowItem(this.element, this.model.items[i], i + 1));
						}
					} else if (diff > 0) { //remove
						this.items.splice(item.oldValue - 1, diff).forEach(function(item) {
							item.destroy();
						});
					}
					break;
			}
		}, this);
	}
}