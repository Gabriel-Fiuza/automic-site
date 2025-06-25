import qrcode.main
import os,sys

from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw


link = input("fala o link ae parceiro: ")
nome = input("qual o nome para salvar o arquivo: ")



qr = qrcode.main.QRCode(border=10)

qr.add_data(link)
qr.make(fit=True)


img = qr.make_image(fill_color = 'black',back_color = 'white')
img.save(f"{nome}.png")

img = Image.open(f"{nome}.png")


base_width = 1024
wpercent = (base_width / float(img.size[0]))
hsize = int((float(img.size[1]) * float(wpercent)))
img = img.resize((base_width, hsize), Image.Resampling.LANCZOS)


img.save(f'{nome}.png')