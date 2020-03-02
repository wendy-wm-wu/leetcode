var Jukebox = function() {
  this.currentSong = null; //current song playing
  this.songQueue = []; //queue of all the songs to be played 
}

Jukebox.prototype.play = function() {
  if (this.currentSong === null) {
    this.currentSong = this.songQueue.unshift(); 
    this.currentSong.play();
  } else {
    console.log('song is playing')
  }
}

Jukebox.prototype.nextSong = function() {
  this.currentSong = this.songQueue.unshift();
  this.currentSong.play();
}

Jukebox.prototype.pause = function() {
  if (this.currentSong !== null) {
    this.currentSong.pause(); 
  } else {
    console.log('no song is playing')
  }
}

Jukebox.prototype.shuffle = function() {
  return this.songQueue.sort(() => Math.random() > 0.5 ? 1: 0); 
}

Jukebox.prototype.currentSongName = function() {
  return this.currentSong.name; 
}

Jukebox.prototype.addSong = function(song) {
  this.songQueue.push(song); 
}


var Song = function(name, track) {
  this.name = name;
  this.track = new Audio(track);
}

Song.prototype.play = function() {
  this.track.play();
}

Song.prototype.pause = function() {
  this.track.pause();
}