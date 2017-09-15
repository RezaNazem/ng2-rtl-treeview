import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { UUID } from "angular2-uuid"

@Component({
  selector: 'ng2-rtl-treeview',
  templateUrl: './ng2-rtl-treeview.component.html',
  styleUrls: ['./ng2-rtl-treeview.component.css']
})
export class Ng2RtlTreeviewComponent implements OnInit {


  constructor() { }
  
    ngOnInit() {
    }
  
    private _value: TreeNode[];
    private selectNode : TreeNode;
    private slecetElement : HTMLElement;
    
  
    @Input() get value(): TreeNode[] {
      return this._value;
    }
    set value(val: TreeNode[]) {
  
      this._value = val;
      if (this._value) {
        this.setIdOfNode(this._value);
  
        let ul = document.getElementById("myList");
        this.drowNode(ul, this._value);
      }
    }
  
    public GetSelectedNode() : TreeNode
    {
      return this.selectNode;
    }
  
    private setIdOfNode(items: TreeNode[])
    {
      items.forEach(node => {
        node.id = UUID.UUID();
        if (node.children)
          this.setIdOfNode(node.children);
      })
    }
  
    private drowNode(elemnt: HTMLElement, items: TreeNode[]) {
      items.forEach(child => {
  
        let li = document.createElement("LI");
  
        let nodeIdValue = child.id;
        let idValue = elemnt.getAttribute("nodeId");
        li.setAttribute("nodeId", nodeIdValue);
        li.setAttribute("pid", idValue)      
        if (idValue=="1")
          li.style.cssText = "margin-top: 6px;"
        else        
          li.style.cssText = "margin-top: 6px;display:none;"
        
  
        if (child.children && child.children.length > 0) {
          let a = document.createElement("a"); // for show + or -
          a.setAttribute("href", "javascript:;");
          a.style.cssText = "padding-left:6px";
          a.setAttribute("nodeId", nodeIdValue); 
          a.setAttribute("pid", idValue)
  
          a.onclick = args => this.nodeClick(args);
  
          let span = document.createElement("span");
          span.setAttribute("class", "glyphicon glyphicon-plus");
          span.setAttribute("aria-hidden", "true");
          a.appendChild(span);
          li.appendChild(a);
        }
  
        let a = document.createElement("a"); // for show captain
        a.setAttribute("href", "javascript:;");
        a.style.cssText = "width:100%;higth:100%;"
        a.onclick = args => this.nodeItemCkick(args);      
        li.appendChild(a);
        let textnode = document.createTextNode(child.label);
        
        a.appendChild(textnode);
  
  
        elemnt.appendChild(li);
        if (child.children && child.children.length > 0) {
          let ul = document.createElement("ul");
          ul.style.cssText = "list-style: none;padding-right: 25px;";
          ul.setAttribute("nodeId", li.getAttribute("nodeId")); // ul must has nodeid and pid similar li parent
          ul.setAttribute("pid", li.getAttribute("pid"));
          // ul.setAttribute("style","{list-style: none;}")
  
          li.appendChild(ul);
          this.drowNode(ul, child.children);
        }
      })
  
    }
  
    private nodeClick(args:any)
    {
      let element = args.target as HTMLElement; 
      if (element.nodeName != "A") { // some time return span . becuase span is an href
        element = element.parentNode as HTMLElement;
        if (element.nodeName == "A") {
  
          var span = element.getElementsByTagName("span")[0];
          let className = span.className;
          if (className == "glyphicon glyphicon-plus")
            span.className = "glyphicon glyphicon-minus";
          else
            span.className = "glyphicon glyphicon-plus";                                
  
          let allChild = document.querySelectorAll("li[pid='" + element.getAttribute("nodeId") + "']");
          [].forEach.call(allChild, function(child) {
            if (child.style.display === 'none') {
              child.style.display = 'block';
            } else {
              child.style.display = 'none';
            }
          });              
        }
      }
    }
  
    public deleteNode(node : TreeNode)
    {
      let allChild = document.querySelectorAll("li[nodeId='" + node.id + "']");
      
      if (allChild.length > 0)
      {
  
        allChild[0].remove();
      }
    }
  
    private nodeItemCkick(arg: any): any {
      
      if (this.slecetElement)
      {
        this.slecetElement.style.backgroundColor = "white";
      }
      this.selectNode = null;
      this.slecetElement = null;
        
  
      let element = arg.target as HTMLElement;
      if (!element)
        throw new Error("could not find a element");
      let liParentElemnt = element.parentElement;
      
      if (liParentElemnt.tagName == "LI")
      {
        let findItem = this.findTreeNode(this.value , liParentElemnt.getAttribute("nodeId") );
        if (!findItem)
          throw new Error("could not foud item with id="+liParentElemnt.getAttribute("nodeId"));
  
        this.selectNode = findItem;   
        this.slecetElement = element;   
        this.slecetElement.style.backgroundColor = "darkgrey";
      }
  
    }
  
    private findTreeNode(items : TreeNode[] , id : string ) : TreeNode
    {
      let terValue : TreeNode = null;
  
      for(let index=0;index<items.length;index++)
      {
        if (items[index].id == id)
        {
          terValue = items[index]; 
          break;       
        }
  
        
        if (items[index].children)
        {
          let result = this.findTreeNode(items[index].children,id);
          if (result)
          {
            terValue = result;
            break;
          }          
        }
      }
      return terValue;
    }
}


export class TreeNode{  
  
  
    id : string;
    label : string;
    children : TreeNode[];
    data : any;
  
    
  }