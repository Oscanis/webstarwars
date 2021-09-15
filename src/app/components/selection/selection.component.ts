import { Component, OnInit } from '@angular/core';
import { PilotService } from 'src/app/services/pilot.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  offsetFlag: boolean = false;

  //placeholder adatokkal feltöltve, tesztelés miatt. onInit alatt felülíródik
  inFocus = {
    serial: 0,
    id: 'charId',
    name: 'charName',
    side: 'side',
    power: 'power',
    description: 'Lorem ipsum...',
    imgpath: '../../../assets/characters/boba.png'
  }
  selectedLightId: string = '';
  selectedLightSerial: number = -1;
  selectedDarkId: string = '';
  selectedDarkSerial: number = -1;
  readyToFight: boolean = false;

  constructor(public pilotService: PilotService) { }

  ngOnInit(): void {
    this.updateFocused(this.inFocus.serial);
  }

  //karakter kiválasztása. Ha már ki van választva, eltávolítja (itt lehet majd finomítani hogy feldobjon üzenetet, stb.)
  onSelect() {
    switch(this.pilotService.characterList.characters[this.inFocus.serial].side) {
      case 'LIGHT':
        if(this.selectedLightId === '')
        {
          this.selectedLightId = this.pilotService.characterList.characters[this.inFocus.serial].id;
          this.selectedLightSerial = this.inFocus.serial;
          //console.log(this.inFocus.name + " from " + this.inFocus.side +" side selected");
        }
        else {
          this.selectedLightId = ''; 
          this.selectedLightSerial = -1;
          //console.log("Selection from LIGHT side removed");
        }
        break;
      case 'DARK':
        if(this.selectedDarkId === '')
        {
          this.selectedDarkId = this.pilotService.characterList.characters[this.inFocus.serial].id;
          this.selectedDarkSerial = this.inFocus.serial;
          //console.log(this.inFocus.name + " from " + this.inFocus.side +" side selected");
        }
        else {
          this.selectedDarkId = '';
          this.selectedDarkSerial = -1;
          //console.log("Selection from DARK side removed");
        }
        break;
    }

    //ha mindkét oldalról ki van választva karakter, megjelenik a továbblépés lehetősége
    if(this.selectedLightId != '' && this.selectedDarkId != '')
    {
      this.readyToFight = true;
      //console.log("READY");
    }
    else this.readyToFight = false;
  }

  onSwipeLeft() {
    if (this.inFocus.serial === 0 )
    {
      this.inFocus.serial = this.pilotService.characterList.characters.length - 1;
    }
    else {
      this.inFocus.serial--;
    }
    this.updateFocused(this.inFocus.serial);
  }

  onSwipeRight() {
    if (this.inFocus.serial === this.pilotService.characterList.characters.length - 1 )
    {
      this.inFocus.serial = 0;
    }
    else {
      this.inFocus.serial++;
    }
    this.updateFocused(this.inFocus.serial);
  }

  private updateFocused(i: number) {
    this.inFocus.id = this.pilotService.characterList.characters[i].id;
    this.inFocus.name = this.pilotService.characterList.characters[i].name;
    if(this.pilotService.characterList.characters[i].side === "LIGHT") {
      this.inFocus.side = "Világos";
    }
    else {
      this.inFocus.side = "Sötét";
    }
    this.inFocus.power = this.pilotService.characterList.characters[i].power;
    this.inFocus.description = this.pilotService.characterList.characters[i].description;
    this.inFocus.imgpath = `../../../assets/characters/${this.inFocus.id}.png`;
    //console.log(this.inFocus);
  }

  ready() {
    //console.log("FIGHT!");
    this.pilotService.combatantLight = this.selectedLightSerial;
    this.pilotService.combatantDark = this.selectedDarkSerial;
    this.pilotService.selectionStage = false;
  }

}
