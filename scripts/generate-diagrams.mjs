
import fs from 'fs';
import {run} from '@mermaid-js/mermaid-cli';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const files = fs
    .readdirSync(path.resolve(__dirname, '../'), { recursive: true })
    .filter(file => file.endsWith('.mmd'))
    .map(file => ({
        mmd: path.resolve(__dirname, '../', file),
        png: path.resolve(__dirname, '../', file.replace('.mmd', '.png'))
    }));

files.forEach(({mmd, png}) => {
    run(mmd, png, { 
        outputFormat: 'png',
        parseMMDOptions: {
            backgroundColor: 'transparent',
            mermaidConfig: {
                theme: 'neutral'
            }
        }
    })
        .catch(err => {
            console.error(`Failed to generate diagram for ${mmd}`, err);
        }).then(() => {
            console.log(`Generated diagram for ${mmd} to ${png}`);
        })
})


// for each .mmd file in the ../** directory, generate a png file with the same name

// const files = fs.readdirSync('../**', ).filter(file => file.endsWith('.mmd'));
// console.log(files);