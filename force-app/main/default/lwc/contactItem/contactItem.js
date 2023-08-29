import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Contact.Name';

import KARMA_OBJECT from '@salesforce/schema/Karma_Entry__c';
import PERSON_FIELD from '@salesforce/schema/Karma_Entry__c.Person__c';
import TYPE_FIELD from '@salesforce/schema/Karma_Entry__c.Type__c';
import POINTS_FIELD from '@salesforce/schema/Karma_Entry__c.Value__c';
import COMMENT_FIELD from '@salesforce/schema/Karma_Entry__c.Text_Comment__c';



export default class ContactItem extends LightningElement {
    // Expose a field to make it available in the template
    nameField = NAME_FIELD;

    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
    pointsOptions = [
        { label: '-2', value: '-2' },
        { label: '-1', value: '-1' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },

    ];

    handleContactSelected(event) {
        const contactId = event.detail;
        console.log('child:Selected contact id:', contactId);
    }

    //submit Karma


    objectApiName = KARMA_OBJECT;
    fields = [PERSON_FIELD, TYPE_FIELD, POINTS_FIELD, COMMENT_FIELD];

    handleSuccess(event) {
/*         event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-form').submit(fields); */

        const toastEvent = new ShowToastEvent({
            title: "Karma is created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
    handleError(event) {
        const toastEvent = new ShowToastEvent({
            title: "Error Creating Karma Entry",
            message: "An error occurred while creating the record: " + event.detail.message,
            variant: "error"
        });
        this.dispatchEvent(toastEvent);
    }

}
