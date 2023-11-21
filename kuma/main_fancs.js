// 正数の乱数を生成
function rand(num) {
	return Math.floor(Math.random() *(num+1));
}

// 0から引数で指定した数値の乱数（小数点あり）を生成
function randPosition(arg) {
	return Math.random() * arg;
}

// Sprite(ゲームキャラクター) x, yに乱数を設定
function setScaleXY(chara, num) {
    chara.x = randPosition(num);
    chara.y = randPosition(num);
}

// クマを生成
function createKuma(game) {
    var nudNum = 288;
    var kuma = new Sprite(32, 32);
    setScaleXY(kuma, nudNum);

	kuma.tick = 0;
    kuma.frame = 0;
    kuma.frameNum = [0, 1, 0, 2];
    kuma.image = game.assets['chara1.gif']; // 画像を指定

    kuma.addEventListener('enterframe', function() {
    	kuma.tick ++;
    	kuma.frame = kuma.frameNum[kuma.tick%4];
        setScale(kuma);
    });

    kuma.addEventListener('touchstart', function() {
        game.score += 10; // クマがタッチされる度に10点加点されます。
        setScaleXY(kuma, nudNum);
    });

    game.rootScene.addChild(kuma);
}

// 白クマの生成
function createWhiteKuma(game) {
    var nudNum = 288;
    var whiteKuma = new Sprite(32, 33);
    setScaleXY(whiteKuma, nudNum);

    whiteKuma.tick = 0;
    whiteKuma.frame = 5;
    whiteKuma.frameNum = [5, 6, 5, 7];
    whiteKuma.image = game.assets['chara1.gif']; // 画像を指定

    whiteKuma.addEventListener('enterframe', function() {
    	whiteKuma.tick ++;
    	whiteKuma.frame = whiteKuma.frameNum[whiteKuma.tick%4];
        setScale(whiteKuma);
    });

    whiteKuma.addEventListener('touchstart', function() {
        game.score += 10; // クマがタッチされる度に10点加点されます。
        setScaleXY(whiteKuma, nudNum);
    })
    game.rootScene.addChild(whiteKuma);
}

// 女の子クマの生成
function createGirlKuma(game) {
    var nudNum = 288;
    var girlKuma = new Sprite(32, 32);
    setScaleXY(girlKuma, nudNum);

    girlKuma.tick = 0;
    girlKuma.frame = 10;
    girlKuma.frameNum = [10, 11, 10, 12];
    girlKuma.image = game.assets['chara1.gif']; // 画像を指定

    girlKuma.addEventListener('enterframe', function() {
    	girlKuma.tick ++;
    	girlKuma.frame = girlKuma.frameNum[girlKuma.tick%4];
        setScale(girlKuma);
    });

    girlKuma.addEventListener('touchstart', function() {
        game.score += 10; // クマがタッチされる度に10点加点されます。
        setScaleXY(girlKuma, nudNum);
    })
    game.rootScene.addChild(girlKuma);
}

// 木の生成
function createWood(game) {
    var nudNum = 288;
    var wood = new Sprite(46, 60);
    setScaleXY(wood, nudNum);
    wood.image = game.assets['wood.gif'];
    game.rootScene.addChild(wood);
}

// ScaleX, ScaleYの設定
function setScale(chara) {
    // scaleX Sprite 1 or -1 左右の向きを変更
    if (chara.scaleX == 1) {
        chara.x += 3;

        if (chara.y<=25 && chara.x>=180) {
            chara.scaleX = -1;
        }

        if (chara.y>= 280 && chara.x>=180) {
            chara.scaleX = -1;
        }

        if (chara.x > 288) {
            chara.scaleX = -1;
        }
    } else {
        chara.x -= 3;
        if (chara.x < 0) {
            chara.scaleX = 1;
        }
    }
}

// スコアを表示
function createScore(game, clearScore) {
    var scoretext = new Label();
    scoretext.text = 'SCORE: ' + game.score + "/ " + clearScore;
    scoretext.x = 170;
    scoretext.y = 10;
    scoretext.font = '16px sans-serif';

    game.rootScene.addChild(scoretext);

    return scoretext;
}

// 制限時間を生成
function createTime(game, time) {
    var timeLimit = new Label();
    timeLimit.text = "残り時間 "+ time ;
    timeLimit.x = 220;
    timeLimit.y = 300;
    timeLimit.font = '16px Arial';

    game.rootScene.addChild(timeLimit);

    return timeLimit;
}

// ゲームスコアに得点を追加
function addScoreText(scoretext, game, clearScore) {
    scoretext.text = 'SCORE: ' + game.score + "/ " + clearScore;
}

// 残り時間の設定
function setTimeLeft(timeLimit, time) {
    timeLimit.text = '残り時間:' + time;
}

// ゲームクリアするScoreを設定
function clearScore(game, time, clScore) {
    if (time <= 0) {
        if (game.score >= clScore) {
            game.pushScene(gameClearScene(game));
        } else {
            game.pushScene(gameOverScene(game));
        }
    }
}


// ゲームオーバー画面の生成
function gameOverScene(game) {
    // シーン 生成
    var scene = new Scene();
    scene.backgroundColor = 'black';

    // ゲームオーバー 画像
    var overImage = new Sprite(189, 97);
    overImage.image = game.assets['end.png'];
    overImage.x = 60;
    overImage.y = 100;

    // スコア
    var resultScore = new Label();
    resultScore.text = "Score:" + game.score;
    resultScore.font = '26px sans-serif';
    resultScore.color = 'white';
    resultScore.x = 100;
    resultScore.y = 200;

    // メニュー
    var menu = new Label();
    menu.text = "メニューへ戻る";
    menu.font = '26px sans-serif';
    menu.color = 'white';
    menu.x = 65;
    menu.y = 270;

    // リトライ
    var retry = new Label();
    retry.text = "リトライ";
    retry.font = '26px sans-serif';
    retry.color = 'white';
    retry.x = 105;
    retry.y = 240;

    menu.addEventListener('touchstart', function() {
        window.location.href = "../index.html"
    });
    retry.addEventListener('touchstart', function() {
            location.reload();
    });

    scene.addChild(overImage);
    scene.addChild(resultScore);
    scene.addChild(menu);
    scene.addChild(retry);

    return scene;
}


// クリア画面の生成
function gameClearScene(game) {
            var lastScene = new Scene();
            lastScene.backgroundColor = '#FF9966';

            var clearImage = new Sprite(267,48);
            clearImage.image = game.assets['clear.png'];
            clearImage.x = 25;
            clearImage.y = 100;

            // スコア
            var resultScore = new Label();
            resultScore.text = "Score:" + game.score;
            resultScore.font = '26px sans-serif';
            resultScore.color = 'white';
            resultScore.x = 100;
            resultScore.y = 200;

            // メニュー
            var menu = new Label();
            menu.text = "メニューへ戻る";
            menu.font = '26px sans-serif';
            menu.color = 'white';
            menu.x = 65;
            menu.y = 270;

            // リトライ
            var retry = new Label();
            retry.text = "リトライ";
            retry.font = '26px sans-serif';
            retry.color = 'white';
            retry.x = 105;
            retry.y = 240;

            menu.addEventListener('touchstart', function() {
                window.location.href = "../index.html"
            });

            retry.addEventListener('touchstart', function() {
                location.reload();
            });

            lastScene.addChild(resultScore);
            lastScene.addChild(clearImage);
            lastScene.addChild(menu);
            lastScene.addChild(retry);

            return lastScene;
}