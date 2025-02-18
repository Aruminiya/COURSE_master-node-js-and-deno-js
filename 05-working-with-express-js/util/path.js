const path = require('path');

module.exports = path.dirname(require.main.filename); // 這個模組將會回傳 `app.js` 的路徑

/* 
  path.dirname(require.main.filename); 
   
  Node.js 中用來取得當前執行文件所在目錄的語法。

  以下是這段代碼的解釋：

  path 是 Node.js 的內建模組，用來處理和轉換文件路徑。
  dirname 是 path 模組中的一個方法，用來返回一個路徑的目錄名。
  require.main.filename 是 Node.js 中的一個屬性，指向當前執行的主文件的完整路徑。
  因此，path.dirname(require.main.filename) 會返回當前執行的主文件所在的目錄路徑。

  例如，如果當前執行的文件是 /Users/leo/Desktop/Program/app.js，那麼 path.dirname(require.main.filename) 會返回 /Users/leo/Desktop/Program
*/