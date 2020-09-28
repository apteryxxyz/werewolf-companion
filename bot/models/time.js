module.exports = {
  msConversion: ms => {
    let sec = Math.floor(ms / 1000);
    let hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;
    sec = "" + sec;
    sec = ("00" + sec).substring(sec.length);
    if (hrs > 0) {
      min = "" + min;
      min = ("00" + min).substring(min.length);
      return hrs + "h " + min + "m " + sec + "s";
    } else {
      return min + "m " + sec + "s";
    }
  }
};
