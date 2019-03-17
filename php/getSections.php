<?php 
    header('Content-Type: text/html; charset=utf-8');


    /* ___РАБОТА С БАЗОЙ ДАННЫХ___ */
    $connection = mysqli_connect('localhost', 'root', '', 'germany_atlas');  // Создаём переменную соединения
    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());  // Если подключение не получилось, выводим сообщение об ошибке
    }
    mysqli_set_charset($connection, 'utf8');   // Устанавливаем кодировку для соединения

// Запрос разделов
    $query = "SELECT * FROM section";
    $results = mysqli_query($connection, $query);
    $sections = mysqli_fetch_all($results, MYSQLI_ASSOC);
    mysqli_free_result($results);
    mysqli_close($connection);  // Закрываем соединение

    echo json_encode($sections, JSON_UNESCAPED_UNICODE);
?>