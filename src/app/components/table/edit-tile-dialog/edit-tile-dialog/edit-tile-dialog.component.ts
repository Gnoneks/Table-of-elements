import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../../../models/periodic-element.model';

@Component({
  selector: 'app-edit-tile-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    // FormsModule,
    // MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './edit-tile-dialog.component.html',
  styleUrl: './edit-tile-dialog.component.scss',
})
export class EditTileDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditTileDialogComponent>);
  readonly data = inject<PeriodicElement>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);

  // onNoClick() {
  //   this.dialogRef.close();
  // }
}
