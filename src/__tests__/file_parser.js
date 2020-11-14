import FileParser from '../file_parser';

test('gets keys from objects', () => {
	const inst = new FileParser();
	const keys = inst.parse('foo=bar\nbar=baz')

	expect(keys).toEqual({"bar": "baz", "foo": "bar"});
});
