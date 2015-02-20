export default class Sound {

	constructor(model) {
		this.setModel(model);

		let context = new window.AudioContext(),
			oscillator = context.createOscillator(), // Create sound source
			gainNode = context.createGain();

		oscillator.type = 'triangle';
		oscillator.frequency.value = 4 * 440;
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

	play() {
		this.gain = 0.01;
		var now = new Date().getTime(),
			interval = setInterval(() => {
				if (new Date().getTime() >= now + 100) {
					this.gain = 0;
					clearInterval(interval);
				}
			}, 1);

	}

	setModel(model) {
		if (model) {
			this.model = model;
			Object.observe(this.model, this.modelChanged.bind(this));
		}
	}

	modelChanged(changes) {
		this.play();
	}
}