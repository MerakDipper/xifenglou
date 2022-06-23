import {Component} from '@angular/core';
import {JuejiGenerator} from "./Jueji/juejiGenerator";
import {juejiList} from "./Jueji/juejiDataList/juejiList";
import {visitorList} from "./Jueji/event/eventDataList/visitorList";
import {baguaList} from "./Jueji/event/eventDataList/baguaList";
import {topicList} from "./Jueji/event/eventDataList/topicList";
import {EventList} from "./Jueji/juejiDataList/eventList";
import {Jueji} from "./Jueji/jueji";
import {JuejiEvent} from "./Jueji/event/juejiEvent";
import {endList} from "./Jueji/event/eventDataList/endList";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xifeng';
  generator = new JuejiGenerator();
  juejiList = this.generator.initJueji();
  juejiStage2 = new Jueji();
  juejiStage3 = new Jueji();
  username = "";

  sexEvent = {
    key: '',
    value: 0
  };

  stage1Name =true;
  stage2Select = false;
  stage3Action = false;

  stage4End = false;
  stage4EndTime = false;
  stage4EndGG = false;

  eventList: JuejiEvent[]= [];

  ngInit() {
  }

  getName(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.stage2Select = true;
    }
  }

  toNext(){
    this.stage3Action=true
    if(this.juejiStage2.substitution){
      this.juejiStage3 = this.juejiList.filter(res => res.name === this.juejiStage2.friend)[0];
    } else{
      this.juejiStage3 = this.juejiStage2;
    }
  }

  act(jueji: any, action: string){
    if(jueji.count > 15){
      this.stage4End = true;
      this.stage4EndTime = true;
    }
    jueji.count++;
    let tempEvent = new JuejiEvent();
    switch (action){
      case 'DRINK':
        tempEvent.isDrink = true;
        if(Math.random() < 0.5){
          jueji.event.xingzhi *= 1.25;
          tempEvent.eventText = '酒过三巡，你觉得兴致越发高涨。\n';
        } else{
          tempEvent.eventText = '酒喝得有点晕，你不禁开始担心今晚会不会心有余而力不足。\n';
          jueji.event.xingzhi *= 0.75;
        }
        break;
      case 'CHAT':
        tempEvent.isChat = true;
        if(Math.random() < 0.75){
          jueji.event.xingzhi *= 1.2;
          let visitor = visitorList[Math.floor(Math.random()*visitorList.length)];
          let tempBagua = [...baguaList, ...this.juejiStage3.event.chat, jueji.name + ':" 官人可知，' + visitor + '也常来这里呢～"'];
          tempEvent.eventText = tempBagua[Math.floor(Math.random()* tempBagua.length)];
          tempEvent.eventText += '\n' + '你们聊的十分投机，渐入佳境。\n';
        } else{
          jueji.event.xingzhi *= 0.75;
          let topic = topicList[Math.floor(Math.random()*topicList.length)];
          tempEvent.eventText = '闲谈之际，你们不经意间聊到了' + topic + ', 观点不合吵了起来。你们都有些闷闷不乐。\n';
        }
        break;
      case 'SEX':
        tempEvent.isSex = true;
        console.log(typeof(jueji.event.xingzhi));
        if(jueji.event.xingzhi < 0.8) {
        tempEvent.eventText += '对方的兴致似乎不太高，再闲聊一会儿吧～\n';
	}else{
        tempEvent.eventText += this.juejiStage3.name + '合起了帷幕。\n';
        if(Math.random() < 0.5){
          let sexEvent = this.juejiStage3.event.sex[Math.floor(Math.random()*this.juejiStage3.event.sex.length)];
          tempEvent.eventText += '交欢之际，' + this.juejiStage3.name + sexEvent.key + '\n';
          tempEvent.eventText += sexEvent.value > 0 ? '你不禁大喜，兴致++\n': '你有些无语，兴致--\n';
            jueji.event.xingzhi *= (1 + this.sexEvent.value);
        } else{
          tempEvent.eventText += '鸳鸯帐里，烛影双龙戏...\n'
          if(Math.random() < 0.3){
            let tempReason = [...endList, ...this.juejiStage3.event.end];
            tempEvent.eventText += tempReason[Math.floor(Math.random()* tempReason.length)];
            this.stage4End = true;
            this.stage4EndGG = true;
          }
        }
        }
        break;
    }
    this.eventList.push(tempEvent);
  }

  reload(){
    location.reload();
  }
}
