import fs from 'fs';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import readlineSync from 'readline-sync';
import { exit } from 'process';

if (!fs.existsSync('.env')) {
	fs.open('.env', 'w+', (err, fd) => {
		if (err !== null) {
			console.log('.env.local 파일을 여는데 실패하였습니다.');
			exit(-1);
		}

		const port = readlineSync.question('port : ');
		const dbAddr = readlineSync.question('database address : ');
		const passphrase = readlineSync.question(
			'passPhrase for private and public key : '
		);
		const salt = bcrypt.genSaltSync(10);

		if (fs.fstatSync(fd).size === 0) {
			fs.writeFileSync(
				fd,
				`PORT=${port}\nDB_ADDR=${dbAddr}\nPASS_PHRASE=${passphrase}\nSALT=${salt}`
			);
		}

		crypto.generateKeyPair(
			'rsa',
			{
				modulusLength: 4096,
				publicKeyEncoding: { type: 'spki', format: 'pem' },
				privateKeyEncoding: {
					type: 'pkcs8',
					format: 'pem',
					cipher: 'aes-256-cbc',
					passphrase
				}
			},
			(err, publicKey, privateKey) => {
				if (err) {
					console.log('failed to make private key and public key');
					exit(-1);
				}

				if (fs.existsSync('./public.key')) {
					fs.rmSync('./public.key');
				}
				if (fs.existsSync('./private.key')) {
					fs.rmSync('./private.key');
				}
				fs.writeFileSync('./public.key', publicKey);
				fs.writeFileSync('./private.key', privateKey);
			}
		);
	});
}
