import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One Markdown file per signed article in src/content/articles/.
// The file name is the URL slug (chefharris.ch/<file-name>) and never changes after publish.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),            // H1 and <title>
    quickAnswer: z.string(),      // the "Quick answer" card and the meta description
    date: z.coerce.date(),        // publish date (in the file, never in the URL)
  }),
});

export const collections = { articles };
