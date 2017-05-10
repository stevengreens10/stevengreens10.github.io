p5.prototype.loadTable2 = function (path) {
  var callback = null;
  var errorCallback = null;
  var options = [];
  var header = false;
  var ext = path.substring(path.lastIndexOf('.')+1,path.length);
  var sep = ',';
  var separatorSet = false;
  var decrementPreload = p5._getDecrementPreload.apply(this, arguments);
  print("Using new table");
  if(ext === 'tsv'){ //Only need to check if extension is tsv because csv is default
    sep = '\t';
  }

  for (var i = 1; i < arguments.length; i++) {
    if ((typeof (arguments[i]) === 'function') &&
      (arguments[i] !== decrementPreload)) {
      if(!callback){
        callback = arguments[i];
      }else{
        errorCallback = arguments[i];
      }
    } else if (typeof (arguments[i]) === 'string') {
      options.push(arguments[i]);
      if (arguments[i] === 'header') {
        header = true;
      }
      if (arguments[i] === 'csv') {
        if (separatorSet) {
          throw new Error('Cannot set multiple separator types.');
        } else {
          sep = ',';
          separatorSet = true;
        }
      } else if (arguments[i] === 'tsv') {
        if (separatorSet) {
          throw new Error('Cannot set multiple separator types.');
        } else {
          sep = '\t';
          separatorSet = true;
        }
      }
    }
  }

  var t = new p5.Table();

  p5.prototype.httpDo(path, 'GET', 'text', function(resp){
    var state = {};

    // define constants
    var PRE_TOKEN = 0,
      MID_TOKEN = 1,
      POST_TOKEN = 2,
      POST_RECORD = 4;

    var QUOTE = '\"',
      CR = '\r',
      LF = '\n';

    var records = [];
    var offset = 0;
    var currentRecord = null;
    var currentChar;

    var tokenBegin = function () {
      state.currentState = PRE_TOKEN;
      state.token = '';
    };

    var tokenEnd = function () {
      currentRecord.push(state.token);
      tokenBegin();
    };

    var recordBegin = function () {
      state.escaped = false;
      currentRecord = [];
      tokenBegin();
    };

    var recordEnd = function () {
      state.currentState = POST_RECORD;
      records.push(currentRecord);
      currentRecord = null;
    };

    while (true) {
      currentChar = resp[offset++];

      // EOF
      if (currentChar == null) {
        if (state.escaped) {
          throw new Error('Unclosed quote in file.');
        }
        if (currentRecord) {
          tokenEnd();
          recordEnd();
          break;
        }
      }
      if (currentRecord === null) {
        recordBegin();
      }

      // Handle opening quote
      if (state.currentState === PRE_TOKEN) {
        if (currentChar === QUOTE) {
          state.escaped = true;
          state.currentState = MID_TOKEN;
          continue;
        }
        state.currentState = MID_TOKEN;
      }

      // mid-token and escaped, look for sequences and end quote
      if (state.currentState === MID_TOKEN && state.escaped) {
        if (currentChar === QUOTE) {
          if (resp[offset] === QUOTE) {
            state.token += QUOTE;
            offset++;
          } else {
            state.escaped = false;
            state.currentState = POST_TOKEN;
          }
        } else {
          state.token += currentChar;
        }
        continue;
      }

      // fall-through: mid-token or post-token, not escaped
      if (currentChar === CR) {
        if (resp[offset] === LF) {
          offset++;
        }
        tokenEnd();
        recordEnd();
      } else if (currentChar === LF) {
        tokenEnd();
        recordEnd();
      } else if (currentChar === sep) {
        tokenEnd();
      } else if (state.currentState === MID_TOKEN) {
        state.token += currentChar;
      }
    }

    // set up column names
    if (header) {
      t.columns = records.shift();
    } else {
      for (i = 0; i < records[0].length; i++) {
        t.columns[i] = 'null';
      }
    }
    var row;
    for (i = 0; i < records.length; i++) {
      //Handles row of 'undefined' at end of some CSVs
      if (records[i].length === 1) {
        if (records[i][0] === 'undefined' || records[i][0] === '') {
          continue;
        }
      }
      row = new p5.TableRow();
      row.arr = records[i];
      row.obj = makeObject(records[i], t.columns);
      t.addRow(row);
    }
    if (callback !== null) {
      callback(t);
    }
    if (decrementPreload && (callback !== decrementPreload)) {
      decrementPreload();
    }

  }, function(err){
    // Error handling
    p5._friendlyFileLoadError(2, path);

    if(errorCallback){
      errorCallback(err);
    }else{
      throw err;
    }
  });

  return t;
};

function makeObject(row, headers) {
  var ret = {};
  headers = headers || [];
  if (typeof (headers) === 'undefined') {
    for (var j = 0; j < row.length; j++) {
      headers[j.toString()] = j;
    }
  }
  for (var i = 0; i < headers.length; i++) {
    var key = headers[i];
    var val = row[i];
    ret[key] = val;
  }
  return ret;
}
