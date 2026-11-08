const ROUTES = ['', '/projects', '/biography', '/contact', '/under-the-hood'];

export default async function sitemap() {
  return ROUTES.map((route) => ({
    url: `${process.env.SITE_URL || 'https://www.jonmasropian.com'}${route}`,
    lastModified: new Date().toISOString(),
  }));
}
