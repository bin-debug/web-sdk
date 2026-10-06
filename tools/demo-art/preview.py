import sys
from PIL import Image
out=sys.argv[1]; names=sys.argv[2:]
ims=[Image.open(n) for n in names]
H=420; row=[]
for i in ims:
    i=i.convert('RGBA'); sc=H/i.height; row.append(i.resize((max(1,round(i.width*sc)),H)))
W=sum(i.width for i in row)
c=Image.new('RGBA',(W,H),(70,70,100,255)); x=0
for i in row: c.paste(i,(x,0),i); x+=i.width
c.convert('RGB').save(out)
