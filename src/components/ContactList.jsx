import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredContacts: props.contacts,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.props.contacts) {
      this.setState({ filteredContacts: this.props.contacts });
    }
  }

  handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const filteredContacts = this.props.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
    this.setState({ filteredContacts });
  };

  render() {
    const { filteredContacts } = this.state;
    const { onDeleteContact } = this.props;

    return (
      <div>
        <input 
          type="text"
          onChange={this.handleFilterChange}
          placeholder="Search contacts by name..."
          className={css.filter}
        />
        <ul className={css.list}>
          {filteredContacts.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button onClick={() => onDeleteContact(contact.id)} className={css.button}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList; 