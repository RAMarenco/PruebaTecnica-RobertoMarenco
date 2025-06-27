# Descripcion General

## Sistema de registro de eventos

Este sistema permite el registro de eventos con las categorias de Videojuego, Deporte y Carrera de caballo.

Se pide información del evento como, el nombre del evento, categoria del evento, precio, si permiten mascotas o no, y la fecha de dicho evento.

### Filtros

El sistema cuenta con filtros:

- Petfriendly
- Categoria

Se pueden limpiar los filtros seleccionados

### Arquitectura

El proyecto se encuentra separado en:

- Contextos **EventContext**: Este es el encargado de manejar la información de los eventos durante la ejecución del sistema.
- Hooks **useEvents**: Contiene funciones comunes o relacionadas a los eventos e.j: Agregar evento, Editar evento, Eliminar Evento, Actualizar localStorage, Manejo de filtros 
- Componentes: Elementos con capacidad de ser reutilizados a lo largo del sistema

## Proceso de instalación

- Clonar repositorio
  ```bash
    git clone https://github.com/RAMarenco/PruebaTecnica-RobertoMarenco.git
  ```

- Instalacion de dependencias
  ```bash
    npm i
  ```

- Ejecutar proyecto
  ```bash
    npm run dev
  ```

> El proyecto se ejecuta por defecto en la ruta http://localhost:5173 o http:127.0.0.1:5173

