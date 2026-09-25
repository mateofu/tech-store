# Tech Store

Tienda de tecnología desarrollada con React como prueba técnica para SISTRAN. Permite consultar productos, administrar un carrito y finalizar una compra simulada.

## Funcionalidades

- Catálogo de smartphones, portátiles y accesorios con imágenes y precios.
- Detalle de cada producto mediante su ID en la URL.
- Selector de cantidad con límites según el stock y las unidades del carrito.
- Agregado de productos sin duplicar filas del mismo artículo.
- Contador de unidades en la barra de navegación.
- Eliminación de productos y vaciado del carrito con confirmación en una modal.
- Resumen con precio unitario, cantidad, subtotal y total.
- Modal de confirmación antes de finalizar la compra simulada y limpiar el carrito.
- Estados de carga, catálogo vacío, errores y reintentos.
- Página de error para rutas desconocidas.
- Diseño adaptable con React Bootstrap e iconos Font Awesome.

## Tecnologías

- React 19 con JavaScript y Vite 8.
- React Router 7 para navegación.
- Context API, useContext y useReducer para el carrito.
- React Bootstrap 2 y Bootstrap 5 para la interfaz.
- Font Awesome para iconos.
- Fetch API y AbortController para las consultas.
- Oxlint para revisión estática.
- Node.js Test Runner para pruebas automatizadas.

## Requisitos

- Node.js 24 y npm 11, versiones utilizadas durante el desarrollo.
- Conexión a internet para descargar dependencias y consultar productos e imágenes.

No se requiere una base de datos, un servidor propio ni variables de entorno.

## Instalación

```bash
git clone https://github.com/mateofu/tech-store.git
cd tech-store
npm ci
```

Si ya tienes el proyecto descargado, abre una terminal en su carpeta y ejecuta `npm ci`. Este comando utiliza las versiones registradas en `package-lock.json`.

## Ejecución

```bash
npm run dev
```

Abre la dirección que indique Vite en la terminal; normalmente es `http://localhost:5173`.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la aplicación de producción en `dist/`. |
| `npm run preview` | Permite revisar localmente la compilación de producción. |
| `npm run lint` | Ejecuta Oxlint. |
| `npm test` | Ejecuta las pruebas del servicio, carrito, selectores y vistas. |

Para revisar la compilación de producción:

```bash
npm run build
npm run preview
```

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Catálogo de productos. |
| `/product/:id` | Detalle de un producto. |
| `/cart` | Carrito, resumen y confirmación de compra. |
| Cualquier otra | Página no encontrada. |

## Estructura

```text
src/
  components/
    AddItemButton/
    Brief/
    CartWidget/
    ConfirmationModal/
    Item/
    ItemDetail/
    ItemDetailContainer/
    ItemList/
    ItemListContainer/
    ItemQuantitySelector/
    NavBar/
  context/
    CartContext.jsx
    CartProvider.jsx
    cartReducer.js
    cartSelectors.js
  hooks/
    useCheckout.js
    useProduct.js
    useProducts.js
    useQuantitySelector.js
  pages/
    Checkout.jsx
    Home.jsx
    NotFound.jsx
    ProductDetail.jsx
  services/
    productsApi.js
  utils/
    cartPresentation.js
    formatPrice.js
    productPresentation.js
  views/
    CatalogView.jsx
    CheckoutView.jsx
    ProductDetailView.jsx
  App.jsx
  index.css
  main.jsx
tests/
  cartReducer.test.js
  productsApi.test.js
  cartSelectors.test.js
  views.test.js
```

Los hooks gestionan consultas, estado, reintentos y acciones. Los contenedores conectan esos hooks con las vistas. Las vistas y los componentes de presentación reciben los datos preparados y las funciones mediante props; no consultan la API, no gestionan estado del carrito ni calculan importes. Las condiciones y los recorridos del JSX se limitan a presentar los datos recibidos. El servicio centraliza las peticiones HTTP.

`CartProvider` comparte el carrito y sus operaciones. `cartReducer` agrega, elimina y vacía productos mediante actualizaciones inmutables. Los selectores de contexto calculan cantidades, disponibilidad, subtotales y total; los importes se suman en centavos. Las utilidades de presentación preparan los precios y las imágenes para las vistas. useCheckout captura el resumen antes de vaciar el carrito y useQuantitySelector coordina la selección y el agregado de unidades.

## API de productos

Se utiliza [DummyJSON](https://dummyjson.com/docs/products), una API pública de datos de ejemplo.

El catálogo consulta las categorías `smartphones`, `laptops` y `mobile-accessories`:

```text
GET https://dummyjson.com/products/category/smartphones?limit=0
GET https://dummyjson.com/products/category/laptops?limit=0
GET https://dummyjson.com/products/category/mobile-accessories?limit=0
GET https://dummyjson.com/products/:id
```

Las tres categorías se consultan en paralelo. El servicio comprueba los códigos HTTP y la estructura de los datos antes de entregarlos a los componentes. Las solicitudes se cancelan cuando la vista deja de necesitarlas.

Los títulos, las descripciones, las imágenes, los precios y el stock proceden de la API. Las descripciones pueden estar en inglés y los datos pueden cambiar. La interfaz presenta los precios en USD, sin conversión a pesos colombianos.

## Pruebas

```bash
npm test
npm run lint
npm run build
```

Las 37 pruebas automatizadas cubren las operaciones inmutables del carrito, la acumulación de cantidades, los límites de stock, la eliminación y el vaciado. También comprueban la carga de categorías, los IDs inválidos, los errores HTTP y de red, las respuestas incompletas, el JSON inválido y la cancelación de solicitudes.

Las pruebas del servicio simulan Fetch y no necesitan conexión a la API. Las pruebas de selectores comprueban importes y disponibilidad; las pruebas de vistas utilizan Vite y renderizado de React en Node para comprobar sus estados y props sin depender del contexto. No son pruebas de navegador ni sustituyen la revisión visual o del flujo interactivo completo.

### Verificación manual

1. Abrir el catálogo y consultar el detalle de dos productos distintos.
2. Agregar varias unidades de un producto y comprobar el contador.
3. Volver a agregar el mismo producto y revisar que se acumula en una sola fila.
4. Comprobar que no se puede superar el stock.
5. Abrir la confirmación de eliminar un producto: cancelar debe conservarlo; confirmar debe actualizar cantidades e importes.
6. Abrir la confirmación de vaciar el carrito: cancelar debe conservarlo; confirmar debe mostrar la vista vacía.
7. Agregar productos y abrir la confirmación de compra: comprobar el total, cancelar y volver a abrir para confirmar.
8. Comprobar que se conserva el resumen de esa compra y el contador queda en cero.
9. Volver al catálogo y entrar al carrito: debe estar vacío.
10. Probar `/product/abc`, `/product/999999` y una ruta desconocida.
11. Revisar el menú, las tarjetas y la tabla en pantalla móvil y con teclado.
12. Comprobar que Escape y el botón de cierre cancelan las modales sin modificar el carrito.
13. Verificar que todo el botón de regreso es clicable y que el tooltip de eliminar aparece sin desplazar la página.

## Alcance y limitaciones

- La compra es una simulación: no procesa pagos, no registra pedidos en un servidor ni genera envíos.
- El carrito se mantiene en memoria durante la navegación. Se pierde al recargar o cerrar la página.
- La confirmación permanece mientras se conserva la vista de checkout. No existe un historial de compras.
- El stock se comprueba en el cliente usando los datos recibidos de la API; no se reserva inventario real.
- No se implementan autenticación, impuestos, costos de envío ni códigos de descuento.
- El catálogo depende de la disponibilidad de DummyJSON y de sus imágenes.

Si se publica en un alojamiento estático, debe configurarse el retorno a `index.html` para las rutas de la aplicación, ya que se utiliza BrowserRouter. `npm run preview` sirve para revisión local, no como servidor de producción.
