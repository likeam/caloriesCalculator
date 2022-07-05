//Storage Controller



//Item Controller
const ItemCtrl = (function(){
    //Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure/State
    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookies', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

     //Public Methods
        return{
            getItems: function(){
                return data.items;
            },
        
            addItem: function(name, calories){
                //Create Id
                let ID;
                if(data.items.length > 0){
                    ID = data.items[data.items.length -1].id +1;
                }else{
                    ID = 0;
                }
                //Calories to number
                calories = parseInt(calories);

                //Create new item
                newItem = new Item(ID, name, calories);
                //Add item to arry
                data.items.push(newItem);
                return newItem;
            },
            gerTotalCalorie: function(){
                let total = 0;

                //Loop throught items and  add calories
                data.items.forEach(function(item){

                    total += item.calories;
                    
                });

                //Set Total Calories in data Structure
                data.totalCalories = total;

                //Return Total
                return data.totalCalories;
            },
        
            logData: function(){
                return data;
            }
    }

})();


//UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn', 
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
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
            }, 

            getItemInput: function(){
                return{
                    name: document.querySelector(UISelectors.itemNameInput).value,
                    calories: document.querySelector(UISelectors.itemCaloriesInput).value
                }
            },

            addListItem: function(item){

                //Show the list
                document.querySelector(UISelectors.itemList).style.display = 'block';
                //Create li Element
                const li = document.createElement('li');
                //Add Class
                li.className = 'collection-item';
                //Add ID
                li.id = `item-${item.id}`;
                //Add Html
                li.innerHTML = `<strong>${item.name}:</strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class=" edit-item fa fa-pencil"></i></a>`;
                //Insert item
                document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
            },
            clearInput: function(){
                document.querySelector(UISelectors.itemNameInput).value = '';
                document.querySelector(UISelectors.itemCaloriesInput).value = '';
            },

            hideList: function(){
                document.querySelector(UISelectors.itemList).style.display = 'none';
            },

            showTotalCalories: function(totalCalories){
                document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
            },
            getSelectors: function(){
                return UISelectors;
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
        
        //Get form input from UI Controller
        const input = UICtrl.getItemInput();
        
        //Check for name and calories input
        if(input.name !== '' && input.calories !== ''){
            
            //Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
        
            
            // Add items to UI list
            UICtrl.addListItem(newItem);
            
            //Get Total Calories
            const totalCalories = ItemCtrl.gerTotalCalorie();
            // Add Total Calorires to UI
            UICtrl.showTotalCalories(totalCalories);

            //Clear Fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }


    //Public Methods
    return{
        init: function(){
            

            //Featch Items from Data Structure
            const items = ItemCtrl.getItems();

            //check if any items
            if(items.length === 0){
                UICtrl.hideList();
            }else{
            
            //Populate List with items
            UICtrl.populateItemsList(items);

            }

            //Get Total Calories
            const totalCalories = ItemCtrl.gerTotalCalorie();
            // Add Total Calorires to UI
            UICtrl.showTotalCalories(totalCalories);

            //Load Event Listiner
            loadEventListeners();


        }
    }
})(ItemCtrl, UICtrl);


//Initialilzing the App
AppCtrl.init();