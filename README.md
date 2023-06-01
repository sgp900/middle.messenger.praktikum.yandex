# Standart Prototype: https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1

# Render: https://sprint-4.onrender.com/

# Проект - чат, позволяет общаться с интересными для вас людьми.

# Изменения на этапе v.4.0.

1. Сборщик Parcell заменён на Webpack;

2. В проект добавлена система тестирования на базе mocha и chai;

3. Написаны тесты для:
   3.1. роутера
   3.2. компонента link src/components/Link/link.test.ts
   3.3. компонента placeHolderInput src/components/PlaceHolderInput/placeHolderInput.test.ts
   3.4. страницы входа src/pages/Login/login.test.ts
   3.5. модуля отправки сообщений src/utils/HTTPTransport.test.ts
   3.6. базового блока src/utils/block.test.ts
   3.7. хэлпера src/utils/helpers.test.ts

4. С помощью Husky, настроен Git precommit.

5. Создан Docker контейнер и задеплоен на render.com

# Для проверки кода использовать команды: npm run jslint | npm run csslint.

# Для сборки проекта использовать команду: npm run build.

# Для сборки и запуска проекта использовать команду: npm run start.

# Для запуска в режиме разработки (на порту 3000) использовать команду: npm run develop

# Прогнать unit тесты: npm run test
