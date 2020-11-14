import ini from 'ini';

class FileParser {
	parse = data => {
		var config = ini.parse(data);
		return config;
	}

}

export default FileParser;
