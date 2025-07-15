export default eventHandler(async () => {
    return await useDrizzle().select().from(tables.pages).all();
});