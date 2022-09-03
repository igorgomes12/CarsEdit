import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CarListElement } from 'src/app/models/CarListElement';
import { CarsEditonsDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';


const ELEMENT_DATA: CarListElement[] = [
  {position: 1, marca: 'Fiat', ano: 2022, modelo: 'Palio'},
  {position: 2, marca: 'Ford', ano: 2021, modelo: 'Fiesta'},
  {position: 3, marca: 'Chevrolet', ano: 2020, modelo: 'Onix'},
  {position: 4, marca: 'Renault', ano: 2020, modelo: 'Logan'},
  
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})


export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'marca', 'ano', 'modelo','actions'];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
  }

  openDialog(element: CarListElement | null): void {
    const dialogRef = this.dialog.open(CarsEditonsDialogComponent, {
      width: '250px',
      data: element === null ? {
        marca: "",
        Modelo: '',
        ano: null,
        position: '',
        
      } : {
        marca: element.marca,
        position: element.position,
        modelo: element.modelo,
        ano: element.ano,
        
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!==undefined) {
        if(this.dataSource.map(p=>p.position).includes(result.position)) {
          this.dataSource[result.position -1] = result;
          this.table.renderRows();

        }else{

          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
   
  }

  editElement(element: CarListElement): void {
    this.openDialog(element);
  }

  deleteElement(position: number): void {
    this.dataSource= this.dataSource.filter(p => p.position !== position)
  }
}
