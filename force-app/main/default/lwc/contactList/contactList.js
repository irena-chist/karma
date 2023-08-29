import { LightningElement, track, wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getContacts from '@salesforce/apex/contactController.getContacts';
import searchContacts from '@salesforce/apex/contactController.searchContacts';
export default class ContactList extends LightningElement {
	contacts;
    selectedContact; 
/* 	constructor() {
		super();
		this.template.addEventListener("notification", this.handleItemClick);
	  }
	  handleItemClick = () => {}; */
    @wire(getContacts)
	handleItemClick(contactId) {

		const event = new CustomEvent('contactselected', {
			detail: contactId
		});
		this.dispatchEvent(event);
		console.log('Selected contact id:',contactId);
	}
     @track contactList;

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