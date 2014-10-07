define(function(){
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
		source = audioCtx.createMediaElementSource(document.getElementById('audio')),
		analyser = audioCtx.createAnalyser();

	source.connect(analyser);
	analyser.connect(audioCtx.destination);

	function getData(){
		var freqData = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(freqData);
		return freqData;
	}

	function getFreqBinCount(){
		return analyser.frequencyBinCount;
	}
	return {
		getData: getData,
		getFreqBinCount: getFreqBinCount
	}
})