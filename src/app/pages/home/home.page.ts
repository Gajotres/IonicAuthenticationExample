import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    private user: User;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.user = this.authService.currentUserValue;
	}

    logout() {
    	this.authService.logout();
    }    

}