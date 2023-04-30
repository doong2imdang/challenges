///// DOM
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const plusMinusEl = document.querySelector(".plusminus")


///// Variables

// 출력할 값을 담을 변수
let display1Num =  "";
let display2Num = "";
let result = null;

// 기호를 담을 변수
let lastOperation = "";

// .중복 체크를 위한 변수
let haveDot = false;



///// Functions

// number click event
numbersEl.forEach(number => {
  number.addEventListener("click", (e) => {
    // .의 중복 체크 부분
    if(e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if(e.target.innerText === "." && haveDot) {
      return;
    }
    // 클릭한 숫자값 변수에 넣고 변수 값을 출력하는 부분
    if(display2Num !== "0") {
      display2Num += e.target.innerText;
    } else {
      display2Num = e.target.innerText;
    }
    display2El.innerText = display2Num;
  });
});

// operation click event
operationEl.forEach(operation => {
  operation.addEventListener("click", (e) => {
    // 기호 앞에 아무값도 없을 경우 아무것도 실행할 수 없음
    if(!display2Num) {
      return;
    }
    // 기호 다음 두번째 값은 .을 다시 사용할 수 있어야 함
    haveDot = false;
    // 클릭한 기호를 변수에 넣음
    const operationSymbol = e.target.innerText;
    // 첫번째 값과 두번째 값 그리고 기호기 모두 있을 때
    if(display1Num && display2Num && lastOperation) {
      // 계산 실행
      mathOperation();
    } else {
      // 하나라도 없을 경우 입력값을 임수 출력 결과창에 사용할 변수에 숫자로 변환 후 담아둠
      result = parseFloat(display2Num);
    }
    // % 버튼을 눌렀을 경우
    if(operationSymbol === "%") {
      result = parseFloat(display2Num) / 100;
      display2Num = result.toString();
      display2El.innerText = display2Num;
      // tempResultEl.innerText = result;
      return;
    }

    clearVar(operationSymbol);
    lastOperation = operationSymbol;
  });
});

// 첫번쨰 입력 숫자와 기호를 합쳐 출력하는 함수 및 임시 결과창에 값 출력
function clearVar(symbol = "") {
  display1Num += `${display2Num} ${symbol}`;
  display1El.innerText = display1Num;
  display2El.innerText = "";
  display2Num = "";
  // 임시 결과창에 저장한 값 출력
  tempResultEl.innerText = result;
}

// 모든 값이 있을 경우 각 기호별로 계산 및 임시 결과창에 계산 결과 출력
function mathOperation() {
  if(lastOperation === "×") {
      result = parseFloat(result) * parseFloat(display2Num);
  } else if(lastOperation === "+") {
      result = parseFloat(result) + parseFloat(display2Num);
  } else if(lastOperation === "−") {
      result = parseFloat(result) - parseFloat(display2Num);
  } else if(lastOperation === "÷") {
      result = parseFloat(result) / parseFloat(display2Num);
  } else if(lastOperation === "%") {
      result = parseFloat(result) % parseFloat(display2Num);
  }
}

// plusMinusEl click event
plusMinusEl.addEventListener("click", () => {
  if(display2Num) {
    display2Num = String(parseFloat(display2Num) * -1)
    display2El.innerText = display2Num;
    // 연산자가 존재하면 result 값 업데이트
    if(lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(display2Num);
    }
  } else if (result) {
    result = String(parseFloat(result) * -1);
    display2El.innerText = result;
  }
});


// equalEl click event
equalEl.addEventListener("click", (e) => {
  // 첫번째 값 혹은 두번째 값이 없을 경우는 계산 불가하여 아무것도 하지 않음
  if(!display1Num || !display2Num) {
    return;
  }
  // 둘다 값이 있을 경우
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  display2Num = result;
  display1Num = "";
});

// all clear(AC) click event
clearAllEl.addEventListener("click", (e) => {
  // 모든 값 초기화
  display1El.innerText = "0";
  display2El.innerText = "0";
  display1Num = "";
  display2Num = "";
  result = "";
  tempResultEl.innerText = "0";
  haveDot = false;
});

