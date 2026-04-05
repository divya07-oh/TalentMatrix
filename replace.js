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
    // Backgrounds
    'bg-white': 'bg-primary',
    'bg-gray-100': 'bg-secondary',
    'bg-gray-50': 'bg-background',
    
    // Borders
    'border-gray-100': 'border-border',
    'border-gray-200': 'border-border',
    'border-gray-300': 'border-border',
    'divide-gray-200': 'divide-border',
    
    // Texts
    'text-gray-900': 'text-white',
    'text-gray-800': 'text-text',
    'text-gray-700': 'text-text-muted',
    'text-gray-600': 'text-text-muted',
    'text-gray-500': 'text-text-muted',
    'text-black': 'text-white',
    
    // specific blue/indigo highlights to gold or primary depending on context
    'text-blue-600': 'text-accent',
    'bg-blue-600': 'bg-primary',
    'bg-blue-700': 'hover:bg-primary-accent',
    'bg-blue-500': 'bg-primary-accent',
    'border-blue-500': 'border-accent',
    'focus:border-blue-500': 'focus:border-accent',
    'focus:ring-blue-500': 'focus:ring-accent',

    // other colors
    'text-green-600': 'text-accent',
    'bg-green-100': 'bg-primary/50',
    'bg-green-500': 'bg-accent',
};

walkDir('./frontend/src', (filepath) => {
    let content = fs.readFileSync(filepath, 'utf-8');
    let original = content;

    for (const [key, val] of Object.entries(replacements)) {
        // Find exact matches of the word to avoid replacing bg-white/50 internally
        // Using a regex with lookaround or \b
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        content = content.replace(regex, val);
    }

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated ${filepath}`);
    }
});
