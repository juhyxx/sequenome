import View from 'src/js/views/View.js';

export default class Sequencer extends View {

	constructor(parentElement, model) {
		this.rows = new Set();
		super(parentElement, model);
	}

	render() {
		this.rows.forEach(function(row) {
			row.render(this.parentElement);
		}, this);
	}
}
