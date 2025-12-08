// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import getDocPath from './getDocPath.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const aiDocsPath = path.join(__dirname, '../AI');
// let sidebarConfig = [];

// if (fs.existsSync(aiDocsPath)) {
//     const files = fs.readdirSync(aiDocsPath);
//     const dirs = files.filter(file => {
//         const fullPath = path.join(aiDocsPath, file);
//         return fs.statSync(fullPath).isDirectory();
//     });

//     sidebarConfig = dirs.map(dir => {
//         return getDocPath(dir, true, `AI/${dir}`);
//     });
// }

// export default sidebarConfig;


import getDocPath from './getDocPath.js'
export default [
    getDocPath('AI导航',true,'./AI/AI导航'),
    getDocPath('AI教程',true,'./AI/AI教程'),
    getDocPath('AI知识库',true,'./AI/AI知识库')
];
