const table = document.getElementById('base__matrix-table');

function displayMatrix () { //выводит заданную ПУСТУЮ матрицу
    const n = document.getElementById('n').value, m = document.getElementById('m').value;
    if (n == 0 || m == 0) {
        alert('Введите размер матрицы');
    }
    else {
        const newMatrix = createMatrix(n, m);
        fillMatrix(newMatrix, table, n, m);
        const allTd = document.getElementsByClassName('cell-value');
        for (let i = 0; i < allTd.length; i++){
            allTd[i].addEventListener('click',() => {changeValueOnClick(allTd[i])}, false);
        }
        displayDomains('');
    }
}

function fillMatrix(matrix, table, n, m) { //отрисовка матрицы
    table.innerHTML = '';
    for (let i = 0; i < n; i++ ){
        const tr = document.createElement('tr');
        for (let j = 0; j < m; j++){
            const td = document.createElement('td');
            td.setAttribute('class','cell-value');
            td.innerHTML = matrix[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function createMatrix(n, m, value = 0) { //создание матрицы, по дефолту 0, чтобы избежать дублирования
    const matrix = new Array(n);
    for (let i = 0; i < n; i++ ){
        matrix[i]=[];
        for (let j = 0; j < m; j++){
            matrix[i][j] = randomValueMatrix(value);
        }
    }

    return matrix;
}

function changeValueOnClick(element) { //событие на смену 0 на 1 и наоборот
    const currentValue = element.firstChild.nodeValue;
    currentValue == 0 ? element.firstChild.nodeValue = 1 : element.firstChild.nodeValue = 0;
}

function getCurrentMatrix() { //текущая матрица со страницы
    const table = document.getElementById('base__matrix-table');
    const currentMatrix = [];
    const rowLenght = table.rows.length;
    for (let i = 0; i < rowLenght; i++) { //по строкам
        currentMatrix[i] = [];
        const cellLenght = table.rows.item(i).cells.length;
        for (let j = 0; j < cellLenght; j++) { //по столбцам-ячейкам
            currentMatrix[i][j] = table.rows[i].cells[j].textContent;
        }
    }

    return currentMatrix;
}

function createBooleanMatrix(n, m) { // необходимо для отслеживания посещённых вершин
    const boolMatrix = [];
    for (let i = 0; i < n; i++) {
        boolMatrix[i] = new Array(m).fill(false);
    }
    
    return boolMatrix;
}

class Point { //класс вершин-точек
    constructor(n, m) {
        this.n = n;
        this.m = m;
    }
}

function findingNeighbors(currentPoint, matrix) { //соседи текущей точки
    const startingCoordinateN = (currentPoint.n - 1 < 0) ? currentPoint.n : currentPoint.n - 1;
    const startingCoordinateM = (currentPoint.m - 1 < 0) ? currentPoint.m : currentPoint.m - 1;
    const endCoordinateN = (currentPoint.n + 1 > matrix.length - 1) ? currentPoint.n : currentPoint.n + 1;
    const endCoordinateM = (currentPoint.m + 1 > matrix[0].length - 1) ? currentPoint.m : currentPoint.m + 1;
    for (let row = startingCoordinateN; row <= endCoordinateN; row++){
        if (matrix[row][currentPoint.m] == 1 && usedVertex[row][currentPoint.m] == false) {
            queue.push(new Point(row,currentPoint.m));
            usedVertex[row][currentPoint.m] = true;
        }
    }
    for (let cell = startingCoordinateM; cell <= endCoordinateM; cell++){
        if (matrix[currentPoint.n][cell] == 1 && usedVertex[currentPoint.n][cell] == false) {
            queue.push(new Point(currentPoint.n,cell));
            usedVertex[currentPoint.n][cell] = true;
        }
    }
}

let queue = []; //очередь, содержит элементы, которые нужно посетить
let domains = []; //содержит массивы-домены
let countOfDomains = 0;
let usedVertex; //посещённые вершины

function calculationOfDomains() { //главный метод -- алгоритм
    const matrix = getCurrentMatrix();
    const rowLength = matrix.length;
    const cellLength = matrix[0].length;
    usedVertex = createBooleanMatrix(rowLength, cellLength);
    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < cellLength; j++) {
            if (matrix[i][j] == 1 && usedVertex[i][j] == false) {
                domains[countOfDomains] = [];
                usedVertex[i][j] = true;
                queue.push(new Point(i, j));
                while (queue.length != 0) {
                    const currentVertex = queue.shift();
                    domains[countOfDomains].push(currentVertex);
                    findingNeighbors(currentVertex, matrix);
                }
                countOfDomains++;
            }
        } 
    }
    displayDomains(domains.length);
    colorDomains(domains);
    domains =[];
    countOfDomains = 0;
}

function generateColor() { //генерация случайного цвета

    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function colorDomains(domains) { //нужен для раскраски доменов в разные цвета
    const usedColors = [];
    for (let i = 0; i < domains.length; i++) {
        let currentColor = generateColor();
        if (usedColors.includes(currentColor)) {
            currentColor = generateColor();
        }
        else {
            for (let j =0; j < domains[i].length; j++) {
                table.rows[domains[i][j].n].cells[domains[i][j].m].style.background = currentColor;
                usedColors.push(currentColor);
            }
        }
    }
}

function displayDomains(countOfDomains) { //отображение количества доменов в текущей матрице
    const answer = document.getElementById('answer');
    answer.innerHTML = countOfDomains;
}

function randomInteger(min = 1, max = 99) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function randomValueMatrix(probabilityOf1Integer) { //ничего лучше я не придумал, это точно работает
    if (randomInteger() <= probabilityOf1Integer) {

        return 1;
    }
    else {

        return 0;
    }
}

function autoCalculation() { // нажатие на кнопку авто, с генерацией и подсчётом
    const probabilityOf1 = document.getElementById('probability_of_1').value;
    console.info(probabilityOf1);
    const probabilityOf1Integer = Number(probabilityOf1) * 100;
    console.info(probabilityOf1Integer);
    const n = document.getElementById('n').value, m = document.getElementById('m').value;
    if (probabilityOf1 == 0 || n == 0 || m == 0) {
        alert('Все поля должны быть заполнены');
    }
    else {
        const  matrix = createMatrix(n, m, probabilityOf1Integer);
        fillMatrix(matrix, table, n, m);
        calculationOfDomains();
        drawFinalTable(n, m, probabilityOf1);
    }
}

function drawFinalTable(n, m, probabilityOf1) { // отображение таблицы в конце страницы
    const table = document.getElementById('base__table-table');
    table.style.display = 'table';
    if (table.rows.length > 10) {
        table.deleteRow(1);
    }
    var row = document.createElement("tr");
    var probability = document.createElement("td");
    var countOfDomains = document.createElement("td");
    var countOfCells = document.createElement("td");
    probability.appendChild(document.createTextNode(probabilityOf1));
    countOfDomains.appendChild (document.createTextNode(document.getElementById('answer').innerHTML));
    countOfCells.appendChild(document.createTextNode(n*m));
    row.appendChild(probability);
    row.appendChild(countOfDomains);
    row.appendChild(countOfCells);
    table.appendChild(row);
}

function enterValidData(input) { //проверка полей ввода размеров матрицы на валидность
    let value = input.value;
    const rep = /[-;., (){}:'a-zA-Zа-яА-Я\\=`ё/\*++!@#$%\^&_№?><]/;
    if (value < 0) input.value = 0;
    else if (value > 40) input.value = 40;
    if (rep.test(value)) {
        value = value.replace(rep, '');
        input.value = value;
    }
}

function enterValidDataForAuto(input) { //проверка поля ввода вероятности еденицы
    let value = input.value;
    const rep = /[-;, (){}:'a-zA-Zа-яА-Я\\=`ё/\*++!@#$%\^&_№?><]/;
    if (value < 0) input.value = 0.01;
    else if (value >= 1) input.value = 0.99;
    if (rep.test(value)) {
        value = value.replace(rep, '');
        input.value = value;
    }
}


