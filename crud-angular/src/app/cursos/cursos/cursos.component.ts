import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';


import { Cursos } from '../model/cursos';
import { CursosService } from '../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})

export class CursosComponent implements OnInit {

  cursos$: Observable<Cursos[]>;
  displayedColumns = ['name', 'category'];
  //cursosService: CursosService

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog
    ) {
    //this.cursos = [];
    //this.cursosService = new CursosService();
    this.cursos$  =  this.cursosService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar Cursos.');
        return of([])
      })
    );

  }

  onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

}
