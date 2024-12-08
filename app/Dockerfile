# 1. Asosiy rasmni tanlash
FROM node:20

# 2. Ishchi katalogni yaratish
WORKDIR /app

# 3. Loyihani konteynerga nusxalash
COPY . .

# 4. NPM paketlarini o'rnatish
RUN npm install

# 5. Portni ochish (ilovangiz qaysi portda ishlashini ko'rsating)
EXPOSE 3000

# 6. Node.js ilovasini ishga tushurish
CMD ["npm", "start"]
