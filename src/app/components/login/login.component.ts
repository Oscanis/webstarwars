import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PilotService } from 'src/app/services/pilot.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //a könnyebb tesztelhetőségért a név és jelszó előre beállítva. Élesben érdemes kivenni
  pilotFormControl = new FormControl('frontend@webstar.hu');
  passFormControl = new FormControl('s9@:8BpuC]*Q,e,A');

  constructor(private pilot: PilotService) { }

  ngOnInit(): void {
  }

  loginEvent() {
    this.pilot.login(this.pilotFormControl.value, this.passFormControl.value);
  }

}
