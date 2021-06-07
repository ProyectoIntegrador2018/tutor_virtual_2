# Tutor Virtual 2

The second Tutor Virtual

## Table of contents

* [Client Details](#client-details)
* [Environment URLS](#environment-urls)
* [Da Team](#team)
* [Technology Stack](#technology-stack)
* [Management resources](#management-resources)
* [Setup the project](#setup-the-project)
* [Running the stack for development](#running-the-stack-for-development)
* [Start Web Service](#start-web-service)
* [Start Server Service](#start-server-service)


### Client Details

| Name               | Email             | Role |
| ------------------ | ----------------- | ---- |
| Centro Virtual de Aprendizaje | degolivier@tec.mx | CEO  |


### Environment URLS

* **Production** - [CVA Tracker](https://www.cvatracker.app)
* **Development** - [TBD](TBD)

### The team

| Name           | Email             | Role        |
| -------------- | ----------------- | ----------- |
| Hector de Luna | A01282272@itesm.mx | Adm. del Proyecto |
| Arturo Torres | A01176590@itesm.mx | SCRUM Master |
| Diana Barrios | A00819792@itesm.mx | Adm. de la Configuración |
| Rafael Serna | A01282298@itesm.mx | Product Owner Proxy |

### Technology Stack
| Technology    | Version      |
| ------------- | -------------|
| Node  | 15     |
| PostgreSQL | 8.5.1  |
| Express | 4.17.1 |
| TypeORM  | TBD |
| React | 17.0.1 |
| Next JS | 10.0.7  |
| Typescript | 4.2.2 |
| Joi | 17.4.0 |
| Winston | 3.3.3 |

### Management tools

You should ask for access to this tools if you don't have it already:

* [Github repo](https://github.com/ProyectoIntegrador2018/tutor_virtual_2)
* [Backlog]()
* [Vercel]()
* [Heroku]()
* [Documentation]()

## Development

### Setup the project

You'll definitely want to install [`brew`](https://brew.sh/s), as it will help you install
the necessary requirements.

After installing please you can follow this simple steps:

1. Clone this repository into your local machine

```
$ git clone https://github.com/ProyectoIntegrador2018/tutor_virtual_2.git
```

3. Install PostgreSQL with brew

```
$ brew install postgresql
```

4. After installing start the service
```
$ brew services start postgresql
```

5. Once the service has been started succesfully, create the db.

```
$ createdb tutorvirtual
```

6. At the root of the directory run the following command to install all of the dependencies

```
$ yarn install
```

#### DB Makefile helper
There is a Makefile target that starts the db.
<br>
In root:
```
$ make start_db
```

### Running the stack for Development
Always make sure that postgresql is running locally.

#### Start Web service

Navigate to the web folder from the root

```
$ cd ./services/web
```

Start the client server

```
$ yarn start:dev
```

#### Start Server service

Navigate to the server folder from the root

```
$ cd ./services/backend
```

Run typescript on watch mode

```
$ yarn watch
```

If the initial compile is succesful you can start the server

```
$ yarn dev
```
