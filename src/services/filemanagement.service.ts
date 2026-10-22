import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TreeNode } from 'models/TreeNode';

@Injectable({
  providedIn: 'root'
})
export class FileManagementService {
  private fileSelectedSource = new Subject<{ id: string, file: File }>();
  fileSelected$ = this.fileSelectedSource.asObservable();

  emitFileSelected(id: string, file: File) {
    this.fileSelectedSource.next({ id, file });
  }
}
