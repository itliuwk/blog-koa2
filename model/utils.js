var fs = require('fs');
function html_entity_decode(str) {
 	str = str.replace(/fuwenben963/g, '');
 	str = str.replace(/&amp;/g, '&');
 	str = str.replace(/&lt;/g, '<');
 	str = str.replace(/&gt;/g, '>');
 	str = str.replace(/&quot;/g, '');
 	str = str.replace(/&#039;/g, "'");
 	return str;
 }

 function writeFileRecursive(path, buffer, callback) {
 	let lastPath = path.substring(0, path.lastIndexOf("/"));
 	fs.mkdir(lastPath, {
 		recursive: true
 	}, (err) => {
 		if (err) return callback(err);
 		fs.writeFile(path, buffer, function(err) {
 			if (err) return callback(err);
 			return callback(null);
 		});
 	});
 }


 module.exports = {
 	html_entity_decode,
 	writeFileRecursive
 };
