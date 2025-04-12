import { Component, inject, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-sobre-mi',
  imports: [],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css'
})
export class SobreMiComponent implements OnInit{

  miGithub = inject(GithubService)
  

  ngOnInit(): void {
      console.log("hola")
  }
}
