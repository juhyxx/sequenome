import Sound from 'src/js/views/Sound.js';

export default class Sounds {

	constructor(model) {
		this.setModel(model);

		let context = new window.AudioContext();

		this._highTone = new Sound(440 * 6, context);
		this._lowTone = new Sound(440 * 4, context);
	}

	play(item) {
		if (item.level === 1) {
			this._highTone.play(1);
		} else if (item.level === 0.5) {
			this._lowTone.play(0.1);
		}
	}

	setModel(model) {
		if (model) {
			this.model = model;
			Object.observe(this.model, this.modelChanged.bind(this));
		}
	}

	modelChanged(changes) {
		this.play(this.model.items[this.model.counter]);
	}
}