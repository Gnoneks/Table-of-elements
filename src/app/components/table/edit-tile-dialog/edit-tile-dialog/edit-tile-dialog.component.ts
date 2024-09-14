import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../../../models/periodic-element.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-tile-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-tile-dialog.component.html',
  styleUrl: './edit-tile-dialog.component.scss',
})
export class EditTileDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<EditTileDialogComponent>);
  
  readonly elementData = inject<PeriodicElement>(MAT_DIALOG_DATA);
  readonly dialogForm = this._initDialogForm();

  constructor(private readonly _formBuilder: FormBuilder) {}

  private _initDialogForm() {
    return this._formBuilder.group({
      position: this.elementData.position,
      symbol: this.elementData.symbol,
      name: this.elementData.name,
      weight: this.elementData.weight,
    });
  }

  onConfirm() {
    this._dialogRef.close(this.dialogForm.value);
  }
}
