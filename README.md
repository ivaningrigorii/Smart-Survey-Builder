# Smart-Survey-Builder
Это командный учебный проект, результатом которого является система для сбора сведений посредством опросов и их аналитики. Проект реализован на уровне MVP.

Технологии: база данных Postgres, бэк Python Django, фронт React + mui. 
Бэк и фронт раздельные (вход по jwt), обмен данными через rest api. 
На бэке подключен swagger, организована Django админка.
Взаимодействие с базой данных через ORM.

Функционал:
- система профилей (система входа/регистрации), возможность изменения, настройки профиля;
- каталог опросов (на данный момент только созданных);
- универсальный конструктор опроса (реализована возможность интерактивно создавать тестовые и нетестовые вопросы, организовывать блоки вопросов, добавлять ответы (ответы с выбором, поля для ввода текста);
- реализована возможность прохождения опроса (требует доработки);
- реализована возможность просмотра минимальной аналитики.

-------------
## Вопросы в ходе разработки

## Куда делась база данных? Обновления в бд
В связи с постоянными проблемами с git из-за бд и временными файлами на бэке, это всё дело выпилили.
Что делать, если хотите бэк запустить локально, а бд у вас отсутствует?
1. Перейти в терминале ide в папку проекта и активировать venv, если это не сделано:
  ``` 
    .\venv\Scripts\activate
  ```
2. Перейти в терминале в папку src_back и сделать:
  ``` 
    python manage.py migrate
  ```
3. Что делать, если нужен пользователь-администратор?
Находясь в папке src_back вводите команду:
```
  python manage.py createsuperuser
```
Имя пользователя: ``` root ``` 
Почту можно просто пропустить
Пароль вводите простой, пока тестировать надо и его повтор: 1234
Bypass password validation and create user anyway? [y/N]: ```y```

Пока для тестирования оставил sqllite, postgre трогать не нужно

## Оно работало и теперь сломалось. Про обновления структуры БД
Если на бэке сделаны обновления в структуре бд, то:
1. Активируйте venv
2. Перейдите в src_back
3. Сделайте
  ``` 
    python manage.py migrate
  ```

## Ошибки в проекте после git pull
После git pull возможны ошибки из-за того, что все подключают разные зависимости.
Обновить зависимости на бэке: активируйте venv, сделайте 
 ```
      pip install -r requirements_pip.txt
 ```
На фронте в папке src_front:
```
      npm install --force
```
Можно попробовать без --force, но может ругаться терминал




# Установка и запуск

Что должно быть изнйачально установлено? git, npm (node.js), python

1. НАСТРОЙКА git и скачивание проекта
  Работу описал в GIT BASH, можно попробовать через дескотную версию github - не пробовал.
  Для работы с github лучше в git сразу установить свои name и email, лучше такие же, какие у ваc на github:
  
  ``` 
    $ git config --global user.name "John Doe"
    $ git config --global user.email johndoe@example.com
  ```
    
  Более подробно можно почитать в документации git про первоначальный запуск и настройку git.
  С помощью команд <cd>, <cd ..>, <dir или ls> можно переместиться в нужную вам папку.
  Создаёте свою папку:
  
```
    $ mkdir <вместо этого вводите название проекта, например Smart-Survey-Builder>
```
  
  ПЕРЕХОДИТЕ в созданную папку (cd Smart-Survey-Builder)
  Инициализируете git в созданной папке:
  
```
    $ git init
```
  
  После этого в git hub берёте ссылку на проект и вводите команду:
  
```
    $ git remote add origin https://github.com/ivaningrigorii/Smart-Survey-Builder.git
```
  
  Скачиваете файл:
  
```
    $ git pull origin main
```

  (понадобится авторизация в github по логину и паролю или по временному токену)
  В дальнейшем будет достаточно команды git pull для скачивания
  
## Разворачиваем Python Django и запускаем
  Открываем командную строку. 
  Переходим в командной строке в папку проекта, например, было Smart-Survey-Builder. 
  Внутри папки проекта устанавливаете виртуальную среду python с помощью команды:
  
  ```
      python -m venv venv
  ```
  
  Активируйте виртуальное окружение
 
 ```
      .\venv\Scripts\activate
 ```
  Должно появиться (venv)
  После этого, в этой же папке вводите команду для установки всех зависимостей python:
  
 ```
      pip install -r requirements_pip.txt
 ```
  
  Серверная часть развёрнута. В дальнейшем, для разработчиков бэка, в PyCharm, ещё папку src_back нужно сделать Source Root.
  ЗАПУСКАЕМ СЕРВЕРНУЮ ЧАСТЬ:
  переходим в src_back:
  
 ```
      cd src_back
 ```
  
  запускаем веб сервер на порте 8000:
  
 ```
      python manage.py runserver localhost:8000
 ```
  ГОТОВО
  
  Теперь, если перейти в браузе по URL localhost:8000/api/survey-passing/list_surveys/ можно увидеть возвращаемое сервером API
  Для тестового запуска оставляем работать сервер дальше, остановка через ctrl+break.
    
## Разворачиваем React и запускаем
  Открываем в новом окне командную строку. Если это из терминала pycharm, отключаем venv с помощью команды deactivate
  
  Переходим в папку фронтенда src_front.
  Находясь внутри папки фронтенда в командной строке вводим команду:
  
```
      npm install
```
  Делалось много изменений и есть какие-то конфликты с установкой, вместо прошлой команды, 
  теперь можно попробовать эту
```
      npm install --force
```
  ГОТОВО, если летят ошибки, вероятно, просто не установлена Node.js или активировано в этом окне (venv)
  ЗАПУСКАЕМ клинтскую часть:
  
```
      npm start
```
  Теперь, если всё сделано правильно, при переходе на localhost:3000 будут видна тестовая страница
  со сведениями об опросах, уже лежащих в локальной мальнькой бд sql lite.
  
  Всё настроено. Теперь можно глубоко вдохнуть и начать разрабатывать проект.
    
  В ДАЛЬНЕЙШЕМ, ДЛЯ ЛОКАЛЬНОГО ЗАПУСКА ПРОЕКТА НУЖНО БУДЕТ:
  1) перейти в папку проекта,
  2) активировать виртуальное окружение Python (.\venv\Scripts\activate)
  3) перейти в src_back и запустить локально сервер (python manage.py runserver localhost:8000)
  4) в новом окне командной строки перейти в папку проекта, перейти в src_front
  5) запустить react (npm start)
    
