import FileParser from './file_parser';
import Comparer from './comparer';

import { v4 as uuidv4 } from 'uuid';
import store from './store';
import { add } from './slice';

//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

function read_file(file) {
	return new Promise((resolve, reject) => {
		var fr = new FileReader();
		fr.onload = () => {
			resolve({ name: file.name, text: fr.result });
		};
		fr.readAsText(file);
	});
}

function handleFileSelect(event) {
	let promises = []; // collect all promises
	for (const file of event.target.files) {
		promises.push(read_file(file));
	}

	Promise.all(promises) // wait for the resolutions
		.then((results) => {
			for (const result of results) {
				const { name, text } = result;

				const inst = new FileParser();
				const data = inst.parse(text);

				store.dispatch(add({ name, data, id: uuidv4() }));
			}
		})
		.then(() => {
			const comparer = new Comparer();
			const files = store.getState().files.files;

			const merged = comparer.compare(files)
			console.log(merged);
		});
}
