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