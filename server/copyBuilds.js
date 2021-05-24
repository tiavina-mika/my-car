const fs = require('fs-extra');
const wait = require('util').promisify(setTimeout);

const run = async () => {
	//---- client ----//
	console.log('copying client build');
	await fs.remove('./dist/public');
	await wait(1000);
	await fs.ensureDir('./public');
	await fs.copy('../client/build', './dist/public');
	console.log('done');
}

run();