import { promises as fs } from 'fs';
import path from 'path';

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export async function loadNews(limit = 5): Promise<NewsItem[]> {
  const dir = path.resolve('./news');
  try {
    const files = (await fs.readdir(dir)).filter(f => f.endsWith('.md')).sort().reverse().slice(0, limit);
    const items: NewsItem[] = [];
    for (const file of files) {
      const raw = await fs.readFile(path.join(dir, file), 'utf-8');
      const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!match) continue;
      const meta: Record<string, string> = {};
      match[1].split('\n').forEach(line => {
        const sep = line.indexOf(': ');
        if (sep > 0) meta[line.slice(0, sep).trim()] = line.slice(sep + 2).trim();
      });
      items.push({
        slug: file.replace(/\.md$/, ''),
        title: meta.title || file,
        date: meta.date || '',
        content: match[2].trim(),
      });
    }
    return items.sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [];
  }
}
