# Watch fauxliamint

A modified version of watch-watch mints meant for parsing discord html archives. Not quite as good, unfortunately.

```
MONGODB_URI=""
DB_NAME=""
DB_USER=""
DB_PASSWORD=""
```

## Steps for future me

1. Fetch discord post using [fetch-discord](https://github.com/ChrisW-B/fetch-discord)
2. Upload posts to a mongodb. [Mongo Atlas](https://cloud.mongodb.com/) is free (right now, might not be next time).

   - You'll need to upload with mongo-tools in the format `mongoimport --uri mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>/<DATABASE> --collection <COLLECTION> --type json --file <FILENAME> --jsonArray`

3. Update the timestamp field to a datetime type: `db.posts.updateMany({}, [{ "$set": { "timestamp": { "$toDate": "$timestamp" } }}]);`
4. Update env varibles to point to the db, and run the project!
