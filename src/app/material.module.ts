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
  MatDialogModule,
  MatSnackBarModule
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
    MatDialogModule,
    MatSnackBarModule
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
    CustomDialog,
    MatSnackBarModule
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