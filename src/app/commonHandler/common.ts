import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function transformError(error: HttpErrorResponse | string){
  let errorMessage = 'An unknown error has occurred';
  if (typeof error === 'string'){
    errorMessage = error;
  }else if (error.error instanceof ErrorEvent){
    errorMessage = `Error! ${error.error.message}`;
  }else if (error.status){
    errorMessage = `Request faild with ${error.error.StatusCode} ${error.error.Message} `;
  }
  return throwError(errorMessage);
}
