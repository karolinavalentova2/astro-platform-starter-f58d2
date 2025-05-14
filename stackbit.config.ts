import { defineStackbitConfig, type SiteMapEntry } from '@stackbit/types';

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "18",
    "ssgName": "astro",
    "contentSources": [],
    "postInstallCommand": "npm i --no-save @stackbit/types",
    modelExtensions: [
        // Static URL paths derived from the model's "slug" field
        { name: "Image CDN", type: "page", urlPath: "/image-cdn" },
    ],
    siteMap: ({ documents, models }) => {
        // 1. Filter all page models which were defined in modelExtensions
        const pageModels = models.filter((m) => m.type === "page")

        return documents
            // 2. Filter all documents which are of a page model
            .filter((d) => pageModels.some(m => m.name === d.modelName))
            // 3. Map each document to a SiteMapEntry
            .map((document) => {
                // Map the model name to its corresponding URL
                const urlModel = (() => {
                    switch (document.modelName) {
                        case 'Image CDN':
                            return 'image-cdn';
                        default:
                            return null;
                    }
                })();

                return {
                    stableId: document.id,
                    urlPath: `/${urlModel}`,
                    document,
                    isHomePage: false,
                };
            })
            .filter(Boolean) as SiteMapEntry[];
    }
})
