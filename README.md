# Calculadora de Costos de Proyectos

Esta aplicación web permite calcular los costos de un proyecto en función de los perfiles profesionales involucrados y sus tarifas por hora.

## Características

- **Cálculo de costos por perfil**: Permite ingresar las horas trabajadas por cada perfil profesional y calcula el costo total correspondiente.
- **Tarifas predefinidas**: Incluye una lista de perfiles profesionales con sus tarifas por hora predeterminadas, que se pueden modificar o ampliar.
- **Cálculo del costo total del proyecto**: Suma los costos de todos los perfiles y muestra el costo total del proyecto.
- **Agregar y eliminar perfiles**: Permite agregar nuevos perfiles profesionales y eliminar los existentes.
- **Guardar proyectos**: Permite guardar los datos de un proyecto para su posterior consulta.
- **Exportar a Excel**: Permite exportar los datos de la tabla de costos a un archivo de Excel.
- **Exportar a imagen**: Permite exportar la tabla de costos como una imagen JPEG.

## Tecnologías utilizadas

- HTML
- CSS (Bootstrap)
- JavaScript
- Librerías externas:
  - Bootstrap 5
  - xlsx (para exportar a Excel)
  - html2canvas (para exportar a imagen)
  - jspdf (para exportar a PDF)

## Cómo utilizar

1.  Abre el archivo `index.html` en tu navegador web.
2.  Ingresa el nombre del proyecto en el campo correspondiente.
3.  Completa las horas trabajadas para cada perfil profesional en la tabla de costos.
4.  Opcionalmente, puedes agregar nuevos perfiles o eliminar los existentes.
5.  El costo total del proyecto se actualizará automáticamente.
6.  Puedes guardar el proyecto, exportar los datos a Excel o exportar la tabla como imagen utilizando los botones correspondientes.

## Funcionalidades del Script

- **Carga de datos iniciales**: La función `cargarDatos()` se encarga de cargar los perfiles predefinidos en la tabla de costos al cargar la página.
- **Cálculo de costos**: La función `calcularTotal()` calcula el costo de un perfil en función de las horas trabajadas y la tarifa por hora.
- **Actualización del costo total**: La función `actualizarGranTotal()` actualiza el costo total del proyecto cada vez que se modifica la tabla de costos.
- **Limpieza y eliminación de filas**: Las funciones `limpiarFila()` y `eliminarFila()` permiten limpiar y eliminar filas de la tabla de costos, respectivamente.
- **Agregar nuevos perfiles**: La función `agregarFila()` permite agregar nuevos perfiles profesionales a la tabla de costos.
- **Guardar proyectos**: La función `guardarProyecto()` guarda los datos del proyecto en un array.
- **Mostrar proyectos guardados**: La función `mostrarProyectos()` muestra los datos de los proyectos guardados en un alert.
- **Exportar a Excel**: La función `exportToExcel()` utiliza la librería `xlsx` para exportar los datos de la tabla a un archivo de Excel.
- **Exportar a imagen**: La función `exportToImage()` utiliza la librería `html2canvas` para exportar la tabla como una imagen JPEG.

## Consideraciones

- La aplicación utiliza almacenamiento local del navegador para guardar los datos del proyecto.
- La funcionalidad de exportación a Excel y a imagen requiere conexión a Internet para cargar las librerías externas correspondientes.
