enchant(); // おまじない


window.onload = function() {

    // 行の終わりには、;（セミコロン）を付けます。//

    var game = new Game(320, 320); // ゲーム本体を準備すると同時に、表示される領域の大きさを設定しています。
    game.fps = 15; // frames（フレーム）per（毎）second（秒）：ゲームの進行スピードを設定しています。-- 1秒間に画面を何回書き換えるか？
    game.preload('chara1.gif', 'end.png', 'clear.png'); // pre（前）-load（読み込み）：ゲームに使う素材をあらかじめ読み込んでおきます。

    // クマをタッチした時に加算されるスコア
    game.score = 0;


    game.onload = function() { // ゲームの準備が整ったらメインの処理を実行します。

        createKuma(game);
        createGirlKuma(game);
        createWhiteKuma(game);

        game.rootScene.backgroundColor = '#CCFFFF';

        var scoretext = createScore(game);

        var time = 75;
        var timeLimit = createTime(game, time);
        var clScore = 40;

        // ゲーム本体の定期処理
        game.rootScene.addEventListener('enterframe', function () {
            time--;

            setTimeLeft(timeLimit, time);
            addScoreText(scoretext, game);
            clearScore(game, time, clScore);

        });


    } // -- end  game.onload --

    game.start(); // ゲームをスタートさせます。
};