import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CompanyserviceService} from './service/companyservice.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from './../environments/environment';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MaterialVendorComponent } from './components/machinevendors/material-vendor.component';
import { ProfessionalsComponent } from './components/professionals/professionals.component';
import { RentalmachinesComponent } from './components/rentalmachines/rentalmachines.component';
import { VaccancyComponent } from './components/vaccancy/vaccancy.component';
import { LicenseinfoComponent } from './components/licenseinfo/licenseinfo.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './components/search/search.component';
import { MaterialpricesComponent } from './components/materialprices/materialprices.component';
import { ContractdealersComponent } from './components/contractdealers/contractdealers.component';
import { BidsComponent } from './components/bids/bids.component';
import { NewsComponent } from './components/news/news.component';
import { ContractDealersComponent } from './components/contract-dealers/contract-dealers.component';
import { WoredaComponent } from './woreda/woreda.component';
import { CompanyComponent } from './components/company/company.component';
import {VacancyserviceService} from './service/vacancyservice.service';
import {BidService} from './service/bid.service';
import {ProfessionalService} from './service/professional.service';
import {MaterialpriceService} from './service/materialprice.service';
import {ContractdealerService} from './service/contractdealer.service';
import {RentalmachineService} from './service/rentalmachine.service';
import {NewsService} from './service/news.service';
import {MaterialvendorService} from './service/materialvendor.service';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {config} from 'rxjs/index';
import { LoginComponent } from './components/login/login.component';
import {UserService} from './service/user.service';
import {WoredaserviceService} from './service/woredaservice.service';
import {RouterModule} from '@angular/router';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MaterialVendorComponent,
    ProfessionalsComponent,
    RentalmachinesComponent,
    VaccancyComponent,
    LicenseinfoComponent,
    MainComponent,
    SearchComponent,
    MaterialpricesComponent,
    ContractdealersComponent,
    BidsComponent,
    NewsComponent,
    ContractDealersComponent,
    WoredaComponent,
    CompanyComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
    ,AngularFireDatabaseModule
  ],
  providers: [{ provide: NZ_I18N,
    useValue: en_US,

  },AngularFireDatabase,UserService, WoredaserviceService, CompanyserviceService,VacancyserviceService,BidService,ProfessionalService,MaterialpriceService,ContractdealerService,RentalmachineService,NewsService,MaterialvendorService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
