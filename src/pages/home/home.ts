import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { RegisterPage } from '../register/register';
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inputID: string;
  inputPW: string;
  loginConfirm: string;

  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController) {

  }

  login(inputID, inputPW){
    let loginData={
      type: 'login',
      id: inputID,
      pw: inputPW,
    };

    if (inputID.trim() != '' || inputPW.trim() != '') {
      this.http.post("http://117.17.158.192:8200/MainServer/servers", loginData)
                //.map(data => data.json())
                .subscribe(res => {
                  // 서버로부터 결과 값을 받는 부분
                  this.loginConfirm = res['_body'];
                  if(this.loginConfirm == "success"){
                    let toast = this.toastCtrl.create({
                      message: '로그인이 성공',
                      duration: 3000,
                      position: 'middle'
                    });
                    toast.present();
                    this.loginConfirm = null;
                  }else{
                    let toast = this.toastCtrl.create({
                      message: '아이디 또는 비밀번호가 일치하지 않습니다.',
                      duration: 3000,
                      position: 'middle'
                    });
                    toast.present();
                  }
        });
    }
    this.inputID = '';
    this.inputPW = '';
  }

  RegisterPage(){
    this.navCtrl.push(RegisterPage);
  }
}
