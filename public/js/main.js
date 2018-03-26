enchant();

const FRAME_RATE = 20;

const STATE_STOP = 0;
const STATE_MOVE_RIGHT = 1;
const STATE_MOVE_LEFT = 2;
const STATE_JUMP = 3;

const DIRECTION_RIGHT = 1;
const DIRECTION_LEFT = 2;

const JUMP_FIRST_Y_ACCELERATION = -50;

const ADD_X_ACCELERATION = 2;
const ADD_Y_ACCELERATION = 0.5;
const MAX_X_SPEED = 20;
const MAX_Y_SPEED = 25;

window.onload = function() {
    core = new Core(640, 480);
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
                [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
                [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
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
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
            player.y_speed = 0;
            player.x_acceleration = 0;
            player.y_acceleration = 0;

            const checkState = function (player, state) {
                if (player.y_speed != 0) {
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
                // 落下
                player.y_acceleration += ADD_Y_ACCELERATION;
                player.y_speed += parseInt(player.y_acceleration);
                if (player.y_speed >= MAX_Y_SPEED) {
                    player.y_speed = MAX_Y_SPEED;
                }

                if (map.hitTest(player.x, player.y + player.y_speed)) {
                    if (player.y_speed > 0) {
                        for (let i = player.y_speed ; i > 0; i--) {
                            if (! map.hitTest(player.x, player.y + i)) {
                                player.y += i;
                                break;
                            }
                        }
                    } else {
                        for (let i = player.y_speed ; i < 0; i++) {
                            if (! map.hitTest(player.x, player.y + i)) {
                                player.y += i;
                                break;
                            }
                        }
                    }

                    player.y_acceleration = 0;
                    player.y_speed = 0;
                } else {
                    player.y += player.y_speed;
                }

                // 横移動
                if (map.hitTest(player.x + player.x_speed, player.y)) {
                    if (player.x_speed > 0) {
                        for (let i = player.x_speed ; i > 0; i--) {
                            if (! map.hitTest(player.x + i, player.y)) {
                                player.x += i;
                                break;
                            }
                        }
                    } else {
                        for (let i = player.x_speed ; i < 0; i++) {
                            if (! map.hitTest(player.x + i, player.y)) {
                                player.x += i;
                                break;
                            }
                        }
                    }

                    player.x_speed = 0;
                } else {
                    player.x += player.x_speed;
                }

                // 入力チェック
                if (player.y_acceleration == 0 && player.y_speed == 0 && core.input.up) {
                    player.y_speed = -20;
                }

                if (core.input.right && !core.input.left) {
                    player.x_speed += 4;
                    if (player.x_speed >= MAX_X_SPEED) {
                        player.x_speed = MAX_X_SPEED;
                    }
                } else if(core.input.left && !core.input.right){
                    player.x_speed -= 4;
                    if (player.x_speed <= MAX_X_SPEED) {
                        player.x_speed = -MAX_X_SPEED;
                    }
                } else {
                    if (player.x_speed > 0) {
                        player.x_speed -= 2;
                    } else if (player.x_speed < 0){
                        player.x_speed += 2;
                    }
                }

                // モーションの決定
                if (core.input.right && ! core.input.left) {
                    checkState(this, STATE_MOVE_RIGHT);
                    this.direction = DIRECTION_RIGHT;
                } else if (core.input.left && ! core.input.right){
                    checkState(this, STATE_MOVE_LEFT);
                    player.direction = DIRECTION_LEFT;
                } else {
                    checkState(this, STATE_STOP);
                }

                // モーションの描画
                if (this.state == STATE_JUMP) {
                    this.frame = 6;
                }
                else if (this.state == STATE_MOVE_RIGHT || this.state == STATE_MOVE_LEFT) {
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


