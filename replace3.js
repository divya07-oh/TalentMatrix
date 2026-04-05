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

// Regex to match <button ... className="...">...</button>
// Wait, regex for HTML matching is prone to failure, but this is simple enough for standard JSX.

walkDir('./frontend/src', (filepath) => {
    let content = fs.readFileSync(filepath, 'utf-8');
    let original = content;

    // We look for button tags and their classes
    content = content.replace(/<button([^>]*)className=(["'])(.*?)\2([^>]*)>/g, (match, prefix, quote, classStr, suffix) => {
        // Find intention
        let isDanger = classStr.includes('red') || classStr.includes('danger');
        let isOutline = classStr.includes('bg-transparent') || classStr.includes('border-2') || classStr.includes('border-accent');
        let isPrimary = classStr.includes('btn-primary') || classStr.includes('w-full bg-primary') || classStr.includes('px-10');
        // if neither, make it secondary

        let newType = 'btn-secondary';
        if (isDanger) newType = 'btn-danger';
        else if (isOutline) newType = 'btn-outline';
        else if (isPrimary) newType = 'btn-primary';

        // Filter out old styling classes leaving layout classes
        let classes = classStr.split(/\s+/).filter(c => {
            if (c.startsWith('bg-') || c.startsWith('text-') || c.startsWith('hover:') || c.startsWith('border-') || c.startsWith('shadow-') || c.startsWith('rounded-') || c.startsWith('transition') || c.startsWith('duration') || c.startsWith('px-') || c.startsWith('py-') || c === 'border' || c === 'btn-primary') {
                return false; // remove
            }
            return true; // keep layout like w-full, flex, gap-2, ml-auto
        });

        // if it already has btn, avoid duplicates
        classes = classes.filter(c => c !== 'btn' && c !== 'btn-primary' && c !== 'btn-secondary' && c !== 'btn-outline' && c !== 'btn-danger');

        classes.unshift('btn', newType);
        return `<button${prefix}className=${quote}${classes.join(' ')}${quote}${suffix}>`;
    });
	
	// Also fix Links acting as buttons inside Hero and CTA
    content = content.replace(/<Link([^>]*)className=(["'])(.*?btn-primary.*?)\2([^>]*)>/g, (match, prefix, quote, classStr, suffix) => {
        let classes = classStr.split(/\s+/).filter(c => {
            if (c.startsWith('px-') || c.startsWith('py-') || c === 'btn-primary') {
                return false; // remove old
            }
            return true; 
        });
        classes.filter(c => c !== 'btn' && c !== 'btn-primary');
        classes.unshift('btn', 'btn-primary');
        return `<Link${prefix}className=${quote}${classes.join(' ')}${quote}${suffix}>`;
    });

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated Buttons: ${filepath}`);
    }
});
