export default class SequencerRow {

	constructor() {

	}

	render(el) {
		var html = ['<div>'];

		for (var i = 0; i < 16; i++) {
			html.push('<input type="checkbox">');
		}
		html.push('</div>');
		el.insertAdjacentHTML('afterend', html.join(''));

	}
}