// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import userinfor = require("./User");

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    Username : cc.Node = null;

    private onGround : Boolean = true;
    private movedir : number = 0; // right for 1 and left for -1 , idle is 0
    private scaledir : number = 1;
    private playerSpeed : number = 200;
    private aDown : Boolean = false;
    private dDown : Boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {
        cc.director.getCollisionManager().enabled = true;
        this.Username.getComponent(cc.Label).string = userinfor.username;
        cc.log(userinfor.username);
    }

    update(dt){
        this.node.x += this.playerSpeed * this.movedir * dt;
        this.node.scaleX = this.scaledir;
    }

    onKeyDown(event){
        switch (event.keyCode){
            case cc.macro.KEY.a:
                this.playerMove(-1);
                break;
            case cc.macro.KEY.d:
                this.playerMove(1);
                break;
            case cc.macro.KEY.space:
                this.playerjump();
                break;
        }
    }

    onKeyUp(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.a:
                this.aDown = false;
                if(this.aDown)
                    this.playerMove(-1);
                else
                    this.playerMove(0);
                break;
            case cc.macro.KEY.d:
                this.dDown = false;
                if(this.dDown)
                    this.playerMove(1);
                else
                    this.playerMove(0);
                break;
        }
    }


    playerMove(moveDir: number) {
        this.movedir = moveDir;
        if(moveDir != 0) this.scaledir = moveDir;
    }

    playerjump() {
        // cc.log('onGround : ' + this.onGround);
        if (this.onGround) {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 600);
            this.onGround = false;
        }
    }

    onBeginContact(contact , self , other){
        // cc.log(contact.getWorldManifold().normal.y);
        // getWorldManifold is to ensure contact's direction
        if(other.node.name == "Background" && contact.getWorldManifold().normal.y <= -0.99){
            // cc.log('onGround : ' + this.onGround);
            this.onGround = true;
        }
    }

    logout(event , customEventData){
        firebase.auth().signOut().then(function() {
            cc.log("User log out success!");
            cc.director.loadScene('Menu');
            cc.log("Go back to Menu!")
        }).catch(function(error) {
            cc.log("User log out failed!");
        })

    }
}
