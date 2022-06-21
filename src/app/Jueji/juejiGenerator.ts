import {juejiList} from "./juejiDataList/juejiList";
import {Jueji} from "./jueji";
import {friendList} from "./juejiDataList/friendList";
import {EventList} from "./juejiDataList/eventList";
import {chatList} from "./event/eventDataList/personalizedDataList/chatList";
import {sexList} from "./event/eventDataList/personalizedDataList/sexList";
import {juejiEndList} from "./event/eventDataList/personalizedDataList/juejiEndList";

export class JuejiGenerator{

  initJueji(){
    let juejiObjectList = [];
    for(let name of juejiList){
      let jueji = new Jueji();
      jueji.name = name;
      jueji.availability = Math.random() < 0.5;
      jueji.substitution = jueji.friends.length != 0 && Math.random() < 0.3;
      jueji.friends = (friendList as any)[name];
      jueji.friend = jueji.friends.length == 0 ? '' : jueji.friends[Math.floor(Math.random() * jueji.friends.length)];
      jueji.event = new EventList();
      jueji.event.chat = (chatList as any)[name];
      jueji.event.sex = (sexList as any)[name];
      jueji.event.end = (juejiEndList as any)[name];
      juejiObjectList.push(jueji);
    }
    return juejiObjectList;

  }
}
