// Task 2 - Dynamically Add Support Tickets
function addSupportTicket(name, issue, priority) {
  const ticketContainer = document.getElementById('ticketContainer');

  // Create the ticket div container
  const ticket = document.createElement('div');
  ticket.classList.add('ticket');

  // Create and set the customer name heading
  const customerName = document.createElement('h2');
  customerName.textContent = name;

  // Create and set the issue description paragraph
  const issueDescription = document.createElement('p');
  issueDescription.textContent = `Issue: ${issue}`;

  // Create and set the priority level label
  const priorityLabel = document.createElement('span');
  priorityLabel.textContent = `Priority: ${priority}`;
  priorityLabel.classList.add('priority');

  // Create the "Resolve" button for removing the ticket
  const resolveButton = document.createElement('button');
  resolveButton.textContent = 'Resolve';
  resolveButton.classList.add('resolve-btn');
  
  // Add event listener to remove the ticket when the "Resolve" button is clicked
  resolveButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event bubbling
    ticketContainer.removeChild(ticket);
    console.log(`Ticket for ${name} resolved.`);
  });

  // Add event listener to allow inline editing (Task 5)
  ticket.addEventListener('dblclick', () => editTicket(ticket, name, issue, priority));

  // Append all elements to the ticket div
  ticket.appendChild(customerName);
  ticket.appendChild(issueDescription);
  ticket.appendChild(priorityLabel);
  ticket.appendChild(resolveButton);

  // Append the newly created ticket to the ticket container
  ticketContainer.appendChild(ticket);

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

// Task 4 - Handling Event Bubbling: Logging ticket details when clicked
document.getElementById('ticketContainer').addEventListener('click', (event) => {
  // Check if the clicked element is a ticket
  if (event.target.classList.contains('ticket')) {
    const ticketName = event.target.querySelector('h2').textContent;
    console.log(`Ticket Clicked: Customer - ${ticketName}`);
  }
});

// Task 5 - Editing Support Tickets Inline: Allowing updates to ticket details
function editTicket(ticket, name, issue, priority) {
  // Clear current ticket content and replace with editable fields
  ticket.innerHTML = '';

  // Create input field for customer name
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = name; 

  // Create input field for issue description
  const issueInput = document.createElement('input');
  issueInput.type = 'text';
  issueInput.value = issue; 

  // Create a dropdown for priority level selection
  const priorityInput = document.createElement('select');
  ['High', 'Medium', 'Low'].forEach((level) => {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = level;
    if (level === priority) option.selected = true; // Set the current priority as selected
    priorityInput.appendChild(option);
  });

  // Create a Save button to save the changes
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save-btn'); // Add a class for styling

  // Event listener for the Save button to apply changes
  saveButton.addEventListener('click', () => {
    // Get the updated values from the inputs
    const updatedName = nameInput.value;
    const updatedIssue = issueInput.value;
    const updatedPriority = priorityInput.value;

    ticket.innerHTML = ''; // Clear current content

    // Re-create and append updated content (customer name, issue, priority)
    const customerName = document.createElement('h2');
    customerName.textContent = updatedName;

    const issueDescription = document.createElement('p');
    issueDescription.textContent = `Issue: ${updatedIssue}`;

    const priorityLabel = document.createElement('span');
    priorityLabel.textContent = `Priority: ${updatedPriority}`;
    priorityLabel.classList.add('priority'); // Add a class for priority styling

    // Create a Resolve button for removing the ticket
    const resolveButton = document.createElement('button');
    resolveButton.textContent = 'Resolve';
    resolveButton.classList.add('resolve-btn'); // Add a class for Resolve button styling
    resolveButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent event from bubbling up
      ticket.parentElement.removeChild(ticket); // Remove the ticket from the container
      console.log(`Ticket for ${updatedName} has been resolved.`);
    });

    // Re-enable the double-click event for inline editing of the ticket
    ticket.addEventListener('dblclick', () => editTicket(ticket, updatedName, updatedIssue, updatedPriority));

    // Append the updated elements back to the ticket
    ticket.appendChild(customerName);
    ticket.appendChild(issueDescription);
    ticket.appendChild(priorityLabel);
    ticket.appendChild(resolveButton);

    // Reapply highlighting to high-priority tickets (Task 3)
    highlightHighPriorityTickets();
  });

  // Append input fields and Save button to allow for editing
  ticket.appendChild(nameInput);
  ticket.appendChild(issueInput);
  ticket.appendChild(priorityInput);
  ticket.appendChild(saveButton);
}

// Example test cases to add support tickets and highlight high-priority ones
addSupportTicket('Johnny Mac', 'Unable to save and refresh', 'High');
addSupportTicket('Adam Smith', 'Site running slow', 'Medium');
addSupportTicket('Mark Pearson', 'Unable to refresh', 'High');

// Highlight high-priority tickets in the dashboard
highlightHighPriorityTickets();
