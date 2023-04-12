import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { user_id, friend_id }) => {
  const user_instance = await db.query("friends")
                .filter(q => q.and(q.eq(q.field("user_id"), user_id), q.eq(q.field("friend_id"), friend_id)))
                .first();
  const id = user_instance._id;
  await db.delete(id);
});
