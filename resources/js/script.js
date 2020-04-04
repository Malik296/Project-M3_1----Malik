window.addEventListener('load', handler);

// высота одного столбца
const INPUT_ROW_HEIGHT = 40;

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

    shift.y = e.screenY - rectInputElement.top;

    console.log()

    // функция для без прерывной записи координатов строк
    let handleMouseMove = (e) => {
        rectContainert = parentElem.parentElement.getBoundingClientRect();
        let minusPixel = (e.screenY - rectContainert.top);
        minusPixel -= minusPixel % INPUT_ROW_HEIGHT;

        let indexNum = (e.screenY - rectContainert.top - shift.y) / INPUT_ROW_HEIGHT;;
        rectInputElement = parentElem.getBoundingClientRect();

        if ((e.screenY - shift.y) >= rectContainert.top && ((e.screenY - shift.y) <= (rectContainert.bottom - INPUT_ROW_HEIGHT))) {
            copyElement.style.top = (e.screenY - rectContainert.top - shift.y) + 'px';
            indexNum = (e.screenY - rectContainert.top - shift.y + INPUT_ROW_HEIGHT / 2) / INPUT_ROW_HEIGHT;
        }
        else if ((e.pageY - shift.y) < rectContainert.top) {
            copyElement.style.top = 0 + 'px';
            indexNum = 0;
        } else if ((e.pageY - shift.y) > rectContainert.bottom) {
            copyElement.style.bottom = 0 + 'px';
            indexNum = (rectContainert.bottom - rectContainert.top) / INPUT_ROW_HEIGHT;
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