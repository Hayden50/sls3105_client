import { query } from "./_generated/server";

export default query(async ({ db }, { friend_id }) => {
    return await db
    .query("friends")
    .filter(q => q.eq(q.field("user_id"), friend_id))
    .collect();
  });
