import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {RentalmachinesComponent} from './components/rentalmachines/rentalmachines.component';
import {LicenseinfoComponent} from './components/licenseinfo/licenseinfo.component';
import {MaterialVendorComponent} from './components/machinevendors/material-vendor.component';
import {VaccancyComponent} from './components/vaccancy/vaccancy.component';
import {ProfessionalsComponent} from './components/professionals/professionals.component';
import {MainComponent} from './main/main.component';
import {MaterialpricesComponent} from './components/materialprices/materialprices.component';
import {BidsComponent} from './components/bids/bids.component';
import {NewsComponent} from './components/news/news.component';
import {ContractDealersComponent} from './components/contract-dealers/contract-dealers.component';
import {ContractdealersComponent} from './components/contractdealers/contractdealers.component';
import {WoredaComponent} from './woreda/woreda.component';
import {CompanyComponent} from './components/company/company.component';
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [


  {
    path: '',
    component: MainComponent,
    children: [
      {
        path:'',
        component:CompanyComponent
      },

      {
        path: 'rentalmachines',
        component:RentalmachinesComponent,
      },
      {
        path: 'tags',
        component: LicenseinfoComponent,
        pathMatch: 'full'
      },
      {
        path: 'machinevendors',
        component: MaterialVendorComponent,
        pathMatch: 'full'
      },
      {
        path: 'materialprices',
        component: MaterialpricesComponent,
        pathMatch: 'full'
      },
      {
        path: 'vacancy',
        component: VaccancyComponent,
        pathMatch: 'full'
      },
      {
        path: 'professionals',
        component: ProfessionalsComponent,
        pathMatch: 'full'
      },
      {
        path: 'bids',
        component: BidsComponent,
        pathMatch: 'full'
      },
      {
        path: 'news',
        component: NewsComponent,
        pathMatch: 'full'
      },
      {
        path: 'contract',
        component: ContractdealersComponent,
        pathMatch: 'full'
      },
      {
        path: 'woreda',
        component: WoredaComponent,
        pathMatch: 'full'
      },
      {
        path: 'company',
        component: CompanyComponent,
        pathMatch: 'full'
      },
      {
            path: 'login',
            component: LoginComponent,
            pathMatch: 'full'
      },
      // {
      //   path: 'auth',
      //   component: AuthenticationComponent,
      //   children: [
      //     {
      //       path:'signup',
      //       component:SignupComponent,
      //     },
      //     {
      //       path: 'login',
      //       component: LoginComponent,
      //       pathMatch: 'full'
      //     },
      //
      //   ]
      // },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
