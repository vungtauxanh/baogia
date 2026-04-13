const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Template.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 3. Update table headers
  // Find <th ...>Đơn giá</th> and <th ...>Thành tiền</th> and wrap them in {!isHandoverMode && ( ... )}
  // Case insensitive match
  content = content.replace(/(<th[^>]*>(?:ĐƠN GIÁ|Đơn giá)<\/th>\s*<th[^>]*>(?:THÀNH TIỀN|Thành tiền)<\/th>)/gi, '{!isHandoverMode && (\n                    <>\n                      $1\n                    </>\n                  )}');

  // 4. Update table cells
  // Find <td ...>{formatCurrency(item.price)}</td> and <td ...>{formatCurrency(item.quantity * item.price)}</td>
  // Or <td ...>{formatCurrency(amount)}</td>
  content = content.replace(/(<td[^>]*>\{formatCurrency\(item\.price\)\}<\/td>\s*<td[^>]*>\{formatCurrency\((?:item\.quantity \* item\.price|amount)\)\}<\/td>)/g, '{!isHandoverMode && (\n                        <>\n                          $1\n                        </>\n                      )}');

  fs.writeFileSync(filePath, content);
});

console.log('Done');
