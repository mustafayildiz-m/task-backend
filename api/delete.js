const { responseStatus } = require('../utils/response');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8888',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET'
});

exports.delete = async (fileId) => {
  //  To do

  try {
    // isset file?
    const existingFile = await getFileById(fileId);
    if (!existingFile) {
      throw 'file not found';
    }

    // delete file
    await deleteFileById(fileId);

    return {
      status:true,
      message: 'process successful' };
  } catch (err) {
    throw err;
  }

}

const getFileById = async (fileId) => {
  const params = {
    TableName: "files-table",
    Key: {
      fileId: fileId
    }
  };
  const data = await docClient.get(params).promise();
  return data.Item;
};

const deleteFileById = async (fileId) => {
  const params = {
    TableName: "files-table",
    Key: {
      fileId: fileId
    }
  };
  await docClient.delete(params).promise();
};
