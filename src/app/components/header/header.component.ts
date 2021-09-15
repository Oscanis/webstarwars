import { Component, OnInit } from '@angular/core';
import { PilotService } from 'src/app/services/pilot.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public pilotService: PilotService) {
  }

  ngOnInit(): void {  }

  onLogout() {
    this.pilotService.logout();
    console.log("logged out");
  }
}
