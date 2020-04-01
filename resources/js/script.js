const addButton = document.querySelector('.out-button-div');
addButton.addEventListener('click', addRow);

const filterButton = document.querySelector('.filter-div img');
filterButton.addEventListener('click', filtredData);

let sortCheck = 1;

let arr = [];


function addRow() {
    arr = [];
    const select = document.querySelector('.input-list-dib');
    let rows = select.querySelectorAll('input');

    rows.forEach(row => {
        arr.push(row.value);
        
    });

    console.log(rows);

    let rowsElements = select.innerHTML;

    const addConstRow = '<div class="input-div">' +
        '<div class="left-points-div"><img src="resources/svg/iconfinder-icon-dots.svg" alt=""></div>' +
        '<input type="text">' +
        '<div class="right-close-div"><span>&#10006;</span></div>' +
        '</div>';
        rowsElements += addConstRow;

    select.innerHTML = rowsElements;
    rows = select.querySelectorAll('input');

    for(let i = 0; i < arr.length; i++) {
        rows[i].value = `${arr[i]}`;
    }
    addCloseListener(select);

}

function addCloseListener(element) {
    let closeButtons = element.querySelectorAll('.right-close-div');
    closeButtons.forEach(button => {
        button.addEventListener('click', deletRow);
    });
}

function deletRow() {
    console.warn('Delet comand');
}

function filtredData() {
    arr = [];
    const select = document.querySelector('.input-list-dib');
    let rows = select.querySelectorAll('input');


    rows.forEach(row => {
        arr.push(row.value);
    });

    arr.sort();

    if (sortCheck % 2 == 0) {
        arr.reverse();
    }

    sortCheck++;
    document.querySelector('.filter-div img').setAttribute('src', `resources/svg/iconfinder-icon-black-${sortCheck % 2}.svg`);
    let j = 0;
    for(let i = 0; i < arr.length; i++) {
        rows[i].value = '';
        if(arr[i] != '') {
            rows[j].value = `${arr[i]}`;
            j++;
        }
    }
    console.log(arr);
}