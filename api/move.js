const { responseStatus } = require('../utils/response');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8888',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET'
});

exports.move = async (destination, source) => {
  
  try{

    //source file entity check
    const sourceFile = await getFileById(source.fileId);
    if (!sourceFile) {
      throw new Error('Source file not found');
    }

    //destination file entity check
    const destinationFolder = await getFolderById(destination);
    if (!destinationFolder) {
      throw new Error('Destination folder not found');
    }

    // Move file to destination folder process
    sourceFile.folderId = destination;

    // update folder
    await updateFile(sourceFile);

    //return updated file
    return sourceFile;

  }catch (err) {
    throw new Error(err.message);
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

const getFolderById = async (folderId) => {
  const params = {
    TableName: "folders-table",
    Key: {
      folderId: folderId
    }
  };
  const data = await docClient.get(params).promise();
  return data.Item;
};

const updateFile = async (file) => {
  const params = {
    TableName: "files-table",
    Key: {
      fileId: file.fileId
    },
    UpdateExpression: "set folderId = :folderId",
    ExpressionAttributeValues: {
      ":folderId": file.folderId
    },
    ReturnValues: "UPDATED_NEW"
  };
  await docClient.update(params).promise();
};
