import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import ContactSelected from '@salesforce/messageChannel/Contact_Selected__c';
import CONTACT from '@salesforce/schema/Contact';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import KARMA_OBJECT from '@salesforce/schema/jetbikarma__Karma_Entry__c';
import PERSON_FIELD from '@salesforce/schema/jetbikarma__Karma_Entry__c.jetbikarma__Person__c';
import TYPE_FIELD from '@salesforce/schema/jetbikarma__Karma_Entry__c.jetbikarma__Type__c';
import POINTS_FIELD from '@salesforce/schema/jetbikarma__Karma_Entry__c.jetbikarma__Value__c';
import COMMENT_FIELD from '@salesforce/schema/jetbikarma__Karma_Entry__c.jetbikarma__Text_Comment__c';

export default class ContactItem extends LightningElement {

    subscription = null;
    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                ContactSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {
        this.recordId = message.contactId;
    }

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    // Expose a field to make it available in the template
    nameField = NAME_FIELD;

    // Flexipage provides recordId and objectApiName
    @api recordId;
    contactApiName = CONTACT;
   
    //submit Karma
    objectApiName = KARMA_OBJECT;

    //fields for record-edit-form (HTML)
    personField = PERSON_FIELD;
    typeField = TYPE_FIELD;
    pointsField = POINTS_FIELD;
    commentField = COMMENT_FIELD;
    karmaId = null;

    handleSuccess(event) {
        this.karmaId = event.detail.id;
        const toastEvent = new ShowToastEvent({
            title: "Karma is created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });

        this.dispatchEvent(toastEvent);
    }

    handleError(event) {
        alert("error" + JSON.stringify(event));
        const toastEvent = new ShowToastEvent({
            title: "Error Creating Karma Entry",
            message: "An error occurred while creating the record: " + event.detail.message,
            variant: "error"
        });
        this.dispatchEvent(toastEvent);
    }

}
