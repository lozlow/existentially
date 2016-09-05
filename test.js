import plugin from './index';
import { parse, plugins } from 'acorn';
import { inspect } from 'util';
import output from './output';

plugin(parse, plugins);

// console.log(
// 	inspect(
// 		parse(
// 			`
// 				const a = 'hello';
// 				function orange(param) {
// 					console.log('goodbye')
// 				}
// 				try {
// 					orange(a);
// 				} catch(e) {
// 					console.log('oops')
// 				}
// 			`,
// 			{
// 				plugins: {
// 					existential_operator: true
// 				}
// 			}
// 		)
// 	)
// )

// console.log(
// 	inspect(
// 		parse(
// 			`
// 				const a = try (l.i.n.a);
// 			`,
// 			{
// 				plugins: {
// 					existential_operator: true
// 				}
// 			}
// 		),
// 		{ depth: null }
// 	)
// )

// console.log(
// 	inspect(
// 		parse(
// 			`
// 				console.log(try (l.i.n.a));
// 			`,
// 			{
// 				plugins: {
// 					existential_operator: true
// 				}
// 			}
// 		),
// 		{ depth: null }
// 	)
// )

const ast = parse(
	`
		console.log(try (l.i.n.a));
	`,
	{
		plugins: {
			existential_operator: true
		}
	}
);

console.log(
	output(
		ast,
		{ compileTarget: 'es7' }
	)
);

console.log(
	output(
		ast,
		{ compileTarget: 'es6' }
	)
);

console.log(
	output(
		ast,
		{ compileTarget: 'es5' }
	)
);
