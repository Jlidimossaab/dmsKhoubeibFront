import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TreeNode } from 'models/TreeNode';
import { DocumentService } from 'services/document.service';
import { FileManagementService } from 'services/filemanagement.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from 'app/password-dialog/password-dialog.component';
import { NotificationService } from 'services/notification.service';

@Component({
  selector: 'app-tree-docs',
  templateUrl: './tree-docs.component.html',
  styleUrls: ['./tree-docs.component.scss']
})
export class TreeDocsComponent implements OnInit {

  @Input() data: TreeNode[] = [];
  isEditing: any;

  constructor(private notificationService: NotificationService, private dialog: MatDialog, private documentService: DocumentService, private fileManagementService: FileManagementService) { }

  ngOnInit(): void { }

  togglePopup(node: TreeNode) {
    node.isPopupVisible = !node.isPopupVisible;
  }

  triggerFileUpload(node: TreeNode) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (event: any) => this.onFileSelected(event, node);
    fileInput.click();
  }

  onFileSelected(event: any, node: TreeNode) {
    const file: File = event.target.files[0]; // Capture the file before opening the dialog

    if (file) {

      if (node.name && node.name !== file.name && !node.isAllowedToDelete) {
        // Show notification if the file name doesn't match
        this.notificationService.showNotification('The file name does not match the original. Please correct the file.', 'error');
        return; // Stop further processing
      }

      const dialogRef = this.dialog.open(PasswordDialogComponent, {
        width: '250px',
        data: { message: "do you want to add a password for this document? " }
      });

      // Handle after the dialog is closed
      dialogRef.afterClosed().subscribe((password) => {
        if (password !== undefined) { // Ensure that a password is provided
          node.file = file; // Assign the file
          node.name = file.name; // Assign the file name
          node.password = password; // Assign the password

          if (!node.id) {
            node.id = uuidv4();
            node.isAllowedToDelete = true;
          }

          // Emit the file for further processing
          this.fileManagementService.emitFileSelected(node.id, file);

        }
      });
    } else {
      console.error('No file selected');
    }
  }


  addFolder(node: TreeNode) {
    const newFolder: TreeNode = {
      id: uuidv4(),
      name: 'New Folder',
      isFolder: true,
      children: [],
      isAllowedToDelete: true
    };

    if (!node.children) {
      node.children = [];
    }

    node.children.push(newFolder);
    node.isPopupVisible = false;
  }

  addFile(node: TreeNode) {
    const newFile: TreeNode = {
      id: uuidv4(),
      name: 'New File',
      isFolder: false,
      isAllowedToDelete: true
    };

    if (!node.children) {
      node.children = [];
    }

    node.children.push(newFile);
    node.isPopupVisible = false;
  }

  deleteNode(node: TreeNode, parent: TreeNode | null = null) {
    if (parent) {
      const index = parent.children?.indexOf(node);
      if (index !== undefined && index > -1) {
        parent.children?.splice(index, 1);
      }
    } else {
      const index = this.data.indexOf(node);
      if (index > -1) {
        this.data.splice(index, 1);
      }
    }
  }

  downloadDocument(node: any) {
    const filePath = node.path;
    const fileName = this.getFileNameFromPath(filePath);

    // First attempt to download with the default password
    this.documentService.downloadDocument(filePath, null).subscribe(
      response => {
        const mimeType = this.getMimeType(fileName);
        const file = new Blob([response], { type: mimeType });
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = fileName; // Use the original file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error => {
        // If it's a password error, prompt for password
        const dialogRef = this.dialog.open(PasswordDialogComponent, {
          width: '250px',
          data: { message: "This document requires a password!" }
        });

        dialogRef.afterClosed().subscribe(password => {
          // Attempt to download again with the user-provided password
          this.documentService.downloadDocument(filePath, password).subscribe(
            response => {
              const mimeType = this.getMimeType(fileName);
              const file = new Blob([response], { type: mimeType });
              const fileURL = URL.createObjectURL(file);
              const a = document.createElement('a');
              a.href = fileURL;
              a.download = fileName; // Use the original file name
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            },
            error => {
              this.notificationService.showNotification("Password is incorrect", 'error');
            }
          );
        });
      }
    );
  }


  // Helper method to extract file name from the file path
  private getFileNameFromPath(filePath: string): string {
    return filePath.split('/').pop() || filePath.split('\\').pop(); // Handle both '/' and '\'
  }

  // Helper method to get MIME type based on file extension
  private getMimeType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'pdf':
        return 'application/pdf';
      case 'doc':
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'xls':
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      default:
        return 'application/octet-stream'; // Fallback for unknown types
    }
  }


  saveFolderName(node: TreeNode) {
    if (node.isAllowedToDelete)
      node.isEditing = false;
  }
}
