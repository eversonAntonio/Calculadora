let resumo = "";
let numero = "";
let operacao = "";
let temPonto = false;
let operacoes = [];

function limpaDisplay() {
  document.getElementById("display").innerHTML = "0";
  resumo = "";
  document.getElementById("resumo").innerHTML = " ";
  numero = "";
  temPonto = false;
  operacoes = [];
}

function atualizaDisplay() {
  document.getElementById("display").innerHTML = numero;

  document.getElementById("resumo").innerHTML = resumo;
}

function adicionaNumero(info) {
  numero = numero + info;
  resumo = resumo + info;
  atualizaDisplay();
}

function adicionaZero() {
  if (numero != 0 || temPonto) {
    adicionaNumero(0);
  }
}

function adicionaMais() {
  if (operacoes[operacoes.length - 1] != "+") {
    if (resumo.includes("=")) {
      resumo = numero + "+";
      operacoes = [];
    } else {
      resumo = resumo + "+";
    }
    if (numero == "-") {
      operacoes[operacoes.length - 1] = "+";
      numero = "";
      temPonto = false;
      atualizaDisplay();
    } else {
      operacoes.push(numero);
      operacoes.push("+");
      temPonto = false;
      atualizaDisplay();
      numero = "";
    }
  }
}

function adicionaMenos() {
  if (resumo.includes("=")) {
    resumo = numero + "-";
    operacoes = [];
  } else {
    resumo = resumo + "-";
  }
  if ((operacoes[operacoes.length - 1] == "*") & (numero == "")) {
    numero = "-";
    atualizaDisplay();
  } else {
    operacoes.push(numero);
    operacoes.push("-");
    temPonto = false;
    atualizaDisplay();
    numero = "";
  }
}

function adicionaDivide() {
  if (resumo.includes("=")) {
    resumo = numero + "/";
    operacoes = [];
  } else {
    resumo = resumo + "/";
  }
  operacoes.push(numero);
  operacoes.push("/");
  temPonto = false;
  atualizaDisplay();
  numero = "";
}

function adicionaMultiply() {
  if (resumo.includes("=")) {
    resumo = numero + "*";
    operacoes = [];
  } else {
    resumo = resumo + "*";
  }
  operacoes.push(numero);
  operacoes.push("*");
  temPonto = false;
  atualizaDisplay();
  numero = "";
}

function adicionaPonto() {
  if (!temPonto) {
    if (numero == "") {
      numero = "0";
      resumo = resumo + "0";
    }
    numero = numero + ".";
    resumo = resumo + ".";
    atualizaDisplay();
    temPonto = true;
  }
}

function calcular() {
  operacoes.push(numero);
  let resultado = 0;
  calculaMultiplicacaoDivisao();
  calculaSomaSubtracao();
  // if (operacoes.includes('*') || operacoes.includes('/')) {
  //   calculaMultiplicacaoDivisao();
  //   calcular();
  // } else if (operacoes.includes('+') || operacoes.includes('-')) {
  //   calculaSomaSubtracao();
  // }
}

function calculaMultiplicacaoDivisao() {
  let x = 0;
  while (operacoes.includes("*") || operacoes.includes("/")) {
    if (operacoes[x] == "*") {
      if (
        !verificaInteiro(operacoes[x - 1]) ||
        !verificaInteiro(operacoes[x + 1])
      ) {
        resultado =
          Number.parseFloat(operacoes[x - 1]) *
          Number.parseFloat(operacoes[x + 1]);
      } else {
        resultado =
          Number.parseInt(operacoes[x - 1]) * Number.parseInt(operacoes[x + 1]);
      }
      numero = resultado;
      novoVetor(x, resultado);
      resumo = resumo + "=" + resultado;
      atualizaDisplay();
      x = 0;
    } else if (operacoes[x] == "/") {
      if (
        !verificaInteiro(operacoes[x - 1]) ||
        !verificaInteiro(operacoes[x + 1])
      ) {
        resultado =
          Number.parseFloat(operacoes[x - 1]) /
          Number.parseFloat(operacoes[x + 1]);
      } else {
        resultado =
          Number.parseInt(operacoes[x - 1]) / Number.parseInt(operacoes[x + 1]);
      }
      numero = resultado;
      novoVetor(x, resultado);
      resumo = resumo + "=" + resultado;
      atualizaDisplay();
      x = 0;
    } else {
      x = x + 1;
    }
  }
}

function calculaSomaSubtracao() {
  let x = 0;
  let resultado = 0;
  while (operacoes.includes("+") || operacoes.includes("-")) {
    if (operacoes[x] == "+") {
      if (
        !verificaInteiro(operacoes[x - 1]) ||
        !verificaInteiro(operacoes[x + 1])
      ) {
        //primeiro ou segundo número
        //não é inteiro;
        resultado =
          Number.parseFloat(operacoes[x - 1]) +
          Number.parseFloat(operacoes[x + 1]);
      } else {
        // ambos são inteiros;
        resultado =
          Number.parseInt(operacoes[x - 1]) + Number.parseInt(operacoes[x + 1]);
      }
      numero = resultado;
      novoVetor(x, resultado);
      resumo = resumo + "=" + resultado;
      atualizaDisplay();
      x = 0;
    } else if (operacoes[x] == "-") {
      if (
        !verificaInteiro(operacoes[x - 1]) ||
        !verificaInteiro(operacoes[x + 1])
      ) {
        resultado =
          Number.parseFloat(operacoes[x - 1]) -
          Number.parseFloat(operacoes[x + 1]);
      } else {
        resultado =
          Number.parseInt(operacoes[x - 1]) - Number.parseInt(operacoes[x + 1]);
      }
      numero = resultado;
      novoVetor(x, resultado);
      resumo = resumo + "=" + resultado;
      atualizaDisplay();
      x = 0;
    } else {
      x = x + 1;
    }
  }
}

function verificaInteiro(number) {
  return parseFloat(number) % parseInt(number) == 0;
}

function novoVetor(x, resultado) {
  operacoes.splice(x - 1, 3, resultado);
}
