//special thanks to Golan Levin for the chunks of code I took from his etch-a-sketch

var head, body, bbeak, tbeak, lfoot, rfoot, lleg, rleg, tail, cwing;
var step;
var wait;
var affirmed;
var answer;
var curse;
// speech recognizer variables
var mySpeechRecognizer;
var mostRecentSpokenWord;
var mostRecentConfidence;
var negatives = ['no', 'nah', 'nope', 'not', 'haven\'t', 'i haven\'t', 'i have not'];
var positives = ['yeah', 'yes', 'yup', 'have', 'i have', 'did', 'am'];
var affirm = ['okay', 'thanks', 'thank you', 'will', 'right']
var end = ['I\'m okay now', 'I\'m fine now'];

var tx = 740;
var ty = 70;
var x;
var y;
var action = 0;
var direction = 1;
var column1, column2, column3;
var crayon;

function preload(){
	//crayon = loadFont('http://localhost:8000/../Parrot/chatbot/DK_Cool_Crayon.ttf');
	head = loadImage('../Parrot/chatbot/head.png');
	body = loadImage('../Parrot/chatbot/body.png');
	bbeak = loadImage('../Parrot/chatbot/bottom-beak.png');
	tbeak = loadImage('../Parrot/chatbot/top-beak.png');
	lfoot = loadImage('../Parrot/chatbot/left-foot.png');
	rfoot = loadImage('../Parrot/chatbot/right-foot.png');
	lleg = loadImage('../Parrot/chatbot/left-leg.png');
	rleg = loadImage('../Parrot/chatbot/right-leg.png');
	tail = loadImage('../Parrot/chatbot/tail.png');
	cwing = loadImage('../Parrot/chatbot/closed-wing.png');
	var c1 = "artless\nbawdy\nbeslubbering\nbootless\nchurlish\ncockered\nclouted\ncraven\ncurrish\ndankish\ndissembling\ndroning\nerrant\nfawning\nfobbing\nfroward\nfrothy\ngleeking\ngoatish\ngorbellied\nimpertinent\ninfectious\njarring\nloggerheaded\nlumpish\nmammering\nmangled\nmewling\npaunchy\npribbling\npuking\npuny\nqualling\nrank\nreeky\nroguish\nruttish\nsaucy\nspleeny\nspongy\nsurly\ntottering\nunmuzzled\nvain\nvenomed\nvillainous\nwarped\nwayward\nweedy\nyeasty\n";
	var c2 = "base-court\nbat-fowling\nbeef-witted\nbeetle-headed\nboil-brained\nclapper-clawed\nclay-brained\ncommon-kissing\ncrook-pated\ndismal-dreaming\ndizzy-eyed\ndoghearted\ndread-bolted\nearth-vexing\nelf-skinned\nfat-kidneyed\nfen-sucked\nflap-mouthed\nfly-bitten\nfolly-fallen\nfool-born\nfull-gorged\nguts-griping\nhalf-faced\nhasty-witted\nhedge-born\nhell-hated\nidle-headed\nill-breeding\nill-nurtured\nknotty-pated\nmilk-livered\nmotley-minded\nonion-eyed\nplume-plucked\npottle-deep\npox-marked\nreeling-ripe\nrough-hewn\nrude-growing\nrump-fed\nshard-borne\nsheep-biting\nspur-galled\nswag-bellied\ntardy-gaited\ntickle-brained\ntoad-spotted\nunchin-snouted\nweather-bitten\n";
	var c3 = "apple-john\nbaggage\nbarnacle\nbladder\nboar-pig\nbugbear\nbum-bailey\ncanker-blossom\nclack-dish\nclotpole\ncoxcomb\ncodpiece\ndeath-token\ndewberry\nflap-dragon\nflax-wench\nflirt-gill\nfoot-licker\nfustilarian\ngiglet\ngudgeon\nhaggard\nharpy\nhedge-pig\nhorn-beast\nhugger-mugger\njoithead\nlewdster\nlout\nmaggot-pie\nmalt-worm\nmammet\nmeasle\nminnow\nmiscreant\nmoldwarp\nmumble-news\nnut-hook\npigeon-egg\npignut\nputtock\npumpion\nratsbane\nscut\nskainsmate\nstrumpet\nvarlot\nvassal\nwhey-face\nwagtail";
	column1 = split(c1,"\n");
	column2 = split(c2,"\n");
	column3 = split(c3,"\n");
}

function setup() {
	createCanvas(1400, 600);
	mostRecentConfidence = 0;
	mostRecentSpokenWord = "";
	newCurse();
	step = 0;
	x = 100;
	y = 200;
	wait = true;
	affirmed = true;
	timeStart = 0;
	initializeMySpeechRecognizer();
}
function keyPressed(){

	if (key === ' '){
		// Press the spacebar to reset the speech recognizer.
		// This is helpful in case it freezes up for some reason.
		// If you have a lot of freezes, consider automating this.
		initializeMySpeechRecognizer();
	}
}

function initializeMySpeechRecognizer(){
	mySpeechRecognizer = new p5.SpeechRec('en-US');

	// These are important settings to experiment with
	mySpeechRecognizer.continuous = true;   // Do continuous recognition
	mySpeechRecognizer.interimResults = false; // Allow partial recognition (faster, less accurate)
	mySpeechRecognizer.onResult = parseResult; // The speech recognition callback function
	mySpeechRecognizer.start(); // Start the recognition engine. Requires an internet connection!

	console.log(mySpeechRecognizer);
}

function parseResult() {

	// The Recognition system will often append words into phrases.
	// So the hack here is to only use the last word:
	console.log (mySpeechRecognizer.resultString);
	if(end.includes(mySpeechRecognizer.resultString)){
		step = 1005;
		wait = false;
		affirmed = false;
	}
	mostRecentSpokenWord = mySpeechRecognizer.resultString.split(' ').pop();
	mostRecentConfidence = mySpeechRecognizer.resultConfidence;
	if(step!=3&&negatives.includes(mostRecentSpokenWord)){
		answer = false;
		wait = false;
		affirmed = false;
	}else if(positives.includes(mostRecentSpokenWord)){
		answer = true;
		wait = false;
		affirmed = false;
	}else if(affirm.includes(mostRecentSpokenWord)){
		affirmed = true;
		if(step==0 && answer)
			step+=2;
		else if (step==1) {
			step=1000;
			affirmed = false;
		}else if(step==1000){
			step=2;
		}else if(step==3&&answer){
			step=1003;
			affirmed = false;
		}else if(step==1003){
			step = 4;
		}else if (step==5&&answer) {
			step=1001;
			affirmed = false;
		}else if(step==1001){
			step=6;
		}else if(step==6&&answer){
			step=1002;
			affirmed = false;
		}else if(step==1002){
			step=7;
		}else if(step==9){
			step=1004;
			affirmed = false;
		}else if(step==1004){
			step=1005;
			affirmed=false;
		}else
		step++;
	}
	action = int(random(0,4));
	newCurse();
	console.log('wait: '+answer);
	console.log('affirmed: '+ affirmed);
	console.log('step: '+step);
}

function draw() {
 // put drawing code here
    scale(2/3);
 	background(255);
 	if(wait&&affirmed)
 		askQuestion();
 	else{
		respond();
 	}
    resetMatrix();
 	scale(1/4);
 	if(action==0)
 		squawk();
 	else if(action==1)
 		walk();
 	else if(action==2)
 		hop();
 	else
 		stand();
}

function squawk(){
var time = sin(.01*millis());
	var ftime = sin(.005*millis());
	fill(255,0,0);
	image(lfoot, x, y);
	image(lleg, x, y);
	image(rfoot, x, y);
	image(rleg, x, y);
	translate(x+720,y+650);
	rotate((PI*ftime)/50.0);
	translate(-(x+720),-(y+650));
	image(tail, x, y);
	resetMatrix();
	scale(1/4);
	image(body, x, y);
	translate(x+1220,y+250);
	rotate((PI*time)/10.0);
	translate(-(x+1220),-(y+250));
	image(bbeak, x, y);
	resetMatrix();
	scale(1/4);
	image(tbeak, x, y);
	image(head, x, y);
	image(cwing, x, y);
	fill(0);
	ellipse(x+1170,y+160,30,30);
}

function walk(){
	var time = sin(.01*millis());
	var ftime = sin(.005*millis());
	var dx = 7;
	if((x<-10)||(x>760)){
		direction*=-1;
		x+=direction*dx;
	}else{
		x+=direction*dx;
	}
	fill(255,0,0);
	translate(x+900,y+950);
	if(ftime>0)
		rotate(-(PI*ftime)/7.7);
	translate(-(x+900),-(y+950));
	image(lfoot, x, y);
	image(lleg, x, y);
	resetMatrix();
	scale(1/4);
	translate(x+900,y+950);
	if(ftime<=0)
		rotate((PI*ftime)/7.7);
	translate(-(x+900),-(y+950));
	image(rfoot, x, y);
	image(rleg, x, y);
	resetMatrix();
	scale(1/4);
	image(tail, x, y);
	image(body, x, y);
	image(bbeak, x, y);
	image(tbeak, x, y);
	image(head, x, y);
	translate(x+920,y+550);
	rotate((PI*ftime)/20.0);
	translate(-(x+920),-(y+550));
	image(cwing, x, y);
	resetMatrix();
	scale(1/4);
	fill(0);
	ellipse(x+1170,y+160,30,30);
}
function stand(){
	var time = sin(.01*millis());
	var ftime = sin(.005*millis());
	image(lfoot,x, y);
	image(rfoot,x, y);
	image(lleg,x, y);
	image(rleg,x, y);
	image(tail,x, y);
	scale(1+.001*time);
	image(body,x, y);
	resetMatrix();
	scale(1/4);
	image(bbeak,x, y);
	image(tbeak, x, y);
	shearX(PI*ftime/600.0);
	image(head,x, y);
	fill(0);
	ellipse(x+1170,y+160,30,30)
	resetMatrix();
	scale(1/4);
	image(cwing,x, y);
}

function hop(){
	var time = sin(.01*millis());
	var ftime = sin(.005*millis());
	var dx = 10;
	var dy = 200+(100*time+.5*(-9.8)*time*time);
	if((x<-10)||(x>760)){
		direction*=-1;
		x+=direction*dx;
		y = dy;
	}else{
		x+=direction*dx;
		y=dy;
	}
	if(y>200) y = 200;
	fill(255,0,0);
	translate(x+900,y+950);
	rotate(-(PI*ftime)/10.0);
	translate(-(x+900),-(y+950));
	image(lfoot, x, y);
	image(rfoot, x, y);
	image(lleg, x, y);
	image(rleg, x, y);
	resetMatrix();
	scale(1/4);
	image(tail, x, y);
	image(body, x, y);
	image(bbeak, x, y);
	image(tbeak, x, y);
	image(head, x, y);
	translate(x+920,y+550);
	rotate((PI*ftime)/20.0);
	translate(-(x+920),-(y+550));
	image(cwing, x, y);
	resetMatrix();
	scale(1/4);
	fill(0);
	ellipse(x+1170,y+160,30,30);

}

function newCurse(){
	curse = "";
	curse +=random(column1)+' ';
	curse +=random(column2)+' ';
	curse +=random(column3)+'';
	console.log("curse: "+curse);
}

function askQuestion(){
	textSize(22);
	// textFont(crayon);
	textLeading(30);
	fill(0, 102, 153);
	if(step==0){
		text('Have you eaten? \nIn maybe the past 4 hrs or so?', tx,ty);
	}else if(step==1){
		text('Are you feeling too bummish to cook?', tx,ty);
	}else if(step==2){
		text('Did you take your meds?', tx,ty);
	}else if(step==3){
		text('Take a fucking sip, babe. \n(Drink something. Dehydration causes \nheadaches and death and shit)', tx,ty);
	}else if(step==4){
		text('Did ya sleep that healthy 7-9 hrs\n(Or hopefully 6ish hours on a school \nnight????)', tx,ty);
	}else if(step==5){
		text('Are you living in squalor', tx,ty);
	}else if(step==6){
		text('Did u know loneliness can lead to an \nearly death? Are you lonely now?', tx,ty);
	}else if(step==7){
		text('Something on your mind?', tx,ty);
	}else if(step==8){
		text('Ah I see its ya fave then:\n sudden inexplicable anxiety', tx,ty);
	}else if(step==9){
		text('Thats all i have pal', tx,ty);
	}
}

function respond(){
	textSize(22);
	// textFont(crayon);
	textLeading(40);
	fill(0, 102, 153);
	if(step==0){
		if(!answer){
			text('Go forth and eat your\n'+curse+' feelings. \njk fuel is important and also its okay\nto indulge sometimes', tx,ty);
		}else{
			text('hmmm guess thats not it \n(tbh could eat ur feelings away anyways)\n(assuming youre not already feeling \nlike a sphere)', tx,ty);
		}
	}else if(step==1){
		if(!answer){
			text('Nice! Gordon Ramsay would be \n'+curse+' proud \nof u lol', tx,ty);
		}else{
			text('You can ask one of your friends to help.\nThey\'re probably just bumming around \nplaying '+curse+' \nfucking Touhou or some shit anyways', tx,ty);
		}
	}else if(step==1000){
		text('Some '+curse+' \neasy to cook things you like:\n-spam and rice\n-tamago kake gohan\n-scrambled eggs\n-pesto pasta\n-tomato egg noodles\n-fried egg', tx,ty);
	}else if(step==2){
		if(answer){
			text('Ayyyy good job for supporting the \n'+curse+' fucking\nfantastic field of modern medicine', tx,ty);
		}else{
			text('Do it now you bum omg.\n They were prescribed to you for a \n'+curse+' reason. \nIts not your fault but you \ngotta do what you gotta do', tx,ty);
		}
	}else if(step==4){
		if(answer){
			text('Nice nice nice living that optimal college \nstudent lifestyle', tx,ty);
		}else{
			text('Napping is the \n'+curse+' best. \nMost things will make you less sad \nafter a nap tbh', tx,ty);
		}
	}else if(step==5){
		if(answer){
			text('Clean up a bit so even if you feel like \na mess at least you wont look like one', tx,ty);
		}else{
			text('Arent you an orderly \n'+curse+' potato angel', tx,ty);
		}
	}else if(step==1001){
		text('Even if your world is falling apart, there \nare things you can control:\n-shower\n-brush teeth\n-the dishes in the sink\n-the crumbs on the floor\n-the cluttered table\n-the kitchen counter', tx,ty);
	}else if(step==6){
		if(answer){
			text('Find an Eric to hang onto or something. \nOr another friend. \nYou have '+curse+' \nhecking lovely friends who want\nto be there for you', tx,ty);
		}else{
			text('Cool! Strong!! Independent!!!', tx,ty);
		}
	}else if(step==1002){
		text('Even without friends, plenty of \n'+curse+' people \ncare about you dumbass. Consider: \n-your parents\n-a fav professor\n-academic advisor probably\n-CAPS\n-anonymous shit you of all \n people should know about since you \n volunteered for one like 7cups.com', tx,ty);
	}else if(step==1003){
		text('Nice. Now u can thirst after booty or \nsomething instead of fluids.', tx,ty);
	}else if(step==7){
		if(answer){
			text('r e e v a l u a t e your \n'+curse+' life\nIs there something you can \n'+curse+' do???\nthen do it for fucks sake. \nIf not, then all you can do is get over it.\nTalk to someone about it. ', tx,ty);
		}else{
			text('Calm and steady like a parkour persons \nthighs at the start of practice', tx,ty);
		}
	}else if(step==8){
		if(answer){
			text('TBH i feel you should go see someone \nabout this but try: \n-deep, calm, breaths\n-stretch routine\n-exercise\n-make some tea\n-nice long walk outside\n-shower!!', tx,ty);
		}else{
			text('Okay thats good.', tx,ty);
		}
	}else if(step==9||step==1004){
		text('If youre triggered or feel shitty in some \nother way, you could try a distraction like:\n-baking\n-anime\n-singing along to Moana\n-painting\n-reading\n-pet dogs\nbut TBH, sometimes the best self-care is \nresponsibility. Do your homework, your\nartwork, what needs to be done and \ntomorrow will hopefully be better', tx,ty);
	}else if(step==1005){
		text('Youre the \n'+curse+'\n fucking strongest, and you be fine', tx,ty);
	}
	wait = true;
}
