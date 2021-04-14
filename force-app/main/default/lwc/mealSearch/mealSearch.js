import { track, wire, LightningElement } from 'lwc';
import getMeals from '@salesforce/apex/MealDB.getMeals';

const columns = [
    { label: 'Name', fieldName: 'Name', sortable: true },
    { label: 'Category', fieldName: 'Category__c', type: 'text', sortable: true },
    { label: 'Region', fieldName: 'Area__c', type: 'text' },
    { label: 'Instructions', fieldName: 'Instructions__c', type: 'text' },
];

export default class DataTableComponent extends LightningElement {
    @track data = [];
    @track columns = columns;
    queryTerm;

    @wire(getMeals, {})
    ApexResponse({ error, data }) {
        if (data) {
            this.data = data;
        } else if (error) {
            //test
        }
    }

    handleKeyUp(evt){
        const isEnterKey = evt.keyCode === 13;
        if(isEnterKey){
            this.queryTerm = evt.target.value;
        }
    }

    searchMeal(event){
        const mealId = event.detail;
        this.template.querySelector("div").searchBoats(boatTypeId);
    }
}