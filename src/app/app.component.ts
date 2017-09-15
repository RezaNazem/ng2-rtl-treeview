import { Component , OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from "@angular/http";
import { Ng2RtlTreeviewComponent , TreeNode } from "./ng2-rtl-treeview/ng2-rtl-treeview.component"
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  
})
export class AppComponent implements OnInit {

  

  constructor(private  http : Http) {    
  }

  files : TreeNode[];


  ngOnInit(): void {
    this.http.get('../../../assets/data.json').toPromise()
    .then(a => this.files = <TreeNode[]>a.json().data)
    .catch(err => console.log(err));
  }

}
