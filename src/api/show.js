/**
 * Created by Lorne on 2017/7/5.
 */
import ajax from 'api/index'


let _getNewAnnouncement="/asp/getNewAnnouncement.php?v=0.941433513213153";//转账


export function getNewAnnouncement(){
  return  ajax.get(_getNewAnnouncement,{v:Math.random()});
}
