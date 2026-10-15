import { IdAttributePlugin } from '@11ty/eleventy';
import site from './src/_data/site.json' with { type: 'json' };

const home = { url: '/', title: 'Portada del manual' };

/** Guides that exist today, in reading order across every available level. */
export function availableGuides(levels = site.levels) {
  return levels.filter(level => level.status === 'disponible').flatMap(level => level.guides);
}

/** Previous and next stops of the learning path; the path starts and ends at the home page. */
export function pathNeighbors(url, guides = availableGuides()) {
  const index = guides.findIndex(guide => guide.url === url);
  if (index === -1) return { previous: home, next: home };
  return {
    previous: guides[index - 1] ?? home,
    next: guides[index + 1] ?? { ...home, label: 'Nivel completado' },
  };
}

/** Level that owns a guide, with its guide count padded for the breadcrumb ("04"). */
export function guideLevel(url, levels = site.levels) {
  const level = levels.find(candidate => candidate.guides.some(guide => guide.url === url));
  if (!level) return undefined;
  const { id, number, title } = level;
  return { id, number, title, total: String(level.guides.length).padStart(2, '0') };
}

/** Build only the manual; the ECC plugin sources stay outside dist. */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.amendLibrary('md', markdown => markdown.set({ html: false }));
  eleventyConfig.addFilter('pathNeighbors', url => pathNeighbors(url));
  eleventyConfig.addFilter('guideLevel', url => guideLevel(url));
  eleventyConfig.setServerOptions({
    host: '127.0.0.1',
    port: 4331,
    portReassignmentRetryCount: 0,
    liveReload: false,
  });
  return {
    dir: { input: 'src', output: 'dist' },
    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: false,
    htmlTemplateEngine: 'njk',
  };
}
