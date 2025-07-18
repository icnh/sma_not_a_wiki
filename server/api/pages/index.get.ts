const { pages } = tables;

export default eventHandler(async () => {
    return await useDrizzle()
        .select({ title: pages.title, slug: pages.slug })
        .from(pages)
        .orderBy(pages.title);
});