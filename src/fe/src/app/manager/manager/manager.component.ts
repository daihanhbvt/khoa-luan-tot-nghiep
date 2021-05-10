import { Component, OnInit } from '@angular/core';
import { ManagerService } from './manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  

  constructor(
    private service: ManagerService
  ) { }

  user: any;
  ngOnInit(): void {
    this.service.me().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      
    })
  }
  
}
window.addEventListener("click", () => {
   console.log("Daihanh");
  //  let getIdElmActive = document.querySelector("#myDIV");
  //  let getElmItem= getIdElmActive?.children;
  //  console.log(getElmItem);
  //  for (let i = 0; i < getElmItem.length; i++)
  //  { 
  //    console.log("dhckl");
  //      getElmItem[i].addEventListener("click", function() {
  //    let current = document.getElementsByClassName("active");
  //     current[0].className = current[0].className.replace(" active", "");
  //     this.className += " active";
     
  //  }
   
})



