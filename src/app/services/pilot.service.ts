import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pilot } from '../interfaces/Pilot-interface';
import { Characters } from '../interfaces/Character-interface';
import { Simulation } from '../interfaces/Simulation-interface';

@Injectable({
  providedIn: 'root'
})
export class PilotService {

  //publikus változók - alap infók megadva offline tesztelés miatt, loginnál felülíródik
  pilot: Pilot = {
    token: 'testToken',
    refreshToken: 'refreshToken',
    user: {
      email: 'test@ema.il',
      firstName: 'Pilóta',
      lastName: 'Felvételiző'
    }
  };
  //pár karakter előre betöltve offline tesztelés miatt, loginnál felülíródik
  characterList: Characters = {
    characters: [
      {
          id: "vader",
          name: "Darth<br>Vader",
          side: "DARK",
          power: "Erő használata",
          description: "Vader az egyik legmarkánsabb, legikonikusabb és legkarizmatikusabb gonosztevő, hatalmas (bár még emberléptékű) termetével, sötét sisakjával, félelmetes akusztikájú, jellegzetes lélegzetvételével és hangképzésével."
      },
      {
          id: "maul",
          name: "Darth<br>Maul",
          side: "DARK",
          power: "Erő használata",
          description: "Maul egy dathomiri zabrak fajba tartozó, Erő-érzékeny férfi volt, aki a Galaktikus Köztársaság hanyatlásának, majd a Galaktikus Birodalom felemelkedésének idején a Sith nagyúr, Darth Sidious tanítványaként, majd ellene fordulva a mandalori Halálőrség, később pedig Fekete Nap és a Vörös Hajnal bűnszövetkezetek fejeként tevékenykedett."
      },{
        id: "yoda",
        name: "Yoda<br>mester",
        side: "LIGHT",
        power: "Erő használata",
        description: "Yoda, aki mindössze 66 cm magas volt, a Jedi Tanács egyik legtiszteltebb tagja. Yoda számtalan Jedi lovagot képzett ki az idők során. Ezek között a nevesebbek: Dooku gróf, Obi-Wan Kenobi (őt csak addig tanította, amíg Qui-Gon Jinn át nem vette tőle), Ki-Adi-Mundi és Luke Skywalker. Valójában azonban majdnem minden Jedinek a mestere, hiszen a Jedi Templomban ő tanította csoportosan a fiatalokat."
      },
      {
        id: "solo",
        name: "Han<br>Solo",
        side: "LIGHT",
        power: "Űrcsempész",
        description: "A Korélián született, 10 évvel a császár uralma előtt. Szüleit soha nem ismerte, csak sejtette, hogy ki lehetett az apja és az anyja. Később nem tervezve, de csatlakozik a Lázadók Szövetségéhez (melyben fokozatosan, a tábornoki rangig emelkedik), és nagyban hozzájárul az első Halálcsillag megsemmisítéséhez, majd végül az Uralkodó hatalmának megdöntéséhez."
      }
    ]
  };

  //offline teszteléshez a loggedIn default 'true', éles környezethez 'false. A login() -t is ki kell kommentelni
  loggedIn: boolean = true;

  
  selectionStage: boolean = false;
  combatantLight: number = 2;
  combatantDark: number = 1;
  simulationId: string = '';

  //privát változók
  private apiurl = 'https://developer.webstar.hu/rest/frontend-felveteli';
  private applicantId = 'TLtTgu8dNkGzd8k9';


  constructor(private http: HttpClient) { }

   //testing -> ha loggedIn = true, nem kér nevet-jelszót
   /*login(pilot, pass) {
     console.log(pilot, pass);
   }*/

  login(pilot, pass) {
    this.httpLogin(pilot, pass).subscribe(p => {
      try {
        this.pilot = p;
        this.loggedIn = true;
        //sikeres loginnél egyből lekérdezzük a karakterlistát
        this.getCharacters();
        return 'success';
      }
      catch {
        return p.error;
      }
    });
  }

  logout() {
    this.loggedIn = false;
    this.pilot = undefined;
  }

  getCharacters() {
    this.httpCharacters().subscribe(c => {
      try {
        this.characterList = c;
      }
      catch {
        console.log(c.error);
      }
    });
  }

  simulate(dark: string, light: string) {
    this.httpSimulate(dark, light).subscribe(s => {
      try {
        this.simulationId = s.simulationId;
        this.selectionStage = false;
      }
      catch {
        console.log(s.error);
      }
    });
  }

  //privát függvények a tényleges http requestekhez

  private httpLogin(pilot, pass) {

    const url = `${this.apiurl}/authentication/`;

    const body = {
      username: pilot,
      password: pass
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Applicant-Id': this.applicantId
      })
    }
    
    return this.http.post<Pilot>(url, body, options);
  }

  private httpCharacters() {
    const url = `${this.apiurl}/characters/`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Applicant-Id': this.applicantId,
        'Application-Authorization': this.pilot.token
      })
    }

    return this.http.get<Characters>(url, options);
  }

  private httpSimulate(dark: string, light: string) {
    const url = `${this.apiurl}/simulate/`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Applicant-Id': this.applicantId,
        'Application-Authorization': this.pilot.token
      })
    }

    const body = {
      username: dark,
      password: light
    };

    return this.http.post<Simulation>(url, body, options);
  }
}
