import Comparer from '../comparer';

test('gets keys from objects', () => {
	const inst = new Comparer();
	const keys = inst.getKeys([{abc: 'aaa', def: 'bbb', foo: 'bar'}, {abc: 'val', baz: 'bar'}])

	expect(keys).toEqual(['abc','def', 'foo', 'baz']);
});
