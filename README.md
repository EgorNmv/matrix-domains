"# matrix-domains" 
Реализовать интерфейс и логику средствами JavaScript, HTML, CSS (возможно использование фреймворков) по следующим требованиям - необходимо посчитать количество доменов в матрице.

Пример матрицы:

1 0 0 0 1 0

1 1 0 0 0 1

0 0 0 0 0 0

0 0 0 0 0 1

0 0 0 0 0 1

Единицы в полученной матрице образуют домены, причем в домен могут входить только соседние элементы по горизонтали и вертикали.

Для этой матрицы можно определить 4 различных домена: {(1,1), (2,1), (2,2)}, {(1,5)}, {(2,6)}, {(4,6), (5,6)}.

Предложить пользователю ввод размера матрицы (N*M, N, M <=40 - 2 поля ввода с валидацией). После ввода размера отобразить (по отдельной кнопке) на странице пустую матрицу заданного размера с возможностью ручного ввода значений в ячейки (изменение 0\1  и наоборот щелчком мыши на ячейке).

Программа должна определять количество доменов в заданной матрице (кнопка «Посчитать домены») и выделить цветом ячейки, входящие в домен. Цвета разных доменов должны отличаться. Предусмотреть поле для вывода количества доменов.

Также реализовать автоматическое заполнение матрицы по отдельной кнопке «АВТО» значениями 0 или 1 с предварительным указанием вероятности использования единицы (вероятность от 0,01 до 0,99) в отдельном поле ввода с валидацией. По нажатию кнопки «АВТО» также следует рассчитывать количество доменов и раскрашивать их.

После каждого автоматического заполнения и расчета количества доменов в полученной матрице добавлять строку в таблице (внизу страницы) следующего вида:

Вероятность

Количество доменов в матрице

Количество ячеек в матрице (N*M)

Ограничить количество строк результата  в таблице значением 10. Т.е. при попытке вставить 11-ую строку стирается строка 1, происходит сдвиг строк вверх, данные записываются в последнюю строку.
