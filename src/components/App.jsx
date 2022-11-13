import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Box } from './Box';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const resetForm = (nameValue, numberValue) => {
    nameValue = '';
    numberValue = '';
  };

  const handleChange = e => {
    switch (e.target.name) {
      case 'contacts':
        setContacts(e.target.value);
        return;

      case 'filter':
        setFilter(e.target.value);
        return;

      default:
        throw new Error('Invalid event target name');
    }
  };

  const handleFilter = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const addContact = (name, number) => {
    const isContactAdded = contacts.some(contact => contact.name === name);
    const newContact = { id: nanoid(3), name, number };

    if (isContactAdded) {
      alert(`${name} is Already in contacts`);
    } else {
      setContacts(prevState => [newContact, ...prevState]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target.elements;
    addContact(name.value, number.value);
    resetForm(name.value, number.value);
  };

  return (
    <Box width="400px">
      <Section title="Phonebook">
        <Form handleSubmit={handleSubmit}></Form>
      </Section>
      <Section title="Contacts">
        <Contacts
          handleChange={handleChange}
          handleDelete={deleteContact}
          contacts={handleFilter()}
          filterValue={filter}
        ></Contacts>
      </Section>
    </Box>
  );
};
