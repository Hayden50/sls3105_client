# Convex Functions

This file is dedicated to giving short descriptions for all of the convex functions.

Note to developers: When a convex function is added - Add info about it here

## addFriends

Type - Mutation

Adds a friend pairing to the friends database for the currently logged in user and the

## addUser

Type - Mutation

Used during sign-up to add a new entry to the users table in convex. This function simply adds each
user's username, email, and generated id to the database.

## deleteFriend

Type - Mutation

Used to remove a friend pairing in the friends database in convex. The function first checks that
the users are "friends" and then mutates the table.

## listFriends

Type - Query

Query that filters the friends table to show all friend pairings for the currently logged in user.

## listUsers

Type - Query

Lists all users in the database. This function is not used directly by the user.

## searchFriends

Type - Query

This filters the friend database first by the currently logged in user and then is alphabetically sorted. This
is used with the search bar on the home screen to find friends.
