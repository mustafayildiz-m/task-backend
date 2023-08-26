# Setup

1.  Install node.js (not before v16.13.1)
2.  ```npm install -g serverless```
3. Install Java JRE (not before v8)
4. Install Java JDK

# How to run
In root directory;

1. ```yarn install```
2. ```sls dynamodb install```
4. ```sls offline start```

`WARNING:` Every change in code, you have to restart server for changes become active. Do `Cmd + C` or `Ctrl + c` then start server again ```sls offline start```.

`KEEP IN MIND:` Every restarting server, your changed database records will be lost.

## Database initial records

In root, you can see `folders.json` and `files.json`. These are existing records when you start the server.
## Acceptance criteria

Imagine an array that contains folders. These folders can have files in it. `move` endpoint moves a file to another folder and returns the new state of given list.

### Example list
```js
const files = [
  {
    "fileId": "file-1",
    "name": "File 1",
    "folderId": "folder-A"
  },
  {
    "fileId": "file-2",
    "name": "File 2",
    "folderId": "folder-B"
  },
]
const folder = [
  {
    "folderId": "folder-A",
    "name": "Folder A"  
  },
  {
    "folderId": "folder-B",
    "name": "Folder B"
  }
]
```

If I run `/dev/move` with `body { destination:"folder-B", source:{fileId: "file-1", name: "File 1", folderId: "folder-A"} }`then I expect file with fileId `file-1` moved to the folder which has folderId `folder-B`. Endpoint should return the new state below;

```js
const example_result_files = [
  {
    "fileId": "file-1",
    "name": "File 1",
    "folderId": "folder-B"
  },
  {
    "fileId": "file-2",
    "name": "File 2",
    "folderId": "folder-B"
  },
]
```

### Move function signature

| Key         | Type             | Description                                                       |
|-------------|------------------|-------------------------------------------------------------------|
| source      | object           | object of the file to be moved - {fileId, name, folderId}         |
| destination | string           | Id of the folder to be moved                                      |


### Folder shape

| Key      | Type   | Description                   |
|----------|--------|-------------------------------|
| folderId | string | Unique identifier of folder   |
| name     | string | Name of the folder            |

### File shape

| Key      | Type   | Description                 |
|----------|--------|-----------------------------|
| fileId   | string | Unique identifier of file   |
| folderId | string | Unique identifier of folder |
| name     | string | Name of the file            |

## Docs

[DynamoDB Docs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB.html)

## Errors

For every weird errors feel free to contact us.# task-backend
