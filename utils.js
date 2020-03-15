 
 
 TrigramIndex = function (inputPhrases) {
     function asTrigrams(phrase, callback) {
         var rawData = "  ".concat(phrase, "  ");
         for (var i = rawData.length - 3; i >= 0; i = i - 1)
             callback.call(this, rawData.slice(i, i + 3));
     };
     
     var instance = {
         phrases: [],
         trigramIndex: [],
         
         index: function (phrase) {
             if (!phrase || phrase === "" || this.phrases.indexOf(phrase) >= 0) return;
             var phraseIndex = this.phrases.push(phrase) - 1;
             asTrigrams.call(this, phrase, function (trigram) {
                 var phrasesForTrigram = this.trigramIndex[trigram];
                 if (!phrasesForTrigram) phrasesForTrigram = [];
                             if (phrasesForTrigram.indexOf(phraseIndex) < 0) phrasesForTrigram.push(phraseIndex);
                             this.trigramIndex[trigram] = phrasesForTrigram;
             });
         },
         
         find: function (phrase) {
             var phraseMatches = [];
             var trigramsInPhrase = 0;
             asTrigrams.call(this, phrase, function (trigram) {
                 var phrasesForTrigram = this.trigramIndex[trigram];
                 trigramsInPhrase += 1;
                 if (phrasesForTrigram)
                     for (var j in phrasesForTrigram) {
                         phraseIndex = phrasesForTrigram[j];
                         if (!phraseMatches[phraseIndex]) phraseMatches[phraseIndex] = 0;
                             phraseMatches[phraseIndex] += 1;
                     }
             });
             var result = [];
             for (var i in phraseMatches)
                 result.push({ phrase: this.phrases[i], matches: phraseMatches[i] });
             
             result.sort(function (a, b) {
                 var diff = b.matches - a.matches;
                 return diff;// == 0 ? a.phrase.localeCompare(b.phrase) : diff;
             });
             return result;
         }
     };
     for (var i in inputPhrases)
         instance.index(inputPhrases[i]);
     return instance;
 };
 
 
 LevenshteinDistance =  function(a, b){
     if(a.length == 0) return b.length; 
     if(b.length == 0) return a.length; 
     
     var matrix = [];
     
     // increment along the first column of each row
     var i;
     for(i = 0; i <= b.length; i++){
         matrix[i] = [i];
     }
     
     // increment each column in the first row
     var j;
     for(j = 0; j <= a.length; j++){
         matrix[0][j] = j;
     }
     
     // Fill in the rest of the matrix
     for(i = 1; i <= b.length; i++){
         for(j = 1; j <= a.length; j++){
             if(b.charAt(i-1) == a.charAt(j-1)){
                 matrix[i][j] = matrix[i-1][j-1];
             } else {
                 matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                         Math.min(matrix[i][j-1] + 1, // insertion
                                                  matrix[i-1][j] + 1)); // deletion
             }
         }
     }
     
     return matrix[b.length][a.length];
 };
