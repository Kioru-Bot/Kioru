![LogoKioru](https://github.com/Kioru-Bot/Kiuru-Bot/blob/main/KioruLogo.png)
# Kiuru Bot
Мультифункциональный бот для вашего сервера!

# Установка
Вписываем эти комманды в git терминал <br>
```bash
git clone https://github.com/Kioru-Bot/Kiuru-Bot
npm install
```
<br> На данный момент Docker-а нету, по этому запуск производится обычной командой
```bash
node .
```

# Настройка конфига
Если при установке конфиг небыл скачан, создайте в главной папке файл `config.json`
```json
{
  "token": "Токен вашего бота",
  "prefix": "!",
  "mongo":  "mongodb://localhost:27017",
  "colors": {
    "main": "#61dafb",
    "warn": "#fac863",
    "error": "#fc929e",
    "successfully": "#8dc891"
  },
  "version": "1.0.0",
  "copy": "Kioru Bot | Все права undefined..."
}
```
