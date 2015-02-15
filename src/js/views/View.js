export default class View {

	constructor(parentElement, model) {
		this.parentElement = parentElement;
		this.setModel(model);
		this.render(this.parentElement);
	}

	render() {
		console.log("my render");
	}

	setModel(model) {
		this.model = model;
		Object.observe(this.model, this.modelChanged.bind(this));
	}

	modelChanged(changes) {

	}
}

