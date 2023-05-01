///// DOM
const display1El = document.querySelector(".display1");
const display2El = document.querySelector(".display2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const plusMinusEl = document.querySelector(".plusminus")


///// Variables

// 출력할 값을 담을 변수
let display1Num =  "";   // 첫번째 입력값
let display2Num = "";    // 두번째 입력값
let result = null;       // 계산된 결과값

// 연산자를 담을 변수(마지막에 입력된 연산자를 저장하는 변수)
let lastOperation = "";

// .(소수점)의 중복 입력을 방지하기 위한 변수
let dotNum = false;



///// Functions

// number click event
numbersEl.forEach(number => {
  number.addEventListener("click", (e) => {
    // .의 중복 체크 부분
    // 만약 클릭한 버튼이 소수점이면
    if(e.target.innerText === "." && !dotNum) {
      dotNum = true;   // true로 변경
      // (.)소수점이 다시 입력되면 더이상 소수점 입력X
    } else if(e.target.innerText === "." && dotNum) {
      return;  // 함수 실행 종료
    }
    // 클릭된 숫자값을 변수에 넣고 변수 값을 출력하는 부분
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
    // 연산자 앞에 아무값도 없을 경우 아무것도 실행할 수 없음
    if(!display2Num) {
      return;
    }
    // 연산자 다음 두번째 값은 .을 다시 사용할 수 있어야 함
    dotNum = false;
    // 클릭한 연산자를 변수에 넣음
    const operationSymbol = e.target.innerText;
    // 첫번째 값과 두번째 값 그리고 연산자기 모두 있을 때
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

    clearPreviousValue(operationSymbol);
    lastOperation = operationSymbol;
  });
});

// 현재 값을 지우고 이전 값과 연산자를 표시하는 역할 
function clearPreviousValue(prefix) {
  prefix = prefix || "";
  display1Num += `${display2Num} ${prefix}`;
  display1El.innerText = display1Num;
  display2El.innerText = "";
  display2Num = ""; // 초기화 안해주면 3 - 33- 333 이런식으로 됨
  // 임시 결과창에 저장한 값 출력
  tempResultEl.innerText = result;
}

// 모든 값이 있을 경우 각 연산자별로 계산 및 임시 결과창에 계산 결과 출력 
// parseFloat(문자열 => 실수)
function mathOperation() {
  if(lastOperation === "×") {
      result = parseFloat(result) * parseFloat(display2Num);
  } else if(lastOperation === "+") {
      result = parseFloat(result) + parseFloat(display2Num);
  } else if(lastOperation === "−") {
      result = parseFloat(result) - parseFloat(display2Num);
  } else if(lastOperation === "÷") {
      result = parseFloat(result) / parseFloat(display2Num);
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
  // 첫번째 값 혹은 두번째 값이 없을 경우는 계산하지 않음
  if(!display1Num || !display2Num) {
    return;
  }
  // 둘다 값이 있을 경우
  dotNum = false;
  mathOperation();
  clearPreviousValue();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  display2Num = result;
  display1Num = "";
});

// clearAll(AC) click event
clearAllEl.addEventListener("click", (e) => {
  // 모든 값 초기화
  dotNum = false;
  display1El.innerText = "0";
  display2El.innerText = "0";
  display1Num = "";
  display2Num = "";
  result = "";
  tempResultEl.innerText = "0";
});

