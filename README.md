![LogoKioru](https://github.com/Kioru-Bot/Kiuru-Bot/blob/main/KioruLogo.png)
# Kiuru Bot

Мультифункциональный Discord бот для вашего прекрасного сервера!

# Установка
Вписываем эти комманды в git терминал <br>
```bash
git clone https://github.com/Kioru-Bot/Kiuru-Bot
npm install
```
<br> На вашем сервере должен быть установлен Docker
```bash
docker-compose build
docker-compose up
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
  "copy": "Kiuru Bot | Все права undefined..."
}
```


