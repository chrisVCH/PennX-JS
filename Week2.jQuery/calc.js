/*
 * Implement all your JavaScript in this file!
 */

// model: holds data and methods that change data
var model = {
  data : {
    currentNum : 0,
    nums : [],
    operator : null,
    prevOperator : null,
    result : 0,
   },
   changeNum : function(char) {
     var currentValue = this.data.nums[this.data.currentNum];
     if (currentValue === undefined) {
       currentValue = char;
     } else {
       currentValue = currentValue + char;
     };
     this.data.nums[this.data.currentNum] = currentValue;
   },
   changeOperator : function(char) {
     this.data.prevOperator = this.data.operator;
     this.data.operator = char;
   },
   compute : function() {
     switch (this.data.operator) {
       case '+':
         this.data.result = Number(this.data.nums[0]) + Number(this.data.nums[1]);
         break;
      case '-':
        this.data.result = Number(this.data.nums[0]) - Number(this.data.nums[1]);
        break;
      case '/':
        this.data.result = Number(this.data.nums[0]) / Number(this.data.nums[1]);
        break;
      case '*':
        this.data.result = Number(this.data.nums[0]) * Number(this.data.nums[1]);
        break;
     };
   },
   resetData : function() {
     this.data.currentNum = 0;
     this.data.nums = [];
     this.data.operator = null;
     this.data.prevOperator = null;
     this.data.result = 0;
   },
 }

// handlers: controls model and view
var handlers = {
  numUpdate : function(char) {
    // if operator was '=', there is a new operation
    //  reset everything
    if (model.data.operator === '=') {
      model.resetData();
    }
    // update nums[currentNum]
    model.changeNum(char);
    view.display(model.data.nums[model.data.currentNum]);
  },
  operatorUpdate : function(char) {
    if (model.data.currentNum !== 0) {
      if (model.data.nums[1] === undefined) {
        view.display(model.data.nums[0]);
      } else {
        model.compute();
        model.data.nums[0] = String(model.data.result);
        model.data.nums[1] = undefined;
        view.display(model.data.nums[0]);
      }
    } else {
      view.display(model.data.nums[model.data.currentNum]);
    }
    model.changeOperator(char);
    model.data.currentNum = 1;

  },
  equalUpdate: function() {

    // if operation is possible, compute
    if (model.data.nums[1] !== undefined) {
      model.compute();
      // save second operand in case '=' '=' input
      model.data.nums[2] = model.data.nums[1];
      model.data.nums[0] = String(model.data.result);
      model.data.nums[1] = undefined;
      model.data.currentNum = 0;
      model.changeOperator('=');
    } else {
      // if '=' '=' input case
      if (model.data.operator === '=') {
        model.data.nums[1] = model.data.nums[2];
        model.data.operator = model.data.prevOperator;
        model.compute();
        model.data.nums[0] = String(model.data.result);
        model.data.nums[1] = undefined;
        model.data.currentNum = 0;
        model.changeOperator('=');
      }
    }


    view.display(model.data.nums[model.data.currentNum]);
  },
  clearUpdate : function() {
    model.resetData();
    view.display(model.data.nums[model.data.currentNum]);
  }

}

//  view: eventListeners and update display
var view = {
  display : function(string) {
    var disp = $("#display");
    disp.val('');
    disp.val(string);

    this.outputDisplay();
  },
  addEventListeners : function() {
    $("button[value]").click(function(e) {
      handlers.numUpdate(e.target.value);
    });

    $("#addButton").click(function() {
      handlers.operatorUpdate('+');
    });
    $("#subtractButton").click(function() {
      handlers.operatorUpdate('-');
    });
    $("#multiplyButton").click(function() {
      handlers.operatorUpdate('*');
    });
    $("#divideButton").click(function() {
      handlers.operatorUpdate('/');
    });

    $("#equalsButton").click(function() {
      handlers.equalUpdate();
    });
    $("#clearButton").click(function() {
      handlers.clearUpdate();
    });
  },
  outputDisplay : function() {
    var disp = $("#output");
    disp.html('');
    disp.html(JSON.stringify(model.data));
  }

}

view.addEventListeners();
