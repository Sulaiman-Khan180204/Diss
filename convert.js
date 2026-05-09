import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const folders = [
    'public/images/products',
    'public/images/compoundextracts',
];

for (const folder of folders) {
    const files = fs.readdirSync(folder).filter(f => f.endsWith('.png'));

    for (const file of files) {
        const input = path.join(folder, file);
        const output = path.join(folder, file.replace('.png', '.webp'));

        await sharp(input)
            .webp({ quality: 80 })
            .toFile(output);

        console.log(`Converted: ${file} → ${file.replace('.png', '.webp')}`);
    }
}

console.log('Done.');
