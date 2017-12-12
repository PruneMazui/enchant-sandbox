enchant();

const FRAME_RATE = 15;

const STATE_STOP = 0;
const STATE_MOVE_RIGHT = 1;
const STATE_MOVE_LEFT = 2;
const STATE_JUMP = 3;

const DIRECTION_RIGHT = 1;
const DIRECTION_LEFT = 2;

window.onload = function() {
    var core = new Core(960, 640);
    core.preload('image/chara1.png');
    core.fps = FRAME_RATE;

    core.onload = function() {
        var player = new Sprite(48, 64);
        player.image = core.assets['image/chara1.png'];
        player.x = 0;
        player.y = 0;
        player.direction = DIRECTION_RIGHT;
        player.frame = 0;

        const checkState = function (player, state) {
            if (player.state = state) {
                player.state_age++;
            } else {
                player.state_age = 0;
                player.state = state;
            }

            return player;
        };

        player.on('enterframe', function() {
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
                this.frame = (this.state_age) % 6 + 1;
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
    };

    core.start();
};


