
// Function to create and add the "Create File" button to containers
function addCreateFileButtonToContainers() {
  // Select all containers on the page that contain code
  var containers = document.querySelectorAll('.px-4.py-2.justify-center.text-base.md\\:gap-6.m-auto, .flex.items-center.relative.text-token-text-secondary.bg-token-main-surface-secondary.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md');

  // Loop through each container
  containers.forEach(function(container) {
    // Check if the container already has the "Create File" button
    if (!container.querySelector("#update-vscode-btn")) {
      // Find the span that displays the selected programming language
      var languageSpan = container.querySelector('span');
      if (languageSpan) {
        // Create the "Create File" button
        var createFileButton = document.createElement("button");
        createFileButton.id = "update-vscode-btn";
        createFileButton.textContent = "Create File";
        createFileButton.style.padding = "2px 10px";
        createFileButton.style.border = "none";
        createFileButton.style.borderRadius = "20px";
        createFileButton.style.color = "#fff";
        createFileButton.style.backgroundColor = "#28a745";
        createFileButton.style.fontWeight = "300";
        createFileButton.style.marginRight = "10px";

        // Add click event listener to the "Create File" button
        createFileButton.addEventListener("click", function() {
          // Click on the element with class "flex gap-1 items-center"
          var elementToClick = container.querySelector('.flex.gap-1.items-center');
          if (elementToClick) {
            elementToClick.click();
          }

          // Dump the data from the clipboard into a file
          var clipboardData = navigator.clipboard.readText().then(function(data) {
            // Determine the appropriate file extension based on the programming language
            var language = languageSpan.textContent.trim().toLowerCase();
            var extension;
            switch (language.toLowerCase()) {
			  case "javascript":
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
			  case "java":
			    extension = ".java";
			    break;
			  case "c":
			    extension = ".c";
			    break;
			  case "cpp":
			    extension = ".cpp";
			    break;
			  case "ruby":
			    extension = ".rb";
			    break;
			  case "php":
			    extension = ".php";
			    break;
			  case "swift":
			    extension = ".swift";
			    break;
			  case "go":
			    extension = ".go";
			    break;
			  case "typescript":
			    extension = ".ts";
			    break;
			  case "rust":
			    extension = ".rs";
			    break;
			  case "kotlin":
			    extension = ".kt";
			    break;
			  default:
			    extension = ".txt";
			}


            // Create a Blob with the clipboard data
            var blob = new Blob([data], { type: 'text/plain' });

            // Create a link element to download the file
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "file" + extension;

            // Dispatch a click event on the link to trigger the download
            link.dispatchEvent(new MouseEvent('click'));
          });
        });

        // Append the "Create File" button to the container
        
       btn = container.querySelector('button').textContent.trim().toLowerCase() == "copy code";
       if (btn){

       // Get a reference to the parent node of the parent node of the existing button
	var grandparentNode = container.querySelector('button').parentNode.parentNode;
	
   	 // Get a reference to the last child node of the grandparent node
    	var lastChild = grandparentNode.lastChild;
	    
	 // Insert the new button before the last child
	 grandparentNode.insertBefore(createFileButton, lastChild);
       
       }
       
      }
    }
  });
}

// Set interval to check for buttons in containers every 3 seconds
setInterval(addCreateFileButtonToContainers, 3000);

// Function to create and add the print button to containers
function addPrintButtonToContainers() {
  // Select all containers on the page that contain code
  var containers = document.querySelectorAll('.px-4.py-2.justify-center.text-base.md\\:gap-6.m-auto');

  // Loop through each container
  containers.forEach(function(container) {
    // Check if the container already has the print button
    if (!container.querySelector(".print-button")) {
      // Find the div with class "font-semibold select-none" and text "ChatGPT"
      var chatGPTDiv = container.querySelector('.font-semibold.select-none');
      if (chatGPTDiv && chatGPTDiv.textContent.trim() === "ChatGPT") {
        // Create the print button
        var printButton = document.createElement("button");
        printButton.classList.add("print-button");
        printButton.textContent = "Print"; // Replace icon with text for now
        printButton.style.backgroundColor = "#007bff";
        printButton.style.color = "#fff";
        printButton.style.border = "none";
        printButton.style.borderRadius = "5px";
        printButton.style.padding = "5px 10px";
        printButton.style.marginLeft = "auto";
        printButton.style.cursor = "pointer";
        printButton.style.float = "right"; // Align the button to the right

        // Add click event listener to the print button
        printButton.addEventListener("click", function() {
          // Clone the container content excluding the print button
          var contentToPrint = container.cloneNode(true);
          var printButtonToRemove = contentToPrint.querySelector(".print-button");
          if (printButtonToRemove) {
            printButtonToRemove.remove();
          }

          
          // Exclude specific elements during printing
          var elementsToExclude = contentToPrint.querySelectorAll('.font-semibold.select-none, .flex-shrink-0.flex.flex-col.relative.items-end, .flex.items-center.relative.text-token-text-secondary.bg-token-main-surface-secondary.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md, .mt-1.flex.justify-start.gap-3.empty\\:hidden');
          elementsToExclude.forEach(function(element) {
            element.remove();
          });

          // Open a new window and print the content
          var printWindow = window.open('', '_blank');
          printWindow.document.write('<html><head><title>Print</title><style>.print-hidden { display: none; }</style></head><body>' + contentToPrint.outerHTML + '</body></html>');
          printWindow.document.close();
          printWindow.print();
        });

        // Append the print button to the container
        chatGPTDiv.appendChild(printButton);
      }
    }
  });
}

// Set interval to check for print buttons in containers every 3 seconds
setInterval(addPrintButtonToContainers, 3000);

// Mutation observer to listen for new code containers added to the page
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.nodeType === Node.ELEMENT_NODE && (node.matches('.px-4.py-2.justify-center.text-base.md\\:gap-6.m-auto') || node.matches('.flex.items-center.relative.text-token-text-secondary.bg-token-main-surface-secondary.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md'))) {
        // Add the buttons to the new code container
        addCreateFileButtonToContainers();
        addPrintButtonToContainers();
      }
    });
  });
});

// Observe mutations in the body and its descendants
observer.observe(document.body, { childList: true, subtree: true });


