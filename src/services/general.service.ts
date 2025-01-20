import { Injectable} from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
  })
  export class GeneralService  {

    //Variables globales
    public static get WS_URL() : String{
        return "http://localhost:8090/api/";
    }
  

  public static HEADERS( contenttype : any) : any
  {
    let json;

      json = {
        'Content-Type' : contenttype
      };
    
    
    return json;
    
  }

  openMessage(msg:any, type:any):any
  {
    let title = "Message";
    if(type == "success")
      title = "Buen trabajo!"
    else
      title = "Error"

    Swal.fire(
      title,
      msg,
      type
    );
  }

}