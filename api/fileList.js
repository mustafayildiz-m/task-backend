const { responseStatus } = require('../utils/response');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8888',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET'
});

exports.fileList = async (folderId) => {
  //  To do
  try {
    const list = await getFiles(folderId);
    if (!list) {
      throw 'files not found';
    }
    return responseStatus(200, list);
  } catch (err) {
    return responseStatus(500, {message: err});
  }
}

const getFiles = async (folderId) => {
  const params = {
    TableName: "files-table",
    Key: {
      folderId: folderId
    }
  };
  const data = await docClient.scan(params).promise();
  return data.Items;
}