/* 
	buildJSON = function(entries, key, keys, values)
	permute = function(a)
	permuteStr = function(s)
	combine = function(a, min, max)
	combineStr = function(s, min, max)
	transpose = function(matrix)
	OPTIONAL: findHash = function(k, t, l)
*/
function day1(files) {
	var read1 = readlines(files);
	read1.then(function (strings) {
		var val1 = func1(strings);
		showDoneMessage("input1", "Part 1: ", val1);
	});
}

function day2(files) {
	var read2 = readlines(files);
	read2.then(function (strings) {
		var val2 = func2(strings);
		showDoneMessage("input2", "Part 2: ", val2);
	});
}

window.onload = function() {
	var lines = (input.match(/\w+/g)||[]);
	
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}



//	0:15:56
function func1(strs) {
	strs = strs.map( (line) => line.split(""));//.map( (ltr,idx) => lpos[idx].push(ltr)));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	var tst = transpose(strs);
	console.log(tst);
	tst = tst.map( pos => {
		var icnt = new Map();
		pos.map ( ltr => {
			if (icnt.has(ltr)) {
				icnt.set(ltr, icnt.get(ltr) + 1);
			} else {
				icnt.set(ltr, 1);
			}
		});
		var mcnt = 0;
		var mlt;
		icnt.forEach( (cnt, lt) => {
			if (cnt > mcnt) {
				mcnt = cnt;
				mlt = lt;
			}
		});
		return mlt;
	});
	console.log(tst);
	
	return tst.join("");
}

//	0:17:00
function func2(strs) {
	strs = strs.map( (line) => line.split(""));//.map( (ltr,idx) => lpos[idx].push(ltr)));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	var tst = transpose(strs);
	console.log(tst);
	tst = tst.map( pos => {
		var icnt = new Map();
		pos.map ( ltr => {
			if (icnt.has(ltr)) {
				icnt.set(ltr, icnt.get(ltr) + 1);
			} else {
				icnt.set(ltr, 1);
			}
		});
		var mcnt = Infinity;
		var mlt;
		icnt.forEach( (cnt, lt) => {
			if (cnt < mcnt) {
				mcnt = cnt;
				mlt = lt;
			}
		});
		return mlt;
	});
	console.log(tst);
	
	return tst.join("");
}

var input1 = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`;
var input = `iyeajeby
qengiuoe
wxzardgo
jciguemn
zcampkps
kiqjpjqb
knwhoxlw
iaxxpjhe
kgrgaixi
lciydajs
svugtdwe
nwailbqu
cbkwwxvt
lqjyrawh
jylmtlzk
firecpyg
xegtcvvx
jllqqzeq
hggmnxlc
pdmfuqlx
hnbksbkl
pmjmiqti
gpmuvcsh
tspnxvnm
hghwizhe
sgokeybb
jtphckcv
usypmmzq
irlfaboj
prgiqvil
nfqegpjd
aivwwkix
xeljyzjv
mrdpqlzc
metcvpvd
ifizfkgl
uznvqiqw
uzylkeui
obmqhlan
vaoivkeq
wvlbwfaf
ntbgtbpz
lbuieiea
rljyfeop
rynkdwiq
hyqpjwzl
supxlsql
bntmjboc
qntfhain
xxtjctjz
qppakrbj
ptnnwmlg
pucuqrpi
ensluhxm
wtnabsej
hvnozkvx
dhxgysdk
qdizyrkg
vtuyxjky
lxwcyfxr
xoyphxmb
ltylucct
oaawvjfa
qbjmdcap
raqhkkbe
uqtxpvhj
pddzoucq
axfbgpvj
eohksqcm
jtmmkovb
paronxgv
gtxnqybz
qfsobvxz
ywrnogwz
ytdvpmzv
daeappko
zgjdatzf
psrfofvi
uobknckb
rvndwdgs
oedojfqv
shxmutcm
nigdxgrz
ngwvdair
wexxkvwn
oqmrjlcr
vcbmxvyb
ekdfdzch
klphcryl
bbtobqqo
wupuvqio
hwiufjpk
rckjewzp
vhgzdtil
qrvqytfe
opolrgwi
nektqhbg
ynubobwy
cqnysvzf
muqrlihy
ncbeeuur
hxsvpoug
kacsofnk
vztkoicu
smxiuykn
sgnmdqmw
sfsxxnds
iwquujxr
fwssfvfw
qyoswzsm
kvfvizgu
fmewmudq
mvtekgjn
kkffshrt
jzbkyxzf
beszoylz
lnhmbwae
tijfkcrt
culovluh
jrgtbxma
yqtlarnm
rdlxlplt
vzgphnpi
igpbfrrd
yqdgvyke
juhzerjo
kfwlvhag
ysznuuey
turxgyik
iqgcxxpa
tjrmtkjk
ywfcwvqp
ozmguljj
maxegnqi
vavydxwd
dhlckjra
omvdoafe
rvzejiol
rsnpjser
nejognkt
agkavzki
uzskztny
knvzbkff
iiuhrzsp
amxryjhv
yqxdgdaj
tpvellfc
dqutbibf
fbbrpcbg
shxlcvmc
ociooedg
nedlhmfo
ohdxifnx
mqhbpyed
tauomzjy
bkooiesi
xtukgdec
mygazipf
wkvecylo
tlejwzcj
rcpygkbi
uihidqdr
lxwthely
ywyoahob
zwjrveex
eqahofbx
mvipdaql
zccdioga
gttnacns
urajevul
uhsdjkhm
cjbpznua
tyfvodhw
feadmwyl
cjmccfcy
uawxsuyy
xzzidfrj
slhgapvb
tbdwntwx
bvspfozq
pkkwgooy
frnhifax
sxfkbojn
ffnzlqda
pbtbewtm
mivpqcyc
gztezasy
jlfdrmou
xjmazeef
lgcaevtl
piidoxbi
iczlosyt
egszahwu
cmbybzvi
orczduhd
hzorfhdv
yptggtmu
yfsmednv
ajawzgpp
niicgavl
mmdpsogr
wkufsuct
yboinvnc
lmwbrqmb
rrsfhics
xguvmcmi
yldifule
laycxgaf
jtnizmxf
qrbpqznc
cpplgbsm
xzkwttnj
axjxusuh
nthcjcqn
zjkdjlcz
uulqjmfq
djqlzrcb
ftxhzuoq
bfrzrdtn
fvovpzts
tloyyqoa
spupkgwb
ishhbwok
spyfzbsj
bvvnfnxx
iuectyxc
xbbjridq
drzfvsrw
gokuvwjf
hhkmgqxf
epijynaj
bfxdnibq
pjoovmhf
izbgldjr
rvxrhjxa
blhhorwy
xwmobyph
pfoimsbl
gprwonid
hfwmazfu
dudhehvt
nbekhgbg
qbwklpvg
yemjyobm
vmocaztb
xkwklord
tjooucsf
qowresxh
cxeapuvv
zmlzqivx
fryanflf
kxcrserx
jtoqtooo
axrtkjyo
fwwzdsbx
pyphszfp
ekdcnrgx
zyrhxcvc
blcqplmo
wnsiistm
slavtfip
sixawglm
sxpjnpsa
sfwmudzt
kcpetkcw
iqfufsws
wdfbgvol
muvtnxzg
otgycshn
gddbabma
swksjxjx
hnfcsnir
tmcnycfi
lpvuwehn
htyogany
rggezmhh
guzhwmss
zoqiscdy
dqbtvyrb
wfnymsai
klfpdgvn
ihqjdope
dudllmty
gpbkmwtd
tjmtvjpk
sjnkfrsk
bgruelqs
repdjhre
flxjlvah
lkpnbajp
rmkqdjpx
enimddcn
nzowveei
cohzzkee
sxfvyqwi
vlztaixp
xgkrlsyh
eaurshic
kifvzhsv
dxfsexup
fyqqbzgm
bnxsgjxg
ndbbkscp
xyjhzqel
eyanetmo
quakpmsr
kqfeprrb
hhsvwyse
jjvjivng
zkeiinwn
adibxest
zjzrkmxr
kceozeud
iknfusda
gqmuepbo
ccwltods
smaurfwy
yojrrudk
akygvwyf
dermnpvn
bvfvjskb
pcohqoyu
odyqfyhy
nqgepwqo
zijtbqgd
czfgqsmr
fkgeoorf
udvncboo
dwxgrgck
vqhthccp
gvkfkpwr
pquhsiha
hlpqfrpz
aeirprab
bouoglph
zwyimnhu
zpculwdn
mokpnpeq
hfgfjamc
osgncdnf
ejfjqwql
tovcchzu
wwmburym
mdonvwnw
wxjysrlt
cjrqrnqv
okzeilge
egunoujn
dlbaqemd
qrdyabya
vaaxguwe
hjqwytxz
xtvmgdaq
noijjgft
xgysigmw
urbsmwdk
bjnerghw
aspvghjp
hgciumho
ivjihqed
wtvkobuw
zhtyhllg
jlxjwjui
xkmxhoek
rydzmqip
ydonbzvk
byeoptyo
gpnnqxrb
hyzplaie
tbedyaph
zgqhqnmg
tdepvaex
wytwmgkr
qsmuyzys
fijlauqj
wyqylgam
lbwxnluj
nmecxavu
ofktnhfb
lhjgzkjr
ucctfetk
mggvgkmu
yzmnbbhe
kcnqhuam
rxiwfblx
vfufzjou
cpynrovg
qdwshnpi
pcrxywto
ozhzwpwa
zroxmvfr
fpipfjvu
leyiafxs
oacgxszs
voebeyvn
ixkqabkl
lqabfhtd
oewbtlgc
vdlaniii
tabtkolp
xufkdmem
niofeqxn
innfbedm
zahlnzhd
whmqyffv
fhjascxd
wnsktsdi
ucdgnvkf
fmpxuyml
pnvuhmup
wohfuyto
wthjmlzx
tkcdmttv
ubyrests
mkrplnes
mglepvyl
shqafjly
gbpaitlu
cesjmugk
qnqmvnks
kbvvlltq
luvgtdmv
rrrhawdz
dthrxkth
bglwrdgk
apqxickb
vnzwzjba
reiafjdt
qfcunhks
dwmhshtd
rwtwnxxu
gjgdhwtr
dhrwidzp
manohccv
jvccmlat
txhfklix
nczocnew
gxlpkgqr
vsrtxogh
ixhtcwaz
qfapctcq
glvtpiug
jnuecngg
bktbndyg
ceboexzj
lsjakjjw
oemmiqvu
zqscwlay
hqedlpzb
hsrztfxj
fjpwidgw
abrsenrv
qseoiuyj
jtjtqxgr
esczykzc
mazmziim
szzwzfuq
zbcfhaiz
uqsnjwus
vwzqohsu
yylbjhnl
chqdcblk
vporypnv
vfhdofdx
eztmaogh
wlzjsgbw
dqutunrc
gwtpdvpm
ywxghnkc
alacomlw
jfuygdcy
zkoeauig
abufqquo
ncilvdgq
guinnabe
pdwybure
jocsrmfp
acwncthl
cdnaffnn
zyqbszzz
azhxybig
hibjuhsw
tvckjxuf
vklsqbos
efzukhlt
kjaqqofz
esxcyrxt
yocrwucn
iodafafm
oiakmvtb
dmbgtcpj
qnzrryot
ufcbptbz
veprgqre
umsltfes
bvvqhcmz
rucsowjt
kkbgkrxe
fksibbfh
tyckeiqo
gfqurpyl
raljmvsf
chednohc
gowzqrfm
ypktqcvb
fgiusizq
jvdsmnhu
esfuxpra
uraiwlfz
vpkulaao
erkvbjrj
mrhjjist
xmpayrdq
biqwpkrm
lrlhkljw
rbaglxsu
kryywepc
mrydxkuv
obksnkir
jogxscwa
pxkzdamo
wcywigdv
acqicmyz
xiqhgpik
izubxapc
yrzfptzd
qmyltgkw
dwedcarp
oouewlrv
izelyufn
ehdstcah
nylqvqtd
ywxjkxnx
sstceepq
bjihzptq
nvawrewu
plftxhsh
eyuzdika
gjdyaoek
euqeablj
zhgjzdki
lyygbhly
joscwikc
cbqczxbu
xnhptyqu
txvltmyh
kwtaueat
btpbbibj
ueytsouw
kfmmcyqk
fwflotzv
ouwyewua
hslsjpur
jdgrtwme
lgelctfc
nlxyvkgh
xpeslfje
adcifgwz
gquvwdeb
rkmzqard
lvzehstp
cijqaygt
dwfzsddm
vmwqrrsy
aotsaqoj
irjumknp
altzbfjo
hubsrgdb
nudnkfof
bvhvcltf
xupumtmg
kjfxunyd
pjwhyeuz
zmnxkepw
mpzvjjni
cskxvphp
dykbldmb
ymmsshaj
gdsvrycq
ehdvpiqy
engermzp
tmexxgkw
acjslpiv
qprqqyqf
fbictbjs
llaeirez
uxoofxnc
ukgpjtlz
tpxwxzpu
cuzgcjgd
jnzxfqww
wemyhsbv
aslnwaqg
aibaikgt
hglojgqv
larqrtka
ozlrwpna
pzxsdrjh
vsnuuusj
jswkkvun
darbbbhk
woeihkoh
xdsunolx
ymvbtrxg
mtodxqik
fxkcdfwq
koivubnr
gitldbqs
bsjymzpd
whaluyys
rvaftjox
qhinxcid
snpkwuko
mdgvstoq
zzytixxc
qsgrlmdn
ddjqxeaw
uilqxznh
chazpmyk
iivrixot
casfxwwa
mvjdazsr
dnmivmal
eayyeyfh`;