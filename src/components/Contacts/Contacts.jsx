import { useDispatch, useSelector } from 'react-redux';
import { remove, changeFilter } from 'redux/slices';
import { getContactsValue, getFilterValue } from 'redux/selectors';
import {
  ContactsList,
  ContactsItem,
  FilterLabel,
  FilterInput,
  DeleteBtn,
} from './Contacts.styled';
import { nanoid } from 'nanoid';

export const Contacts = () => {
  const filterValue = useSelector(getFilterValue);
  const contactsArray = useSelector(getContactsValue);

  const dispatch = useDispatch();

  const deleteContact = contactId => {
    dispatch(remove(contactId));
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

  const visibleContacts = handleFilter();

  return (
    <>
      <FilterLabel htmlFor="filter">Find contacts by name</FilterLabel>
      <FilterInput
        type="text"
        id="filter"
        name="filter"
        value={filterValue}
        onChange={handleChange}
      />
      <ContactsList>
        {visibleContacts.map(contactItem => {
          return (
            <ContactsItem key={nanoid(4)}>
              {contactItem.name}: {contactItem.number}
              <DeleteBtn
                type="button"
                onClick={() => deleteContact(contactItem.id)}
              >
                Delete
              </DeleteBtn>
            </ContactsItem>
          );
        })}
      </ContactsList>
    </>
  );
};
