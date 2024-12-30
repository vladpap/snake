![image](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![image](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

 # Snake Game

Классическая игра "Змейка" с веб-интерфейсом, реализованная на Flask и JavaScript. Включает таблицу рекордов с сохранением результатов в SQLite.

## Особенности
- Управление стрелками клавиатуры
- Таблица рекордов топ-10 игроков
- Сохранение результатов в базе данных
- Адаптивный дизайн
- Простой и понятный интерфейс

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd snake-game
```

2. Создайте и активируйте виртуальное окружение:
```bash
python -m venv venv
source venv/bin/activate  # для Linux/macOS
venv\Scripts\activate     # для Windows
```

3. Установите зависимости:
```bash
pip install -r requirements.txt
```

4. Запустите приложение:
```bash
python app.py
```

5. Откройте в браузере:
```
http://localhost:5000
```

## Как играть
- Нажмите кнопку "Start Game" для начала игры
- Управляйте змейкой с помощью стрелок на клавиатуре
- Собирайте красные точки для увеличения счета
- Избегайте столкновений со стенами и хвостом змеи
- После окончания игры введите свое имя для сохранения результата

## Технологии
- Python/Flask
- JavaScript
- SQLite
- HTML/CSS
