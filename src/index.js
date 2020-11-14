import FileParser from './file_parser';

//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

class FileLoader {
	parsedData = null;
	name = null;

	onload = event => {
		const inst = new FileParser();
		const parsed = inst.parse(event.target.result);
		//console.log(parsed)
		this.parsedData = parsed;
		console.log('HERE!!!!!!!!', this.parsedData)
	}
	load = file => {
		const reader = new FileReader();
		reader.onload = this.onload;
		reader.readAsText(file);
		this.name = file.name;
	}

	getData = () => {
		return this.parsedData;
	}

	getName = () => {
		return this.name;
	}
}

function handleFileSelect(event) {
	console.log('files', event.target.files)
	for (const i in event.target.files) {
		const loader = new FileLoader();
		console.log(i, event.target.files[i])
		loader.load(event.target.files[i])

		console.log(loader.getName())
	}
}
