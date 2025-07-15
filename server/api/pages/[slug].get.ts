export default eventHandler(async (event) => {
    const { slug } = getRouterParams(event);

    const page = await useDrizzle()
        .select()
        .from(tables.pages)
        .where(eq(tables.pages.slug, String(slug)))
        .get();

    if (!page) {
        throw createError({
            statusCode: 404,
            message: `Not found: "${slug}"`,
        });
    }

    return page;
});