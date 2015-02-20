export function q(expression, parent) {
	return (parent || document).querySelector(expression);

}