import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../core/services/projects/project.service';
import { ProjectCardComponent } from '../../shared/components/projects/project-card/project-card.component';
import { IProjectCard } from '../../shared/interfaces/project/project-card-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [ProjectCardComponent ,CommonModule
  ],
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnInit {
  projects: IProjectCard[];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProjectService: ProjectService
  ) {}

  ngOnInit() {
    // this.onGetResults(); 
  }
  onGetResults(){
  //   this._ActivatedRoute.params.subscribe(params => {
  //     const searchTerm = params['term'];
  //     this._ProjectService.searchProjects(searchTerm).subscribe(
  //       (response) => {
  //         this.projects = response;
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.error('Error fetching projects:', error);
  //       }
  //     );
  //   });
  // }
}
}
