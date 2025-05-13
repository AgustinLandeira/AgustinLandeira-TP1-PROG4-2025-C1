import { Component, inject, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre-mi',
  imports: [RouterLink],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css'
})
export class SobreMiComponent implements OnInit{

  miGithub = inject(GithubService)

  ngOnInit(): void {
      
    this.miGithub.traer()
  }
}
