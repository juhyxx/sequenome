import Timer from 'src/js/controllers/Timer.js';
import Sequencer from 'src/js/views/Sequencer.js';
import SequencerRow from 'src/js/views/SequencerRow.js';
import BeatIndicator from 'src/js/views/BeatIndicator.js';

export default class Application {

	constructor() {

	}

	run() {
		var beatModel = {
				on: false,
				counter: 0
			},
			timer = new Timer(120, function() {
				beatModel.counter = beatModel.counter < 3 ? beatModel.counter + 1 : 0;
			});

		timer.run();

		document.querySelector('#tempo').addEventListener('change', function() {
			console.log("test");
			timer.setTempo(parseInt(this.value, 10));
		});
		var beatIndicator = new BeatIndicator(document.querySelector('body'), beatModel);

		/*var sequencer = new Sequencer(
			document.querySelector('#sequencer'), {}
		);

		for (var i = 0; i < 10; i++) {
			sequencer.rows.add(new SequencerRow());
		}
		sequencer.render();*/

	}
}