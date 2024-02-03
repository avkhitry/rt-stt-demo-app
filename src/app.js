
  
  const resultElement = document.getElementById('result');
  const requestElement = document.getElementById('request');

  
  // generate words ops
  const generateBtn = document.getElementById('generateBtn');
  var wordsArr = [];
  const nouns = [
  "cat", "moon", "tree", "book", "car", "sun", "fish", "bird", "house", "star",
  "rock", "river", "mountain", "dog", "ship", "ocean", "flower", "rain", "snow", "fire",
  "cloud", "sky", "forest", "road", "bridge", "hill", "light", "night", "day", "moonlight",
  "sunshine", "grass", "wind", "storm", "thunder", "lightning", "beach", "sand", "wave", "island",
  "lake", "pond", "stream", "waterfall", "glacier", "desert", "canyon", "valley", "peak", "volcano",
  "jungle", "marsh", "swamp", "bay", "sea", "oasis", "reef", "cliff", "plateau", "fjord",
  "field", "meadow", "prairie", "dune", "lagoon", "delta", "peninsula", "isthmus", "archipelago",
  "cave", "gulf", "strait", "channel", "fountain", "well", "spring", "mine", "quarry", "forest",
  "grove", "orchard", "garden", "vineyard", "farm", "ranch", "estate", "castle", "palace", "fort",
  "temple", "church", "mosque", "shrine", "sanctuary", "monastery", "library", "museum", "school", "university"
];
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
    recognition.maxAlternatives = 1;

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
        } else {
          result += event.results[i][0].transcript;
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

