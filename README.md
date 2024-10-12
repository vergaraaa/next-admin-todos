# Development

Steps to run app in development

1. Run db

```
docker compose up -d
```

2. Rename .env.template to .env
3. Replace env variables
4. Install dependencies `npm install`
5. Run app `npm run dev`
6. Run prisma commands

```
npx prisma migrate dev
npx prisma generate
```

7. Run seed to [populate db](http://localhost:3000/api/seed)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
