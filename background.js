

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // Check the type of message received
  if (message.action === "createFile") {
    // Perform actions to create a file
    createFile(message.code, message.language);
  } else if (message.action === "printCode") {
    // Perform actions to print code
    printCode(message.code);
  }
});

// Function to create a file based on code snippet and language
function createFile(code, language) {
  // Determine the appropriate file extension based on the programming language
  var extension;
  switch (language) {
    case "javascript":
      extension = ".js";
      break;
    case "js":
      extension = ".js";
      break;
    case "html":
      extension = ".html";
      break;
    case "css":
      extension = ".css";
      break;
    case "python":
      extension = ".py";
      break;
    default:
      extension = ".txt";
  }

  // Create a Blob with the code data
  var blob = new Blob([code], { type: 'text/plain' });

  // Create a URL for the Blob
  var url = URL.createObjectURL(blob);

  // Create a download anchor element
  var link = document.createElement('a');
  link.href = url;
  link.download = "file" + extension;

  // Dispatch a click event on the anchor element to trigger the download
  link.dispatchEvent(new MouseEvent('click'));

  // Clean up by revoking the URL
  URL.revokeObjectURL(url);
}

// Function to print code snippet
function printCode(code) {
  // Create a new window
  var printWindow = window.open('', '_blank');

  // Write the code content to the print window
  printWindow.document.write('<html><head><title>Print</title></head><body><pre>' + code + '</pre></body></html>');

  // Close the print window after printing
  printWindow.onload = function() {
    printWindow.print();
    printWindow.close();
  };
}

