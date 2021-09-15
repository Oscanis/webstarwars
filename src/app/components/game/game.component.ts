import { Component, OnInit } from '@angular/core';
import { PilotService } from 'src/app/services/pilot.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public pilotService: PilotService) { }

  ngOnInit(): void {
  }

}
