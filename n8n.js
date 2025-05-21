// Get items from previous node
const items = $input.all();
const webhookData = items[0];

const timestamp = new Date().toISOString();

// Log the full input structure to examine in n8n UI
console.log("Full webhook input keys:", Object.keys(webhookData));
console.log("JSON data:", JSON.stringify(webhookData.json, null, 2));

// Debug the request structure more thoroughly
if (webhookData.json) {
  console.log("Headers:", JSON.stringify(webhookData.json.headers, null, 2));
  console.log("Body keys:", Object.keys(webhookData.json.body || {}));
}

// Look for binary files - check multiple possible locations
let binaryData = {};
let fileNames = [];
let fileDetails = [];

console.log("Debug: Checking for files in the request");

// Method 1: Check standard binary data property in n8n
if (webhookData.binary) {
  console.log("Found binary data in webhookData.binary:", Object.keys(webhookData.binary));
  binaryData = webhookData.binary;
  
  // Extract file names from binary data
  Object.keys(binaryData).forEach(key => {
    const fileName = binaryData[key].fileName || key;
    fileNames.push(fileName);
    fileDetails.push({
      name: fileName,
      type: binaryData[key].mimeType || 'unknown',
      size: binaryData[key].data ? binaryData[key].data.length : 0,
      source: 'binary'
    });
  });
}

// Method 2: Check for files with key 'file' (the new approach in our frontend)
if (webhookData.json?.body?.file) {
  console.log("Found 'file' key in body");
  // This is likely an array if multiple files were uploaded with the same field name
  if (Array.isArray(webhookData.json.body.file)) {
    webhookData.json.body.file.forEach((file, index) => {
      fileNames.push(`file-${index}`);
      fileDetails.push({
        name: `file-${index}`,
        source: 'body.file-array'
      });
    });
  } else {
    // Single file
    fileNames.push('file');
    fileDetails.push({
      name: 'file',
      source: 'body.file-single'
    });
  }
}

// Method 3: Check for file metadata using our new pattern file_0_name, file_1_name, etc.
const metadataPattern = /file_(\d+)_name/;
const metadataFields = Object.keys(webhookData.json?.body || {}).filter(key => metadataPattern.test(key));

if (metadataFields.length > 0) {
  console.log("Found file metadata fields with new pattern:", metadataFields);
  
  metadataFields.forEach(field => {
    const match = field.match(metadataPattern);
    if (match && match[1]) {
      const index = match[1];
      const name = webhookData.json.body[field];
      const type = webhookData.json.body[`file_${index}_type`];
      const size = webhookData.json.body[`file_${index}_size`];
      
      console.log(`File metadata found: name=${name}, type=${type}, size=${size}`);
      
      if (name && !fileNames.includes(name)) {
        fileNames.push(name);
        fileDetails.push({
          name,
          type,
          size: size ? parseInt(size, 10) : 0,
          source: 'metadata'
        });
      }
    }
  });
}

// Method 4: Also check old pattern (file0, file1) for backward compatibility
const filePattern = /file\d+$/;
const possibleFiles = Object.keys(webhookData.json?.body || {}).filter(key => filePattern.test(key));

if (possibleFiles.length > 0) {
  console.log("Found potential file keys in body with old pattern:", possibleFiles);
  
  possibleFiles.forEach(fileKey => {
    const file = webhookData.json.body[fileKey];
    if (file) {
      fileNames.push(fileKey);
      fileDetails.push({
        name: fileKey,
        source: 'body.fileN'
      });
    }
  });
}

// Method 5: Check if there are any binary data in another format
// Sometimes n8n puts file data in json.data or another location
if (webhookData.json?.data?.files) {
  console.log("Found files in data.files");
  if (Array.isArray(webhookData.json.data.files)) {
    const dataFiles = webhookData.json.data.files.map(f => ({
      name: f.name || "unnamed file",
      source: 'data.files'
    }));
    
    fileNames.push(...dataFiles.map(f => f.name));
    fileDetails.push(...dataFiles);
  }
}

// Output debug info about found files
console.log(`Files found in request: ${fileNames.length}`);
console.log("File details:", JSON.stringify(fileDetails, null, 2));

// Extract form fields
const formData = {
  subject: webhookData.json.body?.subject || 'Not specified',
  academicLevel: webhookData.json.body?.academicLevel || 'Not specified',
  pageCount: webhookData.json.body?.pageCount || 'Not specified',
  deadline: webhookData.json.body?.deadline || 'Not specified',
  instructions: webhookData.json.body?.instructions || 'None',
  email: webhookData.json.body?.email || 'Not provided',
  fileCount: webhookData.json.body?.fileCount || '0',
  uploadedFiles: fileNames.length > 0 ? fileNames : ['No files detected']
};

// Get reference ID from the request body
const referenceId = webhookData.json.body?.referenceId || `REF-${Date.now().toString(36).toUpperCase()}`;

// Prepare detailed diagnostics about files
const fileCount = parseInt(webhookData.json.body?.fileCount || '0', 10);
const fileKeys = Object.keys(webhookData.json?.body || {}).filter(key => key.startsWith('file'));
const fileMetadataCount = fileKeys.filter(key => key.includes('_name') || key.includes('_type') || key.includes('_size')).length;

// Enhanced diagnostic data about the request
const diagnostics = {
  expectedFileCount: fileCount,
  detectedFileCount: fileNames.length,
  hasBinaryData: Object.keys(binaryData).length > 0,
  detectedFileKeys: fileKeys,
  contentType: webhookData.json?.headers?.['content-type'] || 'unknown',
  bodyKeys: Object.keys(webhookData.json?.body || {})
};

// Create a structured response
return [{
  json: {
    success: true,
    referenceId: referenceId,
    message: 'Assignment uploaded successfully',
    timestamp: timestamp,
    formData: formData,
    // Return information about binary data
    files: {
      count: fileNames.length,
      names: fileNames,
      hasBinaryData: Object.keys(binaryData).length > 0,
      diagnostics: diagnostics
    }
  },
  // Pass through the binary data
  binary: binaryData
}];