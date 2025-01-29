import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksRouting } from './banks.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { BanksFacade } from './banks.facade';
import { BanksServices } from './banks.services';
import { SharedModule } from '../../../shared/shared.module';
import BanksComponent from './presentation/banks.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [BanksComponent],
  imports: [
    CommonModule,
    BanksRouting,
    ReactiveFormsModule,
    SharedModule,
    CardComponent,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [BanksFacade, BanksServices]
})
export class BanksModule {}
