# /users

## GET

### /users

Get all users in the database.

### /users/:id

Get a specific user by id.

## POST

### /users

Create a user. Example payload:

```json
{
  "username": "admin",
  "password": "1234",
}
```

## PUT

### /users/:id

Edit a user. Example payload:

```json
{
  "password": "4321",
}
```

## DELETE

### /users/:id

Removes a user from the database.
