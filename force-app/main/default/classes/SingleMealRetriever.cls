public with sharing class SingleMealRetriever {
    
    public static void makeGetCallout() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> mealList = (List<Object>) results.get('meals');
            System.debug('Received the following meals:');
            for (Object meal: mealList) {
                System.debug(meal);
            }
        }
    }
        
}
