enchant();

const FRAME_RATE = 30;

const STATE_STOP = 0;
const STATE_MOVE_RIGHT = 1;
const STATE_MOVE_LEFT = 2;
const STATE_JUMP = 3;

const DIRECTION_RIGHT = 1;
const DIRECTION_LEFT = 2;

const JUMP_FIRST_Y_ACCELERATION = -50;

const ADD_X_ACCELERATION = 2;
const ADD_Y_ACCELERATION = 1;
const MAX_X_SPEED = 20;
const MAX_Y_SPEED = 20;

window.onload = function() {
    var core = new Core(640, 480);
    core.preload('image/chara1.png', 'image/tail.png');
    core.fps = FRAME_RATE;
    core.rootScene.backgroundColor = '#a0d8ef'

    core.onload = function() {
        // map
        {
            var map = new Map(32, 32);
            map.image = core.assets['image/tail.png'];

            //loadDataメソッドでマップデータを読み込み
            map.loadData([
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
                [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
            ]);
            
            //CollisionDataプロパティにマップの当たり判定を設定
            map.collisionData = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]

            core.rootScene.addChild(map);
        }

        // player
        {
            var player = new Sprite(48, 64);
            player.image = core.assets['image/chara1.png'];
            player.x = 0;
            player.y = 0;
            player.direction = DIRECTION_RIGHT;
            player.frame = 0;
            player.x_speed = 0;
            player.y_speed = MAX_Y_SPEED;
            player.x_acceleration = 0;
            player.y_acceleration = 0;

            const checkState = function (player, state) {
                if (player.y_speed > 0) {
                    player.state = STATE_JUMP;
                    return;
                }

                if (player.state = state) {
                    player.state_age++;
                } else {
                    player.state_age = 0;
                    player.state = state;
                }
            };

            player.on('enterframe', function() {
                player.x++;
                // // 落下
                // player.y_acceleration += ADD_Y_ACCELERATION;
                // player.y_speed += player.y_acceleration;
                // if (player.y_speed >= MAX_Y_SPEED) {
                //     player.y_speed = MAX_Y_SPEED;
                // }

                // if (map.hitTest(player.x, player.y + player.y_speed)) {

                //     console.log(map.checkTile(player.x, player.y + player.y_speed));

                //     player.y_acceleration = 0;
                //     player.y_speed = 0;
                // } else {
                //     player.y += player.y_speed;
                // }

                // モーションの決定
                if (core.input.right && ! core.input.left) {
                    checkState(this, STATE_MOVE_RIGHT);
                    this.direction = DIRECTION_RIGHT;
                }  else if (core.input.left && ! core.input.right){
                    checkState(this, STATE_MOVE_LEFT);
                    player.direction = DIRECTION_LEFT;
                } else {
                    checkState(this, STATE_STOP);
                }

                // モーションの描画
                if (this.state == STATE_MOVE_RIGHT || this.state == STATE_MOVE_LEFT) {
                    this.frame = (parseInt(this.state_age / 2)) % 6 + 1;
                } else {
                    this.frame = 0;
                }

                if (this.direction == DIRECTION_LEFT && this.scaleX > 0) {
                    this.scaleX *= -1;
                } else if (this.direction == DIRECTION_RIGHT && this.scaleX < 0) {
                    this.scaleX *= -1;
                }
            });
            core.rootScene.addChild(player);
        }
    };

    core.start();
};


