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
        .insert(tables.pages)
        .values({
            slug: String(slug),
            title: String(title),
            content: String(content),
        })
        .onConflictDoUpdate({
            target: tables.pages.slug,
            set: {
                title: String(title),
                content: String(content),
            },
        })
        .returning()
        .get();
    
    return page;
});