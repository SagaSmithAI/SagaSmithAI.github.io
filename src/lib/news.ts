import { promises as fs } from 'fs';
import path from 'path';

export interface NewsItem {
  slug: string;
  title: string;
  titleEn: string;
  date: string;
  tag: string;
  summary: string;
  summaryEn: string;
  content: string;
}

const cleanMeta = (value = '') => value.replace(/^["']|["']$/g, '').trim();

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
        if (sep > 0) meta[line.slice(0, sep).trim()] = cleanMeta(line.slice(sep + 2));
      });
      const content = match[2].trim();
      items.push({
        slug: file.replace(/\.md$/, ''),
        title: meta.title || file,
        titleEn: meta.titleEn || meta.title || file,
        date: meta.date || '',
        tag: meta.tag || 'UPDATE',
        summary: meta.summary || content.split(/\n\n/)[0],
        summaryEn: meta.summaryEn || meta.summary || '',
        content,
      });
    }
    return items.sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [];
  }
}
