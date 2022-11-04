// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    Email: cc.Node

    @property
    Password: cc.Node

    public txtEmail : string = "";
    public txtPassword : string = "";


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    login(event , customEventData){
        this.txtEmail = this.Email.getComponent(cc.EditBox).string;
        this.txtPassword = this.Password.getComponent(cc.EditBox).string;
        firebase.auth().signInWithEmailAndPassword(this.txtEmail , this.txtPassword).then(function(user){
            if(user){
                let _user = firebase.auth().currentUser;
                cc.log("Login Success!")
                var user_ref = firebase.database.ref('username').child(_user.uid);
            }
        }).catch(function(error){
            cc.log("Login Error!")
        });
    }
    
    signup(event , customEventData){
        this.txtEmail = this.Email.getComponent(cc.EditBox).string;
        this.txtPassword = this.Password.getComponent(cc.EditBox).string;
        // You have to assign your email and password value to another variable
        var _email = this.txtEmail;
        var _password = this.Password;
        firebase.auth().createUserWithEmailAndPassword(_email , _password).then(function(result){
            var data = {
                Email : _email
            }
        })

    }

    // update (dt) {}
}
