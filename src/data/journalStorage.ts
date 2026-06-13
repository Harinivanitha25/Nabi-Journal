import {type Journal} from "../types/Journal";
const KEY="nabi-journals";

export function getJournals():Journal[]{
const data=localStorage.getItem(KEY);
return data?JSON.parse(data):[];

}


export function saveJournals(data:Journal[]){
localStorage.setItem( KEY, JSON.stringify(data))
}