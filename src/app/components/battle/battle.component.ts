import { Component, OnInit } from '@angular/core';
import { PilotService } from 'src/app/services/pilot.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  statusText: string = "A tudás legyen veled!";

  //a felek alapadatai, feltöltve placeholderekkel a tesztelés miatt. Initnél automatikusan felülíródik
  combatantDark = {
    id: 'charId',
    name: 'Dark Combatant',
    imgpath: '../../../assets/characters/maul.png',
    health: 100,
    winner: false
  }

  combatantLight = {
    id: 'charId',
    name: 'Light Combatant',
    imgpath: '../../../assets/characters/solo.png',
    health: 100,
    winner: false
  }

  constructor(public pilotService: PilotService) { }

  ngOnInit(): void {
    //setup
    this.statusText = "A tudás legyen veled!";
    this.loadCombatants();
    //1.5 másodperces késleltetés, mielőtt elindul a csata
    setTimeout(() => { this.startCombat(); }, 1500);
  }

  //a pilotService alapján a felek adatainak betöltése, beállítása
  loadCombatants() {
    this.combatantDark.id = this.pilotService.characterList.characters[this.pilotService.combatantDark].id;
    this.combatantDark.name = this.pilotService.characterList.characters[this.pilotService.combatantDark].name.replace('<br>', ' ').toLowerCase();
    this.combatantDark.imgpath = `../../../assets/characters/${this.combatantDark.id}.png`;
    this.combatantDark.health = 100;
    this.combatantDark.winner = false;

    this.combatantLight.id = this.pilotService.characterList.characters[this.pilotService.combatantLight].id;
    this.combatantLight.name = this.pilotService.characterList.characters[this.pilotService.combatantLight].name.replace('<br>', ' ').toLowerCase();
    this.combatantLight.name.replace('<br>', ' ');
    this.combatantLight.imgpath = `../../../assets/characters/${this.combatantLight.id}.png`;
    this.combatantLight.health = 100;
    this.combatantLight.winner = false;
  }

  //folyamatos 1 másodperces intervallum a körökhöz, amíg az egyik fél nem győz
  startCombat() {
    let interval = setInterval(() => { 
      if (this.combatantDark.winner === false && this.combatantLight.winner === false) { 
        this.nextRound();
      }
      else { 
         clearInterval(interval);
      }
   }, 1000);
  }

  //az aktuális kör lejátszása
  nextRound() {
    //random függvény, hogy melyik fél sérül
    if(Math.floor(Math.random() * 2) === 0) {
      this.combatantDark.health -= 25;
    }
    else{
      this.combatantLight.health -= 25;
    }
    //console.log(this.combatantDark.health + " vs " + this.combatantLight.health);

    //sérülés után ha az egyik félnek elfogy a HP-ja, a másik győz
    if(this.combatantDark.health <= 0)
    {
      this.combatantLight.winner = true;
      this.statusText = 'A csata nyertese';
      console.log("The winner is: " + this.combatantLight.name);
    }
    else if (this.combatantLight.health <= 0)
    {
      this.combatantDark.winner = true;
      this.statusText = 'A csata nyertese';
      console.log("The winner is: " + this.combatantDark.name);
    }
  }

  //visszalépés a karakter választáshoz
  finish() {
    this.pilotService.combatantDark = -1;
    this.pilotService.combatantLight = -1;
    this.pilotService.selectionStage = true;
  }
  
}
