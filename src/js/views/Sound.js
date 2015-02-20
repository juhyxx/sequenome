export default class Sound {

	constructor(frequency, context) {
		let
			oscillator = context.createOscillator(),
			gainNode = context.createGain();

		oscillator.type = 'triangle';
		oscillator.frequency.value = frequency;
		oscillator.start(0);

		gainNode.gain.value = 0;

		oscillator.connect(gainNode);
		gainNode.connect(context.destination);

		this.gainNode = gainNode;
	}

	get gain() {
		return this.gainNode.gain.value;
	}

	set gain(gain) {
		this.gainNode.gain.value = gain;
	}

	play(level) {
		this.gain = level || 1;

		var now = new Date().getTime(),
			interval = setInterval(() => {
				if (new Date().getTime() >= now + 100) {
					this.gain = 0;
					clearInterval(interval);
				}
			}, 1);
	}

}