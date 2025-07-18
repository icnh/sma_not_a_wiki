const { pages } = tables;

export default eventHandler(async (event) => {
    const { slug } = getRouterParams(event);

    const page = await useDrizzle()
        .select()
        .from(pages)
        .where(eq(pages.slug, slug))
        .get();

    if (!page) {
        throw createError({
            statusCode: 404,
            message: `Not found: "${slug}"`,
        });
    }

    return page;
});