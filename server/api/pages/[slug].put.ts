const { pages } = tables;

export default eventHandler(async (event) => {
    const { slug } = getRouterParams(event);
    const body = await readBody(event);

    const { title, content } = body;

    if (!title || !content) {
        throw createError({
            statusCode: 400,
            message: 'Title and content are required',
        });
    }

    const page = await useDrizzle()
        .insert(pages)
        .values({ slug, title, content })
        .onConflictDoUpdate({
            target: tables.pages.slug,
            set: { title, content },
        })
        .returning()
        .get();

    return page;
});