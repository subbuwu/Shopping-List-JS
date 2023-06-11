const form = document.getElementById('form-item');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const filterInput = document.getElementById('filter');
let localList;

// Functions
function appendItem(event) {
    event.preventDefault();

    const value = document.getElementById('user-input').value;
    const li = document.createElement('li');
    li.textContent = value;

    const dltbtn = document.createElement('i');
    dltbtn.innerHTML = '<i class="fa-solid fa-square-minus fa-lg"></i>';
    dltbtn.classList.add('dlt-btn');
    li.appendChild(dltbtn);

    li.className = 'list-item';

    list.appendChild(li);

    document.getElementById('user-input').value = '';

    // Clear the input field after a short delay
    setTimeout(() => {
        document.getElementById('user-input').value = '';
        document.getElementById('user-input').placeholder = 'Enter Item';
    }, 100);

    let templist = {
        name: value,
    };

    // Checking local storage
    if (localStorage.getItem('localList') === null) {
        localList = []; // Init LS array
    } else {
        localList = JSON.parse(localStorage.getItem('localList'));
    }

    localList.push(templist);

    // Setting to localStorage again
    localStorage.setItem('localList', JSON.stringify(localList));
}

function removeItem(event) {
    if (event.target.className === 'fa-solid fa-square-minus fa-lg') {
        event.target.parentElement.parentElement.remove();
    }

    localList = JSON.parse(localStorage.getItem('localList'));

    for(let i=0;i<localList.length;i++){
        if (localList[i].name === event.target.parentElement.parentElement.textContent ){
            localList.splice(i, 1);
        }
    }

    localStorage.setItem('localList',JSON.stringify(localList));
}

function filterItems(event) {
    const searchText = event.target.value.toLowerCase();
    const items = Array.from(document.getElementsByClassName('list-item'));
    items.forEach(function (item) {
        const itemName = item.textContent.toLowerCase();

        if (itemName.includes(searchText)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    if(localList === null) {
        return;
    }
    else{
        localList = JSON.parse(localStorage.getItem('localList'));
        for(let i = 0 ; i<localList.length ; i++) {
            const value = localList[i].name;
            const li = document.createElement('li');
            li.textContent = value;
            const dltbtn = document.createElement('i');
            dltbtn.innerHTML = '<i class="fa-solid fa-square-minus fa-lg"></i>';
            dltbtn.classList.add('dlt-btn');
            li.appendChild(dltbtn);
            li.className = 'list-item';
            list.appendChild(li);
        }
    }
})

// Event Listeners
form.addEventListener('submit', appendItem);
list.addEventListener('click', removeItem);
filterInput.addEventListener('input', filterItems);