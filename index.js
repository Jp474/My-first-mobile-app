import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetings = {
    databaseURL: "https://playground-4de58-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSetings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "spiza")

const inputFieldEl = document.getElementById("input-el")
const addToCartBtn = document.getElementById("add-to-cart")
const shoppingListEl = document.getElementById("shopping-list")

addToCartBtn.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    if(inputValue) {
        push(shoppingListInDB, inputValue)

        clearInputFieldEl()
    } else {
        
    }
   
})

onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()

        for (let i =0; i<itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem [1]

            appendItemToShoppingListEl(currentItem)
        }
    }
    else {
        shoppingListEl.innerHTML = "No spiza here...yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database,`spiza/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}