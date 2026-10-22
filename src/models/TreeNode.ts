export interface TreeNode {
    id?:string,
    name: string;
    isFolder: boolean;
    children?: TreeNode[];
    isPopupVisible?: boolean;
    isAllowedToDelete?: boolean;
    file?: any;
    fileSize?: number;
    isEditing?:boolean;
    path?:string;
    password?:string;
  }
  