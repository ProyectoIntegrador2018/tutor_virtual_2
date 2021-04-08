# Deployment

## Tabla de contenidos

- [Precondiciones](#precondiciones)
- [Backend]($backend)

### Precondiciones

Tener las siguientes herramientas instaladas:
- Heroku CLI (hacer login con la credentials)
- Git CLI

### Backend

1. Si no tienes el codigo clonarlo
```bash
heroku git:clone -a damp-mesa-58075
```

2. Darle push a prod
```bash
git push heroku master
```

3. Esperar unos minutos a que se refleje en prod.
