import { NgModule } from '@angular/core';
import { DialogsService } from './custom-dialog/custom-dialog.service';
import { CustomDialog } from './custom-dialog/custom-dialog.component';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatChipsModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule,
    CustomDialog
  ],
  declarations: [
    CustomDialog
  ],
  providers: [
    DialogsService
  ],
  entryComponents: [
    CustomDialog,
  ],
})
export class MaterialModule {}