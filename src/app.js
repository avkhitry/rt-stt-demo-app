
  
  const resultElement = document.getElementById('result');
  const requestElement = document.getElementById('request');

  
  // generate words ops
  const generateBtn = document.getElementById('generateBtn');
  var wordsArr = [];
  const nouns = ["air", "aircraft", "airport", "alligator", "ambulance", "ankle", "antlers", "apartment", "apple", "apron", "architect", "armchair",
"arrow", "aunt", "baby", "back", "bag", "bakery", "ball", "balloon", "bank", "bat", "beans", "bear", "bed", "belt", "bermudas",
"bikini", "bill", "bird", "bitterness", "black", "blazer", "blender", "blouse", "board", "boat", "bones", "book", "bookcase",
"bookstore", "boots", "bow", "boxers", "boy", "bra", "brain", "brass", "bread", "bridge", "brother", "bucket", "buckles", "buffalo",
"bulb", "bus stop", "butter", "cabin", "cabinet", "cafe", "candy", "cane", "canoe", "cap", "car", "cardigan", "carpet", "cashier",
"casino", "castle", "cat", "cave", "cello", "chair", "chaise longue", "charlie (U.K)", "cheeks", "cheese", "chest", "chicken",
"children", "chocolate", "choker", "church", "cinema", "clock", "coffee", "composer", "computer", "conditioner", "cooker",
"cookware", "costume", "couch", "country", "cow", "cravat", "credenza", "crest", "crib", "crow", "daughter", "deer", "dentist",
"designer", "desk", "desktop", "detective", "doctor", "dog", "dolphin", "donkey", "dress", "dresser", "drum", "earrings", "ears",
"egg", "elephant", "estate", "eyes", "factory", "fan", "farm", "father", "film", "finger", "fish", "flag", "flower", "foot",
"forest", "fork", "fox", "freezer", "frock", "frog", "fruit", "galaxy", "garage", "garlic", "gas station", "gauva", "gift",
"ginger", "giraffe", "girl", "glasses", "gloves", "goat", "governor", "gown", "grains", "grandfather", "grandmother", "grapes",
"guest", "guitar", "hair", "hamburger", "hammer", "hand", "hat", "head", "heart", "heels", "hen", "herbs", "horn", "horse",
"hospital", "host", "hostel", "hotel", "house", "jacket", "jaw", "jersey", "jewelry", "judge", "juicer", "jumper", "kangaroo",
"keyboard", "kid", "knife", "koala", "lamb", "lamp", "laptop", "lawyer", "leg", "leggings", "lemon", "library", "lighter", "lion",
"lips", "london", "luggage", "lung", "mall", "man", "mango", "market", "medicine", "microscope", "milk", "mirror", "mobile",
"model", "monkey", "moonlight", "mother", "mouse", "mouth", "museum", "music", "musician", "neck", "necklace", "newspaper", "noise",
"noodles", "nose", "notebook", "nurse", "ocean", "oil", "onion", "orange", "ostrich", "oven", "owl", "pad", "pagoda", "painter",
"palm", "pancake", "panda", "panther", "pants", "paper", "parfume", "park", "parrot", "pasta", "peacock", "pen", "pencil", "petrol station", 
                 "pharmacist", "pharmacy", "phone", "photographer", "physician", "piano", "pig", "pigeon", "pipe", "plane", "plant",
"police", "police station", "popcorn", "potato", "pouch", "professor", "pumpkin", "purse", "pyramid", "rabbit", "radio", "rainbow",
"razor", "refrigerator", "remote", "restaurant", "ribs", "rice", "ring", "road", "salt", "sand", "sandals", "sandwich", "sari",
"saxophone", "scale", "school", "scissors", "senator", "shampoo", "shark", "sheep", "ship", "shirt", "shoes", "shorts", "shoulder",
"shower", "shrimp", "singer", "sink", "sister", "skirt", "sky", "skyscraper", "slippers", "smile", "smoke", "snowman", "soap",
"socks", "sofa", "son", "soup", "spaghetti", "sparrow", "spoon", "stadium", "stairs", "star", "stomach", "stove", "strawberry",
"street", "suit", "suitcase", "sun", "sunglasses", "supermarket", "surgeon", "swan", "sweater", "swimming pool", "table", "tablet",
"tail", "taxi", "tea", "teacher", "teen", "telephone", "television", "temple", "theater", "tie", "tiger", "tissue", "toes",
"tomato", "tongue", "toothbrush", "toothpaste", "town", "toy", "train", "train station", "tree", "trench coat", "trousers", "truck",
"tunnel", "turkey", "turtle", "umbrella", "uncle", "underwear", "vase", "vehicle", "vest", "veterinarian", "villa", "village",
"violin", "voice", "waist", "waiter", "wallet", "washing machine", "watch", "water", "water melon", "whale", "wheelchair",
"whisker", "wings", "wolf", "woman", "wound", "wrist", "xylophone", "zebra", "zoo"];
  // function pickFromArr(targarr) {
  //   return targarr[(Math.floor(Math.random() * nouns.length))];
  // };
  function pickFromArr(targarr = nouns, numwords = 10) {
    num = Math.floor(Math.random() * targarr.length - numwords);
    name = targarr.splice(num,1);
    targarr.push(name);
    return name;
}


  function createArrRnd(targarr = nouns, reqnum = 10){
    wordsArr = [];
    for (let i = 1; i <= reqnum; i++) {
        wordsArr.push(pickFromArr(targarr));
    }
    console.log(wordsArr);
    requestElement.innerText = wordsArr.join("\n");
    setTimeout(function(){
      requestElement.innerText = "";
    }, 30000);
  };

  // speech recognition ops
  const startBtn = document.getElementById('startBtn');
  // const animatedSvg = startBtn.querySelector('svg');
  const stopBtn = document.getElementById('stopBtn');

// add all listeners after DOM loaded
  generateBtn.addEventListener('click', function() {
    createArrRnd(nouns, 10);
  });
  startBtn.addEventListener('click', startRecording);
  stopBtn.addEventListener('click', stopRecording);

  // recognition cycle
  let recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let speechgramlist = window.SpeechGrammarList || window.webkitSpeechGrammarList;

  if (recognition) {
    recognition = new recognition();

    // trying to limit dictionary for recognition
    speechRecognitionList = new speechgramlist();
    speechRecognitionList.addFromString(nouns, 1);
    recognition.grammars = speechRecognitionList;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      // animatedSvg.classList.remove('hidden');
      console.log('Recording started');
    };
  
    recognition.onresult = function (event) {
      let result = '';
  
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        result += event.results[i][0].transcript + ' ';
        if (event.results[i][1].transcript) {
          result += '\n' + event.results[i][1].transcript + ' ';
        }
        if (event.results[i][2].transcript) {
          result += '\n' + event.results[i][2].transcript + ' ';
        }
    
      } else {
        result += event.results[i][0].transcript;
        if (event.results[i][1].transcript) {
          result += '\n' + event.results[i][1].transcript + ' ';
        }
        if (event.results[i][2].transcript) {
          result += '\n' + event.results[i][2].transcript + ' ';
        }
      }
    }
      // console.log(result);
      
      result = result.replace(/\./g, "").toLowerCase().trim();
      resultElement.innerText = result;
      console.log(result);
      console.log(wordsArr);
      console.log(wordsArr.includes(result));

      // if result in the array then add counter
      if (wordsArr.includes(result)) {
        requestElement.innerText = requestElement.innerText + result + "\n";
        wordsArr.splice(wordsArr.indexOf(result), 1);
        console.log(wordsArr);
        if (wordsArr.length === 0) { 
          resultElement.innerText = "You won!"
          stopRecording();
        }
      }
    };
  
    recognition.onerror = function (event) {
      startBtn.disabled = false;
      stopBtn.disabled = true;
      console.error('Speech recognition error:', event.error);
    };
  
    recognition.onend = function () {
      startBtn.disabled = false;
      stopBtn.disabled = true;
      // animatedSvg.classList.add('hidden');
      console.log('Speech recognition ended');
    };
  } else {
    console.error('Speech recognition not supported');
  }
  
  function startRecording() {
    resultElement.innerText = '';
    recognition.start();
  }
  
  function stopRecording() {
    if (recognition) {
      recognition.stop();
    }
  }

