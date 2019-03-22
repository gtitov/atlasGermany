// Table of content constructing
/* ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ */
var maps
var sections
var subsections




/* ПОЛУЧЕНИЕ ДАННЫХ */
/* Функция синхронного(!) ajax-запроса (метод устарел -> надо найти, чем заменить) */
function loadData(phpFile, cFunction) {
    var xhr = new XMLHttpRequest();  // Создаём XMLHttpRequest-объект
    xhr.open("GET", phpFile, async = false);  // Открываем файл по адресу phpFile, выполняем GET-запрос; неасинхронный, чтобы положить данные в переменную
    xhr.onload = function () {
      if (this.status == 200) {  // Если запрос успешен (код 200),
        cFunction(this);  // то выполняем функцию, которая принимает на вход xhr-объект
      }
    }
    xhr.send();
  }


/* Фунцкции обработки полученных ajax-ом данных */
function getMaps(xhr) {
    maps = JSON.parse(xhr.responseText);  // Парсим все карты, которые пришли
    document.getElementById("map").getElementsByTagName("img")[0].setAttribute("src", "./maps/0.png");  // Сразу отображаем первую карту массива: изображение
  }
  
  function getSections(xhr) {
    sections = JSON.parse(xhr.responseText);
  }
  
  function getSubsections(xhr) {
    subsections = JSON.parse(xhr.responseText);
  }
  
  function getSeries(xhr) {
    series = JSON.parse(xhr.responseText);
  }


/* Запрашиваем и обрабатываем данные с сервера */
loadData("./php/getMaps.php", getMaps);
loadData("./php/getSections.php", getSections);
loadData("./php/getSubsections.php", getSubsections);




/* СОЗДАНИЕ ТАБЛИЦЫ СОДЕРЖАНИЯ */
/* Создаём разделы */
var sect_ul = "<ul id = 'sect_list'>";  // Открываем ul для списка карт
for (var s in sections) {
  sect_ul +=
    "<li style='line-height: 2; cursor: pointer' class='sect' id='sect" + sections[s].id + "'>&#9662; "  // Создаём li с названием каждого раздела; id равен индексу раздела в массиве 'sections' с префиксом 'sect'
    + sections[s].title +
    "<ul style = 'padding-left: 15px'></ul></li>";
}
sect_ul += "</ul>";  // Закрываем ul для списка разделов
document.getElementById('table_container').innerHTML += sect_ul; // Помещаем ul в раздел 'content_table'

/* Распределяем карты по секциям (разделам, подразделам) */
for (var m in maps) {  // пробегаемся по всем картам
  map = maps[m];
  /* Кладём карты, которые в раздел */
  if (map.subsection_id === null) {
    document.getElementById("sect" + map.section_id).getElementsByTagName("ul")[0].innerHTML +=
      "<li style='line-height: 1.5; cursor: pointer' class='map' id='map" + map.id + "'>&#8226; " + map.title + "</li>";
    /* Кладём карты, которые в подраздел */
  } else {
    if (document.getElementById("subsect" + map.subsection_id) === null) {  // Если подраздела не существует
      document.getElementById("sect" + map.section_id).getElementsByTagName("ul")[0].innerHTML +=  // Создаём подраздел в разделе
        "<li style='line-height: 1.7; cursor: pointer' class='subsect' id='subsect" + map.subsection_id + "'>&#9662; "  // Присваемаем li class подраздела и id
        + subsections.filter(subsection => subsection.id == map.subsection_id)[0].title +  // Извлекаем из массива подразделов элемент, id которого совпадает с id подраздела из объекта карты
        "<ul style = 'padding-left: 15px'></ul></li>";
    }
    document.getElementById("subsect" + map.subsection_id).getElementsByTagName("ul")[0].innerHTML +=  // Кладём карту в подраздел
      "<li style='line-height: 1.5; cursor: pointer' class='map' id='map" + map.id + "'>&#8226; " + map.title + "</li>";
  }
}




/* ФОРМИРОВАНИЕ ИНТЕРАКТИВНОГО ОТОБРАЖЕНИЯ */
document.getElementById("sect_list").addEventListener("click", function (event) {
  var li_element = event.target;
  if (li_element) {
    if (li_element.matches("li.sect.collapsibleListOpen")) {  // если действия происходят уже после щелчка, когда присвоен class="...Open"
      var sect_id = li_element.id.substr(4);  // Извлекаем число (id в таблице) из html-id
      document.getElementById("map").getElementsByTagName("img")[0].setAttribute("src", "./covers/" + sect_id + ".jpg");
      document.getElementById("map").getElementsByTagName("img")[0].setAttribute("alt", "Обложка временно недоступна");
    } else if (li_element.matches("li.subsect.collapsibleListOpen")) {
      var subsect_id = li_element.id.substr(7);
    } else if (li_element.matches("li.map")) {
      var map_id = li_element.id.substr(3);
      document.getElementById("map").getElementsByTagName("img")[0].setAttribute("src", "./maps/" + map_id + ".png");
      document.getElementById("map").getElementsByTagName("img")[0].setAttribute("alt", "Карта временно недоступна");
    }
  }

})