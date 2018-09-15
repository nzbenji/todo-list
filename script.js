const model = (function() {

    let Todo = function(id, description){
        this.id = id;
        this.description = description;
    };

    var allTodos = [];
    
    return {
        addItem: function(desc) {
            //set id to a todo object first item starts at 0 and increments
            if(allTodos.length > 0){
                var id = allTodos[allTodos.length -1].id + 1;
            } else {
                id = 0;
            }

            //set new item and push to allTodos object
            let newItem = new Todo(id, desc);
            allTodos.push(newItem);
            
            return newItem;
        },

        testing: function() {
            console.log(allTodos);
        }
        
        
    }
    
})();  


const view = (function() {

    return {
        getInput: function() {
            return {
                description: document.querySelector('.add_todo').value
            }
            
           //return description;
        },
        
        // add our todo item to the DOM at 'beforeend'
        addListItem: function(obj, item) {
            let html = `<div class="item clearfix" id="${obj.id}"> 
            <div class="item_description">${obj.description}</div>
            <div class="right clearfix">
                <div class="item_delete"> <button class="item_delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`

        document.querySelector('.todo_list').insertAdjacentHTML('beforeend', html)
        },

        clearFields: function() {
            let fields = document.querySelector('.add_todo').value = '';
            console.log(fields);

            // fieldsArr = Array.prototype.slice.call(fields);

            // fieldsArr.forEach(function(item, index, arr) {
            //     item.value = '';
            // })
        }
    };
})();
    


const appControl = (function(model, view) {
   
    //add item on event click or enter key
    let setupEventListeners = function() {
        document.querySelector('.add_btn').addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13){ //enter key
                ctrlAddItem();
            }
    });
    };

    let ctrlAddItem = function() {
        //get the input data
        let input = view.getInput();
        //console.log(input);

        //add new todo item
        let newItem = model.addItem(input.description);

        //add todo item to view display controller
        view.addListItem(newItem, input);

        view.clearFields();

    };


    return {
        init: function() {
            console.log('started');
            setupEventListeners();

            window.onload = function() {
                document.querySelector('.add_todo').focus;
            }
        }
    }
    

})(model, view)

appControl.init();
    
    
