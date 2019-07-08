import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
 
    submitted = false;
    authForm: FormGroup;
    returnUrl: string;
    loading = false;
 
    constructor(private router: Router,
                private route: ActivatedRoute, 
    	        private formBuilder: FormBuilder,
    	        private authService: AuthService,
    	        private alertController: AlertController) { 
		this.router.navigate(['/']);
    }
 
    ngOnInit() {
        this.authForm = this.formBuilder.group({
            email: ['dragan.gaic@gmail.com', [Validators.required, Validators.email]],
            password: ['passw0rd', [Validators.required, Validators.minLength(6)]]
        }, {});

		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';        
    }
 
    onSubmit(value: any): void { 
        this.submitted = true;
 
        // Stop if the form validation has failed
        if (this.authForm.invalid) {
            return;
        }
 
        this.loading = true;
        this.authService.login(this.frm.email.value, this.frm.password.value)
            .pipe(first())
            .subscribe(
                data => {
                	this.loading = false;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                	this.presentAlert(error.error.message);
                    this.loading = false;
                });        
    }

    onReset() {
        this.submitted = false;
        this.authForm.reset();
    }  

	async presentAlert(msg) {
		const alert = await this.alertController.create({
		  header: 'Alert',
		  subHeader: '',
		  message: msg,
		  buttons: ['OK']
		});

		await alert.present();
	}
 
    get frm() { return this.authForm.controls; }    
}