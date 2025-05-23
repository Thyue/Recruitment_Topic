// 全域設定
cQuestionNum = 20; //是非題數
sQuestionNum = 20; //單選題數
scorePerC = 2; //是非題分數
scorePerS = 3; //單選題分數
totalScore = 0; //總分
questions = {};

console.log(data);

//函數:初始化題目物件
function prepareQuestions(subject, full, shuffle) {
  fullQuestion = full;
  questions = JSON.parse(JSON.stringify(data));
  questions = questions[subject];
  cQuestionNum = 20; //是非題數
  sQuestionNum = 20; //單選題數
  scorePerC = 2; //是非題分數
  scorePerS = 3; //單選題分數

  if (full) {
    cQuestionNum = questions["是非"].length; //是非題數
    sQuestionNum = questions["單選"].length; //單選題數
  }

  //洗是非題
  for (let i = questions["是非"].length; i > 0; i--) {
    let tempIndex = Math.floor(Math.random() * i);
    let tempValue = questions["是非"][tempIndex];
    questions["是非"][tempIndex] = questions["是非"][i - 1];
    questions["是非"][i - 1] = tempValue;
  }
  //洗是非題

  //洗單選題
  for (let i = questions["單選"].length; i > 0; i--) {
    let tempIndex = Math.floor(Math.random() * i);
    let tempValue = questions["單選"][tempIndex];
    questions["單選"][tempIndex] = questions["單選"][i - 1];
    questions["單選"][i - 1] = tempValue;
  }
  //洗單選題

  if (shuffle) {
    //洗單選題選項
    for (let i = 0; i < questions["單選"].length; i++) {
      for (let j = questions["單選"][i]["選項"].length; j > 0; j--) {
        let tempIndex = Math.floor(Math.random() * j);
        let tempValue = questions["單選"][i]["選項"][tempIndex];
        questions["單選"][i]["選項"][tempIndex] = questions["單選"][i]["選項"][j - 1];
        questions["單選"][i]["選項"][j - 1] = tempValue;
      }
    }
    //洗單選題選項
  }
  console.log(questions);
}

//函數:比較兩陣列是否全等
function isArrEqual(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return false;
  } else {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) return false;
    }
    return true;
  }
}

//函數:清除頁面
function cleanPage() {
  document.getElementById("examArea").textContent = "";
}

//函數:顯示科目選擇頁面
function showInitialPage() {
  totalScore = 0; // 清除總分

  //製作下拉選單
  let divSelect = document.createElement("div");
  divSelect.className = "input-group mb-3";
  let labelSelect = document.createElement("label");
  labelSelect.className = "input-group-text";
  labelSelect.htmlFor = "subject";
  labelSelect.innerHTML = "請選擇科目:";
  let subjectSelect = document.createElement("select");
  subjectSelect.className = "form-select";
  subjectSelect.id = "subject";
  for (let subject in data) {
    let opt = document.createElement("option");
    opt.value = subject;
    opt.innerHTML = subject;
    subjectSelect.appendChild(opt);
  }
  divSelect.appendChild(labelSelect);
  divSelect.appendChild(subjectSelect);
  document.getElementById("examArea").appendChild(divSelect);
  //製作下拉選單

  //製作k書選項開關
  let divReadCheck = document.createElement("div");
  divReadCheck.className = "form-check form-check-inline";
  let labelReadCheck = document.createElement("label");
  labelReadCheck.className = "form-check-label";
  labelReadCheck.htmlFor = "fullQuestion";
  labelReadCheck.innerHTML = "K書模式";
  let readCheck = document.createElement("input");
  readCheck.className = "form-check-input";
  readCheck.type = "checkbox";
  readCheck.id = "fullQuestion";
  divReadCheck.appendChild(readCheck);
  divReadCheck.appendChild(labelReadCheck);
  document.getElementById("examArea").appendChild(divReadCheck);
  //製作k書選項開關

  //製作洗牌選項開關
  let divRandomCheck = document.createElement("div");
  divRandomCheck.className = "form-check form-check-inline";
  let labelRandomCheck = document.createElement("label");
  labelRandomCheck.className = "form-check-label";
  labelRandomCheck.htmlFor = "needShuffle";
  labelRandomCheck.innerHTML = "測驗模式";
  let randomCheck = document.createElement("input");
  randomCheck.className = "form-check-input";
  randomCheck.type = "checkbox";
  randomCheck.id = "needShuffle";
  divRandomCheck.appendChild(randomCheck);
  divRandomCheck.appendChild(labelRandomCheck);
  document.getElementById("examArea").appendChild(divRandomCheck);
  //製作洗牌選項開關

  //製作送出按紐
  let button = document.createElement("button");
  button.className = "btn btn-success";
  button.textContent = "送出";
  button.addEventListener("click", function () {
    prepareQuestions(document.getElementById("subject").value, document.getElementById("fullQuestion").checked, document.getElementById("needShuffle").checked);
    cleanPage();
    showQuestionPage();
  });
  document.getElementById("examArea").appendChild(button);
  //製作送出按紐
}

//函數:顯示題目頁面
function showQuestionPage() {
  //表格
  let table = document.createElement("table");
  document.getElementById("examArea").appendChild(table);
  //表格

  //是非標題
  let trc = document.createElement("tr");
  let tdc = document.createElement("td");
  let hc = document.createElement("h2");
  hc.innerHTML = "是非";
  tdc.colSpan = 2;
  tdc.id = "cHeader";
  tdc.appendChild(hc);
  trc.appendChild(tdc);
  table.appendChild(trc);

  let trc2 = document.createElement("tr");
  let tdc2 = document.createElement("td");
  let hc2 = document.createElement("h3");
  hc2.innerHTML = "項次";
  tdc2.appendChild(hc2);
  trc2.appendChild(tdc2);
  let tdc3 = document.createElement("td");
  let hc3 = document.createElement("h3");
  hc3.innerHTML = "答案";
  tdc3.style.display = "none";
  tdc3.id = "correctTdc";
  tdc3.appendChild(hc3);
  trc2.appendChild(tdc3);
  let tdc4 = document.createElement("td");
  let hc4 = document.createElement("h3");
  hc4.innerHTML = "題目";
  tdc4.appendChild(hc4);
  trc2.appendChild(tdc4);
  table.appendChild(trc2);
  //是非標題

  //是非題
  for (let i = 0; i < (cQuestionNum > questions["是非"].length ? questions["是非"].length : cQuestionNum); i++) {
    //項次
    let tr = document.createElement("tr");
    tr.id = "cr" + i;
    if (i % 2 == 1) tr.className = "oddRow";
    else tr.className = "evenRow";
    table.appendChild(tr);
    let td = document.createElement("td");
    let p = document.createElement("p");
    p.innerHTML = i + 1 + ".";
    td.appendChild(p);
    tr.appendChild(td);
    //項次

    //答案
    let td2 = document.createElement("td");
    td2.id = "ct" + i;
    td2.style.display = "none";
    let pc = document.createElement("p");
    pc.id = "cp" + i;
    td2.appendChild(pc);
    tr.appendChild(td2);
    //答案

    //題目
    let td3 = document.createElement("td");
    td3.className = "left";
    tr.appendChild(td3);
    let selectC = document.createElement("select");
    selectC.id = "sc" + i;
    let optb = document.createElement("option");
    optb.value = "";
    optb.innerHTML = "";
    let optc = document.createElement("option");
    optc.value = "O";
    optc.innerHTML = "O";
    let optw = document.createElement("option");
    optw.value = "X";
    optw.innerHTML = "X";
    selectC.appendChild(optb);
    selectC.appendChild(optc);
    selectC.appendChild(optw);
    td3.appendChild(selectC);
    let labelc = document.createElement("label");
    labelc.innerHTML = questions["是非"][i]["題目"];
    labelc.for = "sc" + i;
    labelc.className = "fw-bold d-inline";
    td3.appendChild(labelc);
    //題目
  }
  //是非題

  //單選標題
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let h = document.createElement("h2");
  h.innerHTML = "單選";
  td.colSpan = 2;
  td.id = "sHeader";
  td.appendChild(h);
  tr.appendChild(td);
  table.appendChild(tr);
  let trs = document.createElement("tr");
  let tds = document.createElement("td");
  let hs = document.createElement("h3");
  hs.innerHTML = "項次";
  tds.appendChild(hs);
  trs.appendChild(tds);
  let tds2 = document.createElement("td");
  let hs2 = document.createElement("h3");
  hs2.innerHTML = "答案";
  tds2.style.display = "none";
  tds2.id = "correctTds";
  tds2.appendChild(hs2);
  trs.appendChild(tds2);
  let tds3 = document.createElement("td");
  let hs3 = document.createElement("h3");
  hs3.innerHTML = "題目";
  tds3.appendChild(hs3);
  trs.appendChild(tds3);
  table.appendChild(trs);
  //單選標題

  //單選題
  for (let i = 0; i < (sQuestionNum > questions["單選"].length ? questions["單選"].length : sQuestionNum); i++) {
    //項次
    let tr = document.createElement("tr");
    tr.id = "sr" + i;
    if (i % 2 == 1) tr.className = "oddRow";
    else tr.className = "evenRow";
    table.appendChild(tr);
    let td = document.createElement("td");
    let p = document.createElement("p");
    p.innerHTML = i + 1 + ".";
    td.appendChild(p);
    tr.appendChild(td);
    //項次

    //答案
    let td2 = document.createElement("td");
    td2.id = "st" + i;
    td2.style.display = "none";
    let ps = document.createElement("p");
    ps.id = "sp" + i;
    td2.appendChild(ps);
    tr.appendChild(td2);
    //答案

    //題目&選項
    let td3 = document.createElement("td");
    td3.className = "left";
    tr.appendChild(td3);
    let p2 = document.createElement("p");
    p2.className = "m-0 fw-bold";
    p2.innerHTML = questions["單選"][i]["題目"];
    td3.appendChild(p2);
    for (let j = 0; j < questions["單選"][i]["選項"].length; j++) {
      let divTd = document.createElement("div");
      divTd.className = "form-check form-check-inline p-0";
      let radio = document.createElement("input");
      radio.className = "d-inline";
      radio.type = "radio";
      radio.name = "s" + i;
      radio.id = "s" + i + j;
      radio.value = questions["單選"][i]["選項"][j];
      td3.appendChild(radio);
      let label = document.createElement("label");
      label.className = "d-inline";
      label.innerHTML = radio.value;
      label.htmlFor = radio.id;
      divTd.appendChild(label);
      td3.appendChild(divTd);
    }
    //題目&選項
  }
  //單選題

  //成績
  let scoreText = document.createElement("p");
  scoreText.className = "fs-4 fw-bold text-danger";
  scoreText.id = "score";
  scoreText.style.display = "none";
  document.getElementById("examArea").appendChild(scoreText);
  //成績

  //重考按鈕
  let button = document.createElement("button");
  button.className = "btn btn-danger mt-2";
  button.textContent = "重新測驗(回首頁)";
  button.addEventListener("click", function () {
    cleanPage();
    showInitialPage();
  });
  document.getElementById("examArea").appendChild(button);
  //重考按鈕

  //考完按鈕
  let button2 = document.createElement("button");
  button2.className = "btn btn-primary mt-2 ms-2";
  button2.textContent = "我考完了(計算成績)";
  button2.id = "resultButton";
  button2.addEventListener("click", function () {
    showResult();
  });
  document.getElementById("examArea").appendChild(button2);
  //考完按鈕
}

//函數:結算成績
function showResult() {
  cIncorrect = 0;
  sIncorrect = 0;

  //成績補正
  if (questions["是非"].length != 0 && questions["是非"].length < cQuestionNum) totalScore += (cQuestionNum - questions["是非"].length) * scorePerC;
  if (questions["單選"].length < sQuestionNum) totalScore += (sQuestionNum - questions["單選"].length) * scorePerS;
  //成績補正

  //顯示隱藏項目
  document.getElementById("correctTdc").removeAttribute("style");
  document.getElementById("correctTds").removeAttribute("style");
  document.querySelectorAll("select").forEach((element) => {
    element.disabled = true;
  });
  document.querySelectorAll("input[type='radio']").forEach((element) => {
    element.disabled = true;
  });
  document.querySelectorAll("input[type='checkbox']").forEach((element) => {
    element.disabled = true;
  });
  document.getElementById("resultButton").disabled = true;
  document.getElementById("cHeader").colSpan = 3;
  document.getElementById("sHeader").colSpan = 3;
  document.getElementById("score").removeAttribute("style");
  //顯示隱藏項目

  //是非結算
  for (let i = 0; i < (cQuestionNum > questions["是非"].length ? questions["是非"].length : cQuestionNum); i++) {
    document.getElementById("ct" + i).removeAttribute("style");
    //顯示答案
    document.getElementById("cp" + i).innerHTML = questions["是非"][i]["答案"];
    //顯示答案
    if (document.getElementById("sc" + i).value == questions["是非"][i]["答案"]) {
      document.getElementById("cr" + i).className = "correctRow";
      totalScore += scorePerC;
    } else {
      document.getElementById("cr" + i).className = "incorrectRow";
      cIncorrect++;
    }
  }
  //是非結算

  //單選結算
  for (let i = 0; i < (sQuestionNum > questions["單選"].length ? questions["單選"].length : sQuestionNum); i++) {
    document.getElementById("st" + i).removeAttribute("style");
    let cRadio = document.querySelector(`input[name='s${i}']:checked`);
    //顯示答案
    document.getElementById("sp" + i).innerHTML = questions["單選"][i]["選項"].indexOf(questions["單選"][i]["答案"]) + 1;
    //顯示答案
    if (cRadio && cRadio.value == questions["單選"][i]["答案"]) {
      document.getElementById("sr" + i).className = "correctRow";
      totalScore += scorePerS;
    } else {
      document.getElementById("sr" + i).className = "incorrectRow";
      sIncorrect++;
    }
  }
  //單選結算

  //顯示成績
  document.getElementById("score").innerHTML = "你的成績為: " + totalScore + "分";
  if (fullQuestion) document.getElementById("score").innerHTML = "是非錯: " + cIncorrect + "題，" + "單選錯: " + sIncorrect + "題";
  //顯示成績

  window.scrollTo(0, document.body.scrollHeight);
}

showInitialPage();
