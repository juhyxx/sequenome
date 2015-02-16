import View from 'src/js/views/View.js';
import SequencerRow from 'src/js/views/SequencerRow.js';

export default class Sequencer extends View {

	constructor(parentElement, model) {
		this.rows = new Set();
		super(parentElement, model);
	}

	addTrack() {
		this.rows.add(new SequencerRow(this.parentElement, this.model));
	}
	
}