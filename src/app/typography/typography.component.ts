import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeNode } from 'models/TreeNode';
import { resourceUsage } from 'process';
import { Subscription } from 'rxjs';
import { DocumentService } from 'services/document.service';
import { FileManagementService } from 'services/filemanagement.service';
import { NotificationService } from 'services/notification.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit, OnDestroy {

  data :any[] = [];
  filterTerm: string = '';
  private fileSelectedSubscription: Subscription;

  constructor(private notificationService: NotificationService,private documentService: DocumentService, private fileManagementService: FileManagementService) { }

  ngOnInit() {
    this.documentService.getTreeNode().subscribe(result=> this.data[0] = result)
    this.startListening();
  }

  ngOnDestroy() {
    if (this.fileSelectedSubscription) {
      this.fileSelectedSubscription.unsubscribe();
    }
  }

  // Call this method to start listening for file selection events
  startListening() {
    this.fileSelectedSubscription = this.fileManagementService.fileSelected$.subscribe(({ id, file }) => {
      this.updateNodeFile(id, file);
    });
  }

  // Call this method to stop listening for file selection events
  stopListening() {
    if (this.fileSelectedSubscription) {
      this.fileSelectedSubscription.unsubscribe();
    }
  }

  uploadDocuments() {
    this.documentService.uploadDocuments(this.data[0]).subscribe(result => {
      this.data[0] = result
      this.notificationService.showNotification('files are successfully saved', 'success');

    }
    ,error =>{
      this.notificationService.showNotification('you don\'t have the latest version of this document, you mast download the latest version ', 'error');
    });
  }

  updateNodeFile(id: string, file: File) {
    const node = this.findNodeById(this.data, id);
    if (node) {
      node.file = file;
      node.name = file.name; // Optional: Update name if required
      console.log('Updated node:', node);
    }
  }

  findNodeById(nodes: TreeNode[], id: string): TreeNode | undefined {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeById(node.children, id);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  filterTree() {
     console.log("dataaass> ",this.data)
    const hasNewFiles = this.checkForNewFiles(this.data[0]);
    if (!hasNewFiles && this.filterTerm) {
      return this.documentService.getTreeNode(this.filterTerm).subscribe(result=> this.data[0] = result);   
    }
    return this.documentService.getTreeNode().subscribe(result=> this.data[0] = result);
    
  }

  checkForNewFiles(node: TreeNode): boolean {
    if(node ==null)
      return false;
    
    if (node.isAllowedToDelete) {
      return true;
    }
  
    if (node.children) {
      for (const child of node.children) {
        if (this.checkForNewFiles(child)) {
          return true;
        }
      }
    }
  
    return false;
  }
}
