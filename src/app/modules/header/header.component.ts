import { Component, OnInit, Output, Input } from '@angular/core';
import { UsersService } from '../../shared/services/users/users.service';
import { Router } from '@angular/router';
import { WorkmeterService } from '../../shared/services/workmeter/workmeter.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() time: any;
  workmeter: string;

  constructor(
    private usersService: UsersService, 
    private router: Router,
    private workmeterService: WorkmeterService
  ) { }

  ngOnInit() {
    this.workmeter = this.toHHMMSS(this.workmeterService.worked);
    this.workmeterService.subject.subscribe((result)=>{
      this.workmeter = this.toHHMMSS(result);
    });
  }

    toHHMMSS = function (sec) {
        sec = parseInt(sec);
        let hours: any = Math.floor(sec / 3600);
        let minutes: any = Math.floor((sec - (hours * 3600)) / 60);
        let seconds: any = sec - (hours * 3600) - (minutes * 60);
        if (hours   < 10) hours   = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        return hours + ':' + minutes + ':'+seconds;
    }

  logout(){
    localStorage.removeItem('wmtoken');
    this.usersService.logged = null;
    this.router.navigate(['login']);
  }

}
