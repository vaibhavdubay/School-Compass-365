import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShiftDialogComponent } from '../dialog/shift-dialog/shift-dialog.component';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { ShiftRes } from '@sc-models/classes';

@Component({
  selector: 'sc-class-list',
  standalone: false,
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss',
})
export class ClassListComponent {
  
  shiftList!: ShiftRes[]; 

  private readonly dialog = inject(MatDialog)
  private readonly adminService = inject(AdminService)

ngOnInit() {
  this.adminService.getShiftList$.subscribe((list) => {
    this.shiftList = list;
  });
}

  openShiftDialog(type?:'edit'|'',id?:string) {
    const dialogRef = this.dialog.open(ShiftDialogComponent, {
      width: '470px',
      maxWidth: '95vw',
      maxHeight: '100vh',
      disableClose: true,
      data:{type,id}
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.shiftList.push(res);
        console.log(res);
      }
    });
  }
  deleteShift(id:string){
    this.adminService.deleteShiftProfile(id)
  }
}
