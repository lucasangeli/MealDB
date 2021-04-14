public with sharing class MealsRetriever {
    private static final String MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    private static final String GET = 'GET';
  
    public static List<MealData.Meal> getMealData(){
        Http httpCallout = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(MEAL_URL);
        req.setMethod(GET);
        HttpResponse resp = httpCallout.send(req);

        MealData mealResponse = (MealData) JSON.deserialize(resp.getBody(), MealData.class);
        List<MealData.Meal> mealData = new List<MealData.Meal>();

        for(MealData.Meal m: mealResponse.meals){
            mealData.add(m);
        }

        for(MealData.Meal m: mealResponse.meals){
            System.debug('Meal Id:');
            System.debug(m.idMeal);
            System.debug('Meal name:');
            System.debug(m.strMeal);
            System.debug('Type of meal: ');
            System.debug(m.strCategory);
            System.debug('Meal area: ');
            System.debug(m.strArea);
            System.debug('How to prepare this meal:');
            System.debug(m.strInstructions);
        }

        return mealData;
    }
     
  }