import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }
}
