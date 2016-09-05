import astring, { defaultGenerator } from 'astring';

const blockPrefix = {
	es7: 'do',
	es6: '(() =>',
	es5: '(function()'
};

const returnPrefix = {
	es7: '',
	es6: 'return',
	es5: 'return'
};

const blockSuffix = {
	es7: '',
	es6: ')()',
	es5: '())'
};

export default function(ast, options) {
	const { compileTarget } = options;

	const customGenerator = {
		...defaultGenerator,
		TryExpression: function(node, state) {
			state.output.write(
`${blockPrefix[compileTarget]} {
	try {
		${returnPrefix[compileTarget]} ${node.path};
	} catch (e) {
		if (e instanceof ReferenceError) {
			${returnPrefix[compileTarget]} undefined;
		} else {
			throw e;
		}
	}
}${blockSuffix[compileTarget]}`
			);
		}
	};

	return astring(
		ast,
		{
			generator: customGenerator
		}
	);
}
