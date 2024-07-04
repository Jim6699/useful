import http.server
import socket
import socketserver
import qrcode
from PIL import Image

# 0表示让系统选择一个未被使用的端口
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

def generate_qr_code(ip_address, port):
    # 构建URL
    url = f"http://{ip_address}:{port}"
    # 生成二维码
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    # 创建二维码图片
    img = qr.make_image(fill_color="black", back_color="white")
    
    # 显示二维码图片
    img.show()

hostname = socket.gethostname()
ip_address = socket.gethostbyname(hostname)

# 生成并显示二维码
generate_qr_code(ip_address, PORT)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port: {PORT}")
    actual_port = httpd.server_address[1]
    print(f"Actual serving port: {actual_port}")
    print(f"Serving at IP address: {ip_address}:{PORT}")
    httpd.serve_forever()
