import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShiftDialogComponent } from '../dialog/shift-dialog/shift-dialog.component';

@Component({
  selector: 'sc-class-list',
  standalone: false,
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss',
})
export class ClassListComponent {
  constructor(public dialog: MatDialog) {}
  shiftList:any[] = []

  openShiftDialog() {
    const dialogRef = this.dialog.open(ShiftDialogComponent, {
      width: '470px',
      maxWidth: '95vw',
      maxHeight: '100vh',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.shiftList.push(res);
        console.log(res);
      }
    });
  }
}
