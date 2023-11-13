import { mutation } from "./_generated/server";

export default mutation(async ({ db }, {userUsername, friendUsername, payment}) => {
    
    const user = await db.query("users")
                         .filter(q => q.eq(q.field("username"), userUsername))
                         .first();

    const friend = await db.query("users")
                           .filter(q => q.eq(q.field("username"), friendUsername))
                           .first();

    const paymentVal = parseFloat(Number(payment).toFixed(2));

    if (!paymentVal) {
        console.log("Payment is not a number");
        return false;
    }

    if (!user || !friend) {
        console.log("User or friend not found");
        return false;
    }

    const userBalance = user.balance;
    const friendBalance = friend.balance;
    
    if (userBalance < paymentVal) {
        console.log("Balance too small");
        return false;
    }

    const userNewBalance = parseFloat((userBalance - paymentVal).toFixed(2));
    const friendNewBalance = parseFloat((friendBalance + paymentVal).toFixed(2));

    await db.patch(user._id, {balance: userNewBalance});
    await db.patch(friend._id, {balance: friendNewBalance});

    return true;
});