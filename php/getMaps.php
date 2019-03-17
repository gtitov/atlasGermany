<?php 
    header('Content-Type: text/html; charset=utf-8');


    /* ___РАБОТА С БАЗОЙ ДАННЫХ___ */
    $connection = mysqli_connect('localhost', 'root', '', 'germany_atlas');  // Создаём переменную соединения
    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());  // Если подключение не получилось, выводим сообщение об ошибке
    }
    mysqli_set_charset($connection, 'utf8');   // Устанавливаем кодировку для соединения

    // Запрос карт
    $query = "SELECT * FROM map";  // Формируем SQL запрос к таблице карт
    $results = mysqli_query($connection, $query);  // Выполняем запрос к таблице карт
    $maps = mysqli_fetch_all($results, MYSQLI_ASSOC);  // Получаем результаты запроса
    mysqli_free_result($results);  // Освобождаем память от результатов запроса
    mysqli_close($connection);  // Закрываем соединение
    
    echo json_encode($maps, JSON_UNESCAPED_UNICODE);
?>