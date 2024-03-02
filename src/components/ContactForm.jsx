import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleNumberChange = (event) => {
    this.setState({ number: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { contacts, onSubmit } = this.props;
    const { name, number } = this.state;

    if (!name || !number) {
      alert('Please fill out all fields.');
      return;
    }

    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert('This contact already exists!');
      return;
    }

    onSubmit({ id: nanoid(), name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label htmlFor="1" className={css.label}>Name:</label>
        <input
          type="text"
          id="1"
          name="contactName"
          pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,25}[ ]{1}[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,25}"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          value={name}
          onChange={this.handleNameChange}
        />
        <label htmlFor="2" className={css.label}>Number:</label>
        <input
          type="tel"
          id="2"
          name="number"
          pattern="\\\\+?\\\\d{1,4}[-.\\s]?\\\\(\\\\?\\\\d{1,3}\\\\)?[-.\\s]?\\\\d{1,4}[-.\\s]?\\\\d{1,4}[-.\\s]?\\\\d{1,9}" 
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleNumberChange}
        />
        <button type="submit" className={css.button}>Add Contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm; 