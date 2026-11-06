const ROUTES = ['', '/projects', '/biography', '/cyber-lab', '/contact', '/under-the-hood'];

export default async function sitemap() {
  return ROUTES.map((route) => ({
    url: `${process.env.SITE_URL || 'https://jonmasropian.com'}${route}`,
    lastModified: new Date().toISOString(),
  }));
}
