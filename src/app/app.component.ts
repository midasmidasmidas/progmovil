import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from './services/servicebd.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    
    constructor(private router:Router, public bd:ServicebdService) {
    }

    async cerrarSesion() {
        await this.bd.cerrarSesion();
        this.router.navigate(['/home']);
    }
}
