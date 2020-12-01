import { Component, OnInit } from '@angular/core';
import {Vacancy} from '../../models/vacancy';
import {NewsService} from '../../service/news.service';
import {News} from '../../models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news:News[]=[];
  constructor(private newsService:NewsService) { }

  ngOnInit() {
    let self=this;
    this.newsService.getNews().once('value').then(function(news){

      news.forEach(news=>{

        const currentNews = news.toJSON() as News;
        console.log(currentNews);
        self.news.push(currentNews);
      })



    });
  }

}
