import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const portfolio = defineCollection({
	loader: glob({ base: './src/content/portfolio', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		tech: z.array(z.string()),
		priority: z.number().default(99),
		pubDate: z.coerce.date(),
		thumbnail: z.optional(image()),
		link: z.string().optional(),
		github: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, portfolio };
