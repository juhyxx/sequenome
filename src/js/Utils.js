export function q(expression, parent) {
	return (parent || document).querySelector(expression);
}

export class CircullarSet {
	constructor() {
		this.items = [].slice.call(arguments);
		this.index = 0;
	}

	next(value) {
		if (value) {
			var index = this.items.indexOf(value);

			this.index = index > 0 ? index : 0;
		}
		this.index++;
		this.index = this.index === this.items.length ? 0 : this.index;
		return this.items[this.index];
	}

}