class Comparer {
	getKeys = files => {
		let keys = [];

		files.forEach(configuration => {
			const currentKeys = Object.keys(configuration);
			keys = [...keys, ...currentKeys]
		});

		console.log(keys)

		return [...new Set(keys)];
	}

	compare = files => {
		const keys = this.getKeys(files)
	}
}

export default Comparer;
