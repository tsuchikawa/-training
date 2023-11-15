
// --- キャラクターを表示させるコード
// クマを生成・表示
createKuma(game);

// 白クマを生成・表示
createWhiteKuma(game);

// 女の子クマの生成・表示
createGirlKuma(game);


// --- ゲーム画面の色を変更させるコード
// 背景の色を設定
game.rootScene.backgroundColor = '#CCFFFF';
// カラーコード
    // 薄めの水色     #f0f8ff
    // ピンク         #ffc0cb
    // 黄緑           #98fb98
    // ライトイエロー  #ffffe0

// --- スコア(文字列)を生成
var scoretext = createScore(game);



// --- 制限時間を表示しよう
// 制限時間
var time = 75;
// スコア(文字列)を生成
var timeLimit = createTime(game, time);


// --- フレームが読み込まれる度に制限時間timeから-1を引く
time --;



// --- 残り時間の設定
setTimeLeft(timeLimit, time);



// --- ゲーム画面に最新のスコアを表示
addScoreText(scoretext, game);


//  --- ゲーム クリアとなる点数
var clScore = 50;

// ---- スコアが何点以上ならゲームクリア、何点以下ならゲームオーバーか設定
clearScore(game, time, clScore);







