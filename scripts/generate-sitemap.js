import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import fetch from 'node-fetch';


const hostname = 'https://skycrestgaming.com';

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname });
    const writeStream = createWriteStream(resolve(process.cwd(), 'public', 'sitemap.xml'));

    // --- Define your site routes ---
    const routes = [
        '/',            // main page
        // '/about',     // example if expand later
        // '/menu',
        // '/contact'
    ];

    for (const route of routes) {
        sitemap.write({
            url: route,
            changefreq: 'weekly',
            priority: route === '/' ? 1.0 : 0.8,
            lastmod: new Date().toISOString(),
        });
    }

    sitemap.end();

    const data = await streamToPromise(sitemap);
    writeStream.end(data.toString());
    console.log('✅ Sitemap generated successfully.');

    // Notify Google
    await fetch(`https://www.google.com/ping?sitemap=${hostname}/sitemap.xml`);
    console.log('✅ Google notified of sitemap update.');

}

generateSitemap().catch(console.error);
