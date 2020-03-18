module.exports = function (name) {
  let nameHello = name ? name : ''
  let hours = new Date().getHours()
  if(hours >= 23 || hours < 6) {
    return `Hello ${nameHello}!`
  } else if(hours >= 6 && hours <= 11) {
    return `Good morning ${nameHello}!`
  } else if(hours > 11 && hours <= 18){
    return `Good afternoon ${nameHello}!`
  } else{
    return `Good evening ${nameHello}!`
  }
}