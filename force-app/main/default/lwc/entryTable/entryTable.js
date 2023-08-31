import { LightningElement, track, wire} from 'lwc';
import getEntryTable from '@salesforce/apex/getRecordDataController.getEntryTable';

export default class EntryTable extends LightningElement {

     @track columns = [
            { label: 'Date', fieldName: 'CreatedDate', hideDefaultActions: true },
            { label: 'Give to whom, ID', fieldName: 'jetbikarma__Person__c', hideDefaultActions: true },
            { label: 'Karma points', fieldName: 'jetbikarma__Value__c', hideDefaultActions: true },
            { label: 'Comment', fieldName: 'jetbikarma__Text_Comment__c', hideDefaultActions: true }
      ];

     @track entryTable;

     @wire (getEntryTable) wiredContacts({data,error}){
        if (data) {
             this.entryTable = data;
        console.log(data); 
        } else if (error) {
        console.log("Message" + JSON.stringify(error));
        }
     }

}