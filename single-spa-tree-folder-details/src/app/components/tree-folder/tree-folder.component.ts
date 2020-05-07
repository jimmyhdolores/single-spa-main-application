import { TreeFolderService } from './../../services/tree-folder.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';

/** File node data with nested structure. */
export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

/** Flat node with expandable and level information */
export interface TreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}


@Component({
  selector: 'angular-trees-tree-folder',
  templateUrl: './tree-folder.component.html',
  styleUrls: ['./tree-folder.component.css']
})
export class TreeFolderComponent implements OnInit, OnDestroy {

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<TreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, TreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, TreeNode>;

  private subscriptionData: Subscription;

  loading;
  files = [];


  constructor(private folderDetails: TreeFolderService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.getFolderDetails();
  }
  ngOnInit(): void {
    //this.showCpuDetails();
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      type: node.type,
      level: level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: TreeNode) {
    return node.level;
  }

  /** Return whether the node is expanded or not. */
  isExpandable(node: TreeNode) {
    return node.expandable;
  };

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: TreeNode) {
    return node.expandable;
  }

  getFolderDetails() {
    this.loading = true;
    this.subscriptionData = this.folderDetails
      .getFolderDetails()
      .subscribe(
        (response) => {
          if (response) {
            console.log('response=========== ', response.folderDetailsData.content)
            this.files.push(response.folderDetailsData.content);
            console.log('files=========== ', this.files);
            this.dataSource.data = this.files;
            this.loading = false;
          };
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }


  ngOnDestroy(): void {
    if (this.subscriptionData) {
      this.subscriptionData.unsubscribe();
    }
  }

}
