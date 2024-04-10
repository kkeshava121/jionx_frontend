import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CommonService } from '@services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-admin';
  themeMode: string = '';
  constructor(@Inject(DOCUMENT) private document: Document,private commonService: CommonService) {
    this.themeMode = localStorage.getItem('themeMode') || '';
    console.log(this.themeMode)
    if(this.themeMode){
      this.loadStyle(this.themeMode)
    }else{
      this.loadStyle('style');
    }

  }
  ngOnInit() {
    this.commonService.getThemeMode().subscribe(res=>{
      localStorage.setItem('themeMode',res.type)
      this.loadStyle(res?.type);
    })
    
  }
  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `assets/css/${styleName}.css`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = `assets/css/${styleName}.css`;

      head.appendChild(style);
    }
  }
}
