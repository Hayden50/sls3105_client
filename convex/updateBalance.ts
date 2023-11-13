import { mutation } from "./_generated/server";

export default mutation(async ({ db }, {username, newBalance}) => {
    
    const user = await db.query("users")
                         .filter(q => q.eq(q.field("username"), username))
                         .first();

    if (!user) {
        return false;
    }
    
    await db.patch(user._id, {balance: newBalance});
    return true;
});