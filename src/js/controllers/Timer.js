export default class Timer {

	constructor(tempo, callback) {
		this.callback = callback;
		this.setTempo(tempo);
	}
	run() {
		this.interval = setInterval(this._onInterval.bind(this), 10);
		this._start = this._now();
	}

	setTempo(tempo) {
		this.intervalValue = 60000 / tempo;
	}

	_onInterval() {
		if ((this._now() - this._start) >= this.intervalValue) {
			this.callback.call(this);
			this._start = this._now();
		}
	}

	_now() {
		return new Date().getTime();
	}

	end() {
		clearInterval(this.interval);
	}
}