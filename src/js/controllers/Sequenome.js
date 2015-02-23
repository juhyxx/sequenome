import Application from 'src/js/controllers/Application.js';
import Timer from 'src/js/controllers/Timer.js';
import Sequencer from 'src/js/views/Sequencer.js';
import Sounds from 'src/js/views/Sounds.js';
import BeatIndicator from 'src/js/views/BeatIndicator.js';

import {
	q
}
from 'src/js/Utils.js';

export default class Sequenome extends Application {

	constructor() {
		this.timer = new Timer(60, this.onTick.bind(this));
		this.beatModel = {};
		this.beatCount = 4;
	}

	onTick() {
		this.beatModel.counter = this.beatModel.counter < this.beatCount - 1 ? this.beatModel.counter + 1 : 0;
		this.beatModel.items.forEach((item, index) => {
			item.active = index === this.beatModel.counter;
		}, this);
	}

	set beatCount(count) {
		this.beatModel.beatCount = count;
		this.beatModel.on = false;
		this.beatModel.counter = 0;
		this.beatModel.items = [];
		for (let i = 0; i < this.beatCount; i++) {
			this.beatModel.items.push({
				active: false,
				level: 0.5
			});
		}
		this.beatModel.items[0].level = 1;
	}

	get beatCount() {
		return this.beatModel.beatCount;
	}

	registerHandlers() {
		q('#beat-count').addEventListener('change', () =>
			this.beatCount = parseInt(q('#beat-count').value, 10)
		);
		q('#tempo').addEventListener('change', () =>
			this.timer.setTempo(parseInt(q('#tempo').value, 10))
		);
		q('#tap').addEventListener('click', () => {
			if (this.previousTime) {
				let interval = Date.now() - this.previousTime,
					tempo = Math.round(60000 / interval);

				q('#tempo').value = tempo;
				this.timer.setTempo(tempo);
				this.previousTime = undefined;
			}
			this.previousTime = Date.now();
		}, this);
	}

	run() {

		let beatIndicator = new BeatIndicator(q('#beat-indicator'), this.beatModel),
			sequencer = new Sequencer(q('#sequencer'), this.beatModel);
			//sound = new Sounds(this.beatModel);

		sequencer.addTrack();
		sequencer.render();
		this.registerHandlers();
		this.timer.run();

	}
}