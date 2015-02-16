import Application from 'src/js/controllers/Application.js';
import Timer from 'src/js/controllers/Timer.js';
import Sequencer from 'src/js/views/Sequencer.js';
import BeatIndicator from 'src/js/views/BeatIndicator.js';

export default class Sequenome extends Application {

	onTick() {
		this.beatModel.counter = this.beatModel.counter < this.beatCount - 1 ? this.beatModel.counter + 1 : 0;
		this.beatModel.items = this.beatModel.items.map(function(item, index) {
			return index === this.beatModel.counter;
		}, this);
	}

	set beatCount(count) {
		this.beatModel.beatCount = count;
		this.beatModel.on = false;
		this.beatModel.counter = 0;
		this.beatModel.items = new Array(this.beatCount).fill(false);
	}

	get beatCount() {
		return this.beatModel.beatCount;
	}

	run() {
		this.beatModel = {};
		this.beatCount = 4;

		var timer = new Timer(120, this.onTick.bind(this));
		timer.run();

		document.querySelector('#beat-count').addEventListener('change', function() {
			this.beatCount = parseInt(document.querySelector('#beat-count').value, 10);
		}.bind(this));
		document.querySelector('#tempo').addEventListener('change', function() {
			timer.setTempo(parseInt(this.value, 10));
		});

		document.querySelector('#tap').addEventListener('click', function() {
			if (this.previousTime) {
				let interval = Date.now() - this.previousTime;
				let tempo = Math.round(60000 / interval);
				
				document.querySelector('#tempo').value = tempo;
				timer.setTempo(tempo);
				this.previousTime = undefined;
			}
			this.previousTime = Date.now();
		}, this);
		var beatIndicator = new BeatIndicator(document.querySelector('main'), this.beatModel);
		var sequencer = new Sequencer(
			document.querySelector('#sequencer'), this.beatModel
		);
		sequencer.addTrack();
 		sequencer.render();
	}
}