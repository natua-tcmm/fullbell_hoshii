// 自動で選択状態にする
var get_bell_count_input = document.getElementById("get_bell_count");
var all_bell_count_input = document.getElementById("all_bell_count");
var technical_score_input = document.getElementById("technical_score");

get_bell_count_input.addEventListener("click", function () { this.select(); });
all_bell_count_input.addEventListener("click", function () { this.select(); });
technical_score_input.addEventListener("click", function () { this.select(); });

// エラーを表示する関数
var disp_error = function (message) {
	var error_message_text = document.getElementById("error_message");
	var error_string = "エラー : ";
	error_message_text.style.display = "block";
	error_message_text.innerHTML = error_string + message;
};

// 有効性確認の関数
var valid_check = function (input) {

	// 正規表現パターン 0以上の自然数
	var pattern = /^\d*$/;

	if (input.length == 0) {
		disp_error("未入力の欄があります");
		return false;
	}

	if (!pattern.test(input)) {
		disp_error("不正な値が入力されている欄があります");
		return false;
	}

	return true;

};

// 小数点第p位で切り捨て
var kirisute = function (num, p) {
	return Math.floor(num * Math.pow(10, p)) / Math.pow(10, p);
};

// 負の値で達成表示
var score_tassei = function (score, target) {
	if (target > score) return (target - score).toString();
	else return "達成!";
};

// ボタンが押されたら実行される関数
var calc = function () {

	var get_bell_count = document.getElementById("get_bell_count").value;
	var all_bell_count = document.getElementById("all_bell_count").value;
	var technical_score = document.getElementById("technical_score").value;

	var result_text = document.getElementById("result");

	var to_sss_text = document.getElementById("to_sss");
	var to_sssp_text = document.getElementById("to_sssp");
	var score_minus_bell_text = document.getElementById("score_minus_bell");
	var score_one_bell_text = document.getElementById("score_one_bell");

	var score_bell_text = document.getElementById("score_bell");
	var score_notes_text = document.getElementById("score_notes");

	var error_message_text = document.getElementById("error_message");

	// エラーを非表示に
	error_message_text.style.display = "none";

	// 有効性確認
	if (!(valid_check(get_bell_count) && valid_check(all_bell_count) && valid_check(technical_score))) {
		disp_error("入力した値を確認してください(未入力/入力値が不正)");
		return;
	}

	// 数値に変換
	get_bell_count = Number(get_bell_count);
	all_bell_count = Number(all_bell_count);
	technical_score = Number(technical_score);

	// 計算
	var bell_score = 60000 * (get_bell_count / all_bell_count);
	var notes_score = technical_score - bell_score;
	var result_score = Math.floor(notes_score + 60000);

	// エラーチェック
	if (get_bell_count > all_bell_count) {
		disp_error("入力した値を確認してください(ベル数が不正)");
		return;
	}
	if (result_score > 1010000) {
		disp_error("入力した値を確認してください(結果が理論値超え)");
		return;
	}

	// 結果表示
	result_text.innerHTML = result_score;

	to_sss_text.innerHTML = "SSSまで : " + score_tassei(technical_score, 1000000) + " -> " + score_tassei(result_score, 1000000);
	to_sssp_text.innerHTML = "SSS+まで : " + score_tassei(technical_score, 1007500) + " -> " + score_tassei(result_score, 1007500);

	score_minus_bell_text.innerHTML = "ベルによる合計失点 : " + kirisute(60000 - bell_score, 1);
	score_one_bell_text.innerHTML = "ベル1つあたりの配点 : " + kirisute(60000 / all_bell_count, 1);

	score_bell_text.innerHTML = "ベルによるスコア : " + kirisute(bell_score, 1) + " / 60000 ( MAX-" + kirisute(60000 - bell_score, 1) + " | " + kirisute(bell_score / 600.00, 2) + "%)";
	score_notes_text.innerHTML = "ノーツによるスコア : " + kirisute(notes_score, 1) + " / 950000 ( MAX-" + kirisute(950000 - notes_score, 1) + " | " + kirisute(notes_score / 9500.00, 2) + "%)";

	return;
};
