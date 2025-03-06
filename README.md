# Trabajo Final - Angular  
  
## Consigna

+ Con lo que se viene trabajando sumar las siguientes tareas: Incorporar un feature store para cada feature module + Incorporar la librería effects y consumir todas las API rest de allí. Sugerimos la lectura de la consigna detallada y las rúbricas de evaluación.

## Objetivos generales

+ Optimizar tu proyecto frontend basado en Angular, integrando lo trabajado en clases hasta el momento y respetando los aspectos técnicos y funcionales esenciales.  
  
## Sugerencias  
  
+ Utiliza Angular CLI.  
  
## Se debe entregar  
  
+ Diseño RedUx
+ Store: acciones y reducers
+ Selectores
+ Feature store
+ Effects
  
## Objetivos específicos

+ Comprender el concepto de componentes y servicios, para su reutilización en otros proyectos.
+ Comprender el concepto de módulos, lazy loading, rutas y la organización del proyecto en módulos core, share y feature
+ Integrar el patrón de estado global Redux y comprender la importancia de su uso utilizando la librería Ngrx
+ Realizar test unitarios del proyecto front end
  
###  Aspectos a tener en cuenta:  
  
+ El proyecto tiene que compilar.
+ No tener errores por consola.
+ No mostrar console.log().
  
### Requisitos extra (no obligatorios):

+ Correcta maquetación.
+ Buenas prácticas de codificación.
+ Test unitarios.

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://https://github.com/SIVAnode/Angular-Final
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el proyecto:
   - Para usar la Fake API (por defecto):
     ```bash
     npm start
     ```
     (Utiliza el archivo `environment.development.ts` para configurar la Fake API)
   - Para usar la API real:
     ```bash
     ng serve --configuration=production
     ```

## Login

Utiliza las siguientes credenciales para acceder al sistema:

- **ADMIN**
  - Email: `admin@coder.com`
  - Contraseña: `987654`  
  
![Screenshot 2025-02-19 152726](https://github.com/user-attachments/assets/64b38280-c04f-47b7-bdfa-7256f29433c2)  
![Screenshot 2025-02-19 152749](https://github.com/user-attachments/assets/7b8c327f-39b8-48c3-87ca-a803b6eb1a37)
  
- **EMPLOYEE**
  - Email: `email@coder.com`
  - Contraseña: `456789`  
  
![Screenshot 2025-02-19 152806](https://github.com/user-attachments/assets/667987ba-8632-4c79-a655-88b345dc42df)
  
  

### Este proyecto alterna automáticamente entre una **API real** y una **Fake API** dependiendo del valor de la variable de entorno `environment.useFakeApi`.

## Características

- ✔ **Alternancia automática**: Cambia entre la API real y la Fake API según el valor de `environment.useFakeApi`.
- ✔ **Sin duplicación de código**: Solo se cambia la fuente de datos, manteniendo la lógica intacta.
- ✔ **Almacenamiento y autenticación consistentes**: Funcionan igual en ambos casos (API real y Fake API).
- ✔ **Código limpio y mantenible**: Estructura clara y fácil de mantener.
  
![397886456-1cdcf5e6-3c1c-4220-a12e-12b22135a6d4](https://github.com/user-attachments/assets/c90ca1c4-fee4-4a1b-9c04-be254f40127f)  
  
===========

# AngularFINALSimonetta

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.  
  

