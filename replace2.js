import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walkDir(filepath, callback);
        } else if (filepath.endsWith('.jsx')) {
            callback(filepath);
        }
    }
}

const replacements = {
    // Old text-primary and text-secondary were dark greens, now they should be white/grey
    'text-primary': 'text-white',
    'text-secondary': 'text-text-muted',
    'bg-gray-50': 'bg-background',
    'bg-gray-100': 'bg-secondary',
};

walkDir('./frontend/src', (filepath) => {
    let content = fs.readFileSync(filepath, 'utf-8');
    let original = content;

    for (const [key, val] of Object.entries(replacements)) {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        content = content.replace(regex, val);
    }

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated Text Colors: ${filepath}`);
    }
});
