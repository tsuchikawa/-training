//おまじない
enchant();

//変数宣言
var game;
var pad;
var player;
var enemy;
var rock;
var field;
var bullet;

var spriteList = [];

var isPushA = false;
var score = 0;

/**配列の要素を削除するメソッド*/
Array.prototype.remove = function( elm ) {
    var index = this.indexOf( elm );
    this.splice( index, 1 );
    return this;
}

//Webページが読み込まれたら
addEventListener( 'load', function() {
    game = new Game(320,320);  //ゲームオブジェクトの作成
    game.preload( 'img/character/player.png', 'img/character/enemy.png', 'img/bg/sky.png', 'img/bg/rock.png', 'img/bg/field.png', 'img/bullet.png' );  //画像をプリロード

    //ゲームオブジェクトが読み込まれたら
    game.addEventListener( 'load', function() {
        game.pushScene( game.startScene() );  //シーンをゲームに追加する
    } );

    //Zキー入力をaボタンとする
    game.keybind( 'Z'.charCodeAt(0), 'a' );

    //スタート（タイトル）シーン
    game.startScene = function() {
        var scene = new Scene();  //シーンを作成
        scene.backgroundColor = 'black';  //シーンを黒く塗りつぶす

        var titleLabel = new Label( 'Snipe at Monsters' );  //タイトルのラベルを作成
        titleLabel.color = 'white';  //フォントの色を白にする
        titleLabel.font = "32px 'Russo One', sans-serif";  //フォントの設定
        titleLabel.moveTo( 10, 100 );  //ラベルの位置
        scene.addChild( titleLabel );  //ラベルをsceneに追加

        var descriptionLabel = new Label( 'Tap or press Z' );	  //説明のラベルを作成
        descriptionLabel.color = 'white';  //フォントの色を白にする
        descriptionLabel.font = "16px 'Russo One', sans-serif";  //フォントの設定
        descriptionLabel.moveTo( 105, 200 );	  //ラベルの位置
        scene.addChild( descriptionLabel );  //ラベルをsceneに追加

        // メニュー
        var menu = new Label();
        menu.text = "メニューへ戻る";
        menu.font = "16px 'Russo One', sans-serif";
        menu.color = 'white';
        menu.x = 105;
        menu.y = 270;
        scene.addChild(menu);
        menu.addEventListener('touchstart', function() {
            window.location.href = "../index.html"
        });

        /**aボタンかタップでメインゲームへ進む**/
        scene.addEventListener( 'abuttondown', goToTheGame );
        scene.addEventListener( 'touchstart', goToTheGame );
        function goToTheGame() {
            game.replaceScene( game.mainScene() );  //シーンの切り替え
            game.removeEventListener( 'abuttondown', goToTheGame );
        }

        return scene;
    }

    //メインシーン
    game.mainScene = function() {
        var scene = new Scene();  //シーンを作成
        scene.backgroundColor = 'black';  //シーンを黒く塗りつぶす

        /**背景の作成**/
        bg( scene );

        /**プレイヤーの作成**/
        player = new Player();
        spriteList.push( player );  //spriteListにプレイヤーをプッシュ

        /**HPラベルを作成**/
        var hpLabel = new Label();
        hpLabel.font = "32px 'Russo One', sans-serif";  //フォントの設定

        /**スコアラベルを作成**/
        var scoreLabel = new Label();
        scoreLabel.font = "32px 'Russo One', sans-serif";  //フォントの設定

        var hitABullet = function() {

            //弾を作成
            bullet = new Bullet();
            spriteList.push( bullet );

            isPushA = true;

        }

        /**シーン更新ごとに呼び出す**/
        scene.onenterframe = function() {

            //15フレーム毎に敵を生成する
            if (game.frame % 15 === 0) {

                /**敵キャラの作成**/
                enemy = new Enemy();
                spriteList.push( enemy );  //spriteListに敵をプッシュ

            }

            /**aボタンが押された瞬間のみ弾を撃つ**/
            if ( isPushA === false ) scene.addEventListener( 'abuttondown', hitABullet )
            else scene.removeEventListener('abuttondown', hitABullet );
            scene.addEventListener('abuttonup', function() {
                isPushA = false;
            } );
            //画面をタップされた時
            this.addEventListener( 'touchstart', hitABullet );

            //スプライトの足の位置でソート
            spriteList.sort( function( _spriteA, _spriteB ) {
                if ( _spriteA.y + _spriteA.height > _spriteB.y + _spriteB.height ) return 1;
                if ( _spriteA.y + _spriteA.height < _spriteB.y + _spriteB.height ) return -1;
                return 0;
            } );

            /**プレイヤーや敵などのスプライトを表示する**/
            for(var i=0; i<spriteList.length; ++i) {
                scene.addChild( spriteList[i] );
            }

            /*プレイヤーのHPを表示**/
            hpLabel.text = 'HP : ' + player.hp;
            scene.addChild( hpLabel );

            /**スコアを表示**/
            scoreLabel.text = 'SCORE : ' + score;
            scoreLabel.y = 30;
            scene.addChild( scoreLabel );

            /**プレイヤーのHPが0未満ならばシーンを切り替える**/
            if ( player.hp <= 0 ) game.pushScene( game.gameOverScene() );
        }

        /**アナログパッドの表示**/
        pad = new APad();
        pad.x = 20;
        pad.y = 220;
        scene.addChild( pad );

        return scene;
    }

    /**ゲームオーバーシーン**/
    game.gameOverScene = function() {
        var scene = new Scene();
        scene.backgroundColor = 'black';				//シーンを黒く塗りつぶす
        var gameOverLabel = new Label( 'GAME OVER' );			//GAME OVERのラベルを作成
        gameOverLabel.color = 'white';							//フォントの色を白にする
        gameOverLabel.font = "32px 'Russo One', sans-serif";	//フォントの設定
        gameOverLabel.moveTo( 65, 150 );						//ラベルの位置
        scene.addChild( gameOverLabel );				//ラベルをgameOverSceneに追加

        /**スコアを表示**/
        var gameOverScoreLabel = new Label();
        gameOverScoreLabel.text = 'SCORE : ' + score;
        gameOverScoreLabel.moveTo( 180, 220 );
        gameOverScoreLabel.font = "16px 'Russo One', sans-serif";	//フォントの設定
        gameOverScoreLabel.color = 'white';
        scene.addChild( gameOverScoreLabel );

        // メニュー
        var menu = new Label();
        menu.text = "メニューへ戻る";
        menu.font = "16px 'Russo One', sans-serif";
        menu.color = 'white';
        menu.x = 105;
        menu.y = 270;
        scene.addChild(menu);
        menu.addEventListener('touchstart', function() {
            window.location.href = "../index.html"
        });

        // リトライ
        var retry = new Label();
        retry.text = "リトライ";
        retry.font = "16px 'Russo One', sans-serif";
        retry.color = 'white';
        retry.x = 130;
        retry.y = 250;
        scene.addChild(retry);
        retry.addEventListener('touchstart', function() {
            init();		//初期化
            game.replaceScene( game.mainScene() );		//シーンの切り替え
            game.removeEventListener( 'abuttondown', returnGame );
        });

        return scene;
    }

    game.start();  //ゲームスタート
} );

var Player = Class.create( Sprite, {
    initialize: function() {
        this.hp = 2;  //プレイヤーのHP
        this.unrivaledTime = 0;  //プレイヤーの無敵時間
        Sprite.call( this, 51, 55 );  //Spriteクラスのメソッドを、thisでも使えるようにする
        this.moveTo( 60, 180 );  //プレイヤーの初期位置
        this.image = game.assets[ 'img/character/player.png' ];  //スプライトの画像ファイルを指定
    },
    onenterframe: function() {
        this.frame = 1;  //プレイヤーの画像を左から2番目に変更
        var speed = 5;  //プレイヤーの動く速度

        /**キー入力があった時のプレイヤーの移動**/
        if (game.input.left) {
            this.scaleX = -1;  //キャラ画像をX方向に反転
            this.frame = this.age%2+2;  //アニメーション
            this.x -= speed;
        }
        if (game.input.right) {
            this.scaleX = 1;  //キャラ画像をX方向に反転
            this.frame = this.age%2+2;  //アニメーション

            //プレイヤーのX座標が、半分の位置より大きい時
            if ( this.x > 160 - this.width/2 ) {
                field1.x -= speed;	//地面をスクロール
                field2.x -= speed;	//地面をスクロール
                if ( field1.x <= -320 ) field1.x = field2.x + 320;
                if ( field2.x <= -320 ) field2.x = field1.x + 320;
                rock1.x -= speed/2;	//岩をスクロール
                rock2.x -= speed/2;	//岩をスクロール
                if ( rock1.x <= -320 ) rock1.x = rock2.x + 320;
                if ( rock2.x <= -320 ) rock2.x = rock1.x + 320;

                /**敵キャラのスクロール**/
                for ( var i=0; i<spriteList.length; i++ ) {
                    var sprite = spriteList[i];
                    if ( sprite === this ) continue;
                    sprite.x -= speed;
                }

                score += 5;  //進めば進むほどスコアが加算される
            }
            else this.x += speed;

        }
        if (game.input.up) {
            this.frame = this.age%2+2;  //アニメーション
            this.y -= speed;
        }
        if (game.input.down) {
            this.frame = this.age%2+2;  //アニメーション
            this.y += speed;
        }

        /**アナログパッドでのプレイヤーの移動**/
        if ( pad.isTouched ) {
            this.frame = this.age%2+2;  //アニメーション
            //プレイヤーのX座標が、半分の位置より大きい時
            if ( this.x > 160 - this.width / 2 && pad.vx > 0) {
                field1.x -= pad.vx * speed;	//地面をスクロール
                field2.x -= pad.vx * speed;	//地面をスクロール
                if ( field1.x <= -320 ) field1.x = field2.x + 320;
                if ( field2.x <= -320 ) field2.x = field1.x + 320;
                rock1.x -= pad.vx * speed / 2;	//岩をスクロール
                rock2.x -= pad.vx * speed / 2;	//岩をスクロール
                if ( rock1.x <= -320 ) rock1.x = rock2.x + 320;
                if ( rock2.x <= -320 ) rock2.x = rock1.x + 320;

                /**敵キャラのスクロール**/
                for ( var i=0; i<spriteList.length; i++ ) {
                    var sprite = spriteList[i];
                    if ( sprite === this ) continue;
                    sprite.x -= pad.vx * speed;
                }

                score += 5;  //進めば進むほどスコアが加算される
            }
            else this.x += pad.vx * speed;
            this.y += pad.vy * speed;

            /**X方向にゆっくり移動しているときは歩かせる**/
            if ( Math.abs( pad.vx ) < 0.5 ) {
                if ( this.age%8 < 4 ) this.frame = 0;
                else this.frame = 1;
            } else this.frame = this.age%2+2;

            /**キャラが横に移動した時、キャラ画像をX方向に反転**/
            if ( pad.vx < 0 ) this.scaleX = -1;
            else this.scaleX = 1;

        }
        if ( this.x < 0 ) this.x = 0;
        if ( this.y < 100 ) this.y = 100;
        if ( this.y > 260 ) this.y = 260;

        /**プレイヤーと敵の当たり判定**/
        if ( this.unrivaledTime === 0 ) {
            this.opacity = 1;
            for ( var i=0; i<spriteList.length; i++ ) {
                var sprite = spriteList[i];
                if ( sprite === this ) continue;
                if ( sprite === bullet ) continue;
                if ( this.within( sprite, 20 ) ) {
                    this.moveTo( 60, 180 );
                    this.hp--;  //プレイヤーのHPから1ずつ引いていく
                    this.unrivaledTime = 30  //無敵時間
                }
            }
        } else {
            this.unrivaledTime--;
            this.opacity = this.unrivaledTime%3
        }
    }
} );

var Enemy = Class.create( Sprite, {
    initialize: function() {
        this.existence = 1;  //敵が存在する
        Sprite.call( this, 38, 47 );  //Spriteクラスのメソッドを、thisでも使えるようにする
        this.image = game.assets[ 'img/character/enemy.png' ];  //スプライトの画像ファイルを指定
        var rnd = Math.random() * ( 170 );  //0〜169までのランダムな数値を作成
        this.moveTo( 330, 100 + rnd );  //敵キャラの初期位置
    },
    onenterframe: function() {
        this.x -= 3;  //敵キャラの移動

        /**敵キャラのアニメーション**/
        if (this.age%8 < 4) this.frame = 0;
        else this.frame = 1;

        /**敵のX座標が-50以下になったり、存在が0になったら削除**/
        if ( this.x < -50 || this.existence === 0) {
            this.parentNode.removeChild(this);
            spriteList.remove( this );
        }

    }
} );

var bg = function( scene ) {
    /**空のスプライトを表示**/
    var sky = new Sprite( 320, 320 );
    sky.image = game.assets[ 'img/bg/sky.png' ];
    scene.addChild( sky );

    /**岩のスプライトを表示**/
    rock1 = new Sprite( 320, 320 );
    rock1.image = game.assets[ 'img/bg/rock.png' ];
    rock2 = new Sprite( 320, 320 );
    rock2.image = game.assets[ 'img/bg/rock.png' ];
    rock2.x = 320;
    scene.addChild( rock1 );
    scene.addChild( rock2 );

    /**地面のスプライトを表示**/
    field1 = new Sprite( 320, 320 );
    field1.image = game.assets[ 'img/bg/field.png' ];
    field2 = new Sprite( 320, 320 );
    field2.image = game.assets[ 'img/bg/field.png' ];
    field2.x = 320;
    scene.addChild( field1 );
    scene.addChild( field2 );
}

/**弾のクラス**/
var Bullet = Class.create( Sprite, {
    initialize: function() {
        var bulletX, bulletY;	//弾のX座標とY座標
        this.existence = 1;  //弾が存在する
        Sprite.call( this, 6, 2 );	//Spriteクラスのメソッドを、thisでも使えるようにする
        this.image = game.assets[ 'img/bullet.png' ];	//スプライトの画像ファイルを指定

        //プレイヤーの向きによって弾の位置や動かす方向を変える
        if ( player.scaleX >= 0 ) {
            this.speed = 20;
            bulletX = player.x + 50;
        } else {
            this.speed = -20;
            bulletX = player.x - 5;
        }
        bulletY = player.y + 19;

        this.moveTo( bulletX, bulletY );	//弾の位置
    },
    onenterframe: function() {
        this.x += this.speed;	//弾の移動

        /**弾が画面の外に出たり、存在が0になったら削除**/
        if ( this.x < -10 || this.x > 330 || this.existence === 0 ) {
            this.parentNode.removeChild(this);
            spriteList.remove( this );
        }

        /**弾と敵の当たり判定**/
        for ( var i=0; i<spriteList.length; i++ ) {
            var sprite = spriteList[i];
            if ( sprite === player ) continue;
            if ( sprite === this ) continue;
            if ( this.intersect( sprite ) ) {
                sprite.existence = 0;
                this.existence = 0;
                score += 10;  //scoreに200を加算
            }
        }
    }
} );

var init = function() {
    score = 0;
    player.hp = 2;
    spriteList = [];
}