import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import ConnectedServiceComponent from './presentation/connected-service.component';
import { ConnectedServiceRouting } from './connected-service.routing';
import { ConnectedServiceFacade } from './connected-service.facade';

@NgModule({
  declarations: [ConnectedServiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ConnectedServiceRouting,
    ReactiveFormsModule,
    SharedModule,
    CardComponent,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [ConnectedServiceFacade]
})
export class ConnectedServiceModule {}
