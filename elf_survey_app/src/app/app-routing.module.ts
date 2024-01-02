import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SMCAlgoComponent } from './smc_algo/smc_algo.component';
import { KUMCAlgoComponent } from './kumc_algo/kumc_algo.component';



const routes: Routes = [


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  ProgressValue = '';
  public href : string = '';

  constructor(private router: Router){}

  ngOnInit(){
    // this.href = this.router.url;
    // console.log('url 확인',this.router.routerState.snapshot.url)
  }
  Control_Process_Bar(progress_value:any){
    this.ProgressValue = progress_value;
  }

}
