import { LightningElement, wire} from 'lwc';
import getContacts from '@salesforce/apex/contactController.getContacts';
import searchContacts from '@salesforce/apex/contactController.searchContacts';
import { publish, MessageContext } from 'lightning/messageService';
import ContactSelected from '@salesforce/messageChannel/Contact_Selected__c';

export default class ContactList extends LightningElement {

    @wire(getContacts) contacts;
	@wire(MessageContext)
    messageContext;

	handleItemClick(event) {
        const payload = {contactId: event.target.value };
		console.log("payload" + JSON.stringify(payload))
		publish(this.messageContext, ContactSelected, payload);
	}

//search
    searchTerm = '';
	@wire(searchContacts, {searchTerm: '$searchTerm'})
	contacts;

	handleSearchTermChange(event) {
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.contacts.data.length > 0);
	}
}