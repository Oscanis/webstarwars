import { Component, OnInit } from '@angular/core';

import { PilotService } from '../../services/pilot.service';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.scss']
})
export class MainviewComponent implements OnInit {

  offsetFlag: boolean = false;

  constructor(public pilot: PilotService) { }

  ngOnInit(): void {
  }
}
