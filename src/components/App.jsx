import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Box } from './Box';

export const App = () => {
  return (
    <Box width="400px">
      <Section title="Phonebook">
        <Form></Form>
      </Section>
      <Section title="Contacts">
        <Contacts></Contacts>
      </Section>
    </Box>
  );
};
