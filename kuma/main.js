enchant(); // おまじない


window.onload = function() {

    // 行の終わりには、;（セミコロン）を付けます。//

    var game = new Game(320, 320); // ゲーム本体を準備すると同時に、表示される領域の大きさを設定しています。
    var fps = 30;
    game.fps = fps; // frames（フレーム）per（毎）second（秒）：ゲームの進行スピードを設定しています。-- 1秒間に画面を何回書き換えるか？
    game.preload('chara1.gif', 'end.png', 'clear.png'); // pre（前）-load（読み込み）：ゲームに使う素材をあらかじめ読み込んでおきます。

    // クマをタッチした時に加算されるスコア
    game.score = 0;


    game.onload = function() { // ゲームの準備が整ったらメインの処理を実行します。

        createKuma(game);
        createGirlKuma(game);
        createWhiteKuma(game);

        game.rootScene.backgroundColor = '#CCFFFF';

        var clScore = 130;
        var scoretext = createScore(game, clScore);

        var time = 10;
        var timeLimit = createTime(game, time);

        // ゲーム本体の定期処理
        var count = 0;
        game.rootScene.addEventListener('enterframe', function () {
            count++;
            if(count%fps == 0){
                time--;
            }
            //time--;

            setTimeLeft(timeLimit, time);
            addScoreText(scoretext, game, clScore);
            clearScore(game, time, clScore);

        });


    } // -- end  game.onload --

    game.start(); // ゲームをスタートさせます。
};

function sleep(waitMsec) {
    var startMsec = new Date();
  
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}