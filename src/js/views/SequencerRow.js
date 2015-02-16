import View from 'src/js/views/View.js';
import SequencerRowItem from 'src/js/views/SequencerRowItem.js';

export default class SequencerRow extends View {

	constructor(parentElement, model) {
		this.items = [];
		super(parentElement, model);
	}

	render(el) {
		this.element = document.createElement('div');
		el.appendChild(this.element);

		this.stepCount = this.model.items.length;
		this.model.items.forEach(function(item, index) {
			this.items.push(new SequencerRowItem(this.element, index + 1));
		}, this);
	}

	modelChanged(changes) {
		changes.forEach(function(item) {
			switch (item.name) {
				case 'items':
					if (this.items) {
						this.items.forEach(function(viewItem, index) {
							viewItem.active = this.model.items[index];
						}, this);
					}
					break;

				case 'beatCount':
					var diff = item.oldValue - item.object.beatCount;

					if (diff < 0) { //add
						for (let i = item.oldValue; i < item.object.beatCount; i++) {
							this.items.push(new SequencerRowItem(this.element, i + 1));
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