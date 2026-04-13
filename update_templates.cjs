const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Template.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update title
  content = content.replace(/<h2[^>]*>BÁO GIÁ<\/h2>/g, (match) => {
    return match.replace('BÁO GIÁ', '{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BÁO GIÁ"}');
  });
  content = content.replace(/<h2[^>]*>BẢNG BÁO GIÁ<\/h2>/g, (match) => {
    return match.replace('BẢNG BÁO GIÁ', '{isHandoverMode ? "BIÊN BẢN BÀN GIAO" : "BẢNG BÁO GIÁ"}');
  });

  // 2. Update intro
  content = content.replace(/<p[^>]*>Chúng tôi trân trọng gửi đến Quý khách hàng bảng báo giá chi tiết như sau:<\/p>/g, (match) => {
    return match.replace('Chúng tôi trân trọng gửi đến Quý khách hàng bảng báo giá chi tiết như sau:', '{isHandoverMode ? "Hai bên thống nhất bàn giao các hạng mục sau:" : "Chúng tôi trân trọng gửi đến Quý khách hàng bảng báo giá chi tiết như sau:"}');
  });
  content = content.replace(/<p[^>]*>CSKD xin gửi báo giá hàng hóa cụ thể như sau:<\/p>/g, (match) => {
    return match.replace('CSKD xin gửi báo giá hàng hóa cụ thể như sau:', '{isHandoverMode ? "Hai bên thống nhất bàn giao các hạng mục sau:" : "CSKD xin gửi báo giá hàng hóa cụ thể như sau:"}');
  });
  content = content.replace(/<p[^>]*>Dưới đây là thông tin chi tiết về báo giá:<\/p>/g, (match) => {
    return match.replace('Dưới đây là thông tin chi tiết về báo giá:', '{isHandoverMode ? "Hai bên thống nhất bàn giao các hạng mục sau:" : "Dưới đây là thông tin chi tiết về báo giá:"}');
  });
  content = content.replace(/<p[^>]*>Kính gửi Quý khách hàng báo giá chi tiết:<\/p>/g, (match) => {
    return match.replace('Kính gửi Quý khách hàng báo giá chi tiết:', '{isHandoverMode ? "Hai bên thống nhất bàn giao các hạng mục sau:" : "Kính gửi Quý khách hàng báo giá chi tiết:"}');
  });

  // 3. Update table headers
  // Find <th ...>ĐƠN GIÁ</th> and <th ...>THÀNH TIỀN</th> and wrap them in {!isHandoverMode && ( ... )}
  content = content.replace(/(<th[^>]*>ĐƠN GIÁ<\/th>\s*<th[^>]*>THÀNH TIỀN<\/th>)/g, '{!isHandoverMode && (\n                    <>\n                      $1\n                    </>\n                  )}');

  // 4. Update table cells
  // Find <td ...>{formatCurrency(item.price)}</td> and <td ...>{formatCurrency(item.quantity * item.price)}</td>
  content = content.replace(/(<td[^>]*>\{formatCurrency\(item\.price\)\}<\/td>\s*<td[^>]*>\{formatCurrency\(item\.quantity \* item\.price\)\}<\/td>)/g, '{!isHandoverMode && (\n                        <>\n                          $1\n                        </>\n                      )}');

  fs.writeFileSync(filePath, content);
});

console.log('Done');
