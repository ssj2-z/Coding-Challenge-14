// Task 2 - Support Tickets Dynamic Addition
function addSupportTicket(name, issue, priority) {
    const ticketContainer = document.getElementById('ticketContainer');
  
    // Creation of ticket div
    const ticket = document.createElement('div');
    ticket.classList.add('ticket');
  
    // Customer Name (Heading)
    const customerName = document.createElement('h2');
    customerName.textContent = name;
  
    // Issue Description 
    const issueDescription = document.createElement('p');
    issueDescription.textContent = `Issue: ${issue}`;
  
    // Priority Label fo importance
    const priorityLabel = document.createElement('span');
    priorityLabel.textContent = `Priority: ${priority}`;
    priorityLabel.classList.add('priority');
  
    // Resolve Button for discrepancies
    const resolveButton = document.createElement('button');
    resolveButton.textContent = 'Resolve';
    resolveButton.classList.add('resolve-btn');
    
    // Event listener to remove ticket when resolve button is clicked
    resolveButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Stop bubbling
      ticketContainer.removeChild(ticket);
      console.log(`Ticket for ${name} resolved.`);
    });
  
    // Add event listener for inline editing (Task 5)
    ticket.addEventListener('dblclick', () => editTicket(ticket, name, issue, priority));
  
    // Append elements to ticket
    ticket.appendChild(customerName);
    ticket.appendChild(issueDescription);
    ticket.appendChild(priorityLabel);
    ticket.appendChild(resolveButton);
  
    // Add ticket to container
    ticketContainer.appendChild(ticket);
  }
    // Task 3 - Highlighting High Priority Tickets
    function highlightHighPriorityTickets() {
      const highPriorityTickets = document.querySelectorAll('.priority');
      const ticketsArray = Array.from(highPriorityTickets);
    
      ticketsArray.forEach((ticket) => {
        if (ticket.textContent.includes('High')) {
          ticket.parentElement.style.backgroundColor = '#ffcccc'; // Light red background
          ticket.parentElement.style.border = '2px solid #e74c3c'; // Red border
        }
      });
    }
      // Task 4 - Event Bubbling (Logging messages when ticket is clicked)
  document.getElementById('ticketContainer').addEventListener('click', (event) => {
    if (event.target.classList.contains('ticket')) {
      console.log(`Ticket clicked: ${event.target.querySelector('h2').textContent}`);
    }
  });
// Task 5 - Inline Editing of Support Tickets
function editTicket(ticket, name, issue, priority) {
  // Replace static text with input fields
  ticket.innerHTML = '';

  // Name input
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = name;

  // Issue input
  const issueInput = document.createElement('input');
  issueInput.type = 'text';
  issueInput.value = issue;

  // Priority input
  const priorityInput = document.createElement('select');
  ['High', 'Medium', 'Low'].forEach((level) => {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = level;
    if (level === priority) option.selected = true;
    priorityInput.appendChild(option);
  });

  // Save button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save-btn');

  // Save event
  saveButton.addEventListener('click', () => {
    // Update ticket with new values
    const updatedName = nameInput.value;
    const updatedIssue = issueInput.value;
    const updatedPriority = priorityInput.value;

    ticket.innerHTML = ''; // Clear existing content

    // Add updated content back
    const customerName = document.createElement('h2');
    customerName.textContent = updatedName;

    const issueDescription = document.createElement('p');
    issueDescription.textContent = `Issue: ${updatedIssue}`;

    const priorityLabel = document.createElement('span');
    priorityLabel.textContent = `Priority: ${updatedPriority}`;
    priorityLabel.classList.add('priority');

    // Resolve button
    const resolveButton = document.createElement('button');
    resolveButton.textContent = 'Resolve';
    resolveButton.classList.add('resolve-btn');
    resolveButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Stop bubbling
      ticket.parentElement.removeChild(ticket);
      console.log(`Ticket for ${updatedName} resolved.`);
    });

    // Add editing feature to repeat
    ticket.addEventListener('dblclick', () => editTicket(ticket, updatedName, updatedIssue, updatedPriority));

    // Append updated elements
    ticket.appendChild(customerName);
    ticket.appendChild(issueDescription);
    ticket.appendChild(priorityLabel);
    ticket.appendChild(resolveButton);

    // Highlight high-priority tickets again
    highlightHighPriorityTickets();
  });

  // Append input fields and button to ticket
  ticket.appendChild(nameInput);
  ticket.appendChild(issueInput);
  ticket.appendChild(priorityInput);
  ticket.appendChild(saveButton);
}

// Example test cases
addSupportTicket('Johnny Mac', 'Unable to save and refresh', 'High');
addSupportTicket('Adam Smith', 'Site running slow', 'Medium');
addSupportTicket('Mark Pearson', 'Unable to refresh', 'High');

// Highlight high-priority tickets
highlightHighPriorityTickets();