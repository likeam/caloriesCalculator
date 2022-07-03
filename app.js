//Storage Controller



//Item Controller
const ItemCtrl = (function(){
    //Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories;
    }

    //Data Structure/State
    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookies', calories: 400},
            {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

     //Public Methods
        return{
            getItems: function(){
                return data.items;
            }
        }
    return{
        logData: function(){
            return data;
        }
    }
})();


//UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list'
    }

       //Public Methods
        return{
            populateItemsList: function(items){
                let html = '';
                items.forEach(function(item){
                    html += `<li class="collection-item" id="item-${item.id}"> <strong>${item.name}:</strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class=" edit-item fa fa-pencil"></i></a>
                </li>`;
                });

                //Insert list items
                document.querySelector(UISelectors.itemList).innerHTML = html;
            }
        }

})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl){

    //Load Event Listener
    const loadEventListeners = function(){

    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();    
    
    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    }


    //Add item submit
    const itemAddSubmit = function(e){
        e.preventDefault();
    }


    //Public Methods
    return{
        init: function(){
            console.log('Intializing the App....');

            //Featch Items from Data Structure
            const items = ItemCtrl.getItems();
            
            //Populate List with items
            UICtrl.populateItemsList(items);


        }
    }
})(ItemCtrl, UICtrl);


//Initialilzing the App
AppCtrl.init();