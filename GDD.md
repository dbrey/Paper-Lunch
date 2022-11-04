Grupo 11 - *Mango games Paper Lunch! -* Game Design Document

***Paper Lunch!***

Documento de diseño de videojuego *Mango games*

Versión 1.2 - 10 Octubre de 2022



|**Géneros:** Estrategia, Gestión de recursos|**Modos:** 1 jugador|
| - | - |
|<p>**Público objetivo:**</p><p>Jugadores casuales, a partir de 12 años sin importar genero</p>|**Plataformas:** Página web PC|
**Descripción**

Eres una vendedora de periódicos ambulante con un gran sueño: ¡Tener tu propia editorial de periódicos! Lucha por hacerte un hueco en esta peculiar ciudad dividida por la gastronomía.



|**Logotipo y portada del juego**|
| - |
|![](https://github.com/dbrey/Paper-Lunch/blob/main/assets/GDDImages/logotipo.jfif)|
**Tabla de contenidos**

1. **Aspectos generales**

*“Paper Lunch!”* es un juego de gestión de recursos narrativo en el que el jugador encarna a Amelia, que empieza a montar su propia editorial de periódicos. Encargándose de la edición y el reparto el jugador deberá tratar de conseguir suficiente dinero para poder comprar su propio edificio editorial y no quedarse en bancarrota.

**1.1. Relato breve y parcial de una partida típica**

El jugador elegirá entre un número de titulares, que afectarán de manera positiva o negativa a su reputación en los distintos distritos, tras esto tendrá que seleccionar el número de periódicos que planea vender. También podrá elegir la cantidad de anuncios que introducir, generando más dinero por venta pero reduciendo la reputación de manera general. Una vez configurado el periódico el jugador será llevado al centro de la ciudad y tomará el control de Amelia, el personaje principal. Tendrá que moverse por los distritos e interactuar con los NPCs para vender periódicos. Dependiendo del nivel de reputación que tenga en el distrito en el que se encuentre podrá vender una tirada de periódicos en el correspondiente kiosko. El día acabará si se acaba el tiempo que dura, 5:00 minutos o si el jugador vende todos los periódicos producidos ese día. De manera adicional, un día podrá acabar si el jugador se queda sin energía, esto podrá ser evitado yendo a restaurantes para así rellenar esa energía a cambio de dinero y una reducción de tiempo.

2. **Menús y modos de juego**

Solo habrá un modo de juego, en el que solo podrá jugar un jugador. Habra los menús clásicos que componen casi cualquier juego:

- Menú Principal
- Juego principal
  - Preparar el periodico
  - Ciudad
- Menú de pausa / Ver el mapa
- Menú de opciones

![](https://github.com/dbrey/Paper-Lunch/blob/main/assets/GDDImages/DiagramaEstados.jpeg)

1. **Configuración**

La única opción de configuración del juego será el volumen de la música y/o efectos de

sonido. El jugador podrá aumentar o disminuir el volumen de estos desde el menú de pausa.

2. **Interfaz y control**

**Menú principal**

![](https://github.com/dbrey/Paper-Lunch/blob/main/assets/GDDImages/MenuPrinc.jpeg)

En este menú, siendo el principal del juego y el primero que ve el jugador, presentamos el nombre del juego, el nombre de nuestra “compañía” y un botón para empezar la partida. El fondo se trata de un gif en el que observamos la ciudad del juego.

**Menú de pausa**

![](https://github.com/dbrey/Paper-Lunch/blob/main/assets/GDDImages/MenuPausa.jpeg)

En el menú de pausa el jugador podrá modificar la intensidad del volumen del juego (o directamente quitarlo) así como ver los controles y un minimapa para que le sea más fácil moverse por la ciudad. También cuenta con dos botones: uno para volver al juego y otro para ir al menú principal.

**Juego principal (cuando esta el jugador en la ciudad)**

![](https://github.com/dbrey/Paper-Lunch/blob/main/assets/GDDImages/HUD.jpeg)

En el HUD del juego habrán 4 estadísticas que el jugador debe conocer en todo momento. Dos de ellas serán barras verticales (que representan la hambruna del jugador y el nivel de fama en contraposición a la confianza de tu periódico) y otras dos serán elementos numéricos (que informarán del dinero y del número de periódicos que posee el jugador en cada momento). Todos ellos contarán con un símbolo que facilite su interpretación por los jugadores. En la parte superior encontramos un reloj/contador que nos informa del tiempo que queda para que se complete el día de juego (este reloj no se modificará mientras el jugador esté en otros menús).

**Juego principal (cuando se esta preparando el periodico)**

![](https://github.com/dbrey/Paper-Lunch/blob/main/assets/GDDImages/Prep.jpeg)

El jugador deberá escoger un titular de entre las cuatro opciones (se selecciona haciendo clic sobre él, y aunque ya tengas seleccionado uno se actualizará la elección si se hace clic sobre otro) viendo cómo afectará cada uno a su reputación en los distintos distritos. A continuación, sabiendo el número de monedas que tiene, introducirá el número de periódicos que desea producir ese día (seleccionando la casilla e introduciendo el número con el teclado).

En la parte inferior se encontrará el botón para seguir con el juego y pasar a la fase de venta, ya disponible si se han realizado las dos acciones anteriores (de no ser así no se podrá hacer clic sobre él), y a su izquierda los distintos anuncios que se podrán añadir al periódico si se hace clic sobre ellos. Estos se irán desbloqueando con el paso de los días (se verán con un candado si aún siguen bloqueados).

**Menú de opciones**

![](https://github.com/dbrey/Paper-Lunch/blob/main/assets/GDDImages/Opciones.jpeg)

En este menú el jugador podrá ver los controles del juego y ajustar el volumen del mismo a su gusto (como si decide eliminarlo por completo). Será accesible desde el menú principal y desde el menú de pausa (como se observa en el diagrama de flujo de la página 2). El botón volver devolverá al jugador al menú en el que estaba anteriormente siendo cualquiera de los dos ya nombrados.

3. **Jugabilidad**

Al iniciar la partida, el jugador tiene X días para reunir cierta cantidad de dinero para montar una editorial. Cada día implica unos X minutos de juego (5-10 minutos aprox)

Cada día, el jugador empieza preparando los periódicos, y tras personalizar sus noticias, empieza desde el centro del mapa. El jugador se moverá por el mapa, buscando personas a las que venderles sus periódicos y consiguiendo comida para pasar el día

1. **Mecánicas**
1. **Estadísticas**
- Reputación
  - Si a los vecinos les gusta el tipo de periódicos que vende el jugador, tu reputación entre ellos aumentará. Si no les gusta, su confianza en tus periódicos caerá, así como tus ingresos.
  - En algunas ocasiones, si tienes suficiente reputación, los vecinos te pueden dar una propina al venderles.
- Dinero
- Necesario para poder llegar a la meta final y generar nuevos periódicos.
- Puede conseguirse vendiendo periódicos. 1 periodico = X monedas.
- Puede conseguirse poniendo anuncios, a costa de una cantidad X de reputación.
- Hambre (Opcional)
  - Según pasa el día dentro del juego, el jugador puede tener hambre. Si baja demasiado esta estadística, se desmayará y perderá todo el dinero conseguido ese día junto con los periódicos que no haya vendido todavía. (El nivel de confianza no caerá si ocurre eso mismo)
- Sed (Opcional)
- Funciona igual que el hambre: debes beber para no acabar deshidratado y desmayarte. El beber te llevará X cantidad de tiempo, pero es gratis. El objetivo es tener fuentes en distintos puntos de la ciudad para que el jugador la sienta más dinámica y recorra más distancia, así como añadir un cierto punto de realismo al juego.
2. **Preparación del periodico**

Al inicio del dia, el jugador prepara el periodico en el que tiene en cuenta las siguientes características:

- Titular:
  - Dependiendo del titular, éste se venderá más o menos dependiendo del distrito.
- Número de periódicos:
  - Generar periódicos cuesta X monedas por periodico. Lo ideal es generar suficientes periódicos teniendo en cuenta cuantos va a poder vender en el día según el titular y la reputación entre los vecinos.
- Anuncios:
- Para poder incluir anuncios, es necesario avanzar en los días del juego, ya que irás siendo más conocido entre los lugareños. Cuidado, los anuncios harán que la gente pueda comprar menos periódicos aunque te ayudan a conseguir más dinero.
3. **Movimiento**

El jugador puede moverse en un mapa topdown hacia el norte,sur este u oeste. Puede moverse caminando o usando un vehículo (probablemente una bicicleta).

- **Billetes de metro**

El jugador puede comprar un ticket en el metro para poder moverse de un punto a otro de la ciudad, permitiéndole llegar mucho más lejos y rápido y así vender en más zonas. Un ticket a otro punto del mapa cuesta X monedas.

2. **Dinámica**

Tras pasar 7 días, si el jugador ha conseguido la cantidad de dinero necesaria, consigue montar una editorial y ganar el juego, si no llega a esa cantidad, pierde la partida y obtiene un

final negativo.

El jugador tendrá que balancear los periódicos que produce con el dinero que tiene y con el tiempo del que dispone. También será necesario balancear la reputación en los distritos y

vigilar lla cantidad de anuncios introducidos. Conforme vaya avanzando en el juego y gane más reputación, la venta en kioskos permitirá vender mayores cantidades de una sola vez.

3. **Estética**

Nos hemos decantado por el estilo artístico *Pixel-art*. Varios recursos se sacarán de Itch.io u otros lados, y posiblemente se modifiquen para adaptarse mejor al juego. Otros, los haremos nosotros, como puede ser el caso de los NPCs, desarrollados a partir de una plantilla

4. **Contenido**

Serán necesarios sonidos de ambiente y se crearán dos temas musicales, uno para el momento en el que se crea el periódico y otro mientras se reparten los periódicos.

Visualmente se usarán tilesets de ciudad (preferentemente representativos de cada cultura) y modelos de NPCs genéricos. Se creará un modelo específico para el personaje principal.

1. **Historia**

La venta de periódicos, sus titulares, los anuncios entre otros, son dependientes de la historia y su temática: *la gastronomía*. Para este juego se han elegido (a priori) las siguientes cocinas:

- Gastronomía española: Representada por la paella, la tortilla, el cocido montañés, el pulpo gallego, el cachopo, el gazpacho, entre otros platos típicos. Cuidado con mencionar la cebolla cerca, ya que puede incitar a una pelea sobre si una tortilla de patata debe llevar cebolla o no.
- Gastronomía italiana: Representado por la pasta, la pizza, la lasaña, el risotto, el carpaccio… Son capaces de ir a la guerra como un trozo de piña caiga cerca de la pizzería local de su distrito.
- Gastronomía japonesa: Representada por el ramen, el sushi, el takoyaki, los onigiris, la sopa de miso, el gyudon. Ante cualquier problema, se crea una revuelta donde encienden antorchas recubiertas de wasabi.
- Gastronomía vegana: Aquí manda la verdura.

El jugador jugará como el personaje Amelia, la nieta de Leoncia, a quien la representaron como una hermosa estatua de una repartidora de periódicos. Para cumplir el sueño de su abuela, quiere montar una editorial en su honor.

Para cumplirlo, tiene que vender periódicos en una ciudad dividida por sus gustos culinarios.

La historia de la ciudad se contará a través de los titulares de los periódicos, por lo tanto el jugador la descubrirá según vayan pasando los días y se repartirá de la siguiente forma:

- ***Día 1 Introducción:***

Se muestran las tensiones que hay entre los distritos con titulares crispados, además se anuncia que un crítico culinario visita la ciudad y elegirá qué distrito es el mejor.

- ***Día 2 Intoxicación:***

El crítico culinario sufrió una intoxicación tras terminar su visita, no sé sabe cuál de los restaurantes es el culpable y esto no hace más que aumentar las tensiones.

- ***Día 3 Sospechas:***

Llueven las acusaciones y sospechas entre los distritos.

- ***Día 4 Culpable:***

Las autoridades demuestran que el crítico culinario fue el culpable de su propia intoxicación, al llevar sus propios cubiertos, que no estaban lo suficientemente limpios. Esto detiene las acusaciones, sin embargo las tensiones se encuentran en un máximo histórico.

- ***Día 5 Expectación y Tensiones:***

Se acerca el gran festival de la ciudad en el que se juntan todos los distritos para mostrar sus comidas y hacer colaboraciones. Sin embargo este año es una incógnita cómo resultará.

- ***Día 6 El Evento:***

Es el día del evento. Dependiendo de la reputación que el jugador haya mantenido con los distritos saldrá bien o mal.

- ***Día 7 Consecuencias:***
- Día 7 A: El evento ha sido un desastre, ha habido una gran pelea en el que la comida ha volado por todos lados y la ciudad no se podrá recuperar.
- Día 7 B:

El evento ha salido bien, la ciudad se ha recuperado de las tensiones y todo ha vuelto a la normalidad.

En cualquiera de los desenlaces el jugador podrá “ganar” si ha conseguido el suficiente dinero para comprar su propio edificio editorial.

2. **Niveles**

El nivel es una ciudad dividida en 4 distritos temáticos divididos por su estilo de comida. Cada distrito se diferencia estéticamente para reflejar la gastronomía que representa.

El jugador aparece junto al spawn, que representa la casa de la protagonista, en esta localización se pueden mejorar los sistemas relacionados con los periódicos. Junto al spawn se encuentra una tienda de bicicletas que permiten mejorar la movilidad del personaje.

A lo largo de las calles el jugador encontrará NPCs con los que interactuar y a los que vender periódicos.

Cada distrito tiene un parque, dos kioskos, una parada de metro y un lugar donde comer, temático del distrito.

Los parques se encuentran en el centro de cada distrito y en ellos se encuentra una mayor cantidad de NPCs y un kiosko.

En los kioskos el jugador puede vender tiradas de periódicos, es decir un alto número de periódicos de una sola vez, a partir de alcanzar una cantidad de reputación. El jugador puede encontrar uno en el parque del distrito correspondiente y otro adentrándose más en el distrito.

Las paradas de metro permiten transportarse rápidamente entre distritos comprando un billete.

En los lugares para comer se puede reponer el medidor de hambre a cambio de un precio. (Si da tiempo a desarrollar la funcionalidad el jugador obtendrá una bonificación distinta dependiendo del distrito en el que coma)![](https://github.com/dbrey/Paper-Lunch/assets/GDDImages/Mapa.jpeg)

**División por distritos:**  

![](https://github.com/dbrey/Paper-Lunch/blob/main/assets/GDDImages/DivisionDistritos.jpeg)

**Escala:**

![](https://github.com/dbrey/Paper-Lunch/blob/main/assets/GDDImages/Escala.png)

3. **Personajes**
- *Amelia*: Personaje principal del juego que el jugador controla. Es la nieta de Leoncia,

personaje de Cáceres que tiene una estatua en la que se basa el juego. Se mueve por la ciudad en bicicleta, donde reparte periódicos editados por ella, con la esperanza de ahorrar suficiente dinero para montar su propia editorial.

- *NPCs varios*: Se encuentran repartidos por la ciudad, moviéndose o estáticos. No

tienen una distinción característica.

4. **Objetos**

El jugador llevará los siguientes objetos:

-Periódicos: El jugador lleva la cantidad que ha decidido previamente imprimir y puede repartir entre NPCs y kioskos para obtener dinero y recuperar la inversión. Solo duran la jornada en la que se han impreso.

-Bicicleta (Implementación opcional) : Permite al jugador moverse a mayor velocidad y se pueden comprar mejoras en el taller de bicicletas.

**Referencias**

2016. *Stardew Valley.* Barone, E.
2018. *Graveyard Keeper*. St. Petersburg, Russia: Lazy Bear Games.
2020. *No Umbrellas Allowed*. Hoochoo Game Studios.
2018. *Moonlighter*. Digital Sun.

