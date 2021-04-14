public with sharing class MealData {
    public List<Meal> meals {get; set;}

    public class Meal {
        public String idMeal { get; set; }
        public String strMeal { get; set; }
        public Object strDrinkAlternate { get; set; }
        public String strCategory { get; set; }
        public String strArea { get; set; }
        public String strInstructions { get; set; }
    }
}
