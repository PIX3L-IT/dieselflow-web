<!--- Proporciona un resumen general de tus cambios en el título -->
 
 ## Resumen
 <!--- Explica brevemente qué hace este PR y por qué es necesario. -->
 
 ## ¿Dónde puedo previzualizar esta funcionalidad?
 <!--- Explica cómo se puede acceder a esta funcionalidad -->
 1. 
 
 ## Tipos de cambios
 <!--- ¿Qué tipos de cambios introduce tu código? Marca con una `x` las opciones que correspondan: -->
 - [ ] Corrección de error (cambio que soluciona un problema sin afectar otras funcionalidades)
 - [ ] Nueva funcionalidad (cambio que agrega una nueva característica sin afectar otras funcionalidades)
 - [ ] Cambio disruptivo (corrección o nueva funcionalidad que afecta el funcionamiento esperado)
 
 ## Verificación de código:
 <!--- Revisa todos los siguientes puntos y marca con una `x` los que apliquen. -->
 
 - [ ] Otro desarrollador ha revisado este PR y lo ha aprobado.
 - [ ] La rama será eliminada después de la aprobación.
 
 ### Estándares generales:
 
 - [ ]  El código debe cumplir con las secciones “Reducción de anidamientos” y “Longitud de las líneas” del estándar de codificación que se define en el proyecto departamental.
 
 ### Lógica:
 
 - [ ]  No hay llamadas a funciones no existentes.
 - [ ]  Las condiciones de salida de bucles están correctamente definidas.
 - [ ]  No hay código inalcanzable
 - [ ]  No hay código redundante.
 - [ ]  Sólo se utilizan returns tempranos cuando se manejan excepciones especiales, como condiciones con datos inválidos.
 
 ### Datos:
 
 - [ ]  Los tipos de datos son los correctos y válidos.
 - [ ]  No se exponen detalles o datos internos en mensajes de error.
 - [ ]  El ámbito o alcance de los datos gestionados en las funciones está definido (la función no tiene acceso a datos no relevantes con su propósito).
 
 ### Gestión de errores:
 
 - [ ]  Todas las excepciones se manejan de forma esperada.
 - [ ]  Las excepciones capturadas tienen un propósito claro o no son genéricas.
