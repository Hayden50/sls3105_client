import { query } from "./_generated/server";

export default query(async ({ db }) => {
    return await db
    .query("friends")
    .filter(q => q.eq(q.field("user_id"), 0))
    .collect();
  });
