# /comments

## GET

### /comments/:id

Get a specific comment by id.

## POST

### /comments

Create a comment. Example payload:

```json
{
  "user": "admin",
  "movie": 10,
  "text": "The comment itself"
}
```

## PUT

### /comments/:id

Edit a comment. Example payload:

```json
{
  "text": "woops, edit!"
}
```

## DELETE

### /comments/:id

Removes a comment from the database.
