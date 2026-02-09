const fs = require('fs');
const path = require('path');

function publishPost() {
    const args = process.argv.slice(2);
    const params = {};
    
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        params[key] = args[i+1];
    }

    const { title, slug, excerpt, file, date, type = 'notes' } = params;

    if (!title || !slug || !excerpt || !file) {
        console.error('Usage: node scripts/publish-post.js --title "<Title>" --slug "<slug>" --excerpt "<Excerpt>" --file <path_to_file> [--type <notes|stories|newsletter>]');
        process.exit(1);
    }

    const dateStr = date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const shortDate = dateStr.split(',')[0];

    const rawContent = fs.readFileSync(file, 'utf8');

    // 1. Create directory
    const blogRoot = path.resolve(__dirname, '..');
    const targetDir = path.join(blogRoot, 'src/app', type, slug);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // 2. Parse Markdown to JSX (Simplified but robust)
    const lines = rawContent.trim().split('\n');
    let jsxContent = '';
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        if (!line) {
            if (inList) {
                jsxContent += '</ul>\n';
                inList = false;
            }
            continue;
        }

        // List handling
        if (line.startsWith('- ') || line.startsWith('* ')) {
            if (!inList) {
                jsxContent += '<ul className="list-disc pl-6 space-y-2">\n';
                inList = true;
            }
            const text = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            jsxContent += `  <li>${text}</li>\n`;
            continue;
        } else if (inList) {
            jsxContent += '</ul>\n';
            inList = false;
        }

        // Headings - Use standard semantic tags, style via .prose global CSS
        if (line.startsWith('### ')) {
            jsxContent += `<h3>${line.substring(4)}</h3>\n`;
        } else if (line.startsWith('## ')) {
            jsxContent += `<h2>${line.substring(3)}</h2>\n`;
        } else if (line.startsWith('# ')) {
            jsxContent += `<h2>${line.substring(2)}</h2>\n`;
        } else if (line === '---') {
            jsxContent += '<hr />\n';
        } else if (line.startsWith('![')) {
            const match = line.match(/!\[(.*?)\]\((.*?)\)/);
            if (match) {
                jsxContent += `<figure>\n  <img src="${match[2]}" alt="${match[1]}" className="rounded-lg border border-border w-full h-auto" />\n</figure>\n`;
            }
        } else {
            // Paragraph
            const text = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>');
            jsxContent += `<p>${text}</p>\n`;
        }
    }
    
    if (inList) jsxContent += '</ul>\n';

    const componentName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    const pageTemplate = `export default function ${componentName}Note() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">${dateStr}</time>
        <h1 className="text-2xl font-bold">${title}</h1>
      </header>

      <div className="prose leading-relaxed">
        ${jsxContent}
      </div>

      <footer className="pt-12 border-t border-border mt-12 text-text-muted">
        <a href="/${type}" className="text-sm no-underline hover:underline">← Back to ${type}</a>
      </footer>
    </div>
  );
}
`;
    fs.writeFileSync(path.join(targetDir, 'page.tsx'), pageTemplate);

    // 3. Index and Sidebar updates... (omitted but logic remains same)
    const indexFile = path.join(blogRoot, 'src/app', type, 'page.tsx');
    if (fs.existsSync(indexFile)) {
        let indexContent = fs.readFileSync(indexFile, 'utf8');
        const newNoteEntry = `    {
      title: "${title}",
      date: "${shortDate}",
      slug: "${slug}",
      excerpt: "${excerpt}"
    },`;
        const pattern = new RegExp(`const ${type} = \\[`);
        if (pattern.test(indexContent) && !indexContent.includes(`slug: "${slug}"`)) {
            indexContent = indexContent.replace(pattern, (match) => `${match}\n${newNoteEntry}`);
            fs.writeFileSync(indexFile, indexContent);
        }
    }

    const sidebarFile = path.join(blogRoot, 'src/app/components/Sidebar.tsx');
    if (fs.existsSync(sidebarFile)) {
        let sidebarContent = fs.readFileSync(sidebarFile, 'utf8');
        const sidebarEntry = `    { title: "${slug}.md", slug: "${slug}", path: "/${type}/${slug}" },`;
        const pattern = new RegExp(`const ${type} = \\[`);
        if (pattern.test(sidebarContent) && !sidebarContent.includes(`slug: "${slug}"`)) {
            sidebarContent = sidebarContent.replace(pattern, (match) => `${match}\n${sidebarEntry}`);
            fs.writeFileSync(sidebarFile, sidebarContent);
        }
    }

    console.log(`Successfully published: ${title}`);
}

publishPost();
