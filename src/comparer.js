class Comparer {
	getKeys = (files) => {
		let keys = [];

		files.forEach(({data}) => {
			const currentKeys = Object.keys(data);
			keys = [...keys, ...currentKeys];
		});

		return [...new Set(keys)];
	};

	merge = (files, keys) => {
		console.log(keys)
		let out = {};

		for (const key of keys) {
			for (const file of files) {
				if (key in file.data) {
					if (key in out) {
						out[key][file.id] = file.data[key];
					} else {
						out[key] = {[file.id]: file.data[key]};
					}
				}
			}
		}

		return out
	};

	diff = data => {
		let out = {};

	}

	compare = (files) => {
		const keys = this.getKeys(files);
		const merged = this.merge(files, keys);

		return merged
	};
}

export default Comparer;
