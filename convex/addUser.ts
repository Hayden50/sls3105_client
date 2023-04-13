import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { username, email }) => {
    const user = await db.query("users")
        .filter(q => q.eq(q.field("username"), username))
        .first();
    if (!user) {
        await db.insert("users", { username, email });
        return user;
    }
    return user;
});
