const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function publishPost() {
    const args = process.argv.slice(2);
    const params = {};
    
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        params[key] = args[i+1];
    }

    const { title, slug, excerpt, file, date } = params;

    if (!title || !slug || !excerpt || !file) {
        console.error('Usage: node scripts/publish-post.js --title "<Title>" --slug "<slug>" --excerpt "<Excerpt>" --file <path_to_file>');
        process.exit(1);
    }

    const dateStr = date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const shortDate = dateStr.split(',')[0];

    const content = fs.readFileSync(file, 'utf8');

    // 1. Create directory
    const blogRoot = path.resolve(__dirname, '..');
    const notesDir = path.join(blogRoot, 'src/app/notes', slug);
    if (!fs.existsSync(notesDir)) {
        fs.mkdirSync(notesDir, { recursive: true });
    }

    // 2. Create page.tsx
    const paragraphs = content.trim().split('\n\n');
    let jsxContent = '';
    
    paragraphs.forEach(p => {
        if (p.startsWith('- ') || p.startsWith('* ')) {
            const items = p.trim().split('\n');
            jsxContent += '<ul className="list-disc pl-6 space-y-4">\n';
            items.forEach(item => {
                const text = item.trim().substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                jsxContent += `  <li>${text}</li>\n`;
            });
            jsxContent += '</ul>\n\n';
        } else if (p.startsWith('![')) {
            const match = p.match(/!\[(.*?)\]\((.*?)\)/);
            if (match) {
                const alt = match[1];
                const url = match[2];
                jsxContent += `        <figure className="space-y-2">\n          <img src="${url}" alt="${alt}" className="rounded-lg border border-border w-full h-auto shadow-sm" />\n`;
                
                // Check if next line is a caption
                const lines = p.split('\n');
                if (lines[1] && lines[1].startsWith('*') && lines[1].endsWith('*')) {
                    const caption = lines[1].substring(1, lines[1].length - 1);
                    jsxContent += `          <figcaption className="text-center text-sm text-text-muted">${caption}</figcaption>\n`;
                }
                jsxContent += '        </figure>\n\n';
            }
        } else if (p.startsWith('# ')) {
            jsxContent += `<h2 className="text-xl font-bold">${p.substring(2)}</h2>\n\n`;
        } else if (p.startsWith('## ')) {
            jsxContent += `<h2 className="text-xl font-bold mt-8 border-b border-border pb-2">${p.substring(3)}</h2>\n\n`;
        } else if (p.startsWith('### ')) {
            jsxContent += `<h3 className="text-lg font-bold mt-6">${p.substring(4)}</h3>\n\n`;
        } else if (p === '---') {
            jsxContent += '<hr className="border-border my-8" />\n\n';
        } else {
            const text = p.trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            jsxContent += `<p>${text}</p>\n\n`;
        }
    });

    const componentName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    const pageTemplate = `export default function ${componentName}Note() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">${dateStr}</time>
        <h1 className="text-2xl font-bold">${title}</h1>
      </header>

      <div className="space-y-6 leading-relaxed">
        ${jsxContent}
      </div>

      <footer className="pt-12 border-t border-border mt-12">
        <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
      </footer>
    </div>
  );
}
`;
    fs.writeFileSync(path.join(notesDir, 'page.tsx'), pageTemplate);

    // 3. Update src/app/notes/page.tsx
    const indexFile = path.join(blogRoot, 'src/app/notes/page.tsx');
    let indexContent = fs.readFileSync(indexFile, 'utf8');

    const newNoteEntry = `    {
      title: "${title}",
      date: "${shortDate}",
      slug: "${slug}",
      excerpt: "${excerpt}"
    },`;

    const pattern = /const notes = \[/;
    if (pattern.test(indexContent)) {
        indexContent = indexContent.replace(pattern, `const notes = [\n${newNoteEntry}`);
        fs.writeFileSync(indexFile, indexContent);
        console.log(`Successfully updated: ${indexFile}`);
    } else {
        console.error("Error: Could not find 'notes' array in src/app/notes/page.tsx");
        process.exit(1);
    }

    // 4. Update src/app/components/Sidebar.tsx
    const sidebarFile = path.join(blogRoot, 'src/app/components/Sidebar.tsx');
    if (fs.existsSync(sidebarFile)) {
        let sidebarContent = fs.readFileSync(sidebarFile, 'utf8');
        const sidebarEntry = `    { title: "${slug}.md", slug: "${slug}", path: "/notes/${slug}" },`;
        
        if (pattern.test(sidebarContent)) {
            sidebarContent = sidebarContent.replace(pattern, `const notes = [\n${sidebarEntry}`);
            fs.writeFileSync(sidebarFile, sidebarContent);
            console.log(`Successfully updated: ${sidebarFile}`);
        }
    }

    console.log(`Successfully published: ${title}`);
}

publishPost();
