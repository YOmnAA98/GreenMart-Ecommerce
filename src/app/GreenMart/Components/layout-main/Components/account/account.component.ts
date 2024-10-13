import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppComponent } from "../../../../../app.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AppComponent, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  @Output() textChange = new EventEmitter<string>();

  headerText: string = 'My account'; 

  constructor() { }

  ngOnInit(): void {}

  onLinkClick(newText: string): void {
    this.textChange.emit(newText);  
    this.updateHeader(newText);     
  }

  updateHeader(newText: string): void {
    this.headerText = newText;
  }
}
