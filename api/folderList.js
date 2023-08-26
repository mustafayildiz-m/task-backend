const { responseStatus } = require('../utils/response');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8888',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET'
});

exports.folderList = async (event, context) => {
  try {
    const list = await getFolders();
    return responseStatus(200, list);
  } catch (err) {
    return responseStatus(500, {message: err});
  }
}

const getFolders = async () => {
  const params = {
    TableName: "folders-table",
  };
  const data = await docClient.scan(params).promise();
  return data.Items;
}