import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuard } from 'app/authguard';
import { AuthService } from './authguard.service';
import { TreeNode } from 'models/TreeNode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http : HttpClient,private auth: AuthService) {

  }
  downloadDocument(filePath:string,password:string,){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}` 
    });
    const params = new HttpParams()
      .set('path', filePath)
      .set('password', "\"" + password + "\"");
    

    return this.http.get("http://localhost:8080/document/download", {
      headers,
      params,
      responseType: 'blob' 
    });
  }

  extractFilesFromTreeNode(treeNode : TreeNode){
    let files
    for(let i = 0;i< treeNode.children.length;i++){
      files.push(treeNode.children[i].file)
      treeNode.children[i].file = i;
    }
    return files
  }

  putAllTreeNodeFilesToTheFormData(formData: FormData, treeNode: TreeNode) {
    // Check if the current node has a file and append it to the FormData
    if (treeNode.file) {
      formData.append('files', treeNode.file);
      treeNode.fileSize = treeNode.file.size
      treeNode.file = undefined;
    }
    // Recursively call the function for each child node
    if (treeNode.children) {
      for (const child of treeNode.children) {
        this.putAllTreeNodeFilesToTheFormData(formData, child);
      }
    }
  }
  
  getTreeNode(filter?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
    });

    // Add filter as a query parameter if it's provided
    let params = new HttpParams();
    if (filter) {
      params = params.set('filter', filter);
    }

    return this.http.get("http://localhost:8080/document/getTreeNode", { headers, params });
  }
  
  uploadDocuments(treeNode: TreeNode) {
    console.log("treeNode  " , treeNode)
    const formData = new FormData();
    this.putAllTreeNodeFilesToTheFormData(formData, treeNode);
    console.log("treeNodeafter  " , treeNode)
    // Append the serialized treeNode to the FormData
    formData.append('treeNode', JSON.stringify(treeNode));
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
    });
    console.log("formadataa" , formData)
    return this.http.post("http://localhost:8080/document/upload", formData, { headers });
  }
  
}
