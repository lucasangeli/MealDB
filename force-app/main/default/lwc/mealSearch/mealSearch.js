import { api, track, wire, LightningElement } from 'lwc';
import getMealData from '@salesforce/apex/MealsRetriever.getMealData';

const columns =[
    {label: 'Meal ID', fieldName: 'idMeal', editable: false, sortable: true, hideDefaultActions: true},
    {label: 'Meal', fieldName: 'strMeal', editable: false, sortable: true, hideDefaultActions: true},
    {label: 'Category', fieldName: 'strCategory', editable: false, sortable: true, hideDefaultActions: true},
    {label: 'Meal Origin', fieldName: 'strArea', editable: false, sortable: true, hideDefaultActions: true},
    {label: 'How to prepare', fieldName: 'strInstructions', editable: false, sortable: true},
];

export default class DataTableWithSortingInLWC extends LightningElement {
    
    @track columns = columns;
    @track sortBy;
    @track sortDirection;
    @track mealNames;
    @track mealSpinner = false;
    @track searchKey;
    @track mealSearched;

    @wire(getMealData)
        mealDataResult(result){
            const {data, error} = result;
            if(data){
                this.mealNames = data;
                this.mealSpinner = true;
                this.error = undefined;
            } else if(error){
                this.mealNames = undefined;
                this.error = error;
            }
        }
    
    handleSearch(event){
        this.mealSearched = event.target.value;
        console.log('User typed:', this.mealSearched);
    }

    handleMealName(){
        getMealData(
            {searchKey: '$mealSearched'}
        )
        .then(result =>{
            this.mealSearched = result;
            this.error = undefined;
        })
        .catch(error =>{
            this.mealSearched = undefined;
            this.error = error;
        })
        
    }

    handleSort(event){
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.mealNames));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1: -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.mealNames = parseData;
    }  
}
