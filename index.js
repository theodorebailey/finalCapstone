// target all like buttons - PROFILE 
const profileButton = document.querySelectorAll(".like_btn");

// get HTML element with id Profile data to store saved material
const profile = document.getElementById('profileData');

// save number of items added to profile
var itemsInProfile = 0;

// for each profile Button, use a function which takes a parameter item which is the selected button 
profileButton.forEach(function(item) {

    // save id of button to a variable
    var mainlocalStorage = item.id;

    // if value in local storage is true
    if (localStorage.getItem(mainlocalStorage) == 'true') {

        // add class clicked
        item.classList.add('clicked');

        // change inner html to indicate it is in profile
        item.innerHTML =  "-profile";

    } else {

        // else remove clicked status
        item.classList.remove('clicked');
        

        // indicate profile status of id button
        item.innerHTML = "+profile";

    }

    // add click event listener to button
    item.addEventListener("click", () => {

        // toggle clicked class when clicked
        item.classList.toggle('clicked');

        // console.log(item.innerHTML);
        
        // item.innerHTML = 'save to profile';

        // id to store is item id of item clicked
        let storageId = item.id;

        // if classList of value clicked is true
        if (item.classList.contains('clicked')) {

            // set item storageId to true
            localStorage.setItem(storageId, 'true');

            // change inner HTML text
            item.innerHTML = "-profile";

            // set variable to parent element of childs first child - article / image, etc
            let data = item.parentElement.firstChild;

            // remove HTML tags
            let dataTransfer = data.outerHTML.slice(1, -1);

            // save data for profile to localStorage
            localStorage.setItem(`p${storageId}`, dataTransfer);


        // if classList doesn't contain clicked

        } else {

            // remove item 
            localStorage.removeItem(storageId, 'true');

            // remove article saved in profile
            localStorage.removeItem(`p${storageId}`);
            
            // change button value to indicate it needs to be added to profile
            item.innerHTML = "+profile";

        }

        // count is 0        
        var count = 0;

        // count localSotrage length
        for (let i=0; i<localStorage.length; i++) {

            // if value has profile key value - indicated by starting with p
            if (localStorage.key(i).charAt(0) == "p") {

                // 
                // console.log(localStorage.key(i).charAt(0));
                count++;

            }

            

        }

            itemsInProfile = count;

            profileCounter();
        
    })


});


// function call to note number of items in profile
function profileCounter() {

    // if 1 - item
    if (itemsInProfile == 1) {

        alert(`You have ${itemsInProfile} item in your profile.`);


    // else, 0 or any other number - items
    } else {

        alert(`You have ${itemsInProfile} items in your profile.`);

    }

}


// select all elements with class like button
const likeBtn = document.querySelectorAll(".like");

// for each element in class like button
likeBtn.forEach(function (item) {

    // create clicked and set to false
    let clicked = false;

    // add click event listener
    item.addEventListener("click", () => {

        // select all class icon
        let likeIcon = item.querySelector(".icon");

        // select class count
        let count = item.querySelector(".count");

         // if clicked
         if (!clicked) {

            // clicked is true
            clicked = true;

            // inner HTML changes thumbs up icon
            likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;

            // change text content to +1
            count.textContent++;

        } else {
            

            // clicked is false
            clicked = false;

            // unliked thumbs up icon
            likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;

            // change text content to -1
            count.textContent--;

        }

    });

});

// when page loads
function onPageLoad() {

    // get element with ID profile data
    let t = document.getElementById('profileData');

    // count through localStorage
    for (i = 0; i < localStorage.length; i++) {

        // create variable to store storage item
        let storageItem;

        // if has profile key for value saved in local storage
        if (localStorage.key(i).charAt(0) == "p") {

            // set storage ket to key value
            let storageKey = localStorage.key(i);

            // access value saved at key and save to storageItem
            storageItem = localStorage.getItem(storageKey);
        
            // create row item and input value data to populate with liked item for profile

        let row = 
        `
            <div class="col">
                <${storageItem}>         
            </div>

        `
        // add item to profileData section
        t.innerHTML += row;

        }
    }

}



