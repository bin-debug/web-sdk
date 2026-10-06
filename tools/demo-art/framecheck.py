import sys, json
from PIL import Image
out=sys.argv[1]; names=sys.argv[2:]
D='C:/source/_studio-kit/web-sdk/packages/kit-demo-art/static/demo/'
rows=[]
for n in names:
    j=json.load(open(D+n+'.json')); img=Image.open(D+n.rsplit('/',1)[0]+'/'+j['meta']['image']).convert('RGBA')
    an=list(j['animations'].values())[0] if j.get('animations') else list(j['frames'])
    pick=[an[0],an[len(an)//4],an[len(an)//2],an[3*len(an)//4],an[-1]]
    row=[]
    for k in pick:
        f=j['frames'][k]['frame']; row.append(img.crop((f['x'],f['y'],f['x']+f['w'],f['y']+f['h'])).resize((140,140)))
    rows.append(row)
c=Image.new('RGBA',(5*140,len(rows)*140),(70,70,100,255))
for r,row in enumerate(rows):
    for i,t in enumerate(row): c.paste(t,(i*140,r*140),t)
c.convert('RGB').save(out)
