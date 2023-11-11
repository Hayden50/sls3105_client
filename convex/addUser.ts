import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { username, email, id }) => {
  
    const new_user = await db.query("users")
        .filter(q => q.eq(q.field("username"), username))
        .first();
  
    if (!new_user) {
        await db.insert("users", { balance: 0, username, email, id });
        return new_user;
    }
    return new_user;
});
