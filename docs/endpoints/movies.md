# /movies

## GET

### /movies

Get all movies in the database. Allows the following query parameters:

| Query Parameter | Description                                   | Example                                                                                           | Default |
|-----------------|-----------------------------------------------|---------------------------------------------------------------------------------------------------|---------|
| q               | Used to filter based on the movie properties. | ?q=title:batman<br />?q=title:batman<br />?q=director:Nolan<br />?q=genre:Science%20Fiction<br /> |         |
| offset          | Sets the starting point of the query.         | ?offset=5                                                                                         |         |
| limit           | Sets the amount of movies returned.           | ?limit=500                                                                                        | 10      |

### /movies/:id
Get a specific movie by id.

### /movies/:id/comments

Get all the comments of a movie.

## POST

### /movies

Create a movie. Example payload:

```json
{
  "title": "Batman Begins",
  "genre": "Science Fiction",
  "director": "Christopher Nolan",
  "studio": "Warner Bros. Pictures",
  "year": 2005
}
```

### /movies/:id/archive

Archive a movie.

## PUT

### /movies/:id

Edit a movie. Example payload:

```json
{
  "title": "The Dark Knight",
  "genre": "Science Fiction",
  "director": "Christopher Nolan",
  "studio": "Warner Bros. Pictures/Legendary",
  "year": 2008
}
```
