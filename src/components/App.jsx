import { useDispatch, useSelector } from 'react-redux';
import { add, remove, changeFilter } from 'redux/slices';
import { getContactsValue, getFilterValue } from 'redux/selectors';
import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Box } from './Box';

export const App = () => {
  const filterValue = useSelector(getFilterValue);
  const contactsArray = useSelector(getContactsValue);

  const dispatch = useDispatch();

  const addContact = (name, number) => {
    const isContactAdded = contactsArray.some(contact => contact.name === name);

    if (isContactAdded) {
      alert(`${name} is Already in contacts`);
    } else {
      dispatch(add(name, number));
    }
  };

  const deleteContact = contactId => {
    dispatch(remove(contactId));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target.elements;
    addContact(name.value, number.value);
    e.currentTarget.reset();
  };

  const handleChange = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  const handleFilter = () => {
    const normalizedFilter = filterValue.toLowerCase().trim();
    return contactsArray.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
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
          filterValue={filterValue}
        ></Contacts>
      </Section>
    </Box>
  );
};
