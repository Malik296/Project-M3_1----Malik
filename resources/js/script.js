window.addEventListener('load', handler);

let containerList = document.querySelector('.input-list-dib');
let rectInputElement;
let shift = {};


let sortCheck = 1;
let arr = [];


function handler() {
    const addButton = document.querySelector('.out-button-div');
    addButton.addEventListener('click', addRow);

    // слушатель для вызова фуекции фильрации
    const filterButton = document.querySelector('.filter-div img');
    filterButton.addEventListener('click', filtredData);
    deletRow(1);
}

// функция добавления строки и слушателей
function addRow() {
    arr = [];
    const contaner = document.querySelector('.input-list-dib');
    let rows = contaner.querySelectorAll('input');

    rows.forEach(row => {
        arr.push(row.value);
    });

    let rowsElements = contaner.innerHTML;

    // создание пустого поля и добавление HTML
    const addConstRow = '<div class="input-div">' +
        '<div class="left-points-div"><img src="resources/svg/iconfinder-icon-dots.svg" alt=""></div>' +
        '<input type="text">' +
        '<div class="right-close-div"><span>&#10006;</span></div>' +
        '</div>';
    rowsElements += addConstRow;

    contaner.innerHTML = rowsElements;

    rows = contaner.querySelectorAll('input');

    for (let i = 0; i < arr.length; i++) {
        rows[i].value = `${arr[i]}`;
    }

    // let containers = document.querySelectorAll('.input-div');

    const leftDragElement = contaner.querySelectorAll('.left-points-div img');

    // цикл для записи слушателей 
    leftDragElement.forEach(element => {
        element.addEventListener('mousedown', handleMouseDown);
    });

    // функция для добавление слушателя удаление строки
    deletRow(leftDragElement.length);
}

// функция для передвигания елемента
let handleMouseDown = (e) => {
    e.preventDefault();

    // элемент строки и его копия 
    let parentElem = e.target.parentElement.parentElement;
    let copyElement = parentElem.cloneNode(true);

    copyElement.classList.add('positionAbsolute');

    rectInputElement = parentElem.getBoundingClientRect();
    let rectContainert = parentElem.parentElement.getBoundingClientRect();


    copyElement.style.top = (rectInputElement.top - rectContainert.top) + 'px';
    parentElem.parentNode.append(copyElement);
    parentElem.classList.add('hidden');

    shift.y = e.pageY - rectInputElement.top;

    // функция для без прерывной записи координатов строк
    let handleMouseMove = (e) => {
        let minusPixel = (e.pageY - rectContainert.top);
        minusPixel -= minusPixel % 40;

        let indexNum = (e.pageY - rectContainert.top - shift.y) / 40;;
        rectInputElement = parentElem.getBoundingClientRect();

        if ((e.pageY - shift.y) >= rectContainert.top && ((e.pageY + shift.y) <= rectContainert.bottom)) {
            parentElem.style.top = (e.pageY - rectContainert.top - minusPixel - shift.y) + 'px';
            copyElement.style.top = (e.pageY - rectContainert.top - shift.y) + 'px';
            indexNum = (e.pageY - rectContainert.top + 20 - shift.y) / 40;
        } else if ((e.pageY - shift.y) < rectContainert.top) {
            parentElem.style.top = 0 + 'px';
            copyElement.style.top = 0 + 'px';
            indexNum = 0;
        } else if ((e.pageY + shift.y) > rectContainert.bottom) {
            parentElem.style.bottom = 0 + 'px';
            copyElement.style.bottom = 0 + 'px';
            indexNum = (rectContainert.bottom - rectContainert.top) / 40;
        }

        // функция для вставки строку по индексу
        setElementBefore(parentElem, Math.round(indexNum));
    };

    document.addEventListener('mousemove', handleMouseMove);

    //  функция для удаление слушателя
    let handleMouseUp = (e) => {
        parentElem.classList.remove('hidden');
        document.removeEventListener('mousemove', handleMouseMove);
        copyElement.remove();
    }

    document.addEventListener('mouseup', handleMouseUp);
}


function setElementBefore(element, index) {
    let body = document.querySelector('.input-list-dib');
    let items = document.querySelectorAll('.input-div');

    body.insertBefore(element, items[index]);
}

let count = 1;

// функция для удаления строки
function deletRow(countIn) {
    count = countIn;
    let deletecheck = document.querySelectorAll('.right-close-div');
    deletecheck.forEach(element => {
        element.addEventListener('click', () => {
            if (count <= 1) {
                element.parentNode.querySelector('input').value = '';
            } else {
                element.parentNode.remove();
                count--;
            }
        });
    });
}


// фукция для фильтрации данных
function filtredData() {
    arr = [];
    const select = document.querySelector('.input-list-dib');
    let rows = select.querySelectorAll('input');

    rows.forEach(row => {
        arr.push(row.value);
    });

    arr.sort();

    // условие проверки реверсивной сортировки
    if (sortCheck % 2 == 0) {
        arr.reverse();
    }

    sortCheck++;

    // изменение иконки и записи данных с проверкой на наличие пустых строки
    document.querySelector('.filter-div img').setAttribute('src', `resources/svg/iconfinder-icon-black-${sortCheck % 2}.svg`);
    let j = 0;
    for (let i = 0; i < arr.length; i++) {
        rows[i].value = '';
        if (arr[i] != '') {
            rows[j].value = `${arr[i]}`;
            j++;
        }
    }
}