# Deployment

## Instalación

Para accesar a la aplicación web, acceder a: https://tutor-virtual-2.vercel.app/

## Tabla de contenidos

- [Precondiciones](#precondiciones)
- [Backend]($backend)

### Precondiciones

Tener las siguientes herramientas instaladas:

- Heroku CLI (hacer login con la credentials)
- Git CLI
- Vercel CLI

### Backend

1. Si no tienes el codigo clonarlo

```bash
heroku git:clone -a damp-mesa-58075
```

2. Darle push a prod

```bash
git push heroku master
```

### Frontend

1. Si no tienes el código, clonarlo:

```bash
git clone https://github.com/ProyectoIntegrador2018/tutor_virtual_2.git
```

2. Iniciar sesión en el Vercel CLI (pedir credenciales)
3. Correr:

```bash
vercel
```

En el root del proyecto. 4. Si pide que si desea linkear el código a un proyecto existente, seleccionar sí
y seleccionar `tutor-virtual-2`.

3. Esperar unos minutos a que se refleje en prod.
