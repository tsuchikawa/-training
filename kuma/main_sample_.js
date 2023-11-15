enchant(); // おまじない


window.onload = function() {

    // 行の終わりには、;（セミコロン）を付けます。//

    var game = new Game(320, 320); // ゲーム本体を準備すると同時に、表示される領域の大きさを設定しています。
    game.fps = 15; // frames（フレーム）per（毎）second（秒）：ゲームの進行スピードを設定しています。-- 1秒間に画面を何回書き換えるか？
    game.preload('chara1.gif', 'end.png', 'clear.png'); // pre（前）-load（読み込み）：ゲームに使う素材をあらかじめ読み込んでおきます。

    // クマをタッチした時に加算されるスコア
    game.score = 0;


    game.onload = function () { // ゲームの準備が整ったらメインの処理を実行します。
        // ↓ ↓ この下にキャラクターを生成するコード(createKuma(game);)をペースト


        // ↓ ↓ この下に背景を指定するコードをペースト


        // ↓ ↓ この下にscoretext関連のコードをペースト


        // ↓ ↓ この下に "var time" 関連のコードをペースト


        // ↓ ↓ この下に "var timeLimit" 関連のコードをペースト


        // ↓ ↓ この下に "clScore" 関連のコードをペースト



        // ゲーム本体の定期処理
        game.rootScene.addEventListener('enterframe', function () {
            // ↓ ↓ この下に 制限時間からゲームが進行するごとに-1引かれるコードをペースト


            // ↓ ↓ この下に 残り時間を処理するコードをペースト


            //↓ ↓ この下に 最新のゲームスコアが表示されるコードをペースト


            // ゲームをクリアするスコアを処理するコードをペースト


        });


    } // -- end  game.onload --

    game.start(); // ゲームをスタートさせます。
};