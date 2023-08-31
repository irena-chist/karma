public with sharing class getRecordDataController {
    @AuraEnabled(cacheable=true)
    public static List<jetbikarma__Karma_Entry__c> getEntryTable() {
        return [
            SELECT Id, Name, jetbikarma__Value__c, 	jetbikarma__Person__c, jetbikarma__Person__r.Name, jetbikarma__Text_Comment__c,
            CreatedDate 
            FROM jetbikarma__Karma_Entry__c
            ORDER BY CreatedDate DESC
            ];
        }


        @AuraEnabled(cacheable=true)
        public static String getContactName(Id contactId) {
            String contactName = '';
            
            if (contactId != null) {
                Contact contactRecord = [SELECT Name FROM Contact WHERE Id = :contactId LIMIT 1];
                if (contactRecord != null) {
                    contactName = contactRecord.Name;
                }
            }
            
            return contactName;
        }
}