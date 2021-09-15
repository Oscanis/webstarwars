1. a github repository letöltése után az "npm install" felteszi a szükséges dependency-ket

2. ha localhoston akarod futtatni, az ng serve parancs lefutása után a http://localhost:4200 címen elérhető az app

3. a bejelentkezés ablakon a név és jelszó feladat a leírásában van megadva. Mivel ez egy tesztfeladat, előre be van írva a mezőkbe

4. ezután a karakterek kiválasztása oldalra jutunk. A mobilos "swipe" funkciót végül nem implementáltam, ehhez több idő és kísérletezés kell mert első alkalom, hogy a swipe.js-t használnám. Inkább a feladat többi részére koncentráltam.
A kiválasztásnál csak akkor jelenik meg a "Küzdelem szimulálása" gomb, ha két ellentétes oldalú karakter ki van választva

5. a szimuláció teljesen automatikus, 1 másodpercenként véletlenszerűen valamelyik fél veszít az életerejéből. Ha ez elfogy egyiküknél, automatikusan a másik nyer