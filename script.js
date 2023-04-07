let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

const saveContactsToLocalStorage = () => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

const renderContacts = (filteredContacts = contacts) => {
  const tbody = document.querySelector('#contacts tbody');
  tbody.innerHTML = '';
  filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
  for (let i = 0; i < filteredContacts.length; i++) {
    const contact = filteredContacts[i];
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.textContent = contact.name;
    const mobileTd = document.createElement('td');
    mobileTd.textContent = contact.mobile;
    const actionTd = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn'); // add class to edit button
    editBtn.addEventListener('click', () => {
      editContact(i);
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn'); // add class to delete button
    deleteBtn.addEventListener('click', () => {
      deleteContact(i);
    });
    actionTd.appendChild(editBtn);
    actionTd.appendChild(deleteBtn);
    tr.appendChild(nameTd);
    tr.appendChild(mobileTd);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  }
};

const addContact = () => {
  const nameInput = document.querySelector('#name');
  const mobileInput = document.querySelector('#mobile');
  const name = nameInput.value.trim();
  const mobile = mobileInput.value.trim();
  if (!name || !mobile) {
    alert('Name and Mobile are required!');
    return;
  }
  const existingContact = contacts.find((c) => c.mobile === mobile);
  if (existingContact) {
    alert('Mobile number already exists!');
    return;
  }
  contacts.push({ name, mobile });
  nameInput.value = '';
  mobileInput.value = '';
  renderContacts();
  saveContactsToLocalStorage();
};

const editContact = (index) => {
  const contact = contacts[index];
  const newName = prompt('Enter new name:', contact.name);
  if (!newName) {
    return;
  }
  const newMobile = prompt('Enter new mobile number:', contact.mobile);
  if (!newMobile) {
    return;
  }
  const existingContact = contacts.find((c) => c.mobile === newMobile && c.mobile !== contact.mobile);
  if (existingContact) {
    alert('Mobile number already exists!');
    return;
  }
  contacts[index] = { name: newName, mobile: newMobile };
  renderContacts();
  saveContactsToLocalStorage();
};

const deleteContact = (index) => {
  if (confirm('Are you sure you want to delete this contact?')) {
    contacts.splice(index, 1);
    renderContacts();
    saveContactsToLocalStorage();
  }
};

const filterContacts = () => {
  const searchInput = document.querySelector('#search');
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredContacts = contacts.filter((c) => c.name.toLowerCase().includes(searchTerm) || c.mobile.includes(searchTerm));
  renderContacts(filteredContacts);
};

document.querySelector('#add-btn').addEventListener('click', addContact);
document.querySelector('#search').addEventListener('keyup', filterContacts);

renderContacts();
