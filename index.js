import { tokTypes } from 'acorn';

function extractPath(parser) {
	const pathStr = [];

	do {
		const { input, start, end } = parser;
		pathStr.push(input.substring(start, end));
		parser.next.call(parser);
	} while (!parser.eat.call(parser, tokTypes.parenR));

	return pathStr.join('');
}

function existentialPlugin(parser, options) {
	parser.extend(
		'parseMaybeAssign',
		function(nextMethod) {
			return function() {
				const { input, start, end } = this;
				const isTry = input.substring(start, end) === 'try';
				if (isTry) {
					const node = this.startNode();
					this.next();
					this.eat(tokTypes.parenL);
					node.path = extractPath(this);
					return this.finishNode(node, 'TryExpression');
				} else {
					return nextMethod.apply(this, arguments);
				}
			}
		}
	)
}

export default function(acorn, plugins) {
	plugins.existential_operator = existentialPlugin;
	return acorn;
}
