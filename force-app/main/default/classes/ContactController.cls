public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT Id, Name, jetbikarma__Photo__c 
            FROM Contact
            ORDER BY Name
        ];
    }

    @AuraEnabled(cacheable=true scope='global')
    public static Contact[] searchContacts(String searchTerm) {
        // Return all bears when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getContacts();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return [
            SELECT 
                Id, 
                Name, 
                jetbikarma__Photo__c 
            FROM Contact
            WHERE Name LIKE :searchTerm
            ORDER BY Name
        ];
    }
}