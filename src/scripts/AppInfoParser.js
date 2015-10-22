function parsePackageInfos(data){
  var ret = {};
  var lines = data.trim().split('\n');
  var line;
  for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    
    if (line.indexOf('install permissions:') > -1) {
        ret.installPermissions = parsePermissions(lines, i + 1);
    } else if (line.indexOf('runtime permissions:') > -1) {
        ret.runtimePermissions = parsePermissions(lines, i + 1);
    }
    
  }
  return ret;
}

function parsePermissions(lines, index){
  var ret = [];
  
  // for example: android.permission.READ_SMS: granted=true, flags=[ SYSTEM_FIXED GRANTED_BY_DEFAULT ]
  var re = new RegExp(/^(\S+):\sgranted=(true|false)(?:,\sflags=\[\s([\S\s]+)\s\])?.*/);
  
  var line, parsedLine;
  for (var i = index; i < lines.length; i++) {
    line = lines[i].trim();
    
    parsedLine = re.exec(line);
    if (parsedLine !== null) {
      var value = {
        permission: parsedLine[1],
        granted: (parsedLine[2] == 'true'),
        flags: parsedLine[3],
      };
      ret.push(value);
    } else {
      break;
    }
    
  }
  return ret;
}
