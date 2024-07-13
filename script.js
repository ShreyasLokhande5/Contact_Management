let contacts = [];

// Function to render contacts from localStorage
function renderContacts() {
  const contactsList = document.getElementById("contacts-list");
  contactsList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact");
    contactDiv.innerHTML = `
            <span>${contact.name}</span>
            <span>${contact.email}</span>
             <span>${contact.number}</span>
            <button onclick="editContact(${index})">Edit</button>
            <button onclick="deleteContact(${index})">Delete</button>
        `;
    contactsList.appendChild(contactDiv);
  });
}

// Function to add a contact
function addContact() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const numberInput = document.getElementById("number");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const number = numberInput.value.trim();

  if (name !== "" && email !== "") {
    const newContact = { name, email, number };
    contacts.push(newContact);
    saveContacts();
    nameInput.value = "";
    emailInput.value = "";
    numberInput.value = "";
    renderContacts();
  } else {
    alert("Please enter name and email.");
  }
}

// Function to edit a contact
function editContact(index) {
  const newName = prompt("Enter new name:", contacts[index].name);
  const newEmail = prompt("Enter new email:", contacts[index].email);
  const newNumber = prompt("Enter new number:", contacts[index].number);

  if (newName !== null && newEmail !== null) {
    contacts[index].name = newName.trim();
    contacts[index].email = newEmail.trim();
    contacts[index].number = newNumber.trim();
    saveContacts();
    renderContacts();
  }
}

// Function to delete a contact
function deleteContact(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  }
}

// Function to save contacts to localStorage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Function to load contacts from localStorage on page load
function loadContacts() {
  const storedContacts = localStorage.getItem("contacts");
  if (storedContacts) {
    contacts = JSON.parse(storedContacts);
    renderContacts();
  }
}

// Initial load of contacts
loadContacts();
